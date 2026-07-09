// src/sections/home/SkillsOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Palette, BarChart2, Code2, Cpu, Users } from 'lucide-react';

const defaultSkillCategories = [
  {
    title: "Creative",
    icon: <Palette size={20} className="text-dreamCreations-brandBlue" />,
    borderColor: "hover:border-dreamCreations-brandBlue/40",
    skills: [
      "Graphic Design", "Branding", "Logo Design", "Motion Graphics", 
      "Photo Editing", "Photo Restoration", "Vector Illustration", 
      "Presentation Design", "Print Production", "Photography"
    ]
  },
  {
    title: "Analytics",
    icon: <BarChart2 size={20} className="text-blue-500" />,
    borderColor: "hover:border-blue-500/40",
    skills: [
      "Data Cleaning", "Dashboard Design", "Reporting", "Business Analysis", 
      "Power Query", "Microsoft Excel", "Data Validation", "Automation", "Documentation"
    ]
  },
  {
    title: "Technology",
    icon: <Code2 size={20} className="text-aiDeveloper-neonCyan" />,
    borderColor: "hover:border-aiDeveloper-neonCyan/40",
    skills: [
      { name: "React", status: "Core" },
      { name: "Vite", status: "Core" },
      { name: "Tailwind CSS", status: "Core" },
      { name: "HTML/CSS", status: "Core" },
      { name: "JavaScript", status: "Core" },
      { name: "Git & GitHub", status: "Core" },
      { name: "VS Code", status: "Core" },
      { name: "npm", status: "Core" },
      { name: "Supabase", status: "Learning" },
      { name: "PostgreSQL", status: "Learning" },
      { name: "Python", status: "Learning" }
    ]
  },
  {
    title: "AI & Automation",
    icon: <Cpu size={20} className="text-aiDeveloper-neonPurple" />,
    borderColor: "hover:border-aiDeveloper-neonPurple/40",
    skills: [
      "ChatGPT", "Claude", "Gemini", "GitHub Copilot", 
      "Prompt Engineering", "AI Workflow Design",
      { name: "Amazon Q", status: "Learning" },
      { name: "OpenClaw", status: "Learning" },
      { name: "n8n", status: "Learning" }
    ]
  },
  {
    title: "Leadership",
    icon: <Users size={20} className="text-zinc-400" />,
    borderColor: "hover:border-zinc-500/40",
    skills: [
      "Project Management", "Team Management", "Client Communication", 
      "Quality Assurance", "Business Operations", "Entrepreneurship", 
      "Problem Solving", "Continuous Learning"
    ]
  }
];

// Lookup engine to map textual names to their respective live components if parsed via database
const iconMap = {
  "Creative": <Palette size={20} className="text-dreamCreations-brandBlue" />,
  "Analytics": <BarChart2 size={20} className="text-blue-500" />,
  "Technology": <Code2 size={20} className="text-aiDeveloper-neonCyan" />,
  "AI & Automation": <Cpu size={20} className="text-aiDeveloper-neonPurple" />,
  "Leadership": <Users size={20} className="text-zinc-400" />
};

export default function SkillsOverview({ homeData }) {
  // Gracefully use live database records if present, otherwise fall back to your native array layout
  const skillCategories = homeData?.skills_matrix || defaultSkillCategories;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      
      {/* Background Atmosphere Adjustment */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" />

      {/* Section Headings */}
      <div className="mb-16 space-y-3 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          {homeData?.skills_title || 'Capability Matrix'}
        </h2>
        <p className="text-sm text-slate-400 max-w-xl">
          {homeData?.skills_subtitle || 'An honest, documented breakdown of my technical proficiencies, specialized software skill sets, and active areas of professional learning.'}
        </p>
      </div>

      {/* Grid Track Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {skillCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={`p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm transition-all duration-300 flex flex-col ${cat.borderColor || 'hover:border-zinc-700'}`}
          >
            {/* Category Header Card Line */}
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/60 pb-3">
              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                {iconMap[cat.title] || cat.icon || <Cpu size={20} />}
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {cat.title}
              </h3>
            </div>

            {/* Pills Wrap Field */}
            <div className="flex flex-wrap gap-2 flex-grow content-start">
              {cat.skills?.map((skill, sIdx) => {
                const isObject = typeof skill === 'object';
                const name = isObject ? skill.name : skill;
                const isLearning = isObject && skill.status === 'Learning';

                return (
                  <span
                    key={sIdx}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                      isLearning
                        ? 'bg-purple-950/20 border-purple-800/40 text-purple-300 font-mono'
                        : 'bg-zinc-900/40 border-zinc-800/80 text-slate-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {name}
                    {isLearning && (
                      <span className="ml-1 text-[9px] uppercase tracking-wider text-purple-400 opacity-80">
                        &middot; learning 
                      </span>
                    )}
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