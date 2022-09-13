import React, { useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleNotificationShow } from '../../redux/features/toggleSlice';
import { useNotificationSocket } from '../../hooks/socket/useNotificationSocket';
import dayjs from 'dayjs';
import useCurrentUser from '../../hooks/auth/useCurrentUser';
import usePush from '../../hooks/usePush';
import useReadNotification from '../../hooks/mutations/useReadNotification';

const NotificationSideMenu = () => {
  const {
    user: { id },
  } = useCurrentUser();
  const dispatch = useDispatch();
  const { push } = usePush();
  useNotificationSocket(id);

  const { mutate: readNotificationMutate } = useReadNotification();

  const notificationSideMenuShow = useSelector((state: RootState) => state.toggle.notificationSideMenuShow);
  const notifications = useSelector((state: RootState) => state.notification.notifications);

  const handleToggleSideMenu = useCallback(() => {
    dispatch(toggleNotificationShow());
  }, []);

  const handleClick = useCallback((id: number, postId: number) => {
    readNotificationMutate(id);
    // 게시글로 라우팅
    push(`match/${postId}`);
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
