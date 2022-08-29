import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSubjectShow } from '../redux/features/sortSlice';
import { RootState } from '../redux/store';

const CustomSubject = () => {
  const dispatch = useDispatch();
  const selectShow = useSelector((state: RootState) => state.sort.subjectShow);
  const [subject, setSubject] = useState<string>('ALL');
  const handleToggleSelect = useCallback(() => {
    dispatch(toggleSubjectShow());
  }, []);

  const handleSelectData = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSubject(e.currentTarget.value);
    dispatch(toggleSubjectShow());
  };

  return (
    <section
      className={`fixed top-20 left-0 right-0 w-11/12 m-auto transition-all z-50 ${
        selectShow ? '' : 'translate-y-full'
      }`}
    >
      <section className='flex flex-col justify-center items-center w-11/12 h-92 rounded-b-[20px] bg-white border'>
        <button
          className='flex flex-col justify-center items-center w-full h-[44px] borderborder border-x-0 border-t-0
            focus:bg-matchgi-bordergray'
          value='BASKETBALL'
          onClick={handleSelectData}
        >
          농구
        </button>
        <button
          className='flex flex-col justify-center items-center w-full h-[44px] border border-x-0
            focus:bg-matchgi-bordergray'
          value='BILLIARDS'
          onClick={handleSelectData}
        >
          당구
        </button>
        <button
          className='flex flex-col justify-center items-center w-full h-[44px] border border-x-0 border-t-0
            focus:bg-matchgi-bordergray'
          value='BADMINTON'
          onClick={handleSelectData}
        >
          배드민턴
        </button>
        <button
          className='flex flex-col justify-center items-center w-full h-[44px] border border-x-0 border-t-0
            focus:bg-matchgi-bordergray'
          value='BOWLING'
          onClick={handleSelectData}
        >
          볼링
        </button>
        <button
          className='flex flex-col justify-center items-center w-full h-[44px] border border-x-0 border-t-0
            focus:bg-matchgi-bordergray'
          value='TENNIS'
          onClick={handleSelectData}
        >
          테니스
        </button>
        <button
          className='flex flex-col justify-center items-center w-full h-[44px] border border-x-0 border-t-0
            focus:bg-matchgi-bordergray'
          value='SOCCER'
          onClick={handleSelectData}
        >
          축구
        </button>
        <button
          className='flex flex-col justify-center items-center w-full h-[44px] border-x-none rounded-b-[20px]
            focus:bg-matchgi-bordergray'
          value=''
          onClick={handleSelectData}
        >
          기타
        </button>
      </section>
    </section>
  );
};

export default CustomSubject;
