import { useInfiniteQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { queryKeys } from '../../shared/constant/queryKeys';

export function useSearchList<T>(defaultValue: T) {
  const sort = useSelector((state: RootState) => state.search.sort);
  const subject = useSelector((state: RootState) => state.search.subject);

  const fetchPostList = async (pageParam: number) => {
    const res = await apis.getMainPostList(pageParam, subject, sort);
    const data = res.data.content;
    const last = res.data.last;
    return { data, last, nextPage: pageParam + 1 };
  };

  const {
    data: postList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([queryKeys.SEARCH, sort, subject], ({ pageParam = 0 }) => fetchPostList(pageParam), {
    getNextPageParam: (lastPage) => (!lastPage.last ? lastPage.nextPage : undefined),
  });

  return {
    postList,
    fetchNextPage,
    isFetchingNextPage,
  };
}
