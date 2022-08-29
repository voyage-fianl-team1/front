import React, { FC, useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '../apis';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const Review: FC = () => {
  const { register, getValues } = useForm({});
  const [imgSrc, setImgSrc] = useState<string>(
    'https://cdn.pixabay.com/photo/2013/04/01/21/30/photo-99135_960_720.png'
  );
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
    setImgSrc('https://cdn.pixabay.com/photo/2013/04/01/21/30/photo-99135_960_720.png');
    setFile([]);
  }, []);

  const handleReviewUpload = async () => {
    const reviewData = {
      title: getValues().title,
      content: getValues().content,
    };
    const value = await apis.reviewUpload(2, reviewData);
    const formData = new FormData();
    if (file !== undefined) {
      for (let i = 0; i < file.length; i++) {
        formData.append('files', file[i]);
      }
      await apis.reviewImage(value, formData);
    }
  };

  return (
    <section className='w-full h-[40rem] border border-matchgi-gray flex flex-col items-center justify-center gap-2 rounded-lg p-1'>
      <div className='w-60 h-60 mb-2'>
        <span className='fixed ml-52 mt-3'>
          <button className='text-2xl text-white font-black' onClick={handledeleteImage}>
            <IoMdCloseCircleOutline />
          </button>
        </span>
        <img
          alt='No Image'
          src={imgSrc}
          className='flex flex-row gap-5 mb-4 w-60 h-60 rounded-3xl  bg-matchgi-lightgray'
        />
      </div>

      <input type='file' accept='image/*' multiple className='hidden' onChange={onUploadIamge} ref={inputRef}></input>
      <div>
        <button className='border border-black' onClick={imgBtn}>
          파일올리기
        </button>
      </div>
      <div className='flex flex-col justify-center items-center w-11/12 h-72 border border-matchgi-gray rounded-xl bg-matchgi-lightgray gap-2'>
        <input className='w-11/12 h-6 border border-matchgi-gray' {...register('title')}></input>
        <div className='flex flex-row'></div>
        <textarea className='w-11/12 h-36 border border-matchgi-gray' {...register('content')}></textarea>
        <span className='flex flex-row gap-5 mt-3'>
          <button
            className='border w-14 h-7 border-black bg-white p-0.25 text-xs
          '
            onClick={handleReviewUpload}
          >
            작성하기
          </button>
          <button className='border w-14 h-7 border-black bg-white p-0.25 text-xs'>취소</button>
        </span>
      </div>
    </section>
  );
};

export default Review;
