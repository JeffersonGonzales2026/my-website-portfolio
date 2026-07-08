// src/pages/DreamCreations.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PenTool, Layout, Image as ImageIcon, MonitorSmartphone, Building2, HeartPulse, ShoppingBag, Briefcase, Globe, MonitorPlay, Palette, Info, LayoutGrid, Eye, Mail, Fingerprint, Share2, FileText, Video, MousePointerClick, Shirt, Printer, Box, Pencil, X, ArrowRight, Star, Quote, Calculator } from 'lucide-react';

const featuredClients = [
  { id: 1, name: "Responsive Health", industry: "Insurance & Healthcare", icon: <HeartPulse size={32} /> },
  { id: 2, name: "Real Estate Partners", industry: "Property Development", icon: <Building2 size={32} /> },
  { id: 3, name: "Rich Ams Global", industry: "E-Commerce", icon: <ShoppingBag size={32} /> },
  { id: 4, name: "CapCut Creators", industry: "Digital Media", icon: <MonitorPlay size={32} /> },
  { id: 5, name: "Tech Startups", industry: "SaaS & Technology", icon: <Globe size={32} /> },
  { id: 6, name: "Corporate B2B", industry: "Consulting & Finance", icon: <Briefcase size={32} /> },
];

const creationsCategories = [
  { id: 1, category: "Branding & Identity", icon: <Fingerprint size={16} />, items: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Refresh", "Brand Assets", "Business Identity Systems"] },
  { id: 2, category: "Graphic Design", icon: <PenTool size={16} />, items: ["Marketing Graphics", "Corporate Graphics", "Advertising Materials", "Print Design", "Creative Campaigns", "Promotional Graphics"] },
  { id: 3, category: "Social Media Design", icon: <Share2 size={16} />, items: ["Facebook Graphics", "Instagram Posts", "Carousel Posts", "Story Designs", "LinkedIn Graphics", "Social Media Campaigns", "Cover Photos", "Profile Branding"] },
  { id: 4, category: "Marketing Materials", icon: <FileText size={16} />, items: ["Flyers", "Brochures", "Company Profiles", "Catalogs", "Product Sheets", "Sales Kits", "Business Presentations"] },
  { id: 5, category: "Motion Graphics", icon: <Video size={16} />, items: ["Animated Ads", "Product Promotions", "Marketing Videos", "Social Media Motion Graphics", "Explainer Videos", "Logo Animation", "Video Thumbnails"] },
  { id: 6, category: "Web Graphics", icon: <MousePointerClick size={16} />, items: ["Website Banners", "Landing Page Graphics", "Icons", "UI Graphics", "Email Graphics", "WordPress Assets"] },
  { id: 7, category: "Photo Editing", icon: <ImageIcon size={16} />, items: ["Photo Retouching", "Photo Restoration", "Watercolor Portraits", "Background Removal", "Image Manipulation", "Color Correction", "Composite Editing"] },
  { id: 8, category: "Apparel Design", icon: <Shirt size={16} />, items: ["Shirt Designs", "Streetwear Graphics", "Mockups", "Print-ready Artwork"] },
  { id: 9, category: "Print Production", icon: <Printer size={16} />, items: ["Tarpaulins", "Calling Cards", "Invitations", "Souvenirs", "ID Cards", "Certificates", "Book Covers", "Menu Cards"] },
  { id: 10, category: "Packaging", icon: <Box size={16} />, items: ["Packaging Graphics", "Clothing Labels", "Product Labels"] },
  { id: 11, category: "Illustration", icon: <Pencil size={16} />, items: ["Vector Artwork", "Cartoon Portraits", "Character Illustration", "Icon Design", "Seamless Patterns", "Digital Illustration"] }
];

const softwareExpertise = [
  { id: 1, name: "Photoshop", imageSrc: "/images/photoshop.png" },
  { id: 2, name: "Illustrator", imageSrc: "/images/illustrator.png" },
  { id: 3, name: "Premiere Pro", imageSrc: "/images/premiere.png" },
  { id: 4, name: "After Effects", imageSrc: "/images/aftereffects.png" },
  { id: 5, name: "Canva", imageSrc: "/images/canva.png" },
  { id: 6, name: "CapCut", imageSrc: "/images/capcut.png" },
  { id: 7, name: "Microsoft Office", imageSrc: "/images/msoffice.png" },
  { id: 8, name: "WordPress", imageSrc: "/images/wordpress.png" },
  { id: 9, name: "AI Design Tools", imageSrc: "/images/ai-tools.png" },
];

const creativeProcess = [
  { step: 1, title: "Client Consultation", desc: "Understand goals & vision." },
  { step: 2, title: "Requirements Gathering", desc: "Scope & timelines." },
  { step: 3, title: "Research", desc: "Competitors & audience." },
  { step: 4, title: "Concept Development", desc: "Brainstorming ideas." },
  { step: 5, title: "Sketches / Ideas", desc: "Rough visual drafts." },
  { step: 6, title: "Design Production", desc: "High-fidelity artwork." },
  { step: 7, title: "Internal Review", desc: "Quality assurance." },
  { step: 8, title: "Client Presentation", desc: "Showcase for feedback." },
  { step: 9, title: "Revisions", desc: "Refine based on input." },
  { step: 10, title: "Final Approval", desc: "Client sign-off." },
  { step: 11, title: "Production", desc: "Prepare final files." },
  { step: 12, title: "Delivery", desc: "Handover assets." },
  { step: 13, title: "Post-Project Support", desc: "Ongoing assistance." }
];

const testimonials = [
  { id: 1, name: "Sarah Jenkins", company: "Responsive Health", project: "Brand Identity", rating: 5, feedback: "Dream Creations completely transformed our visual identity. The level of professionalism and the quality of the final assets exceeded our expectations." },
  { id: 2, name: "Mark Tolentino", company: "Real Estate Partners", project: "Marketing Materials", rating: 5, feedback: "Fast, reliable, and incredibly creative. The brochures and social media assets they produced helped us close three major properties this quarter." },
  { id: 3, name: "Elena Rostova", company: "Tech Startups Inc.", project: "UI/UX & Motion Graphics", rating: 5, feedback: "We needed a complete overhaul of our app interface and explainer videos. The team delivered a sleek, modern aesthetic that our users love." }
];

// Sections 30 & 31: Portfolio Categories & Creations Showcase Data
const portfolioCategories = ["All", "Brand Identity", "Marketing Materials", "Social Media", "Motion Graphics", "Web Design"];

const portfolioWorks = [
  { id: 1, title: "Responsive Health Rebrand", category: "Brand Identity", desc: "Complete visual identity and brand guidelines for a major healthcare provider.", image: "bg-gradient-to-br from-[#1095d2]/20 to-blue-900/40" },
  { id: 2, title: "Tech Startups Pitch Deck", category: "Marketing Materials", desc: "High-conversion sales presentation design.", image: "bg-gradient-to-tr from-purple-500/20 to-pink-900/40" },
  { id: 3, title: "E-Commerce Promo Campaign", category: "Social Media", desc: "Instagram and Facebook ad creatives.", image: "bg-gradient-to-tl from-emerald-500/20 to-teal-900/40" },
  { id: 4, title: "App Explainer Video", category: "Motion Graphics", desc: "Sleek animated advertisement for iOS application.", image: "bg-gradient-to-bl from-orange-500/20 to-red-900/40" },
  { id: 5, title: "Modern Real Estate UI", category: "Web Design", desc: "Landing page graphics and UI assets.", image: "bg-gradient-to-t from-cyan-500/20 to-blue-900/40" },
  { id: 6, title: "Urban Streetwear Mockups", category: "Brand Identity", desc: "Premium apparel designs and clothing labels.", image: "bg-gradient-to-b from-zinc-500/20 to-zinc-900/40" },
];

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
  const [activeCreationPopup, setActiveCreationPopup] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Adjusted Scroll Tracking for Creative Process
  const processScrollRef = useRef(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processScrollRef,
    offset: ["start 50%", "end end"]
  });
  
  // Increased transform distance to -82% so it reaches Phase 13
  const processX = useTransform(processProgress, [0, 1], ["5%", "-88%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${e.clientX}px`);
        containerRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubtitleClick = (subtitleName) => {
    setActiveCreationPopup(null);
    setTimeout(() => {
      scrollToSection('portfolio-gallery');
    }, 300);
  };

  const filteredWorks = activeCategory === "All" 
    ? portfolioWorks 
    : portfolioWorks.filter(work => work.category === activeCategory);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col min-h-screen text-white overflow-x-hidden relative transition-colors duration-[10000ms] animate-nightSkyCycle"
    >
      <div 
        className="fixed inset-0 z-50 pointer-events-none mix-blend-screen"
        style={{ background: 'radial-gradient(600px circle at var(--x, 50vw) var(--y, 50vh), rgba(16, 149, 210, 0.08), transparent 40%)' }}
      />

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

      {/* Background Elements */}
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
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {cloudsData.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="absolute bg-white/10 blur-[40px] rounded-[100%]"
            style={{ top: cloud.top, width: `${450 * cloud.scale}px`, height: `${120 * cloud.scale}px` }}
            animate={{ x: ["110vw", "-50vw"] }}
            transition={{ duration: cloud.duration, repeat: Infinity, delay: cloud.delay, ease: "linear" }}
          />
        ))}
      </div>
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
            For over a decade, Dream Creations has transformed ideas into compelling visual experiences while empowering dreamers (clients) and creators (designers) to bring their visions to life.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('founder-bio')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:border-[#1095d2]/50 hover:bg-white/20 text-white text-sm font-semibold transition-all backdrop-blur-md cursor-pointer relative z-20"
            >
              <Info size={16} /> About Dream Creations
            </button>
            <button 
              onClick={() => scrollToSection('creations-grid')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:border-[#1095d2]/50 hover:bg-white/20 text-white text-sm font-semibold transition-all backdrop-blur-md cursor-pointer relative z-20"
            >
              <LayoutGrid size={16} /> Our Creations
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1095d2] hover:bg-[#0c7ab0] text-white text-sm font-semibold transition-all shadow-lg shadow-[#1095d2]/20 cursor-pointer relative z-20"
            >
              <Mail size={16} /> Contact Us
            </button>
          </div>
        </motion.div>
      </section>

      <div id="creations-grid" className="scroll-mt-24" />

      {/* ================= 29. CREATIONS SECTION ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative">
        <div className="mb-12 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Our Creations</h3>
          <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto md:mx-0" />
          <p className="text-base text-white/70 mt-4 max-w-2xl">
            Explore our specialized creative categories. Click any box to view our specific offerings and jump directly to our past works.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {creationsCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCreationPopup(category)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
              className="p-3 h-28 rounded-xl bg-black/30 border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:border-[#1095d2]/50 hover:bg-[#1095d2]/10 transition-all duration-300 group flex flex-col items-center justify-center text-center shadow-lg cursor-pointer relative z-20"
            >
              <div className="text-white/60 group-hover:text-[#1095d2] transition-colors duration-300 mb-2 group-hover:scale-110">
                {category.icon}
              </div>
              <h4 className="text-[11px] font-bold text-white/90 group-hover:text-white transition-colors leading-tight px-1">
                {category.category}
              </h4>
            </motion.button>
          ))}
        </div>
      </section>

      <div id="founder-bio" className="scroll-mt-24" />

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

      {/* ================= 34. SOFTWARE EXPERTISE ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="mb-12 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Software Expertise</h3>
          <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto md:mx-0" />
          <p className="text-base text-white/70 mt-4 max-w-2xl">
            Proficient across the industry's leading creative and management tools.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          {softwareExpertise.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-center gap-3 w-24 sm:w-28 group"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 overflow-hidden bg-black/40 hover:border-[#1095d2]/40">
                <img 
                  src={tool.imageSrc} 
                  alt={tool.name} 
                  className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                />
              </div>
              <span className="text-[10px] md:text-xs text-center font-semibold text-white/60 group-hover:text-white transition-colors">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= 35. CREATIVE PROCESS (AUTO-SCROLLING HORIZONTAL TRACK) ================= */}
      {/* Reduced height from 150vh to 120vh so it resolves faster and leaves no gap */}
      <section ref={processScrollRef} className="w-full h-[120vh] z-10 relative bg-transparent">
        
        {/* Changed from h-screen to py-12 top-24 to fix the empty gap bug */}
        <div className="sticky top-24 overflow-hidden border-y border-white/10 bg-black/10 backdrop-blur-sm py-12">
          
          <div className="mb-10 px-6 text-center">
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Creative Process</h3>
            <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto" />
            <p className="text-base text-white/70 mt-4 max-w-2xl mx-auto">
              Scroll down to journey through our structured, transparent workflow.
            </p>
          </div>

          <motion.div style={{ x: processX }} className="flex gap-4 md:gap-6 px-6 w-max items-center pr-24">
            {creativeProcess.map((item, index) => (
              <React.Fragment key={item.step}>
                <div className="shrink-0 w-44 md:w-56 p-5 md:p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col items-center text-center relative hover:bg-black/60 hover:border-[#1095d2]/50 transition-colors group shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-[#1095d2]/20 text-[#1095d2] flex items-center justify-center text-xs font-black mb-4 group-hover:scale-110 group-hover:bg-[#1095d2] group-hover:text-white transition-all shadow-[0_0_15px_rgba(16,149,210,0.3)]">
                    {item.step}
                  </div>
                  <h4 className="text-sm md:text-base font-bold text-white mb-2 leading-tight group-hover:text-[#1095d2] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/50 leading-tight">
                    {item.desc}
                  </p>
                </div>

                {index < creativeProcess.length - 1 && (
                  <div className="shrink-0 text-[#1095d2]/30 flex items-center justify-center">
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                      <ArrowRight size={24} />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 36. TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative">
        <div className="mb-16 text-center">
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Client Feedback</h3>
          <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto" />
          <p className="text-base text-white/70 mt-4 max-w-2xl mx-auto">
            What our partners and clients have to say about the Dream Creations experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-md flex flex-col relative group hover:border-[#1095d2]/40 transition-colors"
            >
              <Quote size={40} className="text-[#1095d2]/10 absolute top-6 right-6 group-hover:text-[#1095d2]/20 transition-colors" />
              <div className="flex gap-1 mb-6 text-[#1095d2]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-8 flex-grow italic">
                "{testimonial.feedback}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/50 border border-white/5">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{testimonial.name}</h4>
                  <p className="text-[10px] text-white/50">{testimonial.project} • {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED CLIENTS ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="mb-16 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Trusted By</h3>
          <div className="w-16 h-1 bg-[#1095d2] rounded-full mx-auto" />
          <p className="text-sm text-white/60 mt-4 max-w-2xl mx-auto">
            Delivering premium visual solutions across diverse industries.
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

      <div id="portfolio-gallery" className="scroll-mt-24" />

      {/* ================= 30 & 31. CREATIONS SHOWCASE & CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Selected Works</h3>
            <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto md:mx-0" />
            <p className="text-sm text-white/60 mt-4">
              Explore our recent projects tailored by specific creative categories.
            </p>
          </div>
          <button className="px-5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold hover:bg-black/40 hover:text-[#1095d2] hover:border-[#1095d2]/30 transition-all cursor-pointer relative z-20">
            View Full Archive
          </button>
        </div>

        {/* Dynamic Category Filter Row */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-10 relative z-20">
          {portfolioCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === category 
                  ? 'bg-[#1095d2] text-white shadow-[0_0_15px_rgba(16,149,210,0.4)]' 
                  : 'bg-black/30 border border-white/10 text-white/60 hover:text-white hover:border-[#1095d2]/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Dynamic Filtered Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border border-white/10 overflow-hidden group relative cursor-pointer z-20 ${work.image}`}
              >
                {/* Simulated Image Placeholder (Can be replaced with standard <img> tags later) */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[#1095d2] text-[10px] font-black uppercase tracking-wider mb-2 block">
                    {work.category}
                  </span>
                  <h4 className="text-white font-bold text-xl mb-1">{work.title}</h4>
                  <p className="text-xs text-white/70 line-clamp-2">{work.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ================= 38. PRICING / PROJECT INVESTMENT ================= */}
      <section className="max-w-4xl mx-auto w-full px-6 pt-24 pb-12 z-10 relative text-center border-t border-white/10 mt-10">
        <div className="mb-12">
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Project Investment</h3>
          <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-10 md:p-14 rounded-3xl border border-[#1095d2]/20 bg-gradient-to-b from-[#1095d2]/10 to-black/40 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#1095d2]/20 blur-[80px] -z-10 pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-[#1095d2]/20 text-[#1095d2] flex items-center justify-center mx-auto mb-6">
            <Calculator size={32} />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Custom Tailored <span className="text-[#1095d2]">Quotations</span>
          </h2>
          <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
            Every dream is unique. Rather than offering rigid pricing tiers, we provide tailored quotations based exactly on your specific project requirements, timeline, and requested deliverables. Let's discuss your vision.
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="px-8 py-4 rounded-xl bg-[#1095d2] text-white font-bold text-sm hover:bg-[#0c7ab0] transition-colors shadow-[0_0_20px_rgba(16,149,210,0.4)] hover:shadow-[0_0_30px_rgba(16,149,210,0.6)] group cursor-pointer relative z-20"
          >
            Request a Quote
          </button>
        </motion.div>
      </section>

      {/* ================= INTERACTIVE POP-UP MODAL ================= */}
      <AnimatePresence>
        {activeCreationPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCreationPopup(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0b1026] border border-[#1095d2]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(16,149,210,0.4)] overflow-hidden"
            >
              <button 
                onClick={() => setActiveCreationPopup(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#1095d2]/20 text-[#1095d2] flex items-center justify-center shrink-0">
                  {activeCreationPopup.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {activeCreationPopup.category}
                  </h3>
                  <p className="text-xs md:text-sm text-white/60">Select a specific area to view works</p>
                </div>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeCreationPopup.items.map((item, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => handleSubtitleClick(item)}
                      className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#1095d2]/40 hover:bg-[#1095d2]/10 transition-all group cursor-pointer"
                    >
                      <span className="text-[#1095d2] group-hover:translate-x-1 transition-transform">▹</span>
                      <span className="text-sm font-medium text-white/80 group-hover:text-white">{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}