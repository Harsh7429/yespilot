import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useExpenses } from '../hooks/useExpenses';
import { useAuth } from '../hooks/useAuth';
import { ExpenseModal } from '../components/ExpenseModal';
import { CategoryChart, WeeklyTrendChart } from '../components/Charts';
import { generateInsightsEngine } from '../utils/insightsEngine';
import { Plus, Wallet, FileText, ArrowUpRight, AlertTriangle, Sparkles, BarChart3, TrendingUp, Info, Flame, Target, Lock } from 'lucide-react';
import { cn } from '../utils/cn';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }
};

export const Dashboard = () => {
  const { user } = useAuth();
  const { expenses, budget, loading } = useExpenses();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Advanced Addictive SaaS analytics
  const stats = useMemo(() => generateInsightsEngine(expenses, budget), [expenses, budget]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10 pb-20 md:pb-0 relative">
      <ExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* 1. WOW MOMENT HERO BANNER (Emotional Feedback Hook) */}
      <motion.div 
        variants={itemVariants} 
        className={cn(
          "relative overflow-hidden rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border group",
          stats.wowMessage?.emotion === "success" ? "bg-gradient-to-br from-indigo-600 to-indigo-900 border-indigo-400/30" : 
          stats.wowMessage?.emotion === "danger" ? "bg-gradient-to-br from-rose-600 to-rose-900 border-rose-400/30" :
          "bg-white/[0.03] border-white/10"
        )}
      >
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/20 blur-[100px] rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
        
        <div className="relative z-10 w-full text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-3 drop-shadow-lg">
            {stats.wowMessage?.title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto md:mx-0">
            {stats.wowMessage?.sub}
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 shrink-0 bg-white text-black font-extrabold px-8 py-4 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all text-lg flex items-center gap-2"
        >
          <Plus className="w-6 h-6" /> Log Expense
        </button>
      </motion.div>

      {/* 2. THE ADDICTIVE GAMIFICATION HUD */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        
        <motion.div variants={itemVariants} className="glass-panel p-6 col-span-2 lg:col-span-1 border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent relative group">
           <h3 className="text-textMuted font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
             <Target className="w-4 h-4 text-emerald-400" /> Financial Score
           </h3>
           <div className="flex items-end gap-2">
             <span className="text-5xl font-extrabold text-white tracking-tighter">{loading ? '--' : stats.score}</span>
             <span className="text-textMuted font-bold mb-1">/100</span>
           </div>
           <p className="text-xs text-textMuted mt-2">Top {loading ? '--' : Math.max(1, 100 - stats.score)}% of disciplined users.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 col-span-2 lg:col-span-1 border-orange-500/20 bg-gradient-to-b from-orange-500/5 to-transparent relative group">
           <h3 className="text-textMuted font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-4">
             <Flame className="w-4 h-4 text-orange-400" /> Current Streak
           </h3>
           <div className="flex items-end gap-2">
             <span className="text-5xl font-extrabold text-white tracking-tighter">{loading ? '-' : stats.streak}</span>
             <span className="text-textMuted font-bold mb-1">days</span>
           </div>
           <p className="text-xs text-textMuted mt-2">Consecutive days tracking properly.</p>
        </motion.div>

        {/* Massive Spend Metric */}
        <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8 col-span-2 lg:col-span-1 border-white/5 relative overflow-hidden group">
          <h2 className="text-textMuted font-bold text-xs tracking-widest uppercase flex items-center gap-2 mb-4">
            <Wallet className="w-4 h-4 text-primary" /> Total Spent
          </h2>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
              ${stats.totalMonthly.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
            </span>
          </div>
          {loading ? <div className="skeleton w-16 h-4 mt-3" /> : (
            <span className={cn("text-xs font-bold px-2 py-1 rounded inline-block mt-3", 
              stats.momChange > 0 ? "bg-danger/10 text-danger" : "bg-success/10 text-success")}>
              {stats.momChange > 0 ? '+' : ''}{stats.momChange.toFixed(1)}% vs last month
            </span>
          )}
        </motion.div>

        {/* Massive Remaining Budget Metric */}
        <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8 col-span-2 lg:col-span-1 relative overflow-hidden group border-white/5">
          <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none", 
            stats.progress > 90 ? "bg-danger" : stats.progress > 75 ? "bg-warning" : "bg-primary")} />

          <h2 className="text-textMuted font-bold text-xs tracking-widest uppercase flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" /> Remaining
          </h2>
          
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter">
              ${stats.balance.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </span>
          </div>

          <div className="w-full bg-white/[0.05] rounded-full h-2 overflow-hidden shadow-inner flex mb-2 border border-white/5">
            <div 
              className={cn("h-full transition-all duration-1000 shadow-lg", 
                stats.progress > 90 ? "bg-danger" : stats.progress > 75 ? "bg-warning" : "bg-gradient-primary"
              )}
              style={{ width: `${loading ? 0 : stats.progress}%` }}
            />
          </div>
          <p className="text-xs text-textMuted font-semibold text-right">{loading ? '0' : stats.progress.toFixed(0)}% Burned</p>
        </motion.div>

      </div>

      {/* 3. DEEP ACTIONABLE INTELLIGENCE */}
      <motion.div variants={itemVariants} className="glass-panel p-6 md:p-8 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-transparent border-indigo-500/30 relative overflow-hidden hidden md:block group">
        <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <Sparkles className="w-32 h-32 text-indigo-400" />
        </div>
        
        <div className="flex items-start gap-6 relative z-10 w-full max-w-4xl">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <Sparkles className="w-7 h-7 text-indigo-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-white text-2xl tracking-tight">Pilot AI Action Plan</h3>
              <Link to="/pricing" className="text-[10px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full uppercase tracking-widest font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-1">
                <Lock className="w-3 h-3" /> Pro Active
              </Link>
            </div>
            
            {loading ? (
              <div className="space-y-3">
                <div className="skeleton h-5 w-3/4" />
                <div className="skeleton h-5 w-1/2" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {stats.insights.slice(0, 2).map((msg, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-start gap-3 backdrop-blur-md">
                    <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0 shadow-[0_0_10px_currentColor]", 
                      msg.type === 'danger' ? 'bg-danger text-danger' : 
                      msg.type === 'warning' ? 'bg-warning text-warning' : 'bg-success text-success'
                    )} />
                    <p className="text-white/90 leading-relaxed font-semibold text-sm">
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 4. DOWNGRADED CHARTS & LEDGER (Secondary Hierarchy) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel p-6 h-[350px] flex flex-col group opacity-90 transition-opacity hover:opacity-100">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
            <BarChart3 className="w-4 h-4 text-textMuted" /> Terminal Velocity
          </h3>
          <div className="flex-1 relative pb-2">
            {loading ? <div className="skeleton w-full h-full rounded-xl" /> : <WeeklyTrendChart expenses={stats.currentMonthExpenses} />}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 h-[350px] flex flex-col group opacity-90 transition-opacity hover:opacity-100">
          <h3 className="font-bold mb-4 text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-textMuted" /> Capital Mix
          </h3>
          <div className="flex-1 relative flex items-center justify-center pb-4">
            {loading ? <div className="skeleton w-40 h-40 rounded-full" /> : <CategoryChart expenses={stats.currentMonthExpenses} />}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="glass-panel overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
        <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
          <h3 className="font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-textMuted" /> Raw Ledger
          </h3>
          <span className="text-xs text-textMuted font-bold uppercase tracking-widest hidden sm:block">Real-time DB Sync</span>
        </div>
        
        <div className="divide-y divide-white/[0.03]">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="skeleton w-10 h-10 rounded-xl" />
                  <div className="skeleton w-32 h-4" />
                </div>
              </div>
            ))
          ) : stats.currentMonthExpenses.length === 0 ? (
            <div className="p-12 text-center text-textMuted text-sm font-medium">Awaiting Telemetry Setup. Press C to begin.</div>
          ) : (
            stats.currentMonthExpenses.slice(0, 4).map((exp, i) => (
              <div key={exp.id || i} className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-textMain font-bold shadow-inner">
                    {exp.category?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-0.5">{exp.notes || exp.category}</h4>
                    <p className="text-xs font-medium text-textMuted">{format(new Date(exp.date), 'MMM dd, yyyy')} • {exp.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-white text-base font-mono">
                    -${parseFloat(exp.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

    </motion.div>
  );
};
