import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/api';

// 🔒 URL SEGURA DO ADMIN - Mude para o que quiser
const ADMIN_BASE = '/n8k7l2p9';

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

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (senha) => {
    try {
      const response = await api.post('/admin/login', { senha });
      
      if (response.data && response.data.token) {
        const { token } = response.data;
        
        localStorage.setItem('admin_token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
        setUser({ email: 'admin@nabimake.com' });
        
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
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    // Redirecionar para a nova URL de login
    window.location.href = `${ADMIN_BASE}/login`;
  };

  const value = {
    isAuthenticated,
    loading,
    user,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};