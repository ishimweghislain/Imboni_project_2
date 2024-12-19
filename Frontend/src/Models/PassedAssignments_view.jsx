import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Teacherviewdetails from '../Models/Teacherviewdetails';

const PassedAssignmentsView = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchAssignments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/assignments');
      setAssignments(response.data);
      setLastUpdate(new Date());
      setError(null);
    } catch (error) {
      setError('Failed to fetch assignments. ' + (error.response?.data?.message || error.message));
      console.error('Error fetching assignments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
    
    // Set up polling every 30 seconds
    const pollInterval = setInterval(fetchAssignments, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(pollInterval);
  }, [fetchAssignments]);

  const handleManualRefresh = () => {
    fetchAssignments();
  };

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
    padding: '8px',
    marginBottom: '8px',
    backgroundColor: '#fee2e2',
    borderRadius: '4px',
  };

  const buttonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ color: '#f44336', margin: 0 }}>Passed Assignments</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {lastUpdate && (
            <span style={{ fontSize: '12px', color: '#666' }}>
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={handleManualRefresh}
            style={{
              ...buttonStyle,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      
      {error && <div style={errorStyle}>{error}</div>}

      <style>{animateBorderKeyframes}</style>
      <style>
        {`
          .scrollable-container::-webkit-scrollbar {
            display: none;
          }
          
          .hover-row:hover {
            background-color: #f9fafb;
          }
          
          .button-hover:hover {
            background-color: #1f2937 !important;
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
                  {isLoading ? 'Loading assignments...' : 'No assignments found'}
                </td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr
                  key={assignment._id}
                  className="hover-row"
                  style={rowHoverStyle}
                >
                  <td style={cellStyle}>{assignment.courseName}</td>
                  <td style={cellStyle}>
                    {new Date(assignment.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td style={cellStyle}>{assignment.numStudents}</td>
                  <td style={{ ...cellStyle, textAlign: 'center' }}>
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="button-hover"
                      style={buttonStyle}
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