import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { RecentMatch } from '../../typings';
import { AxiosResponse } from 'axios';

interface PagingResponse {
  content: RecentMatch[];
}

function useGetRecentMatchList() {
  return useQuery(['recentMatchList'], apis.getMatchItem, {
    select: (res: AxiosResponse<PagingResponse>) => res.data.content,
  });
}

export default useGetRecentMatchList;
