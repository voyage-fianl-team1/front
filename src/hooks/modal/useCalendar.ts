import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { calendarAction } from '../../redux/features/calendarSlice';
import { toggleCalendarShow, toggleModalShow, toggleModal2Show } from '../../redux/features/toggleSlice';
import dayjs from 'dayjs';

export function useCalendar<T>(defaultValue: T) {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch();

  const handleCalendar = () => {
    dispatch(calendarAction({ date: dayjs(value).format('YYYY-MM-DD') }));
    dispatch(toggleCalendarShow());
  };

  const handleToggle2Modal = useCallback(() => {
    dispatch(toggleModal2Show());
  }, []);

  const handleCalendarShow = () => {
    dispatch(toggleCalendarShow());
  };

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModalShow());
  }, []);

  return {
    handleCalendar,
    handleToggleModal,
    handleToggle2Modal,
    handleCalendarShow,
    onChange,
    value,
  };
}
