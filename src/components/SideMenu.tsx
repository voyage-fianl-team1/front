import React, { useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sideMenuShow = useSelector((state: RootState) => state.common.sideMenuShow);

  const handleRoute = useCallback((path: string) => {
    dispatch(toggleSideMenuShow());
    navigate(path);
  }, []);

  const handleToggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);

  return (
    <aside
      className={`absolute top-0 bottom-0 right-0 w-[300px] bg-[#082555] transition-all z-100 text-white  ${
        sideMenuShow ? '' : 'translate-x-full'
      }`}
    >
      <button className='absolute top-[15px] right-[15px]' onClick={handleToggleSideMenu}>
        <IoMdClose size={24} />
      </button>
      <ul className='mt-10 divide-y-[1px] divide-white/10'>
        <li className='hover:bg-white/20 pl-8 py-3 cursor-pointer' onClick={() => handleRoute('/')}>
          홈
        </li>
        <li className='hover:bg-white/20 pl-8 py-3 cursor-pointer' onClick={() => handleRoute('/login')}>
          로그인
        </li>
        <li className='hover:bg-white/20 pl-8 py-3 cursor-pointer' onClick={() => handleRoute('/signup')}>
          회원가입
        </li>
        <li className='hover:bg-white/20 pl-8 py-3 cursor-pointer' onClick={() => handleRoute('/profile')}>
          마이페이지
        </li>
        <li className='hover:bg-white/20 pl-8 py-3 cursor-pointer' onClick={() => handleRoute('/search')}>
          검색
        </li>
        <li className='hover:bg-white/20 pl-8 py-3 cursor-pointer' onClick={() => handleRoute('/chatList')}>
          채팅
        </li>
        <li className='hover:bg-white/20 pl-8 py-3 cursor-pointer' onClick={() => handleRoute('/map')}>
          지도
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
