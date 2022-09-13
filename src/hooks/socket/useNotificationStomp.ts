import { useStomp } from './useStomp';
import { SERVER_STOMP_URL } from '../../apis';
import { Notification } from '../../typings';
import useCurrentUser from '../auth/useCurrentUser';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { append } from '../../redux/features/notificationSlice';

export function useNotificationStomp() {
  const {
    user: { id: userId },
  } = useCurrentUser();
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notification.notifications);
  const { subscribe, isConnected, unsubscribe } = useStomp(SERVER_STOMP_URL);

  useEffect(() => {
    if (!userId || !isConnected) return;
    subscribe<Notification>(`/room/user/${userId}`, (body) => {
      dispatch(append(body));
    });
  }, [userId, isConnected]);

  const unsubscribeNotification = useCallback(() => {
    unsubscribe(`/room/user/${userId}`);
  }, []);

  return {
    notifications,
    unsubscribeNotification,
  };
}
