import React from 'react';
import { Link } from 'react-router-dom';

const WriteFloatingButton = () => {
  return (
    <Link to='/new'>
      <div className='floating-button'>
        <img src='/assets/images/write.svg' alt='write' />
      </div>
    </Link>
  );
};

export default WriteFloatingButton;
