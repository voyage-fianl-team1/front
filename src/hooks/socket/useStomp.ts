import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { SERVER_STOMP_URL } from '../../apis';

let socketClient: WebSocket;
let stompClient: CompatClient;
export function useStomp() {
  const connect = () => {
    if (!socketClient) {
      socketClient = new SockJS(SERVER_STOMP_URL);
    }
    if (!stompClient) {
      stompClient = Stomp.over(socketClient);
    }

    if (socketClient && stompClient) {
      stompClient.connect({}, (receipt: any) => {
        console.log(receipt);
      });
    }
  };

  const subscribe = () => {
    if (!stompClient) return;
  };

  return {
    connect,
    subscribe,
  };
}
