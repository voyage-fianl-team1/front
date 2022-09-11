import { AxiosError } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../../apis';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useWritePost from '../../hooks/useWritePost';

const WriteFloatingButton = () => {
  const { handleRewriteCheck } = useWritePost();

  return (
    <button className='floating-button' onClick={handleRewriteCheck}>
      <img src='/assets/images/write.svg' alt='write' />
    </button>
  );
};

export default WriteFloatingButton;
