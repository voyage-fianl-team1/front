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

const ChatDetail = () => {
  const location = useLocation();
  const roomId = Number(location.pathname.split('/chat/')[1]);
  const {
    user: { id: userId },
  } = useCurrentUser();
  const { chatBoxRef, chats, handleSendMessage } = useChat(roomId);

  return (
    <>
      <Helmet>
        <title>매치기 | 채팅방</title>
      </Helmet>
      <div className='flex flex-col h-[90vh] justify-between'>
        <ul ref={chatBoxRef} className='overflow-y-auto '>
          <div className='block w-full h-10'></div>
          {chats.map((c, idx) => {
            if (idx >= 0 && idx < chats.length) {
              // 첫 채팅일때
              if (idx === 0) {
                return (
                  <React.Fragment key={c.chatId || uuidv4()}>
                    <ChatTimeLine>{dayjs(chats[idx]['createdAt']).format('YYYY-MM-DD (ddd)')}</ChatTimeLine>
                    <Chat
                      direction={c.userId === userId ? 'right' : 'left'}
                      bg={c.userId === userId ? 'gray' : 'white'}
                      username={c.nickname}
                      profilePath={c.profileImgUrl}
                      createdAt={c.createdAt}
                    >
                      {c.message}
                    </Chat>
                  </React.Fragment>
                );
              }
              // 채팅사이 날짜가 다를떄
              if (
                chats[idx - 1] &&
                chats[idx] &&
                dayjs(chats[idx - 1]['createdAt']).format('YYYY-MM-DD') !==
                  dayjs(chats[idx]['createdAt']).format('YYYY-MM-DD')
              ) {
                return (
                  <React.Fragment key={c.chatId || uuidv4()}>
                    <ChatTimeLine>{dayjs(chats[idx]['createdAt']).format('YYYY-MM-DD (ddd)')}</ChatTimeLine>
                    <Chat
                      direction={c.userId === userId ? 'right' : 'left'}
                      bg={c.userId === userId ? 'gray' : 'white'}
                      username={c.nickname}
                      profilePath={c.profileImgUrl}
                      createdAt={c.createdAt}
                    >
                      {c.message}
                    </Chat>
                  </React.Fragment>
                );
              }
            }

            // 같은 날짜의 채팅은 내용만
            return (
              <Chat
                key={c.chatId || uuidv4()}
                direction={c.userId === userId ? 'right' : 'left'}
                bg={c.userId === userId ? 'gray' : 'white'}
                username={c.nickname}
                profilePath={c.profileImgUrl}
                createdAt={c.createdAt}
              >
                {c.message}
              </Chat>
            );
          })}
        </ul>
        <ChatForm onSubmit={handleSendMessage} />
      </div>
    </>
  );
};

export default ChatDetail;
