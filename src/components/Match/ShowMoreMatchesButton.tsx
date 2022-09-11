import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSelectCategory from '../../hooks/useSelectCategory';

const ShowMoreMatchesButton = () => {
  const navigate = useNavigate();
  const { handleSelect } = useSelectCategory(() => {
    navigate('/search');
  });
  return (
    <button className='text-[#4A4B4E] text-sm' onClick={() => handleSelect('ALL')}>
      더보기 +
    </button>
  );
};

export default ShowMoreMatchesButton;
