import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">ImBoni</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Feel free to join us, create your free account, and start viewing updates
              and exploring the country's education system to level up.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" 
                className="text-white hover:text-[#f44336] transition-colors duration-300">
                <FaWhatsapp size={24} />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
                className="text-white hover:text-[#f44336] transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"
                className="text-white hover:text-[#f44336] transition-colors duration-300">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Useful Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Useful Links</h2>
            <ul className="space-y-2">
              {['Home', 'About', 'Pricing', 'Blogs', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-[#f44336] transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Goals Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Our Goals</h2>
            <ul className="space-y-2">
              {[
                'Win back your time',
                'E-learning',
                'Learn Far away'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to="/"
                    className="text-gray-300 hover:text-[#f44336] transition-colors duration-300 text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-3">
              <p className="flex items-center text-gray-300 text-sm">
                <FaMapMarkerAlt className="mr-2 text-[#f44336]" />
                Kamonyi District
              </p>
              <p className="flex items-center text-gray-300 text-sm">
                <FaPhone className="mr-2 text-[#f44336]" />
                +250 781262526
              </p>
              <p className="flex items-center text-gray-300 text-sm">
                <FaEnvelope className="mr-2 text-[#f44336]" />
                <a 
                  href="mailto:ishimweghislain82@gmail.com"
                  className="hover:text-[#f44336] transition-colors duration-300"
                >
                  ishimweghislain82@gmail.com
                </a>
              </p>
              <p className="text-gray-300 text-sm">
                Instagram:{' '}
                <a 
                  href="https://www.instagram.com/ghislain_ishimwe"
                  className="text-[#f44336] hover:text-[#ff6659] transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ghislain_ishimwe
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Copyright ImBoni All Rights Reserved
            </p>
            <p className="text-gray-400 text-sm">
              Designed by{' '}
              <a 
                href="https://portfolio-link.com"
                className="text-[#f44336] hover:text-[#ff6659] transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ishimweghislain
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;