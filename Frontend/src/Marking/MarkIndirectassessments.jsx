import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MarkIndirectassessments = () => {
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [marks, setMarks] = useState('');
  const [rubricScores, setRubricScores] = useState({});

  // Sample assessment data (would come from backend in real app)
  const [assessmentData] = useState({
    title: "Blockchain Technologies",
    deadline: "2025-01-10T23:59:59",
    totalSubmissions: 45,
    markedSubmissions: 12,
    submissions: [
      {
        id: 1,
        studentName: "John Doe",
        studentId: "STD001",
        questionId: 1,
        question: "Explain the fundamental principles of blockchain technology and how they contribute to its security.",
        answer: "Blockchain technology is built upon several key principles that together ensure its security and reliability. First, decentralization eliminates single points of failure by distributing the ledger across multiple nodes. Second, cryptographic hashing ensures data integrity by making it computationally infeasible to alter historical records...",
        maxMarks: 10,
        status: "pending",
        submittedAt: "2025-01-08 14:30"
      },
      {
        id: 2,
        studentName: "Jane Smith",
        studentId: "STD002",
        questionId: 2,
        question: "Compare and contrast different consensus mechanisms used in blockchain systems.",
        answer: "Consensus mechanisms in blockchain systems serve as protocols for achieving agreement on the state of the network. Proof of Work (PoW), used by Bitcoin, requires miners to solve complex mathematical puzzles, ensuring security through computational work...",
        maxMarks: 12,
        status: "pending",
        submittedAt: "2025-01-09 09:15"
      }
    ],
    rubric: [
      {
        id: 1,
        criterion: "Understanding of Core Concepts",
        maxScore: 4,
        description: "Demonstrates comprehensive understanding of blockchain principles"
      },
      {
        id: 2,
        criterion: "Technical Accuracy",
        maxScore: 3,
        description: "Information provided is technically accurate and well-explained"
      },
      {
        id: 3,
        criterion: "Critical Analysis",
        maxScore: 3,
        description: "Shows depth of analysis and critical thinking"
      }
    ]
  });

  const handleRubricScoreChange = (criterionId, score) => {
    setRubricScores(prev => ({
      ...prev,
      [criterionId]: score
    }));
  };

  const calculateTotalScore = () => {
    return Object.values(rubricScores).reduce((sum, score) => sum + score, 0);
  };

  const handleSubmitMarks = () => {
    const totalScore = calculateTotalScore();
    if (totalScore > selectedSubmission?.maxMarks) {
      alert('Total marks cannot exceed maximum marks');
      return;
    }
    // Here you would send the marks, rubric scores and feedback to your backend
    alert('Marks submitted successfully!');
    setMarks('');
    setFeedback('');
    setRubricScores({});
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Marking <span className="text-[#f44336]">{assessmentData.title}</span>
        </h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Marking Progress</h3>
          <div className="space-y-3">
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Total Submissions: {assessmentData.totalSubmissions}</p>
            </div>
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Marked: {assessmentData.markedSubmissions}</p>
            </div>
            <div className="bg-gray-700 rounded-md p-3">
              <p className="text-sm">Pending: {assessmentData.totalSubmissions - assessmentData.markedSubmissions}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Completion Status</h3>
          <div className="bg-gray-700 rounded-md p-3">
            <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
              <div 
                className="bg-[#f44336] h-2 rounded-full" 
                style={{ 
                  width: `${(assessmentData.markedSubmissions / assessmentData.totalSubmissions) * 100}%` 
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">
              {Math.round((assessmentData.markedSubmissions / assessmentData.totalSubmissions) * 100)}% Complete
            </p>
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
            {assessmentData.submissions.map((submission) => (
              <div
                key={submission.id}
                className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all ${
                  selectedSubmission?.id === submission.id ? 'ring-2 ring-[#f44336]' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-[#f44336]">
                    Max marks: {submission.maxMarks}
                  </span>
                  <span className="text-sm text-gray-500">{submission.submittedAt}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{submission.studentName}</h3>
                <p className="text-sm text-gray-600 mb-2">ID: {submission.studentId}</p>
                <p className="text-gray-800 mb-2 text-sm line-clamp-2">{submission.question}</p>
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

          {selectedSubmission ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedSubmission.studentName}</h3>
                    <p className="text-sm text-gray-600">Student ID: {selectedSubmission.studentId}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-[#f44336]">
                    Max marks: {selectedSubmission.maxMarks}
                  </span>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Question:</h4>
                  <p className="text-gray-600">{selectedSubmission.question}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Student's Answer:</h4>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-gray-600 whitespace-pre-wrap">{selectedSubmission.answer}</p>
                  </div>
                </div>
              </div>

              {/* Rubric-based Marking */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-4">Marking Rubric</h3>
                <div className="space-y-4">
                  {assessmentData.rubric.map((criterion) => (
                    <div key={criterion.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700">
                          {criterion.criterion}
                          <p className="text-xs text-gray-500">{criterion.description}</p>
                        </label>
                        <select
                          value={rubricScores[criterion.id] || ''}
                          onChange={(e) => handleRubricScoreChange(criterion.id, Number(e.target.value))}
                          className="ml-4 rounded-md border border-gray-300 p-1"
                        >
                          <option value="">Score</option>
                          {[...Array(criterion.maxScore + 1)].map((_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total Score:</span>
                    <span>{calculateTotalScore()} / {selectedSubmission.maxMarks}</span>
                  </div>
                </div>
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
                  placeholder="Provide detailed feedback on the answer..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setSelectedSubmission(null);
                    setMarks('');
                    setFeedback('');
                    setRubricScores({});
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

export default MarkIndirectassessments;