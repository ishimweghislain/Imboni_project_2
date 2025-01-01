import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChalkboardTeacher, FaUsers, FaLaptopCode } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCreateAccountClick = () => {
    navigate('/login', { state: { showCreateAccount: true } });
  };

  const handleWhyImboniClick = () => {
    navigate('/goals');
  };

  const fadeInClass = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

  return (
    <div className="min-h-screen bg-fixed">
      <div
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/user2.png.jpg')" }}
      >
       
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

    
        <div className="relative z-10 h-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex flex-col lg:flex-row justify-between h-full py-16">
           
              <div className="flex flex-col justify-center lg:w-1/2 space-y-8">
                <div className={`max-w-3xl transition-all mt-0 md:mt-[100px] duration-1000 ease-out ${fadeInClass}`}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white  leading-tight">
                    Come and Attain
                    <span className="text-[#f44336]"> All Your Goals</span>
                  </h1>
                
                  <p className="text-gray-200 text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
                    Education is a good progress when well educated we believe that there is no goal that
                    you can not achieve, and our aim is to interact both the teacher and the students easily
                    whether at home or anywhere else.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <button
                      onClick={handleWhyImboniClick}
                      className="group relative overflow-hidden bg-[#f44336] text-white px-8 py-3 rounded-lg font-semibold transform transition duration-300 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Why Imboni?
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>

                    <button
                      onClick={handleCreateAccountClick}
                      className="group bg-white text-[#f44336] px-8 py-3 rounded-lg font-semibold transform transition duration-300 hover:scale-105"
                    >
                      <span className="flex items-center justify-center">
                        Get Started
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Feature Cards */}
              <div className="flex flex-col justify-start lg:w-1/2 space-y-6">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transform transition duration-300 hover:scale-105">
                  <FaChalkboardTeacher className="text-[#f44336] text-3xl mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">Expert Teachers</h3>
                  <p className="text-gray-300">Learn from experienced educators committed to your success.</p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transform transition duration-300 hover:scale-105">
                  <FaUsers className="text-[#f44336] text-3xl mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">Interactive Learning</h3>
                  <p className="text-gray-300">Engage with peers and teachers in a collaborative environment.</p>
                </div>

                {/* Hide this card on smaller screens */}
                <div className="hidden lg:block bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transform transition duration-300 hover:scale-105">
                  <FaLaptopCode className="text-[#f44336] text-3xl mb-4" />
                  <h3 className="text-white text-xl font-semibold mb-2">Modern Platform</h3>
                  <p className="text-gray-300">Access your courses anytime, anywhere with our digital platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
