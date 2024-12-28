import React, { useState } from 'react';

const Formfornotes = ({ classDetails }) => {
  const [courseName, setCourseName] = useState('');
  const [unitCount, setUnitCount] = useState(0);
  const [units, setUnits] = useState([]);
  const [notesFile, setNotesFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleUnitCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setUnitCount(count);
    setUnits(new Array(count).fill(''));
  };

  const handleUnitChange = (index, value) => {
    const updatedUnits = [...units];
    updatedUnits[index] = value;
    setUnits(updatedUnits);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.match(/\.(doc|docx)$/)) {
      setErrors((prev) => ({
        ...prev,
        notesFile: 'Please upload only Word documents (.doc or .docx)',
      }));
      e.target.value = '';
      return;
    }
    setNotesFile(file);
    setErrors((prev) => ({ ...prev, notesFile: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!courseName.trim()) newErrors.courseName = 'Course name is required.';
    if (unitCount <= 0) newErrors.unitCount = 'Please enter a valid number of units.';
    if (!notesFile) newErrors.notesFile = 'Please upload a notes file.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setCourseName('');
    setUnitCount(0);
    setUnits([]);
    setNotesFile(null);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('unitCount', unitCount.toString());
    formData.append('units', JSON.stringify(units));
    formData.append('file', notesFile);

    try {
      setLoading(true);
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Server returned non-JSON response");
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload notes');
      }

      resetForm();
      alert('Notes uploaded successfully');
    } catch (err) {
      console.error('Upload error:', err);
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Add Notes for {classDetails?.program || 'Class'}
      </h2>
      {errors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p className="text-sm">{errors.form}</p>
        </div>
      )}
      <div>
        <label className="block text-gray-700 font-semibold">* Course Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name"
        />
        {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName}</p>}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold">* Number of Units</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
          value={unitCount}
          onChange={handleUnitCountChange}
          min="0"
        />
        {errors.unitCount && <p className="text-red-500 text-sm">{errors.unitCount}</p>}
      </div>
      {units.map((unit, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-gray-700 font-semibold">Unit {index + 1}</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
            value={unit}
            onChange={(e) => handleUnitChange(index, e.target.value)}
            placeholder={`Enter subcontent for unit ${index + 1}`}
          />
        </div>
      ))}
      <div>
        <label className="block text-gray-700 font-semibold">* Upload Notes File</label>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336]"
          accept=".doc,.docx"
          onChange={handleFileChange}
        />
        {errors.notesFile && <p className="text-red-500 text-sm">{errors.notesFile}</p>}
      </div>
      <button
        className={`w-full bg-[#f44336] text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </span>
        ) : (
          'Submit Notes'
        )}
      </button>
    </div>
  );
};

export default Formfornotes;