import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

export default function Carrinho() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotal, 
    getTotalItems,
    sendToWhatsApp,
    clearCart
  } = useCart();

  const [produtosRelacionados, setProdutosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('🛒 Página do Carrinho - Itens:', cart);

  // Buscar produtos para recomendação
  useEffect(() => {
    const fetchRecomendacoes = async () => {
      try {
        const response = await api.get('/produtos');
        const idsNoCarrinho = cart.map(item => item.id);
        const produtosDisponiveis = response.data.filter(p => !idsNoCarrinho.includes(p.id));
        const shuffled = produtosDisponiveis.sort(() => 0.5 - Math.random());
        setProdutosRelacionados(shuffled.slice(0, 4));
      } catch (error) {
        console.error('Erro ao carregar recomendações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecomendacoes();
  }, [cart]);

  const WHATSAPP_NUMBER = '5532987181375';

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 px-4 py-8 lg:px-6">
        <div className="mx-auto max-w-4xl text-center py-16">
          <div className="bg-white rounded-3xl shadow-sm p-12">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Seu carrinho está vazio</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Explore nossos produtos e encontre o que você ama!
            </p>
            <Link 
              to="/produtos" 
              className="inline-block mt-6 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Ver produtos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/produtos" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Continuar comprando</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag size={24} />
            Meu Carrinho
            <span className="text-sm font-normal text-gray-500">
              ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de produtos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.variacao}`}
                className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                  <img
                    src={item.imagem || 'https://via.placeholder.com/300x300?text=Sem+Imagem'}
                    alt={item.nome}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=Sem+Imagem';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {item.nome}
                      </h3>
                      {item.variacao && (
                        <p className="text-xs text-gray-500">Cor: {item.variacao}</p>
                      )}
                      <p className="text-sm font-bold text-gray-900 mt-1">
                        R$ {parseFloat(item.preco).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.variacao)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remover item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-sm text-gray-600">Quantidade:</span>
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.variacao, item.quantidade - 1)}
                        className="px-3 py-1.5 hover:bg-gray-50 transition-colors text-gray-600"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-gray-900">
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.variacao, item.quantidade + 1)}
                        className="px-3 py-1.5 hover:bg-gray-50 transition-colors text-gray-600"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="text-sm font-medium text-gray-900 ml-auto">
                      Subtotal: R$ {(parseFloat(item.preco) * item.quantidade).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 size={14} />
              Limpar carrinho
            </button>
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    R$ {getTotal().toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-900 pt-4">
                <span>Total</span>
                <span>R$ {getTotal().toFixed(2).replace('.', ',')}</span>
              </div>

              <button
                onClick={() => sendToWhatsApp(WHATSAPP_NUMBER)}
                className="w-full mt-6 py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <CreditCard size={20} />
                Finalizar via WhatsApp
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Você será redirecionado para o WhatsApp para finalizar seu pedido
              </p>
            </div>
          </div>
        </div>

        {/* Produtos Recomendados */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Você também pode gostar
          </h2>
          
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-44 bg-gray-200 rounded-2xl"></div>
                  <div className="space-y-2 p-4">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {produtosRelacionados.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}