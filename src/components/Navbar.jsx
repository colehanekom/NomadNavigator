import React from 'react';
import Logo from '../assets/icon-logo.png';

const Navbar = () => {
  return (
    <div className='w-full min-h-[50px] flex justify-between items-center absolute z-10 text-white bg-transparent'>
      <div>
        <img src={Logo} alt="Logo Image" style={{ width: '80px' }} />
      </div>
      <ul className='sm:flex px-4'>
        <li>
          <a href='#signup'>Sign Up</a>
        </li>
        <li style={{ marginLeft: '10px' }}>
          <a href='#signin'>Sign In</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
