import React, { useCallback, useState } from 'react';

const ChatSearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    setIsFocus(false);
  }, []);

  return (
    <div
      className={`flex h-[44px] rounded-[12px] items-center p-[5px] bg-[#F4F5F5] ${
        isFocus ? 'border-[#797CD4] border-[1px]' : ''
      }`}
    >
      <img src='/assets/images/search.svg' alt='search-icon' className='w-[24px] h-[24px] mx-[10px]' />
      <input
        type='text'
        placeholder='검색'
        className='flex-1 outline-0 bg-transparent'
        onFocus={handleFocus}
        onBlur={handleFocusOut}
      />
    </div>
  );
};

export default ChatSearchBar;
