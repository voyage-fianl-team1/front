import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apis } from '../apis';
import { Notification } from '../typings';
import { setNotifications } from '../redux/features/notificationSlice';
import useCurrentUser from './auth/useCurrentUser';
import { useCallback, useMemo } from 'react';
import { toggleNotificationShow } from '../redux/features/toggleSlice';
import useGetNotifications from './queries/useGetNotifications';

function useNotification() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const notifications = useSelector((state: RootState) => state.notification.notifications);
  useGetNotifications();

  const mutation = useMutation((id: number) => apis.postNotificationRead(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });

  const toggleNotificationMenu = useCallback(() => {
    dispatch(toggleNotificationShow());
  }, []);

  const isNotificationExist = useMemo(() => {
    if (notifications.length > 0) {
      const res = notifications.some((v, idx) => !v.isread);
      return res;
    }
    return false;
  }, [notifications]);

  return { notifications, mutate: mutation.mutate, toggleNotificationMenu, isNotificationExist };
}

export default useNotification;
