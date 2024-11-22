import React, { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaBook, FaLaptopCode, FaSearch, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

import Student_notification from '../Communication/Student_notification';
import Student_chat from '../Communication/Student_chat';
import Student_people from '../Communication/Student_people';

import Myassignments_view from '../Models/Myassignments_view';
import Mycourses_view from '../Models/Mycourses_view';
import Myresearches_view from '../Models/Myresearches_view';
import Viewmarks from '../Models/Viewmarks';

import { MyassignmentsPData } from '../Progress/MyassignmentsP';
import { MycoursesPData } from '../Progress/MycoursesP';
import { MyresearchesPData } from '../Progress/MyresearchesP';
import { ViewmarksPData } from '../Progress/ViewmarksP';

const Studentsdashboard = ({ activeToggle }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showOnlyBox, setShowOnlyBox] = useState(false);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateBoxes, setAnimateBoxes] = useState(false);
  const barChartRef = useRef(null);

  const effectiveActiveToggle = activeToggle || 'notifications';

  const chartData = {
    assignments: MyassignmentsPData,
    courses: MycoursesPData,
    researches: MyresearchesPData,
    marks: ViewmarksPData,
  };

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateLeft(true), 100);
    setTimeout(() => setAnimateBoxes(true), 500);
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setShowOnlyBox(false);
    setTimeout(() => {
      barChartRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleViewClick = (category) => {
    setActiveCategory(category);
    setShowOnlyBox(true);
  };

  const handleBackToAll = () => {
    setActiveCategory(null);
    setShowOnlyBox(false);
  };

  const renderLeftSidebar = () => {
    switch (effectiveActiveToggle) {
      case 'notifications':
        return <Student_notification />;
      case 'chat':
        return <Student_chat />;
      case 'people':
        return <Student_people />;
      default:
        return <Student_notification />;
    }
  };

  return (
    <div className="flex bg-gray-800 min-h-screen text-white">
      {/* Left Dashboard */}
      <div
        className={`w-1/3 space-y-4 mr-4 transform transition-transform duration-2000 ${
          animateLeft ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {renderLeftSidebar()}
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
                {activeCategory?.charAt(0).toUpperCase() + activeCategory?.slice(1)}
              </h2>
            </div>
            {activeCategory === 'assignments' && <Myassignments_view />}
            {activeCategory === 'courses' && <Mycourses_view />}
            {activeCategory === 'researches' && <Myresearches_view />}
            {activeCategory === 'marks' && <Viewmarks />}
          </div>
        ) : (
          <>
            {/* Boxes */}
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(chartData).map((key, index) => (
                <div
                  key={key}
                  className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transform transition-transform duration-1000 ${
                    animateBoxes ? `translate-x-0 delay-${index * 200}` : 'translate-x-full'
                  } ${activeCategory === key ? 'bg-[#ff7961]' : 'bg-[#f44336]'}`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                  }}
                  onClick={() => handleCategoryClick(key)}
                >
                  <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                    {key === 'assignments' && <FaBook className="text-3xl" />}
                    {key === 'courses' && <FaLaptopCode className="text-3xl" />}
                    {key === 'researches' && <FaSearch className="text-3xl" />}
                    {key === 'marks' && <FaCheckCircle className="text-3xl" />}
                  </div>
                  <h3 className="font-semibold text-lg">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                  </h3>
                  <button
                    className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewClick(key);
                    }}
                  >
                    View All
                  </button>
                </div>
              ))}
            </div>

            {/* Chart */}
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
