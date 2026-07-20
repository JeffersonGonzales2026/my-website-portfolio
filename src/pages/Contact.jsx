// src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Loader2, CheckCircle2, AlertCircle, Mail, 
  Download, FileText, Globe
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// Map textual platform IDs safely back to your exact beautiful custom inline SVGs
const iconMap = {
  email: <Mail size={20} />,
  linkedin: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
  github: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>,
  facebook: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
  tiktok: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
  discord: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5.5a16 16 0 0 0-4-1.5.8.8 0 0 0-.5.9 14 14 0 0 0-6 0 .8.8 0 0 0-.5-.9 16 16 0 0 0-4 1.5C.5 13 .5 20.5 4 21.5a16 16 0 0 0 5-1.5 1 1 0 0 0 0-1.5 12 12 0 0 1-2-1 1 1 0 0 1 .5-1.5 9 9 0 0 0 9 0 1 1 0 0 1 .5 1.5 12 12 0 0 1-2 1 1 1 0 0 0 0 1.5 16 16 0 0 0 5 1.5C23.5 20.5 23.5 13 19 5.5z"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/></svg>,
  telegram: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  viber: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M16 8a4 4 0 0 1 4 4M12 4a10 10 0 0 1 10 10"/></svg>,
  lark: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12l20-8-5 18-4-6-6-4z"/></svg>,
  youtube: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>,
  x: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 0.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
  medium: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="6" cy="12" rx="6" ry="6"/><ellipse cx="16" cy="12" rx="3" ry="6"/><ellipse cx="21" cy="12" rx="1" ry="6"/></svg>,
  behance: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M7 5h5a3 3 0 0 1 0 6H7V5z"/><path d="M7 11h5.5a3.5 3.5 0 0 1 0 7H7v-7z"/><path d="M16 9h4"/></svg>,
  dribbble: <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"/></svg>
};

