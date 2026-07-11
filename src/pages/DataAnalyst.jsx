// src/pages/DataAnalyst.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { BarChart3, PieChart, Database, FileSpreadsheet, Settings, Cpu, LineChart, Table, CheckCircle2, ArrowRight, ArrowUp, Briefcase, FileText, LayoutDashboard, BrainCircuit, Code2, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Added Supabase Import

// ================= CUSTOM ANIMATED COUNTER COMPONENT =================
const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
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

  return <span ref={ref} className="text-2xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">0{suffix}</span>;
};

// ================= DEFAULT LOCAL DATA BASELINES =================
const defaultQuickStats = [
  { label: "Years in Analytics", value: 1, suffix: "+" },
  { label: "Dashboards Built", value: 12, suffix: "" },
  { label: "Reports Created", value: 45, suffix: "" },
  { label: "Automation Projects", value: 8, suffix: "" },
  { label: "Processes Improved", value: 15, suffix: "" },
  { label: "Hours Saved", value: 120, suffix: "+" }
];

const defaultRolesData = [
  {
    id: 1,
    statusBadge: "Current Role",
    title: "Data Analyst Intern",
    company: "S.P. Madrid",
    responsibilities: [
      "Data Cleaning", "Data Validation", "Data Reconciliation", "Operational Reporting", 
      "Executive Reporting", "Dashboard Preparation", "Power Query", "ODBC Connectivity", 
      "Excel Automation", "Workflow Documentation", "Data Accuracy Verification", 
      "Automation Planning", "Cross-functional Collaboration", "Continuous Improvement", "AI-assisted Productivity"
    ],
    impact: [
      "Support business reporting.", "Improve data consistency.", "Reduce manual processing.",
      "Assist in decision-making.", "Create reusable reporting solutions.", "Prepare business-ready dashboards.",
      "Promote efficient workflows.", "Support process optimization."
    ]
  }
];

const defaultTechnicalSkills = [
  { category: "Data Analysis", skills: ["Microsoft Excel", "Power Query", "Advanced Formulas", "Data Cleaning", "Data Validation", "Conditional Formatting", "Data Consolidation", "Lookup Functions", "Dynamic Arrays", "Dashboard Design", "Data Modeling", "Business Reporting"] },
  { category: "Business Intelligence", skills: ["Dashboard Design", "Executive Reports", "Operational Reporting", "Data Storytelling", "Business Analysis", "Decision Support"] },
  { category: "Database", skills: ["Database Administration", "SQL (Learning)", "PostgreSQL (Learning)", "ODBC", "Supabase (Learning)"] },
  { category: "Programming", skills: ["Python (Learning)", "JavaScript (Learning)", "Automation Scripting", "Future API Integration"] },
  { category: "Documentation", skills: ["Process Documentation", "Workflow Documentation", "Standard Operating Procedures"] }
];

const defaultToolsTechnologies = [
  { 
    category: "Office Productivity", 
    tools: [
      { name: "Microsoft Excel", imageSrc: "/images/excel.png" },
      { name: "Microsoft Word", imageSrc: "/images/word.png" },
      { name: "Microsoft PowerPoint", imageSrc: "/images/powerpoint.png" }
    ] 
  },
  { 
    category: "Data Analysis", 
    tools: [
      { name: "Power Query", imageSrc: "/images/powerquery.png" },
      { name: "Power BI", imageSrc: "/images/powerbi.png" },
      { name: "ODBC", imageSrc: "/images/odbc.png" }
    ] 
  },
  { 
    category: "Databases", 
    tools: [
      { name: "Supabase", imageSrc: "/images/supabase.png" },
      { name: "SQL", imageSrc: "/images/sql.png" },
      { name: "PostgreSQL", imageSrc: "/images/postgresql.png" }
    ] 
  },
  { 
    category: "Programming", 
    tools: [
      { name: "Python", imageSrc: "/images/python.png" },
      { name: "JavaScript", imageSrc: "/images/javascript.png" },
      { name: "React", imageSrc: "/images/react.png" }
    ] 
  },
  { 
    category: "AI Assistance", 
    tools: [
      { name: "ChatGPT", imageSrc: "/images/chatgpt.png" },
      { name: "Claude", imageSrc: "/images/claude.png" },
      { name: "Gemini", imageSrc: "/images/gemini.png" },
      { name: "GitHub Copilot", imageSrc: "/images/copilot.png" }
    ] 
  }
];

