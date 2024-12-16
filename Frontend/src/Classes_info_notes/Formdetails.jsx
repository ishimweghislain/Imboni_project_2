import React from 'react';

const Formdetails = ({ classDetails }) => {
  return (
    <div>
      {/* Heading for the form */}
      <h4 style={{ fontWeight: 'bold', color: '#f44336' }}>
        Course Details Form for {classDetails.level}
      </h4>
      <p>Manage course content for this class.</p>

      {/* Class Information */}
      <p><strong style={{ color: '#f44336' }}>Class Acronym:</strong> {classDetails.acronym}</p>
      <p><strong style={{ color: '#f44336' }}>Program:</strong> {classDetails.program}</p>

      {/* Total Students */}
      <p><strong style={{ color: '#f44336' }}>Total Students:</strong> {classDetails.students.length}</p>

      {/* Students Table */}
      <h4 style={{ fontWeight: 'bold', color: '#f44336' }}>Students in this class:</h4>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        border: '1px solid #ddd',
      }}>
        <thead>
          <tr style={{
            backgroundColor: '#f44336',
            color: 'white',
            fontWeight: 'bold',
          }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Student Names</th>
          </tr>
        </thead>
        <tbody>
          {classDetails.students.map((student, index) => (
            <tr key={index} style={{
              backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
              borderBottom: '1px solid #ddd',
            }}>
              <td style={{ padding: '8px' }}>{student.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons for managing course content */}
      <div style={{ marginTop: '20px' }}>
        <button
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            marginTop: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
        >
          Add Course Content
        </button>
        <button
          style={{
            backgroundColor: '#008CBA',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            marginLeft: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#008CBA'}
        >
          View Course Content
        </button>
        <button
          style={{
            backgroundColor: '#FF9800',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            marginLeft: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9800'}
        >
          Update Course Content
        </button>
      </div>
    </div>
  );
};

export default Formdetails;
