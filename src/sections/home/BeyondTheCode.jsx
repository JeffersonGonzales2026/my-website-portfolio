// src/sections/home/BeyondTheCode.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Target, Utensils, Camera, Music, Cat, Crosshair, 
  Tv, Shirt, Gamepad2, Swords, Plane, MapPin, ChefHat, Code, Rocket, 
  Volume2, Mic, Palette, Trophy, Moon, MessageCircleQuestion, Globe, Play,
  Star, ChevronDown, ChevronUp // Added Star to fix the crash!
} from 'lucide-react';

export default function BeyondTheCode() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 relative z-10 py-10 border-t border-slate-800/50 mt-10">
      
      {/* Playful Reveal Button */}
      <div className="flex justify-center relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] group cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          
          <span className="font-mono text-sm font-black tracking-widest uppercase relative z-10 flex items-center gap-2">
            Decrypt personal logs 👀
          </span>
          {isOpen ? <ChevronUp size={18} className="relative z-10" /> : <ChevronDown size={18} className="relative z-10" />}
        </button>
      </div>

      {/* The Hidden Bento Box Grid (Dropdown Style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden mt-12"
          >
            <div className="space-y-6 pb-8">
              
              {/* The Fun Fact Intro */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 shadow-inner">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <MessageCircleQuestion size={16} /> Did you know?
                </h4>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">
                  My childhood dream is to be either a Philippine Scout Ranger <Target size={16} className="inline text-green-400 -mt-1 mx-1"/>, a 5-star cruise chef <ChefHat size={16} className="inline text-orange-400 -mt-1 mx-1"/>, or a professional white hat hacker <Code size={16} className="inline text-cyan-400 -mt-1 mx-1"/>. Ngunit nag-iba at tila baga papunta bilang CTO <Rocket size={16} className="inline text-purple-400 -mt-1 mx-1"/> kung sasadyain ng panahon!
                </p>
              </div>

              {/* Playful Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Brain Specs */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-colors shadow-lg">
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
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-orange-500/50 transition-colors shadow-lg">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Gamepad2 className="text-orange-400" size={18} /> Ball is Life 🏀
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><Trophy size={14} className="text-orange-400/70"/> Playing Basketball</li>
                    <li className="flex items-center gap-2"><Star size={14} className="text-orange-400/70"/> Kobe Bryant</li>
                    <li className="flex items-center gap-2"><Globe size={14} className="text-orange-400/70"/> Gilas Pilipinas</li>
                    <li className="flex items-center gap-2"><Target size={14} className="text-orange-400/70"/> San Antonio Spurs</li>
                  </ul>
                </div>

                {/* Chess & Tactics */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-colors shadow-lg lg:row-span-2">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Swords className="text-slate-300" size={18} /> Chess & Tactics ♟️
                  </h4>
                  <div className="text-sm text-slate-300 space-y-6">
                    <p className="italic font-medium text-cyan-400 text-base">"Let's check whose brain is above! 💥🧠"</p>
                    <a 
                      href="https://www.chess.com/member/nosreffej_03" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-4 py-3 rounded-xl border border-slate-600 transition-colors w-full shadow-md group"
                    >
                      <Crosshair size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                      Chess.com: <span className="font-mono font-bold text-emerald-300">nosreffej_03</span>
                    </a>
                  </div>
                </div>

                {/* The Arts */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 transition-colors shadow-lg md:col-span-2">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Palette className="text-pink-400" size={18} /> Arts, Audio & Visuals
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2"><Camera size={14} className="text-pink-400/70"/> Photography & Astro</div>
                    <div className="flex items-center gap-2"><Palette size={14} className="text-pink-400/70"/> Painting</div>
                    <div className="flex items-center gap-2"><ChefHat size={14} className="text-pink-400/70"/> Cooking / Culinary Arts</div>
                    <div className="flex items-center gap-2"><Music size={14} className="text-pink-400/70"/> Hiphop Culture</div>
                    <div className="flex items-center gap-2"><Volume2 size={14} className="text-pink-400/70"/> Playing Guitar</div>
                    <div className="flex items-center gap-2"><Mic size={14} className="text-pink-400/70"/> Singing</div>
                  </div>
                </div>

                {/* Vibes & Lifestyle */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-colors shadow-lg md:col-span-2">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <MapPin className="text-emerald-400" size={18} /> Vibes & Lifestyle 🏕️
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Plane size={14} className="text-emerald-400"/> Traveling</span>
                    <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Utensils size={14} className="text-emerald-400"/> Food Trip</span>
                    <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Cat size={14} className="text-emerald-400"/> Cat Whisperer</span>
                    <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><MapPin size={14} className="text-emerald-400"/> Nature Lover</span>
                    <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Moon size={14} className="text-emerald-400"/> Sleeping</span>
                    <span className="px-3 py-1.5 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Shirt size={14} className="text-emerald-400"/> Streetwear & Corp Casual</span>
                  </div>
                </div>

                {/* Screen Time */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-500/50 transition-colors shadow-lg">
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
        )}
      </AnimatePresence>
    </section>
  );
}