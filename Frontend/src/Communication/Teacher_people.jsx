import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Teacher_people = () => {
  const people = [
    { id: 1, name: 'Anna Lee', schoolClass: 'College du Christe Roi / S6PCM' },
    { id: 2, name: 'James Carter', schoolClass: 'St. Peter’s High School / S5MCB' },
    { id: 3, name: 'Laura Kelly', schoolClass: 'Greenfield Academy / S4HEG' },
    { id: 4, name: 'Michael Adams', schoolClass: 'King’s College / S6PCM' },
    { id: 5, name: 'Sophia Lopez', schoolClass: 'Royal Academy / S3PCB' },
    { id: 6, name: 'Benjamin Harris', schoolClass: 'Downtown Academy / S4PCB' },
    { id: 7, name: 'Chloe Martin', schoolClass: 'Sunrise High School / S3HEG' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg text-gray-800 h-[540px]">
      <h2 className="text-xl font-semibold mb-4 text-[#f44336]">People</h2>
      <div className="space-y-4 overflow-y-scroll h-[480px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center space-x-4 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors duration-300"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
                {person.name.charAt(0)} {/* First letter of the name */}
              </div>
            </div>

            {/* Person Details */}
            <div className="flex flex-col flex-grow">
              <h3 className="text-gray-700 font-semibold">{person.name}</h3>
              <p className="text-gray-600 text-sm">{person.schoolClass}</p>
            </div>

            {/* Dropdown Icon */}
            <div className="flex-shrink-0">
              <FaChevronDown className="text-gray-500 text-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teacher_people;
