import React from 'react';
import { RecentMatch } from '../../typings';
import RecentMatchCard from './RecentMatchCard';
import useGetRecentMatchList from '../../hooks/queries/useRecentMatchList';

const MatchItemList = () => {
  const { data: recentMatchList } = useGetRecentMatchList();

  return (
    <div className='flex overflow-x-auto gap-4 scroll-bar-hide'>
      {recentMatchList?.map((v: RecentMatch, i: number) => (
        <RecentMatchCard key={i} recentMatch={v} />
      ))}
    </div>
  );
};
export default MatchItemList;
