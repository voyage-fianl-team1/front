import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFocus from '../../hooks/util/useFocus';

const SearchBar = () => {
  const navigate = useNavigate();
  const { isFocus, handleFocus, handleFocusOut } = useFocus(() => navigate('/searching'));

  return (
    <div
      className={`flex border-[1px] bg-[#FCFCFC] border-matchgi-gray h-[44px] rounded-[12px] items-center p-[5px] ${
        isFocus ? 'border-[#797CD4] border-[2px]' : ''
      }`}
    >
      <img src='/assets/images/search.svg' alt='search-icon' className='w-[24px] h-[24px] mx-[10px]' />
      <input
        type='text'
        placeholder='제목, 내용으로 검색'
        className='flex-1 outline-0 placeholder:translate-y-0.5 bg-[#FCFCFC]'
        onFocus={handleFocus}
        onBlur={handleFocusOut}
      />
    </div>
  );
};

export default SearchBar;
