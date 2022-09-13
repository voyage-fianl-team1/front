import { useCallback, useMemo } from 'react';
import { subjectSearchShow } from '../redux/features/searchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { categories } from '../shared/constant/subjectTable';
import { toggleSelectShow } from '../redux/features/toggleSlice';

/**
 * 카테고르리를 선택하면 callback을 실행합니다(optional).
 * 카테고리 모달을 핸들링할 함수를 제공합니다
 * @param callback
 */
function useSelectCategory(callback?: any) {
  const dispatch = useDispatch();
  const { subject } = useSelector((state: RootState) => state.search);
  const currentCategoryName = useMemo(() => categories.find((c) => c.value === subject), [subject]);

  const handleSelect = useCallback(
    (subject: string) => {
      dispatch(subjectSearchShow({ subject }));
      callback && callback();
    },
    [callback]
  );
  const openSubjectModal = useCallback(() => {
    dispatch(toggleSelectShow());
  }, []);

  return { handleSelect, openSubjectModal, currentCategoryName };
}

export default useSelectCategory;
