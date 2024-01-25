import React from 'react';

const Notifications= () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1065A1] via-[#0693F9] to-[#6f9fb8] p-8">
      <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>
        <div className="flex items-center justify-center">
          <p className="text-gray-600">No notifications yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
