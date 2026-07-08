// src/pages/DreamCreations.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Layout, Image as ImageIcon, MonitorSmartphone, Building2, HeartPulse, ShoppingBag, Briefcase, Globe, MonitorPlay, Palette, Info, LayoutGrid, Eye, Mail } from 'lucide-react';

const services = [
  { id: 1, title: "Brand Identity", icon: <PenTool size={24} />, desc: "Crafting cohesive visual identities, logos, and brand guidelines that resonate with target audiences." },
  { id: 2, title: "UI/UX Design", icon: <Layout size={24} />, desc: "Designing intuitive, user-centric interfaces with a focus on conversion and seamless experiences." },
  { id: 3, title: "Digital Manipulation", icon: <ImageIcon size={24} />, desc: "Advanced photo restoration, color grading, and composite imagery for premium marketing." },
  { id: 4, title: "Marketing Materials", icon: <MonitorSmartphone size={24} />, desc: "High-conversion social media assets, print layouts, and digital campaign aesthetics." },
];

const featuredClients = [
  { id: 1, name: "Responsive Health", industry: "Insurance & Healthcare", icon: <HeartPulse size={32} /> },
  { id: 2, name: "Real Estate Partners", industry: "Property Development", icon: <Building2 size={32} /> },
  { id: 3, name: "Rich Ams Global", industry: "E-Commerce", icon: <ShoppingBag size={32} /> },
  { id: 4, name: "CapCut Creators", industry: "Digital Media", icon: <MonitorPlay size={32} /> },
  { id: 5, name: "Tech Startups", industry: "SaaS & Technology", icon: <Globe size={32} /> },
  { id: 6, name: "Corporate B2B", industry: "Consulting & Finance", icon: <Briefcase size={32} /> },
];

const portfolioPlaceholders = [1, 2, 3, 4, 5, 6];

const starsData = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 4,
  duration: 1.5 + Math.random() * 2,
  size: Math.random() * 2.5 + 1
}));

const cloudsData = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  top: `${10 + i * 15}%`,
  delay: -(Math.random() * 30),
  duration: 40 + Math.random() * 20,
  scale: 0.8 + Math.random() * 1.5
}));

