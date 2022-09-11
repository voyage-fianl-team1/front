import { useCallback } from 'react';
import { SERVER_URL } from '../../apis';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

function useKakoAuth() {
  const handleKakaoLogin = useCallback(() => {
    window.location.href = `${SERVER_URL}/oauth2/authorization/kakao?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  }, []);

  return { handleKakaoLogin };
}

export default useKakoAuth;
