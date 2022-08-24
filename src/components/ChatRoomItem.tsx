import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatRoom } from '../typings';
import { getFromNow } from '../util/converDate';

interface Props {
  id: number;
  data: ChatRoom;
}

const ChatRoomItem: FC<Props> = ({ id, data }) => {
  const navigate = useNavigate();
  const handleRoute = useCallback(() => {
    navigate(`/chat/${id}`);
  }, []);

  return (
    <li className='flex justify-between items-center cursor-pointer relative ' onClick={handleRoute}>
      <div className='flex items-center gap-3'>
        <img src={data.imgUrl ? data.imgUrl : '/assets/images/avatar.svg'} alt='avatar-icon' className='w-[48px]' />
        <div>
          <h1 className='font-bold'>{data.title}</h1>
          <p className='text-matchgi-gray text-sm'>
            {data.message ? (
              <span>{data.message.length > 25 ? data.message.slice(0, 26) + '...' : data.message}</span>
            ) : null}
            <span>{data.createdAt ? ` | ${getFromNow(data.createdAt)}` : <span className='inline-block' />}</span>
          </p>
        </div>
      </div>
      <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
      {data.unreadMessageCount && (
        <div className='absolute right-10 bg-red-400 text-white min-w-[24px] h-[24px] flex justify-center items-center rounded-full'>
          {data.unreadMessageCount}
        </div>
      )}
    </li>
  );
};

export default ChatRoomItem;

//
