import React, { FC } from 'react';
import GetPostList from '../components/GetPostList';
import GuestPostList from '../components/GuestPostList';

const Match: FC = () => {
  if (localStorage.getItem('accessToken') === null || '' || undefined) {
    return <GuestPostList />;
  } else {
    return <GetPostList />;
  }
};

export default Match;
