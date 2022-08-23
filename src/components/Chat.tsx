import React, { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { getFromNow } from '../util/converDate';

interface Props {
  direction: 'right' | 'left';
  bg: 'gray' | 'white';
  children: string | JSX.Element;
  profilePath?: string;
  username?: string;
  createdAt: Date;
}

const Chat: FC<Props> = ({ direction, bg, children, profilePath, username, createdAt }) => {
  const bgColorAndBorder = useMemo(() => {
    return bg === 'gray' ? 'bg-[#F4F5F5]' : 'bg-[white] border-[1px] border-matchgi-gray';
  }, [bg]);

  const messageDirection = useMemo(() => {
    return direction === 'left' ? '' : 'justify-end';
  }, [direction]);

  return (
    <li className={`flex ${messageDirection} my-3 items-start gap-2`}>
      {profilePath ? (
        <img src={profilePath} alt='profile-image' className='w-[34px] h-[34px] rounded-full object-center' />
      ) : direction === 'left' ? (
        <img src='/assets/images/avatar.svg' alt='profile-default' className='' />
      ) : null}
      <div>
        {direction === 'left' && <h2 className='ml-1 text-sm'>{username}</h2>}
        <div className='flex'>
          <div
            className={`${bgColorAndBorder} py-2 px-3 rounded-full ${direction === 'right' ? 'order-2' : 'order-1'}`}
          >
            {children}
          </div>
          <div
            className={`text-matchgi-gray  text-[11px] self-end ${
              direction === 'right' ? 'order-0 mr-2' : 'order-2 ml-2'
            } `}
          >
            {getFromNow(createdAt)}
          </div>
        </div>
      </div>
    </li>
  );
};

export default React.memo(Chat);
