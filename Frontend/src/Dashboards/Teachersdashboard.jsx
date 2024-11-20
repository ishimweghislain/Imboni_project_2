import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  FaBook,
  FaChalkboardTeacher,
  FaShareAlt,
  FaFileAlt,
  FaArrowLeft,
} from 'react-icons/fa';


import Myclasses_view from '../Models/Myclasses_view';
import Passedassignments_view from '../Models/Passedassignments_view';
import Sharecourses_view from '../Models/Sharecourses_view';
import Newassignment from '../Models/Newassignment';


import { MyclassesPData } from '../Progress/MyclassesP';
import { PassedassignmentsPData } from '../Progress/PassedAssignmentsP';
import { SharecoursesPData } from '../Progress/SharecoursesP';
import { NewassignmentPData } from '../Progress/NewassignmentP';

const Teachersdashboard = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showOnlyBox, setShowOnlyBox] = useState(false);
  const barChartRef = useRef(null);

  const chartData = {
    classes: MyclassesPData,
    passedAssignments: PassedassignmentsPData,
    shareCourses: SharecoursesPData,
    newAssignment: NewassignmentPData,
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

  // Animation handling
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="flex bg-gray-800 min-h-screen text-white">
   
      <div className="w-1/3 space-y-4 mr-4">
        <div className="bg-white p-4 rounded-lg text-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-[#f44336]">Messages/Chats</h2>
          <div className="space-y-4 overflow-y-auto h-80">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-bold text-gray-700">Principal</p>
              <p className="text-gray-600">Please update the course syllabus.</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-bold text-gray-700">John Doe</p>
              <p className="text-gray-600">Can I resubmit the assignment?</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-bold text-gray-700">Jane Smith</p>
              <p className="text-gray-600">Thank you for the new resources!</p>
            </div>
          </div>
        </div>
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
                {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </h2>
            </div>
           
            {activeCategory === 'classes' && <Myclasses_view />}
            {activeCategory === 'passedAssignments' && <Passedassignments_view />}
            {activeCategory === 'shareCourses' && <Sharecourses_view />}
            {activeCategory === 'newAssignment' && <Newassignment />}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {/* Dashboard Items */}
              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                  activeCategory === 'classes' ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                } ${animate ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
                onClick={() => handleCategoryClick('classes')}
              >
                <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                  <FaChalkboardTeacher className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg">My Classes</h3>
                <button
                  className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick('classes');
                  }}
                >
                  View All
                </button>
              </div>

              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                  activeCategory === 'passedAssignments' ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                } ${animate ? 'transform translate-x-0' : 'transform translate-x-full'}`}
                onClick={() => handleCategoryClick('passedAssignments')}
              >
                <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                  <FaBook className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg">Passed Assignments</h3>
                <button
                  className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick('passedAssignments');
                  }}
                >
                  View All
                </button>
              </div>

              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                  activeCategory === 'shareCourses' ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                } ${animate ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
                onClick={() => handleCategoryClick('shareCourses')}
              >
                <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                  <FaShareAlt className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg">Share Courses</h3>
                <button
                  className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick('shareCourses');
                  }}
                >
                  View All
                </button>
              </div>

              <div
                className={`flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-transform duration-500 ${
                  activeCategory === 'newAssignment' ? 'bg-[#ff7961]' : 'bg-[#f44336]'
                } ${animate ? 'transform translate-x-0' : 'transform translate-x-full'}`}
                onClick={() => handleCategoryClick('newAssignment')}
              >
                <div className="bg-gray-800 text-white p-4 rounded-full mb-4">
                  <FaFileAlt className="text-3xl" />
                </div>
                <h3 className="font-semibold text-lg">New Assignment</h3>
                <button
                  className="mt-4 px-4 py-2 bg-white text-[#f44336] rounded-lg font-semibold hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewClick('newAssignment');
                  }}
                >
                  +
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

export default Teachersdashboard;
