import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, LogOut, Wallet, BarChart, Settings, Plane, Sparkles, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';

export const Layout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Transactions', icon: Wallet, path: '/dashboard/transactions', locked: true },
    { name: 'AI Insights', icon: BarChart, path: '/dashboard/insights', locked: true },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  const handleLogout = async () => {
    toast.promise(logout(), {
      loading: 'Signing out...',
      success: 'Signed out successfully!',
      error: 'Failed to sign out'
    });
  };

  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col md:flex-row">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="hidden md:flex flex-col w-64 bg-surface border-r border-border p-6 h-screen sticky top-0"
      >
        <div className="flex items-center gap-3 mb-10 text-primary">
          <Plane className="w-8 h-8" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-primary">
            Yes Pilot
          </span>
        </div>

        <nav className="flex-1 space-y-1.5 mt-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  if (link.locked) {
                    e.preventDefault();
                    toast.error('This is a Premium feature', { icon: '💎' });
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium relative overflow-hidden group",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-inner" 
                    : "text-textMuted hover:bg-surfaceHover/60 hover:text-textMain border border-transparent"
                )}
              >
                {isActive && (
                  <motion.div layoutId="nav-pill" className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                )}
                <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                <span className="flex-1">{link.name}</span>
                {link.locked && <Lock className="w-3.5 h-3.5 text-textMuted/50" />}
              </Link>
            )
          })}
        </nav>

        {/* Premium Upgrade Card */}
        <div className="mt-8 mb-6 p-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/5 relative overflow-hidden group cursor-pointer hover:border-white/10 transition-colors" onClick={() => toast('Stripe checkout coming soon!', { icon: '🚀' })}>
          <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
            <Sparkles className="w-12 h-12" />
          </div>
          <h4 className="font-bold text-sm text-white flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-warning" />
            Yes Pilot Pro
          </h4>
          <p className="text-xs text-textMuted leading-relaxed mb-3">Unlock AI Insights, unlimited transactions & exports.</p>
          <button className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white w-full py-2 rounded-xl transition-colors">
            Upgrade Now
          </button>
        </div>

        <div className="mt-auto border-t border-white/5 pt-6">
          <div className="flex items-center gap-3 mb-6 p-2 rounded-2xl hover:bg-surfaceHover/30 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
              {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold truncate text-textMain">{user.name || 'User'}</p>
              <p className="text-xs text-textMuted truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 text-textMuted hover:text-danger hover:bg-danger/10 p-3 rounded-2xl transition-all w-full font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full min-h-screen relative pb-24 md:pb-10">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (SaaS standard) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-xl border-t border-white/5 pb-safe z-50">
        <div className="flex justify-around items-center p-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  if (link.locked) {
                    e.preventDefault();
                    toast.error('This is a Premium feature', { icon: '💎' });
                  }
                }}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all flex-1 relative",
                  isActive ? "text-primary" : "text-textMuted"
                )}
              >
                {isActive && (
                  <motion.div layoutId="mobile-pill" className="absolute top-1 w-12 h-1 bg-primary rounded-full" />
                )}
                <Icon className={cn("w-6 h-6 mt-1 mb-0.5", isActive && "animate-pulse shadow-primary/20")} />
                <span className="text-[10px] font-medium">{link.name}</span>
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 p-3 rounded-2xl text-textMuted hover:text-danger flex-1"
          >
            <LogOut className="w-6 h-6 mt-1 mb-0.5" />
            <span className="text-[10px] font-medium">Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
