import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/nomad-navigator-logo.png';

const AdminDashboard = () => {
  const totalUsers = 10;
  const totalPlaces = 5;

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
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>

        {/* Total Users and Places */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">Total Users</h2>
            <p className="text-3xl font-bold text-blue-500">{totalUsers}</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2">Total Places</h2>
            <p className="text-3xl font-bold text-green-500">{totalPlaces}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
