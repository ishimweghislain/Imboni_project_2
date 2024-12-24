import React, { useState, useEffect } from 'react';
import { FaTimes, FaFilePdf, FaFileImage } from 'react-icons/fa';
import axios from 'axios';

const Teacherviewdetails = ({ assignment, onClose }) => {
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignmentStudents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(
          `http://localhost:5000/api/assignments/${assignment._id}/students`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setStudentSubmissions(response.data.students || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching assignment students:', error);
        if (error.response?.status === 401) {
          setError('Session expired. Please log in again');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          setError('Failed to load student submissions');
        }
      } finally {
        setLoading(false);
      }
    };

    if (assignment?._id) {
      fetchAssignmentStudents();
    }
  }, [assignment]);

  const handleFilePreview = (fileUrl) => {
    if (!fileUrl) {
      setFileError('No file available for preview');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setFileError('Authentication required');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }

    const filename = fileUrl.split('\\').pop().split('/').pop();
    const fullFileUrl = `http://localhost:5000/uploads/${filename}`;
    const fileExtension = filename.split('.').pop().toLowerCase();
    const previewableTypes = ['pdf', 'jpg', 'jpeg', 'png'];

    if (previewableTypes.includes(fileExtension)) {
      setFilePreviewUrl(fullFileUrl);
      setFileError(null);
    } else {
      setFileError('File type not supported for preview');
    }
  };

  const downloadFile = async (fileUrl) => {
    if (!fileUrl) {
      setFileError('No file available for download');
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      setFileError('Authentication required');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }

    try {
      const filename = fileUrl.split('\\').pop().split('/').pop();
      const fullFileUrl = `http://localhost:5000/uploads/${filename}`;

      const response = await axios({
        url: fullFileUrl,
        method: 'GET',
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setFileError(null);
    } catch (error) {
      console.error('Download error:', error);
      if (error.response?.status === 401) {
        setFileError('Session expired. Please log in again');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setFileError('Failed to download file');
      }
    }
  };

  if (!assignment) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-red-500 text-2xl font-bold mb-6">Assignment Details</h2>

        {/* Assignment Information */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold">Course</h3>
              <p>{assignment.courseName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Deadline</h3>
              <p>{new Date(assignment.deadline).toLocaleString()}</p>
            </div>
          </div>

          {/* Assignment Content */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Assignment Content</h3>
            {assignment.file ? (
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                {assignment.file.toLowerCase().endsWith('.pdf') ? (
                  <FaFilePdf size={40} className="text-red-500" />
                ) : (
                  <FaFileImage size={40} className="text-green-500" />
                )}
                <div>
                  <p className="mb-2">{assignment.file.split('\\').pop().split('/').pop()}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFilePreview(assignment.file)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => downloadFile(assignment.file)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="p-4 bg-gray-50 rounded-lg">{assignment.assignmentText || 'No content provided'}</p>
            )}
          </div>

          {/* File Preview */}
          {filePreviewUrl && (
            <div className="mt-4 h-[500px] w-full flex justify-center items-center bg-gray-50 rounded-lg">
              {filePreviewUrl.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={filePreviewUrl}
                  className="w-full h-full rounded border-none"
                  title="File Preview"
                />
              ) : (
                <img
                  src={filePreviewUrl}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain rounded-lg"
                  onError={() => setFileError('Failed to load image')}
                />
              )}
            </div>
          )}
          {fileError && (
            <p className="text-red-500 mt-2">{fileError}</p>
          )}
        </div>

        {/* Student Submissions */}
        <div>
          <h3 className="font-semibold mb-4">Student Submissions</h3>
          {loading ? (
            <p className="text-center py-4">Loading submissions...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-4">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-4 py-2 text-left">Student Name</th>
                    <th className="border px-4 py-2 text-left">Class</th>
                    <th className="border px-4 py-2 text-left">Acronym</th>
                    <th className="border px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="border px-4 py-2 text-center">
                        No student submissions found
                      </td>
                    </tr>
                  ) : (
                    studentSubmissions.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{student.name}</td>
                        <td className="border px-4 py-2">{student.class}</td>
                        <td className="border px-4 py-2">{student.acronym}</td>
                        <td className="border px-4 py-2">
                          <span className={`px-2 py-1 rounded ${
                            student.submissionStatus === 'submitted' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.submissionStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teacherviewdetails;