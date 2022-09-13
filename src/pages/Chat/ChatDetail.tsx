import React from 'react';
import Chat from '../../components/Chat/Chat';
import ChatTimeLine from '../../components/Chat/ChatTimeLine';
import ChatForm from '../../components/Chat/ChatForm';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';
import useCurrentUser from '../../hooks/auth/useCurrentUser';
import useChat from '../../hooks/useChat';
import ChatList from '../../components/Chat/ChatList';

const ChatDetail = () => {
  const location = useLocation();
  const roomId = Number(location.pathname.split('/chat/')[1]);
  const {
    user: { id: userId },
  } = useCurrentUser();
  const { handleSendMessage } = useChat(roomId);

  return (
    <>
      <Helmet>
        <title>매치기 | 채팅방</title>
      </Helmet>
      <div className='flex flex-col h-[90vh] justify-between'>
        <ChatList />
        <ChatForm onSubmit={handleSendMessage} />
      </div>
    </>
  );
};

export default ChatDetail;
