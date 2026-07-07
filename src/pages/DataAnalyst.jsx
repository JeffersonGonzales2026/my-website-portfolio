// src/pages/DataAnalyst.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Database, LineChart, PieChart, Terminal, Server, Activity } from 'lucide-react';

const technicalSkills = [
  { id: 1, title: "ETL Workflows", icon: <Server size={20} />, desc: "Extracting, transforming, and loading complex datasets into clean, actionable data warehouses." },
  { id: 2, title: "Data Modeling", icon: <Database size={20} />, desc: "Architecting relational databases and structuring empirical data for optimal query performance." },
  { id: 3, title: "Dashboard Automation", icon: <LineChart size={20} />, desc: "Deploying automated BI dashboards to track KPIs, removing manual reporting bottlenecks." },
  { id: 4, title: "Statistical Analysis", icon: <PieChart size={20} />, desc: "Translating raw metrics into strategic business insights using advanced analytical models." }
];

export default function DataAnalyst() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary overflow-x-hidden">
      
      <section className="relative pt-32 pb-20 px-6 min-h-[50vh] flex flex-col items-center justify-center text-center border-b border-glass-border">
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-dataAnalyst-mainGreen/10 border border-dataAnalyst-mainGreen/20 text-dataAnalyst-mainGreen text-sm font-mono">
            <Activity size={16} />
            <span>SYSTEM_STATUS: NOMINAL</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight mb-6">
            Data Architecture & Analytics
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Transitioning subjective creative tracking into empirical data science. Building the structural backbone required to measure, scale, and optimize business operations.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicalSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-glass-card border border-glass-border hover:border-dataAnalyst-mainGreen/40 transition-colors"
            >
              <div className="p-3 rounded-lg bg-background-secondary border border-glass-border text-dataAnalyst-mainGreen">
                {skill.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-2 font-mono">{skill.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto w-full px-6 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border border-glass-border bg-[#0D1117] shadow-2xl"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-glass-border">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-dataAnalyst-mainGreen/80" />
            <span className="ml-2 text-xs text-text-muted font-mono">analytics_pipeline.py</span>
          </div>
          
          <div className="p-6 font-mono text-sm md:text-base space-y-2 text-text-secondary overflow-x-auto">
            <p className="text-blue-400">&gt; INITIALIZING ETL WORKFLOW...</p>
            <p>&gt; Connecting to production database: <span className="text-dataAnalyst-mainGreen">SUCCESS</span></p>
            <p>&gt; Extracting 1.2M rows from raw_events...</p>
            <p>&gt; Applying transformation schemas...</p>
            <p>&gt; Loading into unified_analytics_view: <span className="text-dataAnalyst-mainGreen">SUCCESS</span></p>
            <p className="text-yellow-400">&gt; Query execution time: 1.42s</p>
            <p className="animate-pulse">_</p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}