import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortSearchShow } from '../redux/features/searchSlice';
import { toggleSortShow } from '../redux/features/sortSlice';
import { RootState } from '../redux/store';
import { IoMdClose } from 'react-icons/io';

const SelectSort = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState<string>('createAt');
  const sortShow = useSelector((state: RootState) => state.sort.sortShow);

  const handleToggleSort = useCallback(() => {
    dispatch(toggleSortShow());
  }, []);

  const handleSelectData = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSort(e.currentTarget.value);
  };

  const handleSendData = () => {
    dispatch(sortSearchShow({ sort: sort }));
    dispatch(toggleSortShow());
  };

  return (
    <section
      className={`fixed bottom-0 left-0 right-0 w-[100%] max-w-[1000px] m-auto transition-all z-50 ${
        sortShow ? '' : 'translate-y-full'
      }`}
    >
      <section className='flex flex-col justify-center items-center py-[12px] px-[62px] w-[100%] h-96 rounded-t-[20px] bg-white border'>
        <div className='mb-48 flex items-center'>
          <h1 className='font-bold'>정렬</h1>
          <button className='absolute top-22 right-8' onClick={handleToggleSort}>
            <IoMdClose className='flex text-xl text-matchgi-gray cursor-pointer' />
          </button>
        </div>
        <span className='flex flex-row justify-center items-center gap-[11px] mb-[12px]'>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'
            value='createAt'
            onClick={handleSelectData}
          >
            최신순
          </button>
          <button
            className='flex flex-col justify-center items-center w-[162px] h-[44px] border border-matchgi-bordergray rounded-[2px]'
            value='viewcount'
            onClick={handleSelectData}
          >
            조회수순
          </button>
        </span>
        <span className='flex flex-row justify-center items-center mb-[20px]'>
          <button
            className='flex flex-col justify-center items-center w-[335px] h-[47px] border border-matchgi-bordergray rounded-[2px] bg-matchgi-btnblue text-white cursor-pointer'
            onClick={handleSendData}
          >
            적용하기
          </button>
        </span>
      </section>
    </section>
  );
};

export default SelectSort;