const staticPlatforms = [
  { id: 'email', name: 'Email', username: 'jeffersonguzmangonzales03@gmail.com', link: 'mailto:jeffersonguzmangonzales03@gmail.com', status: 'active' },
  { id: 'github', name: 'GitHub', username: 'Jefferson Gonzales', link: 'https://github.com/jeffersongonzales', status: 'active' },
  { id: 'linkedin', name: 'LinkedIn', username: 'jefferson Gonzales', link: 'https://linkedin.com/in/jeffersongonzales', status: 'active' },
  { id: 'facebook', name: 'Facebook', username: 'Jefferson Guzman Gonzales', link: 'https://www.facebook.com/jefferson.gonzales.1276', status: 'active' },
  { id: 'instagram', name: 'Instagram', username: '@jeff.creates', link: 'https://instagram.com/jeff.creates', status: 'future' },
  { id: 'tiktok', name: 'TikTok', username: '@jeff.tiktok', link: 'https://tiktok.com/@jeff.tiktok', status: 'future' },
  { id: 'discord', name: 'Discord', username: 'jeff.san', link: 'https://discord.com/users/1129777754162864170', status: 'active' },
  { id: 'telegram', name: 'Telegram', username: '@JGonzales1998', link: 'http://t.me/JGonzales1998', status: 'active' },
  { id: 'whatsapp', name: 'WhatsApp', username: '+63 995 108 9702', link: 'https://wa.me/639951089702', status: 'active' },
  { id: 'viber', name: 'Viber', username: '+63 995 108 9702', link: 'viber://chat?number=+639951089702', status: 'active' },
  { id: 'lark', name: 'Lark', username: 'Jefferson Gonzales', link: 'https://www.larksuite.com/invitation/page/add_contact/?token=dabs9c43-5411-4952-bda0-4d3663psg59r&unique_id=TFJ-j-J30Djwdid6umvFrA==', status: 'active' },
  { id: 'youtube', name: 'YouTube', username: 'Channel Name', link: '#', status: 'future' },
  { id: 'x', name: 'X', username: '@jeff_x', link: '#', status: 'future' },
  { id: 'medium', name: 'Medium', username: '@jeff_writes', link: '#', status: 'future' },
  { id: 'behance', name: 'Behance', username: 'jeff_designs', link: '#', status: 'future' },
  { id: 'dribbble', name: 'Dribbble', username: 'jeff_dribbble', link: '#', status: 'future' }
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
  const [platforms, setPlatforms] = useState(staticPlatforms);

  const [resumeUrl, setResumeUrl] = useState("/Jefferson_Gonzales_Resume.pdf");
  const [portfolioUrl, setPortfolioUrl] = useState("/Jefferson_Gonzales_Portfolio.pdf");

  const [cmsResumes, setCmsResumes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from('contact_settings').select('*').eq('id', 1).single();
        if (error && error.code !== 'PGRST116') throw error;
        if (data) {
          if (data.resume_url) setResumeUrl(data.resume_url);
          if (data.portfolio_url) setPortfolioUrl(data.portfolio_url);
        }
      } catch (err) {
        console.error("Settings directory fetch failure:", err.message);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data, error } = await supabase.from('portfolio_resumes').select('*').order('id', { ascending: true });
        if (error && error.code !== '42P01') throw error; 
        if (data && data.length > 0) setCmsResumes(data);
      } catch (err) {
        console.error("CMS Resumes fetch failure:", err.message);
      }
    };
    fetchResumes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrors({});
   
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid Email is required.';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim() || formData.message.length < 20) newErrors.message = 'Message must be at least 20 characters.';
    if (!formData.privacy) newErrors.privacy = 'You must agree to the Privacy Policy.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus('validation_error');
      return;
    }

    try {
      const { error } = await supabase.from('contact_messages').insert([{
        sender_name: formData.name, sender_email: formData.email, company: formData.company || null,
        subject: formData.subject, service_interested: formData.service || null, message: formData.message, status: 'unread'
      }]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', country: '', subject: '', service: '', budget: '', timeline: '', message: '', privacy: false });
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Supabase submission execution crash:', error.message);
      setStatus('database_error');
    }
  };

  return (
    // CLASSY MATTED BLACK BASE: Removed all bright colors. Using strict monochrome (zinc/silver/white)
    <div className="min-h-screen flex flex-col relative bg-[#121212] text-zinc-300 overflow-x-hidden selection:bg-zinc-700 selection:text-white pt-32 pb-24 px-6">
      
      {/* Soft Matte Inner Glow */}
      <div className="absolute top-0 inset-x-0 h-[80vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.04),transparent)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 w-full flex-grow">
        
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700 text-zinc-300 text-xs font-semibold mb-6">
            <Globe size={14} /> Open for Opportunities
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Let's Build Something <br/>
            <span className="text-zinc-400 drop-shadow-sm">
              Meaningful Together.
            </span>
          </h1>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
            Whether you're looking for a Graphic Designer, Data Analyst, AI-Assisted Full-Stack Developer, business collaborator, or simply want to connect, I'd love to hear from you.
            <br/><br/>
            Every successful project begins with a conversation. Let's create something great together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="lg:col-span-7">
            <div className="p-6 md:p-10 rounded-3xl bg-[#18181b]/50 border border-zinc-800 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2">Full Name <span className="text-zinc-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={status === 'loading'}
                      className={`w-full bg-[#121212] border ${errors.name ? 'border-red-900/50' : 'border-zinc-800'} rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors`}
                      placeholder="John Doe" />
                    {errors.name && <span className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.name}</span>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2">Email Address <span className="text-zinc-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={status === 'loading'}
                      className={`w-full bg-[#121212] border ${errors.email ? 'border-red-900/50' : 'border-zinc-800'} rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors`}
                      placeholder="john@company.com" />
                    {errors.email && <span className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.email}</span>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2">Company <span className="text-zinc-600 font-normal">(Optional)</span></label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={status === 'loading'}
                      className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors"
                      placeholder="Organization Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2">Phone / Country <span className="text-zinc-600 font-normal">(Optional)</span></label>
                    <div className="flex gap-2">
                      <input type="text" name="country" value={formData.country} onChange={handleChange} disabled={status === 'loading'}
                        className="w-1/3 bg-[#121212] border border-zinc-800 rounded-xl px-3 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors text-center"
                        placeholder="US" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={status === 'loading'}
                        className="w-2/3 bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors"
                        placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2">Subject <span className="text-zinc-500">*</span></label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} disabled={status === 'loading'}
                    className={`w-full bg-[#121212] border ${errors.subject ? 'border-red-900/50' : 'border-zinc-800'} rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors`}
                    placeholder="Project Inquiry" />
                  {errors.subject && <span className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.subject}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2">Service Interested In</label>
                    <select name="service" value={formData.service} onChange={handleChange} disabled={status === 'loading'}
                      className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors appearance-none cursor-pointer">
                      <option value="">Select a Service...</option>
                      <option value="Dream Creations">Dream Creations (Design)</option>
                      <option value="Data Analytics">Data Analytics & Dashboards</option>
                      <option value="AI Development">AI Development & Web Apps</option>
                      <option value="Business Automation">Business Workflow Automation</option>
                      <option value="Other">Other / General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2">Budget Range <span className="text-zinc-600 font-normal">(Optional)</span></label>
                    <select name="budget" value={formData.budget} onChange={handleChange} disabled={status === 'loading'}
                      className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors appearance-none cursor-pointer">
                      <option value="">Select Range...</option>
                      <option value="< $1,000">Less than $1,000</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2">Message <span className="text-zinc-500">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} disabled={status === 'loading'} rows={5}
                    className={`w-full bg-[#121212] border ${errors.message ? 'border-red-900/50' : 'border-zinc-800'} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 focus:bg-[#18181b] transition-colors resize-none`}
                    placeholder="Tell me about your project, timeline, and goals..." />
                  {errors.message && <span className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle size={12}/> {errors.message}</span>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} disabled={status === 'loading'}
                        className="peer appearance-none w-5 h-5 rounded border border-zinc-700 bg-[#121212] checked:bg-zinc-600 checked:border-zinc-500 transition-colors cursor-pointer" />
                      <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors leading-relaxed">
                      I agree to the processing of my personal data for the purpose of communicating regarding my inquiry. I understand that my information is secure and will not be shared. <span className="text-zinc-600">*</span>
                    </span>
                  </label>
                  {errors.privacy && <span className="text-xs text-red-400 mt-2 flex items-center gap-1"><AlertCircle size={12}/> {errors.privacy}</span>}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button type="submit" disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-zinc-200 text-black font-bold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                    {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {status === 'loading' ? 'Sending Message...' : 'Send Message'}
                  </button>

                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-zinc-300 text-sm font-semibold">
                        <CheckCircle2 size={18} className="text-zinc-400" /> Message Sent Successfully!
                      </motion.div>
                    )}
                    {status === 'validation_error' && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-zinc-400 text-sm font-semibold">
                        <AlertCircle size={18} /> Please fix the validation errors above.
                      </motion.div>
                    )}
                    {status === 'database_error' && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-zinc-400 text-sm font-semibold">
                        <AlertCircle size={18} /> Connection Blocked. Ensure SQL policies are enabled.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </form>
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-5 space-y-6">
            
            <motion.div variants={fadeUp}>
              <h3 className="text-2xl font-bold text-white mb-2">Connect With Me</h3>
              <p className="text-sm text-zinc-400 mb-8">Reach out across platforms or download my professional resources.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mb-8">
              
              <div className="relative w-full h-full z-20">
                <button 
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="w-full h-full p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all flex flex-col items-center justify-center gap-3 group text-center cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Download size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-zinc-200 block mb-0.5 group-hover:text-white">Resume</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">PDF format</span>
                  </div>
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 top-[105%] mt-2 bg-[#121212] border border-zinc-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
                    >
                      {cmsResumes.length > 0 ? (
                        cmsResumes.map((res, i) => (
                          <a 
                            key={res.id || i}
                            href={res.file_url || res.pdf_url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-3 text-sm font-bold text-zinc-300 hover:text-white hover:bg-zinc-800/50 border-b border-zinc-800/50 last:border-0 transition-colors flex items-center gap-2"
                          >
                            <FileText size={14} /> {res.title || res.profession_title || `Resume ${i+1}`}
                          </a>
                        ))
                      ) : (
                        <a 
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 text-sm font-bold text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors flex items-center gap-2"
                        >
                          <FileText size={14} /> Primary Resume
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all flex flex-col items-center justify-center gap-3 group text-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText size={18} />
                </div>
                <div>
                  <span className="text-sm font-bold text-zinc-200 block mb-0.5 group-hover:text-white">Portfolio</span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">PDF format</span>
                </div>
              </a>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
              `}</style>
              
              {platforms.map((platform) => (
                <motion.a
                  variants={fadeUp}
                  key={platform.id}
                  href={platform.status === 'future' ? '#' : platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl border flex flex-col gap-3 transition-all group ${
                    platform.status === 'future'
                    ? 'bg-zinc-900/20 border-zinc-800/50 opacity-40 cursor-default select-none'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/60 cursor-pointer'
                  }`}
                  onClick={(e) => {
                    if (platform.status === 'future') e.preventDefault();
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${platform.status === 'future' ? 'bg-zinc-800/50 text-zinc-600' : 'bg-zinc-800 text-zinc-300 group-hover:scale-110 group-hover:text-white transition-all'}`}>
                      {iconMap[platform.id] || <Globe size={20} />}
                    </div>
                    {platform.status === 'future' && (
                      <span className="text-[9px] px-2 py-0.5 rounded border border-zinc-700 text-zinc-500 font-semibold uppercase tracking-wider">Future</span>
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold mb-0.5 ${platform.status === 'future' ? 'text-zinc-500' : 'text-zinc-200 group-hover:text-white transition-colors'}`}>{platform.name}</h4>
                    <p className="text-xs text-zinc-500 truncate font-mono">{platform.username}</p>
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