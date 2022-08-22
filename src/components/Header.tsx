import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSideMenuShow } from '../redux/features/commonSlice';

const Header = () => {
  const dispatch = useDispatch();

  const handleToggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);

  return (
    <header className='flex justify-between pt-2 pb-4'>
      <h1 className='text-2xl font-bold text-[#082555]'>매치기</h1>
      <ul className='flex gap-4'>
        <li className='cursor-pointer'>
          <img src='/assets/images/alert.svg' alt='alert-icon' />
        </li>
        <li onClick={handleToggleSideMenu} className='cursor-pointer'>
          <img src='/assets/images/hamberger.svg' alt='menu-icon' />
        </li>
      </ul>
    </header>
  );
};

export default Header;
