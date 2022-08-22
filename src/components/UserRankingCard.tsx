import React from 'react';

const UserRankingCard = () => {
  return (
    <div className='user-ranking-card flex justify-between items-center p-2'>
      <div className='flex items-center gap-2'>
        <span className='font-bold text-xl'>1</span>
        <img src='/assets/images/avatar.svg' alt='user-avatar' />
        <h2>사용자 아이디</h2>
      </div>
      <div className='flex items-center gap-2'>
        <span>32승</span>
        <img src='/assets/images/category/soccer.svg' alt='soccer' className='w-[24px]' />
      </div>
    </div>
  );
};

export default UserRankingCard;
