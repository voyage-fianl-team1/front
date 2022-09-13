import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { JoinData } from '../../typings';
import { apis } from '../../apis';

export function useGetJoinData(postId: number) {
  const { data: joinList, isLoading } = useQuery([queryKeys.JOINLIST], async () => await apis.getJoinList(postId));
  const { data: acceptList } = useQuery([queryKeys.ACCEPTLIST], async () => await apis.getAcceptList(postId));
  const joinData: JoinData = joinList?.data;
  const acceptData = acceptList?.data;

  return { joinData, isLoading, acceptData };
}
