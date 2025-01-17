import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MarkDirectassessments = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [marks, setMarks] = useState('');

  // Sample student submissions (would come from backend in real app)
  const [studentSubmissions] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      studentId: 'STD001',
      className: 'L5SODB',
      questionId: 1,
      question: 'What is the purpose of cryptography in blockchain?',
      answer: 'Cryptography in blockchain serves multiple purposes including securing transactions, ensuring data integrity, and maintaining user privacy through public-private key encryption...',
      maxMarks: 5,
      submittedAt: '2:45 PM',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      studentId: 'STD002',
      className: 'L5SODB',
      questionId: 2,
      question: 'Explain the concept of distributed ledger technology.',
      answer: 'Distributed ledger technology is a decentralized database that is shared and synchronized across multiple nodes...',
      maxMarks: 8,
      submittedAt: '3:00 PM',
      status: 'pending'
    }
  ]);

  const handleSubmitMarks = () => {
    if (!marks.trim() || isNaN(marks) || marks > selectedStudent?.maxMarks) {
      alert('Please enter valid marks');
      return;
    }
    // Here you would send the marks and feedback to your backend
    alert('Marks submitted successfully!');
    setMarks('');
    setFeedback('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Marking <span className="text-[#f44336]">Blockchain</span>
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Assessment Stats</h3>
          <div className="space-y-3">
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Class: L5SODB</p>
            </div>
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Total Submissions: {studentSubmissions.length}</p>
            </div>
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Pending: {studentSubmissions.filter(s => s.status === 'pending').length}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Marking Progress</h3>
          <div className="bg-gray-700 rounded-md p-3">
            <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
              <div 
                className="bg-[#f44336] h-2 rounded-full" 
                style={{ width: '0%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">0% Complete</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/teacher-dashboard')}
          className="absolute bottom-6 left-6 w-52 bg-[#f44336] text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex ml-64">
        {/* Submissions Panel */}
        <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Submissions</h2>

          <div className="space-y-4">
            {studentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all ${
                  selectedStudent?.id === submission.id ? 'ring-2 ring-[#f44336]' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedStudent(submission)}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-[#f44336]">
                    Max marks: {submission.maxMarks}
                  </span>
                  <span className="text-sm text-gray-500">{submission.submittedAt}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{submission.studentName}</h3>
                <p className="text-sm text-gray-600 mb-2">ID: {submission.studentId}</p>
                <p className="text-gray-800 mb-2 text-sm">Q: {submission.question}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending Review
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Marking Panel */}
        <div className="w-1/2 p-6 bg-white overflow-y-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mark Submission</h2>

          {selectedStudent ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedStudent.studentName}</h3>
                    <p className="text-sm text-gray-600">Student ID: {selectedStudent.studentId}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-[#f44336]">
                    Max marks: {selectedStudent.maxMarks}
                  </span>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Question:</h4>
                  <p className="text-gray-600">{selectedStudent.question}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Student's Answer:</h4>
                  <p className="text-gray-600">{selectedStudent.answer}</p>
                </div>
              </div>

              <div>
                <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-2">
                  Assign Marks (max: {selectedStudent.maxMarks})
                </label>
                <input
                  type="number"
                  id="marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  min="0"
                  max={selectedStudent.maxMarks}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback to Student
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Provide constructive feedback..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setSelectedStudent(null);
                    setMarks('');
                    setFeedback('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleSubmitMarks}
                  className="px-4 py-2 bg-[#f44336] text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Submit Marks
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Select a student submission from the left panel to start marking</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkDirectassessments;