import { apis } from '../../apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';

function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation((id: number) => apis.postNotificationRead(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.NOTIFICATIONS]);
    },
  });
}

export default useReadNotification;
