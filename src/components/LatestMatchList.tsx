import React from 'react';
import MatchItem from './MatchItem';

const LatestMatchList = () => {
  return (
    <div className='flex overflow-x-auto gap-4 scroll-bar-hide'>
      <MatchItem />
      <MatchItem />
      <MatchItem />
      <MatchItem />
    </div>
  );
};

export default LatestMatchList;
