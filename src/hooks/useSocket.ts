import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs/src/stomp-subscription';
import { Chat } from '../typings';

const socketServerURL = 'http://52.78.157.63/ws-stomp';

export function useSocket(roomId: number | string) {
  const socketRef = useRef<WebSocket | null>(null);
  const stompClientRef = useRef<CompatClient | null>(null);
  const subscriptionRef = useRef<StompSubscription | null | undefined>(null);
  const accessToken = window.localStorage.getItem('accessToken');
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    socketRef.current = new SockJS(socketServerURL);
    stompClientRef.current = Stomp.over(socketRef.current);

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

  return { chats, send, unsubscribe };
}
