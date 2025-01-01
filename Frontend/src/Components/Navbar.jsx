import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaMoneyBillWave, FaChalkboardTeacher, FaBullhorn, FaPhoneAlt, FaBookOpen } from 'react-icons/fa';

const Navbar = ({ isHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const getIcon = (link) => {
    switch (link) {
      case 'Home': return <FaHome className={`${isMobile ? 'text-2xl' : 'text-xl mr-2'}`} />;
      case 'About': return <FaInfoCircle className={`${isMobile ? 'text-2xl' : 'text-xl mr-2'}`} />;
      case 'Pricing': return <FaMoneyBillWave className={`${isMobile ? 'text-2xl' : 'text-xl mr-2'}`} />;
      case 'Professors': return <FaChalkboardTeacher className={`${isMobile ? 'text-2xl' : 'text-xl mr-2'}`} />;
      case 'Goals': return <FaBullhorn className={`${isMobile ? 'text-2xl' : 'text-xl mr-2'}`} />;
      case 'Blogs': return <FaBookOpen className={`${isMobile ? 'text-2xl' : 'text-xl mr-2'}`} />;
      case 'Contact': return <FaPhoneAlt className={`${isMobile ? 'text-2xl' : 'text-xl mr-2'}`} />;
      default: return null;
    }
  };

  const mobileLinks = ['Home', 'About', 'Goals', 'Contact', 'Blogs'];
  const desktopLinks = ['Home', 'About', 'Pricing', 'Professors', 'Goals', 'Blogs', 'Contact'];

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 px-4 py-2 flex justify-around items-center z-50">
        {mobileLinks.map((link) => (
          <Link
            key={link}
            to={`/${link.toLowerCase()}`}
            className="flex flex-col items-center"
          >
            <div className={`p-2 ${isActive(`/${link.toLowerCase()}`) ? 'text-[#f44336]' : 'text-white'}`}>
              {getIcon(link)}
            </div>
            <span className={`text-xs mt-1 ${isActive(`/${link.toLowerCase()}`) ? 'text-[#f44336]' : 'text-white'}`}>
              {link}
            </span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 w-full z-50 px-4 py-5 flex justify-between items-center transition-colors duration-300 ${
      isScrolled ? 'bg-gray-800' : isHome ? 'bg-transparent' : 'bg-gray-900'
    }`}>
      <div className="flex items-center space-x-2">
        <div className="icon">
          <FaBookOpen className="text-[#f44336] text-2xl" />
        </div>
        <span className="text-xl font-bold text-white">ImBoni</span>
      </div>

      <div className="flex space-x-6 font-medium">
        {desktopLinks.map((link) => (
          <Link
            key={link}
            to={`/${link.toLowerCase()}`}
            className={`cursor-pointer relative flex items-center transition-colors duration-300 group ${
              isActive(`/${link.toLowerCase()}`) ? 'text-[#f44336]' : isHome && !isScrolled ? 'text-white hover:text-[#f44336]' : 'text-white hover:text-[#f44336]'
            }`}
          >
            {getIcon(link)}
            {link}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#f44336] rounded-full transition-all duration-300 ease-in-out ${
              isActive(`/${link.toLowerCase()}`) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            } origin-left`}></span>
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
