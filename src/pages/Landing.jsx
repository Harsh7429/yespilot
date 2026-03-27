import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { PublicNavbar, Footer } from '../components/PublicNavbar';
import { ArrowRight, BarChart3, Zap, Shield, Sparkles, LayoutDashboard, Target, Command } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export const Landing = () => {
  const { user } = useAuth();
  const { scrollY } = useScroll();
  const yDashboard = useTransform(scrollY, [0, 1000], [0, -100]);
  const rotateDashboard = useTransform(scrollY, [0, 500], [0, 5]);
  const scaleDashboard = useTransform(scrollY, [0, 500], [1, 0.95]);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen relative selection:bg-indigo-500/30">
      <div className="aurora-bg" />
      <PublicNavbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          <motion.a 
            href="#"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-textMuted text-xs font-medium mb-8 hover:bg-white/[0.08] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Introducing Yes Pilot AI 2.0 <ArrowRight className="w-3 h-3" />
          </motion.a>
          
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp} 
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 leading-tight"
          >
            The smart <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-pulse">
              personal finance app.
            </span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-textMuted mb-10 max-w-xl font-medium"
          >
            Stop tracking pennies. Yes Pilot replaces manual spreadsheets with a premium <b>expense tracker</b> and autonomous <b>budget management tool</b> to help you save money effortlessly.
          </motion.p>
          
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link to="/login" className="btn-accent text-base py-3.5 px-8 w-full sm:w-auto flex items-center justify-center gap-2">
              Start Building Wealth <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/#how-it-works" className="btn-secondary text-base py-3.5 px-8 w-full sm:w-auto flex items-center justify-center gap-2">
              See How It Works
            </Link>
          </motion.div>

          <p className="mt-6 text-sm text-textMuted/60 font-medium">Free forever plan available. No credit card required.</p>
        </div>

        {/* 3D Dashboard Mockup Overlay */}
        <div className="mt-20 md:mt-32 max-w-6xl mx-auto perspective-[2000px] px-6">
          <motion.div 
            style={{ y: yDashboard, rotateX: rotateDashboard, scale: scaleDashboard }}
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative rounded-2xl md:rounded-[32px] border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-2xl p-2 md:p-4 shadow-[0_0_80px_rgba(99,102,241,0.15)] ring-1 ring-white/10"
          >
            {/* Minimalist Dashboard Graphic Representation */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <div className="rounded-xl md:rounded-[24px] bg-[#000000] border border-white/[0.05] overflow-hidden aspect-video relative flex">
               {/* Sidebar mock */}
               <div className="hidden md:block w-64 border-r border-white/5 p-6 space-y-4">
                 <div className="w-8 h-8 rounded bg-white flex items-center justify-center mb-10"><Plane className="w-5 h-5 text-black" /></div>
                 <div className="h-10 w-full rounded bg-white/[0.05]" />
                 <div className="h-10 w-full rounded bg-white/[0.02]" />
                 <div className="h-10 w-full rounded bg-white/[0.02]" />
               </div>
               {/* Main content mock */}
               <div className="flex-1 p-6 md:p-10">
                 <div className="h-8 w-48 bg-white/10 rounded mb-8" />
                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                   <div className="h-32 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                     <div className="h-4 w-24 bg-white/10 rounded mb-4" />
                     <div className="h-10 w-40 bg-white/20 rounded" />
                   </div>
                   <div className="h-32 rounded-xl border border-white/5 bg-white/[0.02] p-5">
                     <div className="h-4 w-24 bg-white/10 rounded mb-4" />
                     <div className="h-10 w-40 bg-white/20 rounded" />
                   </div>
                   <div className="hidden lg:block h-32 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-5">
                     <div className="h-4 w-24 bg-indigo-400/50 rounded mb-4" />
                     <div className="h-10 w-40 bg-indigo-400 rounded" />
                   </div>
                 </div>
                 <div className="h-64 rounded-xl border border-white/5 bg-white/[0.02]" />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BENTO GRID FEATURES SECTION */}
      <section id="features" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter mb-4">A complete suite for your wealth</h2>
            <p className="text-lg text-textMuted">Powerful, pro-grade tools disguised in a minimal, frictionless interface. Everything you need to take control of your financial destiny.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Bento Item 1 - Large */}
            <div className="glass-panel p-8 md:col-span-2 group relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all duration-700" />
              <Zap className="w-8 h-8 text-indigo-400 mb-auto" />
              <div className="relative z-10 mt-12">
                <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast Tracking</h3>
                <p className="text-textMuted max-w-md">Our Apple-styled modals and "Quick-Add" chips make inputting expenses a 2-second job. Less friction means you actually use it.</p>
              </div>
            </div>

            {/* Bento Item 2 */}
            <div className="glass-panel p-8 group relative overflow-hidden flex flex-col">
              <Command className="w-8 h-8 text-gray-400 mb-auto" />
              <div className="relative z-10 mt-12">
                <h3 className="text-xl font-bold text-white mb-2">Command Center</h3>
                <p className="text-textMuted text-sm">A centralized dashboard that gives you immediate, absolute clarity on your money.</p>
              </div>
            </div>

            {/* Bento Item 3 */}
            <div className="glass-panel p-8 group relative overflow-hidden flex flex-col">
              <Shield className="w-8 h-8 text-emerald-400 mb-auto" />
              <div className="relative z-10 mt-12">
                <h3 className="text-xl font-bold text-white mb-2">Bulletproof Budgets</h3>
                <p className="text-textMuted text-sm">Set strict spending limits per month. Get visual warnings before you slip up.</p>
              </div>
            </div>

            {/* Bento Item 4 - Large AI focus */}
            <div className="glass-panel p-8 md:col-span-2 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 group relative overflow-hidden flex flex-col">
               <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
               <Sparkles className="w-8 h-8 text-indigo-400 mb-auto" />
               <div className="relative z-10 mt-12">
                 <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">Pilot AI Insights <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Pro</span></h3>
                 <p className="text-indigo-200/70 max-w-md">Acting as your autonomous CFO, the AI analyzes your spending patterns silently in the background, offering human-like warnings and savings strategies.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BASED WORKFLOW SECTION */}
      <section id="how-it-works" className="py-24 md:py-32 px-6 border-t border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tighter mb-8 leading-tight">Master your finances in <span className="text-indigo-400">3 simple steps.</span></h2>
              <p className="text-textMuted text-lg mb-12">We eliminated complex accounting jargon. Yes Pilot is built for humans who want results, not spreadsheets.</p>
              
              <div className="space-y-12">
                {[
                  { num: "01", title: "Record instantly", desc: "Swipe up your phone, open the app, and log that coffee order in two taps using predefined Quick-chips." },
                  { num: "02", title: "Watch it aggregate", desc: "Our engine immediately categorizes the transaction and updates your beautiful, dark-mode charts in real-time." },
                  { num: "03", title: "Execute AI advice", desc: "Review your AI-generated insights at the end of the week, cut suggested non-essentials, and watch your net worth grow." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="text-3xl font-bold text-white/[0.1] group-hover:text-indigo-500 transition-colors duration-500">{step.num}</div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-textMuted leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Realistic Mock Component rendering */}
            <div className="glass-panel p-6 md:p-10 relative">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
               
               <div className="bg-surface border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative z-10 space-y-4">
                 <div className="flex items-center gap-4 border-b border-white/[0.05] pb-6 mb-2">
                   <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl rotate-3">
                     <span className="text-2xl">☕</span>
                   </div>
                   <div>
                     <div className="text-white font-bold">Starbucks Coffee</div>
                     <div className="text-xs text-textMuted">Today at 8:43 AM</div>
                   </div>
                   <div className="ml-auto text-white font-bold text-lg">-$5.40</div>
                 </div>
                 <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl">
                   <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
                   <p className="text-sm text-indigo-200">Pilot AI: This takes your monthly coffee spend to $120. Make coffee at home twice a week to save $45/mo.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter mb-4">Loved by early adopters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { handle: "@alex_designs", name: "Alex Chen", run: "Saved $400/mo", content: "Yes Pilot is exactly what I've been looking for. The UI is ridiculously clean, and the AI caught me overspending on subscriptions I completely forgot about." },
              { handle: "@sarah.dev", name: "Sarah Jenkins", run: "Budgeting made easy", content: "I used to absolutely hate tracking expenses on YNAB. Yes Pilot's UI makes it feel like I'm playing a game. The quick chips are a godsend." },
              { handle: "@marksman", name: "Mark T.", run: "Pilot AI is insane", content: "The autonomous insights told me I was pacing 20% over my food budget before the second week ended. Corrected course immediately. Literal wealth builder." }
            ].map((test, i) => (
              <div key={i} className="glass-panel p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500" />
                  <div>
                    <div className="text-white font-bold text-sm">{test.name}</div>
                    <div className="text-textMuted text-xs">{test.handle}</div>
                  </div>
                </div>
                <p className="text-textMuted text-sm leading-relaxed mb-6">"{test.content}"</p>
                <div className="text-xs font-semibold text-indigo-400 bg-indigo-400/10 inline-flex px-2.5 py-1 rounded-md">{test.run}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HEAVY CTA */}
      <section className="py-24 md:py-40 px-6 relative border-t border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.01]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <Plane className="w-16 h-16 text-white mb-8" />
          <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tighter mb-8 leading-tight">Stop bleeding cash. <br/>Start growing wealth.</h2>
          <Link to="/login" className="btn-accent text-lg py-5 px-12 group inline-flex shadow-[0_0_40px_rgba(99,102,241,0.3)]">
            Create Free Account
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="mt-6 text-sm text-textMuted">Takes less than 60 seconds.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
