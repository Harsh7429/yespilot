import { useState, useEffect, useCallback } from 'react';
import { expenseService } from '../services/expenseService';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export const useExpenses = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const [exp, bdg] = await Promise.all([
        expenseService.getExpenses(user.uid),
        expenseService.getBudget(user.uid)
      ]);
      setExpenses(exp);
      setBudget(bdg);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addExpense = async (expense) => {
    if (!user) return;
    try {
      const newExp = await expenseService.addExpense(user.uid, expense);
      setExpenses(prev => [newExp, ...prev].sort((a,b) => new Date(b.date) - new Date(a.date)));
      toast.success('Expense added successfully!');
      return newExp;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to add expense');
      throw err;
    }
  };

  const deleteExpense = async (id) => {
    if (!user) return;
    try {
      await expenseService.deleteExpense(user.uid, id);
      setExpenses(prev => prev.filter(e => e.id !== id));
      toast.success('Transaction deleted');
    } catch (err) {
      setError(err.message);
      toast.error('Failed to delete transaction');
      throw err;
    }
  };

  const updateBudget = async (amount) => {
    if (!user) return;
    try {
      await expenseService.setBudget(user.uid, amount);
      setBudget(amount);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    expenses,
    budget,
    loading,
    error,
    addExpense,
    deleteExpense,
    updateBudget,
    refresh: loadData
  };
};
