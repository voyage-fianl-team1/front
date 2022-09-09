import { AxiosError } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../../apis';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const WriteFloatingButton = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: RootState) => state.user);

  const handleRewriteCheck = async () => {
    if (!isLogin) {
      alert('로그인 후 함께해주세요!');
      return navigate('/splash');
    }
    try {
      await apis.getRewrite();
      navigate('/new');
    } catch (err) {
      if (err && err instanceof AxiosError) {
        alert(err.response?.data);
        navigate('/');
      }
    }
  };
  return (
    <button className='floating-button' onClick={handleRewriteCheck}>
      <img src='/assets/images/write.svg' alt='write' />
    </button>
  );
};

export default WriteFloatingButton;
