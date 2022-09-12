import React from 'react';
import UserRankingCard from './UserRankingCard';
import LoadingSpinner from '../Common/loadingSpinner';
import useGetRecentMatchList from '../../hooks/queries/useGetUserRankingList';

const UserRankingList = () => {
  const { data: userRankingList, isLoading } = useGetRecentMatchList();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!userRankingList?.length) {
    return (
      <div className='flex flex-col gap-[12px] mb-12 text-center text-sm text-black/40'>
        제일 먼저 경기를 완료해보세요!
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-[12px] mb-12'>
      {userRankingList?.map((d, idx) => (
        <UserRankingCard key={idx} user={d} rank={idx + 1} />
      ))}
    </div>
  );
};

export default UserRankingList;
