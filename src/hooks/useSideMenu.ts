import { useCallback } from 'react';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

/**
 * 슬라이드 메뉴를 컨트롤 합니다
 */
function useSideMenu() {
  const dispatch = useDispatch();
  const sideMenuShow = useSelector((state: RootState) => state.common.sideMenuShow);

  const toggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);

  return { toggleSideMenu, sideMenuShow };
}

export default useSideMenu;
