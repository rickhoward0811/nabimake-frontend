import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

// 🔒 URL SEGURA DO ADMIN - Mude para o que quiser
const ADMIN_BASE = '/n4b1m4k3jul143r1c4rd0l1nd0s';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`${ADMIN_BASE}/login`} replace />;
  }

  return children;
}