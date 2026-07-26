import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/api';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de um AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const expiresAt = localStorage.getItem('admin_expires_at');
    
    if (token && expiresAt) {
      const now = Date.now();
      const expiry = parseInt(expiresAt);
      
      if (now < expiry) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
        setUser({ role: 'admin' });
        setSessionExpiresAt(expiry);
        
        // Configurar timeout para expirar automaticamente
        const timeUntilExpiry = expiry - now;
        setTimeout(() => {
          logout();
        }, timeUntilExpiry);
      } else {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (senha) => {
    try {
      const response = await api.post('/admin/login', { senha });
      
      if (response.data && response.data.token) {
        const { token, user } = response.data;
        const expiresIn = 12 * 60 * 60 * 1000; // 12 horas
        const expiresAt = Date.now() + expiresIn;
        
        localStorage.setItem('admin_token', token);
        localStorage.setItem('admin_expires_at', String(expiresAt));
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
        setUser(user || { role: 'admin' });
        setSessionExpiresAt(expiresAt);
        
        // Configurar timeout para expirar automaticamente
        setTimeout(() => {
          logout();
        }, expiresIn);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.data?.erro || 'Erro ao fazer login' 
        };
      }
    } catch (error) {
      const mensagem = error.response?.data?.erro || 'Erro ao fazer login';
      return { success: false, error: mensagem };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_expires_at');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    setSessionExpiresAt(null);
  };

  const value = {
    isAuthenticated,
    loading,
    user,
    login,
    logout,
    sessionExpiresAt
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};