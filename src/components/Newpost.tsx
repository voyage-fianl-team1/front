import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { instance } from '../apis';
import { PostEditDataProps, ImageType } from '../typings';

const Newpost: FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as PostEditDataProps;
  const { register, getValues } = useForm({});
  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (files.length + images.length > 3) {
      return alert('이미지는 세장까지 업로드 가능합니다.');
    }
    const readAndPreview = (file: File) => {
      const reader = new FileReader();
      reader.onload = () => setImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
      setUploadImage(Array.from(files) || []);
      if (data) {
        images.concat(data.imgurls);
      }
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };
  console.log(images);
  const onDataUpload = async () => {
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
    const value = await instance.post('/api/posts', postData).then((res) => {
      return res.data.postId;
    });
    const formData = new FormData();
    for (let i = 0; i < uploadImage.length; i++) {
      if (uploadImage[i] !== null) {
        formData.append('files', uploadImage[i]);
      }
    }
    await instance.post(`/api/images/posts/${value}`, formData).then((res) => {
      console.log(res);
      navigate('/search');
    });
  };

  const onEditDataUpload = async () => {
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
    await instance.put(`/api/posts/${data.postId}`, postData);
    const formData = new FormData();
    for (let i = 0; i < uploadImage.length; i++) {
      if (uploadImage[i] !== null) {
        formData.append('files', uploadImage[i]);
      }
    }
    await instance.post(`/api/images/posts/${data.postId}`, formData).then((res) => {
      console.log(res);
      navigate('/search');
    });
  };

  const deletePreviewImage = async (id: number) => {
    setImages(images.filter((_, index) => index !== id));
    setUploadImage([...uploadImage.slice(0, id), ...uploadImage.slice(id + 1)]);
  };
  const deleteImage = async (id: number) => {
    await instance.delete(`/api/images/posts/${id + 1}`);
  };
  const previewImage = () => {
    if (data) {
      return data.imgurls?.map((image: ImageType, id) => (
        <div key={id}>
          <img className='h-72 w-72' alt='' src={image['url']} />
          <button type='button' onClick={() => deleteImage(id)}>
            삭제
          </button>
        </div>
      ));
    } else {
      return images.map((image, id) => (
        <div key={id}>
          <img className='h-72 w-72' alt='' src={image} />
          <button type='button' onClick={() => deletePreviewImage(id)}>
            삭제
          </button>
        </div>
      ));
    }
  };

  const editPreviewImage = () => {
    if (data) {
      return images.map((image, id) => (
        <div key={id}>
          <img className='h-72 w-72' alt='' src={image} />
          <button type='button' onClick={() => deletePreviewImage(id)}>
            삭제
          </button>
        </div>
      ));
    }
  };
  return (
    <section className='flex flex-col justify-center bg-gray-200 w-full h-screen '>
      제목
      <input
        className='mb-3 w-full'
        type='text'
        defaultValue={data && data.title}
        {...register('title', { required: true })}
      />
      <section className='flex h-1/2 justify-center items-center gap-5'>
        {previewImage()}
        {editPreviewImage()}
      </section>
      <input type='file' multiple onChange={onSaveFiles} required />
      <section className='flex flex-row gap-1 justify-center'>
        <div className='w-full'>
          모집마감일
          <input
            className='w-full'
            type='date'
            {...register('matchDeadline', { required: true })}
            defaultValue={data && data.matchDeadline}
          />
        </div>
        <div className='w-full'>
          경기마감일
          <input
            className='w-full'
            type='date'
            {...register('peopleDeadline', { required: true })}
            defaultValue={data && data.peopleDeadline}
          />
        </div>
      </section>
      종목
      <select
        className='w-full text-center'
        {...register('subject', { required: true })}
        defaultValue={data && data.subject}
      >
        <option value='ALL'>-종목을 골라주세요-</option>
        <option value='SOCCER'>축구</option>
        <option value='BASKETBALL'>농구</option>
        <option value='BADMINTON'>배드민턴</option>
        <option value='BILLIARDS'>당구</option>
        <option value='BOWLING'>볼링</option>
        <option value='TENNIS'>테니스</option>
      </select>
      내용
      <textarea
        className='mb-5 w-full h-2/5'
        {...register('content', { required: true })}
        defaultValue={data && data.content}
      />
      <div className='flex items-center justify-center gap-5'>
        {data ? (
          <button className='bg-white mb-5' type='button' onClick={onEditDataUpload}>
            수정하기
          </button>
        ) : (
          <button className='bg-white mb-5' type='button' onClick={onDataUpload}>
            작성하기
          </button>
        )}
        <button className='bg-white mb-5' type='button' onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </section>
  );
};

export default Newpost;
