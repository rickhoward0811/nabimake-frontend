import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nabimakecatalogo-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se for 401 e NÃO for a rota de login, redireciona
    if (error.response?.status === 401 && !error.config?.url?.includes('/login')) {
      localStorage.removeItem('admin_token');
      delete api.defaults.headers.common['Authorization'];
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;