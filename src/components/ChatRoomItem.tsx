import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
}

const ChatRoomItem: FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const handleRoute = useCallback(() => {
    navigate(`/chat/${id}`);
  }, []);

  return (
    <li className='flex justify-between items-center cursor-pointer' onClick={handleRoute}>
      <div className='flex items-center gap-3'>
        <img src='/assets/images/avatar.svg' alt='avatar-icon' className='w-[48px]' />
        <div>
          <h1 className='font-bold'>아이디</h1>
          <p className='text-matchgi-gray text-sm'>마지막 메세지 내용 | 3일전</p>
        </div>
      </div>
      <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
    </li>
  );
};

export default ChatRoomItem;
