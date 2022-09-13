import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleSortShow } from '../redux/features/toggleSlice';
import { sortSearchShow } from '../redux/features/searchSlice';

function useSelectSort() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState<string>('createAt');
  const sortShow = useSelector((state: RootState) => state.toggle.sortShow);

  const handleToggleSort = useCallback(() => {
    dispatch(toggleSortShow());
  }, []);

  const handleSelectData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.focus();
    setSort(e.currentTarget.value);
  };

  const handleSendData = () => {
    dispatch(sortSearchShow({ sort: sort }));
    dispatch(toggleSortShow());
  };

  return { sortShow, handleToggleSort, handleSelectData, handleSendData };
}

export default useSelectSort;
