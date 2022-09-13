import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { RecentMatch } from '../../typings';
import { AxiosResponse } from 'axios';
import { queryKeys } from '../../shared/constant/queryKeys';

interface PagingResponse {
  content: RecentMatch[];
}

function useGetRecentMatchList() {
  return useQuery([queryKeys.RECENT_MATCH_LIST], apis.getMatchItem, {
    select: (res: AxiosResponse<PagingResponse>) => res.data.content,
  });
}

export default useGetRecentMatchList;
