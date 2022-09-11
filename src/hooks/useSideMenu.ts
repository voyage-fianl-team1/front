import { useCallback } from 'react';
import { toggleSideMenuShow } from '../redux/features/commonSlice';
import { useDispatch } from 'react-redux';

function useSideMenu() {
  const dispatch = useDispatch();
  const toggleSideMenu = useCallback(() => {
    dispatch(toggleSideMenuShow());
  }, []);

  return { toggleSideMenu };
}

export default useSideMenu;
