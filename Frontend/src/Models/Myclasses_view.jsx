import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaUpload, FaSearch, FaEye } from 'react-icons/fa';  // Added FaEye for View action
import Formdetails from '../Classes_info_notes/Formdetails'; // Import Formdetails component

const Myclasses_view = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);  // State to control modal visibility
  const [selectedClass, setSelectedClass] = useState(null);  // Store selected class data
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchClasses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/classes');
      
      // Sorting classes by program and level
      const sortedClasses = response.data.sort((a, b) => {
        if (a.program === b.program) {
          return a.level.localeCompare(b.level);
        }
        return a.program.localeCompare(b.program);
      });

      setClasses(sortedClasses);  // Update state with sorted classes
      setLastUpdate(new Date());
      setError(null);
    } catch (error) {
      setError('Failed to fetch classes. ' + (error.response?.data?.message || error.message));
      console.error('Error fetching classes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
    
    // Set up polling every 30 seconds
    const pollInterval = setInterval(fetchClasses, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(pollInterval);
  }, [fetchClasses]);

  const handleManualRefresh = () => {
    fetchClasses();
  };

  const containerStyle = {
    width: '800px',
    height: '450px',  // Fixed height like PassedAssignmentsView
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem',
    color: '#1f2937',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const tableContainerStyle = {
    overflowY: 'auto',
    height: '370px',  // Make the table scrollable inside this container
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    animation: 'animate-border 1s linear infinite',  // Redline animation for border
  };

  const cellStyle = {
    padding: '16px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#4a4a4a',
    textAlign: 'center', // Added center alignment for table cell content
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
    padding: '8px 12px', // Slightly reduced padding to make the buttons more compact
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100px', // Reduced min width to make them compact
    fontSize: '12px',  // Reduced font size
    margin: '4px', // Spacing between buttons
    transition: 'background-color 0.3s',
  };

  const buttonContainerStyle = {
    display: 'flex', 
    justifyContent: 'space-between',  // Ensures buttons are aligned in a row
    gap: '8px', // Provides some spacing between buttons
  };

  const buttonIconStyle = {
    marginRight: '8px',  // Space between icon and text
  };

  const buttonHoverStyle = {
    backgroundColor: '#2d3748',  // Dark gray background when hovering
  };

  const animateBorderKeyframes = `@keyframes animate-border {
    0% { border-color: transparent; }
    50% { border-color: #f44336; }
    100% { border-color: transparent; }
  }`;

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ color: '#f44336', margin: 0 }}>My Classes</h2>
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

      <div style={tableContainerStyle} className="scrollable-container">
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#f1f1f1' }}>
              <th style={cellStyle}>Level</th>
              <th style={cellStyle}>Acronym</th>
              <th style={cellStyle}>Program</th>
              <th style={cellStyle}>Total Students</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '16px', color: '#4a4a4a' }}>
                  {isLoading ? 'Loading classes...' : 'No classes found'}
                </td>
              </tr>
            ) : (
              classes.map((classItem, index) => (
                <tr
                  key={index}
                  style={rowHoverStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <td style={cellStyle}>{classItem.level}</td>
                  <td style={cellStyle}>{classItem.acronym || 'N/A'}</td>
                  <td style={cellStyle}>{classItem.program || 'N/A'}</td>
                  <td style={cellStyle}>{classItem.totalstudents}</td>
                  <td style={cellStyle}>
                    <div style={buttonContainerStyle}>
                      {/* View button */}
                      <button
                        style={buttonStyle}
                        onClick={() => {
                          setSelectedClass(classItem);
                          setModalOpen(true);
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d3748')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
                      >
                        <FaEye style={buttonIconStyle} />
                        View
                      </button>

                      {/* Upload button */}
                      <button
                        style={buttonStyle}
                        onClick={() => console.log('Upload for class', classItem)}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d3748')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
                      >
                        <FaUpload style={buttonIconStyle} />
                        Upload
                      </button>

                      {/* Update button */}
                      <button
                        style={buttonStyle}
                        onClick={() => console.log('Update class', classItem)}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d3748')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
                      >
                        <FaSearch style={buttonIconStyle} />
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying class details */}
      {modalOpen && selectedClass && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '100%',
            position: 'relative',
          }}>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#f44336',
              }}
            >
              ❌
            </button>
            <Formdetails classDetails={selectedClass} /> {/* Pass class details to Formdetails */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Myclasses_view;
