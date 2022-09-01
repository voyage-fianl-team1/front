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

  const handleToggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);
  const [notificationShow, setNotificationShow] = useState(false);

  const toggleNotification = useCallback(() => {
    setNotificationShow((prev) => !prev);
  }, []);

  const isNotificationExist = useMemo(() => {
    if (notifications.length > 0) {
      const res = notifications.some((v, idx) => !v.isread);
      return res;
    }
    return false;
  }, [notifications]);

  const handleClick = useCallback((id: number, postId: number) => {
    mutation.mutate(id);
    // 게시글로 라우팅
    navigate(`match/${postId}`);
  }, []);

  return (
    <header className='flex justify-between pt-4 pb-4'>
      <h1 className='text-2xl font-bold text-[#082555]'>매치기</h1>
      <ul className='flex gap-4 relative'>
        <li className='cursor-pointer' onClick={toggleNotification}>
          <img src={isNotificationExist ? alertPath : alertBasePath} alt='alert-icon' />
        </li>
        <li onClick={handleToggleSideMenu} className='cursor-pointer'>
          <img src='/assets/images/hamberger.svg' alt='menu-icon' />
        </li>
        {notificationShow && (
          <ul className='absolute bottom-[-300px] right-10 w-[300px] bg-white h-[300px] flex flex-col gap-2 rounded overflow-auto z-[999]'>
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`rounded p-2 border-b-[1px] border-black/10 cursor-pointer ${
                  n.isread ? '!text-black/20' : ''
                }`}
                onClick={() => handleClick(n.id, n.postId)}
              >
                <span>{n.content}</span>
                <span className='text-xs px-2 text-black/60'>{dayjs(n.createdAt).format('YYYY/MM/DD hh:mm')}</span>
              </li>
            ))}
          </ul>
        )}
      </ul>
    </header>
  );
};

export default Header;
