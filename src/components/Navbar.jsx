import React from 'react';
import Logo from '../assets/icon-logo.png';

const Navbar = () => {
  return (
    <div className='w-full min-h-[50px] flex justify-between items-center absolute z-10 text-white bg-black'>
      <div>
        <img src={Logo} alt="Logo Image" style={{ width: '80px' }} />
      </div>
    </div>
  );
};

export default Navbar;
