import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { RootState } from '../redux/store';
import { useNotification } from '../hooks/useNotification';

const alertPath = '/assets/images/alert.svg';
const alertBasePath = '/assets/images/alert_base.svg';

const Header = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user);
  const { notifications, setNotifications } = useNotification(id);
  const handleToggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);

  //TODO: GET요청으로 기존의 쌓인 알림 합치기
  //TODO: 알림 하나씩 누르면 읽음처리 + 해당게시글로 이동

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <header className='flex justify-between pt-2 pb-4'>
      <h1 className='text-2xl font-bold text-[#082555]'>매치기</h1>
      <ul className='flex gap-4'>
        <li className='cursor-pointer'>
          <img src={notifications.length === 0 ? alertBasePath : alertPath} alt='alert-icon' />
        </li>
        <li onClick={handleToggleSideMenu} className='cursor-pointer'>
          <img src='/assets/images/hamberger.svg' alt='menu-icon' />
        </li>
      </ul>
    </header>
  );
};

export default Header;
