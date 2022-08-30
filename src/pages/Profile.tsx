import React from 'react';
import UserMatches from '../components/UserMatches';
import UserPost from '../components/UserPost';
import { Link } from 'react-router-dom';
import UserInfoDisplay from '../components/UserInfoDisplay';
import { useQuery } from '@tanstack/react-query';
import { UserPostType, UserRequest } from '../typings';
import { apis } from '../apis';
import LoadingSpinner from '../components/loadingSpinner';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const { data } = useQuery<UserRequest[]>(['user-requests'], apis.getUserRequests);
  const { data: UserPostData } = useQuery<UserPostType[]>(['user-posts'], apis.getUserPosts);
  if (!data || !UserPostData) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>매치기 | 마이페이지</title>
      </Helmet>
      <div className='flex flex-col items-center'>
        <UserInfoDisplay />
        <Link to='/profile/edit' className='w-[100%]'>
          <button className='border-[#DCDDE0] border-[1px] w-[100%] rounded-full py-1.5 mt-7'>내 정보 관리</button>
        </Link>
        <div className='bg-[#F4F5F5] h-[8px] w-[100vw] absolute top-[190px]' />
        <div className='flex justify-between w-[100%] mt-[80px] items-center'>
          <h1 className='text-xl font-bold text-start '>내 경기 ({data.length})</h1>
          <Link to='/profile/userMatchMore'>더보기 +</Link>
        </div>
        <UserMatches maxCount={5} />
        <h1 className='text-xl font-bold text-start w-[100%] mt-4'>내가 쓴 게시글 ({UserPostData.length})</h1>
        <UserPost />
      </div>
    </>
  );
};

export default Profile;
