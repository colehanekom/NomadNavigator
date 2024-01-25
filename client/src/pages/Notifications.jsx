import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1065A1] via-[#0693F9] to-[#6f9fb8] p-8">
      <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow text-center">
      <Link to="/home">
              {/* Back button with arrow icon */}
              <button className="text-black font-semibold flex items-center mt-5 ml-6">
                <IoIosArrowBack className="mr-2" />
                Back
              </button>
          </Link>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>
        <div className="flex items-center justify-center">
          <p className="text-gray-600">No notifications yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

