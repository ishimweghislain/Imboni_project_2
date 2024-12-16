import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Teacherviewdetails from '../Models/Teacherviewdetails';

const PassedAssignmentsView = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assignments');
        setAssignments(response.data);
      } catch (error) {
        setError('Failed to fetch assignments.');
      }
    };

    fetchAssignments();
  }, []);

  const containerStyle = {
    width: '800px',
    height: '450px',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem',
    color: '#1f2937',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const tableContainerStyle = {
    overflowY: 'auto',
    height: '380px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    animation: 'animate-border 1s linear infinite',
  };

  const cellStyle = {
    padding: '16px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#4a4a4a',
  };

  const rowHoverStyle = {
    backgroundColor: '#f9fafb',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
  };

  const animateBorderKeyframes = `
    @keyframes animate-border {
      0% { border-color: transparent; }
      50% { border-color: #f44336; }
      100% { border-color: transparent; }
    }
  `;

  return (
    <div style={containerStyle}>
     <h2 style={{ color: '#f44336', textAlign: 'center', marginBottom: '1rem' }}>
        Passed Assignments
      </h2>
      
      {error && <p style={errorStyle}>{error}</p>}

      <style>{animateBorderKeyframes}</style>
      <style>
        {`
          .scrollable-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div style={tableContainerStyle} className="scrollable-container">
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#f1f1f1' }}>
              <th style={cellStyle}>Course Name</th>
              <th style={cellStyle}>Deadline</th>
              <th style={cellStyle}>Students</th>
              <th style={cellStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '16px', color: '#4a4a4a' }}>
                  No assignments found
                </td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr
                  key={assignment._id}
                  style={rowHoverStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <td style={cellStyle}>{assignment.courseName}</td>
                  <td style={cellStyle}>{assignment.deadline}</td>
                  <td style={cellStyle}>{assignment.numStudents}</td>
                  <td style={{ ...cellStyle, textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#1f2937')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = '#f44336')}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedAssignment && (
        <Teacherviewdetails
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
};

export default PassedAssignmentsView;
