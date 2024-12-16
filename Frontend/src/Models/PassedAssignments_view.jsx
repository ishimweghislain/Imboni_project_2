import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PassedAssignmentsView = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

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

  // Inline CSS styles
  const tableStyle = {
    minWidth: '820px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    animation: 'animate-border 1s linear infinite', // Animation applied here
  };

  const rowHoverStyle = {
    backgroundColor: '#f9fafb',
  };

  const cellStyle = {
    padding: '16px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#4a4a4a',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
  };

  const animateBorderKeyframes = `
    @keyframes animate-border {
      0% {
        border-color: transparent;
      }
      50% {
        border-color: #f44336; /* You can change this color */
      }
      100% {
        border-color: transparent;
      }
    }
  `;

  return (
    <div className="space-y-6">
      {error && <p style={errorStyle}>{error}</p>}
      <style>{animateBorderKeyframes}</style> {/* Adding the keyframes to the page */}

      <div className="overflow-x-auto">
        <table style={tableStyle} className="bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th style={cellStyle} className="text-left text-sm font-medium text-black">Course Name</th>
              <th style={cellStyle} className="text-left text-sm font-medium text-black">Deadline</th>
              <th style={cellStyle} className="text-left text-sm font-medium text-black">Students</th>
              <th style={cellStyle} className="text-left text-sm font-medium text-black">Details</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">No assignments found</td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr
                  key={assignment._id}
                  style={rowHoverStyle} // Apply hover effect on rows
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td style={cellStyle}>{assignment.courseName}</td>
                  <td style={cellStyle}>{assignment.deadline}</td>
                  <td style={cellStyle}>{assignment.numStudents}</td>
                  <td style={cellStyle}>
                    <button className="bg-gray-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassedAssignmentsView;
