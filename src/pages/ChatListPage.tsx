import React from 'react';
import ChatSearchBar from '../components/ChatSearchBar';
import ChatRoomItem from '../components/ChatRoomItem';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { ChatRoom } from '../typings';
import LoadingSpinner from '../components/loadingSpinner';

const ChatListPage = () => {
  const { data } = useQuery<ChatRoom[]>(['chatRooms'], apis.getChatRooms);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <ChatSearchBar />
      <ul className='mt-8 flex flex-col gap-5'>
        {data.map((r) => (
          <ChatRoomItem key={r.roomId} id={r.roomId} data={r} />
        ))}
      </ul>
    </div>
  );
};

export default ChatListPage;
