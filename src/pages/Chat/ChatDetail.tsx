import React, { useCallback, useEffect, useRef, useState } from 'react';
import Chat from '../../components/Chat/Chat';
import ChatTimeLine from '../../components/Chat/ChatTimeLine';
import ChatForm from '../../components/Chat/ChatForm';
import { useSocket } from '../../hooks/useSocket';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';

const ChatDetail = () => {
  const location = useLocation();
  const roomId = location.pathname.split('/chat/')[1];
  const { chats, setChats, send, firstChatRef, setFirstChatRef } = useSocket(roomId, () => {
    scrollToBottom();
  });
  const { id: userId } = useSelector((state: RootState) => state.user);
  const [firstChatId, setFirstChatId] = useState<number>();
  const [scrollDir, setScrollDir] = useState('down');
  const [y, setY] = useState(0);
  const chatBoxRef = useRef<HTMLUListElement>(null);
  const { refetch } = useQuery(['chatHistory', roomId, firstChatId], () => apis.getChatHistory(roomId, firstChatId), {
    onSuccess: (data) => {
      const { content, last } = data;
      const reversed = [...content].reverse();
      setChats((prev) => [...reversed, ...prev]);
      setFirstChatRef(reversed[0]);
      console.log(chatBoxRef?.current?.scrollHeight);

      chatBoxRef?.current?.scrollTo(0, 40);
    },
  });

  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef?.current?.scrollHeight + 1000;
    }
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    if (!message.length) return;
    send(message);
  }, []);

  const scrollNavigation = useCallback(
    (e: Event) => {
      if (chatBoxRef.current) {
        if (y > chatBoxRef?.current?.scrollTop) {
          setScrollDir('up');
        } else {
          setScrollDir('down');
        }
        setY(chatBoxRef?.current?.scrollTop);
      }
    },
    [y, chatBoxRef.current]
  );

  const scrollEvent = useCallback(
    (e: Event) => {
      if (chatBoxRef.current) {
        if (chatBoxRef?.current?.scrollTop <= 200 && scrollDir === 'up') {
          if (firstChatRef.current) {
            setFirstChatId(firstChatRef.current?.chatId);
          }
        }
      }
    },
    [firstChatRef.current, scrollDir, chatBoxRef.current]
  );

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.addEventListener('scroll', scrollEvent);
      chatBoxRef.current.addEventListener('scroll', scrollNavigation);
    }

    return () => {
      if (chatBoxRef.current) {
        chatBoxRef.current.removeEventListener('scroll', scrollEvent);
        chatBoxRef.current.removeEventListener('scroll', scrollNavigation);
      }
    };
  }, [scrollNavigation, chatBoxRef.current]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 500);
  }, []);

  // 마지막 채팅 읽은시간 set
  useEffect(() => {
    return () => {
      apis.setLastActive(parseInt(roomId));
    };
  }, []);

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
