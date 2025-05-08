import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

// Dashboard Pages
import ClientDashboard from './components/ClientDashboard';
import InvestorDashboard from './components/InvestorDashboard';
import FinanceDashboard from './components/FinanceDashboard';
import DeveloperDashboard from './components/DeveloperDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import SalesDashboard from './components/SalesDashboard';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          <Route path="/finance/dashboard" element={<FinanceDashboard />} />
          <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          <Route path="/sales/dashboard" element={<SalesDashboard />} />
        
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
