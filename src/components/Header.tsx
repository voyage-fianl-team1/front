import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { RootState } from '../redux/store';
import { useNotification } from '../hooks/useNotification';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const alertPath = '/assets/images/alert.svg';
const alertBasePath = '/assets/images/alert_base.svg';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((state: RootState) => state.user);
  const { notifications, setNotifications } = useNotification(id);
  const handleToggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);
  const [notificationShow, setNotificationShow] = useState(false);

  const toggleNotification = useCallback(() => {
    setNotificationShow((prev) => !prev);
  }, []);

  const isNotificationExist = useMemo(() => notifications.length === 0, [notifications]);

  //TODO: GET요청으로 기존의 쌓인 알림 합치기
  //TODO: 알림 하나씩 누르면 읽음처리 + 해당게시글로 이동

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  const handleClick = useCallback((id: number, postId: number) => {
    //TODO: 메세지 읽음처리 PUT

    // 게시글로 라우팅
    navigate(`match/${postId}`);
    console.log(id, postId);
  }, []);

  return (
    <header className='flex justify-between pt-2 pb-4'>
      <h1 className='text-2xl font-bold text-[#082555]'>매치기</h1>
      <ul className='flex gap-4 relative'>
        <li className='cursor-pointer' onClick={toggleNotification}>
          <img src={isNotificationExist ? alertBasePath : alertPath} alt='alert-icon' />
        </li>
        <li onClick={handleToggleSideMenu} className='cursor-pointer'>
          <img src='/assets/images/hamberger.svg' alt='menu-icon' />
        </li>
        {notificationShow && (
          <ul className='absolute bottom-[-300px] right-10 w-[300px] bg-white h-[300px] flex flex-col gap-2 rounded'>
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`rounded bg-gray-100 p-2 cursor-pointer ${n.isread ? '!text-black/20' : ''}`}
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
