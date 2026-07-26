import { Truck, BadgeCheck, Heart, Gem, Sparkles } from "lucide-react";

const ITENS = [
  { icone: Truck, label: "Entrega rápida", descricao: "Envio em até 24h úteis" },
  { icone: BadgeCheck, label: "Compra garantida", descricao: "Marcas 100% autênticas" },
  { icone: Heart, label: "Cuidado com você", descricao: "Consultoria de beleza no WhatsApp" },
  { icone: Gem, label: "Produtos premium", descricao: "Troca fácil em até 7 dias" },
  { icone: Sparkles, label: "Qualidade selecionada", descricao: "Lançamentos em primeira mão" },
];

export default function FeatureBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {ITENS.map(({ icone: Icone, label, descricao }) => (
        <div 
          key={label}
          className="bg-white rounded-2xl p-6 text-center border-2 border-transparent shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 group hover:border-pink-400"
          style={{ 
            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.15), 0 10px 25px -8px rgba(0,0,0,0.08)' 
          }}
        >
          <div className="w-14 h-14 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:bg-pink-500 group-hover:text-white">
            <Icone size={24} strokeWidth={1.8} />
          </div>
          <h3 className="text-sm font-bold text-gray-900">{label}</h3>
          <p className="text-xs text-gray-500 mt-1">{descricao}</p>
        </div>
      ))}
    </div>
  );
}