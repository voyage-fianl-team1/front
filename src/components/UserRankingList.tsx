import React from 'react';
import UserRankingCard from './UserRankingCard';

const mockData = [
  { nickname: '킹콩맨', win: 33, subject: 'BASCKETBALL' },
  { nickname: '마마보이', win: 23, subject: 'TENNIS' },
  { nickname: '축구돌이', win: 14, subject: 'SCOCCER' },
  { nickname: '헤헤오', win: 7, subject: 'SCOCCER' },
];

const UserRankingList = () => {
  return (
    <div className='flex flex-col gap-[12px] mb-12'>
      {mockData.map((d, idx) => (
        <UserRankingCard key={idx} user={d} rank={idx + 1} />
      ))}
    </div>
  );
};

export default UserRankingList;
