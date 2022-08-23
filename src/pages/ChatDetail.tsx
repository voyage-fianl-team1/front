import React from 'react';
import Chat from '../components/Chat';
import ChatTimeLine from '../components/ChatTimeLine';
import ChatForm from '../components/ChatForm';

const ChatDetail = () => {
  return (
    <div>
      <ul className='mb-20'>
        <Chat direction='right' bg='gray'>
          안녕하세요
        </Chat>
        <ChatTimeLine>어제 21:40</ChatTimeLine>
        <Chat direction='left' bg='white'>
          네, 반가워요
        </Chat>
        <Chat direction='left' bg='white'>
          저리가줄레요?
        </Chat>
        <Chat direction='right' bg='gray'>
          안녕하세요
        </Chat>
        <Chat direction='right' bg='gray'>
          안녕하세요
        </Chat>
        <Chat direction='right' bg='gray'>
          안녕하세요
        </Chat>
        <Chat direction='right' bg='gray'>
          안녕하세요
        </Chat>
      </ul>
      <ChatForm />
    </div>
  );
};

export default ChatDetail;
