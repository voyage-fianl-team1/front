import React from 'react';
import useSelectCategory from '../../hooks/useSelectCategory';

const SelectCategory = () => {
  const { openSubjectModal, currentCategoryName } = useSelectCategory();

  return (
    <div
      className='min-w-[75px] h-[30px] border-[1px] border-matchgi-gray rounded-full py-1 px-3 text-sm flex items-center justify-between gap-2 cursor-pointer'
      onClick={openSubjectModal}
    >
      <span className='text-[12px] translate-y-[1.4px]'>{currentCategoryName ? currentCategoryName.title : ''}</span>
      <img src='/assets/images/menu/down_arrow.svg' alt='arrow' />
    </div>
  );
};

export default SelectCategory;
