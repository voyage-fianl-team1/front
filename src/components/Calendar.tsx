import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import './Calendars.css';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { calendarAction } from '../redux/features/calendarSlice';

const Calendars = () => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch();
  console.log(dayjs(value).format('YYYY-MM-DD'));
  return (
    <div className='flex flex-col justify-center items-center w-11/12 h-[375px] bg-[#FCFCFC] border border-[#C5C6CA] rounded-[10px]'>
      <Calendar
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => dayjs(date).format('D')}
        minDate={new Date()}
        calendarType='ISO 8601'
      />
      <div className='flex flew-row justify-center gap-[20px] mt-[35px]'>
        <button className='w-[82px] h-[45px] border border-[#9A9B9F] rounded-[8px]'>닫기</button>
        <button
          className='w-[181px] h-[45px] bg-matchgi-btnblue text-white rounded-[8px]'
          onClick={() => dispatch(calendarAction({ date: dayjs(value).format('YYYY-MM-DD') }))}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};

export default Calendars;
