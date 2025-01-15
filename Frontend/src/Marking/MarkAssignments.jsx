import React from 'react';

const MarkingAssignments = () => {
  const handleBackToDashboard = () => {
    window.location.href = 'http://localhost:5173/teacher-dashboard';  // Redirect to dashboard
  };

  return (
    <div>
         <button onClick={handleBackToDashboard}>
        Back to Main Dashboard
      </button>
      <h1>Marking Assignments</h1>
      
      
     
    </div>
  );
};

export default MarkingAssignments;
