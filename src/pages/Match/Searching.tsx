import React from 'react';
import { useSearching } from '../../hooks/match/useSearching';

const SearchMiddle = () => {
  const { handleSearchingOut, handleKeyword, handleButton, navigate, searchingRef, register } = useSearching('');

  return (
    <>
      <nav className='flex gap-3 items-center py-4 bg-[#FCFCFC] sticky top-0 z-[999] px-4 max-w-[1000px] m-auto'>
        <h1 className='text-lg font-bold'>경기 검색</h1>
      </nav>
      <div className='flex flex-row items-center justify-center'>
        <div className='w-[32px] h-[32px]'>
          <img
            src='/assets/images/back.svg'
            alt='back-button'
            onClick={() => navigate('/')}
            className='cursor-pointer'
          />
        </div>
        <div
          className={`flex border-[1px] bg-[#FCFCFC] border-matchgi-gray rounded-full w-full h-[44px] items-center 
        `}
        >
          <div className='w-full flex flex-row justify-between'>
            <input
              type='text'
              placeholder=' 제목, 내용으로 검색'
              className='flex-1 outline-0 bg-[#FCFCFC] ml-4'
              onKeyPress={handleKeyword}
              autoFocus
              {...register('keyword')}
            />
            <button onClick={handleButton}>
              <img src='/assets/images/search.svg' alt='search-icon' className='w-[24px] h-[24px] mx-[10px]' />
            </button>
          </div>
        </div>
      </div>
      <div className='w-[100%] h-[90vh] bg-[#FCFCFC]' ref={searchingRef} onClick={handleSearchingOut}></div>
    </>
  );
};

export default SearchMiddle;
