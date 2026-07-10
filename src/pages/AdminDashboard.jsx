// src/pages/AdminDashboard.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // Make sure Supabase is imported!
import { 
  LayoutDashboard, Activity, Palette, Database, BrainCircuit, 
  Mail, LogOut, Save, Plus, Trash2, Image, ExternalLink, 
  Sliders, Layers, Eye, CheckCircle, FileText, User, HelpCircle, 
  Briefcase, Star, Cpu, Settings, UploadCloud, File, Image as ImageIcon, Menu, X
} from 'lucide-react';

const sidebarModules = [
  { name: 'Dashboard Hub', icon: <LayoutDashboard size={16} /> },
  { name: 'Home Engine', icon: <Activity size={16} /> },
  { name: 'Dream Creations', icon: <Palette size={16} /> },
  { name: 'Data Analyst', icon: <Database size={16} /> },
  { name: 'AI Developer', icon: <BrainCircuit size={16} /> },
  { name: 'Contact Links', icon: <Settings size={16} /> },
  { name: 'Media Library', icon: <ImageIcon size={16} /> },
  { name: 'Messages Inbox', icon: <Mail size={16} /> }
];

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState('Dashboard Hub');
  const [activePortfolioTab, setActivePortfolioTab] = useState('dashboards');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add this line
  const navigate = useNavigate();
  // =========================================================================
  // ROUTE SECURITY: KICK OUT UNAUTHENTICATED USERS
  // =========================================================================
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      }
    };
    checkAuth();
  }, [navigate]);
  // =========================================================================
  // 1. HOME ENGINE BACKING DATA STATES
  // =========================================================================
  const [homeHeroPhoto, setHomeHeroPhoto] = useState("/images/profile.jpg");
  const [homeStats, setHomeStats] = useState([
    { num: 10, suffix: "+", label: "Years of Experience" },
    { num: 15, suffix: "+", label: "Professional Roles" },
    { num: 20, suffix: "+", label: "Companies Worked With" },
    { num: 200, suffix: "+", label: "Projects Completed" },
    { num: 10, suffix: "+", label: "Industries Served" },
    { num: 25, suffix: "+", label: "Learning Technologies" }
  ]);
  const [homeSkills, setHomeSkills] = useState([
    { category: "Creative", icon: "Palette", skills: "Graphic Design, Branding, Logo Design, Vector Illustration, Layout Composition, Typography, Mass Print Operations" },
    { category: "Analytics", icon: "BarChart2", skills: "Data Cleaning, Data Validation, Data Reconciliation, Operational Reporting, Executive Reports, Dashboard Design, Metrics Modeling" },
    { category: "Technology", icon: "Code", skills: "React, Vite, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3, Git / GitHub, Node.js (Learning), SQL (Learning)" },
    { category: "AI & Automation", icon: "Cpu", skills: "ChatGPT, Claude, Gemini, GitHub Copilot, Prompt Engineering, Automation Workflows" },
    { category: "Leadership", icon: "Users", skills: "Project Management, Team Management, Client Acquisition, Milestone Tracking, Cross-functional Operations" }
  ]);
  const [homeTimeline, setHomeTimeline] = useState([
    { year: "2014", title: "Multimedia Graphic Artist", company: "Visual Design Core", desc: "Began my professional journey crafting visual identities." }
  ]);

  // =========================================================================
  // 2. DREAM CREATIONS BACKING DATA STATES
  // =========================================================================
  const [dreamBanner, setDreamBanner] = useState("/Logo Banner.png");
  const [dreamFounderPhoto, setDreamFounderPhoto] = useState("/images/jefferson.jpg");
  const [dreamFounderExp, setDreamFounderExp] = useState(10);
  const [dreamFounderProjects, setDreamFounderProjects] = useState(200);
  
  const [dreamTeam, setDreamTeam] = useState([
    { id: 1, name: "Dexter Joy D. Bautista", positions: "Multimedia Designer", bio: "Creativity is more than just a skill for me, it's my lifestyle.", skills: "Package Design, UI/UX Design", software: "Photoshop, Illustrator", experience: "7+ Years", availability: "Full-Time", status: "Active", photo: "/images/dexter.jpg", portfolioUrl: "#" }
  ]);
  const [dreamSoftware, setDreamSoftware] = useState([
    { name: "Photoshop", imageSrc: "/images/photoshop.png" },
    { name: "Illustrator", imageSrc: "/images/illustrator.png" }
  ]);
  const [dreamClients, setDreamClients] = useState([
    { name: "Responsive Health", industry: "Insurance & Healthcare", imageSrc: "/images/client1.png" }
  ]);
  const [dreamFeedback, setDreamFeedback] = useState([
    { client_name: "Jane Doe", company: "Acme Corp", project_type: "Brand Refresh", rating: 5, feedback: "Dream Creations delivered an outstanding visual package.", face_image_url: "/images/face1.jpg" }
  ]);
  const [dreamArchive, setDreamArchive] = useState([
    { category: "Branding & Identity", subtitle: "Logo Design", title: "Corporate Rebrand", client_name: "Acme Corp", description: "Complete brand visual identity overhaul.", featured_image_url: "/images/project1.jpg", video_url: "/videos/project.mp4" }
  ]);

  // =========================================================================
  // 3. DATA ANALYST BACKING DATA STATES
  // =========================================================================
  const [analystStats, setAnalystStats] = useState([
    { label: "Years in Analytics", value: 1, suffix: "+" },
    { label: "Dashboards Built", value: 12, suffix: "" },
    { label: "Reports Created", value: 45, suffix: "" },
    { label: "Automation Projects", value: 8, suffix: "" },
    { label: "Processes Improved", value: 15, suffix: "" },
    { label: "Hours Saved", value: 120, suffix: "+" }
  ]);
  const [analystRoles, setRoles] = useState([
    { id: 1, statusBadge: "Current Role", title: "Data Analyst Intern", company: "S.P. Madrid", responsibilities: "Data Cleaning, Power Query, Excel Automation", impact: "Support business reporting, Reduce manual processing", logoUrl: "/images/spmadrid.png" }
  ]);
  const [analystSkills, setAnalystSkills] = useState([
    { category: "Data Analysis", skills: "Microsoft Excel, Power Query, Advanced Formulas" },
    { category: "Database", skills: "Database Administration, SQL (Learning), PostgreSQL (Learning)" }
  ]);
  const [analystEcosystem, setAnalystEcosystem] = useState([
    { category: "Office Productivity", tools: [{ name: "Microsoft Excel", imageSrc: "/images/excel.png" }] }
  ]);
  const [analystRoadmap, setAnalystRoadmap] = useState(["Power BI", "SQL", "Python", "Cloud Analytics", "Microsoft Fabric"]);
  
  // 5-Tab Structured Array Architecture (Fully Detailed)
  const [portfolioDashboards, setPortfolioDashboards] = useState([
    { id: 1, name: "Executive Sales Dashboard", purpose: "Track revenue", industry: "Corporate B2B", department: "Sales", description: "Sales metrics tracking overview.", software: "Excel", tech: "ODBC", date: "August 2024", status: "Deployed", kpis: "MRR, Churn", impact: "Saved 4 hours weekly", thumbnail: "/images/dashboard-thumb.jpg" }
  ]);
  const [portfolioReports, setPortfolioReports] = useState([
    { id: 1, title: "Q3 Operational Efficiency Report", context: "Visibility needs", objective: "Resolve delays", audience: "C-Level", frequency: "Quarterly", source: "CRM", format: "PDF", viz: "Funnel Charts", findings: "Data errors caused 40% delays", recommendations: "Automate verification rules", impact: "Improved turnaround by 15%", tools: "Excel" }
  ]);
  const [portfolioAutomations, setPortfolioAutomations] = useState([
    { id: 1, name: "Automated Reconciliation Script", problem: "Matching took 2 days", currentProcess: "VLOOKUPs", painPoints: "High error rates", objectives: "Reduce under 1 hour", steps: "Extract, Clean, Match", tech: "Power Query", ai: "ChatGPT optimized", timeSaved: "14 hours/month", errorReduction: "99%", productivity: "+300%" }
  ]);
  const [portfolioCaseStudies, setPortfolioCaseStudies] = useState([
    { id: 1, problem: "Inconsistent lead tracking", background: "Scattered sheets", objectives: "Centralize data", collection: "Exported 5 sources", cleaning: "Standardized dates", analysis: "Peak converted times", visualization: "Heatmaps", insights: "Fast contact convert 4x higher", recommendations: "Set instant alert rules", impact: "+25% sales volume", lessons: "Governance starts at entry point" }
  ]);
  const [portfolioProjects, setPortfolioProjects] = useState([
    { id: 1, name: "Healthcare Patient Flow Analysis", industry: "Healthcare", overview: "Analyzing wait times", problem: "Wait times over 2 hours", objectives: "Staff optimization", tools: "Excel", tech: "Data Modeling", role: "Intern", challenges: "Missing timestamps", solution: "Interpolated averages", results: "Optimized staffing matrix", status: "Completed" }
  ]);

  // =========================================================================
  // 4. AI DEVELOPER BACKING DATA STATES
  // =========================================================================
  const [aiStats, setAiStats] = useState([
    { label: "Git Repositories", value: 4, suffix: "" },
    { label: "Dashboards Built", value: 12, suffix: "" },
    { label: "Hours Coding", value: 320, suffix: "+" },
    { label: "AI Prompts Optimized", value: 1200, suffix: "+" }
  ]);
  const [aiTimeline, setAiTimeline] = useState([
    { year: "2014", desc: "Started career as Graphic Artist." },
    { year: "2026 (Current)", desc: "Committed to learning modern web development." }
  ]);
  const [aiEcosystemState, setAiEcosystemState] = useState([
    { name: "ChatGPT", role: "Primary planning, architecture, debugging.", imageSrc: "/images/chatgpt.png" },
    { name: "Claude", role: "Long-form documentation, reasoning.", imageSrc: "/images/claude.png" }
  ]);
  const [aiArchitecture, setAiArchitecture] = useState([
    { category: "Frontend", items: [{ name: "React", imageSrc: "/images/react.png" }, { name: "Vite", imageSrc: "/images/vite.png" }] }
  ]);
  const [aiShowcase, setAiShowcase] = useState([
    { id: 1, type: "flagship", badge: "In Progress", meta: "Flagship Software v1", title: "Personal Portfolio Website", desc: "Custom portfolio platform built from scratch.", tech: "React, Vite, Tailwind CSS, Git", role: "Frontend Architect", actionText: "Inspect Source", link: "https://github.com" },
    { id: 2, type: "pipeline", title: "Future AI Automation Pipelines", desc: "Upcoming systems for data layers.", status: "STATUS: WAITING_ON_DEPS" }
  ]);
  const [aiGithub, setAiGithub] = useState({
    name: "Jefferson Gonzales", username: "jeffersongonzales", profileUrl: "https://github.com", badgeText: "Live Sync Ready", matrixPlaceholder: "[Simulated GitHub Contribution Matrix Grid Placeholder]"
  });

  // =========================================================================
  // 5. CONTACT, MEDIA, & INBOX DATA STATES
  // =========================================================================
  const [contactResumeUrl, setContactResumeUrl] = useState("/Jefferson_Gonzales_Resume.pdf");
  const [contactPortfolioUrl, setContactPortfolioUrl] = useState("/Jefferson_Gonzales_Portfolio.pdf");
  const [contactPlatforms, setContactPlatforms] = useState([
    { id: "linkedin", name: "LinkedIn", username: "jeffersongonzales", link: "https://linkedin.com", status: "active" },
    { id: "github", name: "GitHub", username: "jeffersongonzales", link: "https://github.com", status: "active" }
  ]);
  const [messagesLog, setMessagesLog] = useState([
    { id: 1, sender_name: "Jane Smith", sender_email: "jane@corp.com", company: "Metrics Inc", subject: "BI Project Pitch", service_interested: "Data Analytics", message: "Hi Jefferson, we checked your analytics profile and would love to review your dashboards portfolio for a current operational reporting pipeline opening.", status: "unread" }
  ]);
  const [mediaFiles, setMediaFiles] = useState([
    { id: 1, file_name: "logo_banner.png", file_url: "/Logo Banner.png", type: "image" }
  ]);

  // =========================================================================
  // STATE GENERIC MUTATION HELPERS
  // =========================================================================
  const handleUpdateArrayField = (state, setState, index, field, value) => {
    const copy = [...state];
    copy[index][field] = value;
    setState(copy);
  };

  const handleRemoveArrayItem = (state, setState, index) => {
    setState(state.filter((_, i) => i !== index));
  };

  const handleFileUploadMock = (e) => {
    const file = e.target.files[0];
    if(file) {
      alert(`Simulated upload for: ${file.name}. This will connect to Supabase Storage later.`);
      setMediaFiles([{id: Date.now(), file_name: file.name, file_url: URL.createObjectURL(file), type: "image"}, ...mediaFiles]);
    }
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-200 overflow-hidden font-sans antialiased">
      
      {{/* Mobile Overlay Background */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* UNIVERSAL SIDEBAR CONTROL DRAWER */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#09090b] border-r border-zinc-900 flex flex-col justify-between transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Mobile Close Button */}
        <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-4 md:hidden text-zinc-500 hover:text-white">
          <X size={20} />
        </button>
        <div>
          <div className="p-6 border-b border-zinc-900">
            <h2 className="text-sm font-black text-white tracking-widest uppercase font-mono">JG PANEL // 2026</h2>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 block">Unified Core CMS Shell</span>
          </div>
          <nav className="p-4 space-y-1">
            {sidebarModules.map((module) => (
              <button
                key={module.name}
                onClick={() => { setActiveModule(module.name); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all border text-left cursor-pointer ${
                  activeModule === module.name 
                    ? 'bg-zinc-900 text-white border-zinc-800 shadow-md' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30 border-transparent'
                }`}
              >
                {module.icon} {module.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-zinc-900">
          <button onClick={() => navigate('/admin/login')} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-xs font-mono font-bold text-red-400 hover:bg-red-500/5 hover:border-red-500/20 transition-all cursor-pointer">
            <LogOut size={14} /> SIGN OUT CORE
          </button>
        </div>
      </aside>

      {/* PRIMARY MODULE CONTENT VIEWPORT WORKSPACE */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#09090b]">
        
        {/* TIER 3: THE GLOBAL ACTIONS STICKY HEADER BAR */}
        <header className="h-16 flex-shrink-0 border-b border-zinc-900 flex items-center justify-between px-4 md:px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white cursor-pointer">
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-400">
              <Sliders size={14} className="text-zinc-500 hidden sm:block" />
              <span className="hidden sm:block">Active Frame:</span>
              <span className="text-white bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 font-mono font-bold truncate max-w-[140px] sm:max-w-none">{activeModule}</span>
            </div>
          </div>
          
          <button 
            onClick={() => alert(`SUCCESS: Parameters for "${activeModule}" cached locally in component memory registers!`)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white text-black text-[10px] sm:text-xs font-mono font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Save size={14} className="hidden sm:block" /> SAVE
          </button>
        </header>

        {/* INNER SCROLLABLE CANVAS CONTAINER */}
        <div className="flex-1 overflow-y-auto p-8 max-w-5xl w-full mx-auto space-y-8">
          
          {/* ================= WORKSPACE PANEL: DASHBOARD HUB ================= */}
          {activeModule === 'Dashboard Hub' && (
            <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 text-left space-y-4 max-w-xl">
              <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">// System Interface Diagnostics Ready</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Welcome to your Three-Tier administrative dashboard configuration environment. Select any channel stream from the left drawer menu to modify or append data objects live.
              </p>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: MEDIA LIBRARY ================= */}
          {activeModule === 'Media Library' && (
            <div className="space-y-8 text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900">
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Cloud Media Storage</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 font-mono">Upload images/documents to copy URLs into your dynamic fields.</p>
                </div>
                <div className="relative">
                  <input type="file" onChange={handleFileUploadMock} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,application/pdf" />
                  <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md">
                    <UploadCloud size={14} /> UPLOAD FILE ASSET
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaFiles.map((file, idx) => (
                  <div key={idx} className="group relative rounded-xl bg-zinc-950 border border-zinc-900 overflow-hidden aspect-square flex flex-col items-center justify-center hover:border-blue-500/50 transition-colors">
                    {file.type === 'image' ? <img src={file.file_url} alt="media" className="w-full h-full object-cover" /> : <File size={32} className="text-zinc-600" />}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-[10px] text-white truncate w-full mb-3 font-mono">{file.file_name}</p>
                      <div className="flex gap-2">
                        <button onClick={() => { navigator.clipboard.writeText(file.file_url); alert('URL Copied to clipboard!'); }} className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-mono font-bold cursor-pointer">Copy</button>
                        <button onClick={() => handleRemoveArrayItem(mediaFiles, setMediaFiles, idx)} className="px-3 py-1.5 rounded-lg bg-red-900/50 hover:bg-red-900 text-white text-[10px] font-mono font-bold cursor-pointer"><Trash2 size={12}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: HOME ENGINE ================= */}
          {activeModule === 'Home Engine' && (
            <div className="space-y-8 text-left">
              {/* Tier 1: Static Attributes Card */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2"><Image size={14}/> Hero Assets Layer</h4>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase">Profile Photo Image URL Link Source</label>
                  <input type="text" value={homeHeroPhoto} onChange={(e) => setHomeHeroPhoto(e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none" />
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Quick Stats) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Quick Stats Counters Matrix</h4>
                  <button onClick={() => setHomeStats([...homeStats, { num: 0, suffix: "+", label: "New Metric Title" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD BLOCK</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {homeStats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 grid grid-cols-4 gap-2 items-end relative group">
                      <div><input type="number" value={stat.num} onChange={(e) => handleUpdateArrayField(homeStats, setHomeStats, idx, 'num', parseInt(e.target.value) || 0)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white text-center font-mono" /></div>
                      <div><input type="text" value={stat.suffix} onChange={(e) => handleUpdateArrayField(homeStats, setHomeStats, idx, 'suffix', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white text-center font-mono" /></div>
                      <div className="col-span-2 flex items-center gap-1">
                        <input type="text" value={stat.label} onChange={(e) => handleUpdateArrayField(homeStats, setHomeStats, idx, 'label', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-mono" />
                        <button onClick={() => handleRemoveArrayItem(homeStats, setHomeStats, idx)} className="text-zinc-600 hover:text-red-400 p-1 cursor-pointer"><Trash2 size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Skills Array) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Core Competencies Data Streams</h4>
                  <button onClick={() => setHomeSkills([...homeSkills, { category: "New Category", icon: "Code", skills: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD CATEGORY</button>
                </div>
                {homeSkills.map((group, catIdx) => (
                  <div key={catIdx} className="p-4 rounded-xl bg-zinc-950/20 border border-zinc-900 space-y-2 relative pr-8">
                    <button onClick={() => handleRemoveArrayItem(homeSkills, setHomeSkills, catIdx)} className="absolute top-4 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                    <input type="text" value={group.category} onChange={(e) => handleUpdateArrayField(homeSkills, setHomeSkills, catIdx, 'category', e.target.value)} className="bg-transparent text-xs font-mono text-white font-bold outline-none border-b border-zinc-800 pb-1 mb-2" placeholder="Category Name" />
                    <textarea value={group.skills} onChange={(e) => handleUpdateArrayField(homeSkills, setHomeSkills, catIdx, 'skills', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-3 text-xs text-zinc-300 font-mono h-20 resize-none focus:outline-none focus:border-zinc-800" placeholder="Comma separated strings tag list..." />
                  </div>
                ))}
              </div>

              {/* Tier 2: Dynamic Items Matrix (Career Timeline) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Chronological Progression Tracks</h4>
                  <button onClick={() => setHomeTimeline([...homeTimeline, { year: "", title: "", company: "", desc: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD ROW</button>
                </div>
                <div className="space-y-3">
                  {homeTimeline.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/10 space-y-2 relative">
                      <button onClick={() => handleRemoveArrayItem(homeTimeline, setHomeTimeline, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <div className="grid grid-cols-12 gap-2">
                        <input type="text" value={item.year} onChange={(e) => handleUpdateArrayField(homeTimeline, setHomeTimeline, idx, 'year', e.target.value)} className="col-span-2 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-center text-white font-mono" placeholder="Year" />
                        <input type="text" value={item.title} onChange={(e) => handleUpdateArrayField(homeTimeline, setHomeTimeline, idx, 'title', e.target.value)} className="col-span-5 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-mono" placeholder="Title" />
                        <input type="text" value={item.company} onChange={(e) => handleUpdateArrayField(homeTimeline, setHomeTimeline, idx, 'company', e.target.value)} className="col-span-5 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400 font-mono" placeholder="Company" />
                      </div>
                      <textarea value={item.desc} onChange={(e) => handleUpdateArrayField(homeTimeline, setHomeTimeline, idx, 'desc', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-zinc-500 font-mono h-16 resize-none focus:outline-none" placeholder="Description..." />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: DREAM CREATIONS ================= */}
          {activeModule === 'Dream Creations' && (
            <div className="space-y-8 text-left">
              {/* Tier 1: Static Attributes Card */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2"><Palette size={14}/> Studio Headers & Founder Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase">Dream Creation Main Banner Image URL Link</label>
                    <input type="text" value={dreamBanner} onChange={(e) => setDreamBanner(e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase">Founder Direct Photo Asset URL Source</label>
                    <input type="text" value={dreamFounderPhoto} onChange={(e) => setDreamFounderPhoto(e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-900/60 text-xs font-mono">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Founder Experience Years</label>
                    <input type="number" value={dreamFounderExp} onChange={(e) => setDreamFounderExp(parseInt(e.target.value) || 0)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-white w-24" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Founder Total Projects Count</label>
                    <input type="number" value={dreamFounderProjects} onChange={(e) => setDreamFounderProjects(parseInt(e.target.value) || 0)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-white w-24" />
                  </div>
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Core Team Roster Allocations) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Core Team Roster Allocations Matrix</h4>
                  <button onClick={() => setDreamTeam([...dreamTeam, { id: Date.now(), name: "New Creator", positions: "", bio: "", skills: "", software: "", experience: "", availability: "", status: "Active", photo: "", portfolioUrl: "#" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD MEMBER</button>
                </div>
                <div className="space-y-4">
                  {dreamTeam.map((member, idx) => (
                    <div key={member.id} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-3 relative">
                      <button onClick={() => handleRemoveArrayItem(dreamTeam, setDreamTeam, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="text" value={member.name} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'name', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-white font-bold" placeholder="Member Name" />
                        <input type="text" value={member.positions} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'positions', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-zinc-400" placeholder="Positions" />
                        <input type="text" value={member.photo} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'photo', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs font-mono text-zinc-400" placeholder="Picture URL Slot" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono font-bold text-zinc-600 uppercase mb-1">Professional Summary Bio</label>
                        <textarea value={member.bio} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'bio', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-zinc-400 h-16 resize-none" placeholder="Professional Summary Bio Narrative..." />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-zinc-600 uppercase mb-1">Core Skills (Comma Separated)</label>
                          <input type="text" value={member.skills} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'skills', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-zinc-300" placeholder="e.g. Package Design, UI/UX Design" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono font-bold text-zinc-600 uppercase mb-1">Software Field (Comma Separated)</label>
                          <input type="text" value={member.software} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'software', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-zinc-300" placeholder="e.g. Photoshop, Illustrator" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                        <input type="text" value={member.experience} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'experience', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2" placeholder="Experience (e.g., 7+ Years)" />
                        <input type="text" value={member.availability} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'availability', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2" placeholder="Availability" />
                        <input type="text" value={member.portfolioUrl} onChange={(e) => handleUpdateArrayField(dreamTeam, setDreamTeam, idx, 'portfolioUrl', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-zinc-500 font-mono" placeholder="Portfolio Redirect Link" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Software & Trusted Clients Arrays) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                    <span className="text-xs font-mono font-bold text-zinc-400 block">Software Stack Matrix</span>
                    <button onClick={() => setDreamSoftware([...dreamSoftware, { name: "New Tool", imageSrc: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD</button>
                  </div>
                  <div className="space-y-2">
                    {dreamSoftware.map((tool, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input type="text" value={tool.name} onChange={(e) => handleUpdateArrayField(dreamSoftware, setDreamSoftware, idx, 'name', e.target.value)} className="w-1/3 bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs font-mono text-zinc-300" placeholder="Name" />
                        <input type="text" value={tool.imageSrc} onChange={(e) => handleUpdateArrayField(dreamSoftware, setDreamSoftware, idx, 'imageSrc', e.target.value)} className="flex-1 bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs font-mono text-zinc-500" placeholder="Image URL" />
                        <button onClick={() => handleRemoveArrayItem(dreamSoftware, setDreamSoftware, idx)} className="text-zinc-600 hover:text-red-400 p-2 cursor-pointer"><Trash2 size={14}/></button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                    <span className="text-xs font-mono font-bold text-zinc-400 block">Trusted Client Log Grid</span>
                    <button onClick={() => setDreamClients([...dreamClients, { name: "New Client", industry: "", imageSrc: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD</button>
                  </div>
                  <div className="space-y-2">
                    {dreamClients.map((client, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-2 relative pr-6">
                        <button onClick={() => handleRemoveArrayItem(dreamClients, setDreamClients, idx)} className="absolute right-0 top-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                        <input type="text" value={client.name} onChange={(e) => handleUpdateArrayField(dreamClients, setDreamClients, idx, 'name', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white" placeholder="Client Name" />
                        <input type="text" value={client.industry} onChange={(e) => handleUpdateArrayField(dreamClients, setDreamClients, idx, 'industry', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Industry" />
                        <input type="text" value={client.imageSrc} onChange={(e) => handleUpdateArrayField(dreamClients, setDreamClients, idx, 'imageSrc', e.target.value)} className="col-span-2 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-500 font-mono" placeholder="Logo URL Slot" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Client Feedback Testimonials) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Client Feedback Testimonial Submissions</h4>
                  <button onClick={() => setDreamFeedback([...dreamFeedback, { client_name: "", company: "", project_type: "", rating: 5, feedback: "", face_image_url: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD FEEDBACK</button>
                </div>
                <div className="space-y-4">
                  {dreamFeedback.map((review, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-3 relative">
                      <button onClick={() => handleRemoveArrayItem(dreamFeedback, setDreamFeedback, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <input type="text" value={review.client_name} onChange={(e) => handleUpdateArrayField(dreamFeedback, setDreamFeedback, idx, 'client_name', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white" placeholder="Client Name" />
                        <input type="text" value={review.company} onChange={(e) => handleUpdateArrayField(dreamFeedback, setDreamFeedback, idx, 'company', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Job/Company" />
                        <input type="text" value={review.project_type} onChange={(e) => handleUpdateArrayField(dreamFeedback, setDreamFeedback, idx, 'project_type', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Project Type" />
                        <select value={review.rating} onChange={(e) => handleUpdateArrayField(dreamFeedback, setDreamFeedback, idx, 'rating', parseInt(e.target.value))} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-300 outline-none">
                          <option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option><option value="2">2 Stars</option><option value="1">1 Star</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input type="text" value={review.face_image_url} onChange={(e) => handleUpdateArrayField(dreamFeedback, setDreamFeedback, idx, 'face_image_url', e.target.value)} className="sm:col-span-1 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-500" placeholder="Face Image URL" />
                        <input type="text" value={review.feedback} onChange={(e) => handleUpdateArrayField(dreamFeedback, setDreamFeedback, idx, 'feedback', e.target.value)} className="sm:col-span-2 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-300" placeholder="Comment Quote..." />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Project Archive Matrix) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Project Archive Matrix Registries</h4>
                  <button onClick={() => setDreamArchive([...dreamArchive, { category: "Branding & Identity", subtitle: "", title: "", client_name: "", description: "", featured_image_url: "", video_url: "/videos/project.mp4" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD PROJECT</button>
                </div>
                <div className="space-y-4">
                  {dreamArchive.map((project, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-2 relative">
                      <button onClick={() => handleRemoveArrayItem(dreamArchive, setDreamArchive, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <input type="text" value={project.category} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'category', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400 font-bold" placeholder="Category Map" />
                        <input type="text" value={project.subtitle} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'subtitle', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Subtitle Filter" />
                        <input type="text" value={project.title} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'title', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white" placeholder="Project Title" />
                        <input type="text" value={project.client_name} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'client_name', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-500" placeholder="Client Name" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input type="text" value={project.featured_image_url} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'featured_image_url', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-500" placeholder="Featured Image URL" />
                        <input type="text" value={project.video_url} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'video_url', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-500" placeholder="Video Link (.mp4)" />
                        <input type="text" value={project.description} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'description', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Description Meta..." />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: DATA ANALYST ================= */}
          {activeModule === 'Data Analyst' && (
            <div className="space-y-8 text-left">
              {/* Tier 2: Dynamic Items Matrix (Quick Stats counters array) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2"><Database size={14}/> Analytics Matrix Performance Counters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analystStats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 grid grid-cols-4 gap-2 items-end">
                      <div><input type="number" value={stat.value} onChange={(e) => handleUpdateArrayField(analystStats, setAnalystStats, idx, 'value', parseInt(e.target.value) || 0)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white text-center font-mono" /></div>
                      <div><input type="text" value={stat.suffix} onChange={(e) => handleUpdateArrayField(analystStats, setAnalystStats, idx, 'suffix', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white text-center font-mono" /></div>
                      <div className="col-span-2"><input type="text" value={stat.label} onChange={(e) => handleUpdateArrayField(analystStats, setAnalystStats, idx, 'label', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-mono" /></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Extensible Role Track Container) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Extensible Experience Roles Stack</h4>
                  <button onClick={() => setRoles([...analystRoles, { id: Date.now(), statusBadge: "Role Block", title: "", company: "", responsibilities: "", impact: "", logoUrl: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD EXPERIENCE ROLE</button>
                </div>
                {analystRoles.map((role, idx) => (
                  <div key={role.id} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-3 relative">
                    <button onClick={() => handleRemoveArrayItem(analystRoles, setRoles, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pr-6">
                      <input type="text" value={role.statusBadge} onChange={(e) => handleUpdateArrayField(analystRoles, setRoles, idx, 'statusBadge', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-emerald-400" placeholder="Badge (Current Role)" />
                      <input type="text" value={role.title} onChange={(e) => handleUpdateArrayField(analystRoles, setRoles, idx, 'title', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-bold" placeholder="Role Title" />
                      <input type="text" value={role.company} onChange={(e) => handleUpdateArrayField(analystRoles, setRoles, idx, 'company', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-300" placeholder="Company" />
                      <input type="text" value={role.logoUrl} onChange={(e) => handleUpdateArrayField(analystRoles, setRoles, idx, 'logoUrl', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-500" placeholder="Company Logo URL" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">Core Responsibilities (Comma Separated)</label>
                      <textarea value={role.responsibilities} onChange={(e) => handleUpdateArrayField(analystRoles, setRoles, idx, 'responsibilities', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs font-mono text-zinc-400 h-16 resize-none" placeholder="e.g. Data Cleaning, Data Validation, Data Reconciliation" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">Professional Impact (Comma Separated)</label>
                      <textarea value={role.impact} onChange={(e) => handleUpdateArrayField(analystRoles, setRoles, idx, 'impact', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs font-mono text-zinc-400 h-16 resize-none" placeholder="e.g. Support business reporting., Improve data consistency." />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tier 2: Dynamic Items Matrix (Technical Competencies Arrays) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Technical Analytical Competencies</h4>
                  <button onClick={() => setAnalystSkills([...analystSkills, { category: "New Cluster", skills: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD CLUSTER</button>
                </div>
                <div className="space-y-4">
                  {analystSkills.map((section, catIdx) => (
                    <div key={catIdx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/10 space-y-2 relative pr-8">
                      <button onClick={() => handleRemoveArrayItem(analystSkills, setAnalystSkills, catIdx)} className="absolute top-4 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <input type="text" value={section.category} onChange={(e) => handleUpdateArrayField(analystSkills, setAnalystSkills, catIdx, 'category', e.target.value)} className="bg-transparent text-xs font-mono text-white font-bold outline-none border-b border-zinc-800 pb-1 mb-2" placeholder="Cluster Name" />
                      <textarea value={section.skills} onChange={(e) => handleUpdateArrayField(analystSkills, setAnalystSkills, catIdx, 'skills', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-zinc-300 font-mono h-16 resize-none" placeholder="Comma separated skills..." />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (5-Tabbed Showcase Content Fields COMPLETE) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">// Analytics Portfolio Showcase Core (5 Completed Tabs)</h4>
                
                {/* Horizontal internal structural tabs controller view */}
                <div className="flex flex-wrap gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-900">
                  {['dashboards', 'reports', 'automations', 'caseStudies', 'projects'].map((tab) => (
                    <button key={tab} type="button" onClick={() => setActivePortfolioTab(tab)} className={`px-3 py-1.5 text-[11px] font-mono rounded-lg transition-colors cursor-pointer capitalize ${activePortfolioTab === tab ? 'bg-zinc-900 text-white font-bold border border-zinc-800' : 'text-zinc-500 hover:bg-zinc-900/50'}`}>
                      {tab}
                    </button>
                  ))}
                </div>

                {/* SHOWCASE TAB PANEL 1: DASHBOARDS */}
                {activePortfolioTab === 'dashboards' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Dashboards List Module</span><button onClick={() => setPortfolioDashboards([...portfolioDashboards, { id: Date.now(), name: "", purpose: "", industry: "", department: "", description: "", software: "", tech: "", date: "", status: "Deployed", kpis: "", impact: "", thumbnail: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD DASHBOARD</button></div>
                    {portfolioDashboards.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
                        <button onClick={() => handleRemoveArrayItem(portfolioDashboards, setPortfolioDashboards, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pr-6">
                          <input type="text" value={item.name} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'name', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-white" placeholder="Dashboard Name" />
                          <input type="text" value={item.department} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'department', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Department" />
                          <input type="text" value={item.industry} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'industry', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Industry" />
                          <input type="text" value={item.status} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'status', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-500" placeholder="Status (e.g. Deployed)" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input type="text" value={item.purpose} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'purpose', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-300" placeholder="Purpose Statement" />
                          <input type="text" value={item.description} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'description', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-300" placeholder="Full Description" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <input type="text" value={item.software} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'software', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Software" />
                          <input type="text" value={item.tech} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'tech', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Tech / DB" />
                          <input type="text" value={item.kpis} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'kpis', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="KPIs" />
                          <input type="text" value={item.date} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'date', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Date (e.g. Aug 2024)" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input type="text" value={item.impact} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'impact', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-lime-400 font-semibold" placeholder="Business Impact Summary" />
                          <input type="text" value={item.thumbnail} onChange={(e) => handleUpdateArrayField(portfolioDashboards, setPortfolioDashboards, idx, 'thumbnail', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-500 font-mono" placeholder="Thumbnail URL Link Slot" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SHOWCASE TAB PANEL 2: REPORTS */}
                {activePortfolioTab === 'reports' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Reports List Module</span><button onClick={() => setPortfolioReports([...portfolioReports, { id: Date.now(), title: "", context: "", objective: "", audience: "", frequency: "", source: "", format: "", viz: "", findings: "", recommendations: "", impact: "", tools: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD REPORT</button></div>
                    {portfolioReports.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
                        <button onClick={() => handleRemoveArrayItem(portfolioReports, setPortfolioReports, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pr-6">
                          <input type="text" value={item.title} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'title', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-white" placeholder="Report Title" />
                          <input type="text" value={item.objective} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'objective', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Objective" />
                          <input type="text" value={item.frequency} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'frequency', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Frequency (e.g. Quarterly)" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input type="text" value={item.audience} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'audience', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded" placeholder="Audience" />
                          <input type="text" value={item.source} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'source', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded" placeholder="Data Source" />
                          <input type="text" value={item.format} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'format', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded" placeholder="Format" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input type="text" value={item.context} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'context', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Context Background" />
                          <input type="text" value={item.viz} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'viz', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Visualizations Used" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input type="text" value={item.findings} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'findings', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-emerald-400" placeholder="Key Findings" />
                          <input type="text" value={item.recommendations} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'recommendations', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-emerald-400" placeholder="Recommendations" />
                          <input type="text" value={item.impact} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'impact', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-lime-400" placeholder="Impact" />
                        </div>
                        <input type="text" value={item.tools} onChange={(e) => handleUpdateArrayField(portfolioReports, setPortfolioReports, idx, 'tools', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-500" placeholder="Tools (Excel, Power Query)" />
                      </div>
                    ))}
                  </div>
                )}

                {/* SHOWCASE TAB PANEL 3: AUTOMATIONS */}
                {activePortfolioTab === 'automations' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Automations List Module</span><button onClick={() => setPortfolioAutomations([...portfolioAutomations, { id: Date.now(), name: "", problem: "", currentProcess: "", painPoints: "", objectives: "", steps: "", tech: "", ai: "", timeSaved: "", errorReduction: "", productivity: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD AUTOMATION</button></div>
                    {portfolioAutomations.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
                        <button onClick={() => handleRemoveArrayItem(portfolioAutomations, setPortfolioAutomations, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pr-6">
                          <input type="text" value={item.name} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'name', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-white" placeholder="Automation System Name" />
                          <input type="text" value={item.problem} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'problem', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Core Problem Statement" />
                          <input type="text" value={item.objectives} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'objectives', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Objectives" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input type="text" value={item.currentProcess} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'currentProcess', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-rose-400" placeholder="Before (Current Process)" />
                          <input type="text" value={item.steps} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'steps', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-emerald-400" placeholder="After (Steps)" />
                          <input type="text" value={item.painPoints} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'painPoints', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-rose-400" placeholder="Pain Points" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          <input type="text" value={item.timeSaved} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'timeSaved', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-lime-400" placeholder="Time Saved" />
                          <input type="text" value={item.productivity} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'productivity', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-lime-400" placeholder="Productivity" />
                          <input type="text" value={item.errorReduction} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'errorReduction', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-lime-400" placeholder="Error Reduction" />
                          <input type="text" value={item.tech} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'tech', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Tech Used" />
                          <input type="text" value={item.ai} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'ai', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-purple-400" placeholder="AI Used" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SHOWCASE TAB PANEL 4: CASE STUDIES */}
                {activePortfolioTab === 'caseStudies' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Case Studies Module</span><button onClick={() => setPortfolioCaseStudies([...portfolioCaseStudies, { id: Date.now(), problem: "", background: "", objectives: "", collection: "", cleaning: "", analysis: "", visualization: "", insights: "", recommendations: "", impact: "", lessons: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD CASE STUDY</button></div>
                    {portfolioCaseStudies.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
                        <button onClick={() => handleRemoveArrayItem(portfolioCaseStudies, setPortfolioCaseStudies, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-6">
                          <input type="text" value={item.problem} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'problem', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-white" placeholder="Core Problem Context" />
                          <input type="text" value={item.background} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'background', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Background" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <input type="text" value={item.objectives} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'objectives', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Objectives" />
                          <input type="text" value={item.collection} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'collection', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Data Collection" />
                          <input type="text" value={item.cleaning} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'cleaning', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Data Cleaning" />
                          <input type="text" value={item.analysis} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'analysis', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Analysis Done" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          <input type="text" value={item.visualization} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'visualization', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Visualization" />
                          <input type="text" value={item.insights} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'insights', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-lime-400" placeholder="Insights" />
                          <input type="text" value={item.recommendations} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'recommendations', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-emerald-400" placeholder="Recommendations" />
                          <input type="text" value={item.impact} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'impact', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-emerald-400" placeholder="Business Impact" />
                          <input type="text" value={item.lessons} onChange={(e) => handleUpdateArrayField(portfolioCaseStudies, setPortfolioCaseStudies, idx, 'lessons', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-500" placeholder="Lessons Learned" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SHOWCASE TAB PANEL 5: PROJECTS */}
                {activePortfolioTab === 'projects' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Intern Projects Module</span><button onClick={() => setPortfolioProjects([...portfolioProjects, { id: Date.now(), name: "", industry: "", overview: "", problem: "", objectives: "", tools: "", tech: "", role: "", challenges: "", solution: "", results: "", status: "Completed" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD PROJECT</button></div>
                    {portfolioProjects.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
                        <button onClick={() => handleRemoveArrayItem(portfolioProjects, setPortfolioProjects, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pr-6">
                          <input type="text" value={item.name} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'name', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-white" placeholder="Project Name" />
                          <input type="text" value={item.industry} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'industry', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Industry Layer" />
                          <input type="text" value={item.role} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'role', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Role" />
                          <input type="text" value={item.status} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'status', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-500" placeholder="Execution Status" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input type="text" value={item.overview} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'overview', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Overview" />
                          <input type="text" value={item.problem} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'problem', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Problem" />
                          <input type="text" value={item.objectives} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'objectives', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Objectives" />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          <input type="text" value={item.tools} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'tools', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Tools Used" />
                          <input type="text" value={item.tech} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'tech', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Tech Modeling" />
                          <input type="text" value={item.challenges} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'challenges', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-rose-400" placeholder="Challenges" />
                          <input type="text" value={item.solution} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'solution', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-emerald-400" placeholder="Solution" />
                          <input type="text" value={item.results} onChange={(e) => handleUpdateArrayField(portfolioProjects, setPortfolioProjects, idx, 'results', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-lime-400" placeholder="Results" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tier 2: Dynamic Items Matrix (Software Ecosystem Matrix with Logos) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Software Ecosystem Registry</h4>
                  <button onClick={() => setAnalystEcosystem([...analystEcosystem, { category: "New Stream", tools: [{ name: "New Tool", imageSrc: "" }] }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD CATEGORY</button>
                </div>
                {analystEcosystem.map((cat, catIdx) => (
                  <div key={catIdx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/10 space-y-2 relative pr-8">
                    <button onClick={() => handleRemoveArrayItem(analystEcosystem, setAnalystEcosystem, catIdx)} className="absolute top-4 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-1 mb-2">
                      <input type="text" value={cat.category} onChange={(e) => handleUpdateArrayField(analystEcosystem, setAnalystEcosystem, catIdx, 'category', e.target.value)} className="bg-transparent text-xs font-mono font-bold text-emerald-400 outline-none" placeholder="Category Name" />
                      <button onClick={() => {
                        const updated = [...analystEcosystem];
                        updated[catIdx].tools.push({ name: "Linked Tool", imageSrc: "" });
                        setAnalystEcosystem(updated);
                      }} className="text-[9px] font-mono text-zinc-500 hover:text-white cursor-pointer">+ ADD TOOL</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.tools?.map((tool, tIdx) => (
                        <div key={tIdx} className="grid grid-cols-2 gap-1 bg-zinc-950 p-1.5 rounded-lg border border-zinc-900">
                          <input type="text" value={tool.name} onChange={(e) => {
                            const updated = [...analystEcosystem];
                            updated[catIdx].tools[tIdx].name = e.target.value;
                            setAnalystEcosystem(updated);
                          }} className="bg-transparent text-xs text-white outline-none" placeholder="Tool Name" />
                          <input type="text" value={tool.imageSrc} onChange={(e) => {
                            const updated = [...analystEcosystem];
                            updated[catIdx].tools[tIdx].imageSrc = e.target.value;
                            setAnalystEcosystem(updated);
                          }} className="bg-transparent text-xs text-zinc-600 font-mono outline-none" placeholder="Logo Image URL" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tier 2: Dynamic Items Matrix (Future Roadmap badges) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Future Strategic Analytics Roadmap Array</h4>
                  <button onClick={() => setAnalystRoadmap([...analystRoadmap, "New Item"])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD ITEM</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {analystRoadmap.map((item, idx) => (
                    <div key={idx} className="relative flex items-center">
                      <input type="text" value={item} onChange={(e) => {
                        const copy = [...analystRoadmap];
                        copy[idx] = e.target.value;
                        setAnalystRoadmap(copy);
                      }} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg pl-2 pr-6 py-1.5 text-xs text-center font-mono text-zinc-300 focus:outline-none" />
                      <button onClick={() => {
                        const copy = analystRoadmap.filter((_, i) => i !== idx);
                        setAnalystRoadmap(copy);
                      }} className="absolute right-1 text-zinc-600 hover:text-red-400 cursor-pointer p-1"><Trash2 size={12}/></button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= WORKSPACE PANEL: AI DEVELOPER ================= */}
          {activeModule === 'AI Developer' && (
            <div className="space-y-8 text-left">
              {/* Tier 2: Dynamic Items Matrix (Developer Stats) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2"><BrainCircuit size={14}/> Engineering Metrics Counters</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {aiStats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 text-center space-y-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">{stat.label}</span>
                      <input type="number" value={stat.value} onChange={(e) => handleUpdateArrayField(aiStats, setAiStats, idx, 'value', parseInt(e.target.value) || 0)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-center text-white w-20 font-mono mx-auto" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Journey Timeline) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Development Chronology Flow</h4>
                  <button onClick={() => setAiTimeline([...aiTimeline, { year: "", desc: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD TIMELINE NODE</button>
                </div>
                <div className="space-y-2">
                  {aiTimeline.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-zinc-900 bg-zinc-950/20 flex gap-4 items-center relative pr-8">
                      <button onClick={() => handleRemoveArrayItem(aiTimeline, setAiTimeline, idx)} className="absolute right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <input type="text" value={item.year} onChange={(e) => handleUpdateArrayField(aiTimeline, setAiTimeline, idx, 'year', e.target.value)} className="w-24 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-center text-white font-mono" placeholder="Year" />
                      <input type="text" value={item.desc} onChange={(e) => handleUpdateArrayField(aiTimeline, setAiTimeline, idx, 'desc', e.target.value)} className="flex-1 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-300 font-mono" placeholder="Description Node" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Current AI Ecosystem) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Current AI Ecosystem Partners</h4>
                  <button onClick={() => setAiEcosystemState([...aiEcosystemState, { name: "New Engine", role: "", imageSrc: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD AI MODEL</button>
                </div>
                <div className="space-y-3">
                  {aiEcosystemState.map((ai, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 relative grid grid-cols-1 sm:grid-cols-3 gap-2 pr-8">
                      <button onClick={() => handleRemoveArrayItem(aiEcosystemState, setAiEcosystemState, idx)} className="absolute top-4 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <input type="text" value={ai.name} onChange={(e) => handleUpdateArrayField(aiEcosystemState, setAiEcosystemState, idx, 'name', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-bold" placeholder="AI Platform Model" />
                      <input type="text" value={ai.imageSrc} onChange={(e) => handleUpdateArrayField(aiEcosystemState, setAiEcosystemState, idx, 'imageSrc', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-500" placeholder="Icon Image URL Slot" />
                      <input type="text" value={ai.role} onChange={(e) => handleUpdateArrayField(aiEcosystemState, setAiEcosystemState, idx, 'role', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400 sm:col-span-3" placeholder="Assigned Workflow Role..." />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Development Architecture with Logos) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Development Architecture Stack Matrix</h4>
                  <button onClick={() => setAiArchitecture([...aiArchitecture, { category: "Infrastructure Track", items: [{ name: "Service Node", imageSrc: "" }] }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD STACK LAYER</button>
                </div>
                {aiArchitecture.map((stack, catIdx) => (
                  <div key={catIdx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/10 space-y-2 relative pr-8">
                    <button onClick={() => handleRemoveArrayItem(aiArchitecture, setAiArchitecture, catIdx)} className="absolute top-4 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-1 mb-2">
                      <input type="text" value={stack.category} onChange={(e) => handleUpdateArrayField(aiArchitecture, setAiArchitecture, catIdx, 'category', e.target.value)} className="bg-transparent text-xs font-mono font-bold text-cyan-400 outline-none" placeholder="Category" />
                      <button onClick={() => {
                        const updated = [...aiArchitecture];
                        updated[catIdx].items.push({ name: "Linked Item", imageSrc: "" });
                        setAiArchitecture(updated);
                      }} className="text-[9px] font-mono text-zinc-500 hover:text-white cursor-pointer">+ ADD LAYER ITEM</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stack.items?.map((tool, tIdx) => (
                        <div key={tIdx} className="grid grid-cols-2 gap-1 bg-zinc-950 p-1.5 rounded-lg border border-zinc-900">
                          <input type="text" value={tool.name} onChange={(e) => {
                            const updated = [...aiArchitecture];
                            updated[catIdx].items[tIdx].name = e.target.value;
                            setAiArchitecture(updated);
                          }} className="bg-transparent text-xs text-white outline-none" placeholder="Item Name" />
                          <input type="text" value={tool.imageSrc} onChange={(e) => {
                            const updated = [...aiArchitecture];
                            updated[catIdx].items[tIdx].imageSrc = e.target.value;
                            setAiArchitecture(updated);
                          }} className="bg-transparent text-xs text-zinc-600 font-mono outline-none" placeholder="Logo Asset URL" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tier 2: Dynamic Items Matrix (Engineering Showcase - Portfolio with Tech list) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Flagship Engineering Showcase Projects Matrix</h4>
                  <button onClick={() => setAiShowcase([...aiShowcase, { id: Date.now(), type: "flagship", badge: "In Progress", meta: "New Project", title: "", desc: "", tech: "", role: "", actionText: "Inspect Source", link: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD PROJECT</button>
                </div>
                <div className="space-y-4">
                  {aiShowcase.map((project, idx) => (
                    <div key={project.id} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-2 relative pr-8">
                      <button onClick={() => handleRemoveArrayItem(aiShowcase, setAiShowcase, idx)} className="absolute top-4 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <select value={project.type} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'type', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-[10px] font-mono text-zinc-400 cursor-pointer outline-none mb-2">
                        <option value="flagship">Flagship Project Type</option>
                        <option value="pipeline">Pipeline / Future Type</option>
                      </select>

                      {project.type === 'flagship' ? (
                        <>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <input type="text" value={project.badge} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'badge', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-cyan-400" placeholder="Badge (e.g. In Progress)" />
                            <input type="text" value={project.meta} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'meta', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Meta Subtitle" />
                            <input type="text" value={project.title} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'title', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-bold" placeholder="Project Title" />
                            <input type="text" value={project.role} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'role', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Role Assigned" />
                          </div>
                          <textarea value={project.desc} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'desc', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs font-mono text-zinc-300 h-16 resize-none" placeholder="Project Description Narrative..." />
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input type="text" value={project.tech} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'tech', e.target.value)} className="sm:col-span-2 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-400" placeholder="Technologies Managed (Comma separated)" />
                            <input type="text" value={project.actionText} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'actionText', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-cyan-400" placeholder="Button Text (e.g. Inspect Source)" />
                          </div>
                        </>
                      ) : (
                        <>
                          <input type="text" value={project.title} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'title', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-bold" placeholder="Pipeline Title" />
                          <textarea value={project.desc} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'desc', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs font-mono text-zinc-300 h-16 resize-none" placeholder="Pipeline Description..." />
                          <input type="text" value={project.status} onChange={(e) => handleUpdateArrayField(aiShowcase, setAiShowcase, idx, 'status', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-[10px] font-mono text-purple-400" placeholder="Status (e.g. STATUS: WAITING_ON_DEPS)" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier 1: Static Attributes Card (GitHub Profile Meta Card) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2"><ExternalLink size={14}/> Attached GitHub Sync Panel Context</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Profile Custom Identity Name</label>
                    <input type="text" value={aiGithub.name} onChange={(e) => setAiGithub({...aiGithub, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-white font-mono" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">System Target Handle Username</label>
                    <input type="text" value={aiGithub.username} onChange={(e) => setAiGithub({...aiGithub, username: e.target.value})} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-white font-mono" />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Target Redirect Profile URL</label>
                    <input type="text" value={aiGithub.profileUrl} onChange={(e) => setAiGithub({...aiGithub, profileUrl: e.target.value})} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-white font-mono" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: CONTACT LINKS ================= */}
          {activeModule === 'Contact Links' && (
            <div className="space-y-8 text-left">
              {/* Tier 1: Static Attributes Card */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2"><FileText size={14}/> Verified Materials Download Registry</h4>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase">Professional PDF Resume Download URL Link</label>
                    <input type="text" value={contactResumeUrl} onChange={(e) => setContactResumeUrl(e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase">Dynamic Portfolio Archive PDF Download URL Link</label>
                    <input type="text" value={contactPortfolioUrl} onChange={(e) => setContactPortfolioUrl(e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none" />
                  </div>
                </div>
              </div>

              {/* Tier 2: Dynamic Items Matrix (Social Accounts Grid table) */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Social Networking Directory Registry</h4>
                  <button onClick={() => setContactPlatforms([...contactPlatforms, { id: "new", name: "New Link", username: "", link: "", status: "active" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD LINK</button>
                </div>
                <div className="space-y-3">
                  {contactPlatforms.map((platform, idx) => (
                    <div key={platform.id} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center relative pr-8">
                      <button onClick={() => handleRemoveArrayItem(contactPlatforms, setContactPlatforms, idx)} className="absolute right-3 top-4 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <span className="text-xs font-mono font-bold text-white uppercase">{platform.name} Link Account</span>
                      <input type="text" value={platform.username} onChange={(e) => handleUpdateArrayField(contactPlatforms, setContactPlatforms, idx, 'username', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-300 font-mono" placeholder="Display Handle" />
                      <input type="text" value={platform.link} onChange={(e) => handleUpdateArrayField(contactPlatforms, setContactPlatforms, idx, 'link', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-500 font-mono" placeholder="Target Endpoint Account Link" />
                      <select value={platform.status} onChange={(e) => handleUpdateArrayField(contactPlatforms, setContactPlatforms, idx, 'status', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-400 appearance-none text-center cursor-pointer">
                        <option value="active">Active Channel</option>
                        <option value="future">Future Allocation</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: MESSAGES INBOX ================= */}
          {activeModule === 'Messages Inbox' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">// Incoming Live Inquiries Transmissions Inbox</h3>
                <p className="text-xs text-zinc-500 font-mono">Live logs capturing public form inputs directly from the endpoint user interfaces.</p>
              </div>
              <div className="rounded-2xl border border-zinc-900 overflow-hidden text-xs font-mono">
                <div className="bg-zinc-900/50 p-3 font-bold text-zinc-500 border-b border-zinc-900 grid grid-cols-4">
                  <span>Sender Information</span><span>Subject Inquiry</span><span>Message context Log</span><span className="text-center">Pipeline Actions</span>
                </div>
                <div className="divide-y divide-zinc-900 bg-zinc-950/10">
                  {messagesLog.map((msg, idx) => (
                    <div key={msg.id} className="p-4 grid grid-cols-4 gap-2 items-start relative hover:bg-zinc-900/10 transition-colors">
                      <div>
                        <div className="text-white font-bold">{msg.sender_name}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">{msg.sender_email}</div>
                        {msg.company && <div className="text-[10px] text-cyan-400 uppercase mt-1 tracking-wide">{msg.company}</div>}
                      </div>
                      <div className="text-zinc-300">
                        <div className="font-bold text-zinc-200">{msg.subject}</div>
                        <span className="inline-block px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-400 mt-1.5">{msg.service_interested}</span>
                      </div>
                      <div className="text-zinc-500 text-[11px] leading-relaxed whitespace-pre-wrap">{msg.message}</div>
                      <div className="text-center flex flex-col items-center justify-center gap-2">
                        <span className="inline-block px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider">{msg.status}</span>
                        <button onClick={() => handleRemoveArrayItem(messagesLog, setMessagesLog, idx)} className="text-[10px] text-red-400/70 hover:text-red-400 border border-zinc-900 bg-zinc-950/40 px-2 py-0.5 rounded cursor-pointer">Archive Log</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}