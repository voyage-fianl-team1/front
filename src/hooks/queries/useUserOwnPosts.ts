import { useQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { queryKeys } from '../../shared/constant/queryKeys';
import { UserPostType } from '../../typings';
import { AxiosResponse } from 'axios';

interface ResponseType {
  mypostList: UserPostType[];
}

function useUserOwnPosts() {
  return useQuery([queryKeys.USER_OWN_POSTS], apis.getUserPosts, {
    select: (res: AxiosResponse<ResponseType>) => res.data.mypostList,
    staleTime: Infinity,
  });
}

export default useUserOwnPosts;
