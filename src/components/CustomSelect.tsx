import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSubjectShow } from '../redux/features/toggleSlice';
import { RootState } from '../redux/store';
import { subjectAction } from '../redux/features/subjectSlice';

const CustomSubject = () => {
  const dispatch = useDispatch();
  const subjectShow = useSelector((state: RootState) => state.toggle.subjectShow);

  const handleSelectData = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(subjectAction({ subject: e.currentTarget.name, value: e.currentTarget.value }));
    dispatch(toggleSubjectShow());
  };

  return (
    <section
      className={`absolute bottom-[237px] left-0 right-0 w-[100%] max-w-[1000px] m-auto transition-all z-50 p-5 ${
        subjectShow ? '' : 'translate-y-full ease-in-out'
      }`}
    >
      <section className='flex flex-col justify-center items-center w-[100%] h-92 rounded-b-[20px] bg-white border border-[#C5C6CA] drop-shadow-[0_4px_10px_rgba(0,0,0,0.08)]'>
        <button className='selectBtn' value='BASKETBALL' name='농구' onClick={handleSelectData}>
          농구
        </button>
        <button className='selectBtn' value='BILLIARDS' name='당구' onClick={handleSelectData}>
          당구
        </button>
        <button className='selectBtn' value='BADMINTON' name='배드민턴' onClick={handleSelectData}>
          배드민턴
        </button>
        <button className='selectBtn' value='BOWLING' name='볼링' onClick={handleSelectData}>
          볼링
        </button>
        <button className='selectBtn' value='TENNIS' name='테니스' onClick={handleSelectData}>
          테니스
        </button>
        <button className='selectBtn' value='SOCCER' name='축구' onClick={handleSelectData}>
          축구
        </button>
        <button
          className='flex flex-col justify-center pl-[16px] w-full h-[44px] border-x-none rounded-b-[20px]
            focus:bg-matchgi-bordergray'
          value='ETC'
          name='기타'
          onClick={handleSelectData}
        >
          기타
        </button>
      </section>
    </section>
  );
};

export default CustomSubject;
