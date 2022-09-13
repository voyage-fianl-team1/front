import { apis } from '../../apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';

function useRemovePost() {
  const queryClient = useQueryClient();

  return useMutation((postId: number) => apis.deletePost(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.USER_OWN_POSTS]);
    },
  });
}

export default useRemovePost;
