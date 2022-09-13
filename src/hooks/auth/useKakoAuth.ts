import { useCallback } from 'react';
import { SERVER_URL } from '../../apis';
import { useLocation } from 'react-router-dom';
import useLogin from './useLogin';
import usePush from '../usePush';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

function useKakoAuth() {
  const location = useLocation();
  const { setTokens, fetchUserInfo } = useLogin();
  const { push } = usePush();

  const handleRouteKakaoLoginPage = useCallback(async () => {
    window.location.href = `${SERVER_URL}/oauth2/authorization/kakao?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  }, []);

  const handleKakaoLogin = useCallback(async () => {
    const parsed = location.search.split(/(\w+=[\w.-]+)/g);
    const accessToken = parsed[1].split('=')[1];
    const refreshToken = parsed[3].split('=')[1];
    const isFirst = parsed[5].split('=')[1];

    setTokens(accessToken, refreshToken);
    await fetchUserInfo();

    if (isFirst === 'true') {
      alert('환영합니다! 최초 닉네임을 변경해주세요!');
      return push('/profile/edit?firstKakaoLogin=true');
    }
    return push('/');
  }, []);

  return { handleRouteKakaoLoginPage, handleKakaoLogin };
}

export default useKakoAuth;
