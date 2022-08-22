import React, { FC } from 'react';

interface Props {
  children: string | JSX.Element;
  rightMenu?: JSX.Element;
}

const SubTitle: FC<Props> = ({ children, rightMenu }) => {
  if (!rightMenu) {
    return (
      <div className='text-matchgi-black font-bold my-4'>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div className='my-4 flex justify-between items-center my-5'>
      <div className='text-matchgi-black font-bold'>{children}</div>
      <div>{rightMenu}</div>
    </div>
  );
};

export default SubTitle;
