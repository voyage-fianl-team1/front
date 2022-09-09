import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ChatSearchBar from '../../components/ChatSearchBar';
import ChatRoomItem from '../../components/ChatRoomItem';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { ChatRoom } from '../../typings';
import LoadingSpinner from '../../components/loadingSpinner';
import { useInput } from '../../hooks/useInput';
import { Helmet } from 'react-helmet';
import { useDebounce } from '../../hooks/useDebounce';

const ChatListPage = () => {
  const { value, handler } = useInput('');
  const [filterData, setFilterData] = useState<ChatRoom[]>([]);

  const { data } = useQuery<ChatRoom[]>(['chatRooms'], apis.getChatRooms, {
    select: (data) => data.filter((d) => d.title !== value),
  });

  const filtering = useCallback(() => {
    if (!data) {
      setFilterData([]);
    } else {
      if (value.length === 0) {
        setFilterData(data);
      }
      const regExp = new RegExp(value, 'g');
      setFilterData(data.filter((d) => regExp.test(d.title)));
    }
  }, [data, value]);

  useDebounce(filtering, 500);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>매치기 | 채팅목록</title>
      </Helmet>
      <div>
        <ChatSearchBar inputValue={value} handler={handler} />
        <ul className='mt-8 flex flex-col gap-5'>
          {filterData.map((r) => (
            <ChatRoomItem key={r.roomId} id={r.roomId} data={r} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatListPage;
