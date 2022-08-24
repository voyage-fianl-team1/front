import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { subjectSearchShow } from '../redux/features/searchSlice';

const categories = [
  {
    icon: 'all.svg',
    title: '전체',
    value: 'ALL',
  },
  {
    icon: 'basketball.svg',
    title: '농구',
    value: 'BASKETBALL',
  },
  {
    icon: 'cue-sports.svg',
    title: '당구',
    value: 'BILLIARDS',
  },
  {
    icon: 'badminton.svg',
    title: '배드민턴',
    value: 'BADMINTON',
  },
  {
    icon: 'bowling.svg',
    title: '볼링',
    value: 'BOWLING',
  },
  {
    icon: 'tennis.svg',
    title: '테니스',
    value: 'TENNIS',
  },
  {
    icon: 'soccer.svg',
    title: '축구',
    value: 'SOCCER',
  },
  {
    icon: 'etc.svg',
    title: '기타',
    value: 'ETC',
  },
];

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='grid grid-cols-4 gap-4 justify-center cursor-pointer'>
      {categories.map((c, idx) => (
        <div
          key={idx}
          onClick={() => {
            dispatch(subjectSearchShow({ subject: c.value }));
            navigate('/search');
          }}
        >
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
