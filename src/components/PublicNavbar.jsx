import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../utils/cn';

export const PublicNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Transform border and background based on scroll for that premium Vercel-like shrink effect
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.7]);
  const backdropBlur = useTransform(scrollY, [0, 50], [0, 16]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.08]);

  const links = [
    { name: 'Features', path: '/#features' },
    { name: 'How it works', path: '/#how-it-works' },
    { name: 'Pricing', path: '/pricing' }
  ];

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (path.startsWith('/#') && location.pathname === '/') {
      const element = document.getElementById(path.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <motion.nav 
      style={{
        backgroundColor: useTransform(bgOpacity, v => `rgba(10, 10, 10, ${v})`),
        backdropFilter: useTransform(backdropBlur, v => `blur(${v}px)`),
        borderBottom: useTransform(borderOpacity, v => `1px solid rgba(255,255,255,${v})`)
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Plane className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white tracking-tighter">Yes Pilot</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] rounded-full px-1.5 py-1.5 shadow-inner">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={cn(
                "text-xs font-medium transition-all px-4 py-1.5 rounded-full hover:bg-white/[0.08] hover:text-white",
                location.pathname === link.path || location.hash === link.path.substring(1)
                  ? "bg-white/[0.08] text-white" 
                  : "text-textMuted"
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 border-l border-white/[0.08] pl-4 md:pl-6">
          <Link to="/login" className="hidden sm:flex items-center text-sm font-medium text-textMuted hover:text-white transition-colors">
            Sign in
          </Link>
          <Link to="/login" className="btn-accent text-sm px-5 py-2.5 rounded-lg shadow-lg">
            Start Free
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export const Footer = () => (
  <footer className="border-t border-white/5 bg-surface mt-24">
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <Plane className="w-5 h-5 text-textMuted" />
        <span className="text-lg font-bold text-textMuted tracking-tight">Yes Pilot</span>
      </div>
      <div className="flex gap-6 text-sm text-textMuted font-medium">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
      </div>
    </div>
  </footer>
);
