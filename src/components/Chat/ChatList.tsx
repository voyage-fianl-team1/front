import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import useChat from '../../hooks/useChat';
import ChatItem from './ChatItem';

const ChatList = () => {
  const roomId = Number(location.pathname.split('/chat/')[1]);
  const { chatBoxRef, chats } = useChat(roomId);

  return (
    <ul ref={chatBoxRef} className='overflow-y-auto '>
      <div className='block w-full h-10'></div>
      {chats.map((c, idx) => (
        <ChatItem key={c.chatId || uuidv4()} idx={idx} chat={c} chats={chats} />
      ))}
    </ul>
  );
};

export default ChatList;
