import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { subjectSearchShow } from '../../redux/features/searchSlice';
import { categories } from '../../util/subjectTable';

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='grid grid-cols-4 md:grid-cols-8 gap-[24px] justify-center cursor-pointer'>
      {categories.map((c, idx) => (
        <div
          key={idx}
          onClick={() => {
            dispatch(subjectSearchShow({ subject: c.value }));
            navigate('/search');
          }}
        >
          <div className='bg-[#F4F5F5] flex justify-center items-center w-[66px] h-[66px] m-auto'>
            <img src={c.icon} alt='all-icon' className='' />
          </div>
          <h5 className='text-[14px] text-center mt-1 '>{c.title}</h5>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
