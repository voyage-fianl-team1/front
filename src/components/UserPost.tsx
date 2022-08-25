import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserPostType } from '../typings';
import { apis } from '../apis';
import LoadingSpinner from './loadingSpinner';
import { Link } from 'react-router-dom';

const UserPost = () => {
  const { data } = useQuery<UserPostType[]>(['user-posts'], apis.getUserPosts);

  if (!data) {
    return <LoadingSpinner />;
  }

  if (data.length === 0) {
    return <div className='text-sm text-black/30 my-10'>작성한 게시글이 없습니다</div>;
  }

  return (
    <ul className='flex flex-col gap-3 justify-start w-[100%] mt-5'>
      {data.map((d) => (
        <Link key={d.id} to={`/match/${d.id}`}>
          <li className='flex justify-between bg-gray-100 p-2 rounded'>
            <h1>
              [{d.subject}] {d.title}
            </h1>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default UserPost;
