// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Removed Github and Linkedin from here to prevent crashes!
import { Mail, Code2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#02040a] border-t border-white/10 pt-16 pb-8 px-6 text-slate-400 relative z-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Branding & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-black text-white tracking-tight">
                Jefferson Gonzales<span className="text-blue-500">.</span>
              </h3>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Bridging the gap between creative design, data analytics, and AI-assisted full-stack development.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                Founder, Dream Creations
              </span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-4 md:col-start-6 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Legal & Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link to="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</Link></li>
              <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Connect</h4>
            <div className="flex flex-col space-y-3 text-sm">
              <a href="https://github.com/jeffersongonzales" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                {/* Replaced with inline SVG for GitHub */}
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 group-hover:text-cyan-400 transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </a>
              <a href="https://linkedin.com/in/jeffersongonzales" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                {/* Replaced with inline SVG for LinkedIn */}
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 group-hover:text-blue-400 transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
              <a href="mailto:hello@jeffersongonzales.com" className="flex items-center gap-3 hover:text-emerald-400 transition-colors group">
                <Mail size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors" /> Email
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Section: Metadata & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span>&copy; {currentYear} Jefferson Gonzales. All rights reserved.</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Code2 size={12} /> Built with React, Vite & Tailwind CSS
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              STATUS: ONLINE
            </div>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">v1.0.0</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Build: July 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
}