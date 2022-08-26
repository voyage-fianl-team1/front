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
  '/new': '모집글 작성',
  '/profile/edit': '내 정보 관리',
  '/profile/userMatchMore': '내 경기 목록',
  '/keword': '검색',
};

const PageTitle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRouteBack = useCallback(() => {
    navigate(-1);
  }, []);

  const title = useMemo(() => {
    if (!location.pathname) return;

    // 채팅방은 별도로 분기처리
    if (/\/chat\/.+/g.test(location.pathname)) {
      const roomId = location.pathname.split('/chat/')[1];
      return `${roomId} 채팅방`;
    }

    // 유저 전적도 분기처리
    if (/\/matchHistory\/.+/g.test(location.pathname)) {
      const roomId = location.pathname.split('/')[2];
      return `${roomId} 의 전적`;
    }

    // 나머지는 key, value 로 처리
    return titleTable[location.pathname];
  }, [location.pathname]);

  return (
    <nav className='flex gap-3 items-center py-4 bg-white sticky top-0 z-[999] px-4 max-w-[1000px] m-auto'>
      <img src='/assets/images/back.svg' alt='back-button' onClick={handleRouteBack} className='cursor-pointer' />
      <h1 className='text-lg font-bold'>{title}</h1>
    </nav>
  );
};

export default PageTitle;
