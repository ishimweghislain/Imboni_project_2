import React, { useState, useEffect } from 'react';
import axios from 'axios';

const New_assignment = () => {
  const [attachFile, setAttachFile] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [numStudents, setNumStudents] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignmentText, setAssignmentText] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [classOptions, setClassOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/classes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setClassOptions(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch classes');
        setIsLoading(false);
        if (error.response?.status === 401) {
          // Handle unauthorized access - maybe redirect to login
          window.location.href = '/login';
        }
      }
    };

    fetchClasses();
  }, []);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          file: 'File size must be less than 10MB'
        }));
        return;
      }
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrors(prev => ({
          ...prev,
          file: 'Only images (JPEG, PNG, GIF) and PDFs are allowed'
        }));
        return;
      }
      setFile(selectedFile);
      setErrors(prev => ({ ...prev, file: null }));
    }
  };

  const handleClassChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedValues = selectedOptions.map(option => {
      const [level, program, acronym] = option.value.split('|');
      return {
        level,
        program,
        acronym
      };
    });
    setSelectedClasses(selectedValues);
  };

  const validateForm = async () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];
  
    if (!teacherName.trim()) {
      newErrors.teacherName = 'Teacher name is required.';
    }
    if (!courseName.trim()) {
      newErrors.courseName = 'Course name is required.';
    }
    if (selectedClasses.length === 0) {
      newErrors.selectedClasses = 'Please select at least one class.';
    }
    if (!numStudents.trim() || isNaN(numStudents) || parseInt(numStudents, 10) <= 0) {
      newErrors.numStudents = 'Please enter a valid number of students.';
    }
    if (!deadline) {
      newErrors.deadline = 'Deadline is required.';
    } else if (deadline < today) {
      newErrors.deadline = 'Deadline cannot be in the past.';
    }
    if (attachFile && !file) {
      newErrors.file = 'Please select a file to upload.';
    }
    if (!attachFile && !assignmentText.trim()) {
      newErrors.assignmentText = 'Please enter assignment text or attach a file.';
    }
  
    if (!newErrors.numStudents && selectedClasses.length > 0) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:5000/api/classes/students-count',
          { classes: selectedClasses },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        const actualStudentCount = response.data.totalStudents;
        const enteredStudentCount = parseInt(numStudents, 10);
  
        if (enteredStudentCount !== actualStudentCount) {
          newErrors.numStudents = `Number of students mismatch! Expected: ${actualStudentCount}, Entered: ${enteredStudentCount}`;
        }
      } catch (error) {
        console.error('Validation error:', error.response?.data || error.message);
        newErrors.numStudents = 'Unable to validate student count. Please try again.';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const isValid = await validateForm();

      if (isValid) {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in again.');
        }

        const formData = new FormData();
        formData.append('teacherName', teacherName);
        formData.append('courseName', courseName);
        formData.append('selectedClasses', JSON.stringify(selectedClasses));
        formData.append('numStudents', numStudents);
        formData.append('deadline', deadline);

        if (attachFile && file) {
          formData.append('file', file);
        } else {
          formData.append('assignmentText', assignmentText);
        }

        const response = await axios.post(
          'http://localhost:5000/api/assignments/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
            },
          }
        );

        // Clear form after successful submission
        setTeacherName('');
        setCourseName('');
        setSelectedClasses([]);
        setNumStudents('');
        setDeadline('');
        setAssignmentText('');
        setFile(null);
        setAttachFile(false);
        setErrors({});

        alert('Assignment submitted successfully!');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Your session has expired. Please log in again.');
        // Redirect to login page
        window.location.href = '/login';
      } else {
        alert(`Failed to submit assignment: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">New Assignment</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Teacher's Name */}
        <div>
          <label className="block text-gray-700 font-semibold">* Teacher's Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
            placeholder="Enter teacher's name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            disabled={isSubmitting}
          />
          {errors.teacherName && <p className="text-red-500 text-sm">{errors.teacherName}</p>}
        </div>

        {/* Course Name */}
        <div>
          <label className="block text-gray-700 font-semibold">* Course Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
            placeholder="Enter course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            disabled={isSubmitting}
          />
          {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName}</p>}
        </div>

        {/* Dedicated Classes */}
        <div>
          <label className="block text-gray-700 font-semibold">* Dedicated Classes</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
            multiple
            value={selectedClasses.map(c => `${c.level}|${c.program}|${c.acronym}`)}
            onChange={handleClassChange}
            disabled={isSubmitting}
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
                >
                  {classOption.level} - {classOption.program} ({classOption.acronym})
                </option>
              ))
            ) : (
              <option disabled>No classes available</option>
            )}
          </select>
          {errors.selectedClasses && <p className="text-red-500 text-sm">{errors.selectedClasses}</p>}
        </div>

        {/* Number of Students */}
        <div>
          <label className="block text-gray-700 font-semibold">* Number of Students</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
            placeholder="Enter number of students"
            value={numStudents}
            onChange={(e) => setNumStudents(e.target.value)}
            disabled={isSubmitting}
          />
          {errors.numStudents && <p className="text-red-500 text-sm">{errors.numStudents}</p>}
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-gray-700 font-semibold">* Deadline of Submission</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={isSubmitting}
          />
          {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline}</p>}
        </div>

        {/* Attach File */}
        <div>
          <label className="block text-gray-700 font-semibold">* Attach File?</label>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={attachFile}
              onChange={() => {
                setAttachFile(!attachFile);
                setFile(null);
              }}
              disabled={isSubmitting}
            />
            <span className="text-gray-700">Yes</span>
          </div>
        </div>

        {attachFile ? (
          <div>
            <label className="block text-gray-700 font-semibold">Upload Assignment File</label>
            <div className="flex items-center">
              <label
                htmlFor="fileInput"
                className={`bg-[#f44336] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Choose File
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                disabled={isSubmitting}
              />
              {file && (
                <p className="ml-4 text-gray-600">
                  File selected: <span className="font-semibold">{file.name}</span>
                </p>
              )}
            </div>
            {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-gray-700 font-semibold">Assignment Text</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
              placeholder="Enter assignment text"
              value={assignmentText}
              onChange={(e) => setAssignmentText(e.target.value)}
              disabled={isSubmitting}
            />
            {errors.assignmentText && <p className="text-red-500 text-sm">{errors.assignmentText}</p>}
          </div>
        )}

        <button
          type="submit"
          className={`bg-[#f44336] text-white px-4 py-2 rounded-lg hover:bg-gray-800 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </form>
    </div>
  );
};

export default New_assignment;