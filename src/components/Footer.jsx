import { Link } from 'react-router-dom';
import { Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-glass-border bg-background-primary mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Brand & Statement */}
        <div className="flex flex-col gap-2 max-w-sm">
          <Link to="/" className="text-xl font-bold tracking-tight text-text-primary">
            Jefferson<span className="text-text-muted">.</span>
          </Link>
          <p className="text-sm text-text-secondary leading-relaxed">
            A continuous journey from Creative Professional to AI-Assisted Full-Stack Developer. Building premium digital experiences.
          </p>
        </div>

        {/* Quick Links & Socials */}
        <div className="flex flex-col items-start md:items-end gap-6">
          <div className="flex gap-4">
            {/* Native GitHub SVG */}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-glass-card border border-glass-border text-text-secondary hover:text-text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.2 5.2 0 0 0 19 5.5a5.2 5.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C7 2 5.9 2.3 5.9 2.3a5.2 5.2 0 0 0-.1 3.2 5.2 5.2 0 0 0-1.5 2.3c0 5.7 3.3 6.8 6.5 7.2a4.8 4.8 0 0 0-1 3.03V22"></path>
                <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
              </svg>
            </a>
            {/* Native LinkedIn SVG */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-glass-card border border-glass-border text-text-secondary hover:text-text-primary transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            {/* Lucide Mail Icon */}
            <a href="mailto:jeffersonguzmangonzales03@gmail.com" className="p-2 rounded-lg bg-glass-card border border-glass-border text-text-secondary hover:text-text-primary transition-colors">
              <Mail size={18} />
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-sm text-text-muted">
            <Link to="/contact" className="hover:text-text-primary transition-colors">Download Resumes</Link>
            <span>&copy; {currentYear} Jefferson Gonzales. All rights reserved.</span>
          </div>
        </div>
        
      </div>

      {/* Back to Top Button */}
      <div className="flex justify-center pb-8">
        <button 
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-medium text-text-muted hover:text-text-primary transition-colors"
        >
          <ArrowUp size={14} />
          BACK TO TOP
        </button>
      </div>
    </footer>
  );
}