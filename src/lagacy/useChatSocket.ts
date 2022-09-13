import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs/src/stomp-subscription';
import { Chat } from '../typings';
import { SERVER_STOMP_URL } from '../apis';
import { useChatStomp } from '../hooks/socket/useChatStomp';

export function useChatSocket(roomId: number | string, callback?: () => void) {
  const socketRef = useRef<WebSocket | null>(null);
  const stompClientRef = useRef<CompatClient | null>(null);
  const subscriptionRef = useRef<StompSubscription | null | undefined>(null);
  const accessToken = window.localStorage.getItem('accessToken');
  const [chats, setChats] = useState<Chat[]>([]);
  const firstChatRef = useRef<Chat | undefined>(undefined);

  useEffect(() => {
    callback && callback();
  }, [chats]);

  useEffect(() => {
    if (!SERVER_STOMP_URL) return;
    socketRef.current = new SockJS(SERVER_STOMP_URL);
    stompClientRef.current = Stomp.over(socketRef.current);
    stompClientRef.current.debug = () => {
      return;
    };

    if (!socketRef || !stompClientRef) return;

    stompClientRef.current.connect({}, (receipt: any) => {
      subscriptionRef.current = stompClientRef?.current?.subscribe(`/room/${roomId}`, (message) => {
        const body = JSON.parse(message.body);
        setChats((prev) => [...prev, body.body]);
      });
    });

    return () => {
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current?.disconnect();
    };
  }, []);

  const setFirstChatRef = useCallback((chat: Chat) => {
    firstChatRef.current = chat;
  }, []);

  const send = useCallback((message: string) => {
    const body = {
      message,
    };
    stompClientRef?.current?.publish({
      destination: `/send/${roomId}`,
      headers: {
        accessToken: accessToken || '',
      },
      body: JSON.stringify(body),
    });
  }, []);

  const unsubscribe = useCallback(() => {
    subscriptionRef.current?.unsubscribe();
    stompClientRef.current?.disconnect();
  }, []);

  return { chats, setChats, firstChatRef, send, unsubscribe, setFirstChatRef };
}
