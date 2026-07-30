// src/sections/home/BeyondTheCode.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MapPin, Brain, GraduationCap, Target, 
  Utensils, Camera, Music, Cat, Crosshair, 
  Tv, Shirt, Gamepad2, ChevronDown, ChevronUp, Swords
} from 'lucide-react';

export default function BeyondTheCode() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 relative z-10 py-10">
      {/* The Reveal Button */}
      <div className="flex justify-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-slate-900 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-lg group cursor-pointer"
        >
          <User size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
          <span className="font-mono text-sm font-bold tracking-widest uppercase">
            {isOpen ? "Hide Personal Override" : "Initialize Personal Override"}
          </span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* The Hidden Bento Box Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
              
              {/* Card 1: The Mindset */}
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-colors flex flex-col h-full">
                <Brain className="text-purple-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-2">The Mindset</h4>
                <ul className="space-y-2 text-xs text-slate-400 font-mono">
                  <li><span className="text-slate-500">MBTI:</span> INFJ</li>
                  <li><span className="text-slate-500">IQ Score:</span> 107</li>
                  <li><span className="text-slate-500">DISC:</span> High Dominance (36%) & Compliance (34%)</li>
                  <li><span className="text-slate-500">English:</span> C1 (Advanced)</li>
                </ul>
              </div>

              {/* Card 2: The Trajectory */}
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-colors flex flex-col h-full">
                <Target className="text-emerald-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-2">The Trajectory</h4>
                <div className="text-xs text-slate-400 space-y-3">
                  <p><span className="text-emerald-500 font-bold block mb-1">Childhood Dreams:</span> Philippine Scout Ranger, 5-Star Cruise Chef, or Professional White Hat Hacker.</p>
                  <p><span className="text-emerald-500 font-bold block mb-1">Target Destination:</span> Chief Technology Officer (CTO).</p>
                </div>
              </div>

              {/* Card 3: Roots & Vibe */}
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-colors flex flex-col h-full lg:col-span-2">
                <MapPin className="text-blue-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-4">Roots & Lifestyle</h4>
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                  <div>
                    <span className="text-slate-500 block mb-1">Origins</span>
                    <p>Hometown: San Juan, PH</p>
                    <p>Current: Rodriguez, Rizal</p>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">Fashion Code</span>
                    <p>Streetwear meets Simple Elegant.</p>
                    <p>Corporate Casual.</p>
                  </div>
                  <div className="col-span-2 flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-black rounded-md border border-slate-800 flex items-center gap-1"><Cat size={12}/> Cat Whisperer</span>
                    <span className="px-2 py-1 bg-black rounded-md border border-slate-800 flex items-center gap-1"><Utensils size={12}/> Food Trips</span>
                    <span className="px-2 py-1 bg-black rounded-md border border-slate-800 flex items-center gap-1">Nature Lover</span>
                    <span className="px-2 py-1 bg-black rounded-md border border-slate-800 flex items-center gap-1">Professional Sleeper</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Interests & Hobbies */}
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-orange-500/50 transition-colors flex flex-col h-full lg:col-span-4">
                <Crosshair className="text-orange-400 mb-4" size={24} />
                <h4 className="text-white font-bold mb-4">Offline Protocols</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-slate-400">
                  
                  {/* Sports */}
                  <div>
                    <h5 className="text-orange-400 font-bold mb-2 flex items-center gap-1"><Gamepad2 size={14}/> Ball is Life</h5>
                    <ul className="space-y-1">
                      <li>Kobe Bryant</li>
                      <li>San Antonio Spurs</li>
                      <li>Gilas Pilipinas</li>
                    </ul>
                  </div>

                  {/* Arts */}
                  <div>
                    <h5 className="text-orange-400 font-bold mb-2 flex items-center gap-1"><Camera size={14}/> The Arts</h5>
                    <ul className="space-y-1">
                      <li>Photography & Astrophotography</li>
                      <li>Painting</li>
                      <li>Culinary Arts & Cooking</li>
                    </ul>
                  </div>

                  {/* Audio */}
                  <div>
                    <h5 className="text-orange-400 font-bold mb-2 flex items-center gap-1"><Music size={14}/> Audio/Visual</h5>
                    <ul className="space-y-1">
                      <li>Playing Guitar</li>
                      <li>Singing</li>
                      <li>Hiphop Culture</li>
                      <li>Slam Dunk & One Piece</li>
                    </ul>
                  </div>

                  {/* Tactics */}
                  <div>
                    <h5 className="text-orange-400 font-bold mb-2 flex items-center gap-1"><Swords size={14}/> Tactics</h5>
                    <ul className="space-y-1">
                      <li>Chess Enthusiast</li>
                      <li className="mt-2 pt-2 border-t border-slate-800">
                        <a href="https://www.chess.com/member/nosreffej_03" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white hover:text-orange-400 bg-black px-2 py-1 rounded border border-slate-700 transition-colors">
                          Chess.com: nosreffej_03
                        </a>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}