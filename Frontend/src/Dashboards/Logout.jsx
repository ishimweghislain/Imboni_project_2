import React, { useState } from 'react';

const Logout = ({ onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      onConfirm(); 
    }, 3000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Are you sure you want to log out?</h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin border-t-4 border-b-4 border-red-500 w-8 h-8 rounded-full"></div>
          </div>
        ) : (
          <div className="flex justify-between">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
