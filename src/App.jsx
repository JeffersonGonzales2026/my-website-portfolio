// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Modular System Wrapper
import ScrollToTop from './components/ScrollToTop';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import DreamCreations from './pages/DreamCreations';
import DataAnalyst from './pages/DataAnalyst';
import AIDeveloper from './pages/AIDeveloper';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  return (
    <BrowserRouter>
      {/* Universal Modular direct-to-top navigation wrapper implemented */}
      <ScrollToTop>
        <Routes>
          {/* Public Microsite Routes wrapped inside Global MainLayout Wrapper */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="dream-creations" element={<DreamCreations />} />
            <Route path="data-analyst" element={<DataAnalyst />} />
            <Route path="ai-developer" element={<AIDeveloper />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Isolated Secure Control Dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}