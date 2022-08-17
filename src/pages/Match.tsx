import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../apis';
import { useParams } from 'react-router-dom';

interface PostDataProps {
  title: string;
  imageUrlList: [];
  matchDeadline: string;
  peopleDeadline: string;
  subject: string;
  content: string;
  owner: number;
}

const Match: FC = () => {
  const getPostData = () => {
    const res = useQuery(['postList'], () => instance.get(`/posts/${postId}`));
    const param = useParams();
    const postId = param.postId;
    if (res.isLoading) {
      return <div>Loading...</div>;
    }
    if (res.data) {
      const postData: PostDataProps = res.data.data;
      return (
        <section className='flex flex-col justify-center bg-gray-200 w-full h-screen '>
          <div className='mt-3 w-full h-10 bg-white'>{postData.title}</div>
          <section className='flex h-1/2 justify-center items-center gap-5'>
            {postData.imageUrlList.map((image, id) => (
              <div key={id}>
                <img className='h-72 w-72' alt='' src={image} />
              </div>
            ))}
          </section>
          <section className='flex flex-row gap-1'>
            <div className='w-full'>
              모집마감일
              <div className='w-full h-7 bg-white'>{postData.matchDeadline}</div>
            </div>
            <div className='w-full'>
              경기마감일
              <div className='w-full h-7 bg-white'>{postData.peopleDeadline}</div>
            </div>
          </section>
          종목
          <div className='mb-5 w-full h-10 bg-white'>{postData.subject}</div>
          <div className='mb-5 w-full h-2/5'>{postData.content}</div>
          <div className='flex items-center justify-center gap-5'>
            {postData.owner === 1 ? (
              <>
                <button className='bg-white mb-5' type='button'>
                  수정하기
                </button>
                <button className='bg-white mb-5' type='button'>
                  삭제
                </button>
              </>
            ) : (
              <>
                <button className='bg-white mb-5' type='button'>
                  참가 신청하기
                </button>
                <button className='bg-white mb-5' type='button'>
                  뒤로가기
                </button>
              </>
            )}
          </div>
        </section>
      );
    }
  };
  return <div>{getPostData()}</div>;
};

export default Match;
