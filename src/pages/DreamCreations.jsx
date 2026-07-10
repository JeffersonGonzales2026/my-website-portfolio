// src/pages/DreamCreations.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView, animate, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import { Settings, PenTool, Layout, Image as ImageIcon, MonitorSmartphone, Building2, HeartPulse, ShoppingBag, Briefcase, Globe, MonitorPlay, Palette, Info, LayoutGrid, Eye, Mail, Fingerprint, Share2, FileText, Video, MousePointerClick, Shirt, Printer, Box, Pencil, X, ArrowRight, Star, Quote, Calculator, ArrowLeft, Image as ImagePlaceholder, Award, Clock, Link as LinkIcon, UserCheck, ArrowUp, Database } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Helper component for counting numbers
const AnimatedNumber = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.floor(v) + suffix;
        }
      });
    }
  }, [isInView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const featuredClients = [
  { id: 1, name: "Responsive Health", industry: "Insurance & Healthcare", icon: <HeartPulse size={32} /> },
  { id: 2, name: "Real Estate Partners", industry: "Property Development", icon: <Building2 size={32} /> },
  { id: 3, name: "Rich Ams Global", industry: "E-Commerce", icon: <ShoppingBag size={32} /> },
  { id: 4, name: "CapCut Creators", industry: "Digital Media", icon: <MonitorPlay size={32} /> },
  { id: 5, name: "Tech Startups", industry: "SaaS & Technology", icon: <Globe size={32} /> },
  { id: 6, name: "Corporate B2B", industry: "Consulting & Finance", icon: <Briefcase size={32} /> },
];

const creationsCategories = [
  { id: 1, category: "Branding & Identity", icon: <Fingerprint size={14} />, items: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Refresh", "Brand Assets", "Business Identity Systems"] },
  { id: 2, category: "Graphic Design", icon: <PenTool size={14} />, items: ["Marketing Graphics", "Corporate Graphics", "Advertising Materials", "Print Design", "Creative Campaigns", "Promotional Graphics"] },
  { id: 3, category: "Social Media Design", icon: <Share2 size={14} />, items: ["Facebook Graphics", "Instagram Posts", "Carousel Posts", "Story Designs", "LinkedIn Graphics", "Social Media Campaigns", "Cover Photos", "Profile Branding"] },
  { id: 4, category: "Marketing Materials", icon: <FileText size={14} />, items: ["Flyers", "Brochures", "Company Profiles", "Catalogs", "Product Sheets", "Sales Kits", "Business Presentations"] },
  { id: 5, category: "Motion Graphics", icon: <Video size={14} />, items: ["Animated Ads", "Product Promotions", "Marketing Videos", "Social Media Motion Graphics", "Explainer Videos", "Logo Animation", "Video Thumbnails"] },
  { id: 6, category: "Web Graphics", icon: <MousePointerClick size={14} />, items: ["Website Banners", "Landing Page Graphics", "Icons", "UI Graphics", "Email Graphics", "WordPress Assets"] },
  { id: 7, category: "Photo Editing", icon: <ImageIcon size={14} />, items: ["Photo Retouching", "Photo Restoration", "Watercolor Portraits", "Background Removal", "Image Manipulation", "Color Correction", "Composite Editing"] },
  { id: 8, category: "Apparel Design", icon: <Shirt size={14} />, items: ["Shirt Designs", "Streetwear Graphics", "Mockups", "Print-ready Artwork"] },
  { id: 9, category: "Print Production", icon: <Printer size={14} />, items: ["Tarpaulins", "Calling Cards", "Invitations", "Souvenirs", "ID Cards", "Certificates", "Book Covers", "Menu Cards"] },
  { id: 10, category: "Packaging", icon: <Box size={14} />, items: ["Packaging Graphics", "Clothing Labels", "Product Labels"] },
  { id: 11, category: "Illustration", icon: <Pencil size={14} />, items: ["Vector Artwork", "Cartoon Portraits", "Character Illustration", "Icon Design", "Seamless Patterns", "Digital Illustration"] }
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

const teamMembers = [
  {
    id: 1,
    name: "Dexter Joy D. Bautista",
    photo: "/images/dexter.jpg", 
    positions: ["Multimedia Designer", "Graphic Designer", "Portrait Artist"],
    bio: "A Graphic Designer who loves turning ideas into visually striking and meaningful designs. Creativity is more than just a skill for me, it's my lifestyle. From sketching as a hobby to crafting unique, eye-catching visuals, I bring originality and heart into every task.",
    skills: ["Package Design", "UI/UX Design", "Brand Identity", "Photo Manipulation"],
    software: ["Photoshop", "Illustrator", "Premiere Pro", "Figma", "SketchUp"],
    experience: "7+ Years",
    availability: "Full-Time",
    status: "Active",
    portfolioUrl: "https://www.behance.net/gallery/190745335/PORTFOLIO-V2",
    socialUrl: "#"
  },
  {
    id: 2,
    name: "Open Position",
    photo: "", 
    positions: ["-"],
    bio: "Waiting for the next talented individual to fill this space. If you are driven by design and innovation, there might be a seat for you here.",
    skills: ["-", "-", "-"],
    software: ["-", "-", "-"],
    experience: "-",
    availability: "-",
    status: "Hiring",
    portfolioUrl: "#",
    socialUrl: "#"
  }
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
  const processScrollRef = useRef(null); 
  const teamScrollRef = useRef(null);
  const feedbackScrollRef = useRef(null);

  const [activeCreationPopup, setActiveCreationPopup] = useState(null);
  const [activePortfolioSubtitle, setActivePortfolioSubtitle] = useState(null);
  const [projects, setProjects] = useState([]); 
  const [reviews, setReviews] = useState([]); 

  // ================= TUNED LOCAL STATES FOR CMS SIMULATION =================
  const [bannerUrl, setBannerUrl] = useState("/Logo Banner.png");
  const [founderPhoto, setFounderPhoto] = useState("");
  const [founderExp, setFounderExp] = useState(10);
  const [founderProjects, setFounderProjects] = useState(200);
  const [teamList, setTeamList] = useState(teamMembers);
  const [softwareList, setSoftwareList] = useState(softwareExpertise);
  const [clientsList, setClientsList] = useState(featuredClients);

  // ================= CUSTOM 3D CURSOR LOGIC =================
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);
  
  const rotateZ = useTransform(velocityX, [-1000, 0, 1000], [-35, 0, 35]); 
  const rotateY = useTransform(velocityX, [-1000, 0, 1000], [-40, 0, 40]); 
  const rotateX = useTransform(velocityY, [-1000, 0, 1000], [40, 0, -40]); 

  useEffect(() => {
    const moveCursor = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      cursorX.set(clientX - 32); 
      cursorY.set(clientY - 32);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("touchmove", moveCursor, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("touchmove", moveCursor);
    };
  }, [cursorX, cursorY]);
  // ==========================================================

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dreamData, error: dreamError } = await supabase
          .from('dream_creations')
          .select('*')
          .eq('id', 1)
          .single();
          
        if (dreamError && dreamError.code !== 'PGRST116') throw dreamError;

        if (dreamData) {
          if (dreamData.banner_url) setBannerUrl(dreamData.banner_url);
          if (dreamData.founder_photo) setFounderPhoto(dreamData.founder_photo);
          if (dreamData.founder_experience !== null) setFounderExp(dreamData.founder_experience);
          if (dreamData.founder_projects !== null) setFounderProjects(dreamData.founder_projects);
          
          if (dreamData.team_roster && dreamData.team_roster.length > 0) {
            const formattedTeam = dreamData.team_roster.map(member => ({
              ...member,
              positions: typeof member.positions === 'string' ? member.positions.split(',').map(s => s.trim()) : member.positions || [],
              skills: typeof member.skills === 'string' ? member.skills.split(',').map(s => s.trim()) : member.skills || [],
              software: typeof member.software === 'string' ? member.software.split(',').map(s => s.trim()) : member.software || []
            }));
            setTeamList(formattedTeam);
          }
          if (dreamData.software_stack && dreamData.software_stack.length > 0) setSoftwareList(dreamData.software_stack);
          if (dreamData.trusted_clients && dreamData.trusted_clients.length > 0) {
            const clientsWithIcons = dreamData.trusted_clients.map(client => {
              let iconComponent = <Globe size={32} />;
              if (client.industry.toLowerCase().includes('health')) iconComponent = <HeartPulse size={32} />;
              if (client.industry.toLowerCase().includes('property') || client.industry.toLowerCase().includes('real estate')) iconComponent = <Building2 size={32} />;
              if (client.industry.toLowerCase().includes('commerce')) iconComponent = <ShoppingBag size={32} />;
              if (client.industry.toLowerCase().includes('media')) iconComponent = <MonitorPlay size={32} />;
              if (client.industry.toLowerCase().includes('consulting') || client.industry.toLowerCase().includes('finance')) iconComponent = <Briefcase size={32} />;
              return { ...client, icon: iconComponent };
            });
            setClientsList(clientsWithIcons);
          }
        }

        const { data: projectData, error: projectError } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        if (projectError) throw projectError;
        setProjects(projectData || []);

        const { data: reviewData, error: reviewError } = await supabase
          .from('client_reviews')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        if (reviewError) throw reviewError;
        setReviews(reviewData || []);

      } catch (error) {
        console.error('Error fetching CMS data:', error.message);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 350; 
      ref.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const openPortfolioGallery = (subtitle) => {
    setActivePortfolioSubtitle(subtitle);
    setTimeout(() => {
      const targetElement = document.getElementById('portfolio-directory');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350); 
  };

  const handleSubtitleModalClick = (subtitleName) => {
    setActiveCreationPopup(null);
    setActivePortfolioSubtitle(null);
    
    const targetId = subtitleName.toLowerCase().replace(/\s+/g, '-');
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.classList.add('ring-4', 'ring-[#1095d2]', 'scale-[1.02]');
        setTimeout(() => {
           targetElement.classList.remove('ring-4', 'ring-[#1095d2]', 'scale-[1.02]');
        }, 1500); 
      } else {
        scrollToSection('portfolio-directory');
      }
    }, 300);
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col min-h-screen text-white overflow-x-hidden relative transition-colors duration-[10000ms] animate-nightSkyCycle cursor-none"
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
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-20 px-6 min-h-[85vh] flex flex-col items-center justify-center text-center z-10">
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
          className="absolute top-[40vh] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1095d2]/60 to-transparent -z-10"
        />
        
        {/* NEW MOON IMAGE WITH FLOATING EFFECT */}
        <motion.div
          initial={{ y: 150, scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
          className="-mt-12 mb-16 relative" 
        >
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src="/images/moon.png" 
              alt="Dream Creations Moon" 
              className="w-40 h-40 object-contain drop-shadow-[0_0_50px_rgba(16,149,210,0.6)]"
            />
          </motion.div>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {creationsCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCreationPopup(category)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
              className="p-2 h-20 rounded-xl bg-black/30 border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:border-[#1095d2]/50 hover:bg-[#1095d2]/10 transition-all duration-300 group flex flex-col items-center justify-center text-center shadow-lg cursor-pointer relative z-20"
            >
              <div className="text-white/60 group-hover:text-[#1095d2] transition-colors duration-300 mb-1 group-hover:scale-110">
                {category.icon}
              </div>
              <h4 className="text-[10px] font-bold text-white/90 group-hover:text-white transition-colors leading-tight px-1">
                {category.category}
              </h4>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ================= BRAND BANNER ================= */}
      <section className="max-w-5xl mx-auto w-full px-6 py-10 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img 
            src={bannerUrl} 
            alt="Dream Creations Brand Banner" 
            className="w-full h-auto drop-shadow-[0_0_30px_rgba(16,149,210,0.3)] rounded-3xl border border-white/5 bg-black/40 p-2 md:p-4"
          />
        </motion.div>
      </section>

      <div id="founder-bio" className="scroll-mt-24" />

      {/* ================= 27. MEET THE FOUNDER SECTION ================= */}
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
               
               {founderPhoto ? (
                 <img src={founderPhoto} alt="Jefferson Gonzales" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               ) : (
                 <div className="w-32 h-32 rounded-full border border-[#1095d2]/50 bg-black/50 flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_30px_rgba(16,149,210,0.3)] z-10 group-hover:scale-105 transition-transform duration-500">
                   JG
                 </div>
               )}

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
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Meet the Founder</h3>
              <div className="w-20 h-1 bg-[#1095d2] rounded-full" />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
               {["Founder", "Owner", "Creative Director", "Team Manager", "Graphic Designer"].map((role, idx) => (
                 <span key={idx} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/80">
                   {role}
                 </span>
               ))}
            </div>
            <div className="space-y-4">
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Jefferson founded Dream Creations with the vision of helping businesses communicate more effectively through thoughtful and impactful visual design.
              </p>
              <p className="text-base md:text-lg text-white/70 hobbies leading-relaxed">
                With more than ten years of professional experience, he has worked across multiple industries including healthcare, finance, insurance, technology, apparel, education, e-commerce, printing, media, and real estate, in both onsite and work-from-home setups for local and international clients.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Inspired by his former team manager, he started building his own team of graphic designers with a vision to empower more dreamers (clients) and creators (designers).
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Today, he continues leading Dream Creations while expanding its capabilities through data analytics, automation, and software development.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl border border-white/10 bg-black/20 hover:border-[#1095d2]/30 transition-colors">
                <div className="text-2xl font-bold text-[#1095d2] mb-1">
                  <AnimatedNumber value={founderExp} suffix="+" />
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black/20 hover:border-[#1095d2]/30 transition-colors">
                <div className="text-2xl font-bold text-[#1095d2] mb-1">
                  <AnimatedNumber value={founderProjects} suffix="+" />
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wider">Projects Delivered</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 28. OUR TEAM ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Meet the Team</h3>
            <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto md:mx-0" />
            <p className="text-base text-white/70 mt-4 max-w-2xl">
              The creative minds driving the studio's vision.
            </p>
          </div>
          <div className="flex items-center gap-3 relative z-20">
             <button onClick={() => scrollContainer(teamScrollRef, 'left')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#1095d2] transition-colors cursor-pointer text-white">
               <ArrowLeft size={16} />
             </button>
             <button onClick={() => scrollContainer(teamScrollRef, 'right')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#1095d2] transition-colors cursor-pointer text-white">
               <ArrowRight size={16} />
             </button>
          </div>
        </div>

        <div ref={teamScrollRef} className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth">
          {teamList.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`shrink-0 w-[85vw] md:w-[400px] lg:w-[380px] snap-center rounded-3xl bg-black/30 border border-white/10 backdrop-blur-md overflow-hidden hover:border-[#1095d2]/40 transition-all group flex flex-col h-full ${member.status === 'Hiring' ? 'border-dashed opacity-60 hover:opacity-100' : ''}`}
            >
              <div className="p-6 pb-4 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1095d2]/20 to-transparent opacity-50" />
                <div className="flex gap-5 relative z-10">
                  <div className="w-24 h-24 rounded-2xl bg-black/50 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                    {member.photo ? (
                       <img src={member.photo} alt={member.name} className="w-full h-full object-cover" 
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
                    ) : (
                       <UserCheck size={32} className="text-white/20" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                       <UserCheck size={14} className={member.status === 'Hiring' ? 'text-white/40' : 'text-[#1095d2]'} />
                       <span className="text-[10px] text-white/60 uppercase tracking-wider">{member.status}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1 leading-tight">{member.name}</h4>
                    <span className="text-xs text-[#1095d2] font-semibold">{member.availability}</span>
                  </div>
                </div>
              </div>

               <div className="px-6 py-4 flex flex-wrap gap-2">
                {member.positions.map((pos, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-white/80">
                    {pos}
                  </span>
                ))}
              </div>

              <div className="px-6 py-2">
                <p className={`text-sm leading-relaxed ${member.status === 'Hiring' ? 'text-white/30 italic' : 'text-white/70'}`}>
                  {member.bio}
                </p>
              </div>

              <div className="px-6 py-4 space-y-4 flex-grow border-b border-white/5">
                <div>
                  <h5 className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">Core Skills</h5>
                  <div className="text-xs text-white/80 leading-relaxed">
                    {member.skills.join(" • ")}
                  </div>
                </div>
                <div>
                  <h5 className="text-[10px] text-white/40 uppercase tracking-widest mb-2 font-semibold">Software Expertise</h5>
                  <div className="text-xs text-white/80 leading-relaxed">
                    {member.software.join(" • ")}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-black/20 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/60">
                  <Award size={16} />
                  <span className="text-xs font-semibold">{member.experience}</span>
                </div>
                <div className="flex gap-2">
                  <a href={member.portfolioUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1095d2] flex items-center justify-center transition-colors cursor-pointer relative z-20">
                    <LinkIcon size={14} className="text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
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
          {softwareList.map((tool, index) => (
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

      {/* ================= 35. CREATIVE PROCESS ================= */}
      <section className="w-full py-20 z-10 relative border-t border-white/10">
        <div className="max-w-7xl mx-auto mb-10 px-6 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Creative Process</h3>
            <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto md:mx-0" />
            <p className="text-base text-white/70 mt-4 max-w-2xl">
              Journey through our structured, transparent workflow.
            </p>
          </div>
          
          <div className="flex items-center gap-3 relative z-20">
             <button onClick={() => scrollContainer(processScrollRef, 'left')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#1095d2] transition-colors cursor-pointer text-white">
               <ArrowLeft size={16} />
             </button>
             <button onClick={() => scrollContainer(processScrollRef, 'right')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#1095d2] transition-colors cursor-pointer text-white">
               <ArrowRight size={16} />
             </button>
          </div>
        </div>

        <div ref={processScrollRef} className="flex overflow-x-auto gap-4 px-6 md:px-12 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth">
          {creativeProcess.map((item, index) => (
            <React.Fragment key={item.step}>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="shrink-0 w-64 snap-center p-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md flex flex-col items-center text-center relative hover:bg-black/50 hover:border-[#1095d2]/50 transition-colors group shadow-lg"
              >
                <div className="w-10 h-10 rounded-full bg-[#1095d2]/20 text-[#1095d2] flex items-center justify-center text-sm font-black mb-4 group-hover:scale-110 group-hover:bg-[#1095d2] group-hover:text-white transition-all shadow-[0_0_15px_rgba(16,149,210,0.3)]">
                  {item.step}
                </div>
                <h4 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-[#1095d2] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-white/50 leading-snug">
                  {item.desc}
                </p>
              </motion.div>

              {index < creativeProcess.length - 1 && (
                <div className="shrink-0 text-[#1095d2]/30 flex items-center justify-center px-2">
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight size={24} />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
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
          {clientsList.map((client, index) => (
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

      {/* ================= 36. TESTIMONIALS (LIVE DATABASE) ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Client Feedback</h3>
            <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto md:mx-0" />
            <p className="text-base text-white/70 mt-4 max-w-2xl">
              What our partners and clients have to say about the Dream Creations experience.
            </p>
          </div>
          <div className="flex items-center gap-3 relative z-20">
             <button onClick={() => scrollContainer(feedbackScrollRef, 'left')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#1095d2] transition-colors cursor-pointer text-white">
               <ArrowLeft size={16} />
             </button>
             <button onClick={() => scrollContainer(feedbackScrollRef, 'right')} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#1095d2] transition-colors cursor-pointer text-white">
               <ArrowRight size={16} />
             </button>
          </div>
        </div>

        <div ref={feedbackScrollRef} className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth">
          {reviews.length > 0 ? (
            reviews.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="shrink-0 w-[85vw] md:w-[400px] snap-center p-8 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-md flex flex-col relative group hover:border-[#1095d2]/40 transition-colors"
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
                  {testimonial.face_image_url ? (
                    <img src={testimonial.face_image_url} alt={testimonial.client_name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/50 border border-white/5">
                      {testimonial.client_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">{testimonial.client_name}</h4>
                    <p className="text-[10px] text-white/50">{testimonial.project_type} • {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
             <div className="w-full py-16 text-center text-slate-500 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
               No client testimonials have been published yet.
             </div>
          )}
        </div>
      </section>

      <div id="portfolio-directory" className="scroll-mt-24" />

      {/* ================= 30 & 31. UNIFIED PORTFOLIO DIRECTORY (LIVE DATABASE FETCH) ================= */}
      <section className="max-w-7xl mx-auto w-full px-6 py-20 z-10 relative border-t border-white/10 min-h-[120vh]">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Project Archive</h3>
            <div className="w-20 h-1 bg-[#1095d2] rounded-full mx-auto md:mx-0" />
            <p className="text-sm text-white/60 mt-4">
              Explore our specific visual solutions. These works are pulled directly from our live CMS.
            </p>
          </div>
          <button 
            onClick={() => setActivePortfolioSubtitle(null)}
            className="px-5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold hover:bg-black/40 hover:text-[#1095d2] hover:border-[#1095d2]/30 transition-all cursor-pointer relative z-20"
          >
            View Full Archive
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!activePortfolioSubtitle ? (
            <motion.div 
              key="subtitle-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 relative z-20"
            >
              {creationsCategories.map((cat) => (
                <div key={cat.id} className="pt-4">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-6 border-b border-white/10 pb-3 inline-block">
                    {cat.category}
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cat.items.map((subtitle, idx) => (
                      <button
                        key={idx}
                        id={subtitle.toLowerCase().replace(/\s+/g, '-')}
                        onClick={() => openPortfolioGallery(subtitle)}
                        className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer border border-white/10 text-left transition-all duration-500"
                      >
                        <img 
                          src={`/images/covers/${subtitle.toLowerCase().replace(/\s+/g, '-')}.jpg`} 
                          alt={subtitle} 
                          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-[#1095d2]/20 hidden" />
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-300" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                          <span className="text-[#1095d2] text-[10px] font-black uppercase tracking-wider mb-2">View Works</span>
                          <h4 className="text-white font-bold text-xl group-hover:text-[#1095d2] transition-colors">{subtitle}</h4>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="works-grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-20 pt-4"
            >
              <button 
                onClick={() => {
                   setActivePortfolioSubtitle(null);
                   setTimeout(() => {
                      const targetElement = document.getElementById('portfolio-directory');
                      if (targetElement) {
                          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                   }, 350);
                }}
                className="flex items-center gap-2 text-sm text-white/60 hover:text-[#1095d2] transition-colors mb-8 cursor-pointer"
              >
                <ArrowLeft size={16} /> Back to Directory
              </button>

              <h4 className="text-2xl font-bold text-white mb-6">
                Viewing: <span className="text-[#1095d2]">{activePortfolioSubtitle}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <div key={project.id} className="relative rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-[#1095d2]/50 transition-colors">
                       <div className="aspect-video relative overflow-hidden bg-black/60">
                         {project.featured_image_url ? (
                           <img src={project.featured_image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         ) : (
                           <div className="absolute inset-0 flex items-center justify-center text-white/20">
                             <ImagePlaceholder size={48} />
                           </div>
                         )}
                         
                         {/* VIDEO PLAY BUTTON OVERLAY */}
                         {project.video_url && (
                           <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="w-16 h-16 rounded-full bg-[#1095d2] flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,149,210,0.6)] hover:scale-110 transition-transform">
                               <MonitorPlay size={24} className="ml-1" />
                             </div>
                           </a>
                         )}
                         
                       </div>
                       <div className="p-6">
                          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#1095d2] transition-colors">{project.title}</h4>
                          <p className="text-xs text-[#1095d2] font-mono mb-4">{project.client_name || 'Independent Project'}</p>
                          <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">{project.description}</p>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 flex flex-col items-center justify-center text-white/40 font-mono text-sm border border-dashed border-white/10 rounded-2xl">
                    <ImageIcon size={32} className="mb-4 opacity-30" />
                    No projects have been published to the archive yet.
                  </div>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================= 38. PRICING / PROJECT INVESTMENT ================= */}
      <section className="max-w-4xl mx-auto w-full px-6 py-24 z-10 relative text-center mt-10">
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

      {/* ================= 40. TRANSITION TO THE NEXT JOURNEY ================= */}
      <section className="w-full relative border-t border-white/10 mt-16 pt-32 pb-32 px-6 overflow-hidden z-10 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#021f1a] to-[#011410] -z-10" />

        <div className="max-w-3xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <Database size={14} /> The Next Chapter
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8">
              Evolution of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Design & Data.</span>
            </h2>

            <div className="space-y-6 text-base md:text-lg text-slate-300 mb-12 leading-relaxed">
              <p>
                Every stage of my career builds upon the previous one. The transition from a creative professional to a data-driven analyst reflects my evolution from crafting visual stories to uncovering the insights that drive them.
              </p>
              <p>
                The next chapter introduces my journey into Data Analytics, where structured logic, reporting, and dashboarding converge with creative problem-solving.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button 
                onClick={() => window.location.href = '/data-analyst'}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer relative z-20"
              >
                Continue as Data Analyst <ArrowRight size={16} />
              </button>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer relative z-20"
              >
                <ArrowUp size={16} /> Back to Top 
              </button>
            </div>
          </motion.div>
        </div>
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
                      onClick={() => handleSubtitleModalClick(item)}
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

      {/* 🚀 Custom 3D Spaceship Cursor with Fire & Smoke (Follows Mouse & Touch) */}
      <motion.div 
        className="fixed top-0 left-0 w-16 h-16 z-[9999] pointer-events-none drop-shadow-[0_20px_20px_rgba(16,149,210,0.6)]"
        style={{ 
          x: smoothX, 
          y: smoothY,
          rotateX: rotateX,
          rotateY: rotateY,
          rotateZ: rotateZ,
          perspective: 800 
        }}
      >
        {/* Animated Fire Thruster */}
        <motion.div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-gradient-to-t from-transparent via-orange-500 to-yellow-300 rounded-full blur-[2px] z-0"
          animate={{ y: [0, 10], scale: [1, 1.5], opacity: [0.8, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Animated Smoke Trail */}
        <motion.div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/40 rounded-full blur-md z-0"
          animate={{ y: [0, 20], scale: [1, 3], opacity: [0.4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeOut", delay: 0.1 }}
        />
        
        <img 
          src="/images/spaceship.png" 
          alt="Spaceship Cursor" 
          className="w-full h-full object-contain relative z-10" 
        />
      </motion.div>

    </div>
  );
}