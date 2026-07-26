import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import FeatureBadges from '../components/FeatureBadges';
import FAQPreview from '../components/FAQPreview';
import api from '../api/api';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [categorias, setCategorias] = useState(['Todos']);
  const [produtosAleatorios, setProdutosAleatorios] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos');
        setProdutos(response.data);
        
        // Selecionar 10 produtos aleatórios para efeito NEON
        const shuffled = [...response.data].sort(() => 0.5 - Math.random());
        const selecionados = shuffled.slice(0, 10);
        setProdutosAleatorios(selecionados);
        
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

  const produtosFiltrados = categoriaAtiva === 'Todos'
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtiva);

  // Redes Sociais
  const redesSociais = [
    {
      nome: 'Instagram',
      icone: '📸',
      url: 'https://www.instagram.com/nabimakestore',
      descricao: 'Siga nosso perfil e veja nossos looks!',
      cor: 'hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400',
      corTexto: 'hover:text-white'
    },
    {
      nome: 'WhatsApp',
      icone: '💬',
      url: 'https://wa.me/5532987181375',
      descricao: 'Fale conosco diretamente pelo WhatsApp!',
      cor: 'hover:bg-green-500',
      corTexto: 'hover:text-white'
    },
    {
      nome: 'E-mail',
      icone: '✉️',
      url: 'mailto:nabimakestore@gmail.com',
      descricao: 'Envie um e-mail para nossa equipe!',
      cor: 'hover:bg-blue-500',
      corTexto: 'hover:text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 1. HERO - OCUPA 100% DA LARGURA */}
      <Hero />

      {/* 2. PRODUTOS */}
      <div className="px-4 py-8 lg:px-6" id="produtos">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <span className="text-sm font-semibold text-pink-500 uppercase tracking-wider">
              Nossos Produtos
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Produtos em Destaque
            </h2>
            <p className="text-gray-500 mt-1">
              Encontre os melhores produtos para realçar sua beleza
            </p>
          </div>

          <CategoryFilter 
            categorias={categorias}
            categoriaAtiva={categoriaAtiva}
            onCategoriaChange={setCategoriaAtiva}
          />

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-44 bg-gray-200 rounded-2xl"></div>
                  <div className="space-y-1.5 p-3.5">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex justify-between pt-1">
                      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid 
              produtos={produtosFiltrados} 
              produtosAleatorios={produtosAleatorios}
            />
          )}

          {!loading && produtosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhum produto encontrado na categoria "{categoriaAtiva}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. CONECTE-SE CONOSCO */}
      <section 
        className="py-16 px-4"
        style={{ 
          backgroundColor: '#FFECE5',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#3D2C1E] uppercase tracking-wider">
              Conecte-se conosco
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D2C1E] mt-2">
              Siga a NabiMake
            </h2>
            <p className="text-[#3D2C1E]/70 mt-2 max-w-lg mx-auto">
              Acompanhe nossas redes sociais e fique por dentro de todas as novidades, promoções e dicas de beleza!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {redesSociais.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${item.cor} cursor-pointer`}
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icone}
                </div>
                <h3 className={`text-xl font-bold text-[#3D2C1E] transition-colors duration-300 ${item.corTexto}`}>
                  {item.nome}
                </h3>
                <p className={`text-sm text-[#3D2C1E]/70 transition-colors duration-300 mt-1 ${item.corTexto}`}>
                  {item.descricao}
                </p>
                <div className="mt-4 inline-block px-4 py-2 bg-[#3D2C1E]/10 rounded-full text-sm font-medium text-[#3D2C1E] group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                  {item.nome === 'Instagram' ? 'Seguir' : item.nome === 'WhatsApp' ? 'Conversar' : 'Enviar e-mail'}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NOSSOS DIFERENCIAIS */}
      <section className="py-16 px-4" style={{ backgroundColor: '#FFFCFC' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-pink-500 uppercase tracking-wider">
              Por que escolher a NabiMake?
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Nossos Diferenciais
            </h2>
            <p className="text-gray-500 mt-2">
              Qualidade e confiança em cada detalhe
            </p>
          </div>

          <FeatureBadges />

          {/* Selo ISO */}
          <div className="flex justify-center mt-8">
            <div 
              className="bg-white rounded-2xl p-4 text-center border-2 border-transparent shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center group hover:border-pink-400"
              style={{ 
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.15), 0 10px 25px -8px rgba(0,0,0,0.08)' 
              }}
            >
              <img 
                src="https://res.cloudinary.com/hnxpohlp/image/upload/v1785013713/iso-22716-2007-certification-250x250-removebg-preview_jtaiyi.png"
                alt="Certificação ISO 22716"
                className="w-20 h-20 md:w-24 md:h-24 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-[10px] font-medium text-gray-600 mt-2 text-center leading-tight">
                ISO 22716
                <br />
                <span className="text-[8px] text-gray-400">Boas Práticas</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DÚVIDAS FREQUENTES */}
      <FAQPreview />

      {/* 6. FOOTER */}
      <Footer />
    </div>
  );
}