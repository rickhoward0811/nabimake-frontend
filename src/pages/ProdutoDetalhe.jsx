import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronLeft, Sparkles, Truck, Shield, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [variacaoSelecionada, setVariacaoSelecionada] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [imagemPrincipal, setImagemPrincipal] = useState('');
  const [produtosRelacionados, setProdutosRelacionados] = useState([]);
  const [produtosAleatorios, setProdutosAleatorios] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
        
        if (response.data.imagem_url) {
          setImagemPrincipal(response.data.imagem_url);
        } else if (response.data.variacoes && response.data.variacoes.length > 0) {
          setImagemPrincipal(response.data.variacoes[0].imagem_url);
          setVariacaoSelecionada(response.data.variacoes[0]);
        }

        // Buscar todos os produtos para relacionados
        const todosProdutos = await api.get('/produtos');
        
        // Buscar produtos da mesma categoria
        const relacionados = todosProdutos.data.filter(
          p => p.categoria === response.data.categoria && p.id !== response.data.id
        );
        
        // Buscar produtos aleatórios (fallback)
        const shuffled = [...todosProdutos.data]
          .filter(p => p.id !== response.data.id)
          .sort(() => 0.5 - Math.random());
        const aleatorios = shuffled.slice(0, 4);
        
        setProdutosRelacionados(relacionados);
        setProdutosAleatorios(aleatorios);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  const handleVariacaoClick = (variacao) => {
    setVariacaoSelecionada(variacao);
    setImagemPrincipal(variacao.imagem_url);
  };

  const incrementarQtd = () => {
    setQuantidade(prev => prev + 1);
  };

  const decrementarQtd = () => {
    if (quantidade > 1) {
      setQuantidade(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const item = {
      id: produto.id,
      nome: produto.nome,
      preco: parseFloat(produto.preco),
      imagem: imagemPrincipal,
      categoria: produto.categoria,
      variacao: variacaoSelecionada?.cor || 'Padrão',
      quantidade: quantidade
    };
    
    addToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDFC] px-4 py-8 lg:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-[#F5F0E8] rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-[#F5F0E8] rounded-2xl shimmer"></div>
              <div className="space-y-4">
                <div className="h-8 bg-[#F5F0E8] rounded w-3/4 shimmer"></div>
                <div className="h-6 bg-[#F5F0E8] rounded w-1/4 shimmer"></div>
                <div className="h-24 bg-[#F5F0E8] rounded shimmer"></div>
                <div className="h-12 bg-[#F5F0E8] rounded w-1/2 shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="min-h-screen bg-[#FFFDFC] px-4 py-8 lg:px-6">
        <div className="mx-auto max-w-6xl text-center py-16">
          <h2 className="text-2xl font-bold text-[#3D2C1E]">Produto não encontrado</h2>
          <p className="text-[#3D2C1E]/70 mt-2">O produto que você procura não existe ou foi removido.</p>
          <Link to="/produtos" className="inline-block mt-6 px-6 py-3 bg-[#3D2C1E] text-white rounded-full hover:bg-[#3D2C1E]/80 transition-colors">
            Ver todos os produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFC] px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <Link 
          to="/produtos" 
          className="inline-flex items-center gap-2 text-[#3D2C1E]/60 hover:text-[#3D2C1E] transition-all duration-300 hover:translate-x-[-4px] mb-6 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para produtos</span>
        </Link>

        {/* Card Principal */}
        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 30px 80px rgba(180,160,140,0.08), 0 10px 30px rgba(180,160,140,0.04)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Imagem */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white/50">
                <img
                  src={imagemPrincipal}
                  alt={produto.nome}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {produto.variacoes && produto.variacoes.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {produto.variacoes.map((variacao) => (
                    <button
                      key={variacao.id}
                      onClick={() => handleVariacaoClick(variacao)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                        variacaoSelecionada?.id === variacao.id
                          ? 'border-[#D46A8C] shadow-md shadow-[#D46A8C]/20'
                          : 'border-transparent hover:border-[#D46A8C]/30'
                      }`}
                    >
                      <img
                        src={variacao.imagem_url}
                        alt={variacao.cor}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="inline-block text-xs uppercase tracking-[2px] text-[#D46A8C] font-semibold bg-[#FFF5F7] px-3 py-1 rounded-full border border-[#D46A8C]/10">
                  {produto.categoria || 'NabiMake'}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-[#3D2C1E] leading-tight animate-fade-in">
                {produto.nome}
              </h1>

              <div className="flex items-center gap-3 py-2">
                <span className="text-4xl md:text-5xl font-bold text-[#3D2C1E] tracking-tight">
                  R$ {parseFloat(produto.preco).toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 py-2">
                <div className="flex items-center gap-2 text-xs font-medium text-[#3D2C1E]/80 bg-white px-3.5 py-2 rounded-full shadow-md border border-[#F5F0E8]">
                  <Truck size={14} className="text-[#D4A84B]" />
                  <span>Entrega Rápida</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#3D2C1E]/80 bg-white px-3.5 py-2 rounded-full shadow-md border border-[#F5F0E8]">
                  <Shield size={14} className="text-[#D4A84B]" />
                  <span>Compra Segura</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#3D2C1E]/80 bg-white px-3.5 py-2 rounded-full shadow-md border border-[#F5F0E8]">
                  <Clock size={14} className="text-[#D4A84B]" />
                  <span>Estoque Disponível</span>
                </div>
              </div>

              {produto.variacoes && produto.variacoes.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#3D2C1E]">
                    Cor: <span className="font-normal text-[#D46A8C]">
                      {variacaoSelecionada?.cor || 'Selecione uma cor'}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {produto.variacoes.map((variacao) => (
                      <button
                        key={variacao.id}
                        onClick={() => handleVariacaoClick(variacao)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                          variacaoSelecionada?.id === variacao.id
                            ? 'bg-[#D46A8C] text-white shadow-md shadow-[#D46A8C]/25'
                            : 'bg-[#F5F0E8] text-[#3D2C1E]/70 hover:bg-[#D46A8C]/10 hover:text-[#D46A8C]'
                        }`}
                      >
                        {variacao.cor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-[#3D2C1E] flex items-center gap-2">
                  <Sparkles size={16} className="text-[#D4A84B]" />
                  Descrição
                </h3>
                <p className="text-sm text-[#3D2C1E]/70 leading-relaxed whitespace-pre-line bg-[#FCF7F3]/50 p-4 rounded-xl border border-[#F5F0E8]">
                  {produto.descricao}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#F5F0E8]">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#3D2C1E]">Qtd:</span>
                  <div className="flex items-center border border-[#F5F0E8] rounded-full overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={decrementarQtd}
                      className="px-4 py-2 hover:bg-[#F5F0E8] transition-colors text-[#3D2C1E]/70 hover:text-[#3D2C1E]"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-[#3D2C1E] font-medium">
                      {quantidade}
                    </span>
                    <button
                      onClick={incrementarQtd}
                      className="px-4 py-2 hover:bg-[#F5F0E8] transition-colors text-[#3D2C1E]/70 hover:text-[#3D2C1E]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-white transition-all duration-300 ${
                    isAdded 
                      ? 'bg-green-500 hover:bg-green-600 scale-105 shadow-lg shadow-green-200' 
                      : 'bg-gradient-to-r from-[#D46A8C] to-[#C65C7C] hover:from-[#C65C7C] hover:to-[#B04E6E] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#D46A8C]/35'
                  }`}
                >
                  <ShoppingBag size={20} />
                  {isAdded ? 'Adicionado!' : 'Adicionar ao carrinho'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Relacionados - COM FALLBACK */}
        <div className="mt-16 rounded-3xl p-8" style={{ background: '#FCF7F3' }}>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-[#3D2C1E]">
              {produtosRelacionados.length > 0 ? 'Produtos Relacionados' : 'Você também pode gostar'}
            </h2>
            {produtosRelacionados.length > 0 && (
              <span className="text-sm text-[#D46A8C] bg-white px-3 py-1 rounded-full border border-[#D46A8C]/10">
                {produto.categoria}
              </span>
            )}
          </div>

          {produtosRelacionados.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {produtosRelacionados.map((produtoRelacionado) => (
                <ProductCard key={produtoRelacionado.id} produto={produtoRelacionado} />
              ))}
            </div>
          ) : produtosAleatorios.length > 0 ? (
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Sem produtos da mesma categoria por enquanto. Confira estes destaques:
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {produtosAleatorios.map((produtoAleatorio) => (
                  <ProductCard key={produtoAleatorio.id} produto={produtoAleatorio} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">
              Sem estoque de produtos relacionados por enquanto.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}