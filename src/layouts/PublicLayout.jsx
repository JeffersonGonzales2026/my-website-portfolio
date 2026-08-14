import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      <Navbar />
      
      {/* Outlet renders whatever page is currently active in the router */}
      <main className="flex-grow pt-20"> 
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}