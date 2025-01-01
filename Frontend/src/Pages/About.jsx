import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen mt-0 md:mt-8">
      <div
        className={`transition-transform duration-700 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}
      >
        {/* Hero Section */}
        <div className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">About Imboni Project</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Imboni is a platform designed to enhance the education system by fostering better collaboration between students and teachers. It enables teachers to share assignments, manage notes, and conduct assessments seamlessly, while providing students with tools to complete and submit their work efficiently.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16" style={{ backgroundImage: "url('/pic1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Features of Imboni</h2>
            <div className="grid md:grid-cols-3 gap-8 cursor-pointer">
              {[{
                title: 'Assignments',
                description: 'Teachers can assign work to students and receive submissions directly on the platform.'
              },
              {
                title: 'Assessments',
                description: 'Conduct quizzes and exams while tracking student progress effectively.'
              },
              {
                title: 'Notes Management',
                description: 'Store and access class notes for easy reference and continuation of lessons.'
              }].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <h3 className="text-xl font-semibold text-[#f44336]">{feature.title}</h3>
                  <p className="text-gray-300 mt-4">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[{
                question: 'Who initiated the Imboni Project?',
                answer: 'The project was initiated by Ishimwe Ghislain.'
              },
              {
                question: 'Which schools use Imboni?',
                answer: 'Currently, schools like Ecole Technique Saint Kizito and College du Christe Roi use Imboni.'
              }].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <span
                      className={`text-[#f44336] text-2xl transform transition-transform ${
                        activeQuestion === index ? 'scale-125' : 'hover:scale-150'
                      }`}
                    >
                      {activeQuestion === index ? '-' : '+'}
                    </span>
                  </div>
                  {activeQuestion === index && (
                    <p className="text-gray-300 mt-2">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-[#f44336] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Join the Imboni Community Today!</h2>
            <p className="text-lg text-gray-200 mb-6">
              Be part of the innovation in education and experience seamless collaboration.
            </p>
            <button
              className="bg-gray-800 px-6 py-3 rounded-lg text-white font-bold hover:bg-[#f44336] transition"
              onClick={() => navigate('/login')} // Navigate to Login page
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
