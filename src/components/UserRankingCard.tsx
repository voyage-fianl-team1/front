import React, { FC } from 'react';

interface Props {
  user: { nickname: string; win: number; subject: string };
  rank: number;
}

const UserRankingCard: FC<Props> = ({ user, rank }) => {
  return (
    <div className='user-ranking-card flex justify-between items-center p-2'>
      <div className='flex items-center gap-2'>
        <span className='font-bold text-xl'>{rank}</span>
        <img src='/assets/images/avatar.svg' alt='user-avatar' />
        <h2>{user.nickname}</h2>
      </div>
      <div className='flex items-center gap-2'>
        <span>{user.win}승</span>
        <img src='/assets/images/category/soccer.svg' alt='soccer' className='w-[24px]' />
      </div>
    </div>
  );
};

export default UserRankingCard;
