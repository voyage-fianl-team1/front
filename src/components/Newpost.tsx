/* eslint-disable react/no-array-index-key */
import axios from 'axios';
import React, { FC, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-undef
const Newpost: FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const fileList: File[] = [];
  // const { register, getValues } = useForm<HTMLInputElement>();
  const title = useRef<HTMLInputElement>(null);
  const peopleDeadline = useRef<HTMLInputElement>(null);
  const matchDeadline = useRef<HTMLInputElement>(null);
  const subject = useRef<HTMLSelectElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const onSaveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (files.length > 3) {
      // eslint-disable-next-line consistent-return
      return alert('이미지는 세장까지 업로드 가능합니다.');
    }
    const readAndPreview = (file: File) => {
      const reader = new FileReader();
      reader.onload = () => setImages((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
    const uploadFiles = Array.prototype.slice.call(e.target.value);

    uploadFiles.forEach((uploadFile) => {
      fileList.push(uploadFile);
    });
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('multipartFiles', file);
    });

    const postData = {
      title: title.current?.value,
      peopleDeadline: peopleDeadline.current?.value,
      matchDeadline: matchDeadline.current?.value,
      subject: subject.current?.value,
      content: content.current?.value,
      lat: 37.5,
      lng: 127.4,
      address: '서울특별시 동작구',
    };
    formData.append('stringpostData', JSON.stringify(postData));
    console.log('성공');
    await axios.post('http://localhost:8080/api/post', formData);
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
      <input className='mb-3 w-full' type='text' ref={title} required />
      <section className='flex h-1/2 justify-center items-center gap-5'>{previewImage()}</section>
      <input type='file' multiple onChange={onSaveFiles} required />
      <section className='flex flex-row gap-1 justify-center'>
        <div className='w-full'>
          모집마감일
          <input className='w-full' type='date' ref={matchDeadline} required />
        </div>
        <div className='w-full'>
          경기마감일
          <input className='w-full' type='date' ref={peopleDeadline} required />
        </div>
      </section>
      종목
      <select className='w-full text-center' ref={subject} required>
        <option value='null'>-종목을 골라주세요-</option>
        <option value='SOCCER'>축구</option>
        <option value='BASKETBALL'>농구</option>
        <option value='BADMINTON'>배드민턴</option>
        <option value='BILLIARDS'>당구</option>
        <option value='BOWLING'>볼링</option>
        <option value='TENNIS'>테니스</option>
      </select>
      내용
      <textarea className='mb-5 w-full h-2/5' ref={content} required />
      <div className='flex items-center justify-center gap-5'>
        <button className='bg-white mb-5' type='button' onClick={onFileUpload}>
          작성하기
        </button>
        <button className='bg-white mb-5' type='button'>
          취소
        </button>
      </div>
    </section>
  );
};

export default Newpost;
