import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs/src/stomp-subscription';

const socketServerURL = 'http://52.78.157.63/ws-stomp';
const ChatListPage = () => {
  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken');
    const socket = new SockJS(socketServerURL);
    const stompClient = Stomp.over(socket);
    let subscription: StompSubscription;
    stompClient.connect({}, (receipt: any) => {
      subscription = stompClient.subscribe('/room/1', (message) => {
        const body = JSON.parse(message.body);
        console.log(body.body);
      });
      const body = {
        message: '내용',
      };
      stompClient.publish({
        destination: '/send/1',
        headers: {
          access: accessToken || '',
        },
        body: JSON.stringify(body),
      });
    });
    return () => {
      subscription?.unsubscribe();
      stompClient.disconnect();
    };
  }, []);

  return <div>chatlist</div>;
};

export default ChatListPage;
