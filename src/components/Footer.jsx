import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import IconeBorboleta from './IconeBorboleta';
import api from '../api/api';

// Ícone do Instagram customizado
function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Links fixos
const WHATSAPP = "https://wa.me/5532987181375";
const INSTAGRAM = "https://instagram.com/nabimakestore";

// Categorias temporárias (serão substituídas pela API)
const CATEGORIAS_TEMP = ["Rosto", "Olhos", "Boca", "Skincare", "Pincéis", "Esponjas"];

// Animação dos links
const linkVariants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { duration: 0.25, ease: "easeOut" } }
};

export default function Footer() {
  const [categorias, setCategorias] = useState(CATEGORIAS_TEMP);

  // Buscar categorias da API
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/categorias');
        if (response.data && response.data.length > 0) {
          setCategorias(response.data.map(cat => cat.nome));
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <footer className="mt-16" style={{ 
      background: 'linear-gradient(180deg, #FFFCFC 0%, #FFF8F8 100%)',
      borderTop: '1px solid rgba(0,0,0,0.06)'
    }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Coluna 1 - Logo e Informações */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 no-underline group">
              <IconeBorboleta size={32} />
              <span className="font-display text-2xl tracking-wide font-bold">
                <span className="text-[#3D2C1E]">Nabi</span>
                <span className="text-[#E91E63]">Make</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Maquiagens e skincare premium com curadoria cuidadosa para valorizar sua beleza. 
              Produtos selecionados para oferecer qualidade, confiança e uma experiência única 
              em cada compra.
            </p>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-[#E91E63] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Atendimento</p>
                <p className="text-sm text-gray-500">Segunda a Sábado</p>
                <p className="text-sm text-gray-500">08:00 às 18:00</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E91E63] text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                whileHover={{ y: -2, boxShadow: "0 8px 25px -5px rgba(233,30,99,0.3)" }}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </motion.a>

              <motion.a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-[#E91E63] transition-all duration-300 hover:shadow-sm"
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </motion.a>
            </div>
          </div>

          {/* Coluna 2 - Institucional */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.16em] mb-4">
              Institucional
            </h3>
            <ul className="space-y-3">
              <motion.li>
                <motion.a
                  href="/contato"
                  className="text-sm text-gray-500 hover:text-[#E91E63] transition-colors duration-250 inline-block"
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  Contato
                </motion.a>
              </motion.li>
              <motion.li>
                <Link
                  to="/faq"
                  className="text-sm text-gray-500 hover:text-[#E91E63] transition-colors duration-250 inline-block"
                >
                  Perguntas Frequentes
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* Coluna 3 - Categorias */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.16em] mb-4">
              Categorias
            </h3>
            <ul className="space-y-3">
              {categorias.map((categoria) => (
                <motion.li key={categoria}>
                  <motion.a
                    href="#"
                    className="text-sm text-gray-500 hover:text-[#E91E63] transition-colors duration-250 inline-block"
                    variants={linkVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {categoria}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Navegação */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-[0.16em] mb-4">
              Navegação
            </h3>
            <ul className="space-y-3">
              {['Produtos', 'Novidades', 'Mais Vendidos', 'Promoções'].map((item) => (
                <motion.li key={item}>
                  <motion.a
                    href="#"
                    className="text-sm text-gray-500 hover:text-[#E91E63] transition-colors duration-250 inline-block"
                    variants={linkVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>

        {/* Rodapé inferior */}
        <div className="mt-16 pt-6 border-t border-gray-200/60">
          <div className="flex flex-col md:flex-row justify-between items-center text-center gap-2">
            <p className="text-xs text-gray-400">
              © 2026 NabiMake. Todos os direitos reservados.
            </p>
            <p className="text-xs text-gray-400">
              Pedidos realizados pelo WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}