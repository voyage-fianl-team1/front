import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subjectSearchShow } from '../redux/features/searchSlice';
import { toggleSelectShow } from '../redux/features/sortSlice';
import { RootState } from '../redux/store';
import { IoMdClose } from 'react-icons/io';

const SelectSubject = () => {
  const dispatch = useDispatch();
  const selectShow = useSelector((state: RootState) => state.sort.selectShow);
  const [subject, setSubject] = useState<string>('ALL');
  const handleToggleSelect = useCallback(() => {
    dispatch(toggleSelectShow());
  }, []);

  const handleSelectData = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSubject(e.currentTarget.value);
  };

  const handleSendData = () => {
    dispatch(subjectSearchShow({ subject: subject }));
    dispatch(toggleSelectShow());
  };
  return (
    <section
      className={`fixed bottom-0 left-0 right-0 w-[100%] max-w-[1000px] m-auto transition-all z-50 ${
        selectShow ? '' : 'translate-y-full'
      }`}
    >
      <section className='flex flex-col justify-center items-center py-[12px] px-[62px] w-[100%] h-96 rounded-t-[20px] bg-white border'>
        <div className='mt-[20px] mb-[25px] flex items-center'>
          <h1 className='font-bold'>종목</h1>
          <button className='absolute top-22 right-8' onClick={handleToggleSelect}>
            <IoMdClose className='flex text-xl text-matchgi-gray cursor-pointer' />
          </button>
        </div>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[12px]'>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]
            focus:bg-matchgi-bordergray'
            value='ALL'
            onClick={handleSelectData}
          >
            전체
          </button>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]
            focus:bg-matchgi-bordergray'
            value='BASKETBALL'
            onClick={handleSelectData}
          >
            농구
          </button>
        </span>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[12px]'>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]
            focus:bg-matchgi-bordergray'
            value='BILLIARDS'
            onClick={handleSelectData}
          >
            당구
          </button>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]
            focus:bg-matchgi-bordergray'
            value='BADMINTON'
            onClick={handleSelectData}
          >
            배드민턴
          </button>
        </span>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[12px]'>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]
            focus:bg-matchgi-bordergray'
            value='BOWLING'
            onClick={handleSelectData}
          >
            볼링
          </button>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]
            focus:bg-matchgi-bordergray'
            value='TENNIS'
            onClick={handleSelectData}
          >
            테니스
          </button>
        </span>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[44px]'>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]
            focus:bg-matchgi-bordergray'
            value='SOCCER'
            onClick={handleSelectData}
          >
            축구
          </button>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]
            focus:bg-matchgi-bordergray'
            value=''
            onClick={handleSelectData}
          >
            기타
          </button>
        </span>
        <span className='flex flex-row justify-center items-center mb-[20px]'>
          <button
            className='flex flex-col justify-center items-center w-[335px] h-[47px] border border-matchgi-bordergray rounded-[2px] bg-matchgi-btnblue text-white cursor-pointer'
            onClick={handleSendData}
          >
            적용하기
          </button>
        </span>
      </section>
    </section>
  );
};

export default SelectSubject;
