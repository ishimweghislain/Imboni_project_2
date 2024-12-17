import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formdetails from '../Classes_info_notes/Formdetails'; // Import Formdetails component

const Myclasses_view = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);  // State to control modal visibility
  const [selectedClass, setSelectedClass] = useState(null);  // Store selected class data

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

  const openModal = async (classItem) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/classes/${classItem.level}`);
      setSelectedClass(response.data);
      setModalOpen(true);  // Open the modal when a class is selected
    } catch (err) {
      setError('Failed to fetch class details.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);  // Close the modal
    setSelectedClass(null); // Reset selected class
  };

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
                  <HoverButton classItem={classItem} openModal={openModal} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
              onClick={closeModal}
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

const HoverButton = ({ classItem, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: isHovered ? '#4a5568' : '#f44336', // Change color on hover
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <button
      style={buttonStyle}
      onClick={() => openModal(classItem)}
      onMouseEnter={() => setIsHovered(true)} // Set hover state
      onMouseLeave={() => setIsHovered(false)} // Reset hover state
    >
      View
    </button>
  );
};

export default Myclasses_view;
