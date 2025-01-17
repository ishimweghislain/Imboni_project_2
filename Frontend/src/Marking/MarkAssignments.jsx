import React, { useState, useEffect } from 'react';

const MarkingAssignments = () => {
  // Dummy data for immediate testing
  const dummyAssignments = [
    {
      _id: '1',
      courseName: 'Advanced Mathematics',
      teacherName: 'Dr. Smith',
      deadline: '2025-02-01',
      status: 'pending',
      totalSubmissions: 25,
      markedSubmissions: 15,
    },
    {
      _id: '2',
      courseName: 'Physics 101',
      teacherName: 'Prof. Johnson',
      deadline: '2025-01-20',
      status: 'in_progress',
      totalSubmissions: 30,
      markedSubmissions: 10,
    },
    {
      _id: '3',
      courseName: 'Chemistry Lab',
      teacherName: 'Dr. Williams',
      deadline: '2025-01-25',
      status: 'completed',
      totalSubmissions: 20,
      markedSubmissions: 20,
    }
  ];

  const dummySubmissions = [
    {
      _id: 's1',
      studentName: 'John Doe',
      studentId: '12345',
      submittedAt: '2025-01-15T10:30:00',
      status: 'pending',
      grade: null,
      feedback: '',
      fileUrl: '/dummy-assignment.pdf',
      submissionText: 'This is my submission for the Advanced Mathematics assignment. I have completed all required problems and included detailed solutions.',
      attachments: [
        { name: 'homework.pdf', size: '2.4MB' },
        { name: 'calculations.xlsx', size: '1.1MB' }
      ]
    },
    {
      _id: 's2',
      studentName: 'Jane Smith',
      studentId: '12346',
      submittedAt: '2025-01-14T15:45:00',
      status: 'marked',
      grade: 85,
      feedback: 'Good work, but could improve on the theoretical explanation.',
      fileUrl: '/dummy-assignment2.pdf',
      submissionText: 'Here is my detailed analysis of the given problems. I have included step-by-step solutions and explanations.',
      attachments: [
        { name: 'solution.pdf', size: '3.1MB' }
      ]
    }
  ];

  const [assignments, setAssignments] = useState(dummyAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);
  const [markingStatus, setMarkingStatus] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (selectedAssignment) {
      setSubmissions(dummySubmissions);
    }
  }, [selectedAssignment]);

  const handleAssignmentSelect = (assignment) => {
    if (selectedAssignment && markingStatus[selectedAssignment._id]?.hasChanges) {
      setShowConfirmation(true);
      return;
    }
    setSelectedAssignment(assignment);
    setCurrentSubmissionIndex(0);
    // Load saved marking progress
    const savedProgress = localStorage.getItem(`marking-progress-${assignment._id}`);
    if (savedProgress) {
      setMarkingStatus(JSON.parse(savedProgress));
    }
  };

  const handleMarkSubmission = (submissionId, grade, feedback) => {
    const updatedSubmissions = submissions.map(sub =>
      sub._id === submissionId ? { ...sub, grade, feedback, status: 'marked' } : sub
    );
    setSubmissions(updatedSubmissions);
    
    // Save progress
    const newStatus = {
      ...markingStatus,
      [selectedAssignment._id]: {
        hasChanges: true,
        lastMarked: new Date().toISOString()
      }
    };
    setMarkingStatus(newStatus);
    localStorage.setItem(`marking-progress-${selectedAssignment._id}`, JSON.stringify(newStatus));
  };

  const handleNavigateSubmission = (direction) => {
    const newIndex = direction === 'next' 
      ? Math.min(currentSubmissionIndex + 1, submissions.length - 1)
      : Math.max(currentSubmissionIndex - 1, 0);
    setCurrentSubmissionIndex(newIndex);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-yellow-500';
      case 'pending': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || assignment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Marking <span className="text-red-500">Assignments</span>
        </h2>
        
        {/* Stats */}
        <div className="mb-8 space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="space-y-2">
              <p className="text-sm">Total: {assignments.length}</p>
              <p className="text-sm">Pending: {assignments.filter(a => a.status === 'pending').length}</p>
              <p className="text-sm">In Progress: {assignments.filter(a => a.status === 'in_progress').length}</p>
              <p className="text-sm">Completed: {assignments.filter(a => a.status === 'completed').length}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <select
            className="w-full p-2 bg-gray-700 rounded-md text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          onClick={() => window.location.href = '/teacher-dashboard'}
          className="absolute bottom-6 left-6 w-52 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex ml-64">
        {/* Assignments List */}
        <div className="w-1/3 p-6 overflow-y-auto border-r border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Assignments</h2>
          
          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search assignments..."
              className="w-full p-2 pr-8 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-2 top-2 text-gray-400">🔍</span>
          </div>

          {/* Assignment List */}
          <div className="space-y-2">
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment._id}
                onClick={() => handleAssignmentSelect(assignment)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedAssignment?._id === assignment._id ? 'bg-red-100' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{assignment.courseName}</h3>
                    <p className="text-sm text-gray-600">Due: {new Date(assignment.deadline).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">
                      Progress: {assignment.markedSubmissions}/{assignment.totalSubmissions}
                    </p>
                  </div>
                  <span className={`text-sm ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
                {markingStatus[assignment._id]?.hasChanges && (
                  <div className="mt-2 text-xs text-yellow-600">
                    Unsaved changes from {new Date(markingStatus[assignment._id].lastMarked).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Marking Panel */}
        <div className="w-2/3 p-6 bg-white overflow-y-auto">
          {selectedAssignment ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedAssignment.courseName} - Submissions
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavigateSubmission('prev')}
                    disabled={currentSubmissionIndex === 0}
                    className="px-3 py-1 bg-gray-100 rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1">
                    {currentSubmissionIndex + 1} / {submissions.length}
                  </span>
                  <button
                    onClick={() => handleNavigateSubmission('next')}
                    disabled={currentSubmissionIndex === submissions.length - 1}
                    className="px-3 py-1 bg-gray-100 rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              {submissions[currentSubmissionIndex] && (
                <div className="border rounded-lg p-6">
                  {/* Student Info */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-semibold text-lg">{submissions[currentSubmissionIndex].studentName}</h4>
                      <p className="text-sm text-gray-600">ID: {submissions[currentSubmissionIndex].studentId}</p>
                      <p className="text-sm text-gray-600">
                        Submitted: {new Date(submissions[currentSubmissionIndex].submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {submissions[currentSubmissionIndex].attachments.map((attachment, index) => (
                        <button
                          key={index}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                          onClick={() => window.open(attachment.fileUrl)}
                        >
                          📎 {attachment.name} ({attachment.size})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submission Content */}
                  {submissions[currentSubmissionIndex].submissionText && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium mb-2">Submission Text</h5>
                      <p className="whitespace-pre-wrap">{submissions[currentSubmissionIndex].submissionText}</p>
                    </div>
                  )}

                  {/* Grading Form */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Grade (0-100)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full p-2 border rounded-lg"
                        defaultValue={submissions[currentSubmissionIndex].grade}
                        onChange={(e) => handleMarkSubmission(
                          submissions[currentSubmissionIndex]._id,
                          e.target.value,
                          submissions[currentSubmissionIndex].feedback
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Feedback</label>
                      <textarea
                        className="w-full p-2 border rounded-lg"
                        rows="4"
                        defaultValue={submissions[currentSubmissionIndex].feedback}
                        onChange={(e) => handleMarkSubmission(
                          submissions[currentSubmissionIndex]._id,
                          submissions[currentSubmissionIndex].grade,
                          e.target.value
                        )}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      onClick={() => {
                        const newSubmissions = [...submissions];
                        newSubmissions[currentSubmissionIndex].status = 'pending';
                        setSubmissions(newSubmissions);
                      }}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
                    >
                      Mark as Pending
                    </button>
                    <button
                      onClick={() => {
                        const newSubmissions = [...submissions];
                        newSubmissions[currentSubmissionIndex].status = 'marked';
                        setSubmissions(newSubmissions);
                      }}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                    >
                      Complete Marking
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Select an assignment from the left panel to start marking</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Unsaved Changes</h3>
            <p className="text-sm text-gray-600 mb-6">
              You have unsaved changes for the selected assignment. Do you want to discard the changes and switch to another assignment?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setSelectedAssignment(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkingAssignments;
