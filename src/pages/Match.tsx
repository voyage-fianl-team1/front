import React, { FC } from 'react';
import GetJoinData from '../components/GetJoinData';
import GetMatchData from '../components/GetMatchData';

const Match: FC = () => {
  return (
    <>
      <GetMatchData />
      <GetJoinData />
    </>
  );
};
export default Match;
