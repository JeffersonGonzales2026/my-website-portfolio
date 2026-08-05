// src/pages/AiDeveloper.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, ArrowUp, CheckCircle2, GraduationCap, Settings, ExternalLink, Quote, Mail, Download, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

// GSAP IMPORTS (Restored for pinned horizontal scrolling)
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ================= CUSTOM ANIMATED COUNTER =================
const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = Math.floor(val) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [value, inView, suffix]);

  return <span ref={ref} className="text-3xl md:text-4xl font-black text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">0{suffix}</span>;
};

// ================= WAVE CARD COMPONENT (REVERTED TO GLASSY LOOK) =================
const WaveCard = ({ principle }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center 100%", "center 0%"]
  });

  const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.9, 1.1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.4, 1, 0.4]);
  const zIndex = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 10, 0]); 
  
  const borderColor = useTransform(
    scrollYProgress, 
    [0.3, 0.5, 0.7], 
    ['rgba(59, 130, 246, 0.1)', 'rgba(168, 85, 247, 1)', 'rgba(59, 130, 246, 0.1)'] 
  );
  
  const backgroundColor = useTransform(
    scrollYProgress, 
    [0.3, 0.5, 0.7], 
    ['rgba(2, 6, 23, 0.2)', 'rgba(88, 28, 135, 0.25)', 'rgba(2, 6, 23, 0.2)'] 
  );

  const textColor = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    ['#64748b', '#ffffff', '#64748b'] 
  );

  const iconColor = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    ['#3b82f6', '#a855f7', '#3b82f6'] 
  );

  const boxShadow = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.7],
    ['0px 0px 0px rgba(168, 85, 247, 0)', '0px 0px 30px rgba(168, 85, 247, 0.3)', '0px 0px 0px rgba(168, 85, 247, 0)']
  );

  return (
    <motion.div 
      ref={ref}
      style={{ scale, opacity, borderColor, backgroundColor, boxShadow, zIndex }}
      className="p-4 md:p-5 rounded-2xl border flex items-center gap-4 backdrop-blur-md w-full max-w-md mx-auto relative origin-center"
    >
      <motion.div style={{ color: iconColor }} className="shrink-0">
        <CheckCircle2 size={24} style={{ filter: 'drop-shadow(0px 0px 8px currentColor)' }} />
      </motion.div>
      <motion.span style={{ color: textColor }} className="text-sm font-bold tracking-wide text-left">
        {principle}
      </motion.span>
    </motion.div>
  );
};