export default function DreamCreations() {
  const containerRef = useRef(null);

  // Interactive Spaceshift Cursor effect tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        containerRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`);
        containerRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Quick action helper to jump to sections
  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col min-h-screen text-white overflow-x-hidden relative transition-colors duration-[10000ms] animate-nightSkyCycle spaceshift-cursor-glow"
    >
      
      <style>{`
        @keyframes nightSkyCycle {
          0%   { background-color: #1e1b4b; } 
          33%  { background-color: #0f172a; } 
          66%  { background-color: #020617; } 
          100% { background-color: #050508; } 
        }
        .animate-nightSkyCycle {
          animation: nightSkyCycle 25s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Twinkling Stars Matrix Field */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        {starsData.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.6)]"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [0.1, 1, 0.1] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Visible Drifting Night Clouds / Fog */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {cloudsData.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="absolute bg-white/10 blur-[40px] rounded-[100%]"
            style={{
              top: cloud.top,
              width: `${450 * cloud.scale}px`,
              height: `${120 * cloud.scale}px`,
            }}
            animate={{ x: ["110vw", "-50vw"] }}
            transition={{ duration: cloud.duration, repeat: Infinity, delay: cloud.delay, ease: "linear" }}
          />
        ))}
      </div>

      {/* Floating Artwork Previews */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
        <motion.div 
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-32 h-40 rounded-xl border border-[#1095d2]/20 bg-gradient-to-br from-[#1095d2]/10 to-transparent backdrop-blur-sm flex items-center justify-center"
        >
          <Palette size={40} className="text-[#1095d2]/40" />
        </motion.div>
        <motion.div 
          animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] right-[12%] w-48 h-32 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm"
        />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-20 px-6 min-h-[85vh] flex flex-col items-center justify-center text-center z-10">
        
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="absolute top-[40vh] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1095d2]/60 to-transparent -z-10"
        />

        <motion.div
          initial={{ y: 150, scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
          className="-mt-12 mb-16" 
        >
          <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-[0_0_50px_rgba(16,149,210,0.6)]">
            <defs>
              <filter id="moon-texture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0" in="noise" result="coloredNoise" />
                <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
                <feBlend mode="multiply" in="texture" in2="SourceGraphic" />
              </filter>
              
              <mask id="crescent-mask">
                <circle cx="100" cy="100" r="95" fill="white" />
                <circle cx="70" cy="95" r="85" fill="black" />
              </mask>

              <radialGradient id="moon-glow" cx="60%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#cffafe" />
                <stop offset="40%" stopColor="#1095d2" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
            </defs>
            
            <g mask="url(#crescent-mask)">
              <circle cx="100" cy="100" r="95" fill="url(#moon-glow)" filter="url(#moon-texture)" />
            </g>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto backdrop-blur-[2px] p-6 rounded-2xl border border-transparent z-10"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8">
            Let's make your <span className="text-[#1095d2]">dream</span> a reality.
          </h2>
          
          <div className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto text-center font-medium">
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            For over a decade Dream Creations has helped businesses, entrepreneurs, organizations, 
            and professionals transform ideas into compelling visual experiences.
          </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('mission-vision')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:border-[#1095d2]/50 hover:bg-white/20 text-white text-sm font-semibold transition-all backdrop-blur-md"
            >
              <Info size={16} />
              About Dream Creations
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:border-[#1095d2]/50 hover:bg-white/20 text-white text-sm font-semibold transition-all backdrop-blur-md"
            >
              <LayoutGrid size={16} />
              Our Creations
            </button>
            <button 
              onClick={() => scrollToSection('creations')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1095d2] hover:bg-[#0c7ab0] text-white text-sm font-semibold transition-all shadow-lg shadow-[#1095d2]/20"
            >
              <Mail size={16} />
              Contact Us
            </button>
          </div>
        </motion.div>
      </section>

      {/* Anchor targets for Hero Buttons */}
      <div id="mission-vision" className="scroll-mt-24" />
      <div id="services" className="scroll-mt-24" />
      <div id="creations" className="scroll-mt-24" />

      {/* ================= SERVICES SECTION ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative">
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Core Competencies</h3>
          <div className="w-16 h-1 bg-[#1095d2] rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-md hover:border-[#1095d2]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{service.title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= MEET THE FOUNDER SECTION ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center group">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#1095d2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="w-32 h-32 rounded-full border border-[#1095d2]/50 bg-black/50 flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_30px_rgba(16,149,210,0.3)] z-10 group-hover:scale-105 transition-transform duration-500">
                 JG
               </div>
               
               <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 z-10">
                 <p className="text-[#1095d2] text-xs font-bold uppercase tracking-wider mb-1">Founder & Creative Director</p>
                 <h4 className="text-white font-bold text-lg">Jefferson Gonzales</h4>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">The Mind Behind the Studio</h3>
              <div className="w-20 h-1 bg-[#1095d2] rounded-full" />
            </div>
            
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Dream Creations was born out of a passion for visual storytelling and a relentless drive for perfection. What started as an independent graphic design practice has evolved into a structured creative agency serving global clients.
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              With over a decade of experience across print, digital, and corporate design sectors, I bridge the gap between pure artistic creativity and structured business strategy. My goal is simple: to make your dream artworks a reality while ensuring they drive measurable impact for your brand.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-white/10 bg-black/20 hover:border-[#1095d2]/30 transition-colors">
                <div className="text-2xl font-bold text-[#1095d2] mb-1">10+</div>
                <div className="text-xs text-white/60 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black/20 hover:border-[#1095d2]/30 transition-colors">
                <div className="text-2xl font-bold text-[#1095d2] mb-1">200+</div>
                <div className="text-xs text-white/60 uppercase tracking-wider">Projects Delivered</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURED CLIENTS SECTION ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Trusted By</h3>
          <div className="w-16 h-1 bg-[#1095d2] rounded-full mx-auto" />
          <p className="text-sm text-white/60 mt-4 max-w-2xl mx-auto">
            Delivering premium visual solutions across diverse industries, from healthcare and real estate to e-commerce and corporate tech.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/5 bg-black/20 hover:bg-black/40 hover:border-[#1095d2]/30 transition-all duration-300 text-center"
            >
              <div className="text-white/40 group-hover:text-[#1095d2] transition-colors duration-300 mb-3">
                {client.icon}
              </div>
              <h4 className="text-sm font-bold text-white mb-1 leading-tight">{client.name}</h4>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">{client.industry}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PORTFOLIO GALLERY PREVIEW ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Selected Works</h3>
            <div className="w-16 h-1 bg-[#1095d2] rounded-full" />
          </div>
          <button className="px-5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold hover:bg-black/40 hover:text-[#1095d2] hover:border-[#1095d2]/30 transition-all">
            View Full Archive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
          {portfolioPlaceholders.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`rounded-2xl border border-white/10 bg-black/20 overflow-hidden group relative ${
                index === 0 || index === 3 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/20 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[#1095d2] text-xs font-bold uppercase tracking-wider mb-1">Production Project</span>
                <h4 className="text-white font-bold text-lg">Creative Asset Archive {item}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CALL TO ACTION SECTION ================= */}
      <section className="max-w-4xl mx-auto w-full px-6 py-24 z-10 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 md:p-14 rounded-3xl border border-[#1095d2]/20 bg-gradient-to-b from-[#1095d2]/10 to-black/40 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#1095d2]/20 blur-[80px] -z-10 pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Ready to build something <span className="text-[#1095d2]">extraordinary?</span>
          </h2>
          <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
            Let's collaborate to transform your vision into a compelling digital reality. Whether it's a complete brand overhaul or a targeted marketing campaign, the studio is ready.
          </p>
          <button className="px-8 py-4 rounded-xl bg-[#1095d2] text-white font-bold text-sm hover:bg-[#0c7ab0] transition-colors shadow-[0_0_20px_rgba(16,149,210,0.4)] hover:shadow-[0_0_30px_rgba(16,149,210,0.6)] group">
            Start a Project
          </button>
        </motion.div>
      </section>

    </div>
  );
}