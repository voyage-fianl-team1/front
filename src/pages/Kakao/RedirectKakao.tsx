import React, { useEffect } from 'react';
import useKakoAuth from '../../hooks/auth/useKakoAuth';
import LoadingSpinner from '../../components/Common/loadingSpinner';

const RedirectKakao = () => {
  const { handleKakaoLogin } = useKakoAuth();

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  return <LoadingSpinner />;
};

export default RedirectKakao;
