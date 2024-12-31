import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Postassessment from './Postassessment'; 
import { Link } from 'react-router-dom'; 

const Quickassessment = () => {
  const [teacherName, setTeacherName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPostAssessmentModalOpen, setIsPostAssessmentModalOpen] = useState(false); 
  const [isInnerModalOpen, setIsInnerModalOpen] = useState(false); 
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/classes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClassOptions(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch classes');
        setIsLoading(false);
        if (error.response?.status === 401) {
          // Handle unauthorized access
          window.location.href = '/login';
        }
      }
    };

    fetchClasses();
  }, []);

  // Handle class selection
  const handleClassChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => {
      const [level, program, acronym] = option.value.split('|');
      return { level, program, acronym };
    });
    setSelectedClasses(selectedValues);
  };

  // Handle Post Assessment button click to open modal
  const handlePostAssessment = () => {
    setIsPostAssessmentModalOpen(true); // Open the Post Assessment modal when clicked
  };

  // Close the Postassessment modal
  const closePostAssessmentModal = () => {
    setIsPostAssessmentModalOpen(false);
  };

  // Handle opening of inner modal from within the Post Assessment modal
  const handleOpenInnerModal = () => {
    setIsInnerModalOpen(true); // Open the inner modal
  };

  // Close the inner modal
  const closeInnerModal = () => {
    setIsInnerModalOpen(false); // Close the inner modal
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold  text-gray-700 mb-6">Quick Assessment</h2>

      <form className="space-y-6">
        {/* Teacher Name Input */}
        <div>
          <label htmlFor="teacherName" className="block text-sm font-medium text-gray-600">
            <span>*</span> Teacher Name
          </label>
          <input
            type="text"
            id="teacherName"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Course Name Input */}
        <div>
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-600">
            <span>*</span> Course Name
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Dedicated Classes Selection */}
        <div>
          <label htmlFor="classes" className="block text-sm font-medium text-gray-600">
            <span>*</span> Dedicated Classes
          </label>
          <select
            id="classes"
            multiple
            value={selectedClasses.map((c) => `${c.level}|${c.program}|${c.acronym}`)}
            onChange={handleClassChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
          >
            {isLoading ? (
              <option disabled>Loading classes...</option>
            ) : error ? (
              <option disabled>{error}</option>
            ) : classOptions.length > 0 ? (
              classOptions.map((classOption) => (
                <option
                  key={classOption._id}
                  value={`${classOption.level}|${classOption.program}|${classOption.acronym}`}
                  className="text-black"
                >
                  {classOption.level} - {classOption.program} ({classOption.acronym})
                </option>
              ))
            ) : (
              <option disabled>No classes available</option>
            )}
          </select>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between">
        <Link
          to="/direct"
          className="w-[280px] bg-[#f44336] text-white py-2 rounded-md hover:bg-gray-700 transition duration-200 text-center"
        >
          Direct Assessment
        </Link>
        <button
          onClick={handlePostAssessment}
          className="w-[280px] bg-[#f44336] text-white py-2 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Post Assessment
        </button>
      </div>

      {/* Modal for Post Assessment */}
      {isPostAssessmentModalOpen && (
        <Postassessment
          onClose={closePostAssessmentModal}
          handleOpenInnerModal={handleOpenInnerModal} // Pass function to open inner modal
        />
      )}
    </div>
  );
};

export default Quickassessment;
