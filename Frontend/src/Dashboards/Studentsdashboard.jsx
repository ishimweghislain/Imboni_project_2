import React, { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaBook, FaLaptopCode, FaSearch, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';


import Myassignments_view from '../Models/Myassignments_view';
import Mycourses_view from '../Models/Mycourses_view';
import Myresearches_view from '../Models/Myresearches_view';
import Viewmarks from '../Models/Viewmarks';


import { MyassignmentsPData } from '../Progress/MyassignmentsP';
import { MycoursesPData } from '../Progress/MycoursesP';
import { MyresearchesPData } from '../Progress/MyresearchesP';
import { ViewmarksPData } from '../Progress/ViewmarksP';

const Studentsdashboard = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showOnlyBox, setShowOnlyBox] = useState(false);
  const barChartRef = useRef(null);

  const chartData = {
    assignments: MyassignmentsPData,
    courses: MycoursesPData,
    researches: MyresearchesPData,
    marks: ViewmarksPData,
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setShowOnlyBox(false);
    setTimeout(() => {
      barChartRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleViewClick = (category) => {
    setActiveCategory(category);
    setShowOnlyBox(true); // Show only the clicked box
  };

  const handleBackToAll = () => {
    setActiveCategory(null);
    setShowOnlyBox(false);
  };

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="flex bg-gray-800 min-h-screen text-white">
      {/* Left Dashboard: Messages/Chats */}
      <div className="w-1/3 space-y-4 mr-4">
        <div className="bg-white p-4 rounded-lg text-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-[#f44336]">Messages/Chats</h2>
          <div className="space-y-4 overflow-y-auto h-80">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-bold text-gray-700">John Doe</p>
              <p className="text-gray-600">Hey! How’s the project going?</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-bold text-gray-700">Jane Smith</p>
              <p className="text-gray-600">Do you need any help with the assignment?</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-bold text-gray-700">Michael Brown</p>
              <p className="text-gray-600">Let’s discuss the research topic.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Dashboard */}
      <div className="w-2/3 space-y-6">
        {showOnlyBox ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-between w-full bg-[#f44336] text-center p-6 rounded-lg">
              <button
                className="flex items-center px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                onClick={handleBackToAll}
              >
                <FaArrowLeft className="mr-2" />
                Back to All
              </button>
              <h2 className="text-xl font-bold text-white">
                {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </h2>
            </div>
            {activeCategory === 'assignments' && <Myassignments_view />}
            {activeCategory === 'courses' && <Mycourses_view />}
            {activeCategory === 'researches' && <Myresearches_view />}
            {activeCategory === 'marks' && <Viewmarks />}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {/* Dashboard Items */}
              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                  activeCategory === 'assignments' ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                } ${animate ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
                onClick={() => handleCategoryClick('assignments')}
              >
                <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                  <FaBook className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg">My Assignments</h3>
                <button
                  className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick('assignments');
                  }}
                >
                  View All
                </button>
              </div>

              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                  activeCategory === 'courses' ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                } ${animate ? 'transform translate-x-0' : 'transform translate-x-full'}`}
                onClick={() => handleCategoryClick('courses')}
              >
                <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                  <FaLaptopCode className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg">My Courses</h3>
                <button
                  className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick('courses');
                  }}
                >
                  View All
                </button>
              </div>

              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                  activeCategory === 'researches' ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                } ${animate ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
                onClick={() => handleCategoryClick('researches')}
              >
                <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                  <FaSearch className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg">My Researches</h3>
                <button
                  className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick('researches');
                  }}
                >
                  View All
                </button>
              </div>

              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                  activeCategory === 'marks' ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                } ${animate ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
                onClick={() => handleCategoryClick('marks')}
              >
                <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                  <FaCheckCircle className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg">View Marks</h3>
                <button
                  className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick('marks');
                  }}
                >
                  View All
                </button>
              </div>
            </div>

           
            {activeCategory && chartData[activeCategory] && (
              <div ref={barChartRef} className="mt-6">
                <h3 className="text-center text-xl font-semibold">
                  {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Statistics
                </h3>
                <Bar data={chartData[activeCategory]} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Studentsdashboard;
