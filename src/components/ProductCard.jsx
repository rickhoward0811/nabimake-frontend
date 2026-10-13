import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ produto, isNeon = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imagemAtual, setImagemAtual] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  if (!produto || !produto.id) return null;

  const estoque = Math.max(0, Number(produto.estoque ?? 0));
  const esgotado = estoque === 0;
  const ultimasUnidades = estoque > 0 && estoque <= 3;

  const imagemPrincipal =
    produto.imagem_url ||
    (produto.variacoes?.length > 0
      ? produto.variacoes[0].imagem_url
      : "https://via.placeholder.com/300x300?text=Sem+Imagem");

  const cores = produto.variacoes?.map((v) => v.cor) || [];
  const corPrincipal = cores[0] || "";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (esgotado) return;

    const item = {
      id: produto.id,
      nome: produto.nome,
      preco: parseFloat(produto.preco),
      imagem: imagemPrincipal,
      categoria: produto.categoria || "",
      variacao: corPrincipal || "Padrão",
    };

    addToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);

    if (produto.variacoes?.length > 1) {
      setImagemAtual(produto.variacoes[1].imagem_url);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setImagemAtual("");
  };

  const imagemExibida =
    isHovered && imagemAtual ? imagemAtual : imagemPrincipal;

  const truncarTitulo = (texto, limite = 55) => {
    if (!texto) return "Produto sem nome";
    return texto.length <= limite ? texto : texto.substring(0, limite) + "...";
  };

  return (
    <Link
      to={`/produto/${produto.id}`}
      className="group block h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-pink-100/50 h-full flex flex-col">
        {/* Imagem do produto */}
        <div className="relative overflow-hidden bg-gray-50 aspect-square flex-shrink-0">
          <img
            src={imagemExibida}
            alt={produto.nome || "Produto"}
            className={`w-full h-full object-cover transition-all duration-500 ${
              esgotado ? "grayscale opacity-60" : "group-hover:scale-110"
            }`}
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/300x300?text=Sem+Imagem";
            }}
          />

          {/* Indicadores de estoque */}
          {/*DESCOMENTAR AQUI PARA FAZER A FUNÇÃO DE POUCAS UNIDADES NO ESTOQUE*/}
          {/*{ultimasUnidades && (
            <div className="absolute top-3 right-3 z-30 animate-selo-estoque">
              <div className="rounded-full border border-[#F3C6D5] bg-[#FFF0F5]/95 px-3 py-2 shadow-md shadow-pink-200/30 backdrop-blur-sm">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#B95779]">
                  Últimas unidades
                </p>
                <p className="text-[10px] font-medium text-[#8F5267]">
                  Só restam {estoque} {estoque === 1 ? "unidade" : "unidades"}!
                </p>
              </div>
            </div>
          )}}*/}

          {esgotado && (
            <div className="faixa-esgotado">
              <span>Esgotado</span>
            </div>
          )}

          {/* Categoria */}
          {produto.categoria && (
            <span className="absolute top-3 left-3 z-10 bg-[#FFF5F7] text-[#3D2C1E] text-[10px] font-medium px-3 py-1 rounded-full uppercase tracking-wider border border-[#D46A8C]/20">
              {produto.categoria}
            </span>
          )}

          {/* Visualizar produto */}
          {!esgotado && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Eye size={18} className="text-gray-700" />
              </span>
            </div>
          )}

          {/* Indicadores de variações */}
          {produto.variacoes?.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {produto.variacoes.slice(0, 4).map((variacao, index) => (
                <div
                  key={variacao.id || index}
                  className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                  style={{
                    background: variacao.cor?.includes("Cor")
                      ? `hsl(${index * 60}, 70%, 60%)`
                      : "#D4C5B0",
                  }}
                  title={variacao.cor || "Cor"}
                />
              ))}

              {produto.variacoes.length > 4 && (
                <span className="text-[10px] text-white font-medium bg-black/50 px-1.5 rounded-full">
                  +{produto.variacoes.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Informações */}
        <div className="p-4 space-y-2 flex-1 flex flex-col">
          <div className="min-h-[48px]">
            <h3
              className={`text-base font-bold line-clamp-2 leading-snug transition-colors ${
                isNeon
                  ? "text-gray-900"
                  : "text-gray-900 group-hover:text-pink-600"
              }`}
            >
              {truncarTitulo(produto.nome)}
            </h3>
          </div>

          {/*DESCOMENTAR AQUI PARA FAZER A FUNÇÃO DE POUCAS UNIDADES NO ESTOQUE*/}
          {/* Quantidade disponível */}

          {/*
          {esgotado ? (
            <p className="text-xs font-semibold text-gray-500">
              Produto indisponível
            </p>
          ) : ultimasUnidades ? (
            <p className="text-xs font-semibold text-[#C65C7C]">
              Restam apenas {estoque} {estoque === 1 ? "unidade" : "unidades"}
            </p>
          ) : null}
          */}

          <div className="flex-1" />

          {/* Preço e botão */}
          <div className="flex items-center justify-between pt-1 mt-auto">
            <div
              className={`px-3 py-1.5 rounded-full border ${
                esgotado
                  ? "bg-gray-100 border-gray-200"
                  : "bg-pink-50 border-pink-100"
              }`}
            >
              <strong
                className={`text-lg font-bold ${
                  esgotado ? "text-gray-500" : "text-pink-600"
                }`}
              >
                R${" "}
                {produto.preco
                  ? parseFloat(produto.preco).toFixed(2).replace(".", ",")
                  : "0,00"}
              </strong>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={esgotado}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                esgotado
                  ? "bg-gray-300 cursor-not-allowed"
                  : isAdded
                    ? "bg-green-500 scale-110"
                    : "bg-black hover:bg-pink-500 hover:scale-110"
              }`}
              aria-label={
                esgotado
                  ? "Produto esgotado"
                  : isAdded
                    ? "Adicionado ao carrinho"
                    : "Adicionar ao carrinho"
              }
            >
              {esgotado ? (
                <span className="text-white text-lg">×</span>
              ) : isAdded ? (
                <span className="text-white text-lg">✓</span>
              ) : (
                <ShoppingBag size={16} className="text-white" />
              )}
            </button>
          </div>

          {/* Cores disponíveis */}
          {cores.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-gray-400">
                {cores.length} {cores.length === 1 ? "cor" : "cores"}
              </span>

              <div className="flex gap-1">
                {cores.slice(0, 3).map((cor, index) => (
                  <span
                    key={index}
                    className="w-2.5 h-2.5 rounded-full border border-gray-200"
                    style={{
                      background: cor?.includes("Cor")
                        ? `hsl(${index * 60 + 20}, 70%, 60%)`
                        : "#D4C5B0",
                    }}
                    title={cor}
                  />
                ))}

                {cores.length > 3 && (
                  <span className="text-[9px] text-gray-400">
                    +{cores.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
