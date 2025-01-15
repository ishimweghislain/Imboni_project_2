import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarkIndirectassessments = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/teacher-dashboard');
  };

  return (
    <div>
      
      <button onClick={handleBackToDashboard}>Back to Main Dashboard</button>
      <h2>Mark Indirect Assessments</h2>
    </div>
  );
};

export default MarkIndirectassessments;
