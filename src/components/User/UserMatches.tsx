import React, { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import LoadingSpinner from '../Common/loadingSpinner';
import { UserRequest } from '../../typings';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { categories } from '../../shared/constant/subjectTable';
import { sortCategories } from '../../shared/constant/sortTable';
import useUserRequests from '../../hooks/queries/useUserRequests';
import { userRequestStatusTable } from '../../shared/constant/matchResultTable';

interface Props {
  maxCount?: number;
}

const UserMatches: FC<Props> = ({ maxCount }) => {
  const { data: userRequests, isLoading } = useUserRequests();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (userRequests?.length === 0) {
    return <div className='text-sm text-black/30 my-10 text-center'>신청한 경기가 없습니다</div>;
  }

  return (
    <ul className='flex flex-col gap-3 justify-start w-[100%] mt-5'>
      {userRequests?.slice(0, maxCount || userRequests?.length).map((d) => (
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
                <p className='text-[#5D5E62] text-[12px] bg-[#F4F5F5] inline-block px-2 rounded'>
                  {categories.find((c) => c.value === d.subject)?.title}
                </p>
              </div>
            </div>
            <div className='flex flex-col justify-center '>
              <div
                className={`text-white text-[12px] rounded py-[5px] px-[8px] ${
                  userRequestStatusTable[d.requestStatus].color
                }`}
              >
                {userRequestStatusTable[d.requestStatus].text}
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default UserMatches;
