import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { RecentMatch, UserRanking } from '../../typings';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface PagingResponse {
  content: UserRanking[];
}

function useGetRecentMatchList() {
  const { subject: selectSubject } = useSelector((state: RootState) => state.search);

  return useQuery(['allUserRankingList', selectSubject], () => apis.getAllUserRankingList(selectSubject), {
    select: (res: AxiosResponse<PagingResponse>) => res.data.content,
  });
}

export default useGetRecentMatchList;
