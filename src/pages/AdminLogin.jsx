// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Key, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      // Execute cloud cryptographic check against Supabase Auth engine
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email.trim(),
        password: credentials.password,
      });

      if (error) throw error;

      // Authenticated successfully. Forward token session context to dashboard.
      setStatus('idle');
      navigate('/admin');

    } catch (error) {
      console.error('Authentication gate reject:', error.message);
      setErrorMessage(error.message || 'Invalid login details. Access denied.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Security Grid/Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Lock className="text-blue-400" size={32} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Admin Gateway</h1>
          <p className="text-sm text-slate-400 mt-2">Restricted access. Please authenticate.</p>
        </div>

        <form onSubmit={handleLogin} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  required
                  disabled={status === 'loading'}
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all disabled:opacity-50"
                  placeholder="hello@jeffersongonzales.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">Password</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  disabled={status === 'loading'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {status === 'error' && (
              <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 py-3.5 mt-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all disabled:opacity-50 shadow-[0_4px_20px_rgba(59,130,246,0.2)]"
            >
              {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              {status === 'loading' ? 'Authenticating...' : 'Secure Login'}
            </button>
          </div>
        </form>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 mx-auto flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors focus:outline-none"
        >
          <ArrowRight size={14} className="rotate-180" /> Return to Public Site
        </button>
      </div>
    </div>
  );
}