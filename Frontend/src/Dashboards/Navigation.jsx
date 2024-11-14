import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
          <div className="flex items-center space-x-4">
            <Link to={user?.role === 'student' ? '/student-dashboard' : '/teacher-dashboard'} 
                  className="font-bold text-xl">
              Dashboard
            </Link>
            {user?.role === 'student' ? (
              <div className="flex space-x-4">
                <Link to="/student-dashboard/courses" className="hover:text-gray-300">My Courses</Link>
                <Link to="/student-dashboard/assignments" className="hover:text-gray-300">Assignments</Link>
                <Link to="/student-dashboard/grades" className="hover:text-gray-300">Grades</Link>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/teacher-dashboard/courses" className="hover:text-gray-300">My Classes</Link>
                <Link to="/teacher-dashboard/students" className="hover:text-gray-300">Students</Link>
                <Link to="/teacher-dashboard/assignments" className="hover:text-gray-300">Assignments</Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.firstName || 'User'}</span>
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