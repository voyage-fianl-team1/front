import React, { FC } from 'react';
import { ImageType } from '../../typings';
import { usePost } from '../../hooks/post/usePost';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import MapContainer from '../../components/Modal/MapContainer';
import Calendars from '../../components/Modal/Calendar';
import CustomSubject from '../../components/Select/CustomSelect';

const Newpost: FC = () => {
  const {
    handleImgBtn,
    handleToggleSubject,
    handleToggleCalendar,
    handleToggleModal,
    inputRef,
    handledeleteImage,
    handledeletePrevImg,
    onSaveFiles,
    images,
    clearAll,
    imgUrl,
    data,
    register,
    handleDataUpload,
    handleEditUpload,
    address,
    subject,
    modalShow,
    calendarShow,
    subjectShow,
    date,
  } = usePost('');

  clearAll();

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
                    <img className='w-[68px] h-[68px] rounded-[8px] mr-1' alt='' src={image['url']} />
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
                  <img className='w-[68px] h-[68px] rounded-[8px] mr-1' alt='' src={image} />
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
          <button className='uploadEditbtn' onClick={handleEditUpload}>
            수정하기
          </button>
        ) : (
          <button className='uploadEditbtn' onClick={handleDataUpload}>
            작성완료
          </button>
        )}
      </div>
    </section>
  );
};

export default Newpost;
