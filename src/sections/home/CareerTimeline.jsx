// src/sections/home/CareerTimeline.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award, GraduationCap } from 'lucide-react';

const timelineData = [
  {
    year: "2014",
    title: "Graphic Artist",
    company: "Love's Studio",
    desc: "Started career focusing on foundations of composition and visual display designs.",
    icon: <Briefcase size={16} />
  },
  {
    year: "2015 - 2017",
    title: "Enumerator / Information Provision Assistant",
    company: "Public Sector",
    desc: "Developed initial professional communication and structured data-gathering organizational skills.",
    icon: <Calendar size={16} />
  },
  {
    year: "2018",
    title: "Graphic Artist",
    company: "A&C Image Graphics Advertising Corporation",
    desc: "Expanded real-world technical expertise into mass print operations and signage production frameworks.",
    icon: <Briefcase size={16} />
  },
  {
    year: "2019",
    title: "Work Immersion Roles",
    company: "Jollibee",
    desc: "Strengthened fast-paced operational teamwork capabilities and client-facing communication skills.",
    icon: <Calendar size={16} />
  },
  {
    year: "2020 - 2021",
    title: "Graphic Artist & Print Operator",
    company: "CCAS Printing Services",
    desc: "Specialized in custom apparel configurations, vinyl plotting, sublimation transfer processing, and system operations.",
    icon: <Briefcase size={16} />
  },
  {
    year: "2021 - Present",
    title: "Freelance Graphic Designer",
    company: "Independent Practice",
    desc: "Served cross-functional corporate clients across healthcare, finance, tech, e-commerce, real estate, and publishing industries.",
    icon: <Award size={16} />
  },
  {
    year: "2022",
    title: "Founder & Team Manager",
    company: "Dream Creations - Graphic Designs",
    desc: "Transitioned directly into core business operations, project milestone management, client acquisition, and creative leadership.",
    icon: <Award size={16} />
  },
  {
    year: "2024",
    title: "International Creative Specialist",
    company: "Remote Global Contracts",
    desc: "Expanded practice globally across creative pipelines including Memorialize, Rich Ams Global, and the CapCut Creator Program.",
    icon: <Award size={16} />
  },
  {
    year: "2025",
    title: "Full-Time Corporate Graphic Artist",
    company: "Responsive Health & Insurance Brokers",
    desc: "Produced comprehensive asset suites across motion branding, B2B email campaigns, corporate presentation materials, and responsive WordPress updates.",
    icon: <Briefcase size={16} />
  },
  {
    year: "2026",
    title: "Data Analyst Intern",
    company: "S.P. Madrid",
    desc: "Began focusing on operational reporting, automated dashboard pipelines, Excel modeling, process optimization, and corporate business intelligence workflows while pursuing an IT degree.",
    icon: <GraduationCap size={16} />
  },
  {
    year: "Present",
    title: "AI-Assisted Full-Stack Developer",
    company: "Engineering Pivot",
    desc: "Architecting this complete premium multi-microsite ecosystem as a flagship production-ready software project.",
    icon: <GraduationCap size={16} />
  }
];

export default function CareerTimeline() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 relative">
      
      {/* Section Headers */}
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Professional Evolution
        </h2>
        <p className="text-sm text-text-secondary max-w-md mx-auto">
          A chronological trace tracking my journey from vector graphics into empirical data structures and modern software development.
        </p>
      </div>

      {/* Vertical Spine Assembly Line Track */}
      <div className="relative border-l border-zinc-800 ml-4 md:ml-32 space-y-12 pb-4">
        {timelineData.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
            className="relative pl-8 md:pl-12 group"
          >
            {/* Timeline Intersect Node Bubble Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-background-primary border border-zinc-800 flex items-center justify-center text-text-secondary group-hover:text-aiDeveloper-neonCyan group-hover:border-zinc-600 transition-colors duration-300 shadow-sm z-10">
              {item.icon}
            </div>

            {/* Left-Aligned Absolute Year Overlay Display (Desktop Only) */}
            <div className="hidden md:block absolute -left-32 top-2 w-24 text-right text-sm font-mono font-bold text-text-muted group-hover:text-white transition-colors duration-300">
              {item.year}
            </div>

            {/* Event Informative Card Shell */}
            <div className="p-6 rounded-xl border border-glass-border bg-glass-card/10 backdrop-blur-sm group-hover:border-zinc-700 hover:bg-background-secondary/30 transition-all duration-300">
              {/* Mobile-Only Year Badge */}
              <span className="inline-block md:hidden text-xs font-mono font-bold px-2 py-0.5 mb-2 rounded bg-zinc-900 border border-zinc-800 text-aiDeveloper-neonCyan">
                {item.year}
              </span>
              
              <h3 className="text-lg font-bold text-white group-hover:text-aiDeveloper-neonCyan transition-colors">
                {item.title}
              </h3>
              
              <p className="text-xs font-mono font-medium text-text-muted mt-1 uppercase tracking-wider">
                {item.company}
              </p>
              
              <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}