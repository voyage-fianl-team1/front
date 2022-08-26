import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const UserRankInfo = () => {
  const { win, lose, draw } = useSelector((state: RootState) => state.user);
  return (
    <div className='flex flex-col justify-start w-[100%] mt-[80px]'>
      <h1 className='text-3xl font-bold'>
        {win + lose + draw}전 {win}승 {lose}패 {draw}무
      </h1>
    </div>
  );
};

export default UserRankInfo;
