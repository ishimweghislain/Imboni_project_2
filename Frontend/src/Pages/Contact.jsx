import React from 'react';

const Contact = () => {
  return (
    <>
      {/* Internal CSS for border animation */}
      <style>
        {`
          .animate-border {
            position: relative;
            animation: border-animation 1s infinite;
          }

          @keyframes border-animation {
            0% {
              border-color: transparent;
            }
            50% {
              border-color: #f44336; /* Red color */
            }
            100% {
              border-color: transparent;
            }
          }

          /* Adjusting the focus to keep the border red when the element is focused */
          .focus-red:focus {
            border-color: #f44336;
          }
        `}
      </style>

      <div className="min-h-screen bg-gray-900 p-8 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Left - Contact Form Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-[#f44336] text-center">Reach Out To Us!</h2>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full p-3 rounded bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f44336] border-b-2 border-transparent focus:border-red-500 animate-border focus-red"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f44336] border-b-2 border-transparent focus:border-red-500 animate-border focus-red"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    Request Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 rounded bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f44336] border-b-2 border-transparent focus:border-red-500 animate-border focus-red"
                    placeholder="Enter your message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-[#f44336] text-white rounded hover:bg-red-600 transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Right - Contact Information Section */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-[#f44336] text-center">Contact Information</h2>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-[#f44336]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-white">+250 781262526</span>
                </div>
                <div className="flex items-center space-x-4">
                  <svg
                    className="w-6 h-6 text-[#f44336]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-white">ishimweghislain82@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
