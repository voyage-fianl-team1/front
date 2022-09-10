import React, { FC, useEffect, useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { apis } from '../../apis';
import { PostEditDataProps, ImageType } from '../../typings';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { toggleCalendarShow, toggleClear, toggleModalShow, toggleSubjectShow } from '../../redux/features/toggleSlice';
import { addressClear } from '../../redux/features/addressSlice';
import { calendarClear } from '../../redux/features/calendarSlice';
import { subjectClear } from '../../redux/features/subjectSlice';
import MapContainer from '../../components/Modal/MapContainer';
import Calendars from '../../components/Modal/Calendar';
import CustomSubject from '../../components/Select/CustomSelect';
import { useQueryClient } from '@tanstack/react-query';

const Newpost: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { register, getValues } = useForm({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<File[]>([]);
  const [imgUrl, setImageUrl] = useState([]);
  const address = useSelector((state: RootState) => state.address);
  const subject = useSelector((state: RootState) => state.subject);
  const modalShow = useSelector((state: RootState) => state.toggle.modalShow);
  const calendarShow = useSelector((state: RootState) => state.toggle.calendarShow);
  const subjectShow = useSelector((state: RootState) => state.toggle.subjectShow);
  const date = useSelector((state: RootState) => state.calendar.date);
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
    if (getValues().title.length < 1) {
      return alert('제목을 입력해주세요.');
    } else if (subject.subject === '종목을 선택해주세요.') {
      return alert('종목을 선택해주세요.');
    } else if (date === '모집 마감일을 선택해 주세요.') {
      return alert('모집 마감일을 선택해 주세요.');
    } else if (address.address === '주소를 선택해 주세요.' && address.lat === 0 && address.lng === 0) {
      return alert('주소를 선택해주세요.');
    } else if (address.address === undefined) {
      return alert('올바른 주소를 선택해주세요.');
    } else if (getValues().content.length < 1) {
      return alert('내용을 입력해주세요.');
    } else {
      const postData = {
        title: getValues().title,
        matchDeadline: date,
        subject: subject.value,
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
      queryClient.removeQueries(['postData']);
      navigate('/search');
    }
  };

  useEffect(() => {
    dispatch(toggleClear());
    if (data) {
      setImageUrl(data.imgurls);
    }
    return () => {
      dispatch(addressClear());
      dispatch(calendarClear());
      dispatch(subjectClear());
    };
  }, []);

  const handleEditUpload = async () => {
    if (getValues().title.length < 1) {
      return alert('제목을 입력해주세요.');
    } else if (subject.subject === '종목을 선택해주세요.') {
      return alert('종목을 선택해주세요.');
    } else if (date === '모집 마감일을 선택해 주세요.') {
      return alert('모집 마감일을 선택해 주세요.');
    } else if (address.address === '주소를 선택해 주세요.' && address.lat === 0 && address.lng === 0) {
      return alert('주소를 선택해주세요.');
    } else if (address.address === undefined) {
      return alert('올바른 주소를 선택해주세요.');
    } else if (getValues().content.length < 1) {
      return alert('내용을 입력해주세요.');
    } else {
      const postData = {
        title: getValues().title,
        matchDeadline: date,
        subject: subject.value,
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
      }
      queryClient.removeQueries(['postData']);
      navigate('/search');
    }
  };

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

  const handleImgBtn = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModalShow());
  }, [modalShow]);

  const handleToggleCalendar = useCallback(() => {
    dispatch(toggleCalendarShow());
  }, [calendarShow]);

  const handleToggleSubject = useCallback(() => {
    dispatch(toggleSubjectShow());
  }, [subjectShow]);

  return (
    <section className='flex flex-col w-[100%] h-full'>
      <div className='flex flex-col items-center'>
        <div className='w-[100%] h-28 mb-[36px]'>
          <p className='text-[0.75rem] text-matchgi-black mb-[12px]'>경기 썸네일</p>
          <div className='flex flex-row'>
            {data
              ? imgUrl.map((image: ImageType, id) => (
                  <div key={id}>
                    <button type='button' className='absolute text-red-500' onClick={() => handledeleteImage(id)}>
                      <IoMdCloseCircleOutline />
                    </button>
                    <img className='w-[68px] h-[68px] rounded-[8px]' alt='' src={image['url']} />
                  </div>
                ))
              : images.map((image, id) => (
                  <div key={id}>
                    <div className='flex flex-col w-full h-full'>
                      <button type='button' className='absolute text-red-500' onClick={() => handledeletePrevImg(id)}>
                        <IoMdCloseCircleOutline />
                      </button>
                      <img className='w-[68px] h-[68px] rounded-[8px] mr-1' alt='' src={image} />
                    </div>
                  </div>
                ))}
            {data &&
              images.map((image, id) => (
                <div key={id}>
                  <button type='button' className='absolute text-red-500' onClick={() => handledeletePrevImg(id)}>
                    <IoMdCloseCircleOutline />
                  </button>
                  <img className='w-[68px] h-[68px] rounded-[8px]' alt='' src={image} />
                </div>
              ))}
            <img src='/assets/images/post/photo.svg' className='cursor-pointer' onClick={handleImgBtn}></img>
          </div>
        </div>
      </div>
      <input type='file' accept='images/*' className='hidden' multiple onChange={onSaveFiles} required ref={inputRef} />
      <div className='flex flex-col items-center'>
        <p className='w-[100%] h-[14px] text-[12px] leading-[120%] text-matchgi-black mb-[12px]'>경기이름</p>
        <input
          className='box-border `py-[16px] px-[10px] w-[100%] h-[48px] bg-[#FFFFFF] rounded-[10px] border border-matchigi-bordergray
          text-matchgi-black mb-[36px]'
          type='text'
          id='matchname'
          placeholder='경기 이름은 최대 20자까지 입력 가능합니다.'
          maxLength={20}
          defaultValue={data && data.title}
          {...register('title')}
        />
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-[12px] w-[100%] text-matchgi-black mb-[12px]'>종목</p>
        <div
          className={`box-border py-[12px] px-[10px] w-[100%] h-[48px] bg-[#FFFFFF] rounded-[10px] border border-matchigi-bordergray
        text-matchgi-black cursor-pointer mb-[36px] ${
          subjectShow ? 'rounded-b-none border-[#C5C6CA] drop-shadow-[0_4px_10px_-10px_rgba(0,0,0,0.08)]' : ''
        }`}
          onClick={handleToggleSubject}
        >
          <span>
            <div className='flex flex-row w-full justify-between'>
              <p>{subject.subject}</p>
              {subjectShow ? (
                <img src='/assets/images/post/arrow_top.svg' />
              ) : (
                <img src='/assets/images/post/arrow_donw.svg' />
              )}
            </div>
          </span>
        </div>
      </div>
      {subjectShow && <CustomSubject />}
      <section className='flex flex-col items-center'>
        <p className='w-[100%] text-[12px] text-matchgi-black mb-[12px]'>모집마감일</p>
        <div
          className='box-border py-[12px] px-[10px] w-[100%] h-[48px] bg-[#FFFFFF] rounded-[10px] border border-matchigi-bordergray
            text-matchgi-black mb-[36px] cursor-pointer'
          onClick={handleToggleCalendar}
        >
          <span className='flex flex-row'>
            <img src='/assets/images/post/calendar.svg' className='mr-2' />
            <p className=''>{date}</p>
          </span>
        </div>
      </section>
      <section>{calendarShow && <Calendars />}</section>
      <section>{modalShow && <MapContainer />}</section>
      <section className='flex flex-col bg-[#FCFCFC] items-center'>
        <p className='text-[12px] w-[100%] text-matchgi-black mb-[12px]'>경기위치</p>
        <div
          className='box-border py-0.5 px-[10px] w-[100%] h-[48px] bg-[#FFFFFF] rounded-[10px] border border-matchigi-bordergray text-matchgi-black cursor-pointer mb-[36px]'
          onClick={handleToggleModal}
        >
          <p className='mt-2.5 flex flex-row'>
            <img src='/assets/images/post/map.svg' className='mr-2' />
            {address.address}
          </p>
        </div>
      </section>
      <section className='flex flex-col items-center'>
        <p className='text-[12px] w-[100%] leading-[120%] tracking-tighter text-matchgi-black mb-[12px]'>내용</p>
        <textarea
          className='w-[100%] h-[169px] border border-matchgi-bordergray rounded-[10px] px-[16px] py-[12px]
        mb-[60px] resize-none whitespace-pre-wrap'
          {...register('content', { required: true })}
          maxLength={100}
          placeholder='내용은 최대 100자까지 입력 가능합니다.'
          defaultValue={data && data.content}
        />
      </section>
      <div className='flex justify-center'>
        {data ? (
          <button
            className='w-[100%] h-[47px] border border-matchgi-bordergray rounded-[4px] bg-matchgi-btnblue text-white cursor-pointer'
            type='button'
            onClick={handleEditUpload}
          >
            수정하기
          </button>
        ) : (
          <button
            className='w-[100%] h-[47px] border border-matchgi-bordergray rounded-[4px] bg-matchgi-btnblue text-white cursor-pointer'
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
