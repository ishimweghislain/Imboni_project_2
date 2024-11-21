import React, { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaBook, FaLaptopCode, FaSearch, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

import Teacher_notification from '../Communication/Teacher_notification';
import Teacher_chat from '../Communication/Teacher_chat';
import Teacher_people from '../Communication/Student_people';

import Myclasses_view from '../Models/Myclasses_view';
import Passedassignments_view from '../Models/Passedassignments_view';
import Sharecourses_view from '../Models/Sharecourses_view';
import Newassignment from '../Models/Newassignment';

// Progress Data
import { MyclassesPData } from '../Progress/MyclassesP';
import { PassedassignmentsPData } from '../Progress/PassedAssignmentsP';
import { SharecoursesPData } from '../Progress/SharecoursesP';
import { NewassignmentPData } from '../Progress/NewassignmentP';

const Teachersdashboard = ({ activeToggle }) => {
  // Set the default state to 'notifications' so that it's visible when the page starts
  const [activeCategory, setActiveCategory] = useState(null);
  const [showOnlyBox, setShowOnlyBox] = useState(false);
  const barChartRef = useRef(null);

  // Set notifications as the default active toggle if no toggle is provided
  const effectiveActiveToggle = activeToggle || 'notifications';

  const chartData = {
    classes: MyclassesPData,
    passedassignments: PassedassignmentsPData,
    sharecourses: SharecoursesPData,
    newassignment: NewassignmentPData,
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
    setShowOnlyBox(true);
  };

  const handleBackToAll = () => {
    setActiveCategory(null);
    setShowOnlyBox(false);
  };

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const renderLeftSidebar = () => {
    switch (effectiveActiveToggle) {
      case 'notifications':
        return <Teacher_notification />;
      case 'chat':
        return <Teacher_chat />;
      case 'people':
        return <Teacher_people />;
      default:
        return <Teacher_notification />; 
    }
  };

  return (
    <div className="flex bg-gray-800 min-h-screen text-white">

      <div className="w-1/3 space-y-4 mr-4">
        {renderLeftSidebar()}
      </div>

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
            {activeCategory === 'classes' && <Myclasses_view />}
            {activeCategory === 'passedassignments' && <Passedassignments_view />}
            {activeCategory === 'sharecourses' && <Sharecourses_view />}
            {activeCategory === 'newassignment' && <Newassignment />}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(chartData).map((key) => (
                <div
                  key={key}
                  className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                    activeCategory === key ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                  }`}
                  onClick={() => handleCategoryClick(key)}
                >
                  <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                    {key === 'classes' && <FaBook className="text-3xl" />}
                    {key === 'passedassignments' && <FaLaptopCode className="text-3xl" />}
                    {key === 'sharecourses' && <FaSearch className="text-3xl" />}
                    {key === 'newassignment' && <FaCheckCircle className="text-3xl" />}
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

export default Teachersdashboard;