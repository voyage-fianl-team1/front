import React, { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatRoom } from '../typings';
import { getFromNow } from '../util/converDate';
import { useSocket } from '../hooks/useSocket';

interface Props {
  id: number;
  data: ChatRoom;
}

const ChatRoomItem: FC<Props> = ({ id, data }) => {
  const navigate = useNavigate();
  const handleRoute = useCallback(() => {
    navigate(`/chat/${id}`);
  }, []);
  const { chats } = useSocket(id);

  const lastMessage = useMemo(() => {
    if (chats.length > 0) {
      return chats[chats.length - 1].message;
    }
    return data.message;
  }, [data, chats]);

  const lastMessageCreatedAt = useMemo(() => {
    if (chats.length > 0) {
      return chats[chats.length - 1].createdAt;
    }
    return data.createdAt;
  }, [data, chats]);

  const liveChatCount = useMemo(() => {
    if (data.unreadMessageCount) {
      return data.unreadMessageCount + chats.length;
    }
    return chats.length;
  }, [chats, data]);

  return (
    <li className='flex justify-between items-center cursor-pointer relative ' onClick={handleRoute}>
      <div className='flex items-center gap-3'>
        <img src={data.imgUrl ? data.imgUrl : '/assets/images/avatar.svg'} alt='avatar-icon' className='w-[48px]' />
        <div>
          <h1 className='font-bold'>{data.title}</h1>
          <p className='text-matchgi-gray text-sm'>
            {lastMessage ? (
              <span>{lastMessage.length > 25 ? lastMessage.slice(0, 26) + '...' : lastMessage}</span>
            ) : null}
            <span>
              {lastMessageCreatedAt ? ` | ${getFromNow(lastMessageCreatedAt)}` : <span className='inline-block' />}
            </span>
          </p>
        </div>
      </div>
      <img src='/assets/images/menu/arrow.svg' alt='arrow-icon' />
      {liveChatCount > 0 && (
        <div className='absolute right-10 bg-red-400 text-white min-w-[24px] h-[24px] flex justify-center items-center rounded-full'>
          {liveChatCount}
        </div>
      )}
    </li>
  );
};

export default ChatRoomItem;

//
