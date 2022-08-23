import React, { FC } from 'react';

interface Props {
  children: JSX.Element | string;
}

const ChatTimeLine: FC<Props> = ({ children }) => {
  return <li className='text-center text-xs text-matchgi-gray my-2 list-none'>{children}</li>;
};

export default React.memo(ChatTimeLine);
