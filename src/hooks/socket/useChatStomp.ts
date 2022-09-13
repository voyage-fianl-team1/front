import { useStomp } from './useStomp';
import { SERVER_STOMP_URL } from '../../apis';
import { Chat } from '../../typings';
import useCurrentUser from '../auth/useCurrentUser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getItemFromLS } from '../../util/handleLocalStorage';

interface ChatResponse {
  body: Chat;
  headers: { [key: string]: any };
  statusCode: string;
  statusCodeValue: number;
}

export function useChatStomp(roomId: string | number, callback?: any) {
  const {
    user: { id: userId },
  } = useCurrentUser();
  const [chats, setChats] = useState<Chat[]>([]);
  const firstChatRef = useRef<Chat | undefined>(undefined);

  const { subscribe, isConnected, unsubscribe, send, subscriptions } = useStomp(SERVER_STOMP_URL);

  const setFirstChatRef = useCallback((chat: Chat) => {
    firstChatRef.current = chat;
  }, []);

  const sendMessage = useCallback((message: string) => {
    send(
      `/send/${roomId}`,
      { message },
      {
        accessToken: getItemFromLS('accessToken') || '',
      }
    );
  }, []);

  useEffect(() => {
    callback && callback();
  }, [chats]);

  useEffect(() => {
    if (!userId || !isConnected || !roomId) return;

    subscribe<ChatResponse>(`/room/${roomId}`, (body) => {
      setChats((prev) => [...prev, body.body]);
    });

    return () => {
      if (subscriptions[`/room/${roomId}`]) {
        unsubscribe(`/room/${roomId}`);
      }
    };
  }, [userId, isConnected, roomId]);

  return {
    setFirstChatRef,
    chats,
    setChats,
    sendMessage,
    firstChatRef,
  };
}
