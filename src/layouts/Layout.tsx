import React, { FC } from 'react';

interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  return <div className='p-3 max-w-[1000px] m-auto'>{children}</div>;
};

export default Layout;
