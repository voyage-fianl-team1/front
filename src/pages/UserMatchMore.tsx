import React from 'react';
import UserMatches from '../components/UserMatches';
import { Helmet } from 'react-helmet';

const UserMatchMore = () => {
  return (
    <>
      <Helmet>
        <title>매치기 | 전적 상세</title>
      </Helmet>
      <div>
        <UserMatches />
      </div>
    </>
  );
};

export default UserMatchMore;
