import React, { FC, useMemo } from 'react';

interface Props {
  direction: 'right' | 'left';
  bg: 'gray' | 'white';
  children: string | JSX.Element;
  profilePath?: string;
  username?: string;
}

const Chat: FC<Props> = ({ direction, bg, children, profilePath, username }) => {
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
        <div className={`${bgColorAndBorder} py-2 px-3 rounded-full`}>{children}</div>
      </div>
    </li>
  );
};

export default React.memo(Chat);
