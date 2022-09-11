import { useCallback } from 'react';
import { logout } from '../../redux/features/userSlice';
import { toggleSideMenuShow } from '../../redux/features/commonSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function useLogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = useCallback(() => {
    removeTokens();
    dispatch(logout());
    dispatch(toggleSideMenuShow());
    alert('로그아웃 되었습니다');
    navigate('/');
  }, []);

  const removeTokens = useCallback(() => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
  }, []);

  return { handleLogOut };
}

export default useLogOut;
