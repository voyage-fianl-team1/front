import { ChatRoom } from '../../typings';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { apis } from '../../apis';

function useGetChatRooms() {
  return useQuery<ChatRoom[]>([queryKeys.CHAT_ROOMS], apis.getChatRooms);
}

export default useGetChatRooms;
