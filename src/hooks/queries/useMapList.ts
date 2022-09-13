import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { apis } from '../../apis';

export function useMapList(lat: number, lng: number) {
  const { data: res, isLoading } = useQuery([queryKeys.MAPLIST], async () => await apis.getAroundGame(lat, lng));
  const matchData = res?.data;
  // const res = useQuery(
  //   ['matchList'],
  //   async () =>
  //     await apis.getAroundGame(
  //       state['ne']?.replace(/\(|\)/g, '')?.split(',')[0],
  //       state['ne']?.replace(/\(|\)/g, '')?.split(',')[1],
  //       state['sw']?.replace(/\(|\)/g, '')?.split(',')[0],
  //       state['sw']?.replace(/\(|\)/g, '')?.split(',')[1]
  //     )
  // );
  return { matchData, isLoading };
}
