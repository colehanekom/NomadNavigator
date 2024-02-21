import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import BottomBar from '../components/BottomBar';
import moment from 'moment';

const Notifications = () => {
  const location = useLocation();
  const announcementFromState = location.state?.announcement;

  // Use state to manage announcements
  const [announcements, setAnnouncements] = useState(announcementFromState ? [announcementFromState] : []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1065A1] via-[#0693F9] to-[#6f9fb8] p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow text-center">
        <Link to="/home">
          <button className="hidden sm:flex text-black font-semibold items-center mt-2 sm:mt-5 ml-2 sm:ml-6">
            <IoIosArrowBack className="mr-2" />
            Back
          </button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          Notifications
        </h1>

        {announcements.length === 0 ? (
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <p className="text-lg text-gray-800">No notifications</p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-bold mb-2">{announcement.title}</h2>
              <p className="text-gray-500">{announcement.content}</p>
              <p className="text-sm text-gray-400 mt-2">Posted on {moment(announcement.date).format('L')}</p>
            </div>
          ))
        )}
      </div>
      {/* BOTTOM BAR (Visible on Mobile) */}
      <BottomBar />
    </div>
  );
};

export default Notifications;
