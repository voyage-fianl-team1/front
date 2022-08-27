import React from 'react';
import { apis } from '../apis';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './loadingSpinner';

const ReviewDetail = () => {
  const navigate = useNavigate();
  const { data } = useQuery(['reviewList'], async () => await apis.getReviewList(2));
  if (!data) {
    return <LoadingSpinner />;
  }
  const reviews = data.data.reviewList;
  console.log();
  return (
    <section className='w-full h-[40rem] border border-matchgi-gray flex flex-col items-center justify-center gap-2 rounded-lg p-1'>
      <div className='w-60 h-60 mb-2'>
        <span className='fixed ml-52 mt-3'></span>
        <img
          alt='No Image'
          src={reviews[0]['imgUrlList'][0]}
          className='flex flex-row gap-5 mb-4 w-60 h-60 rounded-3xl  bg-matchgi-lightgray'
        />
      </div>
      <div className='flex flex-col justify-center items-center w-11/12 h-72 border border-matchgi-gray rounded-xl bg-matchgi-lightgray gap-2'>
        <div className='flex flex-row'></div>
        <div className='w-11/12 h-6 border border-matchgi-gray bg-white'>{reviews[0]['nickname']}</div>
        <div className='w-11/12 h-6 border border-matchgi-gray bg-white'>{reviews[0]['title']}</div>
        <div className='w-11/12 h-36 border border-matchgi-gray bg-white'>{reviews[0]['content']}</div>
        <span className='flex flex-row gap-5 mt-3'>
          <button className='border w-14 h-7 border-black bg-white p-0.25 text-xs'>삭제</button>
          <button className='border w-14 h-7 border-black bg-white p-0.25 text-xs' onClick={() => navigate(-1)}>
            취소
          </button>
        </span>
      </div>
    </section>
  );
};

export default ReviewDetail;
