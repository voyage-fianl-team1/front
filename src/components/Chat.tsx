import React, { FC, useMemo } from 'react';

interface Props {
  direction: 'right' | 'left';
  bg: 'gray' | 'white';
  children: string | JSX.Element;
}

const Chat: FC<Props> = ({ direction, bg, children }) => {
  const bgColorAndBorder = useMemo(() => {
    return bg === 'gray' ? 'bg-[#F4F5F5]' : 'bg-[white] border-[1px] border-matchgi-gray';
  }, [bg]);

  const messageDirection = useMemo(() => {
    return direction === 'left' ? '' : 'justify-end';
  }, [direction]);

  return (
    <li className={`flex ${messageDirection} my-2`}>
      <div className={`${bgColorAndBorder} py-2 px-3 rounded-full`}>{children}</div>
    </li>
  );
};

export default React.memo(Chat);
