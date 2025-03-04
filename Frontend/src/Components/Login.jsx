import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileModal from '../Profile/ProfileModel'; // Changed import to match your comment

const LoginForm = ({ onToggle, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      onLogin(user);
      navigate(user.role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 mt-8">
      <div className={`form-container flex ${isMobile ? 'w-full' : 'w-[800px]'} max-w-4xl rounded-lg shadow-md`}>
        {!isMobile && (
          <div className="relative w-1/2">
            <img src="/picture.jpeg" alt="Login" className="h-full w-full object-cover rounded-l-lg" />
          </div>
        )}
        <div className={`flex flex-col items-center justify-center p-8 bg-[#f4f3f3] ${isMobile ? 'w-full rounded-lg' : 'w-1/2 rounded-r-lg'}`}>
          <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
                required
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <button
                className="bg-[#f44336] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm md:text-md text-black hover:text-[#f44336]"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onToggle();
                }}
              >
                Create Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CreateAccountForm = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log('Registration successful:', response.data);
      setShowProfileModal(true);
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      alert('Error registering user: ' + (error.response?.data?.message || 'Please check your details and try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleProfileComplete = () => {
    navigate(formData.role === 'student' ? '/student-dashboard' : '/teacher-dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 mt-8">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="loader border-t-4 border-b-4 border-[#f44336] rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <div className={`form-container flex ${isMobile ? 'w-full' : 'w-[800px]'} max-w-4xl rounded-lg shadow-md`}>
          {!isMobile && (
            <div className="relative w-1/2">
              <img src="/picture.jpeg" alt="Create Account" className="h-full w-full object-cover rounded-l-lg" />
            </div>
          )}
          <div className={`flex flex-col items-center justify-center p-8 bg-[#f4f3f3] ${isMobile ? 'w-full rounded-lg' : 'w-1/2 rounded-r-lg'}`}>
            <h2 className="heading mb-4 text-2xl font-bold">Create Account</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4 flex w-full flex-col md:flex-row">
                <div className={`${isMobile ? 'mb-4' : 'mr-2'} w-full md:w-1/2`}>
                  <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className={`${isMobile ? '' : 'ml-2'} w-full md:w-1/2`}>
                  <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="********"
                  required
                />
              </div>
              <div className="mb-6 w-full">
                <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Select your role</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="flex w-full items-center justify-between flex-col md:flex-row gap-4 md:gap-0">
                <button
                  className="bg-[#f44336] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
                  type="submit"
                >
                  Sign Up
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm md:text-md text-black hover:text-[#f44336]"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggle();
                  }}
                >
                  Do you have an account? Login
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {showProfileModal && 
        <ProfileModal
          userInfo={formData}
          onComplete={handleProfileComplete}
        />
      }
    </div>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const toggleForm = () => setIsLogin(!isLogin);
  const handleLogin = (userData) => setUser(userData);

  return (
    <div>
      {isLogin ? (
        <LoginForm onToggle={toggleForm} onLogin={handleLogin} />
      ) : (
        <CreateAccountForm onToggle={toggleForm} />
      )}
    </div>
  );
};

export default Login;