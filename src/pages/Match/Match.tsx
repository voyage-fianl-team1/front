import React, { FC } from 'react';
import GetPostList from '../../components/Match/GetPostList';
import GuestPostList from '../../components/Match/GuestPostList';

const Match: FC = () => {
  if (localStorage.getItem('accessToken') === null || '' || undefined) {
    return <GuestPostList />;
  } else {
    return <GetPostList />;
  }
};

export default Match;
