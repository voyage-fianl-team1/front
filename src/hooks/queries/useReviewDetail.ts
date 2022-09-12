import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../shared/constant/queryKeys';
import { apis } from '../../apis';

export function useReviewDetail<T>(postId: number) {
  const { data: res, isLoading } = useQuery([queryKeys.REVIEWLIST], async () => await apis.getReviewList(postId));
  const reviewList = res?.data.reviewList;

  return { reviewList, isLoading };
}

export {};
