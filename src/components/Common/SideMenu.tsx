import React, { useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toggleSideMenuShow } from '../../redux/features/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useLogOut from '../../hooks/auth/useLogOut';
import useCurrentUser from '../../hooks/auth/useCurrentUser';
import usePush from '../../hooks/usePush';

const SideMenu = () => {
  const dispatch = useDispatch();
  const sideMenuShow = useSelector((state: RootState) => state.common.sideMenuShow);
  const {
    user: { isLogin },
  } = useCurrentUser();
  const { handleLogOut } = useLogOut();
  const { push } = usePush();

  const handleToggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);

  const handleSignOut = useCallback(() => {
    alert('준비중입니다');
  }, []);

  const handleRouteToLogin = useCallback(() => {
    push('/splash');
  }, []);

  const handleRouteSignUp = useCallback(() => {
    push('/signup');
  }, []);

  return (
    <aside
      className={`absolute top-0 bottom-0 right-0 w-[100%] bg-[#fff] transition-all z-[999] ${
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
        <li className='menu-item' onClick={() => push('/map')}>
          <div className='menu-item-inner'>
            <img src='/assets/images/menu/map.svg' alt='marker-icon' />
            <span>지도</span>
          </div>
          <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
        </li>
        <li className='menu-item' onClick={() => push('/chatList')}>
          <div className='menu-item-inner'>
            <img src='/assets/images/menu/message.svg' alt='message-icon' />
            <span>채팅목록</span>
          </div>
          <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
        </li>
        <li className='menu-item ' onClick={() => push('/profile')}>
          <div className='menu-item-inner'>
            <img src='/assets/images/menu/user.svg' alt='user-icon' />
            <span>마이페이지</span>
          </div>
          <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
        </li>
      </ul>
      <div className='px-8 fixed bottom-5 left-0 right-0 max-w-[1000px] m-auto'>
        {isLogin ? (
          <button className='menu-button' onClick={handleLogOut}>
            로그아웃
          </button>
        ) : (
          <button className='menu-button' onClick={handleRouteToLogin}>
            로그인
          </button>
        )}
        {isLogin ? (
          <button className='menu-button' onClick={handleSignOut}>
            탈퇴하기
          </button>
        ) : (
          <button className='menu-button' onClick={handleRouteSignUp}>
            회원가입
          </button>
        )}
      </div>
    </aside>
  );
};

export default SideMenu;
