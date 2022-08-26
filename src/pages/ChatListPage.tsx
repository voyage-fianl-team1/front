import React, { useEffect, useMemo, useRef, useState } from 'react';
import ChatSearchBar from '../components/ChatSearchBar';
import ChatRoomItem from '../components/ChatRoomItem';
import { useQuery } from '@tanstack/react-query';
import { apis } from '../apis';
import { ChatRoom } from '../typings';
import LoadingSpinner from '../components/loadingSpinner';
import { useInput } from '../hooks/useInput';
import { Helmet } from 'react-helmet';

const ChatListPage = () => {
  const { value, handler } = useInput('');
  const [filterData, setFilterData] = useState<ChatRoom[]>([]);
  const timerRef = useRef<any>(null);

  const { data } = useQuery<ChatRoom[]>(['chatRooms'], apis.getChatRooms, {
    select: (data) => data.filter((d) => d.title !== value),
  });

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!data) {
      setFilterData([]);
    } else {
      if (value.length === 0) {
        setFilterData(data);
      }
      const filtering = () => {
        const regExp = new RegExp(value, 'g');
        console.log('호출', 1);
        setFilterData(data.filter((d) => regExp.test(d.title)));
      };
      timerRef.current = setTimeout(filtering, 500);
    }
  }, [data, value]);

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
