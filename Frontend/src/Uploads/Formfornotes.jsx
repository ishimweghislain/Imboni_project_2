import React, { useState } from 'react';

const Formfornotes = ({ classDetails }) => {
  const [teacherName, setTeacherName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [unitCount, setUnitCount] = useState(0);
  const [units, setUnits] = useState([]);
  const [notesFile, setNotesFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleUnitCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setUnitCount(count);
    setUnits(Array(count).fill(''));
  };

  const handleUnitChange = (index, value) => {
    const updatedUnits = [...units];
    updatedUnits[index] = value;
    setUnits(updatedUnits);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    setErrors((prev) => ({ ...prev, notesFile: null }));
    
    if (!file) {
      setNotesFile(null);
      return;
    }

    if (!file.name.match(/\.(doc|docx)$/)) {
      setErrors((prev) => ({
        ...prev,
        notesFile: 'Please upload only Word documents (.doc or .docx)'
      }));
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        notesFile: 'File size must be less than 5MB'
      }));
      e.target.value = '';
      return;
    }

    setNotesFile(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!teacherName.trim()) newErrors.teacherName = 'Teacher name is required';
    if (!courseName.trim()) newErrors.courseName = 'Course name is required';
    if (unitCount <= 0) newErrors.unitCount = 'Please enter a valid number of units';
    if (!notesFile) newErrors.notesFile = 'Please upload a notes file';
    if (units.some(unit => !unit.trim())) newErrors.units = 'All units must have content';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setTeacherName('');
    setCourseName('');
    setUnitCount(0);
    setUnits([]);
    setNotesFile(null);
    setErrors({});
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      setSuccessMessage('');

      if (!validateForm()) return;

      setLoading(true);

      const formData = new FormData();
      formData.append('teacherName', teacherName);
      formData.append('courseName', courseName);
      formData.append('unitCount', unitCount.toString());
      formData.append('units', JSON.stringify(units));
      formData.append('file', notesFile);

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const responseText = await response.text();
      
      // Try to parse the response as JSON if there's content
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (error) {
        console.error('Response parsing error:', error);
        console.log('Raw response:', responseText);
        throw new Error('Server response was not in the expected format');
      }

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status} - ${responseText}`);
      }

      setSuccessMessage(data.message || 'Notes uploaded successfully!');
      resetForm();
    } catch (err) {
      console.error('Upload error:', err);
      setErrors({ 
        form: err.message || 'An error occurred while uploading notes'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Add Notes for {classDetails?.program || 'Class'}
      </h2>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}

      {errors.form && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{errors.form}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            * Teacher Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Enter teacher's name"
          />
          {errors.teacherName && (
            <p className="text-red-500 text-sm mt-1">{errors.teacherName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            * Course Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
          />
          {errors.courseName && (
            <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            * Number of Units
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
            value={unitCount}
            onChange={handleUnitCountChange}
            min="0"
            max="20"
          />
          {errors.unitCount && (
            <p className="text-red-500 text-sm mt-1">{errors.unitCount}</p>
          )}
        </div>

        {units.map((unit, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-gray-700 font-semibold">
              Unit {index + 1}
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
              value={unit}
              onChange={(e) => handleUnitChange(index, e.target.value)}
              placeholder={`Enter content for unit ${index + 1}`}
            />
          </div>
        ))}
        {errors.units && (
          <p className="text-red-500 text-sm">{errors.units}</p>
        )}

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            * Upload Notes File
          </label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
            accept=".doc,.docx"
            onChange={handleFileChange}
          />
          {errors.notesFile && (
            <p className="text-red-500 text-sm mt-1">{errors.notesFile}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Accepted formats: .doc, .docx (Max size: 5MB)
          </p>
        </div>

        <button
          type="submit"
          className={`w-full bg-[#f44336] text-white px-4 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </span>
          ) : (
            'Submit Notes'
          )}
        </button>
      </div>
    </form>
  );
};

export default Formfornotes;