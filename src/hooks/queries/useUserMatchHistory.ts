import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { AxiosResponse } from 'axios';
import { MatchHistoryType } from '../../typings';
import { queryKeys } from '../../shared/constant/queryKeys';

function useUserMatchHistory(userId: string, subject: string) {
  return useQuery([queryKeys.USER_HISTORY, userId, subject], () => apis.getUserHistory(Number(userId), subject), {
    select: (res: AxiosResponse<MatchHistoryType[]>) => res.data,
  });
}

export default useUserMatchHistory;
