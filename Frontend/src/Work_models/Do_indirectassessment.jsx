import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Do_indirectassessment = () => {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');

  // Sample assessment data (in a real app, this would come from your backend)
  const [assessmentData] = useState({
    title: "Blockchain Technologies",
    deadline: "2025-01-10T23:59:59",
    totalMarks: 30,
    questions: [
      {
        id: 1,
        question: 'Explain the fundamental principles of blockchain technology and how they contribute to its security.',
        marks: 10,
        status: 'pending' // pending, submitted, draft
      },
      {
        id: 2,
        question: 'Compare and contrast different consensus mechanisms used in blockchain systems.',
        marks: 12,
        status: 'draft'
      },
      {
        id: 3,
        question: 'Discuss the role of cryptography in maintaining blockchain security.',
        marks: 8,
        status: 'submitted'
      }
    ]
  });

  // Calculate deadline countdown
  const calculateTimeLeft = () => {
    const deadline = new Date(assessmentData.deadline);
    const now = new Date();
    const difference = deadline - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      alert('Please write your answer before submitting.');
      return;
    }
    // Here you would send the answer to your backend
    alert('Answer submitted successfully!');
    setAnswer('');
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      draft: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Draft Saved' },
      submitted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Submitted' }
    };
    return badges[status];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 text-white fixed top-0 left-0 bottom-0 overflow-y-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Assessment of <span className="text-[#f44336]">{assessmentData.title}</span>
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-md p-3">
                <p className="text-sm">Total Questions: {assessmentData.questions.length}</p>
              </div>
              <div className="bg-gray-700 rounded-md p-3">
                <p className="text-sm">Submitted: {assessmentData.questions.filter(q => q.status === 'submitted').length}</p>
              </div>
              <div className="bg-gray-700 rounded-md p-3">
                <p className="text-sm">Total Marks: {assessmentData.totalMarks}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Deadline</h3>
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-2xl font-bold text-[#f44336]">{calculateTimeLeft()}</p>
              <p className="text-sm text-gray-400">remaining</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-[#f44336] h-2.5 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(assessmentData.questions.filter(q => q.status === 'submitted').length 
                  / assessmentData.questions.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => navigate('/student-dashboard')}
            className="w-full bg-[#f44336] text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-y-auto ml-64">
        {/* Questions Panel */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Assessment Questions</h2>
          
          <div className="space-y-4">
            {assessmentData.questions.map((q) => (
              <div
                key={q.id}
                className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all ${
                  selectedQuestion?.id === q.id ? 'ring-2 ring-[#f44336]' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedQuestion(q)}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-[#f44336]">
                    {q.marks} marks
                  </span>
                  {/* Status Badge */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(q.status).bg} ${getStatusBadge(q.status).text}`}>
                    {getStatusBadge(q.status).label}
                  </span>
                </div>
                <p className="text-gray-800">{q.question}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Panel */}
        <div className="w-1/2 p-6 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Answer</h2>
          
          {selectedQuestion ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">Question {selectedQuestion.id}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-[#f44336]">
                    {selectedQuestion.marks} marks
                  </span>
                </div>
                <p className="text-gray-600">{selectedQuestion.question}</p>
              </div>

              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Type your answer below
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full h-48 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Start typing your answer here..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Characters: {answer.length}
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setAnswer('')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={() => alert('Draft saved successfully!')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  className="px-4 py-2 bg-[#f44336] text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Select a question from the left panel to start answering</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Do_indirectassessment;
