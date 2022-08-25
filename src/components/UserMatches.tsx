import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import LoadingSpinner from './loadingSpinner';
import { UserRequest } from '../typings';
import { Link } from 'react-router-dom';

const statusTable: { [key: string]: any } = {
  ONGOING: {
    text: '승인대기',
    color: 'text-[#87CEFA]',
  },
  MATCHEND: {
    text: '경기종료',
    color: 'text-black',
  },
};

const UserMatches = () => {
  const { data } = useQuery<UserRequest[]>(['user-requests'], apis.getUserRequests);

  if (!data) {
    return <LoadingSpinner />;
  }

  if (data.length === 0) {
    return <div className='text-sm text-black/30 my-10'>신청한 경기가 없습니다</div>;
  }

  return (
    <ul className='flex flex-col gap-3 justify-start w-[100%] mt-5'>
      {data.map((d) => (
        <Link key={d.id} to={`/match/${d.id}`}>
          <li className='flex justify-between bg-gray-100 p-2 rounded'>
            <h1>
              [{d.subject}] {d.title}
            </h1>
            <div className={`${statusTable[d.matchStatus].color}`}>{statusTable[d.matchStatus].text}</div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default UserMatches;
