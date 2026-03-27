import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';
import { Pricing } from './pages/Pricing';

// Placeholder pages for remaining nav links
const PlaceholderPage = ({ title }) => (
  <div className="glass-panel p-10 flex flex-col items-center justify-center min-h-[60vh]">
    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-primary mb-4">
      {title}
    </h2>
    <p className="text-textMuted text-center max-w-md">
      This is a premium feature placeholder. Upgrade to unlock full access to {title.toLowerCase()} and other powerful tools.
    </p>
    <button className="btn-primary mt-8 py-3 px-8">Upgrade to Premium</button>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1E293B',
              color: '#F8FAFC',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
            },
            success: { iconTheme: { primary: '#10B981', secondary: '#F8FAFC' } },
            error: { iconTheme: { primary: '#EF4444', secondary: '#F8FAFC' } },
          }}
        />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Private SaaS Routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<PlaceholderPage title="Transactions History" />} />
            <Route path="insights" element={<PlaceholderPage title="Deep Insights AI" />} />
            <Route path="settings" element={<PlaceholderPage title="Account Settings" />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
