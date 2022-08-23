import React, { FC, useCallback, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { IoMdClose } from 'react-icons/io';
import SideMenu from '../components/SideMenu';
import PageTitle from '../components/PageTitle';
interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  const location = useLocation();

  const navShow = useMemo(() => {
    const path = location.pathname;
    return !(path === '/');
  }, [location.pathname]);

  return (
    <>
      {navShow && <PageTitle />}
      <div className='p-3 max-w-[1000px] m-auto relative overflow-hidden'>
        <SideMenu />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
