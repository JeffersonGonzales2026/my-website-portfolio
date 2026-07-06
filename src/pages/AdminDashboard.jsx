import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, Inbox, Trash2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchMessages();
  }, []);

  // Security Guard: Kick out unauthenticated users
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const deleteMessage = async (id) => {
    // Optimistic UI update
    setMessages(messages.filter((msg) => msg.id !== id));
    // Delete from database
    await supabase.from('messages').delete().eq('id', id);
  };

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      
      {/* Top Navigation Bar */}
      <header className="bg-glass-card border-b border-glass-border px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20">
            <Inbox size={18} />
          </div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">Command Center</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-400 transition-colors text-sm font-medium"
        >
          <LogOut size={16} />
          Disconnect
        </button>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-2">Direct Messages</h2>
          <p className="text-text-secondary">Inquiries securely routed from the public portfolio.</p>
        </div>

        {loading ? (
          <div className="text-text-muted animate-pulse">Decrypting messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-12 border border-dashed border-glass-border rounded-2xl flex flex-col items-center justify-center text-text-muted">
            <Mail size={48} className="mb-4 opacity-50" />
            <p>Inbox is currently empty.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {messages.map((msg, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={msg.id} 
                className="p-6 rounded-2xl bg-glass-card border border-glass-border hover:border-blue-500/30 transition-colors group relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-blue-400 hover:underline">{msg.email}</a>
                  </div>
                  <span className="text-xs text-text-muted font-mono">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="p-4 rounded-xl bg-background-secondary/50 border border-glass-border text-text-secondary whitespace-pre-wrap text-sm md:text-base">
                  {msg.message}
                </div>

                <button 
                  onClick={() => deleteMessage(msg.id)}
                  className="absolute top-6 right-6 p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Message"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}