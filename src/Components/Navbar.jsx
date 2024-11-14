import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';

const Navbar = ({ isHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-10 px-4 py-5 flex justify-between items-center transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#eeeeee] border-b border-gray-300 text-black'
          : isHome
          ? 'bg-transparent text-white'
          : 'bg-white text-black'
      }`}
    >
      <div className="flex items-center space-x-2">
        <div className='icon'>
        <FaBookOpen className="text-[#f44336] text-2xl text-[50px]" />
        </div>
        <span className="text-xl font-bold">ImBoni</span>
      </div>
      <div className="md:flex space-x-6 font-medium">
        {['Home', 'About', 'Pricing', 'Professors', 'Goals', 'Blogs', 'Contact', 'Language'].map((link) => (
          <Link
            key={link}
            to={`/${link.toLowerCase()}`}
            className={`cursor-pointer relative transition-colors duration-300 ${
              isActive(`/${link.toLowerCase()}`)
                ? 'text-[#f44336] after:bg-[#f44336]'
                : isHome && !isScrolled
                ? 'text-white hover:text-[#f44336]'
                : 'text-black hover:text-[#f44336]'
            }`}
          >
            {link}
            {isActive(`/${link.toLowerCase()}`) && (
              <div className="absolute w-full h-1 bottom-0 left-0 scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-100"></div>
            )}
          </Link>
        ))}
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#f44336] text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
        >
          Log In!
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;