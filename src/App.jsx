import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Professors from './Pages/Professors';
import Pricing from './Pages/Pricing';
import Goals from './Pages/Goals';
import Blogs from './Pages/Blogs';
import Contact from './Pages/Contact';
import Language from './Pages/Language';
import Login from './Components/Login';
import Footer from './Components/Footer';

const NavbarWrapper = () => {
  const location = useLocation();
  const isHome = location.pathname === '/home' || location.pathname === '/';
  return <Navbar isHome={isHome} />;
};

function App() {
  return (
    <Router>
      <NavbarWrapper />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/professors" element={<Professors />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/language" element={<Language />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;