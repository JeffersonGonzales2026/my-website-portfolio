import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const { error } = await supabase
      .from('messages')
      .insert([
        { name: formData.name, email: formData.email, message: formData.message }
      ]);

    if (error) {
      console.error("Error sending message:", error);
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-primary overflow-x-hidden pt-32 pb-20 px-6">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* ================= LEFT COLUMN: INFO & RESUMES ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight mb-6">
            Let's Build <br/> <span className="text-blue-400">Something Great.</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-md">
            Whether you are looking for an AI-assisted developer to architect your next platform, or a data analyst to streamline your operations, I am ready to connect.
          </p>

          <div className="space-y-6">
            <h3 className="text-sm font-bold tracking-widest text-text-muted uppercase">Download Resumes</h3>
            
            {/* Resume Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#" 
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-glass-card border border-glass-border hover:border-blue-500/50 hover:bg-glass-card/80 transition-all text-text-primary font-medium group"
              >
                <FileText className="text-blue-400 group-hover:scale-110 transition-transform" size={20} />
                Frontend Developer
              </a>
              <a 
                href="#" 
                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-glass-card border border-glass-border hover:border-green-500/50 hover:bg-glass-card/80 transition-all text-text-primary font-medium group"
              >
                <FileText className="text-green-400 group-hover:scale-110 transition-transform" size={20} />
                Data Analyst
              </a>
            </div>

            <div className="flex items-center gap-4 mt-8 p-4 rounded-xl bg-background-secondary border border-glass-border w-max">
              <Mail className="text-text-muted" size={20} />
              <span className="text-text-primary font-medium">jeffersonguzmangonzales03@gmail.com</span>
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: CONTACT FORM ================= */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-8 md:p-10 rounded-3xl bg-glass-card border border-glass-border shadow-2xl backdrop-blur-md relative overflow-hidden">
            
            {/* Background Glow inside form */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

            <h3 className="text-2xl font-bold text-text-primary mb-8">Send a Direct Message</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-text-secondary">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-background-primary/50 border border-glass-border text-text-primary focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-text-muted/50"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-background-primary/50 border border-glass-border text-text-primary focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-text-muted/50"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-text-secondary">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-background-primary/50 border border-glass-border text-text-primary focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-text-muted/50 resize-none"
                  placeholder="How can we collaborate?"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-text-primary text-background-primary font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Transmit Message'}
                <Send size={18} />
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 text-sm font-medium mt-2">
                  <CheckCircle size={16} /> Message secured and delivered successfully.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 text-sm font-medium mt-2">
                  <AlertCircle size={16} /> Error delivering message. Please try again.
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}