// src/pages/AiDeveloper.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Cpu, Terminal, Layers, ArrowUp, CheckCircle2, ChevronRight, GraduationCap, Settings, ExternalLink, Quote, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Added Supabase Import

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

// ================= VARIED ANIMATION VARIANTS =================
const fadeSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardPop = {
  hidden: { opacity: 0, scale: 0.8, rotateX: 15 },
  visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

const timelineSlide = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
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
  { label: "Dashboards Built", value: 12, suffix: "" },
  { label: "Hours Coding", value: 320, suffix: "+" },
  { label: "AI Prompts Optimized", value: 1200, suffix: "+" }
];

const defaultLearningTimeline = [
  { year: "2014", desc: "Started career as Graphic Artist." },
  { year: "2022", desc: "Began pursuing a Bachelor of Science in Information Technology." },
  { year: "2024", desc: "Expanded into entrepreneurship, remote international freelance work, and team management through Dream Creations." },
  { year: "2025", desc: "Deepened interest in technology through business process improvements and corporate creative work." },
  { year: "2026", desc: "Started Data Analyst Internship at S.P. Madrid. Recognized the growing importance of automation, software development, and AI in modern business." },
  { year: "2026 (Current)", desc: "Committed to learning modern web development. Started studying React, Vite, Tailwind CSS, Git, GitHub, JavaScript, Modern UI Architecture, Component Design, and Software Engineering." },
  { year: "2026 (Milestone)", desc: "Built this Personal Portfolio as the first flagship software engineering project." },
  { year: "Future Scope", desc: "AI Automation Platform, CRM System, Business Management Software, Analytics Platform, Mobile Applications, SaaS Products, Open Source Contributions, Teaching Software Engineering, and Technology Entrepreneurship." }
];

const defaultAiEcosystem = [
  { name: "ChatGPT", role: "Primary planning, architecture, debugging, documentation, learning, and technical guidance.", imageSrc: "/images/chatgpt.png" },
  { name: "Claude", role: "Long-form documentation, reasoning, architecture planning, code reviews, and structured writing.", imageSrc: "/images/claude.png" },
  { name: "Gemini", role: "Alternative implementation ideas, research, and cross-validation.", imageSrc: "/images/gemini.png" },
  { name: "GitHub Copilot", role: "In-editor code completion, productivity, and developer assistance.", imageSrc: "/images/copilot.png" },
  { name: "Amazon Q (Learning)", role: "Enterprise-focused AI development assistant.", imageSrc: "/images/amazonq.png" },
  { name: "OpenClaw (Learning)", role: "Open-source AI workflow exploration.", imageSrc: "/images/openclaw.png" }
];

const defaultTechStackData = [
  {
    category: "Frontend",
    items: [
      { name: "React", imageSrc: "/images/react.png" },
      { name: "Vite", imageSrc: "/images/vite.png" },
      { name: "Tailwind CSS", imageSrc: "/images/tailwind.png" },
      { name: "JavaScript (ES6+)", imageSrc: "/images/javascript.png" },
      { name: "HTML5/CSS3", imageSrc: "/images/html5.png" }
    ]
  },
  {
    category: "Backend & Database (Learning Roadmap)",
    items: [
      { name: "Node.js", imageSrc: "/images/nodejs.png" },
      { name: "Express.js", imageSrc: "/images/express.png" },
      { name: "PostgreSQL", imageSrc: "/images/postgresql.png" },
      { name: "Supabase", imageSrc: "/images/supabase.png" }
    ]
  },
  {
    category: "Automation & Prototyping",
    items: [
      { name: "n8n", imageSrc: "/images/n8n.png" },
      { name: "Replit", imageSrc: "/images/replit.png" },
      { name: "Stitch", imageSrc: "/images/stitch.png" },
      { name: "Git / GitHub", imageSrc: "/images/github-stack.png" }
    ]
  }
];

const defaultShowcaseProjects = [
  {
    id: 1,
    type: "flagship",
    badge: "In Progress",
    meta: "Flagship Software Engineering v1",
    title: "Personal Portfolio Website",
    desc: "A premium, custom-architected portfolio platform built entirely from scratch to showcase graphic design archives, data analytics systems, and modular web software while serving as an active production codebase.",
    tech: ["React", "Vite", "Tailwind CSS", "Git", "GitHub", "VS Code", "AI Assistant Workflow"],
    role: "Frontend Architect",
    actionText: "Inspect Source",
    link: "https://github.com"
  },
  {
    id: 2,
    type: "pipeline",
    title: "Future AI Automation Pipelines",
    desc: "Upcoming systems for centralizing enterprise data layers, processing natural language document pipelines, lead routing rules, and automated business flow orchestration.",
    status: "STATUS: WAITING_ON_DEPS"
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

// ================= AGGRESSIVE URL SCANNER =================
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

  // ================= STATE CONTEXT IMPLEMENTATION FOR ENTIRE PAGE =================
  const [stats, setStats] = useState(defaultDeveloperStats);
  const [timeline, setTimeline] = useState(defaultLearningTimeline);
  const [aiPartners, setAiPartners] = useState(defaultAiEcosystem);
  const [architecture, setArchitecture] = useState(defaultTechStackData);
  const [showcase, setShowcase] = useState(defaultShowcaseProjects);
  const [github, setGithub] = useState(defaultGithubProfile);

  // ================= FETCH CMS DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_developer')
          .select('*')
          .eq('id', 1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          if (data.metrics_counters?.length > 0) setStats(data.metrics_counters);
          if (data.development_timeline?.length > 0) setTimeline(data.development_timeline);
          
          // ================= ADVANCED BRUTE FORCE: AI ECOSYSTEM =================
          if (Array.isArray(data.ai_partners) && data.ai_partners.length > 0) {
            const formattedPartners = data.ai_partners.map(ai => {
              let imgUrl = extractImageDeep(ai);
              
              // Fallback to local default if CMS erased it but didn't provide a new image
              if (!imgUrl) {
                const localMatch = defaultAiEcosystem.find(d => d.name?.toLowerCase() === ai.name?.toLowerCase());
                if (localMatch) imgUrl = localMatch.imageSrc;
              }
              if (!imgUrl && ai.imageSrc) imgUrl = ai.imageSrc;
              
              return { ...ai, customImage: imgUrl };
            });
            setAiPartners(formattedPartners);
          }
          
          // ================= ADVANCED BRUTE FORCE: ARCHITECTURE STACK =================
          if (Array.isArray(data.architecture_stack) && data.architecture_stack.length > 0) {
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
                  
                  // Cross-reference all local defaults across categories if CMS image is missing
                  if (!imgUrl) {
                    defaultTechStackData.forEach(defStack => {
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
        @keyframes digital-rain {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 0 1000px, 0 0; }
        }
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
      `}</style>

      {/* The STICKY Wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#02040a]">
          
          {/* Digital Rain Layer */}
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `repeating-linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%), repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.05) 0px, transparent 1px, transparent 60px)`,
            backgroundSize: '100% 250px, 100% 100%',
            animation: 'digital-rain 6s linear infinite'
          }} />

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

        {/* ================= 59. HERO SECTION ================= */}
        <section className="relative pt-44 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center">
          <div className="max-w-5xl mx-auto text-center relative">
            
            <motion.div variants={fadeSlideUp} initial="hidden" animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-8 backdrop-blur-md">
              <Terminal size={14} /> AI-Assisted Full-Stack Engineering
            </motion.div>

            <motion.h1 variants={fadeSlideUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8 leading-tight">
              Building the Future with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Code, AI, & Continuous Learning.
              </span>
            </motion.h1>

            <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto space-y-4 mb-12">
              <p><strong>Software engineering is more than writing code.</strong> It is understanding problems, designing scalable solutions, collaborating with intelligent tools, and continuously improving through real-world experience.</p>
              <p>As an aspiring AI-Assisted Full-Stack Developer, I am building practical applications while learning modern technologies, software architecture, automation, and best development practices.</p>
              <p className="text-cyan-400/90 font-medium">This portfolio is my first flagship software engineering project—and the beginning of a much larger journey.</p>
            </motion.div>

            {/* Call-to-Action Controls REORDERED: Transpositioned ABOVE Quick Stats */}
            <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-4 relative z-20 mb-16">
              <button onClick={() => scrollToSection('current-projects')} className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black text-sm hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer">
                View Projects
              </button>
              <button onClick={() => scrollToSection('learning-timeline')} className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm hover:bg-slate-800 hover:border-cyan-500/50 transition-colors flex items-center gap-2 cursor-pointer">
                Explore My Journey <ChevronRight size={16} />
              </button>
              <a href={github.profileUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 rounded-xl bg-black border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-2 text-sm font-semibold">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </a>
            </motion.div>

            {/* Quick Statistics Counter System */}
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

        {/* ================= 61. LEARNING PHILOSOPHY ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 space-y-6">
                <h3 className="text-3xl font-black text-white">Learning by Building.</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
                  <p>I believe the most effective way to learn software engineering is through practical application.</p>
                  <p>Rather than relying solely on tutorials or theoretical exercises, I build complete projects that challenge me to solve real problems, make architectural decisions, debug unexpected issues, and continuously improve my understanding.</p>
                  <p>Artificial Intelligence plays an important role in this process—not as a replacement for learning, but as a mentor, assistant, reviewer, and productivity tool.</p>
                  <p>Every feature I build is an opportunity to deepen my understanding of software engineering principles while producing something meaningful.</p>
                </div>
              </motion.div>

              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Build real projects.", "Understand the code.", "Learn continuously.", "Solve business problems.",
                    "Write maintainable software.", "Design scalable systems.", "Use AI responsibly.", "Embrace debugging.",
                    "Document everything.", "Improve every iteration."
                  ].map((principle, idx) => (
                    <motion.div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 overflow-hidden shadow-lg hover:border-cyan-500/40 transition-colors group">
                      <motion.div variants={{ hidden: { scale: 3, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } } }}>
                        <CheckCircle2 size={18} className="text-cyan-400 shrink-0 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] group-hover:scale-110 transition-transform" />
                      </motion.div>
                      <motion.div variants={{ hidden: { x: 40, y: -20, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } } }}>
                        <span className="text-sm text-slate-200 font-medium">{principle}</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ================= 62. DEVELOPMENT JOURNEY TIMELINE ================= */}
        <section id="learning-timeline" className="py-24 px-6 relative border-t border-slate-900/80 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <h3 className="text-3xl font-black text-white mb-4">Development Journey Timeline</h3>
              <div className="w-16 h-1 bg-cyan-500 rounded-full mx-auto shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            </motion.div>

            <div className="relative border-l border-slate-800 ml-4 md:ml-32 space-y-12">
              {timeline.map((item, idx) => (
                <motion.div variants={timelineSlide} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.1 }} key={idx} className="relative pl-8 group">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-900 group-hover:bg-cyan-400 transition-colors border border-cyan-500/50 z-20 shadow-[0_0_10px_rgba(6,182,212,0)] group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  
                  <div className="md:absolute md:left-[-140px] md:top-0 md:w-32 md:text-right font-black text-sm text-slate-500 group-hover:text-cyan-400 transition-colors mb-2 md:mb-0">
                    {item.year}
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-900 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/5 transition-all duration-300 shadow-lg backdrop-blur-sm">
                    <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line group-hover:text-slate-200 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 63 & 64. AI PHILOSOPHY & WORKFLOW ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-6 space-y-6">
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

            <motion.div variants={futuristicReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} 
              className="lg:col-span-6 h-[450px] overflow-y-auto pr-2 border border-slate-800 bg-slate-950/80 p-6 rounded-2xl hide-scrollbar relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#02040a] to-transparent pointer-events-none z-10" />
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Cpu size={14} className="text-purple-400" /> Interactive Prompts Workflow</h4>
              <div className="space-y-3 relative border-l border-purple-500/30 ml-2">
                {aiWorkflowSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 pl-4 relative group cursor-default">
                    <div className="absolute left-[-4.5px] top-2 w-2 h-2 rounded-full bg-slate-800 group-hover:bg-purple-400 transition-colors shadow-[0_0_10px_rgba(168,85,247,0)] group-hover:shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                    <span className="text-xs font-mono text-slate-600 group-hover:text-purple-400 transition-colors">[{idx+1}]</span>
                    <span className="text-sm font-semibold text-slate-400 group-hover:text-white transition-colors">{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= 65. AI ECOSYSTEM (WITH LOGOS) ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900/80 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <h3 className="text-3xl font-black text-white mb-4">Current AI Ecosystem</h3>
              <div className="w-16 h-1 bg-purple-500 rounded-full mx-auto shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
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
                      <Cpu size={20} className={`text-slate-700 absolute inset-0 m-auto z-0 ${ai.customImage ? 'hidden' : 'block'}`} />
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">{ai.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed flex-grow group-hover:text-slate-300 transition-colors">{ai.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= 67. TECH STACK (WITH LOGOS) ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <h3 className="text-3xl font-black text-white mb-4">Development Architecture</h3>
              <div className="w-16 h-1 bg-cyan-500 rounded-full mx-auto shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            </motion.div>

            <div className="space-y-16">
              {architecture.map((stack, idx) => (
                <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} key={idx}>
                  <h4 className="text-xs text-cyan-500 uppercase tracking-widest font-black mb-6 border-b border-slate-800 pb-2">{stack.category}</h4>
                  <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {stack.items?.map((tool, i) => (
                      <motion.div variants={cardPop} key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-900 flex flex-col items-center justify-center text-center hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 group shadow-lg">
                        <div className="w-14 h-14 rounded-xl border border-slate-800 bg-black flex items-center justify-center mb-3 relative overflow-hidden group-hover:-translate-y-1 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                          {tool.customImage ? (
                            <img src={tool.customImage} alt={tool.name} className="w-8 h-8 object-contain opacity-60 group-hover:opacity-100 transition-opacity absolute inset-0 m-auto z-10"
                                 onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                          ) : null}
                          <Settings size={20} className={`text-slate-700 absolute inset-0 m-auto z-0 ${tool.customImage ? 'hidden' : 'block'}`} />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors">{tool.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 68. CURRENT PROJECTS ================= */}
        <section id="current-projects" className="py-24 px-6 relative border-t border-slate-900/80 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
              <h3 className="text-3xl font-black text-white mb-4">Engineering Showcase</h3>
              <div className="w-16 h-1 bg-cyan-500 rounded-full mx-auto shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {showcase.map((project) => {
                if (project.type === "flagship") {
                  return (
                    <motion.div key={project.id} variants={futuristicReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                      className="lg:col-span-2 p-8 rounded-3xl bg-slate-950/80 border border-slate-800 flex flex-col h-full relative overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all group backdrop-blur-md">
                      <div className="absolute top-4 right-4 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] uppercase font-black tracking-wider rounded shadow-[0_0_10px_rgba(6,182,212,0.2)]">{project.badge}</div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2 block">{project.meta}</span>
                      <h4 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-300 transition-colors">{project.title}</h4>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">{project.desc}</p>
                      
                      <h5 className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-3">Technologies Managed</h5>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 rounded bg-black border border-slate-800 text-xs text-slate-300 font-medium group-hover:border-cyan-500/50 transition-colors">{tech}</span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800">
                         <span className="text-xs text-cyan-400 font-bold">Role: {project.role}</span>
                         <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-white/80 hover:text-cyan-400 flex items-center gap-1 font-bold">{project.actionText} <ExternalLink size={14}/></a>
                      </div>
                    </motion.div>
                  );
                } else {
                  return (
                    <motion.div key={project.id} variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
                      className="p-6 rounded-3xl border border-dashed border-slate-700 bg-black/60 flex flex-col justify-between h-full opacity-80 hover:opacity-100 hover:border-purple-500/50 transition-all backdrop-blur-md">
                      <div>
                        <Layers className="text-purple-400 mb-4" size={28} />
                        <h4 className="text-lg font-bold text-white mb-2">{project.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{project.desc}</p>
                      </div>
                      <div className="pt-6 border-t border-slate-800/60 text-[11px] text-purple-400/80 font-mono flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" /> {project.status}
                      </div>
                    </motion.div>
                  );
                }
              })}
            </div>
          </div>
        </section>

        {/* ================= 69. GITHUB SYSTEM (STATE ATTACHED) ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900 bg-black/50 backdrop-blur-md">
          <motion.div variants={futuristicReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto p-6 rounded-2xl border border-slate-800 bg-slate-950/80 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
             <div className="flex flex-col sm:flex-row items-center gap-5 justify-between mb-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg border border-slate-700 shadow-inner">JG</div>
                   <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        {github.name} 
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" className="text-slate-500"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      </h4>
                      <p className="text-xs text-slate-500">github.com/{github.username}</p>
                   </div>
                </div>
                <span className="text-[10px] px-2 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 rounded uppercase font-mono shadow-[0_0_10px_rgba(6,182,212,0.2)]">{github.badgeText}</span>
             </div>
             <div className="h-32 bg-black border border-slate-900 rounded-xl flex items-center justify-center text-xs text-slate-700 font-mono relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                <span className="relative z-10">{github.matrixPlaceholder}</span>
             </div>
          </motion.div>
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

        {/* ================= 72. TRANSITION TO CONTACT ================= */}
        <section className="w-full relative border-t border-slate-900 mt-16 pt-32 pb-24 px-6 overflow-hidden z-10">
          
          {/* Aesthetic Shift Gradient */}
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