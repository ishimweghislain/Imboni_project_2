import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const SubmitAssignment = ({ onClose }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    courseName: '',
    submissionText: '',
    file: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          file: 'File size must be less than 10MB'
        }));
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrors(prev => ({
          ...prev,
          file: 'Only images (JPEG, PNG, GIF) and PDFs are allowed'
        }));
        return;
      }
      setFormData(prev => ({ ...prev, file: selectedFile }));
      setErrors(prev => ({ ...prev, file: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required.';
    }
    if (!formData.courseName.trim()) {
      newErrors.courseName = 'Course name is required.';
    }
    if (!formData.file) {
      newErrors.file = 'Please select a file to upload.';
    }
    if (!formData.submissionText.trim()) {
      newErrors.submissionText = 'Please enter submission text.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const isValid = validateForm();
      if (isValid) {
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        alert('Assignment submitted successfully!');
        onClose();
      }
    } catch (error) {
      alert('Failed to submit assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Submit Assignment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Student Name */}
          <div>
            <label className="block text-gray-700 font-semibold">* Student Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
              placeholder="Enter your name"
              value={formData.studentName}
              onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
              disabled={isSubmitting}
            />
            {errors.studentName && <p className="text-red-500 text-sm">{errors.studentName}</p>}
          </div>

          {/* Course Name */}
          <div>
            <label className="block text-gray-700 font-semibold">* Course Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
              placeholder="Enter course name"
              value={formData.courseName}
              onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
              disabled={isSubmitting}
            />
            {errors.courseName && <p className="text-red-500 text-sm">{errors.courseName}</p>}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-semibold">* Upload Assignment File</label>
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
              {formData.file && (
                <p className="ml-4 text-gray-600">
                  File selected: <span className="font-semibold">{formData.file.name}</span>
                </p>
              )}
            </div>
            {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
          </div>

          {/* Submission Text */}
          <div>
            <label className="block text-gray-700 font-semibold">* Submission Text</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f44336] text-black"
              placeholder="Enter your submission text"
              value={formData.submissionText}
              onChange={(e) => setFormData(prev => ({ ...prev, submissionText: e.target.value }))}
              disabled={isSubmitting}
              rows={4}
            />
            {errors.submissionText && <p className="text-red-500 text-sm">{errors.submissionText}</p>}
          </div>

          <button
            type="submit"
            className={`bg-[#f44336] text-white px-4 py-2 rounded-lg hover:bg-gray-800 w-full ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitAssignment;