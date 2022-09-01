import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs/src/stomp-subscription';
import { Chat, Notification } from '../typings';

const socketServerURL = 'http://52.78.157.63/ws-stomp';

export function useNotification(userId: number | string | undefined, callback?: (body: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);
  const stompClientRef = useRef<CompatClient | null>(null);
  const subscriptionRef = useRef<StompSubscription | null | undefined>(null);
  const accessToken = window.localStorage.getItem('accessToken');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socketRef.current = new SockJS(socketServerURL);
    stompClientRef.current = Stomp.over(socketRef.current);
    stompClientRef.current.debug = () => {
      return;
    };

    if (!socketRef || !stompClientRef) return;

    stompClientRef.current.connect({}, (receipt: any) => {
      subscriptionRef.current = stompClientRef?.current?.subscribe(`/room/user/${userId}`, (message) => {
        const body = JSON.parse(message.body);
        setNotifications((prev) => [body, ...prev]);
        callback && callback(body);
      });
    });

    return () => {
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current?.disconnect();
    };
  }, []);

  const unsubscribe = useCallback(() => {
    subscriptionRef.current?.unsubscribe();
    stompClientRef.current?.disconnect();
  }, []);

  return { notifications, setNotifications, unsubscribe };
}

/**
 * content: "ee님이 소켓연결테스트 에 참가신청하셨습니다"
 * createdAt: "2022-08-26T17:37:30.844"
 * id: 8
 * isread: false
 * postId: 14
 */
