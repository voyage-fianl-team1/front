import React from 'react';
import UserMatches from '../../components/User/UserMatches';
import UserPost from '../../components/User/UserPost';
import { Link } from 'react-router-dom';
import UserInfoDisplay from '../../components/User/UserInfoDisplay';
import LoadingSpinner from '../../components/Common/loadingSpinner';
import { Helmet } from 'react-helmet';
import useUserRequests from '../../hooks/queries/useUserRequests';
import useUserOwnPosts from '../../hooks/queries/useUserOwnPosts';

const Profile = () => {
  const { data: userRequests, isLoading: userRequestsLoading } = useUserRequests();
  const { data: userOwnPosts, isLoading: userPostLoading } = useUserOwnPosts();

  if (userRequestsLoading || userPostLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>매치기 | 마이페이지</title>
      </Helmet>
      <div className='flex flex-col items-center pt-0.5'>
        <UserInfoDisplay />
        <Link to='/profile/edit' className='w-[100%]'>
          <button className='border-[#DCDDE0] border-[1px] w-[100%] rounded-full py-1.5 mt-7'>내 정보 관리</button>
        </Link>
        <div className='bg-[#F4F5F5] h-[8px] w-[100vw] absolute top-[190px]' />
        <div className='flex justify-between w-[100%] mt-[80px] items-center'>
          <h1 className='font-bold text-start '>내 경기 ({userRequests?.length})</h1>
          <Link to='/profile/userMatchMore'>
            <span className='text-sm'>더보기 +</span>
          </Link>
        </div>
        <UserMatches maxCount={5} />
        <h1 className='font-bold text-start w-[100%] mt-4'>내가 쓴 게시글 ({userOwnPosts?.length})</h1>
        <UserPost />
      </div>
    </>
  );
};

export default Profile;
