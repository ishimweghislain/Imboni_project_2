import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Teachersdashboard from '../Dashboards/Teachersdashboard'; // Importing the Teachersdashboard

const Direct = () => {
  const [showQuickAssessment, setShowQuickAssessment] = useState(false);
  const [questions, setQuestions] = useState([]); // State to store the questions and marks
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentMarks, setCurrentMarks] = useState('');
  const [showMarksInput, setShowMarksInput] = useState(false); // To toggle the input for marks
  const navigate = useNavigate(); // Hook to navigate to another route

  // Handle back button click to switch to Teachersdashboard
  const handleBack = () => {
    navigate('/teacher-dashboard'); // Navigate to the teacher dashboard page
  };

  // Handle question submission
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion.trim() === '') return;
    setShowMarksInput(true); // Show marks input after submitting a question
  };

  // Handle marks submission
  const handleMarksSubmit = (e) => {
    e.preventDefault();
    if (currentMarks.trim() === '') return;

    // Add the question and marks to the list, with the latest question at the top
    setQuestions([
      { question: currentQuestion, marks: currentMarks, views: 4, answers: 6 },
      ...questions,
    ]);

    // Reset inputs
    setCurrentQuestion('');
    setCurrentMarks('');
    setShowMarksInput(false); // Hide the marks input after submission
  };

  // Handle finish assessment
  const handleFinishAssessment = () => {
    alert('Assessment finished!');
    // Logic to handle finish assessment (e.g., submitting results or logging out)
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <aside className="w-1/4 bg-gray-800 text-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          Assessment of <span className="text-[#f44336]">Blockchain</span>
        </h2>

    
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Students in the Assessment</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600">
              AHIMBAZWE ANGELOT - L5SODB
            </li>
            <li className="p-2 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600">
              ISHMWE GHISLAIN - L5SODA
            </li>
            <li className="p-2 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600">
              KAZITUNGA EMMANUEL - L5CSA
            </li>
          </ul>
        </div>

       
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Requests</h3>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-700 rounded-md">KING - L5SODB</li>
            <li className="p-2 bg-gray-700 rounded-md">JAIRUS - L5SODB</li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center p-2 bg-gray-700 rounded-md">
              <span>12 submissions from L5SODB</span>
              <button
                className="bg-blue-500 text-white text-sm px-2 py-1 rounded-md hover:bg-blue-600"
                onClick={() => alert('Viewing submissions from L5SODB')}
              >
                View
              </button>
            </li>
          </ul>
        </div>
      </aside>

    
      <main className="flex-1 p-8 overflow-y-auto">
       
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center relative">
            
            <img
              src="/mama.png"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white mr-3"
            />
            
            <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-[165px] border-2 border-white"></div>
            <h1 className="text-3xl font-semibold text-gray-700">Hello Linda</h1>
          </div>
          <button
            onClick={handleBack}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Back to main dashboard
          </button>
        </header>

        {/* Welcome Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Assessment</h2>
          <p className="text-gray-600">
            Write your questions carefully and send them for students to access them!!
          </p>
        </div>

        {/* Submitted Questions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Submitted Questions</h2>
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-gray-700 text-white p-4 mb-4 rounded-md animate__animated animate__fadeIn"
            >
              <div className="flex justify-between items-center">
                <p>{q.question}</p>
                <div className="text-gray-400 text-sm flex items-center">
                  <span>{q.views} viewed, {q.answers} answered</span>
                  <button className="ml-2 text-blue-500 hover:text-blue-700">
                    <i className="fas fa-eye"></i> View
                  </button>
                </div>
              </div>
              <p className="text-gray-400">Marks: {q.marks}</p>
            </div>
          ))}
        </div>

        {/* Teacher's Question Panel */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Teacher's Question Panel</h2>
          <form onSubmit={showMarksInput ? handleMarksSubmit : handleQuestionSubmit}>
            <div className="mb-4">
              <label htmlFor="question" className="block text-gray-600 mb-2">
                Enter a Question
              </label>
              <textarea
                id="question"
                rows="4"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {showMarksInput ? (
              <div className="mb-4">
                <label htmlFor="marks" className="block text-gray-600 mb-2">
                  Enter Marks
                </label>
                <input
                  type="number"
                  id="marks"
                  value={currentMarks}
                  onChange={(e) => setCurrentMarks(e.target.value)}
                  className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            ) : null}

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {showMarksInput ? 'Submit Marks' : 'Send Question'}
              </button>

              {/* Finish Assessment Button */}
              <button
                type="button"
                onClick={handleFinishAssessment}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Finish Assessment
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Direct;
