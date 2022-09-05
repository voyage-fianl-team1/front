import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserPostType } from '../typings';
import { apis } from '../apis';
import LoadingSpinner from './loadingSpinner';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { categories } from '../util/subjectTable';

const UserPost = () => {
  const { data } = useQuery<UserPostType[]>(['user-posts'], apis.getUserPosts);
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (postId: number) => {
      return apis.deletePost(postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user-posts']);
      },
    }
  );
  const handleDelete = (postId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      mutation.mutate(postId);
    }
  };

  if (!data) {
    return <LoadingSpinner />;
  }

  if (data.length === 0) {
    return <div className='text-sm text-black/30 my-10'>작성한 게시글이 없습니다</div>;
  }

  return (
    <ul className='flex flex-col gap-2 justify-start w-[100%] mt-5'>
      {data.map((d) => (
        <li key={d.id} className='flex justify-between pb-5 pt-3 rounded border-b-[#F4F5F5] border-b-2'>
          <div className='flex'>
            <img
              src={d.imageUrl[0] || '/assets/images/post/noImage.svg'}
              alt='imageUrl'
              className='w-[68px] h-[68px] rounded-[8px] object-cover'
            />
            <div className='ml-2 '>
              <h1 className='text-[16px] mb-1'>{d.title}</h1>
              <p className='text-[#9A9B9F] text-[12px] mb-1'>{dayjs(d.createdAt).format('YYYY.MM.DD (ddd)')}</p>
              <p className='text-[#5D5E62] text-[12px] bg-[#F4F5F5] inline-block px-2 rounded'>
                {categories.find((c) => c.value === d.subject)?.title}
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-between '>
            <Link to={`/match/${d.id}`}>
              <button className='text-[#38393C] text-[12px] border-[1px] rounded py-1 px-1.5'>수정하기</button>
            </Link>
            <button className='text-[#38393C] underline text-[12px]' onClick={() => handleDelete(d.id)}>
              삭제
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserPost;
