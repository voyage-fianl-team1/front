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

  const handleLogOut = useCallback(() => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    //TODO: 리덕스 데이터도 지우고, 로그아웃처리하기
  }, []);

  const handleSignOut = useCallback(() => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      //TODO: 탈퇴시키기
      alert('정상적으로 탈퇴되었습니다 감사합니다');
    }
  }, []);

  return (
    <aside
      className={`absolute top-0 bottom-0 right-0 w-[100%] bg-[#fff] transition-all z-100 ${
        sideMenuShow ? '' : 'translate-x-full'
      }`}
    >
      <div className='hover:bg-white/20 px-8 mt-8 cursor-pointer flex items-center justify-between'>
        <span className='font-bold'>전체메뉴</span>
        <button className='' onClick={handleToggleSideMenu}>
          <IoMdClose size={24} />
        </button>
      </div>
      <ul className='mt-5 divide-y-[1px] divide-black/5'>
        <li className='menu-item ' onClick={() => handleRoute('/profile')}>
          <div className='menu-item-inner'>
            <img src='/assets/images/menu/user.svg' alt='user-icon' />
            <span>마이페이지</span>
          </div>
          <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
        </li>
        <li className='menu-item' onClick={() => handleRoute('/chatList')}>
          <div className='menu-item-inner'>
            <img src='/assets/images/menu/message.svg' alt='message-icon' />
            <span>채팅목록</span>
          </div>
          <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
        </li>
        <li className='menu-item' onClick={() => handleRoute('/map')}>
          <div className='menu-item-inner'>
            <img src='/assets/images/menu/marker.svg' alt='marker-icon' />
            <span>지도</span>
          </div>
          <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
        </li>
      </ul>
      <div className='px-8 absolute bottom-5 left-0 right-0'>
        <button className='menu-button' onClick={handleLogOut}>
          로그아웃
        </button>
        <button className='menu-button' onClick={handleSignOut}>
          탈퇴하기
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
