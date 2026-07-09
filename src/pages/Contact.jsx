// src/pages/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Loader2, CheckCircle2, AlertCircle, Mail, 
  Download, FileText, MessageSquare, Phone, Globe, Briefcase, Terminal
} from 'lucide-react';

// ================= PLATFORM DATA =================
const connectPlatforms = [
  { id: 'email', name: 'Email', username: 'hello@jeffersongonzales.com', icon: <Mail size={20} />, status: 'active', desc: 'Direct professional inquiries.' },
  { id: 'linkedin', name: 'LinkedIn', username: 'in/jeffersongonzales', icon: <Briefcase size={20} />, status: 'active', desc: 'Professional network & updates.' },
  { id: 'github', name: 'GitHub', username: 'jeffersongonzales', icon: <Terminal size={20} />, status: 'active', desc: 'Code repositories & contributions.' },
  { id: 'facebook', name: 'Facebook', username: 'Jefferson Gonzales', icon: <Globe size={20} />, status: 'active', desc: 'Community & announcements.' },
  { id: 'instagram', name: 'Instagram', username: '@jeffersongonzales', icon: <Globe size={20} />, status: 'active', desc: 'Behind the scenes & visual work.' },
  { id: 'discord', name: 'Discord', username: 'jeffgonzales#1234', icon: <MessageSquare size={20} />, status: 'active', desc: 'Real-time chat & collaboration.' },
  { id: 'telegram', name: 'Telegram', username: '@jeffersongonzales', icon: <Send size={20} />, status: 'active', desc: 'Quick secure messaging.' },
  { id: 'whatsapp', name: 'WhatsApp', username: '+63 900 000 0000', icon: <Phone size={20} />, status: 'active', desc: 'Direct business messaging.' },
  { id: 'youtube', name: 'YouTube', username: 'JeffersonGonzalesTV', icon: <Terminal size={20} />, status: 'future', desc: 'Tutorials & case studies.' },
  { id: 'x', name: 'X (Twitter)', username: '@jeffgonzales_x', icon: <MessageSquare size={20} />, status: 'future', desc: 'Tech thoughts & industry news.' },
  { id: 'medium', name: 'Medium', username: '@jeffersongonzales', icon: <FileText size={20} />, status: 'future', desc: 'Long-form technical articles.' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', country: '', subject: '', 
    service: '', budget: '', timeline: '', message: '', privacy: false
  });
  
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid Email is required.';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim() || formData.message.length < 20) newErrors.message = 'Message must be at least 20 characters.';
    if (!formData.privacy) newErrors.privacy = 'You must agree to the Privacy Policy.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus('error');
      return;
    }

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', country: '', subject: '', service: '', budget: '', timeline: '', message: '', privacy: false });
      setTimeout(() => setStatus('idle'), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 overflow-x-hidden relative selection:bg-blue-500/30 selection:text-blue-200 pt-32 pb-24 px-6">
      
      {/* Background Glow Atmospheric Nodes */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[150px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] right-[-10%] w-[700px] h-[700px] bg-emerald-600/20 rounded-full blur-[160px]" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-10%] left-[20%] w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Contact Hero */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold mb-6">
            <Globe size={14} /> Open for Opportunities
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Let's Build Something <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 drop-shadow-sm">
              Meaningful Together.
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 leading-relaxed">
            Whether you're looking for a Graphic Designer, Data Analyst, AI-Assisted Full-Stack Developer, business collaborator, or simply want to connect, I'd love to hear from you. 
            <br/><br/>
            Every successful project begins with a conversation. Let's create something great together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form Container */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-7">
            <div className="p-6 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Full Name <span className="text-red-400">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={status === 'loading'}
                      className={`w-full bg-black/40 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-colors`}
                      placeholder="John Doe" />
                    {errors.name && <span className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</span>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Email Address <span className="text-red-400">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={status === 'loading'}
                      className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-colors`}
                      placeholder="john@company.com" />
                    {errors.email && <span className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</span>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Company <span className="text-slate-600 font-normal">(Optional)</span></label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={status === 'loading'}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-colors"
                      placeholder="Organization Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Phone / Country <span className="text-slate-600 font-normal">(Optional)</span></label>
                    <div className="flex gap-2">
                      <input type="text" name="country" value={formData.country} onChange={handleChange} disabled={status === 'loading'}
                        className="w-1/3 bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-colors text-center"
                        placeholder="US" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={status === 'loading'}
                        className="w-2/3 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-colors"
                        placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Subject <span className="text-red-400">*</span></label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} disabled={status === 'loading'}
                    className={`w-full bg-black/40 border ${errors.subject ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-colors`}
                    placeholder="Project Inquiry" />
                  {errors.subject && <span className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.subject}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Service Interested In</label>
                    <select name="service" value={formData.service} onChange={handleChange} disabled={status === 'loading'}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-colors appearance-none cursor-pointer">
                      <option value="">Select a Service...</option>
                      <option value="Dream Creations">Dream Creations (Design)</option>
                      <option value="Data Analytics">Data Analytics & Dashboards</option>
                      <option value="AI Development">AI Development & Web Apps</option>
                      <option value="Business Automation">Business Workflow Automation</option>
                      <option value="Other">Other / General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Budget Range <span className="text-slate-600 font-normal">(Optional)</span></label>
                    <select name="budget" value={formData.budget} onChange={handleChange} disabled={status === 'loading'}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-colors appearance-none cursor-pointer">
                      <option value="">Select Range...</option>
                      <option value="< $1,000">Less than $1,000</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Message <span className="text-red-400">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} disabled={status === 'loading'} rows={5}
                    className={`w-full bg-black/40 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-colors resize-none`}
                    placeholder="Tell me about your project, timeline, and goals..." />
                  {errors.message && <span className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.message}</span>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} disabled={status === 'loading'}
                        className="peer appearance-none w-5 h-5 rounded border border-white/20 bg-black/40 checked:bg-blue-500 checked:border-blue-500 transition-colors cursor-pointer" />
                      <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                      I agree to the processing of my personal data for the purpose of communicating regarding my inquiry. I understand that my information is secure and will not be shared. <span className="text-red-400">*</span>
                    </span>
                  </label>
                  {errors.privacy && <span className="text-xs text-red-400 mt-2 flex items-center gap-1"><AlertCircle size={12}/> {errors.privacy}</span>}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button type="submit" disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {status === 'loading' ? 'Sending Message...' : 'Send Message'}
                  </button>

                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                        <CheckCircle2 size={18} /> Message Sent Successfully!
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                        <AlertCircle size={18} /> Please fix the errors above.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </form>
            </div>
          </motion.div>

          {/* Connect With Me Panel */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-5 space-y-6">
            
            <motion.div variants={fadeUp}>
              <h3 className="text-2xl font-bold text-white mb-2">Connect With Me</h3>
              <p className="text-sm text-slate-400 mb-8">Reach out across platforms or download my professional resources.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mb-8">
              <a href="#" className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all flex flex-col items-center justify-center gap-3 group text-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download size={18} />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block mb-0.5 group-hover:text-blue-300">Resume</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">PDF format</span>
                </div>
              </a>
              <a href="#" className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all flex flex-col items-center justify-center gap-3 group text-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText size={18} />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block mb-0.5 group-hover:text-purple-300">Portfolio</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">PDF format</span>
                </div>
              </a>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-[500px] overflow-y-auto pr-2 hide-scrollbar">
              <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
              
              {connectPlatforms.map((platform) => (
                <motion.a 
                  variants={fadeUp}
                  key={platform.id}
                  href="#"
                  className={`p-4 rounded-xl border flex flex-col gap-3 transition-all group ${
                    platform.status === 'future' 
                    ? 'bg-black/20 border-white/5 opacity-60 hover:opacity-100 cursor-default' 
                    : 'bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${platform.status === 'future' ? 'bg-white/5 text-slate-500' : 'bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform'}`}>
                      {platform.icon}
                    </div>
                    {platform.status === 'future' && (
                      <span className="text-[9px] px-2 py-0.5 rounded border border-white/10 text-slate-500 font-semibold uppercase tracking-wider">Future</span>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-0.5 ${platform.status === 'future' ? 'text-slate-400' : 'text-white'}`}>{platform.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{platform.username}</p>
                  </div>
                </motion.a>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}