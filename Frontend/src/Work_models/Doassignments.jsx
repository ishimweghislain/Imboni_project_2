import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaSearch } from 'react-icons/fa';

const Doassignment = () => {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [assignmentData] = useState({
    title: "Artificial Intelligence",
    deadline: "2025-02-15T23:59:59",
    totalMarks: 40,
    questions: [
      {
        id: 1,
        question: 'Describe the main differences between supervised and unsupervised learning.',
        marks: 10,
        status: 'pending'
      },
      {
        id: 2,
        question: 'Explain the concept of neural networks and their importance in AI.',
        marks: 15,
        status: 'draft'
      },
      {
        id: 3,
        question: 'Discuss the ethical implications of AI in modern society.',
        marks: 15,
        status: 'submitted'
      }
    ]
  });

  const colleagues = [
    { name: 'Alice', profilePic: '' },
    { name: 'Bob', profilePic: '' },
    { name: 'Charlie', profilePic: '' }
  ];

  const filteredColleagues = colleagues.filter(colleague =>
    colleague.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTimeLeft = () => {
    const deadline = new Date(assignmentData.deadline);
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
    alert('Answer submitted successfully!');
    setAnswer('');
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages((prev) => ({
        ...prev,
        [currentChat]: [...(prev[currentChat] || []), { sender: 'You', text: messageInput }]
      }));
      setMessageInput('');
    }
  };

  const handleCloseChat = () => {
    setCurrentChat(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white fixed top-0 left-0 bottom-0 overflow-y-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Assignment of <span className="text-[#f44336]">{assignmentData.title}</span>
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-md p-3">
                <p className="text-sm">Total Questions: {assignmentData.questions.length}</p>
              </div>
              <div className="bg-gray-700 rounded-md p-3">
                <p className="text-sm">Submitted: {assignmentData.questions.filter(q => q.status === 'submitted').length}</p>
              </div>
              <div className="bg-gray-700 rounded-md p-3">
                <p className="text-sm">Total Marks: {assignmentData.totalMarks}</p>
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
                  width: `${(assignmentData.questions.filter(q => q.status === 'submitted').length / assignmentData.questions.length) * 100}%`
                }}
              ></div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">Discuss with Colleagues with same assignment</h3>
          <div className="mb-4 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500"
              placeholder="Search colleagues..."
            />
          </div>
          <ul className="space-y-3">
            {filteredColleagues.map((colleague) => (
              <li
                key={colleague.name}
                onClick={() => setCurrentChat(colleague.name)}
                className={`cursor-pointer p-3 bg-gray-700 rounded-md flex items-center space-x-3 ${currentChat === colleague.name ? 'bg-gray-600' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
                  {colleague.profilePic ? (
                    <img src={colleague.profilePic} alt={colleague.name} className="w-full h-full rounded-full" />
                  ) : (
                    <span className="text-xl text-white">{colleague.name.charAt(0)}</span>
                  )}
                </div>
                <span>{colleague.name}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate('/student-dashboard')}
            className="w-full bg-[#f44336] text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors mt-6"
          >
            Back to Dashboard
          </button>
        </div>
      </aside>

      <div className="flex-1 flex overflow-y-auto ml-64">
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Assignment Questions</h2>
          <div className="space-y-4">
            {assignmentData.questions.map((q) => (
              <div
                key={q.id}
                className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all ${selectedQuestion?.id === q.id ? 'ring-2 ring-[#f44336]' : 'hover:shadow-md'}`}
                onClick={() => setSelectedQuestion(q)}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-[#f44336]">{q.marks} marks</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${q.status === 'submitted' ? 'green' : 'yellow'}-100 text-${q.status === 'submitted' ? 'green' : 'yellow'}-800`}>{q.status}</span>
                </div>
                <p className="text-gray-800">{q.question}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 p-6 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Answer</h2>
          {selectedQuestion ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">Question {selectedQuestion.id}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-[#f44336]">{selectedQuestion.marks} marks</span>
                </div>
                <p className="text-gray-600">{selectedQuestion.question}</p>
              </div>

              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">Type your answer below</label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full h-48 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Start typing your answer here..."
                />
                <p className="mt-2 text-sm text-gray-500">Characters: {answer.length}</p>
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

      {currentChat && (
        <div className="fixed bottom-0 right-0 w-1/3 bg-white border-l border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{`Chat with ${currentChat}`}</h3>
            <button onClick={handleCloseChat} className="text-gray-500 hover:text-red-500">
              <FaTimes />
            </button>
          </div>
          <div className="h-64 overflow-y-auto border p-3 mb-4">
            {messages[currentChat]?.map((msg, index) => (
              <div key={index} className="mb-3">
                <strong>{msg.sender}:</strong> <span>{msg.text}</span>
              </div>
            )) || <p>No messages yet.</p>}
          </div>
          <div className="flex">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Type a message"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-[#f44336] text-white rounded-r-md hover:bg-red-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doassignment;
