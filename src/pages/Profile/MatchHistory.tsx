import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/Common/loadingSpinner';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { matchResultTable } from '../../shared/constant/matchResultTable';
import { convertSubjectToKorean } from '../../util/convertSubjectToKorean';
import useUserMatchHistory from '../../hooks/queries/useUserMatchHistory';

const MatchHistory = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const subject = location.pathname.split('/')[4];

  const { data: userMatchHistories, isLoading } = useUserMatchHistory(userId, subject);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (userMatchHistories?.length === 0) {
    return <div className='text-sm text-black/30 my-10 text-center'>참가한 경기가 없습니다</div>;
  }

  return (
    <>
      <Helmet>
        <title>매치기 | 경기기록</title>
      </Helmet>

      <ul className='flex flex-col gap-3 justify-start w-[100%] mt-5'>
        {userMatchHistories?.map((d, idx) => (
          <Link key={d.postId} to={`/match/${d.postId}`}>
            <li key={idx} className='flex justify-between pb-5 pt-3 rounded border-b-[#F4F5F5] border-b-2'>
              <div className='flex'>
                <img
                  src={d.imgUrl || '/assets/images/post/noImage.svg'}
                  alt='imageUrl'
                  className='w-[68px] h-[68px] rounded-[8px] object-cover'
                />
                <div className='ml-2 '>
                  <h1 className='text-[16px] mb-1'>{d.title}</h1>
                  <p className='text-[#9A9B9F] text-[12px] mb-1'>{dayjs(d.matchDeadline).format('YYYY.MM.DD (ddd)')}</p>
                  <p className='text-[#5D5E62] text-[12px] bg-[#F4F5F5] inline-block px-2 rounded'>
                    {convertSubjectToKorean(d.subject)}
                  </p>
                </div>
              </div>
              <div className='flex flex-col justify-center '>
                <div className={`text-white rounded py-[6px] px-[12px] ${matchResultTable[d.status].color}`}>
                  {matchResultTable[d.status].text}
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default MatchHistory;
