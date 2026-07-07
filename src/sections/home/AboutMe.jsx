// src/sections/home/AboutMe.jsx
import React from 'react';
import { Sparkles, GraduationCap, Briefcase, Compass } from 'lucide-react';

export default function AboutMe() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Aspect: Section Header Tonal Indicators */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dreamCreations-brandBlue/10 border border-dreamCreations-brandBlue/20 text-dreamCreations-brandBlue text-xs font-mono tracking-wider uppercase">
            <Sparkles size={12} />
            My Narrative
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            My Story
          </h2>
          <p className="text-sm text-text-muted leading-relaxed font-mono">
            // Bridging creativity, data, and code to engineer business solutions.
          </p>
        </div>

        {/* Right Aspect: Narrative Block and Transitional Matrix */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-6 text-text-secondary text-base md:text-lg leading-relaxed max-w-3xl">
            <p>
              Technology has always fascinated me—not simply because of what it can do, 
              but because of the <span className="text-white font-semibold">problems it can solve.</span> My professional journey started in graphic design, where I discovered the power of visual communication to influence businesses and connect with audiences. Over the years, I worked with startups, corporations, entrepreneurs, and international clients.
            </p>
            <p>
              As I gained experience, I became increasingly interested in understanding how businesses operate behind the scenes. This curiosity led me into entrepreneurship, project management, and eventually data analytics. Today, I continue expanding my knowledge into software engineering, using artificial intelligence responsibly as a productivity and learning partner while building real applications that address genuine business challenges.
            </p>
          </div>

          {/* Core Foundations Grid Block Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-xl border border-glass-border bg-glass-card/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-dreamCreations-brandBlue border border-zinc-800 mb-3">
                <Compass size={16} />
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Creative Origins</h4>
              <p className="text-xs text-text-secondary leading-normal">
                Graphic design instilled core communication foundations and an eye for user-facing detail.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-glass-border bg-glass-card/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-blue-500 border border-zinc-800 mb-3">
                <Briefcase size={16} />
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Structured Analytics</h4>
              <p className="text-xs text-text-secondary leading-normal">
                Entrepreneurship and data intelligence logic shifted focus toward operations and critical systems tracking.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-glass-border bg-glass-card/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-aiDeveloper-neonPurple border border-zinc-800 mb-3">
                <GraduationCap size={16} />
              </div>
              <h4 className="text-white font-bold text-sm mb-1">Unified Engineering</h4>
              <p className="text-xs text-text-secondary leading-normal">
                Software architecture unifies design, operations data, and automation into production software.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}