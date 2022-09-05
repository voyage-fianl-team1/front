import React, { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import SideMenu from '../components/SideMenu';
import PageTitle from '../components/PageTitle';
import SelectSubject from '../components/SelectSubject';
import SelectSort from '../components/SelectSort';
import NotificationSideMenu from '../components/NotificationSideMenu';

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
      <div className='px-[20px] max-w-[1000px] m-auto relative overflow-hidden'>
        <SideMenu />
        <NotificationSideMenu />
        <SelectSubject />
        <SelectSort />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
