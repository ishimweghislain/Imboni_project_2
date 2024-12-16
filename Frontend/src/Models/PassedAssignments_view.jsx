import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PassedAssignmentsView = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/assignments');
        setAssignments(response.data);
      } catch (error) {
        setError('Failed to fetch assignments.');
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Passed Assignments</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Course Name</th>
              <th className="px-4 py-2 border-b">Deadline</th>
              <th className="px-4 py-2 border-b">Students</th>
              <th className="px-4 py-2 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No assignments found</td>
              </tr>
            ) : (
              assignments.map((assignment) => (
                <tr key={assignment._id}>
                  <td className="px-4 py-2 border-b">{assignment.courseName}</td>
                  <td className="px-4 py-2 border-b">{assignment.deadline}</td>
                  <td className="px-4 py-2 border-b">{assignment.numStudents}</td>
                  <td className="px-4 py-2 border-b">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassedAssignmentsView;
