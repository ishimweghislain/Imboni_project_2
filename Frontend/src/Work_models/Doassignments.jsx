import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaSearch, FaDownload, FaFile } from 'react-icons/fa';
import SubmitAssignment from '../Work_models/Submitassignment';

const Doassignment = () => {
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const [assignmentData] = useState({
    title: "React Javascript",
    deadline: "2025-02-15T23:59:59",
    totalMarks: 40,
    files: [
      {
        id: 1,
        name: 'Assignment_Brief.pdf',
        size: '2.5 MB',
        type: 'PDF',
        status: 'not_started'
      },
      {
        id: 2,
        name: 'Research_Paper.pdf',
        size: '1.8 MB',
        type: 'PDF',
        status: 'downloaded'
      },
      {
        id: 3,
        name: 'Dataset.csv',
        size: '500 KB',
        type: 'CSV',
        status: 'submitted'
      }
    ]
  });

  const colleagues = [
    { name: 'Alice', profilePic: '', status: 'online' },
    { name: 'Bob', profilePic: '', status: 'offline' },
    { name: 'Charlie', profilePic: '', status: 'online' }
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

  const handleDownload = (fileId) => {
    alert(`Downloading file ${fileId}`);
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-800 text-white fixed top-0 left-0 bottom-0 overflow-y-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Assignment: <span className="text-[#f44336]">{assignmentData.title}</span>
          </h2>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Assignment Status</h3>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-md p-3">
                <p className="text-sm">Total Files: {assignmentData.files.length}</p>
              </div>
              <div className="bg-gray-700 rounded-md p-3">
                <p className="text-sm">Submitted: {assignmentData.files.filter(f => f.status === 'submitted').length}</p>
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

          <button
            onClick={() => navigate('/student-dashboard')}
            className="w-full bg-[#f44336] text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors mt-6"
          >
            Back to Dashboard
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex ml-64">
        {/* File Download Section */}
        <div className="w-1/2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Assignment Files</h2>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Submit Assignment
            </button>
          </div>
          <div className="space-y-4">
            {assignmentData.files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaFile className="text-gray-500 text-xl" />
                    <div>
                      <p className="font-medium text-gray-800">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      file.status === 'submitted' ? 'bg-green-100 text-green-800' :
                      file.status === 'downloaded' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {file.status.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => handleDownload(file.id)}
                      className="p-2 text-gray-500 hover:text-[#f44336] transition-colors"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-1/2 p-6 bg-white border-l border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Collaborate with Colleagues</h2>
          <div className="mb-4 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Search colleagues..."
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredColleagues.map((colleague) => (
              <div
                key={colleague.name}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  currentChat === colleague.name ? 'border-[#f44336] bg-red-50' : 'hover:border-gray-400'
                }`}
                onClick={() => setCurrentChat(colleague.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
                      <span className="text-xl text-white">{colleague.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{colleague.name}</p>
                      <p className="text-sm text-gray-500">{colleague.status}</p>
                    </div>
                  </div>
                  {messages[colleague.name]?.length > 0 && (
                    <span className="bg-[#f44336] text-white text-xs px-2 py-1 rounded-full">
                      {messages[colleague.name].length}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {currentChat && (
        <div className="fixed bottom-0 right-0 w-1/3 bg-white border-l border-t border-gray-200 shadow-lg">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                  <span className="text-sm text-white">{currentChat.charAt(0)}</span>
                </div>
                <h3 className="font-semibold">{currentChat}</h3>
              </div>
              <button onClick={() => setCurrentChat(null)} className="text-gray-500 hover:text-red-500">
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="h-96 overflow-y-auto p-4">
            {messages[currentChat]?.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.sender === 'You' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-xs p-3 rounded-lg ${
                  msg.sender === 'You' ? 'bg-[#f44336] text-white' : 'bg-gray-100'
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            )) || (
              <p className="text-center text-gray-500">Start a conversation</p>
            )}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-[#f44336] text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Assignment Modal */}
      {isSubmitModalOpen && (
        <SubmitAssignment onClose={() => setIsSubmitModalOpen(false)} />
      )}
    </div>
  );
};

export default Doassignment;