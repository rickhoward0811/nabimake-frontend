import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('nabimake_cart');
    console.log('📦 Carregando carrinho do localStorage:', savedCart);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(parsed);
        console.log('✅ Carrinho carregado:', parsed);
      } catch (error) {
        console.error('❌ Erro ao carregar carrinho:', error);
        setCart([]);
      }
    }
    setLoading(false);
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('nabimake_cart', JSON.stringify(cart));
    }
  }, [cart, loading]);

  // Adicionar item ao carrinho
  const addToCart = (produto) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === produto.id && item.variacao === (produto.variacao || 'Padrão')
      );

      let newCart;
      if (existingIndex !== -1) {
        newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantidade: newCart[existingIndex].quantidade + (produto.quantidade || 1)
        };
      } else {
        const newItem = {
          id: produto.id,
          nome: produto.nome,
          preco: typeof produto.preco === 'number' ? produto.preco : parseFloat(produto.preco),
          imagem: produto.imagem || produto.imagem_url || '',
          categoria: produto.categoria || '',
          variacao: produto.variacao || 'Padrão',
          quantidade: produto.quantidade || 1
        };
        newCart = [...prevCart, newItem];
      }

      setNotification({
        message: `${produto.nome} adicionado ao carrinho!`,
        type: 'success'
      });
      setTimeout(() => setNotification(null), 3000);

      return newCart;
    });
  };

  // Remover item
  const removeFromCart = (id, variacao) => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === id && item.variacao === (variacao || 'Padrão')))
    );
  };

  // Atualizar quantidade
  const updateQuantity = (id, variacao, quantidade) => {
    if (quantidade <= 0) {
      removeFromCart(id, variacao);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.variacao === (variacao || 'Padrão')
          ? { ...item, quantidade }
          : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total
  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.preco) * item.quantidade);
    }, 0);
  };

  // Quantidade total de itens
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantidade, 0);
  };

  // Gerar mensagem WhatsApp - NOVO FORMATO
  const getWhatsAppMessage = () => {
    if (cart.length === 0) return '';
    
    let message = 'Olá! Me interessei pelos seguintes produtos:%0A%0A';
    
    cart.forEach((item, index) => {
      const numero = index + 1;
      const cor = item.variacao || 'Padrão';
      
      message += `${numero}. ${item.nome}%0A`;
      message += `   Cor: ${cor}%0A`;
      message += `   Quantidade: ${item.quantidade}%0A%0A`;
    });
    
    message += 'Gostaria de finalizar minha compra!';
    
    return message;
  };

  // Abrir WhatsApp
  const sendToWhatsApp = (phoneNumber = '5532987181375') => {
    const message = getWhatsAppMessage();
    if (!message) {
      alert('Seu carrinho está vazio!');
      return;
    }
    
    console.log('📱 Mensagem WhatsApp:', message);
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  };

  const value = {
    cart,
    notification,
    setNotification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getTotalItems,
    sendToWhatsApp,
    getWhatsAppMessage,
    loading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};