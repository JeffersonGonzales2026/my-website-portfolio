// src/pages/AdminDashboard.jsx

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  LayoutDashboard, Activity, Palette, Database, BrainCircuit, 
  Mail, LogOut, Save, Plus, Trash2, Image, ExternalLink, 
  Sliders, Layers, Eye, CheckCircle, FileText, User, HelpCircle, 
  Briefcase, Star, Cpu, Settings, UploadCloud, File, Image as ImageIcon, Menu, X, Loader2, Video
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
  { id: 2, category: "Graphic Design", items: ["Instructional Posters", "Corporate Graphics", "Advertising Materials", "Infographics", "Creative Campaigns", "Promotional Graphics"] },
  { id: 3, category: "Social Media Design", items: ["Facebook Graphics", "Instagram Posts", "Carousel Posts", "Story Designs", "LinkedIn Graphics", "Social Media Campaigns", "Cover Photos", "Profile Branding"] },
  { id: 4, category: "Marketing Materials", items: ["Flyers", "Brochures", "Company Profiles", "Catalogs", "Product Sheets", "Sales Kits", "Business Presentations"] },
  { id: 5, category: "Video Editing", items: ["Social Media Videos", "Marketing Videos", "Product Promotion Videos & Motion Graphics", "Corporate Videos & Motion Graphics", "Event Highlights", "YouTube Video Editing", "Podcast Editing", "Testimonial Videos", "Tutorial Videos"] },
  { id: 6, category: "Motion Graphics", items: ["Animated Ads", "Social Media Motion Graphics", "Logo Animation", "Explainer Videos", "Kinetic Typography", "Animated Infographics", "UI or App Animations", "Lottie Animations", "Intro & Outro Animations", "Lower Thirds & Broadcast Graphics"] },
  { id: 7, category: "Web Graphics", items: ["eCommerce Graphics", "Landing Page Graphics", "Icons", "UI Graphics", "Email Graphics", "WordPress Assets"] },
  { id: 8, category: "Photo Editing", items: ["Photo Retouching", "Photo Restoration", "Watercolor Portraits", "Background Removal", "Image Manipulation", "Color Correction", "Composite Editing"] },
  { id: 9, category: "Apparel Design", items: ["Shirt Designs", "Streetwear Graphics", "Mockups", "Print-ready Artwork"] },
  { id: 10, category: "Print Production", items: ["Tarpaulins", "Calling Cards", "Invitations", "Souvenirs", "ID Cards", "Certificates", "Book Covers", "Menu Cards"] },
  { id: 11, category: "Packaging", items: ["Packaging Graphics", "Clothing Labels", "Product Labels"] },
  { id: 12, category: "Illustration", items: ["Vector Artwork", "Cartoon Portraits", "Character Illustration", "Icon Design", "Seamless Patterns", "Digital Illustration"] }
];

