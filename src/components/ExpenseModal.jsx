import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Command } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';

export const ExpenseModal = ({ isOpen, onClose }) => {
  const { addExpense } = useExpenses();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    notes: ''
  });

  const categories = [
    { name: 'Food', icon: '🍔' },
    { name: 'Transport', icon: '🚗' },
    { name: 'Utilities', icon: '⚡' },
    { name: 'Entertainment', icon: '🎮' },
    { name: 'Shopping', icon: '🛍️' },
    { name: 'Other', icon: '🔖' }
  ];

  // Auto-focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setFormData({ amount: '', category: 'Food', notes: '' });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;
    
    setLoading(true);
    try {
      await addExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString()
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const setCategory = (catName) => {
    setFormData(prev => ({ ...prev, category: catName }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#000000]/80 backdrop-blur-2xl z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-[480px] bg-surface border border-white/5 rounded-t-[32px] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
          >
            {/* Ambient Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] pointer-events-none rounded-full" />
            
            <div className="p-8 pb-10 relative z-10 flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  <Command className="w-5 h-5 text-indigo-400" /> Fast Log
                </h2>
                <div className="flex items-center gap-3">
                   <div className="hidden sm:flex text-xs text-textMuted/40 font-bold uppercase tracking-widest border border-white/5 px-2 py-1 rounded bg-white/[0.02]">
                     Esc to cancel
                   </div>
                   <button onClick={onClose} className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-textMuted hover:text-white transition-all">
                     <X className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <form id="fast-log-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Massive Amount Input Engine */}
                <div>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 text-4xl font-extrabold">$</div>
                    <input
                      ref={inputRef}
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      value={formData.amount}
                      onChange={e => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full bg-white/[0.02] border border-white/5 focus:border-indigo-500/50 rounded-3xl pl-[70px] pr-6 py-6 text-5xl font-extrabold text-white outline-none transition-all duration-300 placeholder:text-white/10 shadow-inner tracking-tighter"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Instant Categories (1-click select, replaces boring dropdown) */}
                <div>
                  <label className="text-xs font-bold text-textMuted/60 uppercase tracking-widest block mb-3 ml-2">Category (Optional)</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(c => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setCategory(c.name)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 border ${
                          formData.category === c.name 
                            ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                            : 'bg-white/[0.02] border-white/5 text-textMuted hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <span className="text-base">{c.icon}</span> {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes Input */}
                <div>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/5 focus:border-indigo-500/30 rounded-xl px-5 py-4 text-white outline-none transition-all placeholder:text-textMuted/40 font-medium"
                    placeholder="Brief note? (e.g. Uber to Airport)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (formData.amount) handleSubmit(e);
                      }
                    }}
                  />
                </div>
              </form>
            </div>

            {/* Smart Submit Footer */}
            <div className="p-4 bg-white/[0.02] border-t border-white/5">
              <button 
                type="submit" 
                form="fast-log-form"
                disabled={loading || !formData.amount}
                className="btn-accent w-full py-4 text-base rounded-2xl disabled:opacity-50 group flex items-center justify-between px-6"
              >
                <span className="font-extrabold tracking-tight">Save Telemetry</span>
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <div className="flex items-center gap-2 text-indigo-200">
                    <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">Press Enter</span>
                    <kbd className="hidden sm:inline-flex items-center justify-center w-6 h-6 rounded bg-black/20 text-[10px] border border-white/10">↵</kbd>
                  </div>
                )}
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
