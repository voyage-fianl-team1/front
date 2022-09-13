import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { queryKeys } from '../../shared/constant/queryKeys';
import { Notification } from '../../typings';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { setNotifications } from '../../redux/features/notificationSlice';
import useCurrentUser from '../auth/useCurrentUser';

function useGetNotifications() {
  const dispatch = useDispatch();
  const {
    user: { isLogin },
  } = useCurrentUser();

  return useQuery<Notification[], AxiosError, Notification[]>(
    [queryKeys.NOTIFICATIONS],
    () => apis.getNotifications().then((res) => res.data),
    {
      onSuccess: (data) => {
        dispatch(setNotifications(data));
      },
      enabled: isLogin,
      staleTime: Infinity,
    }
  );
}

export default useGetNotifications;
