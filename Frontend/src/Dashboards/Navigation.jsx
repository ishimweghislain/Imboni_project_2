import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaSearch } from 'react-icons/fa';

const Navigation = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
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
              ImBoni
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
    </nav>
  );
};

export default Navigation;