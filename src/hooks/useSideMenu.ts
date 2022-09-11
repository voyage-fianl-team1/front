import { useCallback } from 'react';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { useDispatch } from 'react-redux';

/**
 * 슬라이드 메뉴를 컨트롤 합니다
 */
function useSideMenu() {
  const dispatch = useDispatch();
  const toggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);

  return { toggleSideMenu };
}

export default useSideMenu;
