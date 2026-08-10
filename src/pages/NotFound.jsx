import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDFC] via-[#FFF8F5] to-[#FFF0EB] flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Borboletas voando */}
      <div className="absolute top-10 left-10 opacity-30 animate-voadora-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="#D46A8C" strokeWidth="1.2" className="w-10 h-10">
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5 6-3.5 9-7 9-11.5C21 3 15.5 1.5 12 4.5z" />
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5" />
          <path d="M12 4.5C15.5 1.5 21 3 21 8.5c0 4.5-3 8-9 11.5" />
          <path d="M12 20c-2.5-2-5-5.5-5-9 0-3 2.5-5 5-6 2.5 1 5 3 5 6 0 3.5-2.5 7-5 9z" />
        </svg>
      </div>
      
      <div className="absolute top-20 right-20 opacity-25 animate-voadora-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="#D46A8C" strokeWidth="1.2" className="w-8 h-8">
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5 6-3.5 9-7 9-11.5C21 3 15.5 1.5 12 4.5z" />
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5" />
          <path d="M12 4.5C15.5 1.5 21 3 21 8.5c0 4.5-3 8-9 11.5" />
          <path d="M12 20c-2.5-2-5-5.5-5-9 0-3 2.5-5 5-6 2.5 1 5 3 5 6 0 3.5-2.5 7-5 9z" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 left-20 opacity-20 animate-voadora-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="#D46A8C" strokeWidth="1.2" className="w-12 h-12">
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5 6-3.5 9-7 9-11.5C21 3 15.5 1.5 12 4.5z" />
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5" />
          <path d="M12 4.5C15.5 1.5 21 3 21 8.5c0 4.5-3 8-9 11.5" />
          <path d="M12 20c-2.5-2-5-5.5-5-9 0-3 2.5-5 5-6 2.5 1 5 3 5 6 0 3.5-2.5 7-5 9z" />
        </svg>
      </div>
      
      <div className="absolute bottom-32 right-10 opacity-30 animate-voadora-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="#D46A8C" strokeWidth="1.2" className="w-7 h-7">
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5 6-3.5 9-7 9-11.5C21 3 15.5 1.5 12 4.5z" />
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5" />
          <path d="M12 4.5C15.5 1.5 21 3 21 8.5c0 4.5-3 8-9 11.5" />
          <path d="M12 20c-2.5-2-5-5.5-5-9 0-3 2.5-5 5-6 2.5 1 5 3 5 6 0 3.5-2.5 7-5 9z" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-10 opacity-15 animate-voadora-5">
        <svg viewBox="0 0 24 24" fill="none" stroke="#D46A8C" strokeWidth="1.2" className="w-9 h-9">
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5 6-3.5 9-7 9-11.5C21 3 15.5 1.5 12 4.5z" />
          <path d="M12 4.5C8.5 1.5 3 3 3 8.5c0 4.5 3 8 9 11.5" />
          <path d="M12 4.5C15.5 1.5 21 3 21 8.5c0 4.5-3 8-9 11.5" />
          <path d="M12 20c-2.5-2-5-5.5-5-9 0-3 2.5-5 5-6 2.5 1 5 3 5 6 0 3.5-2.5 7-5 9z" />
        </svg>
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Código do erro */}
        <div className="mb-6">
          <span className="text-sm font-semibold text-[#D46A8C] bg-[#FFF5F7] px-4 py-1.5 rounded-full border border-[#D46A8C]/10">
            Erro 404
          </span>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#3D2C1E] mb-3 font-display">
          Desculpe, caminho errado
        </h1>

        {/* Descrição */}
        <p className="text-[#3D2C1E]/60 text-base mb-8 max-w-sm mx-auto">
          Parece que você se perdeu no caminho. A página que você procura não existe ou foi removida.
        </p>

        {/* Botão para voltar */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D46A8C] to-[#C65C7C] text-white rounded-full font-medium hover:from-[#C65C7C] hover:to-[#B04E6E] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#D46A8C]/30 transition-all duration-300 group"
        >
          <Home size={18} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para a Home
        </Link>

        {/* Link sutil para produtos */}
        <p className="mt-4 text-xs text-[#3D2C1E]/40">
          Ou explore nosso{' '}
          <Link to="/produtos" className="text-[#D46A8C] hover:underline transition-colors">
            catálogo de produtos
          </Link>
        </p>
      </div>

      {/* Estilos para animações */}
      <style>{`
        @keyframes voar1 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.3; }
          25% { transform: translate(50px, -30px) rotate(10deg) scale(1.2); opacity: 0.6; }
          50% { transform: translate(100px, 20px) rotate(-5deg) scale(0.9); opacity: 0.4; }
          75% { transform: translate(30px, -50px) rotate(15deg) scale(1.1); opacity: 0.5; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.3; }
        }
        .animate-voadora-1 {
          animation: voar1 12s ease-in-out infinite;
        }

        @keyframes voar2 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.25; }
          30% { transform: translate(-60px, -40px) rotate(-12deg) scale(1.3); opacity: 0.5; }
          60% { transform: translate(-20px, 30px) rotate(8deg) scale(0.8); opacity: 0.3; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.25; }
        }
        .animate-voadora-2 {
          animation: voar2 14s ease-in-out infinite;
        }

        @keyframes voar3 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          20% { transform: translate(40px, 50px) rotate(20deg) scale(1.4); opacity: 0.5; }
          50% { transform: translate(-30px, -20px) rotate(-8deg) scale(0.7); opacity: 0.3; }
          80% { transform: translate(60px, -30px) rotate(12deg) scale(1.1); opacity: 0.4; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
        }
        .animate-voadora-3 {
          animation: voar3 16s ease-in-out infinite;
        }

        @keyframes voar4 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.3; }
          35% { transform: translate(-80px, -20px) rotate(-15deg) scale(1.2); opacity: 0.6; }
          70% { transform: translate(20px, 40px) rotate(10deg) scale(0.9); opacity: 0.3; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.3; }
        }
        .animate-voadora-4 {
          animation: voar4 11s ease-in-out infinite;
        }

        @keyframes voar5 {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.15; }
          40% { transform: translate(70px, -40px) rotate(18deg) scale(1.5); opacity: 0.4; }
          70% { transform: translate(-40px, 20px) rotate(-10deg) scale(0.8); opacity: 0.2; }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.15; }
        }
        .animate-voadora-5 {
          animation: voar5 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}