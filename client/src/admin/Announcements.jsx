import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/nomad-navigator-logo.png';

const Announcements = () => {
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState(null); // Declare newAnnouncement here
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const announcement = {
      title: announcementTitle,
      content: announcementContent,
    };

    // Simulate saving the announcement to a data source or dispatching it to a global state
    // For demonstration purposes, just set a success message
    setSubmissionMessage('Announcement has been sent successfully!');

    // Clear the form fields
    setAnnouncementTitle('');
    setAnnouncementContent('');

    // Set newAnnouncement
    setNewAnnouncement(announcement);
  };

  useEffect(() => {
    // Use the effect to navigate to the Notifications page when submissionMessage changes
    if (submissionMessage && newAnnouncement) {
      // Add a 3-second delay before navigating
      const delay = 3000; // 3 seconds in milliseconds

      const timeoutId = setTimeout(() => {
        // Navigate to the Notifications page and pass the announcement as state
        navigate('/notifications', { state: { announcement: newAnnouncement } });
      }, delay);

      // Clear the timeout to avoid navigation if the component unmounts before the delay
      return () => clearTimeout(timeoutId);
    }
  }, [submissionMessage, navigate, newAnnouncement]);

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
        <h1 className="text-2xl font-bold mb-4">Announcements</h1>

        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Post New Announcement</h2>
          {submissionMessage && (
            <div className="text-green-500 mb-4">{submissionMessage}</div>
          )}
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="announcementTitle" className="block text-gray-700 mb-1">
              Title:
            </label>
            <input
              type="text"
              id="announcementTitle"
              className="w-full border rounded-md p-2 mb-2"
              placeholder="Enter the title"
              value={announcementTitle}
              onChange={(e) => setAnnouncementTitle(e.target.value)}
            />

            <label htmlFor="announcementContent" className="block text-gray-700 mb-1">
              Content:
            </label>
            <textarea
              id="announcementContent"
              className="w-full border rounded-md p-2 mb-2"
              placeholder="Enter the content"
              rows="4"
              value={announcementContent}
              onChange={(e) => setAnnouncementContent(e.target.value)}
            />

            <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
              Post Announcement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
