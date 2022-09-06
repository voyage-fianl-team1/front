import React from 'react';
import { apis } from '../apis';
import { useQuery } from '@tanstack/react-query';
import { RecentMatch } from '../typings';
import { useNavigate } from 'react-router-dom';
import { convertDateShort } from '../util/converDate';

const MatchItem = () => {
  const navigate = useNavigate();
  const res = useQuery(['recentMatchList'], apis.getMatchItem);

  const recentList = res?.data?.data.content;

  return (
    <div className='flex overflow-x-auto gap-4 scroll-bar-hide'>
      {recentList &&
        recentList.map((v: RecentMatch, i: number) => (
          <div className='recent-match-card' key={i}>
            <h1 className='font-semibold text-[14px] mb-[7px] truncate ...'>{v.title}</h1>
            <h2 className='text-[14px]'>{v.subject}</h2>
            <h2 className='text-[14px]'>{v.content}</h2>
            <p className='text-[12px] mt-[24px] text-matchgi-gray truncate ...'>{v.address}</p>
            <div className='flex justify-between items-center mt-[12px]'>
              <span className='text-sm text-matchgi-gray'>{convertDateShort(v.createdAt)}</span>
              <button
                className='border-[1px] border-[#C5C6CA] text-sm px-[8px] pt-[2px] rounded text-[#5D5E62] text-[12px] '
                onClick={() => navigate(`/match/${v.postId}`)}
              >
                더보기
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default MatchItem;
