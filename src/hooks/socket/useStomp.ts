import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { SERVER_STOMP_URL } from '../../apis';

let socketClient: WebSocket;
let stompClient: CompatClient;
const subscriptions: { [key: string]: StompSubscription } = {};

export function useStomp(callback: any) {
  const connect = () => {
    if (!socketClient) {
      socketClient = new SockJS(SERVER_STOMP_URL);
    }

    if (!stompClient) {
      stompClient = Stomp.over(socketClient);
      stompClient.debug = () => {
        return;
      };
    }

    if (socketClient && stompClient) {
      stompClient.connect({}, (receipt: any) => {
        callback && callback();
      });
    }
  };

  useEffect(() => {
    connect();
  }, []);

  const subscribe = <T>(path: string, callback: (msg: T) => void) => {
    if (!stompClient) return;

    const subscription = stompClient.subscribe(path, (message) => {
      const body: T = JSON.parse(message.body).body;
      callback(body);
    });
    subscriptions[path] = subscription;
  };

  const unsubscribe = (path: string) => {
    subscriptions[path].unsubscribe();
    delete subscriptions[path];
  };

  return {
    connect,
    subscribe,
    unsubscribe,
    subscriptions,
  };
}
