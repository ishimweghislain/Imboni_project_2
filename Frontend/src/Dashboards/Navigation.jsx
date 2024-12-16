import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaSearch, FaBell, FaComment, FaUsers } from 'react-icons/fa';
import Logout from '../Dashboards/Logout'; // Import the modal component

const Navigation = ({ onToggle }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [activeToggle, setActiveToggle] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // To manage modal visibility

  const handleLogout = () => {
    setShowLogoutModal(true); // Show the logout confirmation modal
  };

  const handleLogoutConfirmation = () => {
    // Simulate the logout process
    localStorage.removeItem('user');
    navigate('/login'); // Navigate to login after 8 seconds
  };

  const handleToggle = (type) => {
    // If clicking the same icon, toggle off
    const newActiveToggle = activeToggle === type ? null : type;
    setActiveToggle(newActiveToggle);

    // Pass the toggle state to parent component
    onToggle(type);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <FaBookOpen className="text-[#f44336] text-2xl" />
            <Link
              to={user?.role === 'student' ? '/student-dashboard' : '/teacher-dashboard'}
              className="font-bold text-xl"
            >
              InTambi
            </Link>
          </div>

          <div className="flex-grow mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 rounded-md text-gray-800"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.lastName || 'User'}</span>

            <div className="flex items-center space-x-4">
              <div
                className='flex flex-col items-center cursor-pointer'
                onClick={() => handleToggle('notifications')}
              >
                <FaBell
                  className={`text-white hover:text-red-500 ${activeToggle === 'notifications' ? 'text-red-500' : ''}`}
                />
                <span className="absolute top-2 right-[306px] h-3 w-3 bg-green-500 border-2 border-gray-800 rounded-full" />
                <h1>Notification</h1>
              </div>

              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleToggle('chat')}
              >
                <FaComment
                  className={`text-white hover:text-red-500 ${activeToggle === 'chat' ? 'text-red-500' : ''}`}
                />
                <span className="absolute top-2 right-[230px] h-3 w-3 bg-red-500 border-2 border-gray-800 rounded-full" />
                <h1>Chats</h1>
              </div>

              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleToggle('people')}
              >
                <FaUsers
                  className={`text-white hover:text-red-500 ${activeToggle === 'people' ? 'text-red-500' : ''}`}
                />
                <h1>Users</h1>
              </div>
            </div>

            <div className="relative">
              <img
                src="/mama.png"
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-gray-800 rounded-full" />
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Show the Logout Modal if `showLogoutModal` is true */}
      {showLogoutModal && (
        <Logout
          onClose={() => setShowLogoutModal(false)} // Close the modal if No is clicked
          onConfirm={handleLogoutConfirmation} // Proceed with logout
        />
      )}
    </nav>
  );
};

export default Navigation;
