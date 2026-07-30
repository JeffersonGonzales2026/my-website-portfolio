// src/sections/home/BeyondTheCode.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, X, Brain, Target, Utensils, Camera, Music, Cat, Crosshair, 
  Tv, Shirt, Gamepad2, Swords, Plane, MapPin, ChefHat, Code, Rocket, 
  Volume2, Mic, Palette, Trophy, Moon, MessageCircleQuestion, Globe, Play
} from 'lucide-react';
import { useMobileBack } from '../../hooks/useMobileBack';

export default function BeyondTheCode() {
  const [isOpen, setIsOpen] = useState(false);

  // Gamitin ang ginawa nating global system hook para sa mobile back button!
  useMobileBack(isOpen, () => setIsOpen(false));

  // I-lock ang background scroll kapag nakabukas ang pop-up
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <section className="max-w-7xl mx-auto px-6 relative z-10 py-16">
      
      {/* The Reveal Button - Nananatiling seryoso sa labas */}
      <div className="flex justify-center relative">
        {/* Subtle glow effect sa likod ng button */}
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-110 opacity-50" />
        
        <button 
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-slate-950 border border-slate-800 hover:border-cyan-500 hover:bg-slate-900 text-slate-300 hover:text-white transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] group cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <User size={18} className="text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="font-mono text-sm font-bold tracking-widest uppercase relative z-10">
            Initialize Personal Override
          </span>
        </button>
      </div>

      {/* The Playful Modal Pop-up */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#0f111a] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col"
            >
              
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 shrink-0">
                <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-3 tracking-wide">
                  <span className="text-2xl">👋</span> Fun Facts About Me!
                </h3>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 flex items-center justify-center transition-colors border border-white/5 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="overflow-y-auto p-6 space-y-6 custom-scrollbar">
                
                {/* The Fun Fact Intro */}
                <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                  <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <MessageCircleQuestion size={14} /> Did you know?
                  </h4>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                    My childhood dream is to be either a Philippine Scout Ranger <Target size={16} className="inline text-green-400 -mt-1 mx-1"/>, a 5-star cruise chef <ChefHat size={16} className="inline text-orange-400 -mt-1 mx-1"/>, or a professional white hat hacker <Code size={16} className="inline text-cyan-400 -mt-1 mx-1"/>. Ngunit nag-iba at tila baga papunta bilang CTO <Rocket size={16} className="inline text-purple-400 -mt-1 mx-1"/> kung sasadyain ng panahon!
                  </p>
                </div>

                {/* Playful Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Brain Specs */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-colors">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Brain className="text-purple-400" size={18} /> Brain Specs
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-300 font-mono">
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"/> MBTI: INFJ</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"/> IQ: 107</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"/> DISC: Dom 36%, Comp 34%</li>
                      <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400"/> English: C1 (Advanced)</li>
                    </ul>
                  </div>

                  {/* Ball is Life */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-orange-500/50 transition-colors">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Gamepad2 className="text-orange-400" size={18} /> Ball is Life 🏀
                    </h4>
                    <ul className="space-y-2.5 text-sm text-slate-300">
                      <li className="flex items-center gap-2"><Trophy size={14} className="text-orange-400/70"/> Playing Basketball</li>
                      <li className="flex items-center gap-2"><Star size={14} className="text-orange-400/70"/> Kobe Bryant</li>
                      <li className="flex items-center gap-2"><Globe size={14} className="text-orange-400/70"/> Gilas Pilipinas</li>
                      <li className="flex items-center gap-2"><Target size={14} className="text-orange-400/70"/> San Antonio Spurs</li>
                    </ul>
                  </div>

                  {/* Chess & Tactics */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-400/50 transition-colors lg:row-span-2">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Swords className="text-slate-300" size={18} /> Chess & Tactics ♟️
                    </h4>
                    <div className="text-sm text-slate-300 space-y-4">
                      <p className="italic font-medium text-cyan-400">"Let's check whose brain is above! 💥🧠"</p>
                      <a 
                        href="https://www.chess.com/member/nosreffej_03" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl border border-slate-600 transition-colors w-full"
                      >
                        <Crosshair size={16} className="text-emerald-400" />
                        Chess.com: <span className="font-mono font-bold text-emerald-300">nosreffej_03</span>
                      </a>
                    </div>
                  </div>

                  {/* The Arts */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 transition-colors md:col-span-2">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Palette className="text-pink-400" size={18} /> Arts, Audio & Visuals
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                      <div className="flex items-center gap-2"><Camera size={14} className="text-pink-400/70"/> Photography & Astro</div>
                      <div className="flex items-center gap-2"><Palette size={14} className="text-pink-400/70"/> Painting</div>
                      <div className="flex items-center gap-2"><ChefHat size={14} className="text-pink-400/70"/> Cooking / Culinary Arts</div>
                      <div className="flex items-center gap-2"><Music size={14} className="text-pink-400/70"/> Hiphop Culture</div>
                      <div className="flex items-center gap-2"><Volume2 size={14} className="text-pink-400/70"/> Playing Guitar</div>
                      <div className="flex items-center gap-2"><Mic size={14} className="text-pink-400/70"/> Singing</div>
                    </div>
                  </div>

                  {/* Vibes & Lifestyle */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-colors md:col-span-2">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <MapPin className="text-emerald-400" size={18} /> Vibes & Lifestyle 🏕️
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-800 flex items-center gap-1.5"><Plane size={14} className="text-emerald-400"/> Traveling</span>
                      <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-800 flex items-center gap-1.5"><Utensils size={14} className="text-emerald-400"/> Food Trip</span>
                      <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-800 flex items-center gap-1.5"><Cat size={14} className="text-emerald-400"/> Cat Whisperer</span>
                      <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-800 flex items-center gap-1.5"><MapPin size={14} className="text-emerald-400"/> Nature Lover</span>
                      <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-800 flex items-center gap-1.5"><Moon size={14} className="text-emerald-400"/> Sleeping</span>
                      <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-800 flex items-center gap-1.5"><Shirt size={14} className="text-emerald-400"/> Streetwear & Corp Casual</span>
                    </div>
                  </div>

                  {/* Screen Time */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-500/50 transition-colors">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Tv className="text-red-400" size={18} /> Screen Time 📺
                    </h4>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-center gap-2"><Play size={14} className="text-red-400/70"/> Slam Dunk</li>
                      <li className="flex items-center gap-2"><Play size={14} className="text-red-400/70"/> One Piece</li>
                    </ul>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}