/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import instance from '../apis';
// eslint-disable-next-line no-undef

const Newpost: FC = () => {
  const [images, setImages] = useState<string[]>([]);
  // const [uploadFile, setUploadFile] = useState<FileList | undefined>();
  const [postId, setPostId] = useState<number>();
  const navigate = useNavigate();
  const { register, getValues } = useForm();
  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (files.length > 3) {
      alert('이미지는 세장까지 업로드 가능합니다.');
    }
    const readAndPreview = (file: File) => {
      const reader = new FileReader();
      reader.onload = () => setImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
      // setUploadFile(files);
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };
  console.log(uploadFile);
  const onFileUpload = async () => {
    const formData = new FormData();
    const postData = {
      title: getValues().title,
      matchDeadline: getValues().matchDeadline,
      peopleDeadline: getValues().peopleDeadline,
      subject: getValues().subject,
      content: getValues().content,
      lat: 37.5,
      lng: 127.4,
      address: '서울특별시 동작구',
    };
    await instance.post('/api/posts', postData).then((res) => {
      setPostId(res.data.postId);
      console.log(res.data);
    });
    Array.from(images).forEach((file) => formData.append('files', file));
    instance.post(`/api/images/posts/${postId}`, formData);
  };
  const deleteImage = (id: number) => {
    setImages(images.filter((_, index) => index !== id));
  };

  const previewImage = () => {
    return images.map((image, id) => (
      <div key={id}>
        <img className='h-72 w-72' alt='' src={image} />
        <button type='button' onClick={() => deleteImage(id)}>
          삭제
        </button>
      </div>
    ));
  };
  return (
    <section className='flex flex-col justify-center bg-gray-200 w-full h-screen '>
      제목
      <input className='mb-3 w-full' type='text' {...register('title', { required: true })} />
      <section className='flex h-1/2 justify-center items-center gap-5'>{previewImage()}</section>
      <input type='file' multiple onChange={onSaveFiles} required />
      <section className='flex flex-row gap-1 justify-center'>
        <div className='w-full'>
          모집마감일
          <input className='w-full' type='date' {...register('matchDeadline', { required: true })} />
        </div>
        <div className='w-full'>
          경기마감일
          <input className='w-full' type='date' {...register('peopleDeadline', { required: true })} />
        </div>
      </section>
      종목
      <select className='w-full text-center' {...register('subject', { required: true })}>
        <option value='null'>-종목을 골라주세요-</option>
        <option value='SOCCER'>축구</option>
        <option value='BASKETBALL'>농구</option>
        <option value='BADMINTON'>배드민턴</option>
        <option value='BILLIARDS'>당구</option>
        <option value='BOWLING'>볼링</option>
        <option value='TENNIS'>테니스</option>
      </select>
      내용
      <textarea className='mb-5 w-full h-2/5' {...register('content', { required: true })} />
      <div className='flex items-center justify-center gap-5'>
        <button className='bg-white mb-5' type='button' onClick={onFileUpload}>
          작성하기
        </button>
        <button className='bg-white mb-5' type='button' onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </section>
  );
};

export default Newpost;
