import React, { FC, useState } from 'react';

const New: FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (!files[0]) return;
    if (images.length + files.length > 3) {
      // eslint-disable-next-line consistent-return
      return alert('이미지는 세장까지 업로드 가능합니다.');
    }
    const readAndPreview = (file: any) => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = () => setImages((prev) => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      }
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };
  return (
    <section className='flex flex-col justify-center items-center bg-gray-200 h-full '>
      제목
      <input className='mb-3 w-5/12' type='text' />
      <section className='flex flex-row'>
        <img className='w-40 h-40 bg-black' alt='' src={images[0]} />
        <img className='w-40 h-40 bg-black' alt='' src={images[1]} />
        <img className='w-40 h-40 bg-black' alt='' src={images[2]} />
      </section>
      <input type='file' accept='image/*' multiple onChange={onFileChange} />
      모집마감일
      <input className='w-5/12' type='text' />
      필요인원
      <input className='w-5/12' type='text' />
      종목
      <select className='w-5/12 text-center'>
        <option value='subject'>-종목을 골라주세요-</option>
        <option value='soccer'>축구</option>
        <option value='basketball'>농구</option>
        <option value='badminton'>배드민턴</option>
        <option value='billiards'>당구</option>
        <option value='bowling'>볼링</option>
        <option value='tennis'>테니스</option>
      </select>
      내용
      <textarea className='mb-5 w-5/12 h-20' />
      <div>
        <button className='bg-white mb-5 mr-5' type='button'>
          작성하기
        </button>
        <button className='bg-white mb-5' type='button'>
          취소
        </button>
      </div>
    </section>
  );
};

export default New;
