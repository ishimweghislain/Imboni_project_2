import React, { useState, useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaBook, FaLaptopCode, FaSearch, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

import Teacher_notification from '../Communication/Teacher_notification';
import Teacher_chat from '../Communication/Teacher_chat';
import Teacher_people from '../Communication/Student_people';

import Myclasses_view from '../Models/Myclasses_view';
import Passedassignments_view from '../Models/PassedAssignments_view';
import Sharecourses_view from '../Models/Sharecourses_view';
import Newassignment from '../Models/Newassignment';
import PassedAssessments_view from '../Models/PassedAssessments_view';

import { MyclassesPData } from '../Progress/MyclassesP';
import { PassedassignmentsPData } from '../Progress/PassedAssignmentsP';
import { SharecoursesPData } from '../Progress/SharecoursesP';
import { NewassignmentPData } from '../Progress/NewassignmentP';

import NewAssignmentForm from '../Work_models/New_assignment';
import Quickassessment from '../Work_models/Quickassessment';

const Teachersdashboard = ({ activeToggle }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showOnlyBox, setShowOnlyBox] = useState(false);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateBoxes, setAnimateBoxes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showQuickAssessmentModal, setShowQuickAssessmentModal] = useState(false);
  const [isHovering, setIsHovering] = useState(null);

  const barChartRef = useRef(null);
  const effectiveActiveToggle = activeToggle || 'notifications';

  const chartData = {
    classes: MyclassesPData,
    passedassignments: PassedassignmentsPData,
    sharecourses: SharecoursesPData,
    new: NewassignmentPData,
  };

  useEffect(() => {
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
        return <Teacher_notification />;
      case 'chat':
        return <Teacher_chat />;
      case 'people':
        return <Teacher_people />;
      default:
        return <Teacher_notification />;
    }
  };

  const boxStyles = (key, index) => `
    flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer
    transform transition-all duration-300 ease-in-out
    ${animateBoxes ? `translate-x-0 delay-${index * 200}` : 'translate-x-full'}
    ${isHovering === key ? 'scale-105 shadow-lg' : 'scale-100'}
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
              {activeCategory === 'classes' && <Myclasses_view />}
              {activeCategory === 'passedassignments' && <Passedassignments_view />}
              {activeCategory === 'passedassessments' && <PassedAssessments_view />}
              {activeCategory === 'sharecourses' && <Sharecourses_view />}
              {activeCategory === 'new' && <Newassignment />}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-6">
              {Object.keys(chartData).map((key, index) => (
                <div
                  key={key}
                  className={boxStyles(key, index)}
                  onClick={() => handleCategoryClick(key)}
                  onMouseEnter={() => setIsHovering(key)}
                  onMouseLeave={() => setIsHovering(null)}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="bg-[#f44336] text-white p-4 rounded-full mb-4 transform transition-transform duration-300 hover:rotate-12">
                    {key === 'classes' && <FaBook className="text-3xl" />}
                    {key === 'passedassignments' && <FaLaptopCode className="text-3xl" />}
                    {key === 'sharecourses' && <FaSearch className="text-3xl" />}
                    {key === 'new' && <FaCheckCircle className="text-3xl" />}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {key === 'passedassignments' ? 'View Passed' : key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                  </h3>
                  <div className="mt-4 space-x-3">
                    {key !== 'new' && (
                      <button
                        className={`${buttonStyles} bg-white text-[#f44336] hover:bg-gray-800 hover:text-white`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClick(key);
                        }}
                      >
                        {key === 'passedassignments' ? 'Assignments' : 'View All'}
                      </button>
                    )}
                    {key === 'passedassignments' && (
                      <button
                        className={`${buttonStyles} bg-white text-[#f44336] hover:bg-gray-800 hover:text-white`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClick('passedassessments');
                        }}
                      >
                        Assessments
                      </button>
                    )}
                    {key === 'new' && (
                      <>
                        <button
                          className={`${buttonStyles} bg-white text-[#f44336] hover:bg-gray-800 hover:text-white`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowModal(true);
                          }}
                        >
                          Assignment
                        </button>
                        <button
                          className={`${buttonStyles} bg-white text-[#f44336] hover:bg-gray-800 hover:text-white`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowQuickAssessmentModal(true);
                          }}
                        >
                          Assessment
                        </button>
                      </>
                    )}
                  </div>
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

      {/* Modals */}
      {(showModal || showQuickAssessmentModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto relative shadow-2xl transform transition-all duration-300 ease-out">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-300"
              onClick={() => {
                setShowModal(false);
                setShowQuickAssessmentModal(false);
              }}
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {showModal && <NewAssignmentForm />}
            {showQuickAssessmentModal && <Quickassessment />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachersdashboard;