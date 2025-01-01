import React, { useState, useEffect } from 'react';

const PassedAssessmentsView = () => {
  const [assessments, setAssessments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  useEffect(() => {
    // Simulate a backend fetch failure
    try {
      throw new Error("Failed to fetch assessments. This is dummy data.");
    } catch (err) {
      setError(err.message);

      // Dummy data for assessments
      setAssessments([
        { id: 1, courseName: "Math 101", totalSubmissions: 25 },
        { id: 2, courseName: "Physics 202", totalSubmissions: 18 },
        { id: 3, courseName: "Chemistry 303", totalSubmissions: 30 },
      ]);
    }
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
    textAlign: 'center',
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
        <h2 style={{ color: '#f44336', margin: 0 }}>False Data - Passed Assessments</h2>
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
              <th style={cellStyle}>Total Submissions</th>
              <th style={cellStyle}>Details</th>
            </tr>
          </thead>
          <tbody>
            {assessments.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '16px', color: '#4a4a4a' }}>
                  No assessments found
                </td>
              </tr>
            ) : (
              assessments.map((assessment) => (
                <tr
                  key={assessment.id}
                  className="hover-row"
                  style={rowHoverStyle}
                >
                  <td style={cellStyle}>{assessment.courseName}</td>
                  <td style={cellStyle}>{assessment.totalSubmissions}</td>
                  <td style={cellStyle}>
                    <button
                      onClick={() => setSelectedAssessment(assessment)}
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

      {selectedAssessment && (
        <div style={{ marginTop: '1rem', color: '#1f2937' }}>
          <h3>Details for {selectedAssessment.courseName}</h3>
          <p>Total Submissions: {selectedAssessment.totalSubmissions}</p>
          <button onClick={() => setSelectedAssessment(null)} style={buttonStyle}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PassedAssessmentsView;
