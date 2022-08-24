import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowMoreMatchesButton = () => {
  const navigate = useNavigate();
  return (
    <button className='text-[#4A4B4E] text-sm' onClick={() => navigate('/search')}>
      더보기 +
    </button>
  );
};

export default ShowMoreMatchesButton;
