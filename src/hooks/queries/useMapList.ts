import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { apis } from '../../apis';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';

export function useMapList() {
  const position = useSelector((state: RootState) => state.persistReducered.map);
  const neLat = position['ne']?.replace(/\(|\)/g, '')?.split(',')[0];
  const ne = position['ne']?.replace(/\(|\)/g, '')?.split(',')[1];
  const neLng = ne?.replace(/ /g, '');
  const swLat = position['sw']?.replace(/\(|\)/g, '')?.split(',')[0];
  const sw = position['sw']?.replace(/\(|\)/g, '')?.split(',')[1];
  const {
    data: res,
    isLoading,
    refetch,
  } = useQuery([queryKeys.MAPLIST], async () => await apis.getAroundGame(neLat, neLng, swLat, swLng));
  const matchData = res?.data;
  const queryClient = useQueryClient();
  const swLng = sw?.replace(/ /g, '');

  useEffect(() => {
    refetch();
    queryClient.invalidateQueries([queryKeys.MAPLIST]);
  }, [position]);

  return { matchData, isLoading };
}
