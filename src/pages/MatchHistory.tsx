import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { Link, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';
import { MatchHistoryType } from '../typings';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const historyTable: { [key: string]: any } = {
  LOSE: {
    text: '패',
    color: 'bg-[#717275]',
  },
  WIN: {
    text: '승',
    color: 'bg-[#3341A0]',
  },
  DRAW: {
    text: '무',
    color: 'bg-[#d2d2d2]',
  },
};

const subjectTable: { [key: string]: any } = {
  BASKETBALL: '농구',
  SOCCER: '축구',
  BOWLING: '볼링',
  TENNIS: '테니스',
  BADMINTON: '배드민턴',
  BILLIARDS: '당구',
  ETC: '기타',
};

const imgURL = 'https://cdn.britannica.com/51/190751-050-147B93F7/soccer-ball-goal.jpg?q=60';

const MatchHistory = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const subject = location.pathname.split('/')[4];
  const { win, lose, draw } = useSelector((state: RootState) => state.user);

  const { data } = useQuery<MatchHistoryType[]>(['user', userId, subject], () =>
    apis.getUserHistory(Number(userId), subject)
  );

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>매치기 | 경기기록</title>
      </Helmet>
      <div className='match-box flex justify-around p-2'>
        <div className='flex flex-col items-center gap-3 py-5'>
          <h1 className='text-[#717275]'>전체경기</h1>
          <span className='text-[#38393C] font-[500]'>{win + lose + draw}</span>
        </div>
        <div className='flex flex-col items-center gap-3 py-5'>
          <h1 className='text-[#717275]'>승</h1>
          <span className='text-[#38393C] font-[500]'>{win}</span>
        </div>
        <div className='flex flex-col items-center gap-3 py-5'>
          <h1 className='text-[#717275]'>패</h1>
          <span className='text-[#38393C] font-[500]'>{lose}</span>
        </div>
        <div className='flex flex-col items-center gap-3 py-5'>
          <h1 className='text-[#717275]'>무</h1>
          <span className='text-[#38393C] font-[500]'>{draw}</span>
        </div>
      </div>
      {data.length === 0 ? (
        <div className='text-sm text-black/30 my-10 text-center'>참가한 경기가 없습니다</div>
      ) : (
        <ul className='flex flex-col gap-3 justify-start w-[100%] mt-5'>
          {data.map((d, idx) => (
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
                    <p className='text-[#9A9B9F] text-[12px] mb-1'>
                      {dayjs(d.matchDeadline).format('YYYY.MM.DD (ddd)')}
                    </p>
                    <p className='text-[#5D5E62] text-[12px] bg-[#F4F5F5] inline-block px-2 rounded'>
                      {subjectTable[d.subject]}
                    </p>
                  </div>
                </div>
                <div className='flex flex-col justify-center '>
                  <div className={`text-white text-[12px] rounded py-3 px-4 ${historyTable[d.status].color}`}>
                    {historyTable[d.status].text}
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default MatchHistory;
