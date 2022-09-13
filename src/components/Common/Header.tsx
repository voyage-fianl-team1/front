import React from 'react';
import useNotification from '../../hooks/useNotification';
import useSideMenu from '../../hooks/useSideMenu';
import { useStomp } from '../../hooks/socket/useStomp';

const alertPath = '/assets/images/alert.svg';
const alertBasePath = '/assets/images/alert_base.svg';

const Header = () => {
  const { toggleNotificationMenu, isNotificationExist } = useNotification();
  const { toggleSideMenu } = useSideMenu();

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
