import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleSortShow, toggleSelectShow, toggleClear } from '../../redux/features/toggleSlice';
import { subjectSearchShowClear, sortSearchShowClear } from '../../redux/features/searchSlice';
import { categories } from '../../shared/constant/subjectTable';
import { sortCategories } from '../../shared/constant/sortTable';

export function useSearch<T>(defaultValue: T) {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.search.sort);
  const subject = useSelector((state: RootState) => state.search.subject);
  const categoryName = useMemo(() => categories.find((c) => c.value === subject), [subject]);
  const sortName = useMemo(() => sortCategories.find((c) => c.value === sort), [sort]);

  const clearAll = () => {
    useEffect(() => {
      return () => {
        dispatch(toggleClear());
        dispatch(sortSearchShowClear());
        dispatch(subjectSearchShowClear());
      };
    }, []);
  };

  const handleToggleSelect = useCallback(() => {
    dispatch(toggleSelectShow());
  }, []);

  const handleToggleSort = useCallback(() => {
    dispatch(toggleSortShow());
  }, []);

  return {
    handleToggleSelect,
    handleToggleSort,
    categoryName,
    sortName,
    clearAll,
  };
}
