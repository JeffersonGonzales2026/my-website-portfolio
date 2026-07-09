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
import AiDeveloper from './pages/AiDeveloper'; // Adjusted to match your component name
import Contact from './pages/Contact';

// Admin Pages (Isolated)
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  return (
    <BrowserRouter>
      {/* Universal Modular direct-to-top navigation wrapper implemented */}
      <ScrollToTop>
        <Routes>
          
          {/* ================= PUBLIC MICROSITES ================= */}
          {/* Wrapped inside Global MainLayout Wrapper (contains Navbar & Footer) */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="dream-creations" element={<DreamCreations />} />
            <Route path="data-analyst" element={<DataAnalyst />} />
            <Route path="ai-developer" element={<AiDeveloper />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* ================= SECURE ADMIN CONTROL ================= */}
          {/* Isolated from MainLayout so Navbar/Footer do not show here */}
          <Route path="/admin">
            <Route index element={<AdminDashboard />} />
            <Route path="login" element={<AdminLogin />} />
          </Route>

        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}