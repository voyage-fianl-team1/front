import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { apis } from '../../apis';
import { useDispatch, useSelector } from 'react-redux';
import { mapAction } from '../../redux/features/mapSlice';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';

export function useMapList() {
  const dispatch = useDispatch();
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
  const swLng = sw?.replace(/ /g, '');

  const positionAround = (map: any) => {
    dispatch(
      mapAction({ sw: map.getBounds().getSouthWest().toString(), ne: map.getBounds().getNorthEast().toString() })
    );
  };

  useEffect(() => {
    refetch();
  }, [position]);

  return { matchData, isLoading, positionAround, refetch };
}
