import React from 'react';
import UserInfo from '../components/UserInfo';
import UserRankInfo from '../components/UserRankInfo';
import UserMatches from '../components/UserMatches';
import UserPost from '../components/UserPost';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Profile = () => {
  const { id } = useSelector((state: RootState) => state.user);
  return (
    <div className='flex flex-col items-center'>
      <UserInfo />
      <div className='divider' />
      <div className='flex w-[100%] justify-between'>
        <h1 className='font-bold mb-4 text-xl'>개인성적</h1>
        <Link to={`/matchHistory/${id}/subject/ALL`}>
          <button>더보기 +</button>
        </Link>
      </div>
      <UserRankInfo />
      <h1 className='text-xl font-bold text-start w-[100%] mt-4'>내가 신청한 경기</h1>
      <UserMatches />
      <h1 className='text-xl font-bold text-start w-[100%] mt-4'>내가 작성한 게시글</h1>
      <UserPost />
    </div>
  );
};

export default Profile;
