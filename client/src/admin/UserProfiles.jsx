import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/nomad-navigator-logo.png';

const UserProfiles = () => {
  const userProfiles = [
    {
      id: 1,
      username: 'john_doe',
      status: 'active', 
    },
    {
      id: 2,
      username: 'alice_smith',
      status: 'suspended',
    },
    {
      id: 3,
      username: 'bob_jones',
      status: 'active',
    },
  ];

  const menuItems = [
    { label: 'Dashboard', link: '/admin-dashboard' },
    { label: 'Content Management', link: '/content-management' },
    { label: 'User Profiles', link: '/user-profiles' },
    { label: 'Reported Issues', link: '/reported-issues' },
    { label: 'Announcements', link: '/announcements' },
    { label: 'Sign Out', link: '/admin' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <img src={Logo} alt="Logo" className="w-32 h-32 mx-auto mb-4 rounded-full" />
        </div>
        <div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-8">
                <Link to={item.link} className="flex items-center text-white hover:text-gray-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">User Profiles</h1>

        {/* Displaying User Profiles as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProfiles.map((profile) => (
            <div key={profile.id} className="bg-white p-4 rounded-lg shadow-md">
              <strong className="text-lg">@{profile.username}</strong>
              <div className="mt-2">
                <strong>Status:</strong> {profile.status}
                <br />
                {profile.status !== 'banned' && (
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => console.log(`Suspend user ${profile.username}`)}
                  >
                    Suspend
                  </button>
                )}
                {profile.status !== 'banned' && (
                  <button
                    className="text-red-500 hover:underline ml-2"
                    onClick={() => console.log(`Ban user ${profile.username}`)}
                  >
                    Ban
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfiles;