// ================= VARIED ANIMATION VARIANTS =================
const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardPop = {
  hidden: { opacity: 0, scale: 0.8, rotateX: 15 },
  visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const futuristicReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// ================= DATA BASELINE GENERATORS =================
const defaultDeveloperStats = [
  { label: "Git Repositories", value: 4, suffix: "" },
  { label: "Dashboards Built", value: 20, suffix: "" },
  { label: "Hours Coding", value: 90, suffix: "+" },
  { label: "AI Prompts Optimized", value: 1000, suffix: "+" }
];

const defaultAiEcosystem = [
  { name: "ChatGPT", role: "Primary planning, architecture, documentation, learning, and technical guidance.", imageSrc: "/images/chatgpt.png" },
  { name: "Claude", role: "Backend, Debugging, reasoning, architecture planning, code reviews, and structured writing.", imageSrc: "/images/claude.png" },
  { name: "Gemini", role: "Frontend, UI & UX, architecture planning, Alternative implementation ideas.", imageSrc: "/images/gemini.png" },
  { name: "GitHub Copilot", role: "In-editor code completion, agent, and developer assistance.", imageSrc: "/images/copilot.png" },
  { name: "OpenAI Codex", role: "AI software engineering agent for autonomous coding and development workflows.", imageSrc: "" }
];

const PRESET_PIPELINE_ARCHITECTURE = [
  {
    category: "Planning",
    items: [
      { name: "Notion", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg" },
      { name: "Trello", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain.svg" },
      { name: "Jira (Learning)", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" }
    ]
  },
  {
    category: "Requirements Analysis",
    items: [
      { name: "ChatGPT", imageSrc: "/images/chatgpt.png" },
      { name: "Claude", imageSrc: "/images/claude.png" },
      { name: "GitHub Issues", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Notion", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg" },
      { name: "Kimi (Learning)", imageSrc: "/images/kimi.png" }
    ]
  },
  {
    category: "Architecture Design",
    items: [
      { name: "Excalidraw (Learning)", imageSrc: "" },
      { name: "Draw.io (Learning)", imageSrc: "" },
      { name: "Lucidchart (Learning)", imageSrc: "" },
      { name: "Eraser.io (Learning)", imageSrc: "" }
    ]
  },
  {
    category: "Frontend Development",
    items: [
      { name: "React", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Vite", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg" },
      { name: "Tailwind CSS", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "JavaScript (ES6+)", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "HTML5", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "Framer Motion", imageSrc: "" },
      { name: "GSAP", imageSrc: "" }
    ]
  },
  {
    category: "Backend Development",
    items: [
      { name: "Node.js", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "JSON", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg" }
    ]
  },
  {
    category: "Database Design",
    items: [
      { name: "PostgreSQL", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "Supabase", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" }
    ]
  },
  {
    category: "AI Integration",
    items: [
      { name: "GitHub Copilot", imageSrc: "/images/copilot.png" }
    ]
  },
  {
    category: "Testing & Debugging",
    items: [
      { name: "Chrome DevTools", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg" },
      { name: "React Developer Tools", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "ESLint", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg" },
      { name: "Prettier", imageSrc: "" }
    ]
  },
  {
    category: "Deployment",
    items: [
      { name: "Git", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Vercel", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" }
    ]
  },
  {
    category: "Monitoring & Maintenance",
    items: [
      { name: "GitHub", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Vercel Analytics", imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" }
    ]
  }
];

const defaultWebExperiences = [
  "Interactive UI",
  "Micro-interactions",
  "Scroll-based Storytelling",
  "Cinematic Hero Sections",
  "Smooth Page Transitions",
  "Parallax Scrolling",
  "Glassmorphism",
  "Bento Grid Layouts",
  "Animated SVG",
  "Responsive Design",
  "3D Web Experiences (Learning)",
  "Three.js (Learning)",
  "React Three Fiber (Learning)",
  "Lottie Animations (Learning)",
  "Accessibility (WCAG) (Learning)",
  "Performance Optimization (Learning)",
  "SEO Optimization (Learning)",
  "Progressive Web Apps (Learning)"
];

const defaultShowcaseProjects = [
  {
    id: 1,
    type: "flagship",
    badge: "In Progress",
    meta: "Flagship Software v1",
    title: "Personal Portfolio Website",
    desc: "A premium, custom-architected portfolio platform built entirely from scratch to showcase graphic design archives, data analytics systems, and modular web software while serving as an active production codebase.",
    tech: ["React", "Vite", "Tailwind", "CSS", "Git", "GitHub", "VS Code", "AI Assistant Workflow"],
    role: "AI-assisted Product Architect",
    actionText: "Inspect Source",
    link: "https://github.com"
  }
];

const defaultGithubProfile = {
  name: "Jefferson Gonzales",
  username: "jeffersongonzales",
  profileUrl: "https://github.com",
  badgeText: "Live Sync Standard ready",
  matrixPlaceholder: "[Simulated GitHub Contribution Matrix Grid Placeholder]"
};

const aiWorkflowSteps = [
  "Idea", "Research", "Requirements Gathering", "Planning", "Architecture Design", "UI/UX Planning", 
  "Prompt Engineering", "Prototype", "AI-Assisted Code Generation", "Manual Code Review", "Refactoring", 
  "Debugging", "Testing", "Optimization", "Documentation", "Version Control", "Deployment", "Maintenance", "Continuous Improvement"
];

const extractImageDeep = (item) => {
  if (!item || typeof item !== 'object') return null;
  if (item.logo_url) return item.logo_url;
  if (item.image_url) return item.image_url;
  if (item.image) return item.image;
  if (item.logo) return item.logo;
  if (item.icon_url) return item.icon_url;
  if (typeof item.icon === 'string' && item.icon.startsWith('http')) return item.icon;
  
  let foundUrl = null;
  const searchObj = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (const key in obj) {
      if (typeof obj[key] === 'string' && (obj[key].startsWith('http') || obj[key].includes('supabase.co'))) {
        foundUrl = obj[key];
        return;
      }
      if (typeof obj[key] === 'object') {
        searchObj(obj[key]);
        if (foundUrl) return;
      }
    }
  };
  
  searchObj(item);
  return foundUrl;
};

export default function AiDeveloper() {
  const containerRef = useRef(null);

  const [stats, setStats] = useState(defaultDeveloperStats);
  const [aiPartners, setAiPartners] = useState(defaultAiEcosystem);
  const [architecture, setArchitecture] = useState(PRESET_PIPELINE_ARCHITECTURE);
  const [webExperiences, setWebExperiences] = useState(defaultWebExperiences);
  const [showcase, setShowcase] = useState(defaultShowcaseProjects);
  const [github, setGithub] = useState(defaultGithubProfile);
  const [pageResume, setPageResume] = useState(null);

  // ================= GSAP ARCHITECTURE SCROLL LOGIC (DIRECTIONAL COLOR & ZERO-RENDER FIX) =================
  const archSectionRef = useRef(null);
  const archTrackRef = useRef(null);
  const progressBarRef = useRef(null);

  // Pure DOM Refs para sa smooth at walang glitch na scroll
  const boxRefs = useRef([]);
  const innerBoxRefs = useRef([]);
  const labelRefs = useRef([]);
  const contentRefs = useRef([]);

  useGSAP(() => {
    if (!archSectionRef.current || !archTrackRef.current || architecture.length <= 1) return;

    const getScrollAmount = () => {
      if (!archTrackRef.current) return 0;
      return Math.max(0, archTrackRef.current.scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(archTrackRef.current, {
      x: () => -getScrollAmount(),
      ease: "none"
    });

    const st = ScrollTrigger.create({
      trigger: archSectionRef.current,
      start: "top top", 
      end: () => `+=${getScrollAmount()}`, 
      pin: true,
      anticipatePin: 1,
      animation: tween,
      scrub: 1, 
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const scrollDist = getScrollAmount();
        const progressPx = self.progress * scrollDist;

        // DIRECTION DETECTION: self.direction === 1 (Moving Right / Scrolling Down), self.direction === -1 (Moving Left / Scrolling Up)
        const isGoingRight = self.direction >= 0;

        // 1. UPDATE PROGRESS LINE COLOR BASED ON DIRECTION
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressPx}px`;
          if (isGoingRight) {
            progressBarRef.current.className = "absolute top-1/2 left-[50vw] h-[3px] bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,1)] -translate-y-1/2 z-10 origin-left transition-colors duration-300";
          } else {
            progressBarRef.current.className = "absolute top-1/2 left-[50vw] h-[3px] bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] -translate-y-1/2 z-10 origin-left transition-colors duration-300";
          }
        }

        // 2. CALCULATE CURRENT ACTIVE INDEX
        const currentIndex = Math.min(
          Math.round(self.progress * (architecture.length - 1)), 
          architecture.length - 1
        );

        // 3. PURE DOM MANIPULATION FOR TOUCHPOINTS & CARDS (ZERO REACT RE-RENDERS)
        for (let i = 0; i < architecture.length; i++) {
          const isActive = i === currentIndex;

          // Outer Box Point
          if (boxRefs.current[i]) {
            if (isActive) {
              boxRefs.current[i].className = isGoingRight
                ? "w-7 h-7 md:w-9 md:h-9 flex items-center justify-center transition-all duration-300 border-2 bg-[#02040a] border-purple-400 scale-125 shadow-[0_0_25px_rgba(168,85,247,0.9)]"
                : "w-7 h-7 md:w-9 md:h-9 flex items-center justify-center transition-all duration-300 border-2 bg-[#02040a] border-blue-400 scale-125 shadow-[0_0_25px_rgba(59,130,246,0.9)]";
            } else {
              boxRefs.current[i].className = "w-7 h-7 md:w-9 md:h-9 flex items-center justify-center transition-all duration-300 border-2 bg-[#02040a] border-slate-800 shadow-none";
            }
          }

          // Inner Blinking Dot
          if (innerBoxRefs.current[i]) {
            if (isActive) {
              innerBoxRefs.current[i].className = isGoingRight
                ? "w-2.5 h-2.5 md:w-3 md:h-3 bg-purple-400 animate-ping"
                : "w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-400 animate-ping";
            } else {
              innerBoxRefs.current[i].className = "w-2.5 h-2.5 md:w-3 md:h-3 bg-slate-600";
            }
          }

          // Label Text Below Point
          if (labelRefs.current[i]) {
            if (isActive) {
              labelRefs.current[i].className = isGoingRight
                ? "absolute top-11 md:top-14 text-[10px] md:text-xs font-mono font-bold tracking-widest text-center w-52 transition-colors duration-300 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]"
                : "absolute top-11 md:top-14 text-[10px] md:text-xs font-mono font-bold tracking-widest text-center w-52 transition-colors duration-300 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]";
            } else {
              labelRefs.current[i].className = "absolute top-11 md:top-14 text-[10px] md:text-xs font-mono font-bold tracking-widest text-center w-52 transition-colors duration-300 text-slate-500";
            }
          }

          // Content Box Below
          if (contentRefs.current[i]) {
            if (isActive) {
              contentRefs.current[i].style.opacity = "1";
              contentRefs.current[i].style.visibility = "visible";
              contentRefs.current[i].style.transform = "translateY(0px)";
              contentRefs.current[i].style.pointerEvents = "auto";
              contentRefs.current[i].style.zIndex = "10";
            } else {
              contentRefs.current[i].style.opacity = "0";
              contentRefs.current[i].style.visibility = "hidden";
              contentRefs.current[i].style.transform = "translateY(20px)";
              contentRefs.current[i].style.pointerEvents = "none";
              contentRefs.current[i].style.zIndex = "0";
            }
          }
        }
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      st.kill();
    };
  }, { scope: archSectionRef, dependencies: [architecture?.length] }); // ARRAY LENGTH DEPENDENCY FIX

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('ai_developer').select('*').eq('id', 1).single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          if (data.metrics_counters?.length > 0) setStats(data.metrics_counters);
          
          if (Array.isArray(data.ai_partners) && data.ai_partners.length > 0) {
            const formattedPartners = data.ai_partners.map(ai => {
              let imgUrl = extractImageDeep(ai);
              if (!imgUrl) {
                const localMatch = defaultAiEcosystem.find(d => d.name?.toLowerCase() === ai.name?.toLowerCase());
                if (localMatch) imgUrl = localMatch.imageSrc;
              }
              if (!imgUrl && ai.imageSrc) imgUrl = ai.imageSrc;
              return { ...ai, customImage: imgUrl };
            });
            setAiPartners(formattedPartners);
          } else {
            setAiPartners(defaultAiEcosystem);
          }
          
          if (Array.isArray(data.architecture_stack) && data.architecture_stack.length > 5) {
            const formattedArchitecture = data.architecture_stack.map(stack => {
              let parsedTools = [];
              if (Array.isArray(stack.items)) {
                parsedTools = stack.items;
              } else if (typeof stack.items === 'string') {
                parsedTools = stack.items.split(',').map(t => ({ name: t.trim() }));
              } else if (Array.isArray(stack.tools)) {
                parsedTools = stack.tools;
              }

              return {
                ...stack,
                items: parsedTools.map(tool => {
                  let toolObj = typeof tool === 'object' && tool !== null ? tool : { name: tool };
                  let imgUrl = extractImageDeep(toolObj);
                  if (!imgUrl) {
                    PRESET_PIPELINE_ARCHITECTURE.forEach(defStack => {
                      const match = defStack.items.find(d => d.name?.toLowerCase() === toolObj.name?.toLowerCase());
                      if (match) imgUrl = match.imageSrc;
                    });
                  }
                  if (!imgUrl && toolObj.imageSrc) imgUrl = toolObj.imageSrc;
                  return { ...toolObj, customImage: imgUrl };
                })
              };
            });
            setArchitecture(formattedArchitecture);
          } else {
             setArchitecture(PRESET_PIPELINE_ARCHITECTURE);
          }

          // FIX: Robust parser to handle strings OR objects from CMS correctly
          if (data.modern_web_experiences && data.modern_web_experiences.length > 0) {
            const formattedExperiences = data.modern_web_experiences.map(item => {
              if (typeof item === 'string') return item;
              return item.value || item.name || item.title || item.label || Object.values(item)[0] || '';
            }).filter(Boolean);
            setWebExperiences(formattedExperiences);
          } else {
            // Ito yung idinagdag natin na fallback!
            setWebExperiences(defaultWebExperiences);
          }
          
          if (data.engineering_showcase?.length > 0) {
            const formattedShowcase = data.engineering_showcase.map(project => ({
              ...project,
              tech: typeof project.tech === 'string' ? project.tech.split(',').map(s => s.trim()).filter(Boolean) : project.tech || []
            }));
            setShowcase(formattedShowcase);
          }
          
          if (data.github_sync && Object.keys(data.github_sync).length > 0) setGithub(data.github_sync);
        }

        const { data: allResumes, error: resumeError } = await supabase.from('portfolio_resumes').select('*');
        if (allResumes && !resumeError && allResumes.length > 0) {
          const aiResume = allResumes.find(res => res.title.toLowerCase().includes('ai') || res.title.toLowerCase().includes('developer') || res.title.toLowerCase().includes('engineer')) || allResumes[0]; 
          setPageResume(aiResume);
        }

        // Force a scrolltrigger refresh after data loads to prevent bugs
        setTimeout(() => ScrollTrigger.refresh(), 500);

      } catch (err) {
        console.error('Error fetching AI Developer CMS data:', err.message);
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

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ================= HIGH-PERFORMANCE CSS BACKGROUND ================= */}
      <style>{`
        @keyframes pan-neural {
          0% { background-position: 0 0, 30px 30px; }
          100% { background-position: 120px 120px, 150px 150px; }
        }
        @keyframes ambient-pulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        @keyframes data-stream-y {
          0% { transform: translateY(-200px); }
          100% { transform: translateY(120vh); }
        }
        @keyframes data-stream-x {
          0% { transform: translateX(-200px); }
          100% { transform: translateX(120vw); }
        }

        .stream-y { animation: data-stream-y linear infinite; will-change: transform; }
        .stream-x { animation: data-stream-x linear infinite; will-change: transform; }
        .ambient-glow { animation: ambient-pulse ease-in-out infinite; will-change: opacity, transform; }
        
        /* Utility to hide scrollbars elegantly */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Custom Sleek Scrollbar for Chat UI */
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-track { background: rgba(2, 6, 23, 0.4); border-radius: 10px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.4); border-radius: 10px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.8); }
      `}</style>

      {/* The STICKY Wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#02040a]">
          
          {/* Neural Network Layer */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(rgba(168, 85, 247, 0.4) 2px, transparent 2px), radial-gradient(rgba(6, 182, 212, 0.3) 2px, transparent 2px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
            animation: 'pan-neural 25s linear infinite'
          }} />

          {/* Hardware-Accelerated High-Speed Data Streams */}
          <div className="absolute top-0 w-[2px] h-[150px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60 stream-y" style={{ left: '15%', animationDuration: '2.5s', animationDelay: '0s' }} />
          <div className="absolute top-0 w-[2px] h-[200px] bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-60 stream-y" style={{ left: '45%', animationDuration: '3s', animationDelay: '1.2s' }} />
          <div className="absolute top-0 w-[2px] h-[100px] bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60 stream-y" style={{ left: '85%', animationDuration: '2s', animationDelay: '0.5s' }} />
          
          <div className="absolute left-0 h-[2px] w-[200px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60 stream-x" style={{ top: '20%', animationDuration: '4.5s', animationDelay: '1.5s' }} />
          <div className="absolute left-0 h-[2px] w-[150px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60 stream-x" style={{ top: '75%', animationDuration: '3.5s', animationDelay: '0.8s' }} />

          {/* Deep Ambient Glows */}
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-cyan-600/30 rounded-full blur-[120px] ambient-glow" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[140px] ambient-glow" style={{ animationDuration: '12s', animationDelay: '2s' }} />
          <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] ambient-glow" style={{ animationDuration: '10s', animationDelay: '5s' }} />
          
        </div>
      </div>

      {/* ================= PAGE CONTENT WRAPPER ================= */}
      <div className="relative z-10 overflow-x-hidden">

        {/* ================= 59. HERO SECTION (LOWERED PADDING) ================= */}
        <section className="relative pt-40 md:pt-48 pb-16 md:pb-20 px-6 min-h-[85vh] flex flex-col items-center justify-center">
          <div className="max-w-5xl mx-auto text-center relative w-full">

            {/* FIXED MOBILE HEADLINE */}
            <motion.h1 variants={fadeSlideUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8">
              
              <span className="md:hidden block leading-[1.2]">
                <span className="block whitespace-nowrap">Building the Future</span>
                <span className="block whitespace-nowrap">with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Code, AI, &</span></span>
                <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Continuous Learning.</span>
              </span>

              <span className="hidden md:block leading-tight">
                Building the Future with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">Code, AI, & Continuous Learning.</span>
              </span>
            </motion.h1>

            {/* FIXED PARAGRAPH */}
            <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
              className="text-sm md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10 md:mb-12 space-y-5 md:space-y-6 px-2 md:px-0">
              <p>
                <strong>Software engineering is more than writing code.</strong> It is understanding problems, designing scalable solutions, collaborating with intelligent tools, and continuously improving through real-world experience. As an aspiring AI-Assisted Full-Stack Developer, I am building practical applications while learning modern technologies, software architecture, automation, and best development practices.
              </p>
              <p className="text-cyan-400 font-medium">
                This portfolio is my first flagship software engineering project—and the beginning of a much larger journey.
              </p>
            </motion.div>

            {/* BUTTONS */}
            <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }} 
              className="flex flex-col sm:flex-row justify-center gap-4 relative z-20 mb-16 w-full sm:w-auto px-4 sm:px-0">
              <button onClick={() => scrollToSection('current-projects')} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black text-sm hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer">
                View Projects
              </button>
              <a href={github.profileUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors flex items-center justify-center gap-2 text-sm font-semibold">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </a>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
              {stats.map((stat, idx) => (
                <motion.div 
                  variants={cardPop} 
                  key={idx} 
                  className="p-5 rounded-2xl bg-black/60 border border-slate-800 backdrop-blur-md flex flex-col items-center justify-center hover:border-cyan-500/60 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest text-center mt-1 font-bold group-hover:text-cyan-300 transition-colors">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* ================= 61. LEARNING PHILOSOPHY (CENTERED WAVE SCROLL WITH GLASSY LOOK) ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900 bg-black/40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* CENTERED TEXT CONTENT */}
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6 mb-12 z-20">
              <h3 className="text-3xl font-black text-white">Learning by Building.</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <div className="text-slate-300 space-y-4 text-sm leading-relaxed max-w-2xl mx-auto">
                <p>I believe the most effective way to learn software engineering is through practical application.</p>
                <p>Rather than relying solely on tutorials or theoretical exercises, I build complete projects that challenge me to solve real problems, make architectural decisions, debug unexpected issues, and continuously improve my understanding.</p>
                <p>Artificial Intelligence plays an important role in this process—not as a replacement for learning, but as a mentor, assistant, reviewer, and productivity tool.</p>
                <p>Every feature I build is an opportunity to deepen my understanding of software engineering principles while producing something meaningful.</p>
              </div>
            </motion.div>

            {/* DYNAMIC SCROLL WAVE LIST */}
            <div className="w-full flex flex-col gap-3 py-10 relative z-10">
              {[
                "Build real projects.", "Understand the code.", "Learn continuously.", "Solve business problems.",
                "Write maintainable software.", "Design scalable systems.", "Use AI responsibly.", "Embrace debugging.",
                "Document everything.", "Improve every iteration."
              ].map((principle, idx) => (
                <WaveCard key={idx} principle={principle} />
              ))}
            </div>

          </div>
        </section>

        {/* ================= 63 & 64. AI PHILOSOPHY & WORKFLOW (CHAT UI OVERHAUL) ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 space-y-6">
              <h3 className="text-3xl font-black text-white">AI is a Partner, <br/>Not a Replacement.</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
              <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
                <p>Artificial Intelligence is transforming software development. Rather than fearing this change, I embrace AI as a productivity tool that accelerates learning, improves code quality, and helps solve complex technical challenges.</p>
                <p>However, I believe true software engineering requires understanding the code being written. AI can generate ideas, explain concepts, suggest improvements, and accelerate implementation, but developers remain responsible for architecture, design decisions, debugging, testing, security, maintainability, and long-term scalability.</p>
                <p className="text-cyan-400 font-semibold bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                  My goal is to combine human creativity, critical thinking, and engineering principles with AI-assisted productivity to build better software.
                </p>
              </div>
            </motion.div>

            {/* AI CHAT UI INTERFACE */}
            <motion.div variants={futuristicReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} 
              className="lg:col-span-7 h-[550px] overflow-y-auto pr-2 border border-slate-800 bg-slate-950/80 p-6 rounded-2xl chat-scroll relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#02040a] to-transparent pointer-events-none z-10" />
              
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-3"><Settings size={14} className="text-purple-400" /> AI Prompts Context Window</h4>
              
              {/* USER PROMPT MESSAGE */}
              <div className="flex gap-3 mb-8 w-full max-w-[90%] ml-auto justify-end">
                <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl rounded-tr-none text-sm text-slate-200 shadow-md">
                  <span className="block text-[10px] text-cyan-400 font-mono mb-1">User Prompt</span>
                  Build a scalable, production-ready web application from scratch. What is your standard AI-assisted engineering workflow?
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-900 border border-cyan-500 flex items-center justify-center text-xs font-bold text-cyan-400 shrink-0 shadow-inner">JG</div>
              </div>

              {/* AI RESPONSE MESSAGE */}
              <div className="flex gap-3 w-full max-w-[95%]">
                <div className="w-8 h-8 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.3)] mt-1">
                  <Sparkles size={14} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl rounded-tl-none shadow-md">
                    <span className="block text-[10px] text-purple-400 font-mono mb-2">System Response</span>
                    <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                      Acknowledged. Initializing AI-Assisted Full-Stack Engineering Protocol. Here is the sequential methodology for execution:
                    </p>
                    
                    <div className="space-y-3 relative border-l border-purple-500/30 ml-2">
                      {aiWorkflowSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 pl-4 relative group cursor-default">
                          <div className="absolute left-[-4.5px] top-2 w-2 h-2 rounded-full bg-[#02040a] border border-purple-500/50 group-hover:bg-purple-400 transition-colors shadow-[0_0_10px_rgba(168,85,247,0)] group-hover:shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                          <span className="text-xs font-mono text-purple-400/50 group-hover:text-purple-400 transition-colors">[{String(idx+1).padStart(2, '0')}]</span>
                          <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= 65. AI ECOSYSTEM (GRID LAYOUT REVERTED) ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900/80 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <h3 className="text-3xl font-black text-white mb-4">AI Ecosystem & Future Integrations</h3>
              <div className="w-16 h-1 bg-purple-500 rounded-full mx-auto shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <p className="text-slate-400 mt-6 text-sm max-w-2xl mx-auto leading-relaxed">
                A dynamic network of artificial intelligence models, frameworks, and tools functioning harmoniously to enhance engineering productivity and system intelligence.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiPartners.map((ai, idx) => (
                <motion.div variants={cardPop} key={idx} className="p-6 rounded-2xl bg-slate-950/60 border border-slate-900 flex flex-col hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl border border-slate-800 bg-black flex items-center justify-center relative overflow-hidden shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      {ai.customImage ? (
                        <img src={ai.customImage} alt={ai.name} className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity absolute inset-0 m-auto z-10" 
                             onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                      ) : null}
                      <Settings size={20} className={`text-slate-700 absolute inset-0 m-auto z-0 ${ai.customImage ? 'hidden' : 'block'}`} />
                    </div>
                    <h4 className={`text-base font-bold transition-colors ${ai.name.includes("Learning") ? "text-purple-300/80 group-hover:text-purple-300" : "text-white group-hover:text-purple-400"}`}>
                      {ai.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors">{ai.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= 67. DEVELOPMENT ARCHITECTURE ================= */}
        <section ref={archSectionRef} className="w-full relative z-30 border-t border-slate-900 bg-[#02040a] overflow-hidden min-h-screen">
          <div className="h-screen flex flex-col justify-center items-center pt-16 pb-8">
            
            {/* HEADER */}
            <div className="text-center px-4 shrink-0 w-full max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Development Architecture Pipeline</h3>
              <div className="w-16 h-1 bg-purple-500 rounded-full mx-auto shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <p className="text-slate-400 mt-6 text-sm max-w-2xl mx-auto leading-relaxed hidden md:block">
                A structured, horizontal engineering flowchart detailing every phase of my development process—from initial planning to post-deployment monitoring.
              </p>
              <p className="md:hidden mt-4 text-[10px] text-purple-400 font-mono tracking-widest opacity-70 animate-pulse">(Scroll down to navigate timeline)</p>
            </div>

            {/* GSAP HORIZONTAL TRACK - GAP IS EXPANDED TO gap-[300px] md:gap-[500px] FOR LONGER LINES */}
            <div className="relative h-24 md:h-32 w-full mt-6 md:mt-10 shrink-0 overflow-hidden flex items-center">
              
              <div ref={archTrackRef} className="flex items-center gap-[300px] md:gap-[500px] px-[50vw] flex-nowrap w-max relative">
                  
                  {/* SOLID BLUE/DARK BACKGROUND LINE */}
                  <div className="absolute top-1/2 left-[50vw] right-[50vw] h-[2px] bg-slate-800 shadow-none -translate-y-1/2 z-0" />
                  
                  {/* DYNAMIC DIRECTIONAL PROGRESS LINE */}
                  <div ref={progressBarRef} className="absolute top-1/2 left-[50vw] h-[3px] bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,1)] -translate-y-1/2 z-10 origin-left transition-colors duration-300" style={{ width: '0px' }} />

                  {architecture.map((stack, idx) => {
                    const isInitialActive = idx === 0;

                    return (
                      <div key={idx} className="relative z-20 flex flex-col items-center shrink-0 w-8">
                        {/* BOX VIEW POINT */}
                        <div 
                          ref={el => boxRefs.current[idx] = el}
                          className={`w-7 h-7 md:w-9 md:h-9 flex items-center justify-center transition-all duration-300 border-2 bg-[#02040a] ${
                            isInitialActive 
                              ? 'border-purple-400 scale-125 shadow-[0_0_25px_rgba(168,85,247,0.9)]'
                              : 'border-slate-800 shadow-none'
                          }`}
                        >
                          <div 
                            ref={el => innerBoxRefs.current[idx] = el}
                            className={`w-2.5 h-2.5 md:w-3 md:h-3 transition-colors ${isInitialActive ? 'bg-purple-400 animate-ping' : 'bg-slate-600'}`} 
                          />
                        </div>

                        {/* Label */}
                        <span 
                          ref={el => labelRefs.current[idx] = el}
                          className={`absolute top-11 md:top-14 text-[10px] md:text-xs font-mono font-bold tracking-widest text-center w-52 transition-colors duration-300 ${
                            isInitialActive ? 'text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]' : 'text-slate-500'
                          }`}
                        >
                          {stack.category}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* DYNAMIC CONTENT BOX (PURE STACK REFS) */}
            <div className="w-full max-w-5xl mx-auto px-4 md:px-6 shrink-0 flex-1 mt-2 md:mt-4 pb-4 grid [grid-template-areas:'stack'] items-start md:items-center">
              {architecture.map((stack, idx) => {
                const isInitialActive = idx === 0;
                
                return (
                  <div
                    key={idx}
                    ref={el => contentRefs.current[idx] = el}
                    className="[grid-area:stack] w-full h-auto p-6 md:p-12 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] text-center relative transition-all duration-300"
                    style={{
                      opacity: isInitialActive ? 1 : 0,
                      visibility: isInitialActive ? 'visible' : 'hidden',
                      transform: isInitialActive ? 'translateY(0px)' : 'translateY(20px)',
                      pointerEvents: isInitialActive ? 'auto' : 'none',
                      zIndex: isInitialActive ? 10 : 0
                    }}
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40" />

                    <h4 className="text-base md:text-xl font-black text-purple-400 uppercase tracking-widest mb-6 md:mb-10">
                      <span className="text-slate-600 mr-2">[{String(idx + 1).padStart(2, '0')}]</span>
                      {stack.category} Stack
                    </h4>
                    
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 pb-2">
                      {stack.items?.map((tool, j) => {
                        const isLearning = tool.name.toLowerCase().includes('(learning)');
                        const cleanName = tool.name.replace(/\(learning\)/i, '').trim();
                        
                        return (
                          <div key={j} className="flex flex-col items-center gap-3 w-20 md:w-28 group">
                            <div className={`w-20 h-20 md:w-28 md:h-28 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center border transition-all duration-300 shadow-lg relative ${isLearning ? 'bg-purple-950/30 border-purple-800/50 group-hover:border-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-[#0b0f19] border-slate-700 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'}`}>
                              {tool.customImage ? (
                                <img src={tool.customImage} alt={cleanName} className="w-10 h-10 md:w-16 md:h-16 object-contain drop-shadow-md group-hover:scale-110 transition-transform" onError={(e) => e.target.style.display='none'} />
                              ) : (
                                <Settings className={`w-10 h-10 md:w-16 md:h-16 group-hover:scale-110 transition-transform ${isLearning ? 'text-purple-500' : 'text-cyan-500'}`} />
                              )}
                              
                              {isLearning && (
                                <div className="absolute -bottom-2.5 px-2 py-0.5 bg-purple-900 border border-purple-400 text-purple-200 text-[9px] md:text-[10px] rounded-full uppercase tracking-widest shadow-md whitespace-nowrap">
                                  Learning
                                </div>
                              )}
                            </div>
                            <span className="text-xs md:text-sm font-semibold text-slate-300 text-center leading-tight mt-1">
                              {cleanName}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================= 67.5 MODERN WEB EXPERIENCES (2-COLUMN COMPACT GRID - NO TRUNCATE) ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900/80 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10 md:mb-16">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Modern Web Experiences</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              <p className="text-slate-400 mt-6 text-sm max-w-2xl mx-auto leading-relaxed">
                Beyond functional code, I focus on crafting immersive, high-performance digital experiences that engage users through motion, aesthetics, and smooth interactivity.
              </p>
            </motion.div>

            {/* 2 COLUMNS SA MOBILE (grid-cols-2), 3 SA TABLET, 4 SA PC */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {webExperiences.map((exp, idx) => {
                const expText = typeof exp === 'string' ? exp : String(exp || '');
                if (!expText) return null;

                const isLearning = expText.toLowerCase().includes('(learning)');
                const cleanName = expText.replace(/\(learning\)/i, '').trim();

                return (
                  <motion.div 
                    key={idx} 
                    variants={cardPop} 
                    className={`w-full px-2.5 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border flex items-center justify-between backdrop-blur-sm transition-all hover:-translate-y-1 cursor-default shadow-sm md:shadow-lg h-full min-h-[44px] ${isLearning ? 'bg-purple-950/20 border-purple-500/20 text-purple-300 hover:border-purple-400/50 hover:bg-purple-900/20' : 'bg-cyan-950/10 border-cyan-500/20 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-900/10'}`}
                  >
                    <div className="flex items-center gap-1.5 md:gap-3 flex-1 pr-1">
                      {isLearning ? <GraduationCap className="text-purple-500 shrink-0 w-3 h-3 md:w-4 md:h-4" /> : <Sparkles className="text-cyan-500 shrink-0 w-3 h-3 md:w-4 md:h-4" />}
                      
                      {/* TINANGGAL ANG TRUNCATE. Nilagyan ng leading-tight para maganda ang spacing kung 2 lines */}
                      <span className="text-[10px] sm:text-[11px] md:text-sm font-semibold tracking-wide text-left leading-tight break-words">{cleanName}</span>
                    </div>
                    
                    {isLearning && (
                      <span className="ml-1 shrink-0 text-[6px] md:text-[9px] bg-purple-500/10 border border-purple-500/30 text-purple-400 px-1 md:px-2 py-0.5 rounded uppercase tracking-wider font-mono mt-0.5">
                        Learn
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* ================= 71. VISION STATEMENT ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900/80 text-center bg-black/20">
          <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto">
             <Quote size={40} className="text-purple-500/30 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Vision Statement</h2>
             <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                My long-term goal is to become a software engineer who combines creativity, business understanding, data analytics, automation, and artificial intelligence to build meaningful digital products. 
                <br/><br/>
                Rather than specializing in only one discipline, I aim to bridge multiple fields and create solutions that are technically sound, visually polished, data-informed, and genuinely valuable to businesses and communities.
             </p>
          </motion.div>
        </section>

        {/* ================= PAGE RESUME DOWNLOAD ================= */}
        {pageResume && (
          <section className="w-full px-6 pt-10 pb-6 z-10 relative flex justify-center border-t border-slate-900/80 bg-black/20">
            <motion.a
              href={pageResume.file_url || pageResume.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-slate-900 border border-cyan-500/30 hover:border-cyan-500 transition-all group backdrop-blur-md cursor-pointer relative z-20 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Download size={20} />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold mb-0.5">Download Professional Resume</span>
                <span className="text-sm md:text-base font-bold text-white group-hover:text-cyan-400 transition-colors block">
                  {pageResume.title || 'AI Developer Resume'}
                </span>
              </div>
            </motion.a>
          </section>
        )}

        {/* ================= 72. TRANSITION TO CONTACT ================= */}
        <section className="w-full relative border-t border-slate-900 mt-16 pt-32 pb-24 px-6 overflow-hidden z-10">
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/90 to-[#0c0c0e] z-[-1]" />

          <div className="max-w-4xl mx-auto text-center relative z-20">
            <motion.div variants={futuristicReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
                Every Project Begins with a Conversation.
              </h2>
              <p className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Elegant neutral tones welcome you into the final hub. Animated code environments give way to a personal invitation. Connect with Jefferson Gonzales to transform creative and analytical inspiration into measurable operational opportunity.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button onClick={() => window.location.href = '/contact'}
                  className="px-8 py-4 rounded-xl bg-white text-black font-black text-sm hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 cursor-pointer relative z-20">
                  Contact Us <Mail size={16} />
                </button>
                
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold text-sm transition-colors flex items-center gap-2 backdrop-blur-md cursor-pointer relative z-20">
                  <ArrowUp size={16} /> Back to Top 
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}