import React from 'react';

const categories = [
  {
    icon: 'all.svg',
    title: '전체',
  },
  {
    icon: 'basketball.svg',
    title: '농구',
  },
  {
    icon: 'cue-sports.svg',
    title: '당구',
  },
  {
    icon: 'badminton.svg',
    title: '배드민턴',
  },
  {
    icon: 'bowling.svg',
    title: '볼링',
  },
  {
    icon: 'tennis.svg',
    title: '테니스',
  },
  {
    icon: 'soccer.svg',
    title: '축구',
  },
  {
    icon: 'etc.svg',
    title: '기타',
  },
];

const CategoryList = () => {
  return (
    <div className='grid grid-cols-4 gap-4 justify-center'>
      {categories.map((c, idx) => (
        <div key={idx}>
          <div className='bg-[#F4F5F5] flex justify-center items-center w-[100%] h-[70px]'>
            <img src={`/assets/images/category/${c.icon}`} alt='all-icon' />
          </div>
          <h5 className='text-center mt-1'>{c.title}</h5>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