const defaultAnalyticsRoadmap = [
  "Power BI", "SQL", "Python", "Pandas", "NumPy", "Data Visualization", "Machine Learning", 
  "Artificial Intelligence", "Predictive Analytics", "Data Engineering Fundamentals", 
  "Cloud Analytics", "Microsoft Fabric", "Azure Data Services", "Business Intelligence Platforms", "Enterprise Reporting Systems"
];

const defaultShowcaseData = {
  dashboards: [{
    id: 1, name: "Executive Sales Dashboard", purpose: "Track monthly recurring revenue and sales team performance.", industry: "Corporate B2B", department: "Sales & Operations",
    description: "A comprehensive overview of top-level sales metrics with drill-down capabilities.", software: "Excel, Power Query", tech: "ODBC, Dynamic Arrays",
    date: "August 2024", status: "Deployed", kpis: ["MRR", "Churn Rate", "Customer Acquisition Cost"], impact: "Reduced reporting time by 4 hours weekly.",
    thumbnail: "/images/dashboard-thumb.jpg"
  }],
  reports: [{
    id: 1, title: "Q3 Operational Efficiency Report", context: "Management required visibility into processing bottlenecks.", objective: "Identify and resolve workflow delays.",
    audience: "C-Level Executives", frequency: "Quarterly", source: "Internal CRM (ODBC)", format: "PDF / Interactive Excel", viz: "Funnel Charts, Bar Graphs",
    findings: "Data entry errors accounted for 40% of delays.", recommendations: "Implement automated data validation rules.", impact: "Improved turnaround time by 15%.", tools: "Excel, Power Query"
  }],
  automations: [{
    id: 1, name: "Automated Reconciliation Script", problem: "Manual matching of 5,000+ records took 2 days.", currentProcess: "VLOOKUPs and manual color coding.",
    painPoints: "High error rate, time-consuming.", objectives: "Reduce reconciliation to under 1 hour.", steps: "1. Extract 2. Clean 3. Auto-Match 4. Flag Discrepancies",
    tech: "Advanced Excel, Power Query", ai: "ChatGPT (Formula optimization)", timeSaved: "14 hours/month", errorReduction: "99%", productivity: "Increased by 300%",
  }],
  caseStudies: [{
    id: 1, problem: "Inconsistent lead tracking resulting in lost sales.", background: "Real estate firm utilizing scattered Google Sheets.", objectives: "Centralize and standardize lead data.",
    collection: "Exported from 5 disparate sources.", cleaning: "Standardized date formats and removed duplicates.", analysis: "Identified peak lead conversion times.",
    visualization: "Conversion heatmaps.", insights: "Leads contacted within 1 hour converted 4x higher.", recommendations: "Set up instant lead alert automation.", impact: "25% increase in total sales volume.", lessons: "Data governance must start at the point of entry."
  }],
  projects: [{
    id: 1, name: "Healthcare Patient Flow Analysis", industry: "Healthcare", overview: "Analyzing patient wait times across departments.", problem: "Patients waiting >2 hours for consultations.",
    objectives: "Map patient flow to identify staffing shortages.", tools: "Excel, SQL (Learning)", tech: "Data Modeling", role: "Data Analyst Intern",
    challenges: "Missing timestamps in legacy system.", solution: "Interpolated missing data based on department averages.", results: "Highlighting peak hours allowed for optimized staff scheduling.", status: "Completed"
  }]
};

