// src/pages/DataAnalyst.jsx
import React, { useRef, useEffect, useState } from 'react';
// Retention: keeping frame-motion import for existing animations
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'; 
// Add these new icons: TrendingUp, BrainCircuit, Network, Sigma, Search
import { BarChart3, PieChart, Database, FileSpreadsheet, Settings, Cpu, LineChart, Table, CheckCircle2, ArrowRight, ArrowUp, Briefcase, FileText, LayoutDashboard, Code2, Download, ListChecks, TrendingUp, BrainCircuit, Network, Sigma, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
// useMobileBack hooks import, etc.

// ================= CUSTOM ANIMATED COUNTER COMPONENT (FIXED FOR REACT) =================
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
    // These remain the same
    impact: [
      "Support business reporting.", "Improve data consistency.", "Reduce manual processing.",
      "Assist in decision-making.", "Create reusable reporting solutions.", "Prepare business-ready dashboards.",
      "Promote efficient workflows.", "Support process optimization."
    ]
  }
];

// UPDATED: Icons assigned to categories
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

// ================= THE COMPONENT =================
export default function DataAnalyst() {
  const [activeTab, setActiveTab] = useState('dashboards');
  const containerRef = useRef(null);

  const [stats, setStats] = useState(defaultQuickStats);
  const [roles, setRoles] = useState(defaultRolesData);
  const [techSkills, setTechSkills] = useState(defaultTechnicalSkills);
  // other states for ecosystem, showcase, roadmap, resume...

  // Retention: Supabase fetching effect remains here...

  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden relative selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* BACKGROUNDS (Grid & Neon Glows) - Retention */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
           style={{ backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-lime-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ================= HERO SECTION - Retention ================= */}
      {/* ... (Your Hero Section Code) ... */}

      {/* ================= PROFESSIONAL SUMMARY & CURRENT ROLE (Horizontal Layout) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Professional Summary - Retention */}
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

            {/* Current Role Track Container - Stacked Vertically */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 space-y-6 w-full">
              {roles.map((role) => (
                {/* Minimal Animation: Added whileHover scale */}
                <motion.div key={role.id} 
                  whileHover={{ scale: 1.015, borderColor: 'rgba(16, 185, 129, 0.4)' }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden group transition-colors">
                  
                  {/* Glow Effect on hover - Minimal addition */}
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/5 transition-colors duration-500 rounded-3xl z-0"/>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                            {role.statusBadge}
                          </span>
                        </div>
                        <h4 className="text-2xl font-black text-white">{role.title}</h4>
                        <p className="text-lime-400 font-semibold">{role.company}</p>
                      </div>
                      
                      {/* Logo Container - Retention/Fix for potential missing image */}
                      <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-2 shadow-lg group-hover:border-emerald-500/30 transition-colors">
                        {role.customImage ? (
                          <img src={role.customImage} alt={role.company} className="w-full h-full object-contain" />
                        ) : (
                          <Briefcase size={32} className="text-emerald-500/50" />
                        )}
                      </div>
                    </div>

                    {/* NEWCore Responsibilities Presentation: Tag/Chip Layout */}
                    <div className="mb-8">
                      <h5 className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                        <ListChecks size={14} className="text-emerald-500" />
                        Core Responsibilities
                      </h5>
                      
                      {/* Grid/Flex for Tags */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Data Cleaning", "Data Validation", "Data Reconciliation", "Operational Reporting", 
                          "Executive Reporting", "Dashboard Preparation", "Power Query", "ODBC Connectivity", 
                          "Excel Automation", "Workflow Documentation", "Data Accuracy Verification", 
                          "Automation Planning", "Cross-functional Collaboration", "Continuous Improvement", "AI-assisted Productivity"
                        ].map((item, i) => (
                          <motion.span 
                            key={i} 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + (i * 0.03) }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700 text-xs text-slate-300 group-hover:border-emerald-700 transition-colors">
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Professional Impact - Retention */}
                    <h5 className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                        <TrendingUp size={14} className="text-emerald-500" />
                        Professional Impact
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {role.impact.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= TECHNICAL COMPETENCIES (Updated Layout & Icons) ================= */}
      <section className="py-20 px-6 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">Technical Competencies</h3>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto" />
          </div>

          {/* PC View: 3-column balanced grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {techSkills.map((section, index) => {
              {/* Assigning the icon directly from the updated databaseline */}
              const IconComponent = section.icon || FileText; 
              
              return (
                {/* Retention: Kept original stagger and initial/whileInView animations */}
                <motion.div key={index} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-colors group">
                  
                  {/* UPDATED Icon integration */}
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                    <IconComponent size={20} className="text-emerald-400 shrink-0" />
                    {section.category}
                  </h4>
                  
                  <ul className="space-y-2">
                    {section.skills.map((skill, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                        {/* Learning Styling Retention */}
                        <span className={skill.includes('Learning') || skill.includes('Future') ? 'italic text-slate-500' : ''}>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= OTHER SECTIONS (Analytics Portfolio, Ecosystem, etc.) - Retention ================= */}
      {/* ... (Rest of your original code) ... */}

    </div>
  );
}