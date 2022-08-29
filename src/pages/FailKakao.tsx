import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const FailKakao = () => {
  const location = useLocation();
  const email = useMemo(() => location.search.split(/(\w+=[\w.-@]+)/g)[1].split('=')[1], [location]);
  return <div>{email} 이미 가입된 이메일입니다</div>;
};

export default FailKakao;
