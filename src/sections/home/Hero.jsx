// src/sections/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, BarChart2, Code, ArrowRight } from 'lucide-react';

export default function Hero({ homeData }) {
  const navigate = useNavigate();
  
  const titles = [
    "Graphic Designer",
    "Owner & Team Manager",
    "Data Analyst",
    "AI Full-Stack Dev",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-12 px-6">
      
      {/* Professional Monochromatic Technical Background Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Subtle, Sophisticated Deep Wash Glow (Not Colorful) */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[700px] h-[500px] bg-slate-500 rounded-full blur-[160px] absolute -top-40 -left-20" />
        <div className="w-[600px] h-[600px] bg-zinc-600 rounded-full blur-[180px] absolute -bottom-40 -right-20" />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column Structure */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-widest uppercase text-slate-400 font-mono">
              Welcome!
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Designing Creativity.<br />
              Analyzing Data.<br />
              Building Future w AI.
            </h1>
          </div>

          <div className="h-8 flex items-center">
            <p className="text-lg md:text-xl font-medium text-slate-400">
              I'm <span className="text-white font-bold">Jefferson Gonzales</span>, your specialized{' '}
              <span className="text-white transition-all duration-500 font-mono font-bold border-b border-white/20 pb-0.5">
                {titles[currentTitleIndex]}
              </span>
            </p>
          </div>

          <p className="text-base text-slate-400 max-w-xl leading-relaxed">
            A multidisciplinary technology professional passionate about combining creativity, 
            business, analytics, automation, and software engineering to solve real-world problems.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4">
            {/* Dream Creations Button */}
            <button 
              onClick={() => navigate('/dream-creations')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#1095d2]/40 text-[#1095d2] font-medium transition-all shadow-lg cursor-pointer"
            >
              <Palette size={18} />
              Dream Creations
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Data Analyst Button */}
            <button 
              onClick={() => navigate('/data-analyst')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#5bc96d]/40 text-[#5bc96d] font-medium transition-all shadow-lg cursor-pointer"
            >
              <BarChart2 size={18} />
              Data Analyst
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* AI Developer Button */}
            <button 
              onClick={() => navigate('/ai-developer')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-[#a855f7]/40 text-[#a855f7] font-medium transition-all shadow-lg cursor-pointer"
            >
              <Code size={18} />
              AI Developer
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column Structure */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="w-full max-w-[400px] aspect-square rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group hover:border-zinc-800 transition-colors">
            <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-600 select-none text-left leading-tight hidden sm:block">
              const profile = &#123;<br />
              &nbsp;&nbsp;exp: '10+ Years',<br />
              &nbsp;&nbsp;status: 'Developing'<br />
              &#125;;
            </div>

            {/* Dynamically Wired Avatar Input Only */}
            {homeData?.profile_image_url ? (
              <img 
                src={homeData.profile_image_url} 
                alt="Jefferson Gonzales" 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white/5 shadow-2xl z-10 relative mb-6" 
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 z-10 relative shadow-xl">
                <span className="text-3xl font-bold text-white tracking-widest font-mono">JG</span>
              </div>
            )}
            
            <h4 className="text-white font-bold tracking-tight text-lg relative z-10">
              Jefferson Gonzales
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[240px] relative z-10 leading-normal font-mono">
              // Portfolio Core System Active
            </p>
            
            <div className="mt-6 text-[11px] font-mono tracking-wider text-slate-400 uppercase bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 relative z-10">
              System Live &middot; 2026
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}