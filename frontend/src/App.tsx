import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import SmoothScroll from './components/SmoothScroll';
import { AnimatePresence } from 'framer-motion';

// Lazy load heavy components
const Portfolio = lazy(() => import('./components/Portfolio'));
const LoginGateway = lazy(() => import('./components/auth/LoginGateway'));

const AppContent: React.FC = () => {
  return (
    <Router>
      <SmoothScroll>
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div className="min-h-screen bg-[#03050a] flex items-center justify-center font-mono text-[10px] text-elite-cyan tracking-[0.5em] uppercase">
              Initializing Kernel...
            </div>
          }>
            <Routes>
              {/* Public Login Route */}
              <Route path="/login" element={<LoginGateway />} />

              {/* Protected Dashboard Route */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Portfolio />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </SmoothScroll>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#0a0d14',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.1em',
            borderRadius: '0px',
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;
