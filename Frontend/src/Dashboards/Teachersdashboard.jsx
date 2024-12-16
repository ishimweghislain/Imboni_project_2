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

import { MyclassesPData } from '../Progress/MyclassesP';
import { PassedassignmentsPData } from '../Progress/PassedAssignmentsP';
import { SharecoursesPData } from '../Progress/SharecoursesP';
import { NewassignmentPData } from '../Progress/NewassignmentP';

import NewAssignmentForm from '../Work_models/New_assignment'; // Import the modal component

const Teachersdashboard = ({ activeToggle }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showOnlyBox, setShowOnlyBox] = useState(false);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateBoxes, setAnimateBoxes] = useState(false);
  const [showModal, setShowModal] = useState(false); // For the modal

  const barChartRef = useRef(null);
  const effectiveActiveToggle = activeToggle || 'notifications';

  const chartData = {
    classes: MyclassesPData,
    passedassignments: PassedassignmentsPData,
    sharecourses: SharecoursesPData,
    newassignment: NewassignmentPData,
  };

  useEffect(() => {
    setTimeout(() => setAnimateLeft(true), 100); // Animate Left Sidebar
    setTimeout(() => setAnimateBoxes(true), 500); // Animate Right Boxes
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

  return (
    <div className="flex bg-gray-800 min-h-screen text-white">
      {/* Left Sidebar */}
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
            {activeCategory === 'classes' && <Myclasses_view />}
            {activeCategory === 'passedassignments' && <Passedassignments_view />}
            {activeCategory === 'sharecourses' && <Sharecourses_view />}
            {activeCategory === 'newassignment' && <Newassignment />}
          </div>
        ) : (
          <>
            {/* Right Dashboard Boxes */}
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
                    {key === 'classes' && <FaBook className="text-3xl" />}
                    {key === 'passedassignments' && <FaLaptopCode className="text-3xl" />}
                    {key === 'sharecourses' && <FaSearch className="text-3xl" />}
                    {key === 'newassignment' && <FaCheckCircle className="text-3xl" />}
                  </div>
                  <h3 className="font-semibold text-lg">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
                  </h3>
                  <div className="mt-4 space-x-2">
                    {key !== 'newassignment' && (
                      <button
                        className="px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewClick(key);
                        }}
                      >
                        View All
                      </button>
                    )}
                    {key === 'newassignment' && (
                      <button
                        className="px-4 py-2 bg-gray-200 text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowModal(true);
                        }}
                      >
                        + New
                      </button>
                    )}
                  </div>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2 max-h-[80vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ❌
            </button>
            <NewAssignmentForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachersdashboard;
