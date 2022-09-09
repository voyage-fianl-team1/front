import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectShow } from '../../redux/features/toggleSlice';
import { RootState } from '../../redux/store';
import { categories } from '../../util/subjectTable';

const SelectCategory = () => {
  const { subject } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  const categoryName = useMemo(() => categories.find((c) => c.value === subject), [subject]);
  const openSubjectModal = () => {
    dispatch(toggleSelectShow());
  };
  return (
    <div
      className='min-w-[75px] h-[30px] border-[1px] border-matchgi-gray rounded-full py-1 px-3 text-sm flex items-center justify-between gap-2 cursor-pointer'
      onClick={openSubjectModal}
    >
      <span className='text-[12px] translate-y-[1.4px]'>{categoryName ? categoryName.title : ''}</span>
      <img src='/assets/images/menu/down_arrow.svg' alt='arrow' />
    </div>
  );
};

export default SelectCategory;
