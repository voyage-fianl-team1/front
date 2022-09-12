import React, { useCallback, useState } from 'react';
import ChatSearchBar from '../../components/Chat/ChatSearchBar';
import ChatRoomItem from '../../components/Chat/ChatRoomItem';
import { ChatRoom } from '../../typings';
import LoadingSpinner from '../../components/Common/loadingSpinner';
import { useInput } from '../../hooks/util/useInput';
import { Helmet } from 'react-helmet';
import { useDebounce } from '../../hooks/util/useDebounce';
import useGetChatRooms from '../../hooks/queries/useGetChatRooms';

const ChatListPage = () => {
  const { value, handler } = useInput('');
  const [filterData, setFilterData] = useState<ChatRoom[]>([]);

  const { data: initialRooms } = useGetChatRooms();

  const filtering = useCallback(() => {
    if (!initialRooms) {
      setFilterData([]);
    } else {
      if (value.length === 0) {
        setFilterData(initialRooms);
      }
      const regExp = new RegExp(value, 'g');
      setFilterData(initialRooms.filter((d) => regExp.test(d.title)));
    }
  }, [initialRooms, value]);

  useDebounce(filtering, 500);

  if (!initialRooms) {
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
