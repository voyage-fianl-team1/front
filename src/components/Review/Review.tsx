import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useReview } from '../../hooks/review/useReview';
import { JoinDataProps } from '../../typings';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const Review = (props: JoinDataProps) => {
  const review = useMemo(() => props.data, [props.data]);
  const { register, getValues, resetField } = useForm({});
  const { imgBtn, inputRef, onUploadImage, handledeleteImage, imgSrc, handleReviewUpload } = useReview('');

  return (
    <>
      <section className='w-full h-full flex flex-col justify-center items-center bg-[#FCFCFC]'>
        <input type='file' accept='image/*' multiple className='hidden' onChange={onUploadImage} ref={inputRef}></input>
        <p
          className='w-full mb-[34px] pl-[20px] text-[#38393C] font-medium leading-[21px] text-[14px]
        font-Noto bg-[#FCFCFC]'
        >
          댓글 작성 하기
        </p>
        <div className='flex flex-row'></div>
        <div className='w-full h-full mb-[36px]'>
          <div className='w-full h-[149px] border border-matchgi-gray rounded-[10px] resize-none p-[16px] text-[14px] leading-[150%]'>
            <textarea
              className='w-full h-[60px] rounded-[10px] resize-none text-[14px] leading-[150%]
            text-[#4A4B4E] tracking-[-0.04em] font-Noto bg-[#FCFCFC] whitespace-pre-wrap focus:outline-none'
              minLength={2}
              maxLength={100}
              placeholder='댓글은 100글자 미만으로 작성 해주세요.'
              {...register('content')}
            />
            {imgSrc !== '' ? (
              <>
                <div className='absolute left-16'>
                  <button
                    className='w-[20px] h-[20px] text-[20px] text-[#FFF] absolute left-11'
                    onClick={handledeleteImage}
                  >
                    <IoMdCloseCircleOutline />
                  </button>
                  <img alt='No Image' src={imgSrc} className='w-[65px] h-[60px]' />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className='flex flex-row justify-between'>
              <button className='w-[24px] h-[24px]' onClick={imgBtn}>
                <img src='/assets/images/post/reviewImage.svg' alt='reviewImage' />
              </button>
              <button
                className='flex justify-center items-center border w-[52px] h-[27px] rounded-[4px] bg-[#14308B] text-[#FFF] p-0.25 text-[14px] leading-[0.07rem] tracking-[-0.04rem]
          font-Noto
          '
                onClick={() => {
                  handleReviewUpload(review.postId, getValues().content);
                  resetField('content');
                }}
              >
                <p className='font-Noto'>입력</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
