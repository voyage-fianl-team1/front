import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { JoinDataProps } from '../typings';
import { useQueryClient } from '@tanstack/react-query';

const Review = (props: JoinDataProps) => {
  const { register, getValues, resetField } = useForm({});
  const review = props.data;
  const queryClient = useQueryClient();
  const [imgSrc, setImgSrc] = useState<string>('');
  const [file, setFile] = useState<File[]>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadIamge = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(Array.from(e.target.files));
    setImgSrc(URL.createObjectURL(e.target.files[0]));
  }, []);

  const imgBtn = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const handledeleteImage = useCallback(() => {
    setImgSrc('');
    setFile([]);
  }, []);

  const handleReviewUpload = async () => {
    if (getValues().content.length < 2) {
      return alert('댓글 최소 2글자 이상 입력해주세요.');
    }
    const value = await apis.reviewUpload(review.postId, { content: getValues().content });
    const formData = new FormData();
    if (file !== undefined && file.length >= 1) {
      formData.append('files', file[0]);
      await apis.reviewImage(value, formData);
      setFile([]);
    }
    queryClient.invalidateQueries(['reviewList']);
    setImgSrc('/assets/images/post/basic.svg');
    resetField('content');
  };

  return (
    <>
      <section className='w-full h-full flex flex-col justify-center items-center bg-[#FCFCFC]'>
        <input type='file' accept='image/*' multiple className='hidden' onChange={onUploadIamge} ref={inputRef}></input>
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
              className='w-full h-[60px] rounded-[10px] resize-none p-[16px] text-[14px] leading-[150%]
            text-[#4A4B4E] tracking-[-0.04em] font-Noto bg-[#FCFCFC]'
              minLength={2}
              maxLength={100}
              placeholder='댓글은 100글자 미만으로 작성 해주세요.'
              {...register('content')}
            ></textarea>
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
                className='border w-[52px] h-[27px] rounded-[4px] bg-[#14308B] text-[#FFF] p-0.25 text-[14px] leading-[0.07rem] tracking-[-0.04rem]
          font-Noto py-[5px] px-[13px] gap-[10px]
          '
                onClick={handleReviewUpload}
              >
                입력
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
