import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/nomad-navigator-logo.png';

const ContentManagement = () => {
  const travelExperiences = [
    {
      id: 1,
      user: 'john_doe',
      content: 'Amazing trip to Paris! 🗼 #TravelGoals',
      status: 'pending', 
    },
    {
      id: 2,
      user: 'alice_smith',
      content: 'Exploring the beaches of Thailand. 🌴 #Wanderlust',
      status: 'approved',
    },
    {
      id: 3,
      user: 'bob_jones',
      content: 'Moderation needed for inappropriate content. 🚫',
      status: 'moderation',
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
        <h1 className="text-2xl font-bold mb-4">Content Management</h1>

        {/* Displaying Travel Experiences as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {travelExperiences.map((experience) => (
            <div key={experience.id} className="bg-white p-4 rounded-lg shadow-md">
              <strong className="text-lg">{experience.user}</strong>
              <p className="text-gray-500">{experience.content}</p>
              <div className="mt-2">
                <strong>Status:</strong> {experience.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
