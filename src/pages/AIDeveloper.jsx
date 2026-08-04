{/* ================= 63 & 64. AI PHILOSOPHY & WORKFLOW (CHAT UI OVERHAUL) ================= */}
        <section className="py-24 px-6 relative border-t border-slate-900 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <motion.div variants={fadeSlideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-5 space-y-6">
              <h3 className="text-3xl font-black text-white">AI is a Partner, <br/>Not a Replacement.</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
              <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
                <p>Artificial Intelligence is transforming software development. Rather than fearing this change, I embrace AI as a productivity tool that accelerates learning, improves code quality, and helps solve complex technical challenges.</p>
                <p>However, I believe true software engineering requires understanding the code being written. AI can generate ideas, explain concepts, suggest improvements, and accelerate implementation, but developers remain responsible for architecture, design decisions, debugging, testing, security, maintainability, and long-term scalability.</p>
                <p className="text-cyan-400 font-semibold bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                  My goal is to combine human creativity, critical thinking, and engineering principles with AI-assisted productivity to build better software.
                </p>
              </div>
            </motion.div>

            {/* AI CHAT UI INTERFACE */}
            <motion.div variants={futuristicReveal} initial="hidden" whileInView="visible" viewport={{ once: true }} 
              className="lg:col-span-7 h-[550px] overflow-y-auto pr-2 border border-slate-800 bg-slate-950/80 p-6 rounded-2xl hide-scrollbar relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#02040a] to-transparent pointer-events-none z-10" />
              
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-slate-800 pb-3"><Settings size={14} className="text-purple-400" /> AI Prompts Context Window</h4>
              
              {/* USER PROMPT MESSAGE */}
              <div className="flex gap-3 mb-8 w-full max-w-[90%] ml-auto justify-end">
                <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl rounded-tr-none text-sm text-slate-200 shadow-md">
                  <span className="block text-[10px] text-cyan-400 font-mono mb-1">User Prompt</span>
                  Build a scalable, production-ready web application from scratch. What is your standard AI-assisted engineering workflow?
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-900 border border-cyan-500 flex items-center justify-center text-xs font-bold text-cyan-400 shrink-0 shadow-inner">JG</div>
              </div>

              {/* AI RESPONSE MESSAGE */}
              <div className="flex gap-3 w-full max-w-[95%]">
                <div className="w-8 h-8 rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.3)] mt-1">
                  <Sparkles size={14} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl rounded-tl-none shadow-md">
                    <span className="block text-[10px] text-purple-400 font-mono mb-2">System Response</span>
                    <p className="text-sm text-slate-300 mb-5 leading-relaxed">
                      Acknowledged. Initializing AI-Assisted Full-Stack Engineering Protocol. Here is the sequential methodology for execution:
                    </p>
                    
                    <div className="space-y-3 relative border-l border-purple-500/30 ml-2">
                      {aiWorkflowSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 pl-4 relative group cursor-default">
                          <div className="absolute left-[-4.5px] top-2 w-2 h-2 rounded-full bg-[#02040a] border border-purple-500/50 group-hover:bg-purple-400 transition-colors shadow-[0_0_10px_rgba(168,85,247,0)] group-hover:shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                          <span className="text-xs font-mono text-purple-400/50 group-hover:text-purple-400 transition-colors">[{String(idx+1).padStart(2, '0')}]</span>
                          <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>