import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { subjectSearchShow } from '../redux/features/searchSlice';

const ShowMoreMatchesButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <button
      className='text-[#4A4B4E] text-sm'
      onClick={() => {
        navigate('/search');
        dispatch(subjectSearchShow({ subject: 'ALL' }));
      }}
    >
      더보기 +
    </button>
  );
};

export default ShowMoreMatchesButton;
