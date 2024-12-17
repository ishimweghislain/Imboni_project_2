import React, { useState } from 'react';
import { FaTimes, FaFilePdf, FaFileImage } from 'react-icons/fa';

const Teacherviewdetails = ({ assignment, onClose }) => {
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [fileError, setFileError] = useState(null);

  // Mock student submissions
  const [studentSubmissions] = useState([
    {
      name: 'ISHIMWE GHISLAIN',
      submissionTime: '2024-01-15 14:30',
      fileUrl: assignment.file ? `/uploads/${assignment.file}` : null,
    },
    {
      name: 'JOHN DOE',
      submissionTime: '2024-01-16 10:15',
      fileUrl: assignment.file ? `/uploads/${assignment.file}` : null,
    },
    {
      name: 'JANE SMITH',
      submissionTime: '2024-01-17 09:45',
      fileUrl: null,
    },
  ]);

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90%',
    overflowY: 'auto',
    position: 'relative',
  };

  const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    color: '#f44336',
    fontSize: '1.5rem',
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const iconProps = { size: 50, className: 'mr-3' };

    const iconMap = {
      'pdf': <FaFilePdf color="#FF0000" {...iconProps} />,
      'jpg': <FaFileImage color="#4CAF50" {...iconProps} />,
      'jpeg': <FaFileImage color="#4CAF50" {...iconProps} />,
      'png': <FaFileImage color="#4CAF50" {...iconProps} />,
    };

    return iconMap[ext] || null;
  };

  const handleFilePreview = (file) => {
    const fileUrl = `http://localhost:5000/uploads/${file}`;
    const fileExtension = file.split('.').pop().toLowerCase();

    setFileError(null);

    const previewableTypes = ['pdf', 'jpg', 'jpeg', 'png'];

    if (previewableTypes.includes(fileExtension)) {
      setFilePreviewUrl(fileUrl);
    } else {
      setFileError('File type not supported for preview');
    }
  };

  const downloadFile = (file) => {
    const fileUrl = `http://localhost:5000/uploads/${file}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <FaTimes style={closeIconStyle} onClick={onClose} />

        <h2 style={{ color: '#f44336', marginBottom: '20px' }}>Assignment Details</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Assignment Content</h3>
          {assignment.file ? (
            <div className="flex items-center mb-4">
              {getFileIcon(assignment.file)}
              <div>
                <p>{assignment.file}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleFilePreview(assignment.file)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => downloadFile(assignment.file)}
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
                backgroundColor: '#f9f9f9',
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
                    borderRadius: '8px',
                  }}
                />
              )}
            </div>
          )}

          {fileError && (
            <div className="text-red-500 mt-2">{fileError}</div>
          )}
        </div>

        <div>
          <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Student Submissions</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f1f1' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Student Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Submission Time</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentSubmissions.map((submission, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{submission.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{submission.submissionTime}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    {submission.fileUrl ? (
                      <button
                        style={{
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                        onClick={() => handleFilePreview(assignment.file)}
                      >
                        View Submission
                      </button>
                    ) : (
                      <span style={{ color: 'gray' }}>No File Submitted</span>
                    )}
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
