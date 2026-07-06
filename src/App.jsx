import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';

// Import our actual page components
import Home from './pages/Home';
import DreamCreations from './pages/DreamCreations';
import DataAnalyst from './pages/DataAnalyst';
import AIDeveloper from './pages/AIDeveloper';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Admin Pages (Temporary Placeholders)

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes wrapped in PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dream-creations" element={<DreamCreations />} />
          <Route path="/data-analyst" element={<DataAnalyst />} />
          <Route path="/ai-developer" element={<AIDeveloper />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Secure Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}