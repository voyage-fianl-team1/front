import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
      <footer className='flex justify-around py-4'>
        <Link to='/login'>로그인 page</Link>
        <Link to='/signup'>회원가입 page</Link>
        <Link to='/chatList'>채팅 목록</Link>
        <Link to='/profile'>프로필 page</Link>
      </footer>
    </div>
  );
};

export default Layout;
