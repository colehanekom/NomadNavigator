import React from 'react';
import { ProfileCard } from '../components';

const ProfilePage = ({ user }) => {
  return (
    <div>
      <h1>Profile Page</h1>
      <ProfileCard user={user} />
    </div>
  );
};

export default ProfilePage;
