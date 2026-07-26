import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ produto, isNeon = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imagemAtual, setImagemAtual] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  if (!produto || !produto.id) {
    console.warn('⚠️ Produto inválido:', produto);
    return null;
  }

  const imagemPrincipal = produto.imagem_url || 
    (produto.variacoes && produto.variacoes.length > 0 
      ? produto.variacoes[0].imagem_url 
      : 'https://via.placeholder.com/300x300?text=Sem+Imagem');

  const cores = produto.variacoes && produto.variacoes.length > 0 
    ? produto.variacoes.map(v => v.cor)
    : [];

  const corPrincipal = cores.length > 0 ? cores[0] : '';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item = {
      id: produto.id,
      nome: produto.nome,
      preco: parseFloat(produto.preco),
      imagem: imagemPrincipal,
      categoria: produto.categoria || '',
      variacao: corPrincipal || 'Padrão'
    };
    
    addToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (produto.variacoes && produto.variacoes.length > 1) {
      setImagemAtual(produto.variacoes[1].imagem_url);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setImagemAtual('');
  };

  const imagemExibida = isHovered && imagemAtual ? imagemAtual : imagemPrincipal;

  // Função para truncar título em 2 linhas
  const truncarTitulo = (texto, limite = 55) => {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
  };

  return (
    <Link 
      to={`/produto/${produto.id}`}
      className="group block h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-100/50 h-full flex flex-col">
        
        {/* Container da imagem */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square flex-shrink-0">
          <img
            src={imagemExibida}
            alt={produto.nome || 'Produto'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=Sem+Imagem';
            }}
          />
          
          {/* Badge de categoria - ESTILO ROSÉ */}
          {produto.categoria && (
            <span className="absolute top-3 left-3 bg-[#FFF5F7] text-[#3D2C1E] text-[10px] font-medium px-3 py-1 rounded-full uppercase tracking-wider transition-all duration-300 border border-[#D46A8C]/20 group-hover:border-[#D46A8C]/40">
              {produto.categoria}
            </span>
          )}

          {/* Botão de ação - apenas Visualizar */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/produto/${produto.id}`;
              }}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-pink-50 transition-all duration-300 hover:scale-110 hover:-rotate-12"
              aria-label="Visualizar"
            >
              <Eye size={18} className="text-gray-700" />
            </button>
          </div>

          {/* Indicador de variações */}
          {produto.variacoes && produto.variacoes.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {produto.variacoes.slice(0, 4).map((variacao, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border-2 border-white shadow-sm transition-all duration-300 hover:scale-125"
                  style={{
                    background: variacao.cor && variacao.cor.includes('Cor') 
                      ? `hsl(${index * 60}, 70%, 60%)` 
                      : '#D4C5B0'
                  }}
                  title={variacao.cor || 'Cor'}
                />
              ))}
              {produto.variacoes.length > 4 && (
                <span className="text-[10px] text-white font-medium bg-black/50 px-1.5 rounded-full">
                  +{produto.variacoes.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Informações do produto - COM ALTURA FIXA */}
        <div className="p-4 space-y-2 flex-1 flex flex-col">
          {/* Título com altura fixa de 2 linhas e line-clamp-2 */}
          <div className="min-h-[48px]">
            <h3 
              className={`text-base font-bold line-clamp-2 leading-snug transition-all duration-300 ${
                isNeon 
                  ? 'text-gray-900 drop-shadow-[0_0_10px_rgba(233,30,99,0.3)] hover:drop-shadow-[0_0_25px_rgba(233,30,99,0.6)]' 
                  : 'text-gray-900 group-hover:text-pink-600'
              }`}
            >
              {truncarTitulo(produto.nome || 'Produto sem nome')}
            </h3>
          </div>

          {/* Espaçador flexível para empurrar o preço para baixo */}
          <div className="flex-1"></div>

          {/* Preço e botão - SEMPRE NA MESMA ALTURA */}
          <div className="flex items-center justify-between pt-1 mt-auto">
            <div className="bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
              <strong className="text-lg font-bold text-pink-600">
                R$ {produto.preco ? parseFloat(produto.preco).toFixed(2).replace('.', ',') : '0,00'}
              </strong>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 active:scale-95 ${
                isAdded 
                  ? 'bg-green-500 hover:bg-green-600 rotate-0 scale-110' 
                  : 'bg-black hover:bg-pink-500 hover:rotate-90 hover:scale-110'
              }`}
              aria-label={isAdded ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
            >
              {isAdded ? (
                <span className="text-white text-lg">✓</span>
              ) : (
                <ShoppingBag size={16} className="text-white" />
              )}
            </button>
          </div>

          {/* Cores disponíveis */}
          {cores.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-gray-400">
                {cores.length} {cores.length === 1 ? 'cor' : 'cores'}
              </span>
              <div className="flex gap-1">
                {cores.slice(0, 3).map((cor, index) => (
                  <span
                    key={index}
                    className="w-2.5 h-2.5 rounded-full border border-gray-200 transition-all duration-300 hover:scale-150"
                    style={{
                      background: cor && cor.includes('Cor') 
                        ? `hsl(${index * 60 + 20}, 70%, 60%)` 
                        : '#D4C5B0'
                    }}
                  />
                ))}
                {cores.length > 3 && (
                  <span className="text-[9px] text-gray-400">+{cores.length - 3}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}