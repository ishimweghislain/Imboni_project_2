import React from 'react';

const Student_notification = () => {
  return (
    <div className="bg-white p-4 rounded-lg text-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-[#f44336]">Notifications</h2>
      <div className="space-y-4 overflow-y-auto h-80">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-bold text-gray-700">Assignments</p>
          <p className="text-gray-600">Hey! Remember your database assignment has a deadline tomorrow?</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="font-bold text-gray-700">Results</p>
          <p className="text-gray-600">Your results for Data Structures are out! Go view them!</p>
        </div>
      </div>
    </div>
  );
};

export default Student_notification;
