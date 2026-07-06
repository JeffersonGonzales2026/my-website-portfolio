import React, { useState, useEffect } from 'react';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.pathname === '/admin');
  const [creativeTab, setCreativeTab] = useState('Overview');
  const [creativeFilter, setCreativeFilter] = useState('All');
  const [analystFilter, setAnalystFilter] = useState('All');
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages] = useState([
    { id: 1, created_at: '2026-07-06', full_name: 'Jane Doe', email: 'jane@company.com', subject: 'Data Analytics Pipeline', message: 'Hello Jefferson, I viewed your automated cross-platform sync case study. We would love to consult with you regarding a business intelligence overhaul.' }
  ]);

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path, e) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', path);
    setIsAdminRoute(path === '/admin');
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const smoothScroll = (id, e) => {
    if (e) e.preventDefault();
    if (isAdminRoute) {
      window.history.pushState({}, '', '/');
      setIsAdminRoute(false);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (email === 'jeffersonguzmangonzales03@gmail.com' && password === 'password123') {
      setIsAdminLoggedIn(true);
    } else {
      alert('Invalid admin credentials.');
    }
  };

  if (isAdminRoute) {
    return (
      <div className="bg-[#09090b] text-zinc-100 min-h-screen font-sans flex flex-col justify-between">
        <nav className="w-full bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold tracking-tighter cursor-pointer" onClick={(e) => navigateTo('/', e)}>
              Jefferson<span className="text-indigo-500">.</span>
            </div>
            <button onClick={(e) => navigateTo('/', e)} className="text-xs font-mono text-zinc-400 hover:text-white transition">← Exit Console</button>
          </div>
        </nav>

        <main className="flex-grow flex items-center justify-center p-6">
          {!isAdminLoggedIn ? (
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="text-center">
                <h2 className="text-2xl font-black tracking-tight">System Access Console</h2>
                <p className="text-zinc-400 text-xs mt-1">Authenticate to decrypt captured platform messages</p>
              </div>
              <form className="space-y-4 text-xs font-mono" onSubmit={handleAdminLogin}>
                <div className="space-y-2">
                  <label className="text-zinc-400 uppercase tracking-wider font-bold">Admin Identifier</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jeffersonguzmangonzales03@gmail.com" className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-indigo-500" required />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-400 uppercase tracking-wider font-bold">Security Passkey</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-zinc-950 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-indigo-500" required />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 text-sm font-sans rounded-md transition duration-200">Request Access Decryption</button>
              </form>
            </div>
          ) : (
            <div className="max-w-4xl w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-2xl font-black">Operational Inbox Vault</h2>
                  <p className="text-zinc-400 text-xs">Reviewing real-time inbound business communication logs</p>
                </div>
                <button onClick={() => setIsAdminLoggedIn(false)} className="px-3 py-1.5 bg-zinc-800 text-zinc-400 hover:text-white rounded text-xs font-mono transition">Lock Vault</button>
              </div>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl space-y-2 font-mono text-xs">
                    <div className="flex justify-between border-b border-zinc-900 pb-2">
                      <div>
                        <span className="text-white font-bold text-sm block font-sans">{msg.full_name}</span>
                        <span className="text-zinc-500">{msg.email}</span>
                      </div>
                      <span className="text-zinc-600 text-[10px]">{msg.created_at}</span>
                    </div>
                    <p className="text-indigo-400"><span className="text-zinc-500">Subject Payload:</span> {msg.subject}</p>
                    <p className="text-zinc-300 font-sans text-sm bg-zinc-900/40 p-3 rounded mt-2 border border-zinc-800">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
        <footer className="text-center py-4 border-t border-zinc-900 text-[10px] font-mono text-zinc-600">Secure Environment Access // 2026</footer>
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] text-zinc-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white scroll-smooth">
      
      <nav className="fixed w-full bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Jefferson<span className="text-indigo-500">.</span>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <button onClick={(e) => smoothScroll('home', e)} className="hover:text-white transition">Home</button>
            <button onClick={(e) => smoothScroll('dream-creations', e)} className="hover:text-white transition">Dream Creations</button>
            <button onClick={(e) => smoothScroll('data-analyst', e)} className="hover:text-white transition">Data Analyst</button>
            <button onClick={(e) => smoothScroll('ai-developer', e)} className="hover:text-white transition">AI Developer</button>
            <button onClick={(e) => smoothScroll('contact', e)} className="hover:text-white transition">Contact</button>
          </div>
        </div>
      </nav>

      {/* 🏠 HOME MICRO-SITE */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 max-w-5xl mx-auto border-b border-zinc-900 pt-20">
        <div className="text-center space-y-6 max-w-3xl">
          <div className="w-20 h-20 bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-full mx-auto flex items-center justify-center text-xl font-extrabold border border-zinc-600 text-white shadow-xl">
            JG
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white">
            Jefferson Gonzales
          </h1>
          <p className="text-sm font-mono uppercase tracking-widest bg-zinc-900 text-indigo-400 px-3 py-1 rounded-full inline-block">
            Multi-Disciplinary Engineering Systems
          </p>
          <p className="text-zinc-400 leading-relaxed font-light text-md max-w-2xl mx-auto">
            Synthesizing visual production concepts, structured enterprise data modeling insights, and autonomous artificial intelligence engineering pipelines into unified web system frameworks.
          </p>
          
          <div className="pt-8 space-y-3">
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Explore My Professional Journey</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={(e) => smoothScroll('dream-creations', e)} className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-sm font-medium rounded-md hover:border-purple-500 hover:text-purple-400 transition">
                [ Dream Creations ]
              </button>
              <button onClick={(e) => smoothScroll('data-analyst', e)} className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-sm font-medium rounded-md hover:border-emerald-500 hover:text-emerald-400 transition">
                [ Data Analyst ]
              </button>
              <button onClick={(e) => smoothScroll('ai-developer', e)} className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-sm font-medium rounded-md hover:border-cyan-500 hover:text-cyan-400 transition">
                [ AI-Assisted Developer ]
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24 w-full max-w-4xl border-t border-zinc-900 pt-12">
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8 text-center">Core Career Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { y: '2020', t: 'Creative Director', c: 'Dream Creations', d: 'Engineered branding, complex photo manipulations, and visual identities.' },
              { y: '2022', t: 'Data Intelligence Pivoting', c: 'Enterprise Metrics', d: 'Structured raw databases into clean extraction schemas and visualization dashboards.' },
              { y: '2024', t: 'AI Systems Integration', c: 'Automation Systems', d: 'Developed prompt engineering methodologies and autonomous business scripting.' },
              { y: '2026', t: 'Full-Stack Synthesis', c: 'Ecosystem Buildout', d: 'Constructing modern full-scale applications, executing this portfolio framework live.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-950 hover:border-zinc-800 transition">
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{item.y}</span>
                <h4 className="font-bold text-white mt-2 text-sm">{item.t}</h4>
                <p className="text-[10px] text-zinc-500 font-mono mb-2">{item.c}</p>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎨 DREAM CREATIONS MICRO-SITE */}
      <section id="dream-creations" className="min-h-screen bg-gradient-to-b from-[#09090b] via-[#0d091a] to-[#09090b] py-24 px-6 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-purple-900/30 pb-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">🎨 Dream Creations</h2>
              <p className="text-zinc-500 text-xs font-mono mt-0.5">High-Fidelity Visual Systems & Creative Agency Framework</p>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-4 md:mt-0 bg-zinc-950 p-1 rounded border border-zinc-800">
              {['Overview', 'Our Team', 'Services', 'Portfolio', 'Testimonials'].map(tab => (
                <button key={tab} onClick={() => setCreativeTab(tab)} className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded transition ${creativeTab === tab ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {creativeTab === 'Overview' && (
            <div className="bg-zinc-900/40 p-6 rounded-xl border border-purple-500/10 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-2 text-zinc-100">Visual Impact Engineering</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">Dream Creations functions as a structural digital laboratory handling premium asset positioning. We organize high-concept artwork guidelines, identity restoration mechanics, and multi-channel asset blueprints.</p>
            </div>
          )}

          {creativeTab === 'Our Team' && (
            <div className="bg-zinc-900/20 p-6 rounded-xl border border-zinc-800 text-center text-xs font-mono text-zinc-400">
              Managed and scaled autonomously by Jefferson Gonzales alongside elite freelance technical and artistic networks.
            </div>
          )}

          {creativeTab === 'Services' && (
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Premium Branding Systems', desc: 'Developing clean design language models, typography structures, and vectorized guidelines.' },
                { title: 'Advanced Photo Manipulation', desc: 'Composing complex digital art layout elements, exposure structures, and visual compositions.' },
                { title: 'Corporate Marketing Collateral', desc: 'Structuring layout vectors for high-conversion performance spaces and presentation modules.' }
              ].map((s, i) => (
                <div key={i} className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-800">
                  <h4 className="font-bold text-purple-400 text-sm mb-2">{s.title}</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light">{s.desc}</p>
                </div>
              ))}
            </div>
          )}

          {creativeTab === 'Portfolio' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Branding', 'Social Media', 'Logo Design', 'Photo Restoration', 'Marketing Materials', 'Photo Manipulation'].map(cat => (
                  <button key={cat} onClick={() => setCreativeFilter(cat)} className={`px-2.5 py-1 text-[10px] font-mono rounded-full border transition ${creativeFilter === cat ? 'bg-purple-600 text-white border-purple-500' : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}>
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 1, c: 'Branding', t: 'Aether Corporate Guide System', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' },
                  { id: 2, c: 'Social Media', t: 'Unified Conversion Campaign Assets', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80' },
                  { id: 3, c: 'Logo Design', t: 'Minimal Vector Monogram Build', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80' },
                  { id: 4, c: 'Photo Restoration', t: 'Archival Monochrome Fidelity Reconstruct', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80' },
                  { id: 5, c: 'Marketing Materials', t: 'B2B Technical Event Assets', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&q=80' },
                  { id: 6, c: 'Photo Manipulation', t: 'Conceptual Multi-Layer Horizon Render', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80' }
                ].filter(item => creativeFilter === 'All' || item.c === creativeFilter).map(item => (
                  <div key={item.id} className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden group">
                    <div className="h-40 bg-zinc-900 relative overflow-hidden">
                      <img src={item.img} alt={item.t} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition duration-500" />
                      <span className="absolute top-2 left-2 bg-black/80 border border-zinc-800 text-[9px] font-mono text-purple-400 px-2 py-0.5 rounded uppercase">{item.c}</span>
                    </div>
                    <div className="p-3"><p className="text-xs font-medium truncate text-zinc-300">{item.t}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {creativeTab === 'Testimonials' && (
            <div className="bg-zinc-900/20 p-6 rounded-xl border border-zinc-800 text-center text-xs font-mono text-zinc-500">
              Pristine agency testimonials framework pipeline ready to receive client feedback schemas.
            </div>
          )}
        </div>
      </section>

      {/* 📊 DATA ANALYST MICRO-SITE */}
      <section id="data-analyst" className="min-h-screen py-24 px-6 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">📊 Data Analytics Desk</h2>
            <p className="text-zinc-500 text-xs font-mono mt-0.5">Corporate Operations // Analytical Infrastructure // Raw Extraction Sync</p>
          </div>

          <div className="bg-zinc-900/40 p-5 rounded-lg border border-zinc-800 font-mono text-xs text-zinc-400 leading-relaxed">
            <span className="text-emerald-500 font-bold block mb-1">// PROFESSIONAL SUMMARY</span>
            Resourceful Data Analyst specializing in converting unstructured corporate data stores into responsive business intelligence frameworks. Proven track record deploying automated pipeline models, clean statistical normalization workflows, and interactive tracking metrics to support continuous corporate decision-making.
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider">// Experience & Operational History</h3>
            <div className="bg-zinc-900/20 border border-zinc-800 p-5 rounded-xl space-y-3">
              <div className="flex justify-between items-start font-mono text-xs border-b border-zinc-800 pb-2">
                <div>
                  <h4 className="text-sm font-bold text-white font-sans">Business Intelligence & Optimization Intern</h4>
                  <p className="text-zinc-500">Corporate Data Operations Hub</p>
                </div>
                <span className="text-emerald-500">2024 - Present</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-light">
                <li>Constructed automated Python ETL architectures reducing database preprocessing timelines.</li>
                <li>Designed corporate Power BI reporting frameworks tracking metrics across operational units.</li>
                <li>Identified database integrity gaps via advanced SQL string cleansing procedures.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider">// Technical Skill Matrix Groups</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { n: 'Data Analysis', s: ['EDA Scripts', 'Statistical Testing', 'Hypothesis Tuning'] },
                { n: 'Data Cleaning', s: ['ETL Schema Normalization', 'SQL Join Optimization', 'Pandas Constraints'] },
                { n: 'Data Visualization', s: ['Power BI DAX Systems', 'Tableau Calculation Engine', 'Advanced Matrix Excel'] },
                { n: 'Reporting & Automation', s: ['Scheduled Cron Operations', 'Bloomberg Terminal Feeds', 'KPI Framework Engineering'] }
              ].map((grp, i) => (
                <div key={i} className="bg-zinc-950 p-4 rounded border border-zinc-900 font-mono text-xs">
                  <h4 className="text-zinc-200 font-bold mb-2 text-emerald-500 uppercase tracking-tight">{grp.n}</h4>
                  <ul className="space-y-1 text-zinc-500 text-[11px]">
                    {grp.s.map((skill, si) => <li key={si}>· {skill}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider">// Core Interactive Dashboard Showcases</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  t: 'Global Supply Chain Lead-Time Matrix', p: 'Optimize supplier freight routing to decrease warehouse pipeline delays.',
                  m: 'OTIF (On-Time In-Full) %, Freight Cost Variance Index, Lead Latency Trends', tl: ['Power BI', 'SQL Server', 'Excel Matrix'],
                  pblm: 'Regional shipping delays resulting in quarterly supply chains taking 18% longer to fulfill.',
                  src: 'ERP Logistics Relational Tables', cln: 'Removed null rows via SQL statement clauses, casting timestamps to standardized DateTime values.',
                  prc: 'Constructed custom star-schema models inside Power BI desktop, configuring cross-filtering parameters.',
                  kpi: 'Lead-Time Delta, Transit Variance Coefficient', ins: 'Tuesday maritime transport lines experienced extreme backup patterns at port entry points.',
                  out: 'Re-routed delivery chains away from Tuesday slots, reducing total transit latency constraints by 14.2%.'
                }
              ].map((dash, i) => (
                <div key={i} onClick={() => setSelectedDashboard(dash)} className="bg-zinc-900 p-5 rounded-lg border border-zinc-800 hover:border-emerald-500 cursor-pointer transition group relative">
                  <div className="h-32 bg-zinc-950 rounded border border-zinc-800 mb-3 flex items-center justify-center font-mono text-[10px] text-zinc-600 group-hover:border-zinc-700 transition">
                    [ Interactive Dashboard System Preview Mock Canvas ]
                  </div>
                  <h4 className="font-bold text-sm text-zinc-200 group-hover:text-emerald-400 transition">{dash.t}</h4>
                  <p className="text-zinc-400 text-xs mt-1 font-light">{dash.p}</p>
                  <div className="flex gap-1.5 mt-3">
                    {dash.tl.map((t, ti) => <span key={ti} className="bg-zinc-950 border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400 rounded">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider">// Process Automation Arrays</h3>
              {[
                { n: 'Cross-Platform Inventory Ledger Sync', p: 'Manual spreadsheet reconciliations consumed up to 14 personnel hours per week.', w: 'Shopify Webhook Target → Python Server Worker Script → SQL Main Table Store', tl: 'Python, REST API Webhooks, Cron Engine', ai: 'GPT-4 Code Structuring Audit', svd: '14 Hours / Week Saved', imp: 'Ledger tracking errors reduced to absolute zero variance' }
              ].map((a, i) => (
                <div key={i} className="bg-zinc-900/50 p-4 rounded border border-zinc-800 font-mono text-xs space-y-2">
                  <div className="flex justify-between border-b border-zinc-800 pb-1.5"><span className="font-bold text-white text-sm font-sans">{a.n}</span><span className="text-amber-400">Pipeline Operational</span></div>
                  <p className="text-zinc-400"><strong>Problem Statement:</strong> {a.p}</p>
                  <p className="text-zinc-400"><strong>Automated Workflow Path:</strong> {a.w}</p>
                  <div className="bg-zinc-950 p-2 rounded border border-zinc-900 text-center text-[11px] text-emerald-400 font-bold grid grid-cols-2 gap-2">
                    <div>{a.svd}</div><div>{a.imp}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider">// Advanced System Case Studies</h3>
              {[
                { t: 'Predictive Attrition Mitigation Model', p: 'Corporate metric tracking indicated client cancellation metrics rising by 8.4%.', i: 'Database telemetry flagged a distinct drop in interaction velocity starting on day 35.', o: 'Formulated automated client re-engagement thresholds, recovering 22% of contracts before user churn execution.' }
              ].map((cs, i) => (
                <div key={i} className="bg-zinc-900/50 p-4 rounded border border-zinc-800 font-mono text-xs space-y-1.5">
                  <span className="font-bold text-zinc-200 block text-sm font-sans">{cs.t}</span>
                  <p className="text-zinc-400"><strong>Core Problem:</strong> {cs.p}</p>
                  <p className="text-zinc-400"><strong>Extracted Insight:</strong> {cs.i}</p>
                  <p className="text-emerald-400"><strong>Measurable Impact:</strong> {cs.o}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider">// Repository Analytics Index</h3>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Excel', 'Power BI', 'SQL', 'Python', 'Automation', 'Data Visualization'].map(cat => (
                <button key={cat} onClick={() => setAnalystFilter(cat)} className={`px-2.5 py-0.5 rounded text-xs font-mono border ${analystFilter === cat ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-zinc-800 text-zinc-500'}`}>{cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { n: 'SQL Optimization Database Sync', c: 'SQL', d: 'Stored query optimization sequences processing financial ledgers.' },
                { n: 'Automated Lead Valuation Model', c: 'Python', d: 'Regression clustering scripts running on marketing performance records.' },
                { n: 'Operational KPI Executive View', c: 'Power BI', d: 'DAX calculation model rendering cross-unit targets.' }
              ].filter(item => analystFilter === 'All' || item.c === analystFilter || (analystFilter === 'Automation' && item.c === 'Python') || (analystFilter === 'Data Visualization' && item.c === 'Power BI')).map((p, i) => (
                <div key={i} className="bg-zinc-950 p-4 rounded border border-zinc-900 font-mono text-xs">
                  <span className="text-[10px] bg-zinc-900 text-emerald-400 border border-zinc-800 px-1.5 py-0.5 rounded uppercase font-bold">{p.c}</span>
                  <h4 className="font-sans font-bold text-sm text-zinc-200 mt-2">{p.n}</h4>
                  <p className="text-zinc-500 mt-1 text-[11px] font-light leading-relaxed">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 💻 AI DEVELOPER MICRO-SITE */}
      <section id="ai-developer" className="min-h-screen bg-gradient-to-b from-[#09090b] via-[#050914] to-[#09090b] py-24 px-6 border-b border-zinc-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">💻 AI-Assisted Full-Stack Developer</h2>
            <p className="text-zinc-500 text-xs font-mono mt-0.5">Glassmorphic Framework Matrix // Autonomous Architectures // Prompt Engineering Pipelines</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">// Storytelling Transition Track</h3>
            <div className="bg-zinc-900/30 border border-cyan-500/10 rounded-xl p-5 font-mono text-xs text-zinc-400 space-y-2 max-w-3xl">
              <p>📍 Started journey executing digital architecture directives as a Graphic Artist.</p>
              <p>📍 Managed structural design platforms and system assets under <span className="text-purple-400">Dream Creations</span>.</p>
              <p>📍 Transitioned into corporate analytics, configuring raw SQL arrays and database engines.</p>
              <p>📍 Engineered advanced prompt script layers to automate manual platform accounting pipelines.</p>
              <p>📍 Expanded software engineering capacities to build responsive full-stack applications like this portfolio system.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { t: 'Learn By Continuous Execution', d: 'Technical frameworks remain superficial until validated inside functional code spaces. True comprehension is forged through active software development deployment cycles.' },
              { t: 'Co-Pilot Prompt Acceleration Model', d: 'Bypass routine syntax generation constraints through deliberate engineering prompts. Leverage artificial intelligence systems as acceleration engines while maintaining absolute line-by-line manual code auditing.' }
            ].map((ph, i) => (
              <div key={i} className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800">
                <h4 className="text-sm font-bold text-cyan-400 mb-2 font-mono">⚡ {ph.t}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">{ph.d}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">// AI-Assisted Logic Delivery Architecture</h3>
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 overflow-x-auto">
              <div className="flex items-center gap-2 text-[10px] font-mono whitespace-nowrap text-zinc-400">
                {['Idea', 'Research', 'Planning', 'Prompt Eng', 'Prototype', 'Code Gen', 'Review', 'Debug', 'Testing', 'Optimize', 'Deployment', 'Continuous Improvement'].map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <span className="bg-zinc-900 px-2 py-1 rounded border border-zinc-800 text-zinc-200 font-bold">{step}</span>
                    {idx < arr.length - 1 && <span className="text-cyan-500 font-bold">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">// System Engine Dependency Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                { c: 'Frontend Engine', t: ['React Framework', 'Vite Bundler', 'Tailwind CSS Parsing', 'ES6 JavaScript Engine'] },
                { c: 'Version Control', t: ['Git Command Line', 'GitHub Repositories'] },
                { c: 'Developer Toolkits', t: ['VS Code Workspace', 'npm Dependency Registry', 'Chrome DevTools Panel'] },
                { c: 'AI Workspace Layers', t: ['ChatGPT-4o Contexts', 'Claude 3.5 Sonnet Prompting', 'Gemini Architectures'] }
              ].map((st, i) => (
                <div key={i} className="bg-zinc-900/20 p-4 rounded-lg border border-zinc-800 font-mono text-[11px]">
                  <h4 className="text-zinc-200 font-bold border-b border-zinc-800 pb-1.5 mb-2 text-cyan-400 uppercase">{st.c}</h4>
                  <div className="space-y-1 text-zinc-400">
                    {st.t.map((tech, ti) => <p key={ti}>📊 {tech}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">// Autonomous Automation Repositories</h3>
            <div className="bg-zinc-900/30 p-5 rounded-xl border border-zinc-800 max-w-xl text-xs font-mono text-zinc-400 space-y-1">
              <span className="text-amber-400 font-bold block mb-1">⚙️ PIPELINE STAGING ACTIVE</span>
              <p>GitHub repository links and workflow architecture diagrams are configured to ingest structured execution parameters. Project profiles will mount automatically upon client deployment verification.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">// Long-Term Structural Growth Blueprint</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
              {[
                { n: 'Personal Portfolio Workspace', s: true },
                { n: 'AI Business Automation Engine', s: false },
                { n: 'CRM Communication Layer', s: false },
                { n: 'SaaS Multi-Tenant Architecture', s: false }
              ].map((rm, i) => (
                <div key={i} className="bg-zinc-950 p-3 rounded border border-zinc-900 flex justify-between items-center">
                  <span className="text-zinc-300 tracking-tight text-[11px] truncate max-w-[80%]">{rm.n}</span>
                  <span className={rm.s ? 'text-green-400 font-bold' : 'text-zinc-600'}>{rm.s ? '✓ DONE' : '⏳ STAGED'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 📞 CONTACT & SOCIAL CHANNELS */}
      <section id="contact" className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-black">Let's Secure Your System Goals</h3>
              <p className="text-zinc-400 text-xs font-light mt-1">Initiate a live project thread or request secure data analytics consultation.</p>
            </div>
            <form className="space-y-3 font-mono text-xs" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Full Name" className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-indigo-500" required />
                <input type="email" placeholder="Email Address" className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-indigo-500" required />
              </div>
              <input type="text" placeholder="Subject Target Line" className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-indigo-500" required />
              <textarea rows="4" placeholder="Secure Message Data Payload..." className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white focus:outline-none focus:border-indigo-500 resize-none" required></textarea>
              <button type="submit" className="w-full bg-white text-black font-bold uppercase py-3 font-sans text-xs tracking-wider rounded transition hover:bg-zinc-200">Transmit Message Protocol</button>
            </form>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// Direct Telemetry Channels Index</h3>
              <p className="text-zinc-400 text-xs font-light mt-0.5">Access verified direct communication infrastructure points across 11 platforms.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
              {[
                { n: 'Email', i: '📧', info: 'Direct Mail Link' },
                { n: 'LinkedIn', i: '🔗', info: 'Professional Profile' },
                { n: 'GitHub', i: '💻', info: 'Code Repositories' },
                { n: 'Facebook', i: '👥', info: 'Social Networking' },
                { n: 'Instagram', i: '📸', info: 'Visual Portfolio' },
                { n: 'TikTok', i: '🎵', info: 'Short-Form Content' },
                { n: 'Discord', i: '👾', info: 'Developer Server' },
                { n: 'Telegram', i: '✈️', info: 'Encrypted Chat' },
                { n: 'WhatsApp', i: '💬', info: 'Instant Messaging' },
                { n: 'Viber', i: '💜', info: 'Mobile Communication' },
                { n: 'Lark', i: '🦅', info: 'Collaboration Workspace' }
              ].map((soc, idx) => (
                <div key={idx} className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg flex flex-col items-center justify-center hover:border-zinc-700 transition duration-200 select-none cursor-pointer">
                  <span className="text-lg mb-1">{soc.i}</span>
                  <span className="text-[11px] font-bold text-zinc-300 block">{soc.n}</span>
                  <span className="text-[9px] font-mono text-zinc-500 truncate max-w-full">{soc.info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedDashboard && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center p-4 z-50 font-mono text-xs">
          <div className="bg-[#09090b] border border-zinc-800 max-w-3xl w-full rounded-xl overflow-hidden shadow-2xl relative p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedDashboard(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white text-sm">✕ CLOSE</button>
            <h3 className="text-lg font-bold text-emerald-400 border-b border-zinc-800 pb-2 uppercase tracking-tight font-sans">{selectedDashboard.t}</h3>
            <div className="space-y-3 text-zinc-400 leading-relaxed">
              <p><strong className="text-zinc-100 uppercase text-[10px] block text-emerald-500">// Business Problem Statement</strong> {selectedDashboard.pblm}</p>
              <p><strong className="text-zinc-100 uppercase text-[10px] block text-emerald-500">// Target Data Sources</strong> {selectedDashboard.src}</p>
              <p><strong className="text-zinc-100 uppercase text-[10px] block text-emerald-500">// Data Cleaning Process Engine</strong> {selectedDashboard.cln}</p>
              <p><strong className="text-zinc-100 uppercase text-[10px] block text-emerald-500">// Dashboard Design & Architectural Process</strong> {selectedDashboard.prc}</p>
              <p><strong className="text-zinc-100 uppercase text-[10px] block text-emerald-500">// Tracked Performance KPIs Used</strong> {selectedDashboard.kpi}</p>
              <p><strong className="text-zinc-100 uppercase text-[10px] block text-emerald-500">// Strategic Business Insights Extracted</strong> {selectedDashboard.ins}</p>
              <p className="text-zinc-300 bg-zinc-900/60 p-3 rounded border border-zinc-800"><strong className="text-emerald-400 uppercase text-[10px] block">// Final Analytical System Outcome</strong> {selectedDashboard.out}</p>
            </div>
            <div className="pt-2 flex justify-end"><button onClick={() => setSelectedDashboard(null)} className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold font-sans rounded text-xs transition">Close Telemetry Console</button></div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-4 z-50">
        <button onClick={(e) => navigateTo('/admin', e)} className="px-3 py-1.5 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-600 hover:text-zinc-400 border border-zinc-900 hover:border-zinc-800 font-mono text-[9px] uppercase tracking-widest rounded-md backdrop-blur-md transition duration-200">
          ⚙️ Console Link
        </button>
      </div>

    </div>
  );
}