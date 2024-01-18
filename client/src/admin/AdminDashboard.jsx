import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/nomad-navigator-logo.png';

const AdminDashboard = () => {
  const menuItems = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Content Management', link: '/content-management' },
    { label: 'User Profiles', link: '/user-profiles' },
    { label: 'Reported Issues', link: '/reported-issues' },
    { label: 'Announcements', link: '/announcements' },
    { label: 'Sign Out', link: '/sign-out' },
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
      </div>
    </div>
  );
};

export default AdminDashboard;
