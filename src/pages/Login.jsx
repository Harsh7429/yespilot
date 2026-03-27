import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, LogIn, UserPlus, Fingerprint, Mail, Lock, ArrowRight } from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const { user, login, register, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(formData.email, formData.password).catch(() => {});
    } else {
      await register(formData.email, formData.password, formData.name).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-background text-textMain flex items-center justify-center p-4 relative overflow-hidden isolate">
      {/* Immersive background orbs */}
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="w-full max-w-[440px] relative z-10"
      >
        <div className="glass-panel p-8 sm:p-10 !rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center mb-10 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(99,102,241,0.4)]"
            >
              <Plane className="w-10 h-10 text-white translate-x-0.5 -translate-y-0.5" />
            </motion.div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
              Yes Pilot
            </h1>
            <p className="text-textMuted text-sm font-medium">
              {isLogin ? 'Welcome back to your financial cockpit.' : 'Your personal autonomous CFO awaits.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="text-xs font-semibold text-textMuted uppercase tracking-wider block mb-1.5 ml-1">Full Name</label>
                  <div className="relative group">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="input-field pl-12 py-3.5 bg-surfaceHover/30 border-white/5"
                      placeholder="Jane Doe"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div>
              <label className="text-xs font-semibold text-textMuted uppercase tracking-wider block mb-1.5 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="input-field pl-12 py-3.5 bg-surfaceHover/30 border-white/5"
                  placeholder="hello@yespilot.com"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="text-xs font-semibold text-textMuted uppercase tracking-wider block mb-1.5 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textMuted group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pl-12 py-3.5 bg-surfaceHover/30 border-white/5 tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 mt-8 text-base shadow-[0_8px_30px_rgba(99,102,241,0.3)] group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLogin ? (
                <span className="flex items-center gap-2">
                  <LogIn className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" /> 
                  Access Dashboard
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" /> 
                  Initialize Account
                  <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center relative z-10">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ email: '', password: '', name: '' });
              }}
              className="text-sm text-textMuted hover:text-white transition-colors font-medium border-b border-white/0 hover:border-white/30 pb-0.5"
            >
              {isLogin ? "New to Yes Pilot? Create account" : 'Already operating? Sign in'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
