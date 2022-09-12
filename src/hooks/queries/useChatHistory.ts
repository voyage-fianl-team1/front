import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { AxiosResponse } from 'axios';
import { queryKeys } from '../../shared/constant/queryKeys';

interface ResponseType {
  content: any;
  last: any;
}

function useChatHistory(roomId: number, firstChatId: number | undefined, onSuccess: any) {
  return useQuery([queryKeys.CHAT_HISTORY, roomId, firstChatId], () => apis.getChatHistory(roomId, firstChatId), {
    select: (res: AxiosResponse<ResponseType>) => res.data,
    onSuccess,
  });
}

export default useChatHistory;
