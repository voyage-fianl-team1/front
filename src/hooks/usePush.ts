import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeSideMenu } from '../redux/features/commonSlice';

/**
 * navigate 대신 custom push() 를 사용하여, 페이지 이동간에 필요한 동작을 통일시킵니다
 */
function usePush() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const push = useCallback((path: string) => {
    dispatch(closeSideMenu());
    navigate(path);
  }, []);

  return { push };
}

export default usePush;
