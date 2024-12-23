import React from 'react';

const professors = [
  {
    name: 'ISHIMWE GHISLAIN',
    school: 'Ecole Technique Saint Kizito',
    degree: 'Masters in Computer Science',
    specializedCourse: 'Data Science',
    img: '/prof1.jpg',
  },
  {
    name: 'INEZA LINDA',
    school: 'College du Christe Roi',
    degree: 'Bachelor in Mathematics',
    specializedCourse: 'Algebra',
    img: '/prof2.jpg',
  },
  {
    name: 'UWAMUREMYE GRACE',
    school: 'Ecole Technique Saint Kizito',
    degree: 'Masters in Physics',
    specializedCourse: 'Quantum Mechanics',
    img: '/prof3.jpg',
  },
  {
    name: 'DUSABIKIZA KING',
    school: 'College du Christe Roi',
    degree: 'Bachelor in Engineering',
    specializedCourse: 'Mechanical Engineering',
    img: '/prof1.jpg',
  },
  {
    name: 'TUYIZERE BONCOEUR',
    school: 'Ecole Technique Saint Kizito',
    degree: 'Masters in History',
    specializedCourse: 'African History',
    img: '/prof2.jpg',
  },
  {
    name: 'GATAMBIYE JAIRUS',
    school: 'College du Christe Roi',
    degree: 'Bachelor in Architecture',
    specializedCourse: 'Urban Design',
    img: '/prof3.jpg',
  },
  {
    name: 'AHIMBAZWE ANGELOT',
    school: 'Ecole Technique Saint Kizito',
    degree: 'Masters in Literature',
    specializedCourse: 'World Literature',
    img: '/prof1.jpg',
  },
  {
    name: 'IRIZA LUXINE',
    school: 'College du Christe Roi',
    degree: 'Bachelor in Psychology',
    specializedCourse: 'Cognitive Psychology',
    img: '/prof2.jpg',
  },
  {
    name: 'MUNYANEZA ROBBEN',
    school: 'Ecole Technique Saint Kizito',
    degree: 'Masters in Chemistry',
    specializedCourse: 'Organic Chemistry',
    img: '/prof3.jpg',
  },
];

const Professors = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      {/* Heading Section */}
      <div className="text-center mb-12 pt-8">
        <h1 className="text-4xl font-bold text-[#f44336] mb-4">Meet Our Professors</h1>
        <p className="text-lg text-gray-600">Our esteemed professors with years of experience and expertise</p>
      </div>

      {/* Professors Grid Section */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {professors.map((professor, index) => (
          <div
            key={index}
            className="professor-card bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 animate-slide-in"
          >
            <div className="professor-img mb-4">
              <img
                src={professor.img}
                alt={professor.name}
                className="w-full h-56 object-cover rounded-t-lg"
              />
            </div>
            <h3 className="text-xl text-[#f44336] font-semibold mb-2">{professor.name}</h3>
            
            {/* Profile Details with Labels */}
            <div className="text-gray-300 mb-4">
              <p><strong>Name</strong>: {professor.name}</p>
              <p><strong>Degree</strong>: {professor.degree}</p>
              <p><strong>S.Course</strong>: {professor.specializedCourse}</p>
            </div>
            
            <button className="bg-[#f44336] text-white px-6 py-2 rounded-md hover:bg-gray-700 transition duration-300">
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        /* Tailwind CSS Custom Animations */
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in-left 0.7s ease-out;
        }

        /* Global styles for the professor cards */
        .professor-card {
          background-color: #white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .professor-card:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .professor-img img {
          border-radius: 8px;
        }

        button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </div>
  );
};

export default Professors;
