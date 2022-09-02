import React, { useState, useCallback } from 'react';
import { Calendar } from 'react-calendar';
import { useDispatch } from 'react-redux';
import { calendarAction } from '../redux/features/calendarSlice';
import { toggleCalendarShow, toggleModal2Show } from '../redux/features/toggleSlice';
import './Calendars.css';
import dayjs from 'dayjs';
import Modal from './Modal';

const Calendars = () => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch();

  const handleCalendar = () => {
    dispatch(calendarAction({ date: dayjs(value).format('YYYY-MM-DD') }));
    dispatch(toggleCalendarShow());
  };

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModal2Show());
  }, []);

  return (
    <Modal onClickToggleModal={handleToggleModal}>
      <div className='flex flex-col justify-center items-center w-[100%] h-[100%] bg-[#FCFCFC] rounded-[10px]'>
        <Calendar
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => dayjs(date).format('D')}
          minDate={new Date()}
          calendarType='ISO 8601'
        />
        <div className='flex flew-row justify-center gap-[20px] mt-20'>
          <button
            className='w-[82px] h-[45px] border border-[#9A9B9F] rounded-[8px]'
            onClick={() => dispatch(toggleCalendarShow())}
          >
            닫기
          </button>
          <button className='w-[181px] h-[45px] bg-matchgi-btnblue text-white rounded-[8px]' onClick={handleCalendar}>
            적용하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Calendars;
