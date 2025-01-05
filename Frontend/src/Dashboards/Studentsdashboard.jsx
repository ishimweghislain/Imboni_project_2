import React, { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaBook, FaLaptopCode, FaSearch, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

import Student_notification from '../Communication/Student_notification';
import Student_chat from '../Communication/Student_chat';
import Student_people from '../Communication/Student_people';

import Mycourses_view from '../Models/Mycourses_view';
import Myresearches_view from '../Models/Myresearches_view';
import Viewmarks from '../Models/Viewmarks';
import Myassignments_view from '../Models/Myassignments_view';
import Myassessments_view from '../Models/Myassessments_view';

import { MyassignmentsPData } from '../Progress/MyassignmentsP';
import { MycoursesPData } from '../Progress/MycoursesP';
import { MyresearchesPData } from '../Progress/MyresearchesP';
import { ViewmarksPData } from '../Progress/ViewmarksP';

const Studentsdashboard = ({ activeToggle }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showOnlyBox, setShowOnlyBox] = useState(false);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateBoxes, setAnimateBoxes] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  
  const barChartRef = useRef(null);
  const effectiveActiveToggle = activeToggle || 'notifications';

  const chartData = {
    assignments: MyassignmentsPData,
    courses: MycoursesPData,
    researches: MyresearchesPData,
    marks: ViewmarksPData,
  };

  useEffect(() => {
    setTimeout(() => setAnimateLeft(true), 200);
    setTimeout(() => setAnimateBoxes(true), 50);
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

  const boxStyles = (index) => `
    flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer
    transform transition-all duration-300 ease-in-out
    ${animateBoxes ? `translate-x-0 delay-${index * 200}` : 'translate-x-full'}
    hover:scale-105 hover:shadow-lg
    bg-gray-900 hover:bg-gray-800
    border-2 border-transparent hover:border-[#f44336]
  `;

  const buttonStyles = `
    px-4 py-2 rounded-lg font-semibold
    transition-all duration-300 ease-in-out
    transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-[#f44336] focus:ring-opacity-50
  `;

  return (
    <div className="flex bg-gray-800 min-h-screen text-white">
      {/* Left Sidebar */}
      <div
        className={`w-1/3 space-y-4 mr-4 transform transition-transform duration-1000 ease-in-out
          ${animateLeft ? 'translate-x-0' : '-translate-x-full'}
          border-r border-gray-700 p-4`}
      >
        {renderLeftSidebar()}
      </div>

      {/* Right Dashboard */}
      <div className="w-2/3 space-y-6 p-6">
        {showOnlyBox ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-between w-full bg-[#f44336] text-center p-6 rounded-lg shadow-lg">
              <button
                className={`flex items-center ${buttonStyles} bg-white text-[#f44336] hover:bg-gray-800 hover:text-white`}
                onClick={handleBackToAll}
              >
                <FaArrowLeft className="mr-2" />
                Back to All
              </button>
              <h2 className="text-2xl font-bold text-white">
                {activeCategory?.charAt(0).toUpperCase() + activeCategory?.slice(1)}
              </h2>
            </div>
            <div className="w-full bg-gray-900 rounded-lg shadow-xl p-6">
              {activeCategory === 'assignments' && <Myassignments_view />}
              {activeCategory === 'assessments' && <Myassessments_view />}
              {activeCategory === 'courses' && <Mycourses_view />}
              {activeCategory === 'researches' && <Myresearches_view />}
              {activeCategory === 'marks' && <Viewmarks />}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6">
              {/* First Box - Assignments & Assessments */}
              <div
                className={boxStyles(0)}
                onMouseEnter={() => setIsHovering('main')}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className="bg-[#f44336] text-white p-4 rounded-full mb-4 transform transition-transform duration-300 hover:rotate-12">
                  <FaBook className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg mb-2">View All</h3>
                <div className="mt-4 flex flex-wrap gap-3 justify-center">
                  <button
                    className={`${buttonStyles} bg-white text-[#f44336] hover:bg-gray-800 hover:text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewClick('assignments');
                    }}
                  >
                    Assignments
                  </button>
                  <button
                    className={`${buttonStyles} bg-white text-[#f44336] hover:bg-gray-800 hover:text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewClick('assessments');
                    }}
                  >
                    Assessments
                  </button>
                </div>
              </div>

              {/* Other Boxes */}
              {['courses', 'researches', 'marks'].map((key, index) => (
                <div
                  key={key}
                  className={boxStyles(index + 1)}
                  onClick={() => handleCategoryClick(key)}
                  onMouseEnter={() => setIsHovering(key)}
                  onMouseLeave={() => setIsHovering(null)}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="bg-[#f44336] text-white p-4 rounded-full mb-4 transform transition-transform duration-300 hover:rotate-12">
                    {key === 'courses' && <FaLaptopCode className="text-3xl" />}
                    {key === 'researches' && <FaSearch className="text-3xl" />}
                    {key === 'marks' && <FaCheckCircle className="text-3xl" />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                  </h3>
                  <button
                    className={`${buttonStyles} bg-white text-[#f44336] hover:bg-gray-800 hover:text-white mt-4`}
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

            {/* Chart Section */}
            {activeCategory && chartData[activeCategory] && (
              <div ref={barChartRef} className="mt-8 bg-gray-900 p-6 rounded-lg shadow-xl transition-all duration-300">
                <h3 className="text-center text-2xl font-semibold mb-6">
                  {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Statistics
                </h3>
                <Bar 
                  data={chartData[activeCategory]}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: {
                          color: 'white'
                        }
                      }
                    },
                    scales: {
                      y: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                          color: 'white'
                        }
                      },
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                          color: 'white'
                        }
                      }
                    }
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Studentsdashboard;