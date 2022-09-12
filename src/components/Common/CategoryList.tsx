import React from 'react';
import { categories } from '../../shared/constant/subjectTable';
import useSelectCategory from '../../hooks/useSelectCategory';
import usePush from '../../hooks/usePush';

const CategoryList = () => {
  const { push } = usePush();
  const { handleSelect } = useSelectCategory(() => {
    push('/search');
  });

  return (
    <div className='grid grid-cols-4 md:grid-cols-8 gap-[24px] justify-center cursor-pointer'>
      {categories.map((c, idx) => (
        <div key={idx} onClick={() => handleSelect(c.value)}>
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
