import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { RootState } from '../redux/store';
import { useNotification } from '../hooks/useNotification';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { apis } from '../apis';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Notification } from '../typings';
import { toggleNotificationShow } from '../redux/features/toggleSlice';

const alertPath = '/assets/images/alert.svg';
const alertBasePath = '/assets/images/alert_base.svg';

const Header = () => {
  const { id, isLogin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { notifications, setNotifications } = useNotification(id);

  const { refetch } = useQuery(['notifications'], apis.getNotifications, {
    onSuccess: (data: Notification[]) => {
      setNotifications(data);
    },
    enabled: false,
  });
  const mutation = useMutation((id: number) => apis.postNotificationRead(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });

  useEffect(() => {
    if (isLogin) {
      refetch();
    }
  }, [isLogin]);

  const toggleNotificationMenu = useCallback(() => {
    dispatch(toggleNotificationShow());
  }, []);

  const toggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);

  const isNotificationExist = useMemo(() => {
    if (notifications.length > 0) {
      const res = notifications.some((v, idx) => !v.isread);
      return res;
    }
    return false;
  }, [notifications]);

  return (
    <header className='flex justify-end py-[14px]'>
      <ul className='flex gap-4 relative'>
        <li className='cursor-pointer' onClick={toggleNotificationMenu}>
          <img src={isNotificationExist ? alertPath : alertBasePath} alt='alert-icon' />
        </li>
        <li onClick={toggleSideMenu} className='cursor-pointer'>
          <img src='/assets/images/hamberger.svg' alt='menu-icon' />
        </li>
      </ul>
    </header>
  );
};

export default Header;
