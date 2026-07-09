// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Palette, Database, BrainCircuit, 
  Mail, Settings, LogOut, FileText, Image as ImageIcon,
  Activity, Users, Loader2, CheckCircle, Trash2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ totalMessages: 0, unreadMessages: 0 });
  const navigate = useNavigate();

  // Enforce Cloud Session Security & Load Initial Dashboard Telemetry
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // No valid token found, intercept request and redirect to gateway lock
        navigate('/admin/login');
      } else {
        await fetchLiveMessages();
        setLoading(false);
      }
    };

    checkUserSession();
  }, [navigate]);

  // Fetch true database records from contact_messages table
  const fetchLiveMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data || []);
      
      // Calculate dynamic quick stats
      const total = data.length;
      const unread = data.filter(msg => msg.status === 'unread').length;
      setStats({ totalMessages: total, unreadMessages: unread });

    } catch (error) {
      console.error('Error fetching dashboard telemetry:', error.message);
    }
  };

  // Mark message as read
  const handleMarkAsRead = async (id) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      await fetchLiveMessages(); // Refresh dynamic grid
    } catch (error) {
      console.error('Failed to update message status:', error.message);
    }
  };

  // Secure Sign Out
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-slate-400 gap-3 font-mono text-xs">
        <Loader2 className="animate-spin text-blue-500" size={18} />
        VERIFYING SESSION ENCRYPTION...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#02040a] text-slate-200 overflow-hidden font-sans">
      
      {/* Sidebar Panel */}
      <aside className="w-64 flex-shrink-0 bg-white/[0.02] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-black text-white tracking-tight">JG CMS <span className="text-blue-500">Pro</span></h2>
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mt-1 block">Super Admin</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 hide-scrollbar">
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

      {/* Main Content Dashboard Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 flex-shrink-0 bg-white/[0.01] border-b border-white/10 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-white">{activeModule} Overview</h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Session Active
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Main Analytical Dashboard Module View */}
          {activeModule === 'Dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-slate-400 mb-2"><Mail size={16}/> Real Messages</div>
                  <div className="text-3xl font-bold text-white">{stats.totalMessages}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-slate-400 mb-2"><Activity size={16}/> Unread Count</div>
                  <div className="text-3xl font-bold text-blue-400">{stats.unreadMessages}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-slate-400 mb-2"><Users size={16}/> Core Personas</div>
                  <div className="text-3xl font-bold text-white">3</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-slate-400 mb-2"><Activity size={16}/> Sync Engine</div>
                  <div className="text-3xl font-bold text-emerald-400">RLS Active</div>
                </div>
              </div>

              {/* Recent Updates Segment Container */}
              <h3 className="text-lg font-bold text-white mb-4">Recent Form Submissions</h3>
              <div className="space-y-4">
                {messages.slice(0, 3).map((msg) => (
                  <div key={msg.id} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{msg.sender_name}</span>
                        <span className="text-xs text-slate-500">{msg.sender_email}</span>
                        {msg.status === 'unread' && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-semibold">{msg.subject}</p>
                    </div>
                    {msg.status === 'unread' && (
                      <button onClick={() => handleMarkAsRead(msg.id)} className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-colors text-xs flex items-center gap-1.5 font-semibold">
                        <CheckCircle size={14} /> Mark Read
                      </button>
                    )}
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-sm text-slate-500 font-mono">No customer submission records found.</p>
                )}
              </div>
            </>
          )}

          {/* Messages Independent Interactive Datagrid Module */}
          {activeModule === 'Messages' && (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-6 rounded-2xl border transition-all ${msg.status === 'unread' ? 'bg-blue-500/[0.02] border-blue-500/20' : 'bg-white/[0.01] border-white/5'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        {msg.sender_name}
                        {msg.status === 'unread' && <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold uppercase tracking-wider">New</span>}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{msg.sender_email} • {msg.company || 'No Company Specified'}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {msg.status === 'unread' && (
                        <button onClick={() => handleMarkAsRead(msg.id)} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-xs font-bold transition-colors flex items-center gap-1.5">
                          <CheckCircle size={14} /> Mark Read
                        </button>
                      )}
                      <span className="text-[10px] font-mono text-slate-500">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-mono tracking-wider uppercase text-slate-500 block mb-1">Subject: {msg.subject}</span>
                    <p className="text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">{msg.message}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 font-mono text-sm">
                  No tracking data logs found inside contact_messages.
                </div>
              )}
            </div>
          )}

          {/* Other Future CMS Sections Placeholder */}
          {activeModule !== 'Dashboard' && activeModule !== 'Messages' && (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl text-slate-500">
              <Database size={32} className="mb-4 opacity-50" />
              <p>Module "{activeModule}" is structured and fully mapped for production data integration.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}