// src/pages/DataAnalyst.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { 
  BarChart3, PieChart, Database, FileSpreadsheet, Settings, Cpu, LineChart, 
  Table, CheckCircle2, ArrowRight, ArrowUp, ArrowDown, Briefcase, FileText, LayoutDashboard, 
  BrainCircuit, Code2, Quote, Download, ListChecks, TrendingUp, Network, Sigma 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
// import { useMobileBack } from '../hooks/useMobileBack';

// ================= CUSTOM ANIMATED COUNTER COMPONENT =================
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(val) {
          setCount(Math.floor(val));
        }
      });
      return () => controls.stop();
    }
  }, [value, inView]);

  return <span ref={ref} className="text-2xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">{count}{suffix}</span>;
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
  { category: "Data Analysis", icon: Table, skills: ["Microsoft Excel", "Power Query", "Advanced Formulas", "Data Cleaning", "Data Validation", "Conditional Formatting", "Data Consolidation", "Lookup Functions", "Dynamic Arrays", "Dashboard Design", "Data Modeling", "Business Reporting"] },
  { category: "Data Visualization", icon: PieChart, skills: ["Executive Reports", "Data Storytelling", "Power BI (Learning)", "Tableau (Learning)", "Looker Studio (Learning)", "KPI Dashboards (Learning)"] },
  { category: "Programming", icon: Code2, skills: ["Python", "Automation Scripting", "OpenPyXL", "Pandas (Learning)", "NumPy (Learning)", "Matplotlib (Learning)", "Plotly (Learning)", "JavaScript (Learning)"] },
  { category: "Database", icon: Database, skills: ["Database Administration", "ODBC", "SQL (Learning)", "PostgreSQL (Learning)", "MySQL (Learning)", "Window Functions (Learning)", "CTEs (Learning)", "Views (Learning)", "Stored Procedures (Learning)", "Database Design (Learning)"] },
  { category: "Data Engineering", icon: Network, skills: ["ETL / ELT (Learning)", "Data Pipelines (Learning)", "Data Integration (Learning)", "REST APIs (Learning)", "JSON (Learning)", "API Integration (Learning)", "Data Warehousing (Learning)"] },
  { category: "Statistics", icon: Sigma, skills: ["Descriptive Statistics (Learning)", "Correlation Analysis (Learning)", "Hypothesis Testing (Learning)", "Regression Analysis (Learning)", "Forecasting (Learning)", "A/B Testing (Learning)"] },
  { category: "Cloud", icon: Cpu, skills: ["Microsoft Azure (Learning)", "Google Cloud Platform (Learning)", "Amazon Web Services (Learning)"] },
  { category: "AI & Analytics", icon: BrainCircuit, skills: ["ChatGPT", "Claude", "Gemini", "Prompt Engineering", "AI-Assisted Data Analysis", "LLM Fundamentals (Learning)", "Retrieval-Augmented Generation (Learning)"] },
  { category: "Development Tools", icon: Settings, skills: ["Git", "GitHub", "Visual Studio Code", "Jupyter Notebook (Learning)"] }
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
  { category: "Data Analysis", tools: [{ name: "Power Query", imageSrc: "/images/powerquery.png" }, { name: "Power BI", imageSrc: "/images/powerbi.png" }, { name: "ODBC", imageSrc: "/images/odbc.png" }] },
  { category: "Databases", tools: [{ name: "Supabase", imageSrc: "/images/supabase.png" }, { name: "SQL", imageSrc: "/images/sql.png" }, { name: "PostgreSQL", imageSrc: "/images/postgresql.png" }] },
  { category: "Programming", tools: [{ name: "Python", imageSrc: "/images/python.png" }, { name: "JavaScript", imageSrc: "/images/javascript.png" }, { name: "React", imageSrc: "/images/react.png" }] },
  { category: "AI Assistance", tools: [{ name: "ChatGPT", imageSrc: "/images/chatgpt.png" }, { name: "Claude", imageSrc: "/images/claude.png" }, { name: "Gemini", imageSrc: "/images/gemini.png" }, { name: "GitHub Copilot", imageSrc: "/images/copilot.png" }] }
];

const defaultShowcaseData = { dashboards: [], reports: [], automations: [], caseStudies: [], projects: [] };

