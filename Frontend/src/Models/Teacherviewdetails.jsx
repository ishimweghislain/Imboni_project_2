import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import close icon

const Teacherviewdetails = ({ assignment, onClose }) => {
  const [studentSubmissions] = useState([
    {
      name: 'ISHIMWE GHISLAIN',
      submissionTime: '2024-01-15 14:30',
      fileUrl: assignment.file ? `/uploads/${assignment.file}` : null,
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
    maxWidth: '600px',
    maxHeight: '90%',
    overflowY: 'auto',
    position: 'relative', // Ensure positioning for the close icon
  };

  const closeIconStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    color: '#f44336',
    fontSize: '1.5rem',
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        {/* Close Icon */}
        <FaTimes style={closeIconStyle} onClick={onClose} />

        {/* Assignment Details */}
        <h2 style={{ color: '#f44336', marginBottom: '20px' }}>Assignment Details</h2>

        {/* Assignment Content */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Assignment Content</h3>
          {assignment.file ? (
            <div>
              {assignment.file.match(/\.(jpg|jpeg|png|gif|bmp)$/i) ? (
               <img
               src={`http://localhost:5000/uploads/${assignment.file}`}
               alt="Assignment File"
               style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
               onClick={(e) => {
                 const newWindow = window.open('');
                 newWindow.document.write(
                   `<img src="${e.target.src}" style="max-width: 100%; max-height: 100vh;">`
                 );
               }}
             />
             
              ) : (
                <a
                  href={`/uploads/${assignment.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'blue', textDecoration: 'underline' }}
                >
                  View Attached File
                </a>
              )}
            </div>
          ) : (
            <p>{assignment.assignmentText || 'No content provided'}</p>
          )}
        </div>

        {/* Student Submissions */}
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
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#1f2937';
                        e.target.textContent = 'View';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#f44336';
                        e.target.textContent = 'View';
                      }}
                    >
                      View
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
