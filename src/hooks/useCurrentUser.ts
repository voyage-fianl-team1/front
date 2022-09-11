import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

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
