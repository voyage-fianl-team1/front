import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { Link, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/loadingSpinner';
import { MatchHistoryType } from '../typings';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';

const histtoryTable: { [key: string]: any } = {
  LOSE: {
    text: '패배',
    color: 'text-red-500',
  },
  WIN: {
    text: '승리',
    color: 'text-[#87CEFA]',
  },
  DRAW: {
    text: '무승부',
    color: 'text-black',
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

const MatchHistory = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const subject = location.pathname.split('/')[4];

  const { data } = useQuery<MatchHistoryType[]>(['user', userId, subject], () =>
    apis.getUserHistory(Number(userId), subject)
  );

  if (!data) {
    return <LoadingSpinner />;
  }

  if (data.length === 0) {
    return (
      <>
        <Helmet>
          <title>매치기 | 경기기록</title>
        </Helmet>
        <div className='text-sm text-black/30 my-10 text-center'>참가한 경기가 없습니다</div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>매치기 | 경기기록</title>
      </Helmet>
      <ul className='flex flex-col gap-3 justify-start w-[100%] mt-5'>
        {data.map((d, idx) => (
          <li key={idx} className='flex justify-between bg-gray-100 p-2 rounded'>
            <h1>
              {dayjs(d.matchDeadline).format('YYYY/MM/DD')} <span className='ml-5'>{subjectTable[d.subject]}</span>
            </h1>
            <div className={`${histtoryTable[d.status].color}`}>{histtoryTable[d.status].text}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MatchHistory;
