import React from 'react';
import UserRankingCard from './UserRankingCard';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { UserRanking } from '../typings';
import LoadingSpinner from './loadingSpinner';

const UserRankingList = () => {
  const { subject: selectSubject } = useSelector((state: RootState) => state.search);
  const { data } = useQuery<UserRanking[]>(['allUserRankingList', selectSubject], () =>
    apis.getAllUserRankingList(selectSubject)
  );

  if (!data) {
    return <LoadingSpinner />;
  }

  if (!data.length) {
    return (
      <div className='flex flex-col gap-[12px] mb-12 text-center text-sm text-black/40'>
        제일 먼저 경기를 완료해보세요!
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-[12px] mb-12'>
      {data.map((d, idx) => (
        <UserRankingCard key={idx} user={d} rank={idx + 1} />
      ))}
    </div>
  );
};

export default UserRankingList;
