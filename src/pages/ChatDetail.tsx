import React, { useCallback, useEffect, useRef, useState } from 'react';
import Chat from '../components/Chat';
import ChatTimeLine from '../components/ChatTimeLine';
import ChatForm from '../components/ChatForm';
import { useSocket } from '../hooks/useSocket';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import dayjs from 'dayjs';

const ChatDetail = () => {
  const location = useLocation();
  const roomId = location.pathname.split('/chat/')[1];
  const { chats, setChats, send, firstChatRef, setFirstChatRef } = useSocket(roomId, () => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  const { id: userId } = useSelector((state: RootState) => state.user);
  const [firstChatId, setFirstChatId] = useState<number>();

  const { refetch } = useQuery(['chatHistory', roomId, firstChatId], () => apis.getChatHistory(roomId, firstChatId), {
    onSuccess: (data) => {
      const { content, last } = data;
      const reversed = [...content].reverse();
      setChats((prev) => [...reversed, ...prev]);
      setFirstChatRef(reversed[0]);
      window.scrollBy(0, 10);
    },
  });

  const scrollToBottom = useCallback(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    if (!message.length) return;
    send(message);
    scrollToBottom();
  }, []);

  useEffect(() => {
    const scrollEvent = (e: Event) => {
      if (window.scrollY <= 200) {
        if (firstChatRef.current) {
          setFirstChatId(firstChatRef.current?.chatId);
        }
      }
    };
    window.addEventListener('scroll', scrollEvent);
    return () => window.removeEventListener('scroll', scrollEvent);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }, []);

  return (
    <div>
      <ul className='mb-[10rem]'>
        {chats.map((c, idx) => {
          if (idx >= 0 && idx < chats.length) {
            // 첫 채팅일때
            if (idx === 0) {
              return (
                <React.Fragment key={c.chatId}>
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
                <React.Fragment key={c.chatId}>
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
              key={c.chatId}
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
  );
};

export default ChatDetail;
