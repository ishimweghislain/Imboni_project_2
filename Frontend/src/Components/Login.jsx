import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm = ({ onToggle, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      role: 'student'
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    onLogin(userData);
    navigate('/student-dashboard');
  };

  return (
    <div className="flex h-screen items-center justify-center" style={{ marginTop: '80px' }}>
      <div className="form-container flex w-[800px] max-w-4xl rounded-lg shadow-md">
        <div className="relative w-1/2">
          <img src="/picture.jpeg" alt="Login" className="h-full w-full object-cover rounded-l-lg" />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-8 bg-[#f4f3f3]" >
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
                className="inline-block align-baseline font-bold text-md text-black hover:text-[#f44336]"
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(formData));
      setLoading(false);
      
      if (formData.role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/teacher-dashboard');
      }
    }, 8000); 
  };

  return (
    <div className="flex h-screen items-center justify-center" style={{ marginTop: '90px' }}>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="loader border-t-4 border-b-4 border-[#f44336] rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-[#f44336] font-bold ml-4">😊 Your Account is being created !...</p>
        </div>
      ) : (
        <div className="form-container flex w-[800px] max-w-4xl rounded-lg shadow-md">
          <div className="relative w-1/2">
            <img src="/picture.jpeg" alt="Create Account" className="h-full w-full object-cover rounded-l-lg" />
          </div>
          <div className="flex w-1/2 flex-col items-center justify-center p-8 bg-[#f4f3f3]">
            <b><h2 className="heading mb-4 text-2xl">Create Account</h2></b>
            <form onSubmit={handleSubmit} className="w-full">
              {/* Form fields */}
              <div className="mb-4 flex w-full">
                <div className="mr-2 w-1/2">
                  <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="First Name"
                  />
                </div>
                <div className="ml-2 w-1/2">
                  <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="********"
                />
              </div>
              <div className="mb-6 w-full">
                <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Select your role</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="flex w-full items-center justify-between">
                <button
                  className="bg-[#f44336] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-black hover:text-[#f44336]"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggle();
                  }}
                >
                  Already have an account? Sign In
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Login = () => {
  const location = useLocation();
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (location.state && location.state.showCreateAccount) {
      setShowCreateAccount(true);
    }
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const toggleForm = () => {
    setShowCreateAccount((prevState) => !prevState);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      {showCreateAccount ? (
        <CreateAccountForm onToggle={toggleForm} />
      ) : (
        <LoginForm onToggle={toggleForm} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Login;
