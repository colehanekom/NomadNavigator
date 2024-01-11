import React from 'react';
import Logo from '../assets/icon-logo.png';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className='w-full min-h-[50px] flex justify-between items-center absolute z-10 text-white bg-transparent'>
    <div className='sm:flex'>
      <img src={Logo} alt="Logo Image" className='w-[80px] lg:ml-8'/>
    </div>

    <ul className='flex px-10 space-x-4'>
    <Link to = '/signin'>Sign In</Link>
    <Link to = '/signup'>Sign Up</Link>
    </ul>
  </div>
  )
}

export default Navbar;