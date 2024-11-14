// Login.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LoginForm = ({ onToggle }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="form-container flex w-[800px] max-w-4xl rounded-lg shadow-md">
        <div className="relative w-1/2">
          <img
            src="/picture.jpeg"
            alt="Login"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-8 bg-[#f4f3f3]">
          <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              className="bg-[#f44336] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
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
        </div>
      </div>
    </div>
  );
};

const CreateAccountForm = ({ onToggle }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="form-container flex w-[800px] max-w-4xl rounded-lg shadow-md">
        <div className="relative w-1/2">
          <img
            src="/picture.jpeg"
            alt="Create Account"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-8 bg-[#f4f3f3]">
          <b><h2 className="heading">Create Account</h2></b>
          <div className="mb-4 flex w-full">
            <div className="mr-2 w-1/2">
              <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="First Name"
              />
            </div>
            <div className="ml-2 w-1/2">
              <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
              Select your role
            </label>
            <select
              id="role"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
            >
              <option>Student</option>
              <option>Teacher</option>
            </select>
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              className="bg-[#f44336] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
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
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const location = useLocation();  // Use location to get state
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  useEffect(() => {
    if (location.state && location.state.showCreateAccount) {
      setShowCreateAccount(true);  // Initialize state based on location
    }
  }, [location]);

  const toggleForm = () => {
    setShowCreateAccount((prevState) => !prevState);
  };

  return (
    <div>
      {showCreateAccount ? (
        <CreateAccountForm onToggle={toggleForm} />
      ) : (
        <LoginForm onToggle={toggleForm} />
      )}
    </div>
  );
};

export default Login;
