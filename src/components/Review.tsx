import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { JoinDataProps } from '../typings';

const Review = (props: JoinDataProps) => {
  const { register, getValues } = useForm({});
  const review = props.data;
  const [imgSrc, setImgSrc] = useState<string>('/assets/images/post/basic.svg');
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
    setImgSrc('/assets/images/post/basic.svg');
    setFile([]);
  }, []);

  const handleReviewUpload = async () => {
    const reviewData = {
      title: getValues().title,
      content: getValues().content,
    };
    const value = await apis.reviewUpload(review.postId, reviewData);
    const formData = new FormData();
    if (file !== undefined) {
      for (let i = 0; i < file.length; i++) {
        formData.append('files', file[i]);
      }
      await apis.reviewImage(value, formData);
    }
  };

  return (
    <>
      <section className='w-full h-full flex flex-col justify-center items-center bg-[#FCFCFC] mt-[42px]'>
        <input type='file' accept='image/*' multiple className='hidden' onChange={onUploadIamge} ref={inputRef}></input>
        <p
          className='w-full mb-[34px] pl-[20px] text-[#38393C] font-medium leading-[21px] text-[14px]
        font-Noto'
        >
          내 리뷰 작성 하기
        </p>
        <div className='flex flex-row'></div>
        <div className='w-full h-full mb-[36px]'>
          <div className='w-full h-[149px] border border-matchgi-gray rounded-[10px] resize-none p-[16px] text-[14px] leading-[150%]'>
            <textarea
              className='w-full h-[60px] rounded-[10px] resize-none p-[16px] text-[14px] leading-[150%]
            text-[#4A4B4E] tracking-[-0.04em] font-Noto bg-[#FCFCFC]'
              {...register('content')}
            ></textarea>
            <div className='w-[55px] h-[55px] absolute left-16'>
              <button className='text-[20px] text-[#FFF] font-black absolute right-0' onClick={handledeleteImage}>
                <IoMdCloseCircleOutline />
              </button>

              <img alt='No Image' src={imgSrc} />
            </div>
            <button className='absolute bottom-[29rem] w-[24px] h-[24px] left-6' onClick={imgBtn}>
              <img src='/assets/images/post/reviewImage.svg' alt='reviewImage' />
            </button>
            <button
              className='absolute bottom-[29rem] right-6 border w-[52px] h-[27px] rounded-[4px] bg-[#14308B] text-[#FFF] p-0.25 text-[14px] leading-[0.07rem] tracking-[-0.04rem]
          font-Noto py-[5px] px-[13px] gap-[10px]
          '
              onClick={handleReviewUpload}
            >
              입력
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
