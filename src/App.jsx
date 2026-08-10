import React, { useState } from 'react';
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
import NotFound from './pages/NotFound';
import Header from './components/Header';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import NovoProduto from './pages/Admin/NovoProduto';
import EditarProduto from './pages/Admin/EditarProduto';

// 🔒 URL SEGURA DO ADMIN - MUDE AQUI
const ADMIN_BASE = '/n4b1m4k3jul143r1c4rd0l1nd0s';

function App() {
  const [termoBusca, setTermoBusca] = useState('');

  const handleBuscar = (termo) => {
    setTermoBusca(termo);
  };

  return (
    <AdminProvider>
      <CartProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Header termoBusca={termoBusca} onBuscar={handleBuscar} />
          <NotificationContainer />
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produto/:id" element={<ProdutoDetalhe />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/faq" element={<FAQ />} />
            
            
            <Route path={`${ADMIN_BASE}/login`} element={<AdminLogin />} />
            <Route 
              path={`${ADMIN_BASE}/dashboard`} 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={`${ADMIN_BASE}/produtos/novo`} 
              element={
                <ProtectedRoute>
                  <NovoProduto />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={`${ADMIN_BASE}/produtos/editar/:id`} 
              element={
                <ProtectedRoute>
                  <EditarProduto />
                </ProtectedRoute>
              } 
            />

            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;