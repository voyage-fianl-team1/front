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
  const pathname = window.location.pathname;

  const handleRouteBack = useCallback(() => {
    if (location.pathname === '/search') {
      navigate('/');
    } else if (/\/match\/.+/g.test(location.pathname)) {
      navigate('/search');
    } else if (location.pathname === '/profile/edit') {
      navigate('/profile');
    } else {
      navigate(-1);
    }
  }, [location]);

  const title = useMemo(() => {
    if (!location.pathname) return;
    const q = new URLSearchParams(location.search);
    // 채팅방은 별도로 분기처리
    if (/\/chat\/.+/g.test(location.pathname)) {
      const title = q.get('title');
      return `${title}`;
    }
    // 유저 전적도 분기처리
    if (/\/matchHistory\/.+/g.test(location.pathname)) {
      return `${q.get('nickname')}님의 전적`;
    }

    if (/\/match\/.+/g.test(location.pathname)) {
      return '경기상세';
    }

    // 나머지는 key, value 로 처리
    return titleTable[location.pathname];
  }, [location.pathname]);

  return (
    <>
      {pathname === '/search' ? (
        <nav className='flex gap-3 items-center py-4 bg-[#FCFCFC] sticky top-0 z-[999] px-4 max-w-[1000px] m-auto'>
          <img
            src='/assets/images/back.svg'
            alt='back-button'
            onClick={() => navigate('/')}
            className='cursor-pointer'
          />
          <div className='flex flex-row w-full h-full items-center justify-between'>
            <h1 className='w-full text-lg font-bold'>경기 목록</h1>
            <button className='w-[24px] h-[24px]' onClick={() => navigate('/searching')}>
              <img src='/assets/images/search.svg' alt='search-icon' className='w-[24px] h-[24px]' />
            </button>
          </div>
        </nav>
      ) : pathname === '/searching' ? null : (
        <nav className='flex gap-3 items-center pt-3 pb-[10px] bg-[#FCFCFC] sticky top-0 z-[999] px-4 max-w-[1000px] m-auto'>
          <img src='/assets/images/back.svg' alt='back-button' onClick={handleRouteBack} className='cursor-pointer' />
          <h1 className='text-lg font-bold translate-y-0.5'>{title}</h1>
        </nav>
      )}
    </>
  );
};

export default PageTitle;
