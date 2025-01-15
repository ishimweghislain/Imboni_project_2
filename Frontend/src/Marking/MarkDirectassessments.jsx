import React from 'react';
import { useNavigate } from 'react-router-dom';

const MarkDirectassessments = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/teacher-dashboard');
  };

  return (
    <div>
     
      <button onClick={handleBackToDashboard}>Back to Main Dashboard</button>
      <h2>Mark Direct Assessments</h2>
    </div>
  );
};

export default MarkDirectassessments;
