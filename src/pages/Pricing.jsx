import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PublicNavbar, Footer } from '../components/PublicNavbar';
import { Check, Compass, Zap, Sparkles, Building, Rocket } from 'lucide-react';

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-background relative selection:bg-indigo-500/30">
      <div className="aurora-bg" />
      <PublicNavbar />
      
      <section className="pt-32 md:pt-48 pb-24 px-6 relative z-10">
        
        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-28">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white text-xs font-bold mb-8">
            <Building className="w-3.5 h-3.5 text-textMuted" /> Honest, transparent pricing
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter">Invest in your financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">clarity.</span></h1>
          <p className="text-lg md:text-xl text-textMuted leading-relaxed">Most people lose $1,200 a year to forgotten subscriptions and impulsive buying. Catch it all for $0. Upgrade for AI-powered autonomy when you're ready.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10">
          
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 relative flex flex-col"
          >
            <div className="mb-8">
              <Compass className="w-8 h-8 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Hobbyist</h3>
              <p className="text-textMuted text-sm">Perfect for individuals starting their personal finance journey.</p>
            </div>
            
            <div className="mb-10 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-white tracking-tighter">$0</span>
              <span className="text-textMuted font-medium">/forever</span>
            </div>
            
            <Link to="/login" className="btn-secondary py-3.5 px-6 w-full text-center transition-colors mb-10 group">
              Get Started Free
            </Link>

            <div className="text-xs uppercase tracking-widest text-textMuted font-bold mb-6">What's included</div>
            <ul className="space-y-4 flex-1 text-sm md:text-base">
              {[
                "Unlimited manual expense tracking",
                "Standard budget limits",
                "Beautiful dark-mode dashboard",
                "Weekly trend reports",
                "Community Discord access",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-400 shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Premium Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-panel p-8 md:p-12 bg-white/[0.03] border-indigo-500/30 relative flex flex-col md:-translate-y-6 shadow-[0_0_80px_rgba(99,102,241,0.1)] group overflow-hidden"
          >
            {/* Glowing gradient background border effect */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-10" />

            <div className="absolute top-8 right-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                Most Popular
              </div>
            </div>

            <div className="mb-8 relative z-10">
              <Zap className="w-8 h-8 text-indigo-400 mb-4 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Yes Pilot Pro</h3>
              <p className="text-textMuted text-sm">The autonomous CFO experience for high performers.</p>
            </div>
            
            <div className="mb-10 flex items-baseline gap-2 relative z-10">
              <span className="text-5xl font-extrabold text-white tracking-tighter">$8</span>
              <span className="text-textMuted font-medium">/month, billed annually</span>
            </div>
            
            <Link to="/login" className="btn-accent py-3.5 px-6 w-full text-center mb-10 group relative z-10 shadow-[0_8px_30px_rgba(99,102,241,0.3)]">
              Start 7-Day Free Trial
            </Link>

            <div className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-6">Everything in free, plus</div>
            <ul className="space-y-4 flex-1 text-sm md:text-base relative z-10">
              {[
                <span className="text-white font-medium flex items-center gap-2">Pilot AI Context Engine <Sparkles className="w-3.5 h-3.5 text-indigo-400" /></span>,
                "Unlimited automated categorization",
                "Sub-budget micro-management",
                "CSV & PDF one-click exports",
                "Historical 5-year trend analysis",
                "Priority 24/7 email support"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
        
        {/* Enterprise/Contact */}
        <div className="mt-20 max-w-5xl mx-auto glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-white/[0.04]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">Need this for your business?</h4>
              <p className="text-textMuted text-sm">Custom API limits, SAML SSO, and dedicated success managers.</p>
            </div>
          </div>
          <button className="btn-secondary px-6 py-2.5">Contact Sales</button>
        </div>

      </section>

      <Footer />
    </div>
  );
};