export default function DataAnalyst() {
  const [activeTab, setActiveTab] = useState('dashboards');
  const containerRef = useRef(null);

  const [stats, setStats] = useState(defaultQuickStats);
  const [roles, setRoles] = useState(defaultRolesData);
  const [techSkills, setTechSkills] = useState(defaultTechnicalSkills);
  const [showcase, setShowcase] = useState(defaultShowcaseData);
  const [ecosystem, setEcosystem] = useState(defaultToolsTechnologies);
  const [pageResume, setPageResume] = useState(null);

  // ================= DYNAMIC CATEGORIZATION LOGIC =================
  const groupResponsibilities = (resps) => {
    const groups = {
      "Data Processing & Integrity": [],
      "Reporting & Dashboards": [],
      "Technical & Automation": [],
      "Strategy & Collaboration": []
    };

    resps.forEach(r => {
      const lower = r.toLowerCase();
      if (lower.includes('clean') || lower.includes('valid') || lower.includes('reconcil') || lower.includes('accur')) {
        groups["Data Processing & Integrity"].push(r);
      } else if (lower.includes('report') || lower.includes('dashboard')) {
        groups["Reporting & Dashboards"].push(r);
      } else if (lower.includes('query') || lower.includes('odbc') || lower.includes('automat') || lower.includes('ai')) {
        groups["Technical & Automation"].push(r);
      } else {
        groups["Strategy & Collaboration"].push(r);
      }
    });

    return Object.entries(groups).filter(([_, items]) => items.length > 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('data_analyst').select('*').eq('id', 1).single();
        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          if (Array.isArray(data.performance_counters) && data.performance_counters.length > 0) setStats(data.performance_counters);
          
          if (Array.isArray(data.experience_roles) && data.experience_roles.length > 0) {
            const formattedRoles = data.experience_roles.map(r => {
              let imgUrl = null;
              if (r.logo_url) imgUrl = r.logo_url;
              else if (r.image_url) imgUrl = r.image_url;
              else if (r.image) imgUrl = r.image;
              else if (r.logo) imgUrl = r.logo;
              else if (r.company_logo) imgUrl = r.company_logo;
              if (!imgUrl) {
                for (const key in r) {
                  if (typeof r[key] === 'string' && (r[key].startsWith('http') || r[key].includes('supabase.co'))) {
                    imgUrl = r[key]; break;
                  }
                }
              }
              return {
                ...r,
                customImage: imgUrl,
                responsibilities: typeof r.responsibilities === 'string' ? r.responsibilities.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(r.responsibilities) ? r.responsibilities : []),
                impact: typeof r.impact === 'string' ? r.impact.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(r.impact) ? r.impact : [])
              };
            });
            setRoles(formattedRoles);
          }
          
          if (Array.isArray(data.technical_competencies) && data.technical_competencies.length > 0) {
            const formattedSkills = data.technical_competencies.map((c, index) => {
              const defaultIcon = defaultTechnicalSkills[index]?.icon || FileText;
              return {
                ...c, icon: defaultIcon,
                skills: typeof c.skills === 'string' ? c.skills.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(c.skills) ? c.skills : [])
              }
            });
            setTechSkills(formattedSkills);
          }
          
          if (Array.isArray(data.software_ecosystem) && data.software_ecosystem.length > 0) {
            const formattedEcosystem = data.software_ecosystem.map(cat => {
              let parsedTools = [];
              if (Array.isArray(cat.tools)) parsedTools = cat.tools;
              else if (typeof cat.tools === 'string') parsedTools = cat.tools.split(',').map(t => ({ name: t.trim() }));

              return {
                ...cat,
                tools: parsedTools.map(tool => {
                  let imgUrl = null;
                  if (typeof tool === 'object' && tool !== null) {
                    if (tool.logo_url) imgUrl = tool.logo_url; else if (tool.image_url) imgUrl = tool.image_url;
                    else if (tool.image) imgUrl = tool.image; else if (tool.logo) imgUrl = tool.logo;
                    else if (tool.icon_url) imgUrl = tool.icon_url; else if (typeof tool.icon === 'string' && tool.icon.includes('http')) imgUrl = tool.icon;
                    if (!imgUrl) {
                      for (const key in tool) {
                        if (typeof tool[key] === 'string' && (tool[key].startsWith('http') || tool[key].includes('supabase.co'))) {
                          imgUrl = tool[key]; break;
                        }
                      }
                    }
                  }
                  if (!imgUrl && tool.imageSrc) imgUrl = tool.imageSrc;
                  return { ...(typeof tool === 'object' ? tool : { name: tool }), customImage: imgUrl };
                })
              };
            });
            setEcosystem(formattedEcosystem);
          }

          const formattedDashboards = Array.isArray(data.portfolio_dashboards) ? data.portfolio_dashboards.map(d => ({
            ...d, kpis: typeof d.kpis === 'string' ? d.kpis.split(',').map(s => s.trim()).filter(Boolean) : (Array.isArray(d.kpis) ? d.kpis : [])
          })) : [];

          setShowcase({
            dashboards: formattedDashboards.length > 0 ? formattedDashboards : defaultShowcaseData.dashboards,
            reports: Array.isArray(data.portfolio_reports) && data.portfolio_reports.length > 0 ? data.portfolio_reports : defaultShowcaseData.reports,
            automations: Array.isArray(data.portfolio_automations) && data.portfolio_automations.length > 0 ? data.portfolio_automations : defaultShowcaseData.automations,
            caseStudies: Array.isArray(data.portfolio_case_studies) && data.portfolio_case_studies.length > 0 ? data.portfolio_case_studies : defaultShowcaseData.caseStudies,
            projects: Array.isArray(data.portfolio_projects) && data.portfolio_projects.length > 0 ? data.portfolio_projects : defaultShowcaseData.projects,
          });
        }
        
        const { data: allResumes, error: resumeError } = await supabase.from('portfolio_resumes').select('*');
        if (allResumes && !resumeError && allResumes.length > 0) {
          const analystResume = allResumes.find(res => res.title.toLowerCase().includes('data') || res.title.toLowerCase().includes('analyst')) || allResumes[0]; 
          setPageResume(analystResume);
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

  const EmptyState = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full py-16 flex flex-col items-center justify-center text-slate-500 font-mono text-sm border border-dashed border-slate-700 bg-slate-900/30 rounded-2xl col-span-full">
      <Database size={32} className="mb-4 opacity-40 text-emerald-500" />
      <p className="text-center px-4 max-w-md">Case Studies Pending. Real-world project data is currently being prepared and validated for showcase.</p>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden relative selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Backgrounds */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-lime-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-35 md:pt-48 pb-20 px-6 min-h-[85vh] flex flex-col items-center justify-center z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto text-center">
          
          <h1 className="text-[38px] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-8">
            Transforming Data <br className="md:hidden" />
            <span className="hidden md:inline">into </span>
            <span className="md:hidden">into </span>
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">
              <span className="md:hidden">Business <br /> Decisions.</span>
              <span className="hidden md:inline">Business Decisions.</span>
            </span>
          </h1>

          <div className="text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto space-y-4 mb-10">
            <p><strong>Data tells stories.</strong> I help organizations uncover those stories by transforming raw information into actionable insights through reporting, dashboards, automation, and analytical thinking.</p>
            <p>As a Data Analyst Intern, I continuously learn how data can improve operations, increase efficiency, and support strategic business decisions.</p>
          </div>

          {/* ADDED: Button directing to Analytics Portfolio */}
          <div className="flex justify-center mb-23 md:mb-12">
            <button 
              onClick={() => scrollToSection('analytics-portfolio')}
              className="px-8 py-3.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center gap-2 cursor-pointer relative z-20"
            >
              <LayoutDashboard size={18} />
              View Analytics Portfolio
              <ArrowDown size={16} className="ml-1" />
            </button>
          </div>

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

      {/* ================= 2. PROFESSIONAL SUMMARY & ROLE (CATEGORIZED GROUPS) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
            
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16 space-y-6">
            <h3 className="text-2xl md:text-4xl font-black text-white">Professional Summary</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto" />
            <div className="text-slate-300 space-y-5 text-sm md:text-[15px] leading-relaxed tracking-wide text-left mt-8">
              <p>Jefferson Gonzales is currently a Data Analyst Intern at S.P. Madrid, where he applies analytical thinking to support business operations.</p>
              <p>His responsibilities include collecting, organizing, cleaning, validating, and analyzing operational data before transforming it into reports and dashboards that help stakeholders make informed decisions.</p>
              <p>Drawing from his background in graphic design, Jefferson also focuses on presenting analytical findings in clear, visually engaging, and user-friendly formats.</p>
              <p>Beyond reporting, he is actively exploring workflow automation, business intelligence, and AI-assisted analytics to reduce repetitive work and improve organizational efficiency.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full flex justify-center mt-12">
            {roles.map((role) => (
              <motion.div key={role.id} whileHover={{ scale: 1.01, borderColor: 'rgba(16, 185, 129, 0.4)' }} transition={{ duration: 0.3 }}
                className="w-full max-w-4xl p-6 md:p-10 rounded-3xl bg-[#0f172a] border border-slate-800 shadow-2xl relative overflow-hidden group transition-colors">
                
                <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/5 transition-colors duration-500 rounded-3xl z-0"/>
                
                <div className="relative z-10">
                  
                  {/* ALIGNED HEADER: Logo side-by-side on mobile and PC */}
                  <div className="flex flex-row items-center mb-8 gap-4 md:gap-5">
                    <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center p-2 shadow-lg group-hover:border-emerald-500/30 transition-colors">
                      {role.customImage ? ( <img src={role.customImage} alt={role.company} className="w-full h-full object-contain" /> ) : ( <Briefcase size={32} className="text-emerald-500/50" /> )}
                    </div>
                    <div>
                      <div className="mb-1 md:mb-2">
                        <span className="px-2 md:px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-[10px] md:text-[11px] font-black uppercase tracking-wider shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                          {role.statusBadge}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">{role.title}</h4>
                      <p className="text-sm md:text-base text-lime-400 font-semibold">{role.company}</p>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h5 className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <ListChecks size={14} className="text-emerald-500" />
                      Core Responsibilities
                    </h5>
                    
                    {/* CATEGORIZED GROUPING (Alternative B) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {groupResponsibilities(role.responsibilities).map(([groupName, items], idx) => (
                        <div key={idx} className="bg-slate-800/20 p-5 rounded-2xl border border-slate-700/50 hover:bg-slate-800/40 transition-colors">
                          <h6 className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-3 border-b border-slate-700 pb-2">{groupName}</h6>
                          <ul className="space-y-2">
                            {items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-slate-500 text-xs mt-0.5">▹</span>
                                <span className="text-xs md:text-sm text-slate-300 leading-tight">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h5 className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                    <TrendingUp size={14} className="text-emerald-500" />
                    Professional Impact
                  </h5>
                  <div className="bg-slate-800/30 p-5 md:p-6 rounded-2xl border border-slate-700/50">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                      {role.impact.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" /> 
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 3. TECHNICAL COMPETENCIES (MASONRY LAYOUT) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Technical Competencies</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto" />
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {techSkills.map((section, index) => {
              const IconComponent = section.icon || FileText;
              return (
                <motion.div key={index} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.05 }}
                  className="break-inside-avoid p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-colors group mb-6 inline-block w-full">
                  
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                    <IconComponent size={20} className="text-emerald-400 shrink-0" />
                    {section.category}
                  </h4>
                  
                  <ul className="space-y-2">
                    {section.skills.map((skill, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0 mt-1.5" />
                        <span className={skill.includes('Learning') || skill.includes('Future') ? 'italic text-slate-500' : 'text-slate-300'}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ANALYTICS PORTFOLIO (WITH ID FOR SCROLLING) ================= */}
      <section id="analytics-portfolio" className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Analytics Portfolio</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto mb-6" />
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">A structured showcase of dashboards, reporting, automations, and analytical case studies.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['dashboards', 'reports', 'automations', 'caseStudies', 'projects'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all capitalize ${activeTab === tab ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}>
                {tab.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboards' && (
                <motion.div key="dashboards" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {showcase.dashboards?.length > 0 ? showcase.dashboards.map(item => (
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
                  )) : <EmptyState />}
                </motion.div>
              )}

              {activeTab === 'reports' && (
                <motion.div key="reports" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {showcase.reports?.length > 0 ? showcase.reports.map(item => (
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
                  )) : <EmptyState />}
                </motion.div>
              )}

              {activeTab === 'automations' && (
                <motion.div key="automations" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 gap-8">
                  {showcase.automations?.length > 0 ? showcase.automations.map(item => (
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
                  )) : <EmptyState />}
                </motion.div>
              )}

              {activeTab === 'caseStudies' && (
                <motion.div key="caseStudies" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 gap-6">
                   {showcase.caseStudies?.length > 0 ? showcase.caseStudies.map(item => (
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
                   )) : <EmptyState />}
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {showcase.projects?.length > 0 ? showcase.projects.map(item => (
                     <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col hover:border-emerald-500/50 transition-colors group">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2">{item.industry}</span>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{item.name}</h4>
                        <p className="text-sm text-slate-400 mb-6">{item.overview}</p>
                        <div className="mt-auto pt-4 border-t border-slate-800">
                           <span className="text-xs text-slate-500 block mb-2">Tools Used:</span>
                           <div className="flex gap-2"><span className="px-2 py-1 bg-slate-800 text-[10px] text-emerald-400 border border-emerald-500/20 rounded">{item.tools}</span></div>
                        </div>
                     </div>
                   )) : <EmptyState />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= SOFTWARE ECOSYSTEM (3-COLUMN PC GRID) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Software Ecosystem</h3>
            <div className="w-12 h-1 bg-emerald-500 rounded-full mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {ecosystem.map((cat, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                <h4 className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest mb-6 text-center border-b border-slate-800/60 pb-3 w-full max-w-[200px]">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {cat.tools.map((tool, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex flex-col items-center gap-3 w-20 sm:w-24 group"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border border-slate-800 bg-slate-900/50 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 overflow-hidden hover:border-emerald-500/40 relative">
                        <img 
                          src={tool.customImage} 
                          alt={tool.name} 
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity absolute inset-0 m-auto z-10" 
                          onError={(e) => { 
                              e.target.style.display = 'none'; 
                              e.target.nextSibling.style.display = 'block'; 
                          }}
                        />
                        <Settings size={20} className="text-slate-600 hidden absolute inset-0 m-auto z-0" />
                      </div>
                      <span className="text-[10px] text-center font-semibold text-slate-400 group-hover:text-emerald-300 transition-colors leading-tight">
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

      {/* ================= FUTURE ANALYTICS ROADMAP (WRITTEN FORMAT) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-white mb-4 flex items-center justify-center gap-3">
              <ArrowRight className="text-lime-500" /> Future Analytics Roadmap
            </h3>
            <div className="w-12 h-[1px] bg-zinc-800 mx-auto mt-2" />
          </div>
          
          <div className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium text-left md:text-center">
            <p>
              My continuous learning journey is focused on evolving from operational reporting to advanced analytics and robust data engineering. Currently, I am deepening my foundational knowledge in <span className="text-emerald-400 font-bold">SQL</span> (including CTEs and Window Functions) and <span className="text-emerald-400 font-bold">Python</span> (utilizing libraries like Pandas and NumPy) for complex data manipulation. To elevate my business intelligence capabilities, I am actively exploring <span className="text-emerald-400 font-bold">Power BI</span> and <span className="text-emerald-400 font-bold">Tableau</span> to build dynamic, executive-ready dashboards.
            </p>
            <p>
              Looking further ahead, my roadmap bridges the gap between analytics and engineering. I aim to master modern data pipelines by learning <span className="text-emerald-400 font-bold">ETL/ELT workflows</span>, <span className="text-emerald-400 font-bold">REST APIs</span>, and tools like <span className="text-emerald-400 font-bold">dbt</span> and <span className="text-emerald-400 font-bold">Apache Airflow</span>, eventually scaling these solutions on cloud platforms like <span className="text-emerald-400 font-bold">Azure</span> or <span className="text-emerald-400 font-bold">AWS</span>. 
            </p>
            <p>
              Ultimately, I plan to integrate <span className="text-emerald-400 font-bold">Applied Statistics</span> and <span className="text-emerald-400 font-bold">AI-Assisted Analytics</span>—such as LLM fundamentals and Retrieval-Augmented Generation (RAG)—into my workflow. This will empower me to not just report on past performance, but to forecast future trends and engineer highly scalable, intelligent data solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ANALYTICS PHILOSOPHY ================= */}
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

      {/* ================= PAGE RESUME DOWNLOAD ================= */}
      {pageResume && (
        <section className="w-full px-6 pt-10 pb-6 z-10 relative flex justify-center border-t border-slate-800/50 bg-slate-900/20">
          <motion.a
            href={pageResume.file_url || pageResume.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-slate-900 border border-emerald-500/30 hover:border-emerald-500 transition-all group backdrop-blur-md cursor-pointer relative z-20 shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Download size={20} />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-semibold mb-0.5">Download Professional Resume</span>
              <span className="text-sm md:text-base font-bold text-white group-hover:text-emerald-400 transition-colors block">
                {pageResume.title || 'Data Analyst Resume'}
              </span>
            </div>
          </motion.a>
        </section>
      )}

      {/* ================= TRANSITION TO THE NEXT JOURNEY ================= */}
      <section className="w-full relative border-t border-slate-800 mt-16 pt-32 pb-24 px-6 overflow-hidden z-10">
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