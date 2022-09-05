import React, { FC, FormEvent, useCallback, useState } from 'react';
import { useInput } from '../hooks/useInput';

interface Props {
  onSubmit: (message: string) => void;
}

const ChatForm: FC<Props> = ({ onSubmit }) => {
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
      onSubmit(value);
      reset();
    },
    [value]
  );

  return (
    <div className=''>
      <form
        className={`w-[90%] max-w-[1000px] m-auto border-[1px] border-[#C5C6CA] rounded-full flex items-center py-2 px-5 bg-[#FCFCFC] ${
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
    </div>
  );
};

export default ChatForm;
