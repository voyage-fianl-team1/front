import { AxiosError } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../apis';

const WriteFloatingButton = () => {
  const navigate = useNavigate();
  const handleRewriteCheck = async () => {
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
