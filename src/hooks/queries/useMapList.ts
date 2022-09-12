import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { apis } from '../../apis';

export function useMapList(lat: number, lng: number) {
  const { data: res, isLoading } = useQuery([queryKeys.MAPLIST], async () => await apis.getAroundGame(lat, lng));
  const matchData = res?.data;

  return { matchData, isLoading };
}
