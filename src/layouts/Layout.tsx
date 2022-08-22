import React, { FC, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRouteBack = useCallback(() => {
    navigate(-1);
  }, []);

  const navShow = useMemo(() => {
    const path = location.pathname;
    return !(/login|signup/g.test(path) || path === '/');
  }, [location.pathname]);

  return (
    <div className='p-3 max-w-[1000px] m-auto'>
      {navShow && (
        <nav className='flex gap-3 items-center py-4'>
          <img src='/assets/images/back.svg' alt='back-button' onClick={handleRouteBack} />
          <h1 className='text-lg font-bold'>현재 페이지이름</h1>
        </nav>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
