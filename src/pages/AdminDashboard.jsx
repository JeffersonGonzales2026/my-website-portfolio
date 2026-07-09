// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Palette, Database, BrainCircuit, 
  Mail, Settings, LogOut, FileText, Image as ImageIcon,
  Activity, Users, Loader2, CheckCircle, UploadCloud, File, Save, Plus, Trash2, Video, MessageSquare, Star, Eye
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const sidebarModules = [
  { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Home Config', icon: <Activity size={18} /> },
  { name: 'Dream Creations', icon: <Palette size={18} /> },
  { name: 'Data Analyst', icon: <Database size={18} /> },
  { name: 'AI Developer', icon: <BrainCircuit size={18} /> },
  { name: 'Media Library', icon: <ImageIcon size={18} /> },
  { name: 'Messages', icon: <Mail size={18} /> }
];

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState('Dashboard');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  
  // Data States
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ totalMessages: 0, unreadMessages: 0 });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  
  // Home Config States
  const [homeData, setHomeData] = useState({
    hero_title: '', hero_subtitle: '', about_text: '', profile_image_url: '', resume_url: ''
  });
  const [savingHome, setSavingHome] = useState(false);

  // Dream Creations States
  const [dreamTab, setDreamTab] = useState('projects'); 
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [savingProject, setSavingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '', client_name: '', description: '', featured_image_url: '', video_url: '', is_published: false
  });
  const [clientReviews, setClientReviews] = useState([]);
  const [savingReview, setSavingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    client_name: '', company: '', project_type: '', rating: 5, feedback: '', face_image_url: '', is_published: true
  });

  // Data Analyst Config States
  const [analystData, setAnalystData] = useState({
    hero_title: '', hero_subtitle: '', intern_bio: '', analytics_years: 1, dashboards_built: 0, reports_created: 0, automation_projects: 0, processes_improved: 0, hours_saved: 0
  });
  const [savingAnalyst, setSavingAnalyst] = useState(false);

  // AI Developer Config States
  const [aiDevData, setAiDevData] = useState({
    git_repos: 4, hours_coding: 320, prompts_optimized: 1200, dashboards_count: 12
  });
  const [savingAiDev, setSavingAiDev] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Enforce Cloud Session Security
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
      else {
        setSession(session);
        setLoading(false);
      }
    };
    checkUserSession();
  }, [navigate]);

  // Fetch data dynamically based on selected workflow module
  useEffect(() => {
    if (!session) return;
    
    if (activeModule === 'Dashboard' || activeModule === 'Messages') {
      fetchLiveMessages();
      fetchPortfolioProjects(); 
    }
    else if (activeModule === 'Media Library') fetchMediaLibrary();
    else if (activeModule === 'Home Config') fetchHomeConfig();
    else if (activeModule === 'Data Analyst') fetchDataAnalystConfig();
    else if (activeModule === 'AI Developer') fetchAiDeveloperConfig();
    else if (activeModule === 'Dream Creations') {
      fetchPortfolioProjects();
      fetchClientReviews();
    }
  }, [activeModule, session]);

  // ================= MODULE: DATA ANALYST CONFIG LINK LAYER =================
  const fetchDataAnalystConfig = async () => {
    try {
      const { data, error } = await supabase.from('data_analyst_config').select('*').eq('id', 1).single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setAnalystData({
          hero_title: data.hero_title || '',
          hero_subtitle: data.hero_subtitle || '',
          intern_bio: data.intern_bio || '',
          analytics_years: data.analytics_years || 1,
          dashboards_built: data.dashboards_built || 0,
          reports_created: data.reports_created || 0,
          automation_projects: data.automation_projects || 0,
          processes_improved: data.processes_improved || 0,
          hours_saved: data.hours_saved || 0
        });
      }
    } catch (error) {
      console.error('Data Analyst core capture anomaly:', error.message);
    }
  };

  const handleSaveAnalyst = async () => {
    setSavingAnalyst(true);
    try {
      // Package payload safely to synchronize statistical grids
      const updatePayload = {
        id: 1,
        ...analystData,
        quick_stats: [
          { label: "Years in Analytics", value: parseInt(analystData.analytics_years), suffix: "+" },
          { label: "Dashboards Built", value: parseInt(analystData.dashboards_built), suffix: "" },
          { label: "Reports Created", value: parseInt(analystData.reports_created), suffix: "" },
          { label: "Automation Projects", value: parseInt(analystData.automation_projects), suffix: "" },
          { label: "Processes Improved", value: parseInt(analystData.processes_improved), suffix: "" },
          { label: "Hours Saved", value: parseInt(analystData.hours_saved), suffix: "+" }
        ],
        updated_at: new Date()
      };

      const { error } = await supabase.from('data_analyst_config').upsert(updatePayload);
      if (error) throw error;
      alert('Data Analyst structural attributes synced live!');
    } catch (error) {
      console.error('Analyst save failure:', error.message);
      alert('Error updating analysis profile configuration.');
    } finally {
      setSavingAnalyst(false);
    }
  };

  // ================= MODULE: AI DEVELOPER CONFIG LINK LAYER =================
  const fetchAiDeveloperConfig = async () => {
    try {
      const { data, error } = await supabase.from('ai_developer_config').select('*').eq('id', 1).single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setAiDevData({
          git_repos: data.git_repos || 4,
          hours_coding: data.hours_coding || 320,
          prompts_optimized: data.prompts_optimized || 1200,
          dashboards_count: data.dashboards_count || 12
        });
      }
    } catch (error) {
      console.error('AI dev core query mismatch:', error.message);
    }
  };

  const handleSaveAiDev = async () => {
    setSavingAiDev(true);
    try {
      const updatePayload = {
        id: 1,
        ...aiDevData,
        developer_stats: [
          { label: "Git Repositories", value: parseInt(aiDevData.git_repos), suffix: "" },
          { label: "Dashboards Built", value: parseInt(aiDevData.dashboards_count), suffix: "" },
          { label: "Hours Coding", value: parseInt(aiDevData.hours_coding), suffix: "+" },
          { label: "AI Prompts Optimized", value: parseInt(aiDevData.prompts_optimized), suffix: "+" }
        ],
        updated_at: new Date()
      };

      const { error } = await supabase.from('ai_developer_config').upsert(updatePayload);
      if (error) throw error;
      alert('AI Developer engineering metrics updated!');
    } catch (error) {
      console.error('AI dev save fault:', error.message);
    } finally {
      setSavingAiDev(false);
    }
  };

  // ================= MODULE: DREAM CREATIONS (PROJECTS) =================
  const fetchPortfolioProjects = async () => {
    try {
      const { data, error } = await supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPortfolioProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSavingProject(true);
    try {
      const { error } = await supabase.from('portfolio_projects').insert([projectForm]);
      if (error) throw error;
      
      setProjectForm({ title: '', client_name: '', description: '', featured_image_url: '', video_url: '', is_published: false });
      await fetchPortfolioProjects();
      alert('Project added successfully!');
    } catch (error) {
      console.error('Failed to save project:', error.message);
      alert('Error saving project.');
    } finally {
      setSavingProject(false);
    }
  };

  const handleTogglePublish = async (id, currentStatus, table = 'portfolio_projects') => {
    try {
      const { error } = await supabase.from(table).update({ is_published: !currentStatus }).eq('id', id);
      if (error) throw error;
      if (table === 'portfolio_projects') fetchPortfolioProjects();
      else fetchClientReviews();
    } catch (error) {
      console.error(`Failed to toggle status on ${table}:`, error.message);
    }
  };

  const handleDeleteRecord = async (id, table) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      if (table === 'portfolio_projects') fetchPortfolioProjects();
      else fetchClientReviews();
    } catch (error) {
      console.error(`Failed to delete record from ${table}:`, error.message);
    }
  };

  // ================= MODULE: DREAM CREATIONS (REVIEWS) =================
  const fetchClientReviews = async () => {
    try {
      const { data, error } = await supabase.from('client_reviews').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setClientReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  const handleSaveReview = async (e) => {
    e.preventDefault();
    setSavingReview(true);
    try {
      const { error } = await supabase.from('client_reviews').insert([reviewForm]);
      if (error) throw error;
      
      setReviewForm({ client_name: '', company: '', project_type: '', rating: 5, feedback: '', face_image_url: '', is_published: true });
      await fetchClientReviews();
      alert('Testimonial added successfully!');
    } catch (error) {
      console.error('Failed to save review:', error.message);
      alert('Error saving testimonial.');
    } finally {
      setSavingReview(false);
    }
  };

  // ================= MODULE: HOME CONFIG =================
  const fetchHomeConfig = async () => {
    try {
      const { data, error } = await supabase.from('home_settings').select('*').eq('id', 1).single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) setHomeData(data);
    } catch (error) {
      console.error('Error fetching home config:', error.message);
    }
  };

  const handleSaveHome = async () => {
    setSavingHome(true);
    try {
      const { error } = await supabase.from('home_settings').upsert({ id: 1, ...homeData, updated_at: new Date() });
      if (error) throw error;
      alert('Homepage configuration saved successfully!');
    } catch (error) {
      console.error('Save failed:', error.message);
    } finally {
      setSavingHome(false);
    }
  };

  // ================= MODULE: MESSAGES =================
  const fetchLiveMessages = async () => {
    try {
      const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
      setStats({ totalMessages: data.length, unreadMessages: data.filter(msg => msg.status === 'unread').length });
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const { error } = await supabase.from('contact_messages').update({ status: 'read' }).eq('id', id);
      if (error) throw error;
      fetchLiveMessages();
    } catch (error) {
      console.error('Failed to update message:', error.message);
    }
  };

  // ================= MODULE: MEDIA LIBRARY =================
  const fetchMediaLibrary = async () => {
    try {
      const { data, error } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setMediaFiles(data || []);
    } catch (error) {
      console.error('Error fetching media:', error.message);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from('media_library').insert([{
        uploader_id: session.user.id, file_name: file.name, file_url: publicUrl, file_type: file.type, size_bytes: file.size
      }]);

      if (dbError) throw dbError;
      await fetchMediaLibrary();
    } catch (error) {
      console.error('Upload failed:', error.message);
      alert('Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ================= GLOBAL ACTIONS =================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02040a] flex items-center justify-center text-slate-400 gap-3 font-mono text-xs">
        <Loader2 className="animate-spin text-blue-500" size={18} /> VERIFYING SESSION ENCRYPTION...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#02040a] text-slate-200 overflow-hidden font-sans">
      
      {/* Sidebar Panel */}
      <aside className="w-64 flex-shrink-0 bg-white/[0.02] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-black text-white tracking-tight">JG CMS <span className="text-blue-500">Pro</span></h2>
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mt-1 block">Super Admin</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 hide-scrollbar">
          {sidebarModules.map((module) => (
            <button
              key={module.name}
              onClick={() => setActiveModule(module.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeModule === module.name 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {module.icon} {module.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Dashboard Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 flex-shrink-0 bg-white/[0.01] border-b border-white/10 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-white">{activeModule} Overview</h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Session Active
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          
          {/* ================= DASHBOARD VIEW ================= */}
          {activeModule === 'Dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-slate-400 mb-2"><Mail size={16}/> Total Messages</div>
                  <div className="text-3xl font-bold text-white">{stats.totalMessages}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-slate-400 mb-2"><Activity size={16}/> Unread Count</div>
                  <div className="text-3xl font-bold text-blue-400">{stats.unreadMessages}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-slate-400 mb-2"><Palette size={16}/> Published Designs</div>
                  <div className="text-3xl font-bold text-white">{portfolioProjects.filter(p => p.is_published).length}</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 text-slate-400 mb-2"><Activity size={16}/> Sync Engine</div>
                  <div className="text-3xl font-bold text-emerald-400">RLS Active</div>
                </div>
              </div>
            </div>
          )}

          {/* ================= DATA ANALYST VIEW ================= */}
          {activeModule === 'Data Analyst' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Data Analyst Matrix</h3>
                  <p className="text-sm text-slate-400 mt-1">Control your analytics headers and matching fluid counter stats.</p>
                </div>
                <button onClick={handleSaveAnalyst} disabled={savingAnalyst} className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50">
                  {savingAnalyst ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Metrics
                </button>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Hero Main Title</label>
                    <input type="text" value={analystData.hero_title} onChange={e => setAnalystData({...analystData, hero_title: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Hero Analytical Description</label>
                    <textarea rows={3} value={analystData.hero_subtitle} onChange={e => setAnalystData({...analystData, hero_subtitle: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 resize-none" />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <h4 className="text-sm font-bold text-emerald-400 mb-4 uppercase tracking-wider">Animated Dashboard Counters</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2">Years in Analytics</label>
                      <input type="number" value={analystData.analytics_years} onChange={e => setAnalystData({...analystData, analytics_years: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2">Dashboards Built</label>
                      <input type="number" value={analystData.dashboards_built} onChange={e => setAnalystData({...analystData, dashboards_built: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2">Reports Created</label>
                      <input type="number" value={analystData.reports_created} onChange={e => setAnalystData({...analystData, reports_created: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2">Automation Projects</label>
                      <input type="number" value={analystData.automation_projects} onChange={e => setAnalystData({...analystData, automation_projects: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2">Processes Improved</label>
                      <input type="number" value={analystData.processes_improved} onChange={e => setAnalystData({...analystData, processes_improved: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-2">Hours Saved</label>
                      <input type="number" value={analystData.hours_saved} onChange={e => setAnalystData({...analystData, hours_saved: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= AI DEVELOPER VIEW ================= */}
          {activeModule === 'AI Developer' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">AI Developer Node Config</h3>
                  <p className="text-sm text-slate-400 mt-1">Manage numbers running inside your digital contribution grid.</p>
                </div>
                <button onClick={handleSaveAiDev} disabled={savingAiDev} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50">
                  {savingAiDev ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Deploy Parameters
                </button>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Git Repositories</label>
                  <input type="number" value={aiDevData.git_repos} onChange={e => setAiDevData({...aiDevData, git_repos: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Dashboards Built</label>
                  <input type="number" value={aiDevData.dashboards_count} onChange={e => setAiDevData({...aiDevData, dashboards_count: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Hours Coding</label>
                  <input type="number" value={aiDevData.hours_coding} onChange={e => setAiDevData({...aiDevData, hours_coding: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">AI Prompts Optimized</label>
                  <input type="number" value={aiDevData.prompts_optimized} onChange={e => setAiDevData({...aiDevData, prompts_optimized: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                </div>
              </div>
            </div>
          )}

          {/* ================= MESSAGES VIEW ================= */}
          {activeModule === 'Messages' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white">Incoming Client Request Influx</h3>
                <p className="text-sm text-slate-400">Live operational pipelines capturing public form entries.</p>
              </div>
              
              <div className="bg-white/[0.01] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {messages.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-slate-400 font-mono text-xs border-b border-white/10">
                          <th className="p-4">Sender Profile</th>
                          <th className="p-4">Contact Subject</th>
                          <th className="p-4">Message Context</th>
                          <th className="p-4 text-center">Pipeline Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-medium">
                        {messages.map((msg) => (
                          <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-4 whitespace-nowrap">
                              <div className="text-white font-bold">{msg.sender_name}</div>
                              <div className="text-xs text-slate-400 font-mono mt-0.5">{msg.sender_email}</div>
                              {msg.company && <div className="text-[10px] text-blue-400 uppercase tracking-wide mt-1">{msg.company}</div>}
                            </td>
                            <td className="p-4 max-w-[200px] truncate">
                              <div className="text-slate-200 truncate">{msg.subject}</div>
                              {msg.service_interested && <span className="inline-block px-1.5 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] text-purple-300 mt-1">{msg.service_interested}</span>}
                            </td>
                            <td className="p-4 text-xs text-slate-400 max-w-sm whitespace-pre-line leading-relaxed">{msg.message}</td>
                            <td className="p-4 text-center whitespace-nowrap">
                              {msg.status === 'unread' ? (
                                <button onClick={() => handleMarkAsRead(msg.id)} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-1.5 mx-auto">
                                  <Eye size={12}/> Mark Read
                                </button>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full mx-auto font-mono">
                                  <CheckCircle size={12} /> Processed
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-16 text-center text-slate-500 font-mono text-sm">No incoming data transmissions detected inside your cloud instance inbox table.</div>
                )}
              </div>
            </div>
          )}

          {/* ================= DREAM CREATIONS VIEW ================= */}
          {activeModule === 'Dream Creations' && (
            <div className="space-y-8">
              
              {/* Internal Tab Navigation */}
              <div className="flex gap-2 border-b border-white/10 pb-4">
                <button 
                  onClick={() => setDreamTab('projects')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${dreamTab === 'projects' ? 'bg-[#1095d2] text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  Portfolio Projects
                </button>
                <button 
                  onClick={() => setDreamTab('reviews')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${dreamTab === 'reviews' ? 'bg-[#1095d2] text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                >
                  Client Testimonials
                </button>
              </div>

              {/* ----- SUB-TAB: PORTFOLIO PROJECTS ----- */}
              {dreamTab === 'projects' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                  {/* Add New Project Form */}
                  <div className="xl:col-span-4">
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sticky top-0">
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Plus size={18}/> New Project</h3>
                      <form onSubmit={handleSaveProject} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Project Title</label>
                          <input required type="text" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" placeholder="Brand Redesign..." />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Client / Agency <span className="font-normal">(Optional)</span></label>
                          <input type="text" value={projectForm.client_name} onChange={e => setProjectForm({...projectForm, client_name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" placeholder="Acme Corp" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Featured Image URL</label>
                          <input required type="url" value={projectForm.featured_image_url} onChange={e => setProjectForm({...projectForm, featured_image_url: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" placeholder="https://..." />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Video URL <span className="font-normal">(Optional YouTube/Vimeo/Direct)</span></label>
                          <input type="url" value={projectForm.video_url} onChange={e => setProjectForm({...projectForm, video_url: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" placeholder="https://youtube.com/..." />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Project Description</label>
                          <textarea required rows={4} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" placeholder="Describe the design process and goals..." />
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                          <input type="checkbox" id="publish" checked={projectForm.is_published} onChange={e => setProjectForm({...projectForm, is_published: e.target.checked})} className="w-4 h-4 rounded border-white/20 bg-black/40 text-blue-500 focus:ring-0" />
                          <label htmlFor="publish" className="text-sm text-slate-300 cursor-pointer">Publish immediately</label>
                        </div>
                        <button type="submit" disabled={savingProject} className="w-full py-3 mt-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                          {savingProject ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Project
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Projects Grid */}
                  <div className="xl:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {portfolioProjects.map((project) => (
                        <div key={project.id} className={`rounded-2xl border overflow-hidden transition-all flex flex-col ${project.is_published ? 'bg-white/[0.02] border-white/10' : 'bg-black/40 border-white/5 opacity-75'}`}>
                          <div className="aspect-video relative bg-black/50 border-b border-white/5">
                            {project.featured_image_url ? (
                              <img src={project.featured_image_url} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-600"><ImageIcon size={32} /></div>
                            )}
                            {project.video_url && (
                              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-white">
                                <Video size={14} />
                              </div>
                            )}
                            <div className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-black/50 border border-white/10 text-white">
                              {project.is_published ? <span className="text-emerald-400">Published</span> : <span className="text-amber-400">Draft</span>}
                            </div>
                          </div>
                          <div className="p-5 flex-1 flex flex-col">
                            <h4 className="text-lg font-bold text-white mb-1">{project.title}</h4>
                            <p className="text-xs text-blue-400 font-mono mb-3">{project.client_name || 'Independent Project'}</p>
                            <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">{project.description}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                              <button onClick={() => handleTogglePublish(project.id, project.is_published, 'portfolio_projects')} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${project.is_published ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'}`}>
                                {project.is_published ? 'Unpublish' : 'Publish'}
                              </button>
                              <button onClick={() => handleDeleteRecord(project.id, 'portfolio_projects')} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              { dreamTab === 'reviews' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                  {/* Add New Review Form */}
                  <div className="xl:col-span-4">
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sticky top-0">
                      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><MessageSquare size={18}/> New Testimonial</h3>
                      <form onSubmit={handleSaveReview} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Client Name</label>
                          <input required type="text" value={reviewForm.client_name} onChange={e => setReviewForm({...reviewForm, client_name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" placeholder="Jane Doe" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Company / Organization <span className="font-normal">(Optional)</span></label>
                          <input type="text" value={reviewForm.company} onChange={e => setReviewForm({...reviewForm, company: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" placeholder="Acme Corp" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Project Type</label>
                          <input type="text" value={reviewForm.project_type} onChange={e => setReviewForm({...reviewForm, project_type: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" placeholder="e.g. Brand Identity" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Rating (1-5)</label>
                          <input type="number" min="1" max="5" value={reviewForm.rating} onChange={e => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Client Face Image URL <span className="font-normal">(Optional)</span></label>
                          <input type="url" value={reviewForm.face_image_url} onChange={e => setReviewForm({...reviewForm, face_image_url: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50" placeholder="https://..." />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1">Feedback Quote</label>
                          <textarea required rows={4} value={reviewForm.feedback} onChange={e => setReviewForm({...reviewForm, feedback: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" placeholder="Dream Creations did an amazing job..." />
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                          <input type="checkbox" id="publishRev" checked={reviewForm.is_published} onChange={e => setReviewForm({...reviewForm, is_published: e.target.checked})} className="w-4 h-4 rounded border-white/20 bg-black/40 text-blue-500 focus:ring-0" />
                          <label htmlFor="publishRev" className="text-sm text-slate-300 cursor-pointer">Publish immediately</label>
                        </div>
                        <button type="submit" disabled={savingReview} className="w-full py-3 mt-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                          {savingReview ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Testimonial
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Reviews Grid */}
                  <div className="xl:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {clientReviews.map((review) => (
                        <div key={review.id} className={`p-6 rounded-2xl border flex flex-col transition-all ${review.is_published ? 'bg-white/[0.02] border-white/10' : 'bg-black/40 border-white/5 opacity-75'}`}>
                          <div className="flex gap-1 mb-4 text-[#1095d2]">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                          </div>
                          <p className="text-sm text-slate-300 italic mb-6 flex-grow">"{review.feedback}"</p>
                          <div className="flex items-center gap-3 mb-6">
                            {review.face_image_url ? (
                              <img src={review.face_image_url} alt="client" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/50">{review.client_name.charAt(0)}</div>
                            )}
                            <div>
                              <h4 className="text-sm font-bold text-white leading-tight">{review.client_name}</h4>
                              <p className="text-[10px] text-slate-400">{review.project_type} • {review.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <button onClick={() => handleTogglePublish(review.id, review.is_published, 'client_reviews')} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${review.is_published ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'}`}>
                              {review.is_published ? 'Unpublish' : 'Publish'}
                            </button>
                            <button onClick={() => handleDeleteRecord(review.id, 'client_reviews')} className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= HOME CONFIG VIEW ================= */}
          {activeModule === 'Home Config' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white">Homepage Configuration</h3>
                  <p className="text-sm text-slate-400 mt-1">Update the public-facing details on your main landing page.</p>
                </div>
                <button onClick={handleSaveHome} disabled={savingHome} className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer">
                  {savingHome ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Changes
                </button>
              </div>
              <div className="space-y-6 bg-white/[0.02] border border-white/10 rounded-3xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Hero Title</label>
                    <input type="text" value={homeData.hero_title || ''} onChange={e => setHomeData({...homeData, hero_title: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Hero Subtitle</label>
                    <input type="text" value={homeData.hero_subtitle || ''} onChange={e => setHomeData({...homeData, hero_subtitle: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">About Me</label>
                  <textarea rows={4} value={homeData.about_text || ''} onChange={e => setHomeData({...homeData, about_text: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 resize-none" />
                </div>
                <div className="pt-4 border-t border-white/10 space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Profile Image URL</label>
                    <div className="flex gap-4 items-center">
                      <input type="text" value={homeData.profile_image_url || ''} onChange={e => setHomeData({...homeData, profile_image_url: e.target.value})} className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                      {homeData.profile_image_url && <img src={homeData.profile_image_url} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-white/20" />}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Resume PDF URL</label>
                    <input type="text" value={homeData.resume_url || ''} onChange={e => setHomeData({...homeData, resume_url: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= MEDIA LIBRARY VIEW ================= */}
          {activeModule === 'Media Library' && (
             <div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">Cloud Media Storage</h3>
                  <p className="text-sm text-slate-400 mt-1">Upload images to use across your portfolio projects.</p>
                </div>
                <div>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,application/pdf" />
                  <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all flex items-center gap-2 cursor-pointer">
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />} Upload File
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {mediaFiles.map((file) => (
                  <div key={file.id} className="group relative rounded-xl bg-black/50 border border-white/10 overflow-hidden aspect-square flex flex-col items-center justify-center hover:border-blue-500/50 transition-colors">
                    {file.file_type?.includes('image') ? <img src={file.file_url} alt="media" className="w-full h-full object-cover" /> : <File size={32} className="text-slate-500" />}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-xs text-white truncate w-full mb-3">{file.file_name}</p>
                      <button onClick={() => { navigator.clipboard.writeText(file.file_url); alert('Copied!'); }} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer">Copy Link</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}