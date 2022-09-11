import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

/**
 * 현재 로그인한 유저에 대한 정보와 핸들링할 함수를 제공합니다
 */
function useCurrentUser() {
  const user = useSelector((state: RootState) => state.user);

  const logIn = () => {
    return 'logIn';
  };

  const logOut = () => {
    return 'logOut';
  };

  const getCurrentToken = useCallback(() => {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }, []);

  const updateNickname = () => {
    return 'updateNickname';
  };

  const updateProfileImage = () => {
    return 'updateProfileImage';
  };

  return {
    logIn,
    logOut,
    getCurrentToken,
    updateNickname,
    updateProfileImage,
    user,
  };
}

export default useCurrentUser;
