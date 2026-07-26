import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ produtos, produtosAleatorios = [] }) {
  if (!produtos || produtos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum produto encontrado</p>
      </div>
    );
  }

  // Criar um Set com os IDs dos produtos aleatórios para identificar quais terão NEON
  const idsAleatorios = new Set(produtosAleatorios.map(p => p.id));

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {produtos.map((produto) => {
        const isNeon = idsAleatorios.has(produto.id);
        return <ProductCard key={produto.id} produto={produto} isNeon={isNeon} />;
      })}
    </section>
  );
}