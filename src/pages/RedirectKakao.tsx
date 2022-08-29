import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apis } from '../apis';
import { login } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';

const RedirectKakao = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKakaoLogin = useCallback(async () => {
    const parsed = location.search.split(/(\w+=[\w.-]+)/g);
    const accessToken = parsed[1].split('=')[1];
    const refreshToken = parsed[3].split('=')[1];
    const isFirst = parsed[5].split('=')[1];

    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', refreshToken);

    const userInfo = await apis.getUser().then((res) => res.data);
    const { id, draw, lose, win, nickname, profileImgUrl } = userInfo;
    dispatch(login({ isLogin: true, id, draw, lose, win, nickname, profileImgUrl }));

    if (isFirst === 'true') {
      alert('환영합니다! 최초 닉네임을 변경해주세요!');
      return navigate('/profile/edit?firstKakaoLogin=true');
    }
    return navigate('/');
  }, []);

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  return (
    <div>
      <h1 className='text-center'>환영합니다!</h1>
    </div>
  );
};

export default RedirectKakao;
