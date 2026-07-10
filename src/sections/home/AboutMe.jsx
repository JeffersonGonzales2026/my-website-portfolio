// src/sections/home/AboutMe.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AboutMe() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Aspect: Section Header */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-mono tracking-wider uppercase">
            <Sparkles size={12} />
            My Narrative
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            My Story
          </h2>
          <p className="text-sm text-slate-505 leading-relaxed font-mono text-slate-500">
            // Bridging creativity, data, and code to engineer business solutions.
          </p>
        </div>

        {/* Right Aspect: Narrative Text Block */}
        <div className="lg:col-span-8 space-y-6 text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl">
          <p>
            Technology has always fascinated me—not simply because of what it can do, 
            but because of the <span className="text-white font-semibold">problems it can solve.</span> My professional journey started in graphic design, where I discovered the power of visual communication to influence businesses and connect with audiences. Over the years, I worked with startups, corporations, entrepreneurs, and international clients.
          </p>
          <p>
            As I gained experience, I became increasingly interested in understanding how businesses operate behind the scenes. This curiosity led me into entrepreneurship, project management, and eventually data analytics. Today, I continue expanding my knowledge into software engineering, using artificial intelligence responsibly as a productivity and learning partner while building real applications that address genuine business challenges.
          </p>
        </div>

      </div>
    </section>
  );
}