import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { 
    cart, 
    isOpen, 
    setIsOpen, 
    removeFromCart, 
    updateQuantity, 
    getTotal, 
    getTotalItems,
    sendToWhatsApp 
  } = useCart();

  // Número do WhatsApp (substitua pelo número da loja)
  const WHATSAPP_NUMBER = '5511999999999';

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">
              Meu Carrinho
            </h2>
            <span className="text-sm text-gray-500">
              ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de itens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Seu carrinho está vazio</p>
              <p className="text-sm text-gray-400 mt-1">
                Explore nossos produtos e encontre o que você ama!
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.variacao}`}
                className="flex gap-4 bg-gray-50 rounded-xl p-3"
              >
                {/* Imagem */}
                <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informações */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.nome}
                  </h3>
                  {item.variacao && (
                    <p className="text-xs text-gray-500">Cor: {item.variacao}</p>
                  )}
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    R$ {parseFloat(item.preco).toFixed(2).replace('.', ',')}
                  </p>

                  {/* Controles de quantidade */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.variacao, item.quantidade - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantidade}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.variacao, item.quantidade + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-200 transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.variacao)}
                      className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer com total e checkout */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="flex justify-between text-base font-semibold text-gray-900">
              <span>Total:</span>
              <span>R$ {getTotal().toFixed(2).replace('.', ',')}</span>
            </div>

            <button
              onClick={() => {
                sendToWhatsApp(WHATSAPP_NUMBER);
                setIsOpen(false);
              }}
              className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              Finalizar Pedido via WhatsApp
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}