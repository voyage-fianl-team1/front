import React, { useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/features/userSlice';
import { toggleNotificationShow } from '../redux/features/toggleSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../apis';
import { Notification } from '../typings';
import { useNotification } from '../hooks/useNotification';
import dayjs from 'dayjs';

const NotificationSideMenu = () => {
  const { id, isLogin } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const notificationSideMenuShow = useSelector((state: RootState) => state.toggle.notificationSideMenuShow);
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

  const handleRoute = useCallback((path: string) => {
    dispatch(toggleNotificationShow());
    navigate(path);
  }, []);

  const handleToggleSideMenu = useCallback(() => {
    dispatch(toggleNotificationShow());
  }, []);

  const handleClick = useCallback((id: number, postId: number) => {
    mutation.mutate(id);
    // 게시글로 라우팅
    navigate(`match/${postId}`);
    dispatch(toggleNotificationShow());
  }, []);

  return (
    <aside
      className={`overflow-y-scroll absolute top-0 bottom-0 right-0 w-[100%] bg-[#fff] transition-all z-[999] ${
        notificationSideMenuShow ? '' : 'translate-x-full'
      }`}
    >
      <div className='hover:bg-white/20 px-8 mt-8 cursor-pointer flex items-center justify-between'>
        <span className='font-bold'>알림</span>
        <button className='' onClick={handleToggleSideMenu}>
          <IoMdClose size={24} />
        </button>
      </div>
      <ul className='mt-5 divide-y-[1px] divide-black/5'>
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`notification-item ${n.isread ? '!text-black/20' : ''}`}
            onClick={() => handleClick(n.id, n.postId)}
          >
            <div className='flex gap-[12px]'>
              <img src='/assets/images/menu/noti-icon.svg' alt='notification-icon' />
              <div className='flex flex-col'>
                <span>{n.content}</span>
                <span className='text-xs text-black/60'>{dayjs(n.createdAt).format('YYYY/MM/DD hh:mm')}</span>
              </div>
            </div>
            <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NotificationSideMenu;
