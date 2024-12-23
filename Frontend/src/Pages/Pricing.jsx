import React from 'react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 mt-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-[#f44336] mb-12">Choose Your Plan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center hover:scale-105 transform transition-all duration-300">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-[#f44336]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.104 0 2-.896 2-2 0-1.104-.896-2-2-2-1.104 0-2 .896-2 2 0 1.104.896 2 2 2zm0 0v7m0-7a2 2 0 11-2-2m2 2a2 2 0 112 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#f44336] mb-4">Starter Plan</h3>
            <p className="text-lg mb-6">Perfect for beginners who need essential features to get started.</p>
            <p className="text-xl font-bold mb-4">$19/month</p>
            <ul className="text-gray-400 text-left">
              <li>✔ 10GB Storage</li>
              <li>✔ 24/7 Support</li>
              <li>✔ Basic Features</li>
              <li>✔ Discounted price for first 3 months</li>
            </ul>
            <button className="mt-6 py-2 px-4 bg-[#f44336] text-white rounded-full hover:bg-red-600 transition-colors duration-300">
              Get Started
            </button>
          </div>

          {/* Intermediate Plan */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center hover:scale-105 transform transition-all duration-300">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-[#f44336]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.104 0 2-.896 2-2 0-1.104-.896-2-2-2-1.104 0-2 .896-2 2 0 1.104.896 2 2 2zm0 0v7m0-7a2 2 0 11-2-2m2 2a2 2 0 112 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#f44336] mb-4">Intermediate Plan</h3>
            <p className="text-lg mb-6">Great for those who need more features and flexibility.</p>
            <p className="text-xl font-bold mb-4">$49/month</p>
            <ul className="text-gray-400 text-left">
              <li>✔ 50GB Storage</li>
              <li>✔ Priority Support</li>
              <li>✔ Advanced Features</li>
              <li>✔ 20% off for annual subscription</li>
            </ul>
            <button className="mt-6 py-2 px-4 bg-[#f44336] text-white rounded-full hover:bg-red-600 transition-colors duration-300">
              Get Started
            </button>
          </div>

          {/* Experienced Plan */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center hover:scale-105 transform transition-all duration-300">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-[#f44336]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.104 0 2-.896 2-2 0-1.104-.896-2-2-2-1.104 0-2 .896-2 2 0 1.104.896 2 2 2zm0 0v7m0-7a2 2 0 11-2-2m2 2a2 2 0 112 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-[#f44336] mb-4">Experienced Plan</h3>
            <p className="text-lg mb-6">For professionals who need unlimited access and top-tier benefits.</p>
            <p className="text-xl font-bold mb-4">$99/month</p>
            <ul className="text-gray-400 text-left">
              <li>✔ 200GB Storage</li>
              <li>✔ VIP Support</li>
              <li>✔ All Features</li>
              <li>✔ Free Setup & Migration</li>
              <li>✔ 30% off for long-term subscription</li>
            </ul>
            <button className="mt-6 py-2 px-4 bg-[#f44336] text-white rounded-full hover:bg-red-600 transition-colors duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
