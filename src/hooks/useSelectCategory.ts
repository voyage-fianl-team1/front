import { useCallback } from 'react';
import { subjectSearchShow } from '../redux/features/searchSlice';
import { useDispatch } from 'react-redux';

/**
 * 카테고르리를 선택하면 callback을 실행합니다.
 * @param callback
 */
function useSelectCategory(callback: any) {
  const dispatch = useDispatch();

  const handleSelect = useCallback(
    (subject: string) => {
      dispatch(subjectSearchShow({ subject }));
      callback && callback();
    },
    [callback]
  );

  return { handleSelect };
}

export default useSelectCategory;
