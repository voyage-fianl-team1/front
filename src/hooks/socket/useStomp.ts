import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { useCallback, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

interface ObjectType {
  [key: string]: any;
}

let socketClient: WebSocket;
let stompClient: CompatClient;
const subscriptions: { [key: string]: StompSubscription } = {};

export function useStomp(url: string, callback?: any) {
  const [isConnected, setIsConnected] = useState(false);
  const connect = useCallback(() => {
    if (!socketClient) {
      socketClient = new SockJS(url);
    }

    if (!stompClient) {
      stompClient = Stomp.over(socketClient);
      stompClient.debug = () => {
        return;
      };
    }

    if (socketClient && stompClient) {
      stompClient.connect({}, (receipt: any) => {
        setIsConnected(true);
        callback && callback();
      });
    }
  }, []);

  const send = useCallback((path: string, body: ObjectType, headers: ObjectType) => {
    stompClient.publish({
      destination: path,
      headers,
      body: JSON.stringify(body),
    });
  }, []);

  const subscribe = useCallback(<T>(path: string, callback: (msg: T) => void) => {
    if (!stompClient) return;

    const subscription = stompClient.subscribe(path, (message) => {
      const body: T = JSON.parse(message.body);
      callback(body);
    });
    subscriptions[path] = subscription;
  }, []);

  const unsubscribe = useCallback((path: string) => {
    subscriptions[path].unsubscribe();
    delete subscriptions[path];
  }, []);

  const disconnect = useCallback(() => {
    stompClient.disconnect();
  }, []);

  useEffect(() => {
    connect();
  }, []);

  return {
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    subscriptions,
    send,
    isConnected,
  };
}
