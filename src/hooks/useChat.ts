import { useChatSocket } from './socket/useChatSocket';
import { useCallback, useEffect, useRef, useState } from 'react';
import useChatHistory from './queries/useChatHistory';
import { apis } from '../apis';

function useChat(roomId: number) {
  const { chats, setChats, send, firstChatRef, setFirstChatRef } = useChatSocket(roomId, () => {
    scrollToBottom();
  });

  const [firstChatId, setFirstChatId] = useState<number>();
  const [scrollDir, setScrollDir] = useState('down');
  const [y, setY] = useState(0);
  const chatBoxRef = useRef<HTMLUListElement>(null);

  useChatHistory(roomId, firstChatId, (data: any) => {
    const { content } = data;
    const reversed = [...content].reverse();
    setChats((prev) => [...reversed, ...prev]);
    setFirstChatRef(reversed[0]);

    chatBoxRef?.current?.scrollTo(0, 40);
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

  // 마지막 채팅 읽은시간 set
  useEffect(() => {
    return () => {
      apis.setLastActive(roomId);
    };
  }, []);

  return { chatBoxRef, chats, handleSendMessage };
}

export default useChat;
