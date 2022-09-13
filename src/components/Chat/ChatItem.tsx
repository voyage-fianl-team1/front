import React, { FC } from 'react';
import { Chat as ChatType } from '../../typings';
import ChatTimeLine from './ChatTimeLine';
import dayjs from 'dayjs';
import useCurrentUser from '../../hooks/auth/useCurrentUser';
import Chat from './Chat';

interface Props {
  idx: number;
  chats: ChatType[];
  chat: ChatType;
}

const ChatItem: FC<Props> = ({ idx, chat, chats }) => {
  const {
    user: { id: userId },
  } = useCurrentUser();
  if (idx >= 0 && idx < chats.length) {
    // 첫 채팅일때
    if (idx === 0) {
      return (
        <>
          <ChatTimeLine>{dayjs(chats[idx]['createdAt']).format('YYYY-MM-DD (ddd)')}</ChatTimeLine>
          <Chat
            direction={chat.userId === userId ? 'right' : 'left'}
            bg={chat.userId === userId ? 'gray' : 'white'}
            username={chat.nickname}
            profilePath={chat.profileImgUrl}
            createdAt={chat.createdAt}
          >
            {chat.message}
          </Chat>
        </>
      );
    }
    // 채팅사이 날짜가 다를떄
    if (
      chats[idx - 1] &&
      chats[idx] &&
      dayjs(chats[idx - 1]['createdAt']).format('YYYY-MM-DD') !== dayjs(chats[idx]['createdAt']).format('YYYY-MM-DD')
    ) {
      return (
        <>
          <ChatTimeLine>{dayjs(chats[idx]['createdAt']).format('YYYY-MM-DD (ddd)')}</ChatTimeLine>
          <Chat
            direction={chat.userId === userId ? 'right' : 'left'}
            bg={chat.userId === userId ? 'gray' : 'white'}
            username={chat.nickname}
            profilePath={chat.profileImgUrl}
            createdAt={chat.createdAt}
          >
            {chat.message}
          </Chat>
        </>
      );
    }
  }

  return (
    <Chat
      direction={chat.userId === userId ? 'right' : 'left'}
      bg={chat.userId === userId ? 'gray' : 'white'}
      username={chat.nickname}
      profilePath={chat.profileImgUrl}
      createdAt={chat.createdAt}
    >
      {chat.message}
    </Chat>
  );
};

export default React.memo(ChatItem);
