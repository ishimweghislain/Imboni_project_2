import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Do_directassessment = () => {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');

  // Sample real-time questions (in a real app, this would come from your backend)
  const [realtimeQuestions] = useState([
    { 
      id: 1, 
      question: 'What is the purpose of cryptography in blockchain?', 
      marks: 5, 
      timestamp: '2:30 PM',
      status: 'new'
    },
    { 
      id: 2, 
      question: 'Explain the concept of distributed ledger technology.', 
      marks: 8, 
      timestamp: '2:35 PM',
      status: 'new'
    }
  ]);

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      alert('Please write your answer before submitting.');
      return;
    }
    // Here you would send the answer to your backend
    alert('Answer submitted successfully!');
    setAnswer('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Assessment of <span className="text-[#f44336]">Blockchain</span>
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Assessment Details</h3>
          <div className="space-y-3">
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Your Class: L5SODB</p>
            </div>
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Total Passed Questions: {realtimeQuestions.length}</p>
            </div>
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Answered: 0/{realtimeQuestions.length}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Time Remaining</h3>
          <div className="bg-gray-700 rounded-md p-3">
            <p className="text-2xl font-bold text-[#f44336]">45:00</p>
            <p className="text-sm text-gray-400">minutes</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/student-dashboard')}
          className="absolute bottom-6 left-6 w-52 bg-[#f44336] text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex ml-64">
        {/* Questions Panel */}
        <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Live Questions</h2>

          {realtimeQuestions.length > 0 ? (
            <div className="space-y-4">
              {realtimeQuestions.map((q) => (
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
                    <span className="text-sm text-gray-500">{q.timestamp}</span>
                  </div>
                  <p className="text-gray-800 mb-2">{q.question}</p>
                  {q.status === 'new' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No questions yet</h3>
              <p className="mt-1 text-gray-500">Wait for your teacher to send questions</p>
            </div>
          )}
        </div>

        {/* Answer Panel */}
        <div className="w-1/2 p-6 bg-white overflow-y-auto">
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
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setSelectedQuestion(null);
                    setAnswer('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear
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

export default Do_directassessment;
