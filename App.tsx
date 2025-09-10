import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { OrganizerDashboard } from './pages/OrganizerDashboard';
import { AdminPanel } from './pages/AdminPanel';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/dashboard" replace />} />
      <Route 
        path="/dashboard" 
        element={
          !user ? (
            <Navigate to="/" replace />
          ) : user.role === 'student' ? (
            <StudentDashboard />
          ) : user.role === 'organizer' ? (
            <OrganizerDashboard />
          ) : user.role === 'admin' ? (
            <AdminPanel />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } 
      />
      <Route path="*" element={<Navigate to={!user ? "/" : "/dashboard"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;