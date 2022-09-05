import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import LoadingSpinner from './loadingSpinner';
import { UserRequest } from '../typings';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export const statusTable: { [key: string]: any } = {
  PENDING: {
    text: '승인 대기중',
    color: 'bg-[#6367CC]',
  },
  REJECT: {
    text: '경기종료',
    color: 'bg-[#9A9B9F]',
  },
  ACCEPT: {
    text: '승인 완료',
    color: 'bg-[#14308B]',
  },
  WIN: {
    text: '승리',
    color: 'bg-white border-[1px] border-[#3341A0] text-black',
  },
  LOSE: {
    text: '패배',
    color: 'bg-white border-[1px] border-[#9A9B9F] text-[#38393C] ',
  },
  DRAW: {
    text: '무승부',
    color: 'bg-white border-[1px] border-[#DCDDE0] text-[#717275] ',
  },
  MYMATCH: {
    text: '내 경기',
    color: 'bg-[#DCDDE0] border-[1px] border-[#9A9B9F] text-black ',
  },
};

interface Props {
  maxCount?: number;
}

const UserMatches: FC<Props> = ({ maxCount }) => {
  const { data } = useQuery<UserRequest[]>(['user-requests'], apis.getUserRequests);

  if (!data) {
    return <LoadingSpinner />;
  }

  if (data.length === 0) {
    return <div className='text-sm text-black/30 my-10 text-center'>신청한 경기가 없습니다</div>;
  }

  return (
    <ul className='flex flex-col gap-3 justify-start w-[100%] mt-5'>
      {data.slice(0, maxCount || data.length).map((d) => (
        <Link key={d.id} to={`/match/${d.id}`}>
          <li className='flex justify-between pb-5 pt-3 rounded border-b-[#F4F5F5] border-b-2'>
            <div className='flex'>
              <img
                src={d.imageUrl[0] || '/assets/images/post/noImage.svg'}
                alt='imageUrl'
                className='w-[68px] h-[68px] rounded-[8px] object-cover'
              />
              <div className='ml-2 '>
                <h1 className='text-[16px] mb-1'>{d.title}</h1>
                <p className='text-[#9A9B9F] text-[12px] mb-1'>{dayjs(d.createdAt).format('YYYY.MM.DD (ddd)')}</p>
                <p className='text-[#5D5E62] text-[12px] bg-[#F4F5F5] inline-block px-2 rounded'>{d.subject}</p>
              </div>
            </div>
            <div className='flex flex-col justify-center '>
              <div className={`text-white text-[12px] rounded py-[5px] px-[8px] ${statusTable[d.requestStatus].color}`}>
                {statusTable[d.requestStatus].text}
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default UserMatches;
