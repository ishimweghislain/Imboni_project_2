import React from 'react';

const Teacher_notification = () => {
  return (
    <div className="bg-white p-4 rounded-lg text-gray-800 h-[590px]">
      <h2 className="text-xl font-semibold mb-4 text-[#f44336]">Notifications</h2>
      <div className="space-y-4 overflow-y-scroll h-[480px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
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