export default function DataAnalyst() {
  const [activeTab, setActiveTab] = useState('dashboards');
  const containerRef = useRef(null);

  // ================= DECOUPLED STATE DRIVERS (READY FOR CMS MANAGER LATER) =================
  const [stats, setStats] = useState(defaultQuickStats);
  const [roles, setRoles] = useState(defaultRolesData);
  const [techSkills, setTechSkills] = useState(defaultTechnicalSkills);
  const [showcase, setShowcase] = useState(defaultShowcaseData);
  const [ecosystem, setEcosystem] = useState(defaultToolsTechnologies);
  const [roadmap, setRoadmap] = useState(defaultAnalyticsRoadmap);

  // ================= FETCH CMS DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('data_analyst')
          .select('*')
          .eq('id', 1)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          if (data.performance_counters?.length > 0) setStats(data.performance_counters);
          
          if (data.experience_roles?.length > 0) {
            const formattedRoles = data.experience_roles.map(r => {
              // ================= BRUTE FORCE IMAGE DETECTOR FOR ROLES =================
              let imgUrl = null;
              if (r.logo_url) imgUrl = r.logo_url;
              else if (r.image_url) imgUrl = r.image_url;
              else if (r.image) imgUrl = r.image;
              else if (r.logo) imgUrl = r.logo;
              else if (r.company_logo) imgUrl = r.company_logo;
              
              if (!imgUrl) {
                for (const key in r) {
                  if (typeof r[key] === 'string' && (r[key].startsWith('http') || r[key].includes('supabase.co'))) {
                    imgUrl = r[key];
                    break;
                  }
                }
              }
              // =========================================================================
              
              return {
                ...r,
                customImage: imgUrl, // Save detected image link
                responsibilities: typeof r.responsibilities === 'string' ? r.responsibilities.split(',').map(s => s.trim()).filter(Boolean) : r.responsibilities || [],
                impact: typeof r.impact === 'string' ? r.impact.split(',').map(s => s.trim()).filter(Boolean) : r.impact || []
              };
            });
            setRoles(formattedRoles);
          }
          
          if (data.technical_competencies?.length > 0) {
            // Parse comma-separated strings into arrays safely
            const formattedSkills = data.technical_competencies.map(c => ({
              ...c,
              skills: typeof c.skills === 'string' ? c.skills.split(',').map(s => s.trim()).filter(Boolean) : c.skills || []
            }));
            setTechSkills(formattedSkills);
          }
          
          if (data.software_ecosystem?.length > 0) {
            const formattedEcosystem = data.software_ecosystem.map(cat => ({
              ...cat,
              tools: (cat.tools || []).map(tool => {
                // ================= BRUTE FORCE IMAGE DETECTOR FOR ECOSYSTEM =================
                let imgUrl = null;
                
                // 1. PRIORITIZE CMS UPLOADS OVER LOCAL DEFAULTS
                if (tool.logo_url) imgUrl = tool.logo_url;
                else if (tool.image_url) imgUrl = tool.image_url;
                else if (tool.image) imgUrl = tool.image;
                else if (tool.logo) imgUrl = tool.logo;
                else if (typeof tool.icon === 'string' && tool.icon.includes('http')) imgUrl = tool.icon;
                
                // 2. DEEP SCAN CMS ROW FOR ANY SUPABASE LINK
                if (!imgUrl) {
                  for (const key in tool) {
                    if (typeof tool[key] === 'string' && (tool[key].startsWith('http') || tool[key].includes('supabase.co'))) {
                      imgUrl = tool[key];
                      break;
                    }
                  }
                }

                // 3. FALLBACK TO LOCAL DEFAULT ONLY IF NO CMS UPLOAD WAS FOUND
                if (!imgUrl && tool.imageSrc) {
                  imgUrl = tool.imageSrc;
                }

                return { ...tool, customImage: imgUrl };
                // ============================================================================
              })
            }));
            setEcosystem(formattedEcosystem);
          }

          if (data.future_roadmap?.length > 0) setRoadmap(data.future_roadmap);

          // Handle 5-Tab Showcase Logic safely
          const formattedDashboards = (data.portfolio_dashboards || []).map(d => ({
            ...d,
            kpis: typeof d.kpis === 'string' ? d.kpis.split(',').map(s => s.trim()).filter(Boolean) : d.kpis || []
          }));

          setShowcase({
            dashboards: formattedDashboards.length > 0 ? formattedDashboards : defaultShowcaseData.dashboards,
            reports: data.portfolio_reports?.length > 0 ? data.portfolio_reports : defaultShowcaseData.reports,
            automations: data.portfolio_automations?.length > 0 ? data.portfolio_automations : defaultShowcaseData.automations,
            caseStudies: data.portfolio_case_studies?.length > 0 ? data.portfolio_case_studies : defaultShowcaseData.caseStudies,
            projects: data.portfolio_projects?.length > 0 ? data.portfolio_projects : defaultShowcaseData.projects,
          });
        }
      } catch (err) {
        console.error('Error fetching Data Analyst CMS data:', err.message);
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
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden relative selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Corporate Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Neon Green Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-lime-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-20 px-6 min-h-[85vh] flex flex-col items-center justify-center z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <LineChart size={14} /> Data Analyst Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8">
            Transforming Data into <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">Business Decisions.</span>
          </h1>
          <div className="text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto space-y-4 mb-12">
            <p><strong>Data tells stories.</strong> I help organizations uncover those stories by transforming raw information into actionable insights through reporting, dashboards, automation, and analytical thinking.</p>
            <p>As a Data Analyst Intern, I continuously learn how data can improve operations, increase efficiency, and support strategic business decisions.</p>
          </div>

          {/* Quick Statistics Grid with Animated Counters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm flex flex-col items-center justify-center hover:border-emerald-500/50 transition-colors group">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-[10px] text-slate-400 uppercase tracking-wider text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= PROFESSIONAL SUMMARY & HORIZONTAL SWIPEABLE ROLES ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Professional Summary */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Professional Summary</h3>
              <div className="w-12 h-1 bg-emerald-500 rounded-full" />
              <div className="text-slate-400 space-y-4 text-sm leading-relaxed">
                <p>Jefferson Gonzales is currently a Data Analyst Intern at S.P. Madrid, where he applies analytical thinking to support business operations.</p>
                <p>His responsibilities include collecting, organizing, cleaning, validating, and analyzing operational data before transforming it into reports and dashboards that help stakeholders make informed decisions.</p>
                <p>Drawing from his background in graphic design, Jefferson also focuses on presenting analytical findings in clear, visually engaging, and user-friendly formats.</p>
                <p>Beyond reporting, he is actively exploring workflow automation, business intelligence, and AI-assisted analytics to reduce repetitive work and improve organizational efficiency.</p>
              </div>
            </motion.div>

            {/* Horizontally Swipeable Experience Tracks Container */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 w-full overflow-hidden">
              <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth">
                {roles.map((role) => (
                  <div key={role.id} className="shrink-0 w-full snap-center p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                    
                    {/* CUSTOM ROLE IMAGE RENDERER */}
                    <div className="absolute top-0 right-0 p-6 pointer-events-none z-0">
                      {role.customImage ? (
                         // REMOVED GRAYSCALE AND INCREASED DEFAULT OPACITY SO IT IS FULLY COLORED
                         <img src={role.customImage} alt={role.company} className="w-32 h-32 object-contain opacity-40 group-hover:opacity-100 transition-opacity" />
                      ) : (
                         <div className="opacity-5 group-hover:text-emerald-500 transition-colors">
                           <Briefcase size={120} />
                         </div>
                      )}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          {role.statusBadge}
                        </span>
                      </div>
                      <h4 className="text-2xl font-black text-white">{role.title}</h4>
                      <p className="text-lime-400 font-semibold mb-8">{role.company}</p>

                      <h5 className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">Core Responsibilities</h5>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {role.responsibilities.map((item, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 text-xs text-slate-300">
                            {item}
                          </span>
                        ))}
                      </div>

                      <h5 className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">Professional Impact</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {role.impact.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= TECHNICAL SKILLS ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Technical Competencies</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techSkills.map((section, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                  {index === 0 && <BarChart3 size={18} className="text-emerald-400" />}
                  {index === 1 && <PieChart size={18} className="text-lime-400" />}
                  {index === 2 && <Database size={18} className="text-teal-400" />}
                  {index === 3 && <Code2 size={18} className="text-cyan-400" />}
                  {index === 4 && <FileText size={18} className="text-slate-400" />}
                  {section.category}
                </h4>
                <ul className="space-y-2">
                  {section.skills.map((skill, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                      <span className={skill.includes('Learning') || skill.includes('Future') ? 'italic text-slate-500' : ''}>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ANALYTICS PORTFOLIO (TABBED SHOWCASE) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Analytics Portfolio</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">A structured showcase of dashboards, reporting, automations, and analytical case studies.</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['dashboards', 'reports', 'automations', 'caseStudies', 'projects'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all capitalize ${activeTab === tab ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}>
                {tab.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>

          {/* Showcase Content Area */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboards' && (
                <motion.div key="dashboards" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {showcase.dashboards?.map(item => (
                    <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden flex flex-col group hover:border-emerald-500/50 transition-colors">
                      <div className="h-48 bg-slate-800 relative flex items-center justify-center overflow-hidden">
                         <LayoutDashboard size={40} className="text-slate-700 group-hover:text-emerald-500/20 transition-colors" />
                         <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold rounded">{item.status}</div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-xs text-emerald-400 font-bold mb-1">{item.department} • {item.industry}</span>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{item.name}</h4>
                        <p className="text-sm text-slate-400 mb-4">{item.purpose}</p>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                          <div><span className="text-slate-500 block">Software:</span><span className="text-slate-300">{item.software}</span></div>
                          <div><span className="text-slate-500 block">KPIs Tracked:</span><span className="text-slate-300">{item.kpis.join(", ")}</span></div>
                        </div>
                        <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center">
                          <span className="text-xs text-lime-400 font-semibold">Impact: {item.impact}</span>
                          <button className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">View Details <ArrowRight size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'reports' && (
                <motion.div key="reports" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {showcase.reports?.map(item => (
                    <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-emerald-500/50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-lime-500/10 flex items-center justify-center text-lime-400"><FileSpreadsheet size={24} /></div>
                        <span className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-400">{item.frequency}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-400 mb-6">{item.objective}</p>
                      <div className="space-y-3 text-xs mb-6">
                        <div className="flex justify-between border-b border-slate-800 pb-1"><span className="text-slate-500">Audience</span><span className="text-slate-300">{item.audience}</span></div>
                        <div className="flex justify-between border-b border-slate-800 pb-1"><span className="text-slate-500">Data Source</span><span className="text-slate-300">{item.source}</span></div>
                        <div className="flex justify-between border-b border-slate-800 pb-1"><span className="text-slate-500">Key Finding</span><span className="text-emerald-300 font-semibold text-right w-2/3">{item.findings}</span></div>
                      </div>
                      <button className="w-full py-2 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-emerald-600 transition-colors">Preview Report</button>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'automations' && (
                <motion.div key="automations" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 gap-8">
                  {showcase.automations?.map(item => (
                    <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:p-8 flex flex-col md:flex-row gap-8 hover:border-emerald-500/50 transition-colors group">
                      <div className="md:w-1/3 border-r border-slate-800 pr-6">
                        <Cpu size={32} className="text-emerald-400 mb-4" />
                        <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
                        <p className="text-xs text-slate-400 mb-6">{item.problem}</p>
                        <div className="space-y-4">
                          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                            <span className="text-[10px] text-slate-500 uppercase block mb-1">Time Saved</span>
                            <span className="text-lg font-black text-lime-400">{item.timeSaved}</span>
                          </div>
                          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                            <span className="text-[10px] text-slate-500 uppercase block mb-1">Productivity</span>
                            <span className="text-lg font-black text-lime-400">{item.productivity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h5 className="text-sm font-bold text-white mb-3">Workflow Transformation</h5>
                        <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5"><span className="text-rose-400 font-bold block mb-1">Before:</span><span className="text-slate-400">{item.currentProcess}</span></div>
                          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10"><span className="text-emerald-400 font-bold block mb-1">After:</span><span className="text-emerald-100">{item.steps}</span></div>
                        </div>
                        <div className="flex gap-2">
                           <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">{item.tech}</span>
                           <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300 border border-emerald-500/30">AI: {item.ai}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'caseStudies' && (
                <motion.div key="caseStudies" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 gap-6">
                   {showcase.caseStudies?.map(item => (
                     <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-emerald-500/50 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                           <BrainCircuit className="text-emerald-400" size={24}/>
                           <h4 className="text-lg font-bold text-white">Analytical Case Study</h4>
                        </div>
                        <h5 className="text-base text-slate-300 mb-4 font-semibold">Problem: {item.problem}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div className="p-3 bg-slate-800/50 rounded-lg"><span className="text-slate-400 font-bold block mb-1">Analysis:</span><span className="text-slate-300">{item.analysis}</span></div>
                          <div className="p-3 bg-slate-800/50 rounded-lg"><span className="text-lime-400 font-bold block mb-1">Insights:</span><span className="text-slate-300">{item.insights}</span></div>
                          <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20"><span className="text-emerald-400 font-bold block mb-1">Business Impact:</span><span className="text-emerald-100">{item.impact}</span></div>
                        </div>
                      </div>
                   ))}
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {showcase.projects?.map(item => (
                     <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col hover:border-emerald-500/50 transition-colors group">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">{item.industry}</span>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{item.name}</h4>
                        <p className="text-sm text-slate-400 mb-6">{item.overview}</p>
                        <div className="mt-auto pt-4 border-t border-slate-800">
                           <span className="text-xs text-slate-500 block mb-2">Tools Used:</span>
                           <div className="flex gap-2"><span className="px-2 py-1 bg-slate-800 text-[10px] text-emerald-400 border border-emerald-500/20 rounded">{item.tools}</span></div>
                        </div>
                     </div>
                   ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= 52. SOFTWARE ECOSYSTEM (WITH LOGOS) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Software Ecosystem</h3>
            <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto" />
          </div>
          
          <div className="space-y-16">
            {ecosystem.map((cat, idx) => (
              <div key={idx} className="relative">
                <h4 className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest mb-6 text-center border-b border-slate-800/60 pb-3 max-w-sm mx-auto">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  {cat.tools.map((tool, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex flex-col items-center gap-3 w-24 sm:w-28 group"
                    >
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 overflow-hidden hover:border-emerald-500/40 relative">
                        {/* ECOSYSTEM IMAGE RENDERING APPLIED HERE */}
                        <img 
                          src={tool.customImage || tool.imageSrc} 
                          alt={tool.name} 
                          className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity absolute inset-0 m-auto z-10" 
                          onError={(e) => { 
                              e.target.style.display = 'none'; 
                              e.target.nextSibling.style.display = 'block'; 
                          }}
                        />
                        {/* Fallback Icon if image file is not found */}
                        <Settings size={24} className="text-slate-600 hidden absolute inset-0 m-auto z-0" />
                      </div>
                      <span className="text-[10px] md:text-xs text-center font-semibold text-slate-400 group-hover:text-emerald-300 transition-colors">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FUTURE ANALYTICS ROADMAP ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-black text-white mb-4 flex items-center justify-center gap-3">
              <ArrowRight className="text-lime-500" /> Future Analytics Roadmap
            </h3>
            <div className="w-12 h-[1px] bg-zinc-800 mx-auto mt-2" />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
             {roadmap.map((item, i) => (
               <span key={i} className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 text-xs rounded-lg hover:border-emerald-500/50 hover:text-emerald-300 transition-colors cursor-default">
                 {item}
               </span>
             ))}
          </div>
        </div>
      </section>

      {/* ================= 54. ANALYTICS PHILOSOPHY ================= */}
      <section className="py-24 px-6 relative z-10 border-t border-slate-800/50 text-center">
        <div className="max-w-4xl mx-auto">
           <Quote size={40} className="text-emerald-500/30 mx-auto mb-6" />
           <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Data Should Drive <span className="text-emerald-400">Better Decisions.</span></h2>
           <div className="text-base md:text-lg text-slate-400 leading-relaxed space-y-4">
             <p>Every number represents an opportunity to improve a business.</p>
             <p>My goal as a Data Analyst is not simply to produce reports, but to transform information into meaningful insights that support better planning, smarter operations, and measurable business improvements.</p>
             <p>I believe effective analytics requires more than technical skills—it requires curiosity, critical thinking, communication, and a deep understanding of business objectives.</p>
             <p>By combining analytical methods with creative presentation and modern technology, I strive to make complex information accessible, actionable, and valuable for decision-makers.</p>
           </div>
        </div>
      </section>

      {/* ================= 56. TRANSITION TO THE NEXT JOURNEY ================= */}
      <section className="w-full relative border-t border-slate-800 mt-16 pt-32 pb-24 px-6 overflow-hidden z-10">
        
        {/* Aesthetic Shift Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/80 to-purple-950/90 -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-cyan-500/10 blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6">
              <Code2 size={14} /> The Next Chapter
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Convergence of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Data & Code.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Every stage of my career builds upon the previous one. The transition from a creative professional to a data-driven analyst reflects my evolution from crafting visual stories to uncovering the insights that drive them.
              <br/><br/>
              The next chapter introduces my journey into AI-Assisted Full-Stack Development, where creativity, analytics, automation, and software engineering converge into one unified vision.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => window.location.href = '/ai-developer'}
                className="px-8 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-2 cursor-pointer relative z-20">
                Continue as AI Developer <ArrowRight size={16} />
              </button>
              
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl bg-slate-800/50 border border-slate-600 hover:bg-slate-700 text-white font-bold text-sm transition-colors flex items-center gap-2 backdrop-blur-md cursor-pointer relative z-20">
                <ArrowUp size={16} /> Back to Top 
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}