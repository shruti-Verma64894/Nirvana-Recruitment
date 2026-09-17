import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import Dashboard from '../pages/admin/Dashboard';

export default function AppRoutes({ isLoggedIn, onLoginSuccess, onLogout }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLoginSuccess={onLoginSuccess} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? <Dashboard onLogout={onLogout} /> : <Navigate to="/login" replace />
        }
      />
      <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}