import { convertDateShort } from '../../util/converDate';
import React, { FC } from 'react';
import { RecentMatch } from '../../typings';
import { useNavigate } from 'react-router-dom';

interface Props {
  recentMatch: RecentMatch;
  key: number;
}

const RecentMatchCard: FC<Props> = ({ recentMatch, key }) => {
  const navigate = useNavigate();

  return (
    <div className='recent-match-card' key={key}>
      <h1 className='font-semibold text-[14px] mb-[7px] truncate ...'>{recentMatch.title}</h1>
      <h2 className='text-[14px]'>{recentMatch.subject}</h2>
      <h2 className='text-[14px] truncate ...'>{recentMatch.content}</h2>
      <p className='text-[12px] mt-[24px] text-matchgi-gray truncate ...'>{recentMatch.address}</p>
      <div className='flex justify-between items-center mt-[12px]'>
        <span className='text-sm text-matchgi-gray'>{convertDateShort(recentMatch.createdAt)}</span>
        <button
          className='border-[1px] border-[#C5C6CA] text-sm px-[8px] pt-[2px] rounded text-[#5D5E62] text-[12px] '
          onClick={() => navigate(`/match/${recentMatch.postId}`)}
        >
          더보기
        </button>
      </div>
    </div>
  );
};

export default React.memo(RecentMatchCard);
