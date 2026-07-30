// src/sections/home/BeyondTheCode.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Brain, Briefcase, Camera, Cat, ChefHat, 
  ChevronDown, ChevronUp, Crosshair, Crown, 
  Flag, Gamepad2, Gem, Glasses, Headphones, Leaf, 
  MapPin, MessageCircleQuestion, Mic, Moon, Mountain, 
  Music, Palette, PenTool, Plane, Play, Radio, 
  Shirt, Swords, Target, Telescope, 
  Trophy, Tv, Utensils, Volume2, Skull 
} from 'lucide-react';

export default function BeyondTheCode() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 relative z-10 py-10 border-t border-slate-800/50 mt-10">
      
      {/* Playful Reveal Button - Vibrant Amber/Rose/Fuchsia Gradient */}
      <div className="flex justify-center relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500 hover:from-amber-400 hover:via-rose-400 hover:to-fuchsia-400 text-white transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] group cursor-pointer overflow-hidden transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          <span className="font-mono text-sm font-black tracking-widest uppercase relative z-10 flex items-center gap-2 drop-shadow-md">
            Decrypt personal logs 👀
          </span>
          {isOpen ? <ChevronUp size={18} className="relative z-10 drop-shadow-md" /> : <ChevronDown size={18} className="relative z-10 drop-shadow-md" />}
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
            <div className="space-y-4 pb-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. Roots & Origins */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-colors shadow-lg">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <MapPin className="text-blue-400" size={18} /> Roots & Origins
                  </h4>
                  <div className="space-y-3 text-sm text-slate-300 font-mono">
                    <p><span className="text-slate-500 block text-xs">Hometown:</span> San Juan, Philippines</p>
                    <p><span className="text-slate-500 block text-xs">Current Base:</span> Rodriguez, Rizal</p>
                  </div>
                </div>

                {/* 2. Brain Specs */}
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

                {/* 3. Ball is Life & Sports */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-orange-500/50 transition-colors shadow-lg">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Gamepad2 className="text-orange-400" size={18} /> Ball is Life
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><Activity size={14} className="text-orange-400/70"/> Playing Basketball</li>
                    <li className="flex items-center gap-2"><Flag size={14} className="text-orange-400/70"/> Gilas Pilipinas 🇵🇭</li>
                    <li className="flex items-center gap-2"><Trophy size={14} className="text-orange-400/70"/> San Antonio Spurs</li>
                    <li className="flex items-center gap-2"><Crown size={14} className="text-orange-400/70"/> Kobe Bryant 🐐</li>
                  </ul>
                </div>

                {/* 4. Arts, Audio & Visuals */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 transition-colors shadow-lg md:col-span-2">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Palette className="text-pink-400" size={18} /> Arts, Audio & Visuals
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2"><Headphones size={14} className="text-pink-400/70"/> Listening to Music</div>
                    <div className="flex items-center gap-2"><Volume2 size={14} className="text-pink-400/70"/> Playing Guitar</div>
                    <div className="flex items-center gap-2"><Music size={14} className="text-pink-400/70"/> Piano</div>
                    <div className="flex items-center gap-2"><Mic size={14} className="text-pink-400/70"/> Singing</div>
                    <div className="flex items-center gap-2"><Radio size={14} className="text-pink-400/70"/> Hiphop Culture</div>
                    <div className="flex items-center gap-2"><Activity size={14} className="text-pink-400/70"/> Former Hiphop Dancer</div>
                    <div className="flex items-center gap-2"><Palette size={14} className="text-pink-400/70"/> Painting</div>
                    <div className="flex items-center gap-2"><PenTool size={14} className="text-pink-400/70"/> Sketching Portraits</div>
                    <div className="flex items-center gap-2"><Camera size={14} className="text-pink-400/70"/> Photography</div>
                    <div className="flex items-center gap-2"><Telescope size={14} className="text-pink-400/70"/> Astrophile</div>
                    <div className="flex items-center gap-2"><ChefHat size={14} className="text-pink-400/70"/> Cooking</div>
                  </div>
                </div>

                {/* 5. Fashion Code */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-colors shadow-lg">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Shirt className="text-emerald-400" size={18} /> Fashion Code
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><Shirt size={14} className="text-emerald-400/70"/> Streetwear</li>
                    <li className="flex items-center gap-2"><Briefcase size={14} className="text-emerald-400/70"/> Corporate Casual</li>
                    <li className="flex items-center gap-2"><Glasses size={14} className="text-emerald-400/70"/> Smart Casual</li>
                    <li className="flex items-center gap-2"><Gem size={14} className="text-emerald-400/70"/> Old Money</li>
                    <li className="flex items-center gap-2"><Palette size={14} className="text-emerald-400/70"/> Monochrome</li>
                  </ul>
                </div>

                {/* 6. Vibes & Lifestyle */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-colors shadow-lg md:col-span-2">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Leaf className="text-cyan-400" size={18} /> Vibes, Lifestyle & Activities
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Plane size={14} className="text-cyan-400"/> Traveling</span>
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Utensils size={14} className="text-cyan-400"/> Food Trip</span>
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Cat size={14} className="text-cyan-400"/> Cat Whisperer</span>
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Leaf size={14} className="text-cyan-400"/> Nature Lover</span>
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Mountain size={14} className="text-cyan-400"/> Hiking</span>
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Target size={14} className="text-cyan-400"/> Billiards</span>
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Crosshair size={14} className="text-cyan-400"/> Table Tennis</span>
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Activity size={14} className="text-cyan-400"/> Calisthenics</span>
                    <span className="px-3 py-2 bg-black rounded-lg border border-slate-700 flex items-center gap-1.5 shadow-sm"><Moon size={14} className="text-cyan-400"/> Professional Sleeper</span>
                  </div>
                </div>

                {/* 7. Screen Time */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-500/50 transition-colors shadow-lg">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Tv className="text-red-400" size={18} /> Screen Time
                  </h4>
                  <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-center gap-2"><Play size={16} className="text-red-400"/> Slam Dunk</li>
                    <li className="flex items-center gap-2"><Skull size={16} className="text-red-400"/> One Piece 🏴‍☠️</li>
                  </ul>
                </div>

                {/* 8. Chess */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-colors shadow-lg md:col-span-3">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Swords className="text-slate-300" size={18} /> Chess ♟️
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="italic font-medium text-emerald-400">"Let's check whose brain is above!"</p>
                    <a 
                      href="https://www.chess.com/member/nosreffej_03" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-2 text-white bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl border border-slate-600 transition-colors shadow-md group"
                    >
                      <Crosshair size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                      Chess.com: <span className="font-mono font-bold text-emerald-300">nosreffej_03</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* 9. The Playful "Did you know" (At the bottom) */}
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-slate-900 to-purple-500/10 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none" />
                <h4 className="text-sm font-mono font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                  <MessageCircleQuestion size={18} /> Fun Fact
                </h4>
                
                <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium relative z-10">
                  As a kid, I dreamed of becoming a Military Scout Ranger, a chef on a five-star cruise ship, or a professional white-hat hacker.
                  <br /><br />
                  <span className="text-indigo-300 font-bold text-lg block mt-2">
                    Today, I find joy in exploring the world of software development, creating digital experiences, and continuously learning new skills. Life is a journey of discovery, and I'm excited to see where my passions take me next! 🚀
                  </span>
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}