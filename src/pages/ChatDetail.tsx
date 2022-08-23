import React from 'react';
import Chat from '../components/Chat';
import ChatTimeLine from '../components/ChatTimeLine';
import ChatForm from '../components/ChatForm';
import { useSocket } from '../hooks/useSocket';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ChatDetail = () => {
  const location = useLocation();
  const roomId = location.pathname.split('/chat/')[1];
  const { chats, send, unsubscribe } = useSocket(roomId);
  const { id: userId } = useSelector((state: RootState) => state.user);

  const handleSendMessage = (message: string) => {
    send(message);
  };

  console.log(chats);

  return (
    <div>
      <ChatTimeLine>어제 21:40</ChatTimeLine>
      <ul className='mb-20'>
        {chats.map((c) => (
          <Chat
            key={c.chatId}
            direction={c.userId === userId ? 'right' : 'left'}
            bg={c.userId === userId ? 'gray' : 'white'}
            username={c.nickname}
            profilePath={c.profileImgUrl}
          >
            {c.message}
          </Chat>
        ))}
      </ul>
      <ChatForm onSubmit={handleSendMessage} />
    </div>
  );
};

export default ChatDetail;
