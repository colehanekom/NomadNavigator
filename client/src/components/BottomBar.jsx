import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiUser, BiGroup } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import FriendsCard from './FriendsCard';
import ProfileCard from './ProfileCard';

const BottomBar = ({ user }) => {
  const location = useLocation();

  return (
    <div className='lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center'>
      {/* Home Icon */}
      <Link to='/home' className={`cursor-pointer ${location.pathname === '/home' ? 'text-blue-500' : ''}`}>
        <AiOutlineHome size={24} />
      </Link>

      {/* Friends Icon */}
      <Link to='/friends' className={`cursor-pointer ${location.pathname === '/friends' ? 'text-blue-500' : ''}`}>
        <BiGroup size={24} />
      </Link>

      {/* Profile Icon */}
      <Link to='/profile' className={`cursor-pointer ${location.pathname === '/profile' ? 'text-blue-500' : ''}`}>
        <BiUser size={24} />
      </Link>
    </div>
  );
};

export default BottomBar;
