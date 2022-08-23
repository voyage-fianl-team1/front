import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectShow } from '../redux/features/selectSlice';
import { RootState } from '../redux/store';
import { IoMdClose } from 'react-icons/io';

const SelectSubject = () => {
  const dispatch = useDispatch();
  const selectShow = useSelector((state: RootState) => state.select.selectShow);

  const handleToggleSelect = useCallback(() => {
    dispatch(toggleSelectShow());
  }, []);

  return (
    <section
      className={`absolute bottom-0 left-0 right-0 w-[100%] transition-all z-50 ${
        selectShow ? '' : 'translate-y-full'
      }`}
    >
      <section className='flex flex-col justify-center items-center py-[12px] px-[62px] w-[100%] h-96 rounded-t-[20px] bg-white border'>
        <div className='mt-[20px] mb-[25px] flex items-center'>
          <h1 className='font-bold'>종목</h1>
          <button className='absolute top-22 right-8' onClick={handleToggleSelect}>
            <IoMdClose className='flex text-xl text-matchgi-gray' />
          </button>
        </div>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[12px]'>
          <div className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'>
            전체
          </div>
          <div className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'>
            농구
          </div>
        </span>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[12px]'>
          <div className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'>
            당구
          </div>
          <div className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'>
            배드민턴
          </div>
        </span>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[12px]'>
          <div className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'>
            볼링
          </div>
          <div className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'>
            테니스
          </div>
        </span>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[44px]'>
          <div className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'>
            축구
          </div>
          <div className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'>
            기타
          </div>
        </span>
        <span className='flex flex-row justify-center items-center mb-[20px]'>
          <div className='flex flex-col justify-center items-center w-[335px] h-[47px] border border-matchgi-bordergray rounded-[2px] bg-matchgi-btnblue text-white'>
            적용하기
          </div>
        </span>
      </section>
    </section>
  );
};

export default SelectSubject;
