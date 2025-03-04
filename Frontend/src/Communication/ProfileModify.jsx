import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import close icon

const ProfileModify = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        
        <button className="absolute top-3 right-3 text-black" onClick={onClose}>
          <FaTimes size={20} /> 
        </button>

        <h2 className="text-xl font-bold mb-4 text-black">Modify Profile</h2>

       
        <p className="text-black">Edit your profile details here.</p>

    
       
      </div>
    </div>
  );
};

export default ProfileModify;
