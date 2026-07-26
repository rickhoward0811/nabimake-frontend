import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import NotificationContainer from './components/NotificationContainer';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import ProdutoDetalhe from './pages/ProdutoDetalhe';
import Carrinho from './pages/Carrinho';
import FAQ from './pages/FAQ';
import Header from './components/Header';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import NovoProduto from './pages/Admin/NovoProduto';
import EditarProduto from './pages/Admin/EditarProduto';

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Header />
          <NotificationContainer />
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produto/:id" element={<ProdutoDetalhe />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Rotas Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/produtos/novo" 
              element={
                <ProtectedRoute>
                  <NovoProduto />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/produtos/editar/:id" 
              element={
                <ProtectedRoute>
                  <EditarProduto />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;