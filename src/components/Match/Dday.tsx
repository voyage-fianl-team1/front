import React from 'react';
import dayjs from 'dayjs';
import { JoinDataProps } from '../../typings';

const Dday = (props: JoinDataProps) => {
  const matchDeadline = props.data.matchDeadline;
  const now = dayjs(new Date());
  const a = dayjs(matchDeadline);
  const c = now.diff(a, 'day');
  const abs = Math.abs(c);

  if (c < 1 && a.format('YYYY-MM-DD') !== now.format('YYYY-MM-DD')) {
    return <p className='w-[5rem] h-7 text-[#38393C]'>(D-{abs + 1})</p>;
  } else if (c < 1 && a.format('YYYY-MM-DD') === now.format('YYYY-MM-DD')) {
    return <p className='w-[5rem] h-7 text-[#38393C]'>(D-DAY)</p>;
  } else {
    return <></>;
  }
};

export default Dday;
