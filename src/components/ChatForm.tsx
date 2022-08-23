import React, { FormEvent, useCallback, useState } from 'react';
import { useInput } from '../hooks/useInput';

const ChatForm = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { value, handler, reset } = useInput('');
  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    setIsFocus(false);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(value);
      reset();
    },
    [value]
  );

  return (
    <form
      className={`fixed bottom-10 w-[90%] max-w-[1000px] left-0 right-0 m-auto border-[1px] border-[#C5C6CA] rounded-full flex items-center py-2 px-5 bg-white z-100 ${
        isFocus ? 'border-[#6367CC]' : ''
      }`}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        placeholder='메세지 내용을 입력하세요'
        className='flex-1 outline-0'
        onFocus={handleFocus}
        onBlur={handleFocusOut}
        value={value}
        onChange={handler}
      />
      <button>
        <img src='/assets/images/send.svg' alt='send-icon' className='cursor-pointer' />
      </button>
    </form>
  );
};

export default ChatForm;
