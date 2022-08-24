import React from 'react';
import { instance } from '../apis';
import { useQuery } from '@tanstack/react-query';
import { RecentMatch } from '../typings';
import { useNavigate } from 'react-router-dom';

const MatchItem = () => {
  const navigate = useNavigate();
  const res = useQuery(
    ['recentMatchList'],
    async () => await instance.get('/api/posts?page=0&size=10&subject=ALL&sort=default')
  );

  const recentList = res?.data?.data.content;

  return (
    <div className='flex overflow-x-auto gap-4 scroll-bar-hide'>
      {recentList &&
        recentList.map((v: RecentMatch, i: number) => (
          <div className='recent-match-card' key={i}>
            <h1 className='font-semibold mb-1'>{v.title}</h1>
            <h2>{v.subject}</h2>
            <p>본문내용...</p>
            <p className='mt-5 text-sm text-matchgi-gray'>{v.address}</p>
            <div className='flex justify-between items-center mt-2'>
              <span className='text-sm text-matchgi-gray'></span>
              <button
                className='border-[1px] border-[#C5C6CA] text-sm p-1 rounded text-[#5D5E62]'
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
