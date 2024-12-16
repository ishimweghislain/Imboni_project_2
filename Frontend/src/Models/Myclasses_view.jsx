import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Myclasses_view = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/classes');
        setClasses(response.data);
      } catch (err) {
        setError('Failed to fetch classes. Please try again later.');
      }
    };

    fetchClasses();
  }, []);

  const containerStyle = {
    width: '800px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1rem',
    color: '#1f2937',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '2rem auto',
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
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '14px',
    color: '#4a4a4a',
  };

  const rowHoverStyle = {
    backgroundColor: '#f9fafb',
  };

  const buttonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#f44336', textAlign: 'center', marginBottom: '1rem' }}>
        My Classes
      </h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: '#f1f1f1' }}>
            <th style={cellStyle}>Level</th>
            <th style={cellStyle}>Acronym</th>
            <th style={cellStyle}>Total Students</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ ...cellStyle, textAlign: 'center' }}>
                No classes found
              </td>
            </tr>
          ) : (
            classes.map((classItem, index) => (
              <tr
                key={index}
                style={rowHoverStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#f9fafb')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '')
                }
              >
                <td style={cellStyle}>{classItem.level}</td>
                <td style={cellStyle}>{classItem.acronym || 'N/A'}</td>
                <td style={cellStyle}>{classItem.totalstudents}</td>
                <td style={cellStyle}>
                  <button
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#1f2937')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#f44336')}
                    onClick={() => alert(`Viewing details for ${classItem.level}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Myclasses_view;
