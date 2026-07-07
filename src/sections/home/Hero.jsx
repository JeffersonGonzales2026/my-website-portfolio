// src/sections/home/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, BarChart2, Code, ArrowRight } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();
  
  // Rotating Titles array defined exactly from Section 10 of your PRD
  const titles = [
    "Graphic Designer",
    "Owner & Team Manager",
    "Data Analyst",
    "AI Full-Stack Developer",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Transitions automatically every 3 seconds
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-4 px-6">
      
      {/* Background Ambient Mesh Layer */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-aiDeveloper-neonPurple rounded-full blur-[140px] absolute -top-20 -left-20 animate-pulse" />
        <div className="w-[600px] h-[600px] bg-aiDeveloper-neonCyan rounded-full blur-[160px] absolute -bottom-20 -right-20" />
      </div>

      {/* Responsive Two-Column Grid Setup Layout Container */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Structure: Text Copywrite & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-2">
            <p className="mt-4 text-sm font-semibold tracking-widest uppercase text-aiDeveloper-neonCyan">
              Welcome!
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
              Designing Creativity.<br />
              Analyzing Data.<br />
              Building with AI.
            </h1>
          </div>

          <div className="h-8 flex items-center">
            <p className="text-lg md:text-xl font-medium text-text-secondary">
              I'm <span className="text-white font-bold">Jefferson Gonzales</span>, your specialized{' '}
              <span className="text-aiDeveloper-neonPurple transition-all duration-500 font-mono underline decoration-wavy">
                {titles[currentTitleIndex]}
              </span>
            </p>
          </div>

          <p className="text-base text-text-secondary max-w-xl leading-relaxed">
            A multidisciplinary technology professional passionate about combining creativity, 
            business, analytics, automation, and software engineering to solve real-world problems.
          </p>

          {/* Primary Buttons Route Navigation CTA Grid */}
          <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-4">
            <button 
              onClick={() => navigate('/dream-creations')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-dreamCreations-brandBlue text-white font-medium hover:bg-opacity-90 transition-all shadow-lg"
            >
              <Palette size={18} />
              Dream Creations
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => navigate('/data-analyst')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-700 text-white font-medium hover:bg-blue-600 transition-all shadow-lg"
            >
              <BarChart2 size={18} />
              Data Analyst
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => navigate('/ai-developer')}
              className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-medium hover:bg-zinc-700 transition-all shadow-lg"
            >
              <Code size={18} />
              AI Developer
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column Structure: Portfolio Presentation Graphic Asset Window */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="w-full max-w-[400px] aspect-square rounded-2xl border border-glass-border bg-glass-card backdrop-blur-md flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group hover:border-zinc-700 transition-colors">
            
            {/* Minimal background grid graphic design details */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Animated Code Snippet Overlays inside Hero Background Layout */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-zinc-600 select-none text-left leading-tight hidden sm:block">
              const profile = &#123;<br />
              &nbsp;&nbsp;exp: '10+ Years',<br />
              &nbsp;&nbsp;status: 'Developing'<br />
              &#125;;
            </div>

            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-3xl font-bold mb-4 shadow-inner relative z-10 group-hover:scale-105 transition-transform">
              JG
            </div>
            
            <h4 className="text-white font-bold tracking-tight text-lg relative z-10">
              Jefferson Gonzales
            </h4>
            <p className="text-xs text-text-secondary mt-1 max-w-[240px] relative z-10 leading-normal">
              Flagship Software Engineering Project Portfolio System Placeholder
            </p>
            
            <div className="mt-6 text-[11px] font-mono tracking-wider text-aiDeveloper-neonCyan uppercase bg-zinc-900/80 px-3 py-1 rounded-full border border-zinc-800 relative z-10 animate-pulse">
              System Live &middot; 2026
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}