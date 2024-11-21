import React from 'react';

const Teacher_notification = () => {
  return (
    <div className="bg-white p-4 rounded-lg text-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-[#f44336]">Notifications</h2>
      <div className="space-y-4 overflow-y-auto h-80">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-bold text-gray-700">Submission</p>
          <p className="text-gray-600">Students have submitted their assignment.</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-bold text-gray-700">Alert of Time</p>
          <p className="text-gray-600">You are down in one class L5sodb/Node.js?</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-bold text-gray-700">Jane Smith</p>
          <p className="text-gray-600">Thank you for the new resources!</p>
        </div>
      </div>
    </div>
  );
};

export default Teacher_notification;