// =========================================================================
// HELPER: Video Detection
// =========================================================================
const isVideoUrl = (url, type) => {
  if (type === 'video') return true;
  if (!url) return false;
  return url.match(/\.(mp4|webm|mov|ogg)$/i) || url.includes('video');
};

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

  // HOME ENGINE
  const [homeHeroPhoto, setHomeHeroPhoto] = useState("/images/profile.jpg");
  const [homeStats, setHomeStats] = useState([]);
  const [homeSkills, setHomeSkills] = useState([]);
  const [homeTimeline, setHomeTimeline] = useState([]);

  // DREAM CREATIONS
  const [dreamBanner, setDreamBanner] = useState("/Logo Banner.png");
  const [dreamFounderPhoto, setDreamFounderPhoto] = useState("/images/jefferson.jpg");
  const [dreamFounderExp, setDreamFounderExp] = useState(10);
  const [dreamFounderProjects, setDreamFounderProjects] = useState(200);
  const [dreamTeam, setDreamTeam] = useState([]);
  const [dreamSoftware, setDreamSoftware] = useState([]);
  const [dreamClients, setDreamClients] = useState([]);
  const [dreamFeedback, setDreamFeedback] = useState([]);
  const [dreamArchive, setDreamArchive] = useState([]);

  // STATE FOR EXCLUSIVE EXPLICIT BULK IMPORT PIPELINE
  const [bulkPipelineCat, setBulkTargetCat] = useState("");
  const [bulkPipelineSub, setBulkTargetSub] = useState("");

  // DATA ANALYST
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

  // AI DEVELOPER
  const [aiStats, setAiStats] = useState([]);
  const [aiTimeline, setAiTimeline] = useState([]);
  const [aiEcosystemState, setAiEcosystemState] = useState([]);
  const [aiArchitecture, setAiArchitecture] = useState([]);
  const [aiShowcase, setAiShowcase] = useState([]);
  const [aiGithub, setAiGithub] = useState({});

  // CONTACT & MEDIA
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
          const cleanArchives = dreamArchive.map((p, i) => ({
            category: p.category || "",
            subtitle: p.subtitle || "",
            title: p.title || "",
            client_name: p.client_name || "", 
            description: p.description || "", 
            featured_image_url: p.featured_image_url || "",
            video_url: p.video_url || "",
            created_at: new Date(Date.now() - i * 1000).toISOString()
          }));
          const { error: archiveError } = await supabase.from('portfolio_projects').insert(cleanArchives);
          if (archiveError) throw archiveError;
        }

      } else if (activeModule === 'Data Analyst') {
        await supabase.from('data_analyst').update({ performance_counters: analystStats, experience_roles: analystRoles, technical_competencies: analystSkills, software_ecosystem: analystEcosystem, future_roadmap: portfolioDashboards, portfolio_dashboards: portfolioDashboards, portfolio_reports: portfolioReports, portfolio_automations: portfolioAutomations, portfolio_case_studies: portfolioCaseStudies, portfolio_projects: portfolioProjects }).eq('id', 1);
      
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

  const handleDropdownPipelineUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (!bulkPipelineCat || !bulkPipelineSub) {
      alert("⚠️ OPS, TEKA LANG BOSS:\nPaki-pili muna ang Category at Subtitle sa dropdown bago mag-click ng Upload button!");
      e.target.value = null; 
      return;
    }

    alert(`🚀 Initializing Destination Pipeline: Injecting ${files.length} assets to [${bulkPipelineCat} -> ${bulkPipelineSub}]...`);

    let importedSuccess = 0;
    const currentArchiveStack = [...dreamArchive];

    for (const file of files) {
      try {
        const rawFileName = file.name;
        const dotIndex = rawFileName.lastIndexOf('.');
        const nameCleaned = dotIndex !== -1 ? rawFileName.substring(0, dotIndex) : rawFileName;
        
        const beautyTitle = nameCleaned
          .replace(/[-_]+/g, ' ') 
          .replace(/\s+/g, ' ')   
          .trim();

        const storageCleanName = `${Date.now()}_pipeline_${rawFileName.replace(/\s+/g, '').toLowerCase()}`;
        
        const { error: storageError } = await supabase.storage.from('portfolio_media').upload(storageCleanName, file);
        if (storageError) throw storageError;

        const { data: { publicUrl } } = supabase.storage.from('portfolio_media').getPublicUrl(storageCleanName);

        const isVideo = file.type.includes('video') || file.name.match(/\.(mp4|webm|mov|ogg)$/i);

        await supabase.from('media_library').insert([{ file_name: rawFileName, file_url: publicUrl, type: isVideo ? 'video' : 'image' }]);

        currentArchiveStack.unshift({
          category: bulkPipelineCat,
          subtitle: bulkPipelineSub,
          title: beautyTitle || "Untitled Asset",
          client_name: "Independent Project", 
          description: "Visual archive showcase item.", 
          featured_image_url: publicUrl,
          video_url: isVideo ? publicUrl : ""
        });

        importedSuccess++;
      } catch (err) {
        console.error("Pipeline broadcast exception node crash loop:", err);
      }
    }

    setDreamArchive(currentArchiveStack);
    e.target.value = null; 
    alert(`🟢 PIPELINE SUCCESS!\nNa-upload at nagawaan ng card ang ${importedSuccess} asset para sa subtitle na "${bulkPipelineSub}".\n\n⚠️ HUWAG KALIMUTAN: Pindot po sa malaking "SAVE MODULE" sa pinakataas para pumasok ito sa live site website natin!`);
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
        
        const cleanName = file.name.replace(/\s+/g, '').toLowerCase();
        
        const isBookPage = /-\d+\.\w+$/.test(cleanName);
        const fileName = isBookPage 
          ? cleanName 
          : `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage.from('portfolio_media').upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('portfolio_media').getPublicUrl(fileName);

        const isVid = file.type.includes('video') || cleanName.match(/\.(mp4|webm|mov|ogg)$/i);
        const mediaType = file.type.includes('image') ? 'image' : (isVid ? 'video' : 'document');

        const { data: dbData, error: dbError } = await supabase.from('media_library')
          .insert([{ file_name: cleanName, file_url: publicUrl, type: mediaType }])
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
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />}

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
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Raw Media Storage</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 font-mono">Upload images/documents to copy URLs into your dynamic fields.</p>
                </div>
                <div className="relative">
                  <input type="file" multiple onChange={handleFileUploadLive} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,application/pdf,video/*" />
                  <button className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md">
                    <UploadCloud size={14} /> RAW UPLOAD
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaFiles.map((file, idx) => {
                  const isVid = isVideoUrl(file.file_url, file.type);
                  return (
                    <div key={file.id || idx} className="group relative rounded-xl bg-zinc-950 border border-zinc-900 overflow-hidden aspect-square flex flex-col items-center justify-center hover:border-blue-500/50 transition-colors">
                      {isVid ? (
                        <video src={`${file.file_url}#t=0.1`} className="w-full h-full object-cover pointer-events-none" preload="metadata" muted playsInline />
                      ) : file.type === 'image' || file.file_url?.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                        <img src={file.file_url} alt="media" className="w-full h-full object-cover" />
                      ) : (
                        <File size={32} className="text-zinc-600" />
                      )}
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                        <p className="text-[10px] text-white truncate w-full mb-3 font-mono">{file.file_name}</p>
                        <div className="flex gap-2">
                          <button onClick={() => { navigator.clipboard.writeText(file.file_url); alert('URL Copied to clipboard!'); }} className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-mono font-bold cursor-pointer">Copy</button>
                          <button onClick={() => handleDeleteMedia(file.id, idx)} className="px-3 py-1.5 rounded-lg bg-red-900/50 hover:bg-red-900 text-white text-[10px] font-mono font-bold cursor-pointer"><Trash2 size={12}/></button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: HOME ENGINE ================= */}
          {activeModule === 'Home Engine' && (
            <div className="space-y-8 text-left">
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2 flex items-center gap-2"><Image size={14}/> Hero Assets Layer</h4>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase">Profile Photo Image URL Link Source</label>
                  <input type="text" value={homeHeroPhoto} onChange={(e) => setHomeHeroPhoto(e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none" />
                </div>
              </div>

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
                        <input type="text" value={item.title} onChange={(e) => handleUpdateArrayField(homeTimeline, setHomeTimeline, idx, 'title', e.target.value)} className="col-span-5 bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-bold" placeholder="Title" />
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

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Core Team Roster Allocations Matrix</h4>
                  <button onClick={() => setDreamTeam([...dreamTeam, { id: Date.now(), name: "New Creator", positions: "", bio: "", skills: "", software: "", experience: "", availability: "", status: "Active", photo: "", portfolioUrl: "#" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD MEMBER</button>
                </div>
                <div className="space-y-4">
                  {dreamTeam.map((member, idx) => (
                    <div key={member.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-3 relative">
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
                    <h4 className="text-xs font-mono font-bold text-zinc-400 block">Trusted Client Log Grid</h4>
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

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Client Feedback Testimonial Submissions</h4>
                  <button onClick={() => setDreamFeedback([...dreamFeedback, { client_name: "", company: "", project_type: "", rating: 5, feedback: "", face_image_url: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD FEEDBACK</button>
                </div>
                <div className="space-y-4">
                  {dreamFeedback.map((review, idx) => (
                    <div key={review.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-3 relative">
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

              {/* ================= PROJECT ARCHIVE WITH AUTO IMPORT ================= */}
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-3">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Project Archive Matrix Registries</h4>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Mabilisang paraan: Piliin ang category at mag-upload nang isahan o maramihan.</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={() => setDreamArchive([{ category: "", subtitle: "", title: "New Project", client_name: "Independent Project", description: "Visual archive showcase item.", featured_image_url: "", video_url: "" }, ...dreamArchive])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> MANUAL ADD</button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-3 p-4 bg-black/40 rounded-xl border border-zinc-900">
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">1. Select Destination Category</span>
                    <select value={bulkPipelineCat} onChange={(e) => { setBulkTargetCat(e.target.value); setBulkTargetSub(""); }} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300 font-bold outline-none cursor-pointer focus:border-blue-500/50">
                      <option value="">-- Select Category --</option>
                      {creationsCategories.map(c => <option key={c.id} value={c.category}>{c.category}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider">2. Select Target Subtitle</span>
                    <select value={bulkPipelineSub} onChange={(e) => setBulkTargetSub(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300 outline-none cursor-pointer focus:border-blue-500/50 disabled:opacity-50" disabled={!bulkPipelineCat}>
                      <option value="">-- Select Subtitle --</option>
                      {creationsCategories.find(c => c.category === bulkPipelineCat)?.items.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative mt-2 md:mt-0">
                    <input type="file" multiple onChange={handleDropdownPipelineUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*, video/*" disabled={!bulkPipelineCat || !bulkPipelineSub} />
                    <button type="button" disabled={!bulkPipelineCat || !bulkPipelineSub} className="w-full md:w-auto px-4 py-2 text-xs font-mono rounded-lg bg-blue-600 hover:bg-blue-500 border border-blue-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                      <UploadCloud size={14} /> 3. BULK UPLOAD TO DESTINATION
                    </button>
                  </div>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar mt-4">
                  {dreamArchive.map((project, idx) => {
                    const selectedCatObj = creationsCategories.find(c => c.category === project.category);
                    const isVid = isVideoUrl(project.featured_image_url) || isVideoUrl(project.video_url);

                    return (
                      <div key={project.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-2 relative flex gap-3 items-center">
                        {/* VISUAL THUMBNAIL PREVIEW BOX (WITH VIDEO SUPPORT) */}
                        <div className="w-16 h-16 shrink-0 rounded-lg bg-black border border-zinc-800 overflow-hidden flex items-center justify-center relative">
                          {project.featured_image_url ? (
                            isVid ? (
                              <video src={`${project.featured_image_url}#t=0.1`} className="w-full h-full object-cover pointer-events-none" preload="metadata" muted playsInline />
                            ) : (
                              <img src={project.featured_image_url} alt="preview" className="w-full h-full object-cover" />
                            )
                          ) : (
                            <ImageIcon size={20} className="text-zinc-700" />
                          )}
                          {isVid && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                              <Video size={14} className="text-cyan-400" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <button onClick={() => handleRemoveArrayItem(dreamArchive, setDreamArchive, idx)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pr-6">
                            <select value={project.category} onChange={(e) => {
                                handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'category', e.target.value);
                                handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'subtitle', ''); 
                              }} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400 font-bold outline-none cursor-pointer">
                              <option value="" disabled>Select Category...</option>
                              {creationsCategories.map(c => <option key={c.id} value={c.category}>{c.category}</option>)}
                            </select>
                            <select value={project.subtitle} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'subtitle', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400 outline-none cursor-pointer" disabled={!project.category}>
                              <option value="" disabled>Select Subtitle...</option>
                              {selectedCatObj && selectedCatObj.items.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                            <input type="text" value={project.title} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'title', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-bold" placeholder="Project Title" />
                            <input type="text" value={project.client_name} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'client_name', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-500" placeholder="Client Name" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input type="text" value={project.featured_image_url} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'featured_image_url', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-zinc-500" placeholder="Featured Image URL" />
                            <input type="text" value={project.video_url} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'video_url', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs font-mono text-cyan-400" placeholder="Flipbook Settings OR Video URL" />
                            <input type="text" value={project.description} onChange={(e) => handleUpdateArrayField(dreamArchive, setDreamArchive, idx, 'description', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-zinc-400" placeholder="Description Meta..." />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= WORKSPACE PANEL: DATA ANALYST ================= */}
          {activeModule === 'Data Analyst' && (
            <div className="space-y-8 text-left">
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

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Extensible Experience Roles Stack</h4>
                  <button onClick={() => setRoles([...analystRoles, { id: Date.now(), statusBadge: "Role Block", title: "", company: "", responsibilities: "", impact: "", logoUrl: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD EXPERIENCE ROLE</button>
                </div>
                {analystRoles.map((role, idx) => (
                  <div key={role.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-3 relative">
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
                      <textarea value={section.skills} onChange={(e) => handleUpdateArrayField(analystSkills, setAnalystSkills, catIdx, 'skills', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-zinc-300 font-mono h-16 resize-none" placeholder="Comma separated strings..." />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-2">// Analytics Portfolio Showcase Core (5 Completed Tabs)</h4>
                
                <div className="flex flex-wrap gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-900">
                  {['dashboards', 'reports', 'automations', 'caseStudies', 'projects'].map((tab) => (
                    <button key={tab} type="button" onClick={() => setActivePortfolioTab(tab)} className={`px-3 py-1.5 text-[11px] font-mono rounded-lg transition-colors cursor-pointer capitalize ${activePortfolioTab === tab ? 'bg-zinc-900 text-white font-bold border border-zinc-800' : 'text-zinc-500 hover:bg-zinc-900/50'}`}>
                      {tab}
                    </button>
                  ))}
                </div>

                {activePortfolioTab === 'dashboards' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Dashboards List Module</span><button onClick={() => setPortfolioDashboards([...portfolioDashboards, { id: Date.now(), name: "", purpose: "", industry: "", department: "", description: "", software: "", tech: "", date: "", status: "Deployed", kpis: "", impact: "", thumbnail: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD DASHBOARD</button></div>
                    {portfolioDashboards.map((item, idx) => (
                      <div key={item.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
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

                {activePortfolioTab === 'reports' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Reports List Module</span><button onClick={() => setPortfolioReports([...portfolioReports, { id: Date.now(), title: "", context: "", objective: "", audience: "", frequency: "", source: "", format: "", viz: "", findings: "", recommendations: "", impact: "", tools: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD REPORT</button></div>
                    {portfolioReports.map((item, idx) => (
                      <div key={item.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
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

                {activePortfolioTab === 'automations' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Automations List Module</span><button onClick={() => setPortfolioAutomations([...portfolioAutomations, { id: Date.now(), name: "", problem: "", currentProcess: "", painPoints: "", objectives: "", steps: "", tech: "", ai: "", timeSaved: "", errorReduction: "", productivity: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD AUTOMATION</button></div>
                    {portfolioAutomations.map((item, idx) => (
                      <div key={item.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
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
                          <input type="text" value={item.productivity} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'productivity', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-lime-400" placeholder="Productivity" />
                          <input type="text" value={item.errorReduction} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'errorReduction', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-lime-400" placeholder="Error Reduction" />
                          <input type="text" value={item.tech} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'tech', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-zinc-400" placeholder="Tech Used" />
                          <input type="text" value={item.ai} onChange={(e) => handleUpdateArrayField(portfolioAutomations, setPortfolioAutomations, idx, 'ai', e.target.value)} className="bg-zinc-950 border border-zinc-900 p-1.5 rounded text-purple-400" placeholder="AI Used" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activePortfolioTab === 'caseStudies' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Case Studies Module</span><button onClick={() => setPortfolioCaseStudies([...portfolioCaseStudies, { id: Date.now(), problem: "", background: "", objectives: "", collection: "", cleaning: "", analysis: "", visualization: "", insights: "", recommendations: "", impact: "", lessons: "" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD CASE STUDY</button></div>
                    {portfolioCaseStudies.map((item, idx) => (
                      <div key={item.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
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

                {activePortfolioTab === 'projects' && (
                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-mono text-zinc-500 uppercase font-black">&gt;_ Intern Projects Module</span><button onClick={() => setPortfolioProjects([...portfolioProjects, { id: Date.now(), name: "", industry: "", overview: "", problem: "", objectives: "", tools: "", tech: "", role: "", challenges: "", solution: "", results: "", status: "Completed" }])} className="px-2 py-0.5 text-[9px] bg-zinc-900 border border-zinc-800 text-white rounded cursor-pointer hover:bg-zinc-800"><Plus size={10}/> ADD PROJECT</button></div>
                    {portfolioProjects.map((item, idx) => (
                      <div key={item.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/30 space-y-2 text-xs relative">
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

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Software Ecosystem Registry</h4>
                  <button onClick={() => setAnalystEcosystem([...analystEcosystem, { category: "New Stream", tools: [{ name: "New Tool", imageSrc: "" }] }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD CATEGORY</button>
                </div>
                {analystEcosystem.map((cat, catIdx) => (
                  <div key={catIdx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/10 space-y-2 relative pr-8">
                    <button onClick={() => handleRemoveArrayItem(analystEcosystem, setAnalystEcosystem, catIdx)} className="absolute top-4 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1 mb-2">
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

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Development Architecture Stack Matrix</h4>
                  <button onClick={() => setAiArchitecture([...aiArchitecture, { category: "Infrastructure Track", items: [{ name: "Service Node", imageSrc: "" }] }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD STACK LAYER</button>
                </div>
                {aiArchitecture.map((stack, catIdx) => (
                  <div key={catIdx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/10 space-y-2 relative pr-8">
                    <button onClick={() => handleRemoveArrayItem(aiArchitecture, setAiArchitecture, catIdx)} className="absolute top-4 right-3 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-1 mb-2">
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

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Flagship Engineering Showcase Projects Matrix</h4>
                  <button onClick={() => setAiShowcase([...aiShowcase, { id: Date.now(), type: "flagship", badge: "In Progress", meta: "New Project", title: "", desc: "", tech: "", role: "", actionText: "Inspect Source", link: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD PROJECT</button>
                </div>
                <div className="space-y-4">
                  {aiShowcase.map((project, idx) => (
                    <div key={project.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 space-y-2 relative pr-8">
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
              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2"><FileText size={14}/> Dynamic Resumes Dropdown List</h4>
                  <button onClick={() => setDynamicResumes([...dynamicResumes, { title: "", file_url: "" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD RESUME</button>
                </div>
                
                <div className="space-y-3">
                  {dynamicResumes.map((resume, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center relative pr-8">
                      <button onClick={() => handleRemoveArrayItem(dynamicResumes, setDynamicResumes, idx)} className="absolute right-3 top-4 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      
                      <div className="space-y-1">
                        <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">Resume Name (Dropdown Label)</label>
                        <input type="text" value={resume.title} onChange={(e) => handleUpdateArrayField(dynamicResumes, setDynamicResumes, idx, 'title', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-white font-bold" placeholder="e.g. Data Analyst Resume" />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-[9px] font-mono font-bold text-zinc-500 uppercase">PDF URL Link (Paste from Media Library)</label>
                        <input type="text" value={resume.file_url} onChange={(e) => handleUpdateArrayField(dynamicResumes, setDynamicResumes, idx, 'file_url', e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-2 text-xs text-zinc-400 font-mono" placeholder="https://..." />
                      </div>
                    </div>
                  ))}
                  {dynamicResumes.length === 0 && (
                    <div className="text-[10px] text-zinc-600 font-mono italic text-center py-2">No dynamic resumes active. Click "ADD RESUME" above.</div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-900/60 space-y-1.5 mt-4">
                  <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase">Dynamic Portfolio Archive PDF Download URL Link</label>
                  <input type="text" value={contactPortfolioUrl} onChange={(e) => setContactPortfolioUrl(e.target.value)} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none" />
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">// Social Networking Directory Registry</h4>
                  <button onClick={() => setContactPlatforms([...contactPlatforms, { id: "new", name: "New Link", username: "", link: "", status: "active" }])} className="px-2.5 py-1 text-[10px] font-mono bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold flex items-center gap-1 hover:border-zinc-700 cursor-pointer"><Plus size={12}/> ADD LINK</button>
                </div>
                <div className="space-y-3">
                  {contactPlatforms.map((platform, idx) => (
                    <div key={platform.id || idx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center relative pr-8">
                      <button onClick={() => handleRemoveArrayItem(contactPlatforms, setContactPlatforms, idx)} className="absolute right-3 top-4 text-zinc-600 hover:text-red-400 cursor-pointer"><Trash2 size={14}/></button>
                      <input type="text" value={platform.name} onChange={(e) => handleUpdateArrayField(contactPlatforms, setContactPlatforms, idx, 'name', e.target.value)} className="bg-zinc-950 border border-zinc-900 rounded-lg p-1.5 text-xs text-white font-bold uppercase" placeholder="Platform Name" />
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
                        <button onClick={() => handleArchiveMessage(msg.id, idx)} className="text-[10px] text-red-400/70 hover:text-red-400 border border-zinc-900 bg-zinc-950/40 px-2 py-0.5 rounded cursor-pointer">Archive Log</button>
                      </div>
                    </div>
                  ))}
                  {messagesLog.length === 0 && (
                    <div className="p-8 text-center text-zinc-600 font-mono italic">No messages found in the incoming transmission queue.</div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
      `}</style>
    </div>
  );
}