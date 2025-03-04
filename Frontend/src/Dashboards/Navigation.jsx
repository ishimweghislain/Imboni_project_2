import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaSearch, FaBell, FaComment, FaUsers } from 'react-icons/fa';
import Logout from '../Dashboards/Logout';
import ProfileModify from '../Communication/ProfileModify';
import axios from 'axios'; // Import axios

const Navigation = ({ onToggle }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [activeToggle, setActiveToggle] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const backendUrl = 'http://localhost:5000'; // Replace with your backend URL
    const defaultProfilePicture = '/avatar-placeholder.png'; // Or your default icon path

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirmation = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleToggle = (type) => {
        setActiveToggle(activeToggle === type ? null : type);
        onToggle(type);
    };

    useEffect(() => {
        const fetchUserProfilePicture = async () => {
            if (user?.id) { // Assuming you have a user ID in your user object
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${backendUrl}/api/users/profile/${user.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    setUserProfilePicture(response.data?.profilePic || defaultProfilePicture); // Assuming the backend returns the profile picture URL or null
                } catch (error) {
                    console.error('Error fetching user profile picture:', error);
                    setUserProfilePicture(defaultProfilePicture); // Set to default on error
                }
            }
        };

        fetchUserProfilePicture();
    }, [user]);

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
                                className="w-full py-2 px-4 rounded-md text-red-800"
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 " />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-gray-300">Welcome, {user?.lastName || 'User'}</span>

                        <div className="flex items-center space-x-4">
                            <div
                                className='flex flex-col items-center cursor-pointer'
                                onClick={() => handleToggle('notifications')}
                            >
                                <FaBell className={`text-white hover:text-red-500 ${activeToggle === 'notifications' ? 'text-red-500' : ''}`} />
                                <span className="absolute top-2 right-[306px] h-3 w-3 bg-green-500 border-2 border-gray-800 rounded-full" />
                                <h1>Notification</h1>
                            </div>

                            <div
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => handleToggle('chat')}
                            >
                                <FaComment className={`text-white hover:text-red-500 ${activeToggle === 'chat' ? 'text-red-500' : ''}`} />
                                <span className="absolute top-2 right-[230px] h-3 w-3 bg-red-500 border-2 border-gray-800 rounded-full" />
                                <h1>Chats</h1>
                            </div>

                            <div
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => handleToggle('people')}
                            >
                                <FaUsers className={`text-white hover:text-red-500 ${activeToggle === 'people' ? 'text-red-500' : ''}`} />
                                <h1>Users</h1>
                            </div>
                        </div>

                        <div className="relative cursor-pointer" onClick={() => setShowProfileModal(true)}>
                            <img
                                src={userProfilePicture || defaultProfilePicture}
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

            {showLogoutModal && (
                <Logout
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={handleLogoutConfirmation}
                />
            )}

            {showProfileModal && (
                <ProfileModify onClose={() => setShowProfileModal(false)} />
            )}
        </nav>
    );
};

export default Navigation;