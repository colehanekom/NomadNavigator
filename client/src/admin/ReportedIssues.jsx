import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/nomad-navigator-logo.png';

const ReportedIssues = () => {
  const reportedIssues = [
    {
      id: 1,
      user: 'alice_smith',
      type: 'Inappropriate Content',
      content: 'This post contains offensive language.',
      status: 'pending', 
    },
    {
      id: 2,
      user: 'bob_jones',
      type: 'Spam',
      content: 'This user is posting irrelevant content repeatedly.',
      status: 'resolved',
    },
    {
      id: 3,
      user: 'john_doe',
      type: 'Harassment',
      content: 'I am being harassed by this user in private messages.',
      status: 'pending',
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
        <h1 className="text-2xl font-bold mb-4">Reported Issues</h1>

        {/* Displaying Reported Issues as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportedIssues.map((issue) => (
            <div key={issue.id} className="bg-white p-4 rounded-lg shadow-md">
              <strong className="text-lg">{issue.type}</strong>
              <p className="text-gray-500">{issue.content}</p>
              <div className="mt-2">
                <strong>User:</strong> {issue.user} <br />
                <strong>Status:</strong> {issue.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportedIssues;
