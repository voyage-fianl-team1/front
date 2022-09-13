import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useChat from '../../hooks/useChat';
import ChatItem from './ChatItem';
import { VariableSizeList } from 'react-window';

const ChatList = () => {
  const roomId = Number(location.pathname.split('/chat/')[1]);
  const { chatBoxRef, chats } = useChat(roomId);

  return (
    <ul ref={chatBoxRef} className='overflow-y-auto '>
      <div className='block w-full h-10'></div>
      <ListComponents />
      {/*{chats.map((c, idx) => (*/}
      {/*  <ChatItem key={c.chatId || uuidv4()} idx={idx} chat={c} chats={chats} />*/}
      {/*))}*/}
    </ul>
  );
};

export default ChatList;

const ListComponents = () => {
  const roomId = Number(location.pathname.split('/chat/')[1]);

  const { chatBoxRef, chats } = useChat(roomId);

  return (
    <VariableSizeList height={500} width={500} itemCount={chats.length} itemSize={120 as any}>
      {({ index, style }) => {
        return <ChatItem key={chats[index].chatId || uuidv4()} idx={index} chat={chats[index]} chats={chats} />;
      }}
    </VariableSizeList>
  );
};
