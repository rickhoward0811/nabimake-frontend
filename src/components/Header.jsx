import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAdmin } from "../context/AdminContext";
import IconeBorboleta from "./IconeBorboleta";

export default function Header({ termoBusca, onBuscar }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  const totalItems = getTotalItems();

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <header className="bg-white border-b border-rosa-claro sticky top-0 z-40">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-7 py-4 flex flex-wrap items-center gap-4 sm:gap-7">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 no-underline rounded-xl px-2 py-1.5 hover:bg-rosa-claro transition-colors duration-200">
          <span className="flex items-center justify-center">
            <IconeBorboleta size={26} />
          </span>
          <span className="font-display font-bold text-[1.3rem] tracking-wide text-marrom-escuro">
            NABIMAKE
          </span>
        </Link>

        {/* Busca */}
        <div className="flex-1 max-w-[440px] ml-0 sm:ml-2 flex items-center gap-2 bg-bege-claro border border-rosa-claro rounded-full px-4 py-2.5 transition-colors duration-200 focus-within:border-rosa-medio focus-within:bg-white order-3 sm:order-none w-full sm:w-auto">
          <Search className="text-marrom flex-shrink-0" size={16} />
          <input
            type="text"
            value={termoBusca || ''}
            onChange={(e) => onBuscar && onBuscar(e.target.value)}
            placeholder="Buscar por nome, marca ou categoria..."
            className="border-none bg-transparent outline-none flex-1 font-corpo text-[0.9rem] text-marrom-escuro placeholder:text-[#b8a68f]"
          />
        </div>

        {/* Nav Desktop */}
        <nav className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          <Link to="/" className="font-corpo font-semibold text-[0.9rem] text-marrom-escuro no-underline px-3.5 py-2 rounded-full hover:bg-rosa-claro transition-colors duration-200">
            Início
          </Link>
          <Link to="/produtos" className="font-corpo font-semibold text-[0.9rem] text-marrom-escuro no-underline px-3.5 py-2 rounded-full hover:bg-rosa-claro transition-colors duration-200">
            Produtos
          </Link>

          {/* Admin Link - Só aparece quando autenticado */}
          {isAuthenticated && (
            <>
              <Link to="/admin/dashboard" className="font-corpo font-semibold text-[0.9rem] text-pink-500 no-underline px-3.5 py-2 rounded-full hover:bg-pink-50 transition-colors duration-200 flex items-center gap-1.5">
                <Shield size={16} />
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="font-corpo font-semibold text-[0.9rem] text-red-500 no-underline px-3.5 py-2 rounded-full hover:bg-red-50 transition-colors duration-200"
              >
                Sair
              </button>
            </>
          )}
        </nav>

        {/* Carrinho */}
        <Link 
          to="/carrinho"
          className="relative w-11 h-11 rounded-full bg-rosa-claro border-none flex items-center justify-center flex-shrink-0 hover:bg-rosa-medio hover:scale-105 transition-all duration-200"
          aria-label="Ver carrinho"
        >
          <ShoppingBag className="text-marrom-escuro" size={19} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-rosa-escuro text-white rounded-full min-w-[18px] h-[18px] text-[0.68rem] flex items-center justify-center px-1 border-2 border-white">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Menu Mobile */}
        <button
          onClick={() => setMenuAberto((v) => !v)}
          className="sm:hidden w-[42px] h-[42px] rounded-full border-none bg-rosa-claro text-marrom-escuro flex items-center justify-center flex-shrink-0 hover:bg-rosa-medio transition-colors duration-200"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        >
          {menuAberto ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Dropdown Mobile */}
      {menuAberto && (
        <div className="border-t border-rosa-claro px-5 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            <Link 
              to="/" 
              onClick={() => setMenuAberto(false)} 
              className="font-corpo font-semibold text-[0.9rem] text-marrom-escuro no-underline px-3.5 py-2.5 rounded-xl hover:bg-rosa-claro transition-colors duration-200"
            >
              Início
            </Link>
            <Link 
              to="/produtos" 
              onClick={() => setMenuAberto(false)} 
              className="font-corpo font-semibold text-[0.9rem] text-marrom-escuro no-underline px-3.5 py-2.5 rounded-xl hover:bg-rosa-claro transition-colors duration-200"
            >
              Produtos
            </Link>
            <Link 
              to="/carrinho" 
              onClick={() => setMenuAberto(false)} 
              className="font-corpo font-semibold text-[0.9rem] text-marrom-escuro no-underline px-3.5 py-2.5 rounded-xl hover:bg-rosa-claro transition-colors duration-200"
            >
              Carrinho
            </Link>
            
            {/* Admin Mobile - Só aparece quando autenticado */}
            {isAuthenticated && (
              <>
                <Link 
                  to="/admin/dashboard" 
                  onClick={() => setMenuAberto(false)} 
                  className="font-corpo font-semibold text-[0.9rem] text-pink-500 no-underline px-3.5 py-2.5 rounded-xl hover:bg-pink-50 transition-colors duration-200 flex items-center gap-2"
                >
                  <Shield size={16} />
                  Admin
                </Link>
                <button
                  onClick={() => {
                    setMenuAberto(false);
                    handleLogout();
                  }}
                  className="font-corpo font-semibold text-[0.9rem] text-red-500 no-underline px-3.5 py-2.5 rounded-xl hover:bg-red-50 transition-colors duration-200 text-left"
                >
                  Sair
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}