import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileModel = ({ userInfo, onComplete }) => {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [academicLevels, setAcademicLevels] = useState([]);
  const [selectedAcademicLevelId, setSelectedAcademicLevelId] = useState('');
  const [allClasses, setAllClasses] = useState([]); // Store full list of classes
  const [selectedClassId, setSelectedClassId] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch schools
        const schoolsResponse = await axios.get('http://localhost:5000/api/schools', {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        });
        if (schoolsResponse.data.length === 0) {
          setError('No schools found in the database.');
        } else {
          setSchools(schoolsResponse.data);
        }

        // Fetch academic levels
        const levelsResponse = await axios.get('http://localhost:5000/api/academic-levels', {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        });
        if (levelsResponse.data.length === 0) {
          setError(prev => prev ? prev : 'No academic levels found.');
        } else {
          setAcademicLevels(levelsResponse.data);
        }

        // Fetch classes
        const classesResponse = await axios.get('http://localhost:5000/api/classes', {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        });
        if (classesResponse.data.length === 0) {
          setError(prev => prev ? prev : 'No classes found.');
        } else {
          setAllClasses(classesResponse.data); // Store full list
        }
      } catch (error) {
        console.error('Detailed Error Fetching Data:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        if (error.response) {
          setError(`Server Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          setError('No response from server. Please check your network connection.');
        } else {
          setError('Failed to fetch data. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSchoolSelect = (e) => {
    setSelectedSchoolId(e.target.value);
  };

  const handleAcademicLevelSelect = (e) => {
    setSelectedAcademicLevelId(e.target.value);
    setSelectedClassId(''); // Reset class selection when academic level changes
    if (e.target.value) {
      const selectedLevelName = academicLevels.find(level => level._id === e.target.value)?.name;
      console.log('Selected Academic Level:', selectedLevelName); // Debug log
      if (selectedLevelName) {
        const filteredClasses = allClasses.filter(cls => cls.academic_level === selectedLevelName);
        console.log('Filtered Classes:', filteredClasses); // Debug log
        // No need to setClasses, filtering is done in render
      } else {
        console.log('No matching academic level name found');
      }
    }
  };

  const handleClassSelect = (e) => {
    setSelectedClassId(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedSchoolId && selectedAcademicLevelId && selectedClassId) {
      onComplete({ schoolId: selectedSchoolId, academicLevelId: selectedAcademicLevelId, classId: selectedClassId });
    }
  };

  const formatSchoolOption = (school) => {
    return `${school.province}/${school.district}/${school.sector}/${school.cell}/${school.village}/${school.name}`;
  };

  const formatClassOption = (cls) => {
    return `${cls.academic_level}/${cls.acronym}`;
  };

  // Filter classes dynamically based on selected academic level
  const filteredClasses = selectedAcademicLevelId
    ? allClasses.filter(cls => cls.academic_level === academicLevels.find(level => level._id === selectedAcademicLevelId)?.name)
    : allClasses;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-[#f44336]">Profile Setup</h2>
        <p className="mb-4 text-gray-700">
          Registration successful! Please set up your profile for {userInfo.firstName} {userInfo.lastName}.
        </p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select School</label>
          <select
            value={selectedSchoolId}
            onChange={handleSchoolSelect}
            className="w-full p-2 border rounded bg-gray-100 text-gray-800"
            disabled={isLoading || error !== null}
          >
            <option value="">
              {isLoading ? 'Loading schools...' : 'Select a School'}
            </option>
            {schools.map((school) => (
              <option key={school._id} value={school._id}>
                {formatSchoolOption(school)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Academic Level</label>
          <select
            value={selectedAcademicLevelId}
            onChange={handleAcademicLevelSelect}
            className="w-full p-2 border rounded bg-gray-100 text-gray-800"
            disabled={isLoading || error !== null}
          >
            <option value="">
              {isLoading ? 'Loading levels...' : 'Select an Academic Level'}
            </option>
            {academicLevels.map((level) => (
              <option key={level._id} value={level._id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Class</label>
          <select
            value={selectedClassId}
            onChange={handleClassSelect}
            className="w-full p-2 border rounded bg-gray-100 text-gray-800"
            disabled={isLoading || error !== null || !selectedAcademicLevelId}
          >
            <option value="">
              {isLoading ? 'Loading classes...' : !selectedAcademicLevelId ? 'Select an Academic Level first' : 'Select a Class'}
            </option>
            {filteredClasses.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {formatClassOption(cls)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => onComplete('')}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#f44336] text-white py-2 px-4 rounded hover:bg-[#da190b]"
            disabled={!selectedSchoolId || !selectedAcademicLevelId || !selectedClassId || isLoading || error !== null}
          >
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;