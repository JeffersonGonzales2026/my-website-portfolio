// src/pages/AdminDashboard.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, Activity, Palette, Database, BrainCircuit, 
  Mail, LogOut, Save, Plus, Trash2, Image, ExternalLink, 
  Sliders, Layers, Eye, CheckCircle, FileText, User, HelpCircle, 
  Briefcase, Star, Cpu, Settings, UploadCloud, File, Image as ImageIcon, Menu, X, Loader2
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

// =========================================================================
// CENTRALIZED CATEGORY DATA PARA SA DROPDOWNS
// =========================================================================
const creationsCategories = [
  { id: 1, category: "Branding & Identity", items: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Refresh", "Brand Assets", "Business Identity Systems"] },
  { id: 2, category: "Graphic Design", items: ["Marketing Graphics", "Corporate Graphics", "Advertising Materials", "Print Design", "Creative Campaigns", "Promotional Graphics"] },
  { id: 3, category: "Social Media Design", items: ["Facebook Graphics", "Instagram Posts", "Carousel Posts", "Story Designs", "LinkedIn Graphics", "Social Media Campaigns", "Cover Photos", "Profile Branding"] },
  { id: 4, category: "Marketing Materials", items: ["Flyers", "Brochures", "Company Profiles", "Catalogs", "Product Sheets", "Sales Kits", "Business Presentations"] },
  { id: 5, category: "Motion Graphics", items: ["Animated Ads", "Product Promotions", "Marketing Videos", "Social Media Motion Graphics", "Explainer Videos", "Logo Animation", "Video Thumbnails"] },
  { id: 6, category: "Web Graphics", items: ["Website Banners", "Landing Page Graphics", "Icons", "UI Graphics", "Email Graphics", "WordPress Assets"] },
  { id: 7, category: "Photo Editing", items: ["Photo Retouching", "Photo Restoration", "Watercolor Portraits", "Background Removal", "Image Manipulation", "Color Correction", "Composite Editing"] },
  { id: 8, category: "Apparel Design", items: ["Shirt Designs", "Streetwear Graphics", "Mockups", "Print-ready Artwork"] },
  { id: 9, category: "Print Production", items: ["Tarpaulins", "Calling Cards", "Invitations", "Souvenirs", "ID Cards", "Certificates", "Book Covers", "Menu Cards"] },
  { id: 10, category: "Packaging", items: ["Packaging Graphics", "Clothing Labels", "Product Labels"] },
  { id: 11, category: "Illustration", items: ["Vector Artwork", "Cartoon Portraits", "Character Illustration", "Icon Design", "Seamless Patterns", "Digital Illustration"] }
];

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState('Dashboard Hub');
  const [activePortfolioTab, setActivePortfolioTab] = useState('dashboards');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const initializeAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const ADMIN_EMAIL = "jeffersonguzmangonzales03@gmail.com"; 

      if (!session || session.user.email !== ADMIN_EMAIL) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      await loadCloudData();
      setIsLoading(false);
    };
    initializeAdmin();
  }, [navigate]);

  const [homeHeroPhoto, setHomeHeroPhoto] = useState("/images/profile.jpg");
  const [homeStats, setHomeStats] = useState([]);
  const [homeSkills, setHomeSkills] = useState([]);
  const [homeTimeline, setHomeTimeline] = useState([]);

  const [dreamBanner, setDreamBanner] = useState("/Logo Banner.png");
  const [dreamFounderPhoto, setDreamFounderPhoto] = useState("/images/jefferson.jpg");
  const [dreamFounderExp, setDreamFounderExp] = useState(10);
  const [dreamFounderProjects, setDreamFounderProjects] = useState(200);
  const [dreamTeam, setDreamTeam] = useState([]);
  const [dreamSoftware, setDreamSoftware] = useState([]);
  const [dreamClients, setDreamClients] = useState([]);
  const [dreamFeedback, setDreamFeedback] = useState([]);
  const [dreamArchive, setDreamArchive] = useState([]);

  const [analystStats, setAnalystStats] = useState([]);
  const [analystRoles, setRoles] = useState([]);
  const [analystSkills, setAnalystSkills] = useState([]);
  const [analystEcosystem, setAnalystEcosystem] = useState([]);
  const [analystRoadmap, setAnalystRoadmap] = useState([]);
  const [portfolioDashboards, setPortfolioDashboards] = useState([]);
  const [portfolioReports, setPortfolioReports] = useState([]);
  const [portfolioAutomations, setPortfolioAutomations] = useState([]);
  const [portfolioCaseStudies, setPortfolioCaseStudies] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);

  const [aiStats, setAiStats] = useState([]);
  const [aiTimeline, setAiTimeline] = useState([]);
  const [aiEcosystemState, setAiEcosystemState] = useState([]);
  const [aiArchitecture, setAiArchitecture] = useState([]);
  const [aiShowcase, setAiShowcase] = useState([]);
  const [aiGithub, setAiGithub] = useState({});

  const [dynamicResumes, setDynamicResumes] = useState([]); 
  const [contactPortfolioUrl, setContactPortfolioUrl] = useState("");
  const [contactPlatforms, setContactPlatforms] = useState([]);
  const [messagesLog, setMessagesLog] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);

  const loadCloudData = async () => {
    try {
      const { data: home } = await supabase.from('home_engine').select('*').single();
      if (home) {
        setHomeHeroPhoto(home.hero_photo || "");
        setHomeStats(home.quick_stats || []);
        setHomeSkills(home.core_skills || []);
        setHomeTimeline(home.career_timeline || []);
      }

      const { data: dream } = await supabase.from('dream_creations').select('*').single();
      if (dream) {
        setDreamBanner(dream.banner_url || "");
        setDreamFounderPhoto(dream.founder_photo || "");
        setDreamFounderExp(dream.founder_experience || 0);
        setDreamFounderProjects(dream.founder_projects || 0);
        setDreamTeam(dream.team_roster || []);
        setDreamSoftware(dream.software_stack || []);
        setDreamClients(dream.trusted_clients || []);
      }

      const { data: analyst } = await supabase.from('data_analyst').select('*').single();
      if (analyst) {
        setAnalystStats(analyst.performance_counters || []);
        setRoles(analyst.experience_roles || []);
        setAnalystSkills(analyst.technical_competencies || []);
        setAnalystEcosystem(analyst.software_ecosystem || []);
        setAnalystRoadmap(analyst.future_roadmap || []);
        setPortfolioDashboards(analyst.portfolio_dashboards || []);
        setPortfolioReports(analyst.portfolio_reports || []);
        setPortfolioAutomations(analyst.portfolio_automations || []);
        setPortfolioCaseStudies(analyst.portfolio_case_studies || []);
        setPortfolioProjects(analyst.portfolio_projects || []);
      }

      const { data: aiDev } = await supabase.from('ai_developer').select('*').single();
      if (aiDev) {
        setAiStats(aiDev.metrics_counters || []);
        setAiTimeline(aiDev.development_timeline || []);
        setAiEcosystemState(aiDev.ai_partners || []);
        setAiArchitecture(aiDev.architecture_stack || []);
        setAiShowcase(aiDev.engineering_showcase || []);
        setAiGithub(aiDev.github_sync || {});
      }

      const { data: contact } = await supabase.from('contact_settings').select('*').single();
      if (contact) {
        setContactPortfolioUrl(contact.portfolio_url || "");
      }

      const { data: platforms } = await supabase.from('contact_platforms').select('*').order('display_order');
      if (platforms) setContactPlatforms(platforms);

      const { data: resumes } = await supabase.from('portfolio_resumes').select('*').order('id', {ascending: true});
      if (resumes) setDynamicResumes(resumes);

      const { data: reviews } = await supabase.from('client_reviews').select('*').order('created_at', {ascending: false});
      if (reviews) setDreamFeedback(reviews);

      const { data: archives } = await supabase.from('portfolio_projects').select('*').order('created_at', {ascending: false});
      if (archives) setDreamArchive(archives);

      const { data: messages } = await supabase.from('contact_messages').select('*').order('created_at', {ascending: false});
      if (messages) setMessagesLog(messages);

      const { data: media } = await supabase.from('media_library').select('*').order('created_at', {ascending: false});
      if (media) setMediaFiles(media);

    } catch (error) {
      console.error("Initialization Sync Error:", error);
    }
  };

  const handleSaveModule = async () => {
    setIsSaving(true);
    try {
      if (activeModule === 'Home Engine') {
        await supabase.from('home_engine').update({ hero_photo: homeHeroPhoto, quick_stats: homeStats, core_skills: homeSkills, career_timeline: homeTimeline }).eq('id', 1);
      
      } else if (activeModule === 'Dream Creations') {
        await supabase.from('dream_creations').update({ banner_url: dreamBanner, founder_photo: dreamFounderPhoto, founder_experience: dreamFounderExp, founder_projects: dreamFounderProjects, team_roster: dreamTeam, software_stack: dreamSoftware, trusted_clients: dreamClients }).eq('id', 1);

        await supabase.from('client_reviews').delete().neq('client_name', 'XYZ_CLEAN_ALL_ROWS_DIRECT');
        if (dreamFeedback.length > 0) {
          const cleanReviews = dreamFeedback.map(r => ({
            client_name: r.client_name || "",
            company: r.company || "",
            project_type: r.project_type || "",
            rating: r.rating || 5,
            feedback: r.feedback || "",
            face_image_url: r.face_image_url || ""
          }));
          await supabase.from('client_reviews').insert(cleanReviews);
        }

        await supabase.from('portfolio_projects').delete().neq('title', 'XYZ_CLEAN_ALL_ROWS_DIRECT');
        if (dreamArchive.length > 0) {
          const cleanArchives = dreamArchive.map(p => ({
            category: p.category || "",
            subtitle: p.subtitle || "",
            title: p.title || "",
            client_name: p.client_name || "",
            description: p.description || "",
            featured_image_url: p.featured_image_url || "",
            video_url: p.video_url || ""
          }));
          const { error: archiveError } = await supabase.from('portfolio_projects').insert(cleanArchives);
          if (archiveError) throw archiveError;
        }

      } else if (activeModule === 'Data Analyst') {
        await supabase.from('data_analyst').update({ performance_counters: analystStats, experience_roles: analystRoles, technical_competencies: analystSkills, software_ecosystem: analystEcosystem, future_roadmap: analystRoadmap, portfolio_dashboards: portfolioDashboards, portfolio_reports: portfolioReports, portfolio_automations: portfolioAutomations, portfolio_case_studies: portfolioCaseStudies, portfolio_projects: portfolioProjects }).eq('id', 1);
      
      } else if (activeModule === 'AI Developer') {
        await supabase.from('ai_developer').update({ metrics_counters: aiStats, development_timeline: aiTimeline, ai_partners: aiEcosystemState, architecture_stack: aiArchitecture, engineering_showcase: aiShowcase, github_sync: aiGithub }).eq('id', 1);
      
      } else if (activeModule === 'Contact Links') {
        await supabase.from('contact_settings').update({ portfolio_url: contactPortfolioUrl }).eq('id', 1);

        await supabase.from('portfolio_resumes').delete().neq('title', 'XYZ_CLEAN_ALL_ROWS_DIRECT');
        if (dynamicResumes.length > 0) {
          const cleanResumes = dynamicResumes.map(r => ({ title: r.title || "", file_url: r.file_url || "" }));
          await supabase.from('portfolio_resumes').insert(cleanResumes);
        }

        await supabase.from('contact_platforms').delete().neq('name', 'XYZ_CLEAN_ALL_ROWS_DIRECT');
        if (contactPlatforms.length > 0) {
          const cleanPlatforms = contactPlatforms.map((p, i) => ({
            name: p.name || "",
            username: p.username || "",
            link: p.link || "",
            status: p.status || "active",
            display_order: i
          }));
          await supabase.from('contact_platforms').insert(cleanPlatforms);
        }
      }
      
      alert(`SUCCESS: Transmitted "${activeModule}" updates to Supabase Database.`);
    } catch (error) {
      console.error("Save Execution Error:", error);
      alert(`ERROR: Supabase rejected the save. Details: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchiveMessage = async (id, idx) => {
    if(!id) return;
    try {
      await supabase.from('contact_messages').delete().eq('id', id);
      const copy = [...messagesLog];
      copy.splice(idx, 1);
      setMessagesLog(copy);
    } catch(err) { console.error("Message Archive Error", err); }
  };

  const handleDeleteMedia = async (id, idx) => {
    if(!id) return;
    try {
      await supabase.from('media_library').delete().eq('id', id);
      const copy = [...mediaFiles];
      copy.splice(idx, 1);
      setMediaFiles(copy);
    } catch(err) { console.error("Media Deletion Error", err); }
  };

  const handleFileUploadLive = async (e) => {
    const files = Array.from(e.target.files);
    if(files.length === 0) return;
    
    alert(`🚀 Initializing bulk deployment pipeline for ${files.length} asset(s)...`);
    
    const uploadedRecords = [];
    let successCounter = 0;
    let failureCounter = 0;

    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        
        // AUTO-CLEANER: Tatanggalin ang spaces at gagawing lowercase ang pangalan ng file para iwas 404 Not Found error
        const cleanName = file.name.replace(/\s+/g, '').toLowerCase();
        
        const isBookPage = /-\d+\.\w+$/.test(cleanName);
        const fileName = isBookPage 
          ? cleanName 
          : `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage.from('portfolio_media').upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('portfolio_media').getPublicUrl(fileName);

        const { data: dbData, error: dbError } = await supabase.from('media_library')
          .insert([{ file_name: cleanName, file_url: publicUrl, type: file.type.includes('image') ? 'image' : 'document' }])
          .select().single();

        if (dbError) throw dbError;

        uploadedRecords.push(dbData);
        successCounter++;
      } catch(err) {
        console.error(`Asset compilation abort block inside: ${file.name}`, err);
        failureCounter++;
      }
    }

    if (uploadedRecords.length > 0) {
      setMediaFiles(prev => [...uploadedRecords, ...prev]);
    }
    
    alert(`🟢 ASSET TRANSACTION STACK PROCESSED!\nSuccessful Migrations: ${successCounter}\nFailed: ${failureCounter}`);
  };

  const handleUpdateArrayField = (state, setState, index, field, value) => {
    const copy = [...state];
    copy[index][field] = value;
    setState(copy);
  };

  const handleRemoveArrayItem = (state, setState, index) => {
    setState(state.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-[#09090b] text-cyan-400 font-mono text-sm gap-2"><Loader2 className="animate-spin" size={16}/> ESTABLISHING SECURE CONNECTION...</div>;
  }

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-200 overflow-hidden font-sans antialiased">
      
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#09090b] border-r border-zinc-900 flex flex-col justify-between transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-4 md:hidden text-zinc-500 hover:text-white"><X size={20} /></button>
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-wider font-mono font-bold transition-all border text-left cursor-pointer ${activeModule === module.name ? 'bg-zinc-900 text-white border-zinc-800 shadow-md' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30 border-transparent'}`}
              >
                {module.icon} {module.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-zinc-900">
          <button onClick={async () => { await supabase.auth.signOut(); navigate('/admin/login'); }} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-950 border border-zinc-900 text-xs font-mono font-bold text-red-400 hover:bg-red-500/5 hover:border-red-500/20 transition-all cursor-pointer">
            <LogOut size={14} /> SIGN OUT CORE
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[#09090b]">
        <header className="h-16 flex-shrink-0 border-b border-zinc-900 flex items-center justify-between px-4 md:px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white cursor-pointer"><Menu size={20} /></button>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-zinc-400">
              <Sliders size={14} className="text-zinc-500 hidden sm:block" />
              <span className="hidden sm:block">Active Frame:</span>
              <span className="text-white bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 font-mono font-bold truncate max-w-[140px] sm:max-w-none">{activeModule}</span>
            </div>
          </div>
          
          <button onClick={handleSaveModule} disabled={isSaving || activeModule === 'Dashboard Hub' || activeModule === 'Messages Inbox' || activeModule === 'Media Library'} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white text-black text-[10px] sm:text-xs font-mono font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {isSaving ? <Loader2 size={14} className="animate-spin hidden sm:block" /> : <Save size={14} className="hidden sm:block" />}
            {isSaving ? 'SYNCING CLOUD...' : 'SAVE MODULE'}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 max-w-5xl w-full mx-auto space-y-8 pb-32">
          
          {/* ... [DASHBOARD HUB, MEDIA LIBRARY, HOME ENGINE PANELS REMAIN UNCHANGED FOR BREVITY] ... */}
          {activeModule === 'Dashboard Hub' && (
            <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/20 text-left space-y-4 max-w-xl">
              <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">// System Interface Diagnostics Ready</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Welcome to your Three-Tier administrative dashboard configuration environment. Select any channel stream from the left drawer menu to modify or append data objects live.
              </p>
            </div>
          )}

          {activeModule === 'Media Library' && (
            <div className="space-y-8 text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-950/40 border border-zinc-900">
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Raw Media Storage</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 font-mono">Upload images/documents to copy URLs into your dynamic fields.</p>
                </div>
                <div className="relative">
                  <input type="file" multiple onChange={handleFileUploadLive} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,application/pdf,video/mp4,.xlsx,.xls,.csv" />
                  <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md">
                    <UploadCloud size={14} /> RAW UPLOAD
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaFiles.map((file, idx) => (
                  <div key={file.id || idx} className="group relative rounded-xl bg-zinc-950 border border-zinc-900 overflow-hidden aspect-square flex flex-col items-center justify-center hover:border-blue-500/50 transition-colors">
                    {file.type === 'image' ? <img src={file.file_url} alt="media" className="w-full h-full object-cover" /> : <File size={32} className="text-zinc-600" />}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-[10px] text-white truncate w-full mb-3 font-mono">{file.file_name}</p>
                      <div className="flex gap-2">
                        <button onClick={() => { navigator.clipboard.writeText(file.file_url); alert('URL Copied to clipboard!'); }} className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-mono font-bold cursor-pointer">Copy</button>
                        <button onClick={() => handleDeleteMedia(file.id, idx)} className="px-3 py-1.5 rounded-lg bg-red-900/50 hover:bg-red-900 text-white text-[10px] font-mono font-bold cursor-pointer"><Trash2 size={12}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: DREAM CREATIONS ================= */}
          {activeModule === 'Dream Creations' && (
            <div className="space-y-8 text-left">
              {/* STATIC & TEAM FIELDS REMAIN UNCHANGED */}
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

              {/* ... [TEAM ROSTER AND OTHER ARRAYS HIDDEN FOR BREVITY BUT ASSUMED INTACT] ... */}

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Project Archive Matrix Registries</h4>
                  <button onClick={() => setDreamArchive([...dreamArchive, { category: "", subtitle: "", title: "New Project", client_name: "", description: "", featured_image_url: "", video_url: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD PROJECT</button>
                </div>
                <div className="space-y-4">
                  {dreamArchive.map((project, idx) => {
                    // Maghanap kung may napili nang kategorya para ilabas ang mga tamang subtitle
                    const selectedCatObj = creationsCategories.find(c => c.category === project.category);
                    
                    return (
                      <div key={project.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-2 relative">
                        <button onClick={() => handleRemoveArrayItem(dreamArchive, setDreamArchive, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          
                          {/* ===================== DROPDOWN PARA SA CATEGORY ===================== */}
                          <select 
                            value={project.category} 
                            onChange={(e) => {
                              handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'category', e.target.value);
                              handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'subtitle', ''); // Reset subtitle
                            }} 
                            className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400 font-bold outline-none cursor-pointer"
                          >
                            <option value="" disabled>Select Category...</option>
                            {creationsCategories.map(c => (
                              <option key={c.id} value={c.category}>{c.category}</option>
                            ))}
                          </select>

                          {/* ===================== DROPDOWN PARA SA SUBTITLE ===================== */}
                          <select 
                            value={project.subtitle} 
                            onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'subtitle', e.target.value)} 
                            className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400 outline-none cursor-pointer"
                            disabled={!project.category}
                          >
                            <option value="" disabled>Select Subtitle...</option>
                            {selectedCatObj && selectedCatObj.items.map(sub => (
                              <option key={sub} value={sub}>{sub}</option>
                            ))}
                          </select>

                          <input type="text" value={project.title} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'title', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-bold" placeholder="Project Title" />
                          <input type="text" value={project.client_name} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'client_name', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-500" placeholder="Client Name" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input type="text" value={project.featured_image_url} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'featured_image_url', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-500" placeholder="Featured Image URL" />
                          <input type="text" value={project.video_url} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'video_url', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-cyan-400" placeholder="Flipbook Settings (prefix,pages,ext) OR Video URL" />
                          <input type="text" value={project.description} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'description', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Description Meta..." />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ... [DATA ANALYST, AI DEVELOPER, CONTACT LINKS PANELS REMAIN UNCHANGED FOR BREVITY] ... */}
          
        </div>
      </main>
    </div>
  );
}