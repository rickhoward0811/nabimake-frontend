import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

// Configuração das estrelas decorativas
const SPARKLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 7.3 + 5) % 96}%`,
  delay: `${(i % 7) * 0.9}s`,
  size: 3 + (i % 4),
}));

// Componente de Estrelas (avaliação)
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < Math.floor(rating) ? 'fill-[#D4A84B] text-[#D4A84B]' : 'text-gray-300'}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

// Componente CountUp (contador animado)
function CountUp({ to, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(to / 60));

    const timer = setInterval(() => {
      start += step;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [to]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 400));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="topo"
      className="relative overflow-hidden w-full pb-20 pt-[20px] lg:pb-28 lg:pt-[36px]"
      style={{
        background: 'linear-gradient(160deg, #FCF5F0 0%, #F8EDE6 50%, #F0E3DA 100%)',
      }}
    >
      {/* Estrelas decorativas */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="sparkle absolute bottom-10 rounded-full"
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              background: 'radial-gradient(circle, #D4A84B, #D4A84B00)',
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        {/* Coluna esquerda - Texto */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#3D2C1E]/80 border border-[#D4C5B0]/20 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#D4A84B]" /> 
            Beleza premium brasileira
          </span>

          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-[#3D2C1E] sm:text-6xl lg:text-7xl">
            Realce sua beleza com os produtos que fazem{' '}
            <span className="text-[#D46A8C]">sucesso entre nossas clientes.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-[#3D2C1E]/70">
            Curadoria de maquiagem e skincare original, com atendimento personalizado
            e entrega rápida para todo o Brasil.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('produtos')}
              className="inline-flex items-center gap-2 h-14 rounded-full px-8 text-base font-medium text-white bg-gradient-to-r from-[#D46A8C] to-[#C65C7C] hover:from-[#C65C7C] hover:to-[#B04E6E] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#D46A8C]/30 transition-all duration-300"
            >
              Comprar agora <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollTo('produtos')}
              className="inline-flex items-center gap-2 h-14 rounded-full px-8 text-base font-medium text-[#3D2C1E] bg-white/60 backdrop-blur-sm border border-[#D4C5B0]/30 hover:border-[#D46A8C]/40 hover:bg-white/80 transition-all duration-300"
            >
              Ver catálogo
            </button>
          </div>

          {/* Estatísticas */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
            {[
              { label: 'Clientes encantadas', value: 12400, suffix: '+' },
              { label: 'Produtos originais', value: 320, suffix: '+' },
              { label: 'Avaliações 5 estrelas', value: 8900, suffix: '' },
            ].map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl text-[#3D2C1E]">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
                <p className="text-xs text-[#3D2C1E]/60">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* Coluna direita - Imagem com cards flutuantes */}
        <div className="relative" style={{ transform: `translateY(${offset * -0.06}px)` }}>
          <div className="overflow-hidden rounded-[2.5rem] border border-[#D4C5B0]/20 shadow-2xl">
            <img
              src="https://res.cloudinary.com/hnxpohlp/image/upload/v1785031428/WhatsApp_Image_2026-07-25_at_22.36.33_f3css3.jpg"
              alt="Modelo com maquiagem NabiMake"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Card flutuante 1 - Primer Anticraquelamento */}
          <div className="absolute -left-4 top-10 w-52 rounded-3xl bg-white/80 backdrop-blur-md p-3 shadow-xl border border-white/40 hover:-translate-y-1 transition-all duration-300 sm:-left-8">
            <img
              src="https://res.cloudinary.com/hnxpohlp/image/upload/v1784935648/primer_anticraquelamento_ickxhl.jpg"
              alt="Primer Anticraquelamento - Max Love"
              loading="lazy"
              className="h-24 w-full rounded-2xl object-cover"
            />
            <p className="mt-2 text-xs font-medium text-[#3D2C1E] leading-tight">Primer Anticraquelamento - Max Love</p>
            <Stars rating={4.8} />
            <p className="text-sm font-semibold text-[#D46A8C]">R$ 16,90</p>
          </div>

          {/* Card flutuante 2 - Primer Vitamina C */}
          <div className="absolute -bottom-6 -right-2 w-56 rounded-3xl bg-white/80 backdrop-blur-md p-3 shadow-xl border border-white/40 hover:-translate-y-1 transition-all duration-300 sm:-right-8">
            <img
              src="https://res.cloudinary.com/hnxpohlp/image/upload/v1784935648/primer_vitamina_xxtvbz.jpg"
              alt="Primer Vitamina C - Max Love"
              loading="lazy"
              className="h-24 w-full rounded-2xl object-cover"
            />
            <p className="mt-2 text-xs font-medium text-[#3D2C1E] leading-tight">Primer Vitamina C - Max Love</p>
            <Stars rating={4.9} />
            <p className="text-sm font-semibold text-[#D46A8C]">R$ 16,90</p>
          </div>
        </div>
      </div>

      {/* Estilos para animações */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in {
          animation: fadeIn 0.7s ease-out forwards;
        }
        .slide-in-from-bottom-6 {
          animation-delay: 0.1s;
        }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
        }
        .sparkle {
          animation: sparkleFloat 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}