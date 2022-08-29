import React, { FC, useEffect, useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { apis } from '../apis';
import { PostEditDataProps, ImageType } from '../typings';
import { addressClear } from '../redux/features/addressSlice';
import { toggleClear, toggleModalShow } from '../redux/features/sortSlice';
import Modal from '../components/Modal';
import MapContainer from '../components/MapContainer';
import Calendars from '../components/Calendar';

const Newpost: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File[]>([]);
  const [imgUrl, setImageUrl] = useState([]);
  const address = useSelector((state: RootState) => state.address);
  const modalShow = useSelector((state: RootState) => state.sort.modalShow);
  const date = useSelector((state: RootState) => state.calendar.date);
  console.log(date);
  const { register, getValues } = useForm({});
  const data = location.state as PostEditDataProps;

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
    };
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };

  const handleDataUpload = async () => {
    const postData = {
      title: getValues().title,
      matchDeadline: getValues().matchDeadline,
      subject: getValues().subject,
      content: getValues().content,
      lat: address.lat,
      lng: address.lng,
      address: address.address,
    };
    const value = await apis.postUpload(postData);
    if (uploadImage.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < uploadImage.length; i++) {
        formData.append('files', uploadImage[i]);
      }
      await apis.uploadImage(value, formData);
    }
    navigate('/search');
  };

  useEffect(() => {
    dispatch(toggleClear());
    if (data) {
      setImageUrl(data.imgurls);
    }
    return () => {
      dispatch(addressClear());
    };
  }, []);

  const handleEditUpload = async () => {
    const postData = {
      title: getValues().title,
      matchDeadline: getValues().matchDeadline,
      subject: getValues().subject,
      content: getValues().content,
      lat: address.lat,
      lng: address.lng,
      address: address.address,
    };
    await apis.updatePost(data.postId, postData);

    if (uploadImage.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < uploadImage.length; i++) {
        if (uploadImage[i] !== null) {
          formData.append('files', uploadImage[i]);
        }
      }
      await apis.uploadImage(data.postId, formData);
    } else {
      navigate('/search');
    }
    navigate('/search');
  };
  const handleImgBtn = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const handledeletePrevImg = async (id: number) => {
    setImages(images.filter((_, index) => index !== id));
    setUploadImage([...uploadImage.slice(0, id), ...uploadImage.slice(id + 1)]);
  };

  const handledeleteImage = async (id: number) => {
    if (window.confirm('이미지를 삭제하시겠습니까?')) {
      const imgpaths = data.imgpaths[id];
      if (imgpaths !== undefined) {
        await apis.deleteImage(imgpaths['path']);
      }
      if (data.imgurls.length > 0) {
        setImageUrl(imgUrl.filter((_, index) => index !== id));
      }
    }
  };

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModalShow());
  }, [modalShow]);

  // const handleToggleSelect = useCallback(() => {
  //   dispatch(toggleSubjectShow());
  // }, []);

  return (
    <section>
      <p className='text-[0.75rem] text-matchgi-black'>경기 썸네일</p>
      <div className='flex flex-row'>
        {data
          ? imgUrl.map((image: ImageType, id) => (
              <div key={id}>
                <img className='h-5 w-5' alt='' src={image['url']} />
                <button type='button' onClick={() => handledeleteImage(id)}>
                  삭제
                </button>
              </div>
            ))
          : images.map((image, id) => (
              <div key={id}>
                <img className='h-5 w-5' alt='' src={image} />
                <button type='button' onClick={() => handledeletePrevImg(id)}>
                  삭제
                </button>
              </div>
            ))}
        {data &&
          images.map((image, id) => (
            <div key={id}>
              <img className='h-5 w-5' alt='' src={image} />
              <button type='button' onClick={() => handledeletePrevImg(id)}>
                삭제
              </button>
            </div>
          ))}
        <img src='assets/images/post/photo.svg' className='cursor-pointer' onClick={handleImgBtn}></img>
      </div>
      <input type='file' accept='images/*' className='hidden' multiple onChange={onSaveFiles} required ref={inputRef} />
      <div className='flex flex-col'>
        <label className='w-[43px] h-[14px] text-[12px] leading-[120%]'>경기이름</label>
        <input
          className='box-border `py-[16px] px-[10px] w-11/12 h-[48px] bg-[#FFFFFF] rounded-[10px] border border-matchigi-bordergray
          text-matchgi-black'
          type='text'
          id='matchname'
          placeholder='경기 이름은 최대 20자까지 입력 가능합니다.'
          defaultValue={data && data.title}
          {...register('title', { required: true })}
        />
      </div>
      <p className='text-[12px] text-matchgi-black'>종목</p>
      <button
        className='box-border `py-[16px] px-[10px] w-11/12 h-[48px] bg-[#FFFFFF] rounded-[10px] border border-matchigi-bordergray
        text-matchgi-black'
        {...register('subject', { required: true })}
        defaultValue={data && data.subject}
      ></button>
      <section>
        <section className='flex flex-col justify-center'>
          <p className='text-[12px] text-matchgi-black'>모집마감일</p>
          <div
            className='box-border `py-[16px] px-[10px] w-11/12 h-[48px] bg-[#FFFFFF] rounded-[10px] border border-matchigi-bordergray
            text-matchgi-black'
          >
            {data ? data.matchDeadline : date}
          </div>
          <Calendars />
        </section>
        {modalShow && (
          <Modal onClickToggleModal={handleToggleModal}>
            <button className='ml-auto' onClick={handleToggleModal}>
              취소
            </button>
            <MapContainer />
          </Modal>
        )}
      </section>
      <section className='flex flex-col w-full bg-white mt-3 justify-between'>
        <p className='text-[12px] text-matchgi-black'>경기위치</p>
        <div
          className='box-border `py-[16px] px-[10px] w-11/12 h-[48px] bg-[#FFFFFF] rounded-[10px] border border-matchigi-bordergray
            text-matchgi-black'
          onClick={handleToggleModal}
          defaultValue={address.address}
        >
          {address.address}
        </div>
      </section>
      <section className='flex flex-col justify-center'>
        <p className='text-[12px] leading-[120%] tracking-tighter text-matchgi-black'>내용</p>
        <textarea
          className='w-11/12 h-[169px] border border-matchgi-bordergray rounded-[10px] px-[16px] py-[12px]
        mb-[60px]'
          {...register('content', { required: true })}
          placeholder='내용은 최대 100자까지 입력 가능합니다.'
          defaultValue={data && data.content}
        />
      </section>

      <div className='flex justify-center'>
        {data ? (
          <button className='bg-white mb-5' type='button' onClick={handleEditUpload}>
            수정하기
          </button>
        ) : (
          <button
            className='w-11/12 h-[47px] border border-matchgi-bordergray rounded-[4px] bg-matchgi-btnblue text-white cursor-pointer
         '
            onClick={handleDataUpload}
          >
            작성완료
          </button>
        )}
      </div>
    </section>
  );
};

export default Newpost;
