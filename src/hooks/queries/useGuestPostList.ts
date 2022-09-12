import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { PostDataProps } from '../../typings';
import { apis } from '../../apis';

export function useGetPostList<T>(postId: number) {
  const { data: res, isLoading } = useQuery([queryKeys.GUESTLIST, postId], () => apis.getforGuestPostList(postId));
  const guestData: PostDataProps = res?.data;

  return { guestData, isLoading };
}
