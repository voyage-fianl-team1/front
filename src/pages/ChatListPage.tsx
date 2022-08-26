import React, { useMemo } from 'react';
import ChatSearchBar from '../components/ChatSearchBar';
import ChatRoomItem from '../components/ChatRoomItem';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { ChatRoom } from '../typings';
import LoadingSpinner from '../components/loadingSpinner';
import { useInput } from '../hooks/useInput';
import { Helmet } from 'react-helmet';

const ChatListPage = () => {
  const { data } = useQuery<ChatRoom[]>(['chatRooms'], apis.getChatRooms);
  const { value, handler } = useInput('');

  const filterdChatRoomList = useMemo(() => {
    if (!data) return [];
    return [...data].filter((chat) => {
      return chat.title !== value;
    });
  }, [data, value]);

  if (!data) {
    return <LoadingSpinner />;
  }

  console.log(filterdChatRoomList);

  return (
    <>
      <Helmet>
        <title>매치기 | 채팅목록</title>
      </Helmet>
      <div>
        <ChatSearchBar inputValue={value} handler={handler} />
        <ul className='mt-8 flex flex-col gap-5'>
          {filterdChatRoomList.map((r) => (
            <ChatRoomItem key={r.roomId} id={r.roomId} data={r} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatListPage;
