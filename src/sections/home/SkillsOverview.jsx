// src/sections/home/SkillsOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, BarChart2, Code, Cpu, Users } from 'lucide-react';

// Dictionary mapping icon names to actual Lucide component elements
const iconMap = {
  Palette: <Palette size={16} />,
  BarChart2: <BarChart2 size={16} />,
  Code: <Code size={16} />,
  Cpu: <Cpu size={16} />,
  Users: <Users size={16} />
};

const defaultSkillsData = [
  {
    category: "Creative",
    icon: "Palette",
    skills: ["Graphic Design", "Branding", "Logo Design", "Vector Illustration", "Layout Composition", "Typography", "Mass Print Operations"]
  },
  {
    category: "Analytics",
    icon: "BarChart2",
    skills: ["Data Cleaning", "Data Validation", "Data Reconciliation", "Operational Reporting", "Executive Reports", "Dashboard Design", "Metrics Modeling"]
  },
  {
    category: "Technology",
    icon: "Code",
    skills: ["React", "Vite", "Tailwind CSS", "JavaScript (ES6+)", "HTML5/CSS3", "Git / GitHub", "Node.js (Learning)", "SQL (Learning)"]
  },
  {
    category: "AI & Automation",
    icon: "Cpu",
    skills: ["ChatGPT", "Claude", "Gemini", "GitHub Copilot", "Prompt Engineering", "Automation Workflows"]
  },
  {
    category: "Leadership",
    icon: "Users",
    skills: ["Project Management", "Team Management", "Client Acquisition", "Milestone Tracking", "Cross-functional Operations"]
  }
];

export default function SkillsOverview({ homeData }) {
  // Use data block from database if loaded, otherwise fallback gracefully to native arrangements
  const skillsData = homeData?.skills_overview || defaultSkillsData;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
      
      {/* Section Headers */}
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Core Competencies
        </h2>
        <div className="w-12 h-[1px] bg-zinc-700 mx-auto" />
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          A structured layout detailing my current engineering capabilities, visual methodologies, and technical stack.
        </p>
      </div>

      {/* Responsive Structural Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((group, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950/10 backdrop-blur-sm hover:border-zinc-800 hover:bg-zinc-900/10 transition-all duration-300 flex flex-col h-full group"
          >
            {/* Category Sub-Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-slate-400 flex items-center justify-center group-hover:text-white group-hover:border-zinc-700 transition-colors">
                {iconMap[group.icon] || <Code size={16} />}
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {group.category}
              </h3>
            </div>

            {/* Injected Skill Pills List */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {group.skills.map((skill, sIdx) => {
                const isLearning = skill.includes('(Learning)');
                return (
                  <span 
                    key={sIdx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium tracking-wide transition-colors ${
                      isLearning 
                        ? 'bg-zinc-950/40 border border-zinc-900/60 text-slate-600 italic'
                        : 'bg-zinc-900/40 border border-zinc-800/50 text-slate-300 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}