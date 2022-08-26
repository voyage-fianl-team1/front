import React from 'react';
import UserInfo from '../components/UserInfo';
import UserRankInfo from '../components/UserRankInfo';
import UserMatches from '../components/UserMatches';
import UserPost from '../components/UserPost';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import UserInfoDisplay from '../components/UserInfoDisplay';

const Profile = () => {
  return (
    <div className='flex flex-col items-center'>
      {/*<UserInfo />*/}
      <UserInfoDisplay />
      <Link to='/profile/edit' className='w-[100%]'>
        <button className='border-[#DCDDE0] border-[1px] w-[100%] rounded-full py-1.5 mt-7'>내 정보 관리</button>
      </Link>
      <div className='bg-[#F4F5F5] h-[8px] w-[100vw] absolute top-[190px]' />
      <h1 className='text-xl font-bold text-start w-[100%] mt-[80px]'>내 경기</h1>
      <UserMatches />
      <h1 className='text-xl font-bold text-start w-[100%] mt-4'>내가 쓴 게시글</h1>
      <UserPost />
    </div>
  );
};

export default Profile;
