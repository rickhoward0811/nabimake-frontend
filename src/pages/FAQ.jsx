import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Shield, 
  CreditCard, 
  Truck, 
  RefreshCw, 
  Package,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [faqAberto, setFaqAberto] = useState(null);
  const [busca, setBusca] = useState('');

  // Dados das perguntas frequentes
  const faqData = [
    {
      id: 1,
      categoria: 'Compras',
      pergunta: 'Como faço para comprar na NabiMake?',
      resposta: 'Navegue pelo nosso catálogo, escolha os produtos que deseja, adicione ao carrinho e finalize pelo WhatsApp. Nossa equipe entrará em contato para confirmar o pedido, forma de pagamento e prazo de entrega.'
    },
    {
      id: 2,
      categoria: 'Compras',
      pergunta: 'Preciso criar uma conta para comprar?',
      resposta: 'Não! Você pode comprar como visitante. Basta escolher seus produtos e finalizar diretamente pelo WhatsApp. Nosso atendimento é 100% personalizado.'
    },
    {
      id: 3,
      categoria: 'Pagamento',
      pergunta: 'Quais formas de pagamento são aceitas?',
      resposta: 'Aceitamos PIX, cartões de crédito (parcelado em até 6x sem juros), boleto bancário e transferência via WhatsApp Pay. Todas as formas são seguras e processadas por plataformas confiáveis.'
    },
    {
      id: 4,
      categoria: 'Pagamento',
      pergunta: 'O pagamento é seguro?',
      resposta: 'Sim! Trabalhamos com plataformas de pagamento reconhecidas e seguras. Todas as transações são criptografadas e protegidas contra fraudes.'
    },
    {
      id: 5,
      categoria: 'Entrega',
      pergunta: 'Qual o prazo de entrega?',
      resposta: 'O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua região. Enviamos para todo o Brasil via Correios ou transportadoras parceiras.'
    },
    {
      id: 6,
      categoria: 'Entrega',
      pergunta: 'Como posso rastrear meu pedido?',
      resposta: 'Assim que seu pedido for postado, enviaremos o código de rastreio pelo WhatsApp. Você poderá acompanhar todo o trajeto diretamente no site dos Correios ou transportadora.'
    },
    {
      id: 7,
      categoria: 'Trocas',
      pergunta: 'Posso trocar ou devolver um produto?',
      resposta: 'Sim! Você tem até 7 dias após o recebimento para solicitar troca ou devolução. Entre em contato conosco pelo WhatsApp e nossa equipe irá orientá-lo sobre o processo.'
    },
    {
      id: 8,
      categoria: 'Trocas',
      pergunta: 'Quais são as condições para troca?',
      resposta: 'O produto deve estar em perfeito estado, sem sinais de uso, com todas as etiquetas e embalagens originais. O custo do frete para troca é por nossa conta em casos de defeito ou erro no envio.'
    },
    {
      id: 9,
      categoria: 'Produtos',
      pergunta: 'Os produtos são originais?',
      resposta: 'Todos os nossos produtos são 100% originais e adquiridos diretamente dos fabricantes. Garantimos a procedência e qualidade de cada item comercializado.'
    },
    {
      id: 10,
      categoria: 'Produtos',
      pergunta: 'Como saber qual produto escolher?',
      resposta: 'Temos uma equipe de consultoria de beleza pronta para ajudar! Entre em contato pelo WhatsApp e conte o que você procura. Nossas especialistas vão te orientar na melhor escolha.'
    },
    {
      id: 11,
      categoria: 'Atendimento',
      pergunta: 'Qual o horário de atendimento?',
      resposta: 'Atendemos de segunda a sábado, das 08:00 às 18:00. Nossa equipe está pronta para tirar todas as suas dúvidas e ajudar com seus pedidos.'
    },
    {
      id: 12,
      categoria: 'Atendimento',
      pergunta: 'Como entrar em contato com a NabiMake?',
      resposta: 'Você pode nos contatar pelo WhatsApp (32) 98718-1375, pelo e-mail nabimakestore@gmail.com ou através do formulário de contato em nosso site.'
    }
  ];

  // Filtrar perguntas pela busca
  const faqFiltrado = faqData.filter(item =>
    item.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
    item.resposta.toLowerCase().includes(busca.toLowerCase()) ||
    item.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  // Agrupar por categoria para exibir
  const categorias = [...new Set(faqData.map(item => item.categoria))];

  const toggleFaq = (id) => {
    setFaqAberto(faqAberto === id ? null : id);
  };

  // Categorias com ícones
  const categoriasIcones = {
    'Compras': ShoppingBag,
    'Pagamento': CreditCard,
    'Entrega': Truck,
    'Trocas': RefreshCw,
    'Produtos': Package,
    'Atendimento': MessageCircle
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 md:py-12 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Perguntas Frequentes
          </h1>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Tire suas dúvidas sobre compras, entregas, pagamentos e muito mais
          </p>
        </div>

        {/* Busca */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar perguntas..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Categorias - Scroll horizontal */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categorias.map((cat) => {
            const Icone = categoriasIcones[cat] || HelpCircle;
            const count = faqData.filter(item => item.categoria === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setBusca(cat)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-pink-300 hover:bg-pink-50 transition-all whitespace-nowrap text-sm"
              >
                <Icone size={16} className="text-pink-500" />
                {cat}
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Resultados da busca */}
        {busca && (
          <p className="text-sm text-gray-500 mb-4">
            {faqFiltrado.length} resultado{faqFiltrado.length > 1 ? 's' : ''} encontrado{faqFiltrado.length > 1 ? 's' : ''}
          </p>
        )}

        {/* Lista de Perguntas */}
        {faqFiltrado.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma pergunta encontrada</p>
            <p className="text-sm text-gray-400 mt-1">Tente usar outras palavras na busca</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqFiltrado.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full">
                      {item.categoria}
                    </span>
                    <span className="font-semibold text-gray-900 text-sm md:text-base">
                      {item.pergunta}
                    </span>
                  </div>
                  {faqAberto === item.id ? (
                    <ChevronUp className="text-pink-500 flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
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
                      <div className="p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                        {item.resposta}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action - Ainda tem dúvidas? */}
        <div className="mt-12 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900">
            Ainda tem dúvidas?
          </h3>
          <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">
            Nossa equipe está pronta para te ajudar. Entre em contato conosco!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <a
              href="https://wa.me/5532987181375"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all hover:scale-105"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a
              href="mailto:nabimakestore@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium border border-gray-200 hover:border-pink-300 hover:bg-pink-50 transition-all"
            >
              <Mail size={18} />
              E-mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}