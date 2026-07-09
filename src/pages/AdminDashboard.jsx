// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Palette, Database, BrainCircuit, 
  Mail, Settings, LogOut, FileText, Image as ImageIcon,
  Activity, Users
} from 'lucide-react';

const sidebarModules = [
  { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Home Config', icon: <Activity size={18} /> },
  { name: 'Dream Creations', icon: <Palette size={18} /> },
  { name: 'Data Analyst', icon: <Database size={18} /> },
  { name: 'AI Developer', icon: <BrainCircuit size={18} /> },
  { name: 'Media Library', icon: <ImageIcon size={18} /> },
  { name: 'Messages', icon: <Mail size={18} /> },
  { name: 'Settings', icon: <Settings size={18} /> }
];

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState('Dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In the future, this will trigger Supabase sign-out
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#02040a] text-slate-200 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white/[0.02] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-black text-white tracking-tight">JG CMS <span className="text-blue-500">Pro</span></h2>
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mt-1 block">Super Admin</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {sidebarModules.map((module) => (
            <button
              key={module.name}
              onClick={() => setActiveModule(module.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeModule === module.name 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {module.icon} {module.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 bg-white/[0.01] border-b border-white/10 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-white">{activeModule} Overview</h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Supabase Connected
            </span>
          </div>
        </header>

        {/* Dynamic Content Space */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeModule === 'Dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Stat Cards */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 text-slate-400 mb-2"><FileText size={16}/> Total Projects</div>
                <div className="text-3xl font-bold text-white">42</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 text-slate-400 mb-2"><Users size={16}/> Active Clients</div>
                <div className="text-3xl font-bold text-white">18</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 text-slate-400 mb-2"><Mail size={16}/> Unread Messages</div>
                <div className="text-3xl font-bold text-blue-400">5</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 text-slate-400 mb-2"><Activity size={16}/> System Health</div>
                <div className="text-3xl font-bold text-emerald-400">100%</div>
              </div>
            </div>
          )}

          {activeModule !== 'Dashboard' && (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl text-slate-500">
              <Database size={32} className="mb-4 opacity-50" />
              <p>Module "{activeModule}" is ready for Supabase Data Integration.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}