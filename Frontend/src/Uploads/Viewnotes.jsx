import React, { useEffect, useState } from 'react';

const Viewnotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/notes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch notes');
      }

      setNotes(data.notes || []);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError(err.message || 'An error occurred while fetching notes');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (noteId) => {
    try {
      const response = await fetch(`/api/notes/download/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to download notes');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'notes.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download notes: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f44336]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes</h2>
        <p className="text-gray-600">No notes available yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note._id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-4">
              <h3 className="text-xl font-semibold">
                {note.courseName}
              </h3>
            </div>
            <div className="p-4 space-y-2">
              <div>
                <span className="font-semibold">Teacher:</span> {note.teacherName}
              </div>
              <div>
                <span className="font-semibold">Units:</span>
                <div className="ml-4">
                  {note.units.map((unit, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      • Unit {index + 1}: {unit}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold">Date Added:</span>{' '}
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
              <button
                onClick={() => handleDownload(note._id)}
                className="mt-4 w-full bg-[#f44336] text-white px-4 py-2 rounded-lg hover:bg-[#d32f2f] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Notes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viewnotes;