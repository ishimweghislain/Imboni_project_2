import React from 'react';

const Formdetails = ({ classDetails }) => {
  return (
    <div>
      <h4 style={{ fontWeight: 'bold', color: '#f44336' }}>
        Course Details Form for {classDetails.level}
      </h4>
      <p>Manage course content for this class.</p>

      <p><strong style={{ color: '#f44336' }}>Class Acronym:</strong> {classDetails.acronym}</p>
      <p><strong style={{ color: '#f44336' }}>Program:</strong> {classDetails.program}</p>
      <p><strong style={{ color: '#f44336' }}>Total Students:</strong> {classDetails.students.length}</p>

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
    </div>
  );
};

export default Formdetails;
