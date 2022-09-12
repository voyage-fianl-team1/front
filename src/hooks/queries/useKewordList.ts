import { useInfiniteQuery } from '@tanstack/react-query';
import { apis } from '../../apis';
import { queryKeys } from '../../shared/constant/queryKeys';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export function useKeword<T>(defaultValue: T) {
  const keyword_ = useSelector((state: RootState) => state.keyword);
  const keyword = keyword_['keyword'];

  const fetchsearchList = async (pageParam: number) => {
    const res = await apis.getSearchList(pageParam, keyword);
    const data = res.data.content;
    const last = res.data.last;
    return { data, last, nextPage: pageParam + 1 };
  };

  const {
    data: searchList,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery([queryKeys.KEYWORD, keyword], ({ pageParam = 0 }) => fetchsearchList(pageParam), {
    getNextPageParam: (lastPage) => (!lastPage.last ? lastPage.nextPage : undefined),
  });

  return { searchList, fetchNextPage, isFetchingNextPage };
}
