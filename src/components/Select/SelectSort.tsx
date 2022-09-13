import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { BsCheckLg } from 'react-icons/bs';
import useSelectSort from '../../hooks/useSelectSort';

const SelectSort = () => {
  const { sortShow, handleToggleSort, handleSelectData, handleSendData } = useSelectSort();

  return (
    <section
      className={`fixed bottom-0 left-0 right-0 w-[100%] max-w-[1000px] m-auto transition-all z-50 ${
        sortShow ? '' : 'translate-y-full'
      }`}
    >
      <section className='flex flex-col justify-center items-center py-[12px] px-[62px] w-[100%] h-96 rounded-t-[20px] bg-white border'>
        <div className='absolute top-[30px] flex flex-row'>
          <h1 className='font-bold'>정렬 순서</h1>
        </div>
        <button className='absolute top-[30px] right-5' onClick={handleToggleSort}>
          <IoMdClose className='flex text-xl text-matchgi-gray cursor-pointer' />
        </button>
        <div className='flex flex-row gap-2 absolute top-[77px] left-[20px]'>
          <button
            className='w-[24px] h-[24px] order-0 flex-grow-0 border border-[#CCCCCC] rounded-[4px] bg-[#F2F2F2]
            focus:bg-[#4535CC]'
            value='createAt'
            onClick={handleSelectData}
          >
            <BsCheckLg
              className='ml-[0.25rem] text-[#F2F2F2] text-sm
              focus:bg-white
            '
            />
          </button>
          <p>최신순</p>
        </div>
        <div className='flex flex-row gap-2 absolute top-[135px] left-[20px]'>
          <button
            className='w-[24px] h-[24px] order-0 flex-grow-0 border border-[#CCCCCC] rounded-[4px] bg-[#F2F2F2]
            focus:bg-[#4535CC]'
            value='viewcount'
            onClick={handleSelectData}
          >
            <BsCheckLg
              className='ml-[0.25rem] text-[#F2F2F2] text-sm
            focus:bg-white
            '
            />
          </button>
          <p>조회수순</p>
        </div>
        <span className='flex flex-row justify-center items-center mb-[20px]'>
          <button
            className='flex flex-col justify-center items-center w-[335px] h-[47px] border border-matchgi-bordergray rounded-[2px] bg-matchgi-btnblue text-white cursor-pointer
            absolute top-[333px]'
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
