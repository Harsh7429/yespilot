// Mock authentication service using localStorage
// In production, sync this with real Firebase Auth
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  async register(email, password, name) {
    await delay(800);
    const users = JSON.parse(localStorage.getItem('yp_users') || '{}');
    if (users[email]) throw new Error('Email already in use');
    
    const user = {
      uid: 'u_' + Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString()
    };
    
    users[email] = { ...user, password }; // Insecure, just for mock
    localStorage.setItem('yp_users', JSON.stringify(users));
    
    // Set current session
    localStorage.setItem('yp_session', JSON.stringify(user));
    return user;
  },

  async login(email, password) {
    await delay(800);
    const users = JSON.parse(localStorage.getItem('yp_users') || '{}');
    const userRecord = users[email];
    
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    const { password: _, ...user } = userRecord;
    localStorage.setItem('yp_session', JSON.stringify(user));
    return user;
  },

  async logout() {
    await delay(400);
    localStorage.removeItem('yp_session');
  },

  getCurrentUser() {
    const session = localStorage.getItem('yp_session');
    return session ? JSON.parse(session) : null;
  }
};
