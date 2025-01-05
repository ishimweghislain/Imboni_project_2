import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Navigation from './Dashboards/Navigation';
import Footer from './Components/Footer';
import Footer2 from './Dashboards/Footer2';
import Home from './Pages/Home';
import About from './Pages/About';
import Professors from './Pages/Professors';
import Pricing from './Pages/Pricing';
import Goals from './Pages/Goals';
import Blogs from './Pages/Blogs';
import Contact from './Pages/Contact';
import Login from './Components/Login';
import Studentdashboard from './Dashboards/Studentsdashboard';
import Teacherdashboard from './Dashboards/Teachersdashboard';
import Quickassessment from './Work_models/Quickassessment';
import Direct from './Work_models/Direct';
import Do_directassessment from './Work_models/Do_directassessment';
import Do_indirectassessment from './Work_models/Do_indirectassessment';
import MyAssessmentsView from './Models/Myassessments_view';
import MyAssignmentsView from './Models/Myassignments_view';
import Doassignments from './Work_models/Doassignments';

const ProtectedRoute = ({ element: Element, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <DashboardLayout>{Element}</DashboardLayout>;
};

const DashboardLayout = ({ children }) => {
  const [activeToggle, setActiveToggle] = useState(null);

  const handleToggle = (type) => {
    setActiveToggle(type);
  };

  return (
    <div>
      <Navigation onToggle={handleToggle} />
      {React.cloneElement(children, {
        activeToggle: activeToggle,
      })}
      <Footer2 />
    </div>
  );
};

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/home' || location.pathname === '/';

  return (
    <div>
      <Navbar isHome={isHome} />
      {children}
      <Footer />
    </div>
  );
};

const MainRouteWrapper = ({ element: Element }) => {
  return <MainLayout>{Element}</MainLayout>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<MainRouteWrapper element={<Home />} />} />
        <Route path="/about" element={<MainRouteWrapper element={<About />} />} />
        <Route path="/professors" element={<MainRouteWrapper element={<Professors />} />} />
        <Route path="/pricing" element={<MainRouteWrapper element={<Pricing />} />} />
        <Route path="/goals" element={<MainRouteWrapper element={<Goals />} />} />
        <Route path="/blogs" element={<MainRouteWrapper element={<Blogs />} />} />
        <Route path="/contact" element={<MainRouteWrapper element={<Contact />} />} />
        <Route path="/login" element={<MainRouteWrapper element={<Login />} />} />
        <Route
          path="/student-dashboard"
          element={<ProtectedRoute element={<Studentdashboard />} allowedRoles={['student']} />}
        />
        <Route
          path="/teacher-dashboard"
          element={<ProtectedRoute element={<Teacherdashboard />} allowedRoles={['teacher']} />}
        />
        <Route path="/quick-assessment" element={<Quickassessment />} />
        <Route path="/direct" element={<Direct />} />
        <Route path="/do-direct-assessment/:id" element={<Do_directassessment />} />
        <Route path="/do-indirect-assessment/:id" element={<Do_indirectassessment />} />
        <Route path="/my-assessments" element={<MyAssessmentsView />} />
        <Route path="/my-assignments" element={<MyAssignmentsView />} />
        <Route path="/do-assignment/:id" element={<Doassignments />} />
      </Routes>
    </Router>
  );
}

export default App;