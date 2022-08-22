import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ITitleTable {
  [key: string]: string;
}

const titleTable: ITitleTable = {
  '/login': '로그인',
  '/signup': '회원가입',
  '/profile': '마이페이지',
  '/search': '경기목록',
  '/chatList': '채팅목록',
  '/map': '지도',
};

const PageTitle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRouteBack = useCallback(() => {
    navigate(-1);
  }, []);

  const title = useMemo(() => {
    if (!location.pathname) return;
    return titleTable[location.pathname];
  }, [location.pathname]);

  return (
    <nav className='flex gap-3 items-center py-4'>
      <img src='/assets/images/back.svg' alt='back-button' onClick={handleRouteBack} />
      <h1 className='text-lg font-bold'>{title}</h1>
    </nav>
  );
};

export default PageTitle;
