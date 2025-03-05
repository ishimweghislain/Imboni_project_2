import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Tailwind CSS is assumed to be configured in the project
// If not, you'll need to add Tailwind CSS to your project

const ProfileSetup = ({ userInfo, onComplete }) => {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [academicLevels, setAcademicLevels] = useState([]);
  const [selectedAcademicLevelId, setSelectedAcademicLevelId] = useState('');
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [allPrograms, setAllPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Parallel data fetching
        const [
          schoolsResponse, 
          levelsResponse, 
          classesResponse, 
          programsResponse
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/schools', { 
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000 
          }),
          axios.get('http://localhost:5000/api/academic-levels', { 
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000 
          }),
          axios.get('http://localhost:5000/api/classes', { 
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000 
          }),
          axios.get('http://localhost:5000/api/programs', { 
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000 
          })
        ]);

        // Validate and set data
        if (schoolsResponse.data.length === 0) setError('No schools found');
        else setSchools(schoolsResponse.data);

        if (levelsResponse.data.length === 0) setError(prev => prev || 'No academic levels found');
        else setAcademicLevels(levelsResponse.data);

        if (classesResponse.data.length === 0) setError(prev => prev || 'No classes found');
        else setAllClasses(classesResponse.data);

        if (programsResponse.data.length === 0) setError(prev => prev || 'No programs found');
        else setAllPrograms(programsResponse.data);

      } catch (error) {
        console.error('Data Fetch Error:', error);
        setError(error.response?.data?.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedSchoolId || !selectedAcademicLevelId || 
        !selectedClassId || !selectedProgramId) {
      setError('Please complete all selections');
      return;
    }

    const formData = new FormData();
    formData.append('schoolId', selectedSchoolId);
    formData.append('academicLevelId', selectedAcademicLevelId);
    formData.append('classId', selectedClassId);
    formData.append('programId', selectedProgramId);
    formData.append('role', userInfo.role);
    
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/profiles/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Store relevant information
      localStorage.setItem('userProfile', JSON.stringify({
        role: userInfo.role,
        profileImageFilename: response.data.profile.profileImage,
        schoolId: selectedSchoolId,
        academicLevelId: selectedAcademicLevelId,
        classId: selectedClassId,
        programId: selectedProgramId
      }));

      onComplete(response.data);
    } catch (error) {
      console.error('Profile Creation Error:', error);
      setError(error.response?.data?.message || 'Profile creation failed');
    }
  };

  // Filtering and formatting helpers
  const filteredClasses = selectedAcademicLevelId
    ? allClasses.filter(cls => 
        cls.academic_level.toLowerCase() === 
        academicLevels.find(level => level._id === selectedAcademicLevelId)?.name.toLowerCase()
      )
    : allClasses;

  const filteredPrograms = selectedAcademicLevelId
    ? allPrograms.filter(prog => 
        prog.academic_level.toLowerCase() === 
        academicLevels.find(level => level._id === selectedAcademicLevelId)?.name.toLowerCase()
      )
    : allPrograms;

  const formatOption = (item, type) => {
    switch(type) {
      case 'school':
        return `${item.province}/${item.district}/${item.sector}/${item.cell}/${item.village}/${item.name}`;
      case 'class':
        return `${item.academic_level}/${item.acronym}`;
      case 'program':
        return `${item.academic_level}/${item.type}/${item.combination}`;
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-red-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Complete Profile Setup</h2>
          <button 
            onClick={() => onComplete(null)} 
            className="hover:bg-red-600 p-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-40 h-40 mb-4">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover rounded-full border-4 border-red-500" 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <label 
                htmlFor="profile-image" 
                className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600"
              >
                <input 
                  id="profile-image" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload} 
                />
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </label>
            </div>
            <p className="text-sm text-gray-600">Upload Profile Picture</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {/* Dropdowns */}
          <div className="space-y-4">
            {/* School Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select School
              </label>
              <select
                value={selectedSchoolId}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
                disabled={isLoading}
                className="w-full p-2 border rounded-md bg-gray-100"
              >
                <option value="">
                  {isLoading ? 'Loading Schools...' : 'Choose School'}
                </option>
                {schools.map(school => (
                  <option key={school._id} value={school._id}>
                    {formatOption(school, 'school')}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Level Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Level
              </label>
              <select
                value={selectedAcademicLevelId}
                onChange={(e) => {
                  setSelectedAcademicLevelId(e.target.value);
                  setSelectedClassId('');
                  setSelectedProgramId('');
                }}
                disabled={isLoading || schools.length === 0}
                className="w-full p-2 border rounded-md bg-gray-100"
              >
                <option value="">Select Academic Level</option>
                {academicLevels.map(level => (
                  <option key={level._id} value={level._id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                disabled={!selectedAcademicLevelId}
                className="w-full p-2 border rounded-md bg-gray-100"
              >
                <option value="">
                  {selectedAcademicLevelId ? 'Select Class' : 'Choose Academic Level First'}
                </option>
                {filteredClasses.map(cls => (
                  <option key={cls._id} value={cls._id}>
                    {formatOption(cls, 'class')}
                  </option>
                ))}
              </select>
            </div>

            {/* Program Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Program
              </label>
              <select
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                disabled={!selectedAcademicLevelId}
                className="w-full p-2 border rounded-md bg-gray-100"
              >
                <option value="">
                  {selectedAcademicLevelId ? 'Select Program' : 'Choose Academic Level First'}
                </option>
                {filteredPrograms.map(prog => (
                  <option key={prog._id} value={prog._id}>
                    {formatOption(prog, 'program')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-100 p-4 flex justify-end space-x-4">
          <button 
            onClick={() => onComplete(null)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!selectedSchoolId || !selectedAcademicLevelId || !selectedClassId || !selectedProgramId}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;