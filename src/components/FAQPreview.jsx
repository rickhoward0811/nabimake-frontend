import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_PREVIEW = [
  {
    id: 1,
    pergunta: 'Como faço para comprar na NabiMake?',
    resposta: 'Navegue pelo nosso catálogo, escolha os produtos que deseja, adicione ao carrinho e finalize pelo WhatsApp. Nossa equipe entrará em contato para confirmar o pedido, forma de pagamento e prazo de entrega.'
  },
  {
    id: 2,
    pergunta: 'Quais formas de pagamento são aceitas?',
    resposta: 'Aceitamos PIX, cartões de crédito e transferência via WhatsApp Pay. Todas as formas são seguras e processadas por plataformas confiáveis.'
  },
  {
    id: 3,
    pergunta: 'Qual o prazo de entrega?',
    resposta: 'O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua região. Enviamos para todo o Brasil via Correios ou transportadoras parceiras.'
  }
];

export default function FAQPreview() {
  const [faqAberto, setFaqAberto] = useState(null);

  const toggleFaq = (id) => {
    setFaqAberto(faqAberto === id ? null : id);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-[1300px] mx-auto">
        {/* Card Flutuante com Glassmorphism */}
        <div 
          className="rounded-[32px] p-8 md:p-12 lg:p-16"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,252,252,0.95) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(220,190,190,0.4)',
            boxShadow: '0 40px 100px rgba(227,176,191,0.20), 0 10px 30px rgba(227,176,191,0.08)',
          }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-3">
              <HelpCircle className="w-6 h-6 text-pink-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Dúvidas Frequentes
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              As perguntas mais comuns sobre nossas compras
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_PREVIEW.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 rounded-xl border border-gray-100/50 overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(227,176,191,0.20)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-white/50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900 text-sm">
                    {item.pergunta}
                  </span>
                  {faqAberto === item.id ? (
                    <ChevronUp className="text-pink-500 flex-shrink-0" size={18} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={18} />
                  )}
                </button>
                <AnimatePresence>
                  {faqAberto === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100/50">
                        {item.resposta}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-pink-500 font-medium hover:text-pink-600 transition-colors group"
            >
              Ver todas as perguntas
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}