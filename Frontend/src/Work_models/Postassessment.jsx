import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; 

const Postassessment = ({ onClose }) => {
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState('');
  const [questionsMarks, setQuestionsMarks] = useState([]);
  const [questionsText, setQuestionsText] = useState([]);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleMarksChange = (index, value) => {
    const updatedMarks = [...questionsMarks];
    updatedMarks[index] = value;
    setQuestionsMarks(updatedMarks);
  };

  const handleQuestionTextChange = (index, value) => {
    const updatedText = [...questionsText];
    updatedText[index] = value;
    setQuestionsText(updatedText);
  };

  const validateForm = () => {
    const sum = questionsMarks.reduce((acc, curr) => acc + parseInt(curr || 0), 0);
    if (sum !== parseInt(totalMarks)) {
      setIsValid(false);
      setError(`Total marks do not match the sum of question marks.`);
    } else {
      setIsValid(true);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mt-10">
      <div className="bg-white rounded-lg p-6 w-[800px] max-w-full h-[90vh] relative overflow-auto shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <AiOutlineClose />
        </button>

        {/* Modal Heading */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Prepare Assessment</h2>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Assessment Title */}
          <div>
            <label htmlFor="assessmentTitle" className="block text-sm font-medium text-gray-700">
              <span>*</span> Assessment Title
            </label>
            <input
              type="text"
              id="assessmentTitle"
              value={assessmentTitle}
              onChange={(e) => setAssessmentTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
            />
          </div>

          {/* Total Marks */}
          <div>
            <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700">
              <span>*</span> Total Marks
            </label>
            <input
              type="number"
              id="totalMarks"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
            />
          </div>

          {/* Number of Questions */}
          <div>
            <label htmlFor="numOfQuestions" className="block text-sm font-medium text-gray-700">
              <span>*</span> Number of Questions
            </label>
            <input
              type="number"
              id="numOfQuestions"
              value={numOfQuestions}
              onChange={(e) => {
                setNumOfQuestions(e.target.value);
                setQuestionsMarks(new Array(parseInt(e.target.value) || 0).fill(''));
                setQuestionsText(new Array(parseInt(e.target.value) || 0).fill(''));
              }}
              required
              className="text-gray-800 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Question Texts and Marks */}
          {Array.from({ length: numOfQuestions }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Question {index + 1}</label>
                <textarea
                  value={questionsText[index] || ''}
                  onChange={(e) => handleQuestionTextChange(index, e.target.value)}
                  placeholder={`Enter question ${index + 1}`}
                  required
                  className="text-gray-800 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marks for Question {index + 1}
                </label>
                <input
                  type="number"
                  value={questionsMarks[index] || ''}
                  onChange={(e) => handleMarksChange(index, e.target.value)}
                  required
                  className="text-gray-800 mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          {/* Error Message */}
          {!isValid && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-[#f44336] text-white py-2 rounded-md hover:bg-gray-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Postassessment;
