import React from 'react';

const Header = () => {
  return (
    <header className='flex justify-end pt-2 pb-4'>
      <ul className='flex gap-4'>
        <li>
          <img src='/assets/images/alert.svg' alt='alert-icon' />
        </li>
        <li>
          <img src='/assets/images/hamberger.svg' alt='menu-icon' />
        </li>
      </ul>
    </header>
  );
};

export default Header;
