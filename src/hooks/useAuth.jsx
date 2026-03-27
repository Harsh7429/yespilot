import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const u = await authService.login(email, password);
      setUser(u);
      toast.success('Welcome back!');
    } catch (e) {
      setError(e.message);
      toast.error(e.message || 'Failed to sign in');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const u = await authService.register(email, password, name);
      setUser(u);
      toast.success('Account created successfully!');
    } catch (e) {
      setError(e.message);
      toast.error(e.message || 'Failed to create account');
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await authService.logout();
    setUser(null);
    setLoading(false);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
