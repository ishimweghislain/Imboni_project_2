import React, { useState, useEffect } from 'react';
import { FaTimes, FaFilePdf, FaFileImage } from 'react-icons/fa';
import axios from 'axios';

const Teacherviewdetails = ({ assignment, onClose }) => {
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [studentSubmissions, setStudentSubmissions] = useState([]);

  useEffect(() => {
    // Fetch students for this specific assignment
    const fetchAssignmentStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/assignments/${assignment._id}/students`);
        setStudentSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching assignment students:', error);
      }
    };

    if (assignment._id) {
      fetchAssignmentStudents();
    }
  }, [assignment]);

  const handleFilePreview = (fileUrl) => {
    // Ensure the URL is a full URL or starts with the correct base path
    const fullFileUrl = fileUrl.startsWith('http') 
      ? fileUrl 
      : `http://localhost:5000${fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`}`;

    const fileExtension = fullFileUrl.split('.').pop().toLowerCase();

    setFileError(null);

    const previewableTypes = ['pdf', 'jpg', 'jpeg', 'png'];

    if (fullFileUrl && previewableTypes.includes(fileExtension)) {
      setFilePreviewUrl(fullFileUrl);
    } else {
      setFileError('File type not supported for preview');
    }
  };

  const downloadFile = (fileUrl) => {
    const fullFileUrl = fileUrl.startsWith('http') 
      ? fileUrl 
      : `http://localhost:5000${fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`}`;

    const link = document.createElement('a');
    link.href = fullFileUrl;
    link.setAttribute('download', fileUrl.split('/').pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90%',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Close Button */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          color: '#f44336',
          fontSize: '1.5rem'
        }} onClick={onClose}>
          <FaTimes />
        </div>

        <h2 style={{ color: '#f44336', marginBottom: '20px' }}>Assignment Details</h2>

        {/* Assignment Content */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Assignment Content</h3>
          {assignment.file ? (
            <div className="flex items-center mb-4">
              {assignment.file.endsWith('.pdf') ? (
                <FaFilePdf size={50} className="mr-3" color="#FF0000" />
              ) : (
                <FaFileImage size={50} className="mr-3" color="#4CAF50" />
              )}
              <div>
                <p>{assignment.file}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleFilePreview(`/uploads/${assignment.file}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => downloadFile(`/uploads/${assignment.file}`)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>{assignment.assignmentText || 'No content provided'}</p>
          )}

          {filePreviewUrl && (
            <div
              className="mt-4"
              style={{
                height: '500px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: '#f9f9f9'
              }}
            >
              {filePreviewUrl.endsWith('.pdf') ? (
                <iframe
                  src={filePreviewUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title="File Preview"
                />
              ) : (
                <img
                  src={filePreviewUrl}
                  alt="Preview"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              )}
            </div>
          )}

          {fileError && (
            <div className="text-red-500 mt-2">{fileError}</div>
          )}
        </div>

        {/* Student Submissions */}
        <div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Student Submissions</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f1f1' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Student Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Class</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Submission Time</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentSubmissions.map((submission, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{submission.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{submission.class}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {submission.fileUrl ? submission.submissionTime : '-'}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    <button
                      style={{
                        backgroundColor: submission.fileUrl ? '#4CAF50' : '#cccccc',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: submission.fileUrl ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handleFilePreview(submission.fileUrl)}
                      disabled={!submission.fileUrl}
                    >
                      View Submission
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teacherviewdetails;