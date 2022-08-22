import React from 'react';
import UserRankingCard from './UserRankingCard';

const UserRankingList = () => {
  return (
    <div className='flex flex-col gap-3 mb-12'>
      <UserRankingCard />
      <UserRankingCard />
      <UserRankingCard />
      <UserRankingCard />
    </div>
  );
};

export default UserRankingList;
