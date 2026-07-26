import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [categorias, setCategorias] = useState(['Todos']);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
        const categoriasUnicas = ['Todos', ...new Set(response.data.map(p => p.categoria))];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const produtosFiltrados = produtos.filter(produto => {
    const matchCategoria = categoriaAtiva === 'Todos' || produto.categoria === categoriaAtiva;
    const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-8 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Todos os Produtos</h1>
          <p className="text-gray-500 mt-1">
            {produtosFiltrados.length} produtos encontrados
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produtos..."
              className="border-none bg-transparent outline-none flex-1 text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categoriaAtiva === cat
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-44 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-2 p-4">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex justify-between pt-1">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-9 w-9 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
            <p className="text-gray-400 text-sm mt-1">Tente ajustar sua busca ou filtros</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {produtosFiltrados.map((produto) => (
              <Link to={`/produto/${produto.id}`} key={produto.id}>
                <ProductCard produto={produto} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}