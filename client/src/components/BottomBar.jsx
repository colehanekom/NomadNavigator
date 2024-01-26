import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiUser, BiGroup } from 'react-icons/bi';
import FriendsCard from './FriendsCard';
import ProfileCard from './ProfileCard';

const BottomBar = ({ user }) => {
  const location = useLocation();

  return (
    <div className='lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center'>
      <Link to='/friends' className={`cursor-pointer ${location.pathname === '/friends' ? 'text-blue-500' : ''}`}>
        <BiGroup size={24} />
      </Link>
      <Link to='/profile' className={`cursor-pointer ${location.pathname === '/profile' ? 'text-blue-500' : ''}`}>
        <BiUser size={24} />
      </Link>

      {location.pathname === '/friends' && <FriendsCard friends={user?.friends} />}
      {location.pathname === '/profile' && <ProfileCard user={user} />}
    </div>
  );
};

export default BottomBar;
