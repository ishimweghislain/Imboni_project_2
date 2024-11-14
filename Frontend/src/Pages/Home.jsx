import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleCreateAccountClick = () => {
    navigate('/login', { state: { showCreateAccount: true } });  // Navigate and pass state
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/user2.png.jpg')" }}
    >
      <div className="flex flex-col items-start justify-center h-full text-left bg-black bg-opacity-50 px-4 animate-slide-in">
        <div className='home-content'>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            Come and Attain All Your Goals
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-3xl mb-8 leading-relaxed">
            Education is a good progress when well educated we believe that there is no goal that
            you can not achieve, and our aim is to interact both the teacher and the students easily
            whether at home or anywhere else.
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#f44336] text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300">
              Why Imboni?
            </button>
            <button 
              className="bg-[#f44336] text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
              onClick={handleCreateAccountClick}  // Add click handler here
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;