import React from 'react';

const MatchItem = () => {
  return (
    <div className='recent-match-card'>
      <h1 className='font-semibold mb-1'>경기이름</h1>
      <h2>테니스</h2>
      <p>본문내용...</p>
      <p className='mt-5 text-sm text-matchgi-gray'>서울 서초구</p>
      <div className='flex justify-between items-center mt-2'>
        <span className='text-sm text-matchgi-gray'>8/21(토)</span>
        <button className='border-[1px] border-[#C5C6CA] text-sm p-1 rounded text-[#5D5E62]'>더보기</button>
      </div>
    </div>
  );
};

export default MatchItem;
