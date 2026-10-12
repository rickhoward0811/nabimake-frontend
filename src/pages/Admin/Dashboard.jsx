import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  LogOut,
  ShoppingBag,
  Clock,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";
import ConfirmModal from "../../components/ConfirmModal";
import Toast from "../../components/Toast";
import api from "../../api/api";

// 🔒 URL SEGURA DO ADMIN - MUDE AQUI
const ADMIN_BASE = "/n4b1m4k3jul143r1c4rd0l1nd0s";

export default function AdminDashboard() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);
  const [toast, setToast] = useState(null);
  const [cupons, setCupons] = useState([]);
  const [salvandoCupom, setSalvandoCupom] = useState(false);

  const [novoCupom, setNovoCupom] = useState({
    codigo: "",
    tipo: "porcentagem",
    valor: "",
    validade: "",
    limite_usos: "",
  });
  const { logout } = useAdmin();

  useEffect(() => {
    fetchProdutos();
    fetchCupons();
  }, []);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      showToast("Erro ao carregar produtos", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleExcluirCupom = async (cupom) => {
    const confirmar = window.confirm(
      `Deseja excluir o cupom ${cupom.codigo}? Essa ação não pode ser desfeita.`,
    );

    if (!confirmar) return;

    try {
      await api.delete(`/admin/cupons/${cupom.id}`);

      setCupons((prev) => prev.filter((item) => item.id !== cupom.id));

      showToast("Cupom excluído com sucesso!");
    } catch (error) {
      showToast(
        error.response?.data?.erro || "Erro ao excluir cupom.",
        "error",
      );
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDeleteClick = (produto) => {
    setProdutoParaExcluir(produto);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!produtoParaExcluir) return;

    try {
      await api.delete(`/admin/produtos/${produtoParaExcluir.id}`);
      setProdutos(produtos.filter((p) => p.id !== produtoParaExcluir.id));
      showToast(
        `"${produtoParaExcluir.nome}" excluído com sucesso!`,
        "success",
      );
    } catch (error) {
      console.error("Erro ao excluir:", error);
      showToast("Erro ao excluir produto", "error");
    }
    setProdutoParaExcluir(null);
  };

  const produtosFiltrados = produtos.filter(
    (p) =>
      p.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      p.categoria?.toLowerCase().includes(busca.toLowerCase()),
  );

  const totalProdutos = produtos.length;
  const totalCategorias = [...new Set(produtos.map((p) => p.categoria))].filter(
    Boolean,
  ).length;

  const fetchCupons = async () => {
    try {
      const response = await api.get("/admin/cupons");
      setCupons(response.data);
    } catch (error) {
      console.error("Erro ao carregar cupons:", error);
      showToast("Erro ao carregar cupons", "error");
    }
  };

  const handleCriarCupom = async (e) => {
    e.preventDefault();
    setSalvandoCupom(true);

    try {
      await api.post("/admin/cupons", {
        ...novoCupom,
        codigo: novoCupom.codigo.trim().toUpperCase(),
        valor: Number(novoCupom.valor),
        validade: novoCupom.validade
          ? new Date(novoCupom.validade).toISOString()
          : null,
      });

      setNovoCupom({
        codigo: "",
        tipo: "porcentagem",
        valor: "",
        validade: "",
        limite_usos: "",
      });

      await fetchCupons();
      showToast("Cupom criado com sucesso!");
    } catch (error) {
      showToast(error.response?.data?.erro || "Erro ao criar cupom", "error");
    } finally {
      setSalvandoCupom(false);
    }
  };

  const alternarCupom = async (cupom) => {
    try {
      const response = await api.patch(`/admin/cupons/${cupom.id}/ativo`, {
        ativo: !cupom.ativo,
      });

      setCupons((prev) =>
        prev.map((c) => (c.id === cupom.id ? response.data : c)),
      );

      showToast(response.data.ativo ? "Cupom ativado!" : "Cupom desativado!");
    } catch (error) {
      showToast(
        error.response?.data?.erro || "Erro ao atualizar cupom",
        "error",
      );
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">Painel Admin</h1>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              🔒 Seguro
            </span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="bg-pink-100 p-3 rounded-full">
              <Package className="text-pink-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Produtos</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalProdutos}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingBag className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Categorias</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalCategorias}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="bg-green-100 p-3 rounded-full">
              <Clock className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sessão</p>
              <p className="text-sm font-medium text-gray-900">Ativa (12h)</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Link
            to={`${ADMIN_BASE}/produtos/novo`}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-all hover:scale-105"
          >
            <Plus size={18} />
            Novo Produto
          </Link>

          <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-transparent">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produtos..."
              className="border-none bg-transparent outline-none flex-1 text-gray-900"
            />
          </div>

          <button
            onClick={fetchProdutos}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            🔄 Atualizar
          </button>
        </div>

        {/* Gerenciamento de cupons */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Cupons de desconto
          </h2>

          <form
            onSubmit={handleCriarCupom}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Código do cupom
              </label>
              <input
                required
                minLength={3}
                maxLength={50}
                value={novoCupom.codigo}
                onChange={(e) =>
                  setNovoCupom({
                    ...novoCupom,
                    codigo: e.target.value.toUpperCase(),
                  })
                }
                placeholder="Ex.: NABI20"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Tipo de desconto
              </label>
              <select
                value={novoCupom.tipo}
                onChange={(e) =>
                  setNovoCupom({ ...novoCupom, tipo: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-white"
              >
                <option value="porcentagem">Porcentagem (%)</option>
                <option value="fixo">Valor fixo (R$)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Valor do desconto
              </label>
              <input
                required
                type="number"
                min="0.01"
                max={novoCupom.tipo === "porcentagem" ? 100 : undefined}
                step="0.01"
                value={novoCupom.valor}
                onChange={(e) =>
                  setNovoCupom({ ...novoCupom, valor: e.target.value })
                }
                placeholder={novoCupom.tipo === "porcentagem" ? "10" : "10,00"}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Validade (opcional)
              </label>
              <input
                type="datetime-local"
                value={novoCupom.validade}
                onChange={(e) =>
                  setNovoCupom({ ...novoCupom, validade: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-3 py-2"
              />
            </div>

            <div>
              
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={salvandoCupom}
                className="w-full rounded-xl bg-black text-white px-4 py-2 hover:bg-gray-800 disabled:opacity-50"
              >
                {salvandoCupom ? "Criando..." : "Criar cupom"}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Cupons cadastrados ({cupons.length})
            </h3>

            {cupons.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhum cupom encontrado.</p>
            ) : (
              <div className="space-y-3">
                {cupons.map((cupom) => (
                  <div
                    key={cupom.id}
                    className="flex flex-col gap-4 rounded-2xl border border-[#E8DCCF] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold tracking-wide text-[#815967]">
                          {cupom.codigo}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            cupom.ativo
                              ? "bg-[#F6DDE5] text-[#815967]"
                              : "bg-[#F3E8DA] text-[#806D5B]"
                          }`}
                        >
                          {cupom.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#75645F]">
                        <span>
                          Desconto:{" "}
                          {cupom.tipo === "porcentagem"
                            ? `${cupom.valor}%`
                            : `R$ ${Number(cupom.valor).toFixed(2).replace(".", ",")}`}
                        </span>
                        <span>
                          Validade:{" "}
                          {cupom.validade
                            ? new Date(cupom.validade).toLocaleString("pt-BR", {
                                timeZone: "America/Sao_Paulo",
                              })
                            : "Sem validade"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => alternarCupom(cupom)}
                        className="rounded-xl bg-[#F6DDE5] px-4 py-2 text-sm font-medium text-[#815967] transition hover:bg-[#EBC6D3]"
                      >
                        {cupom.ativo ? "Desativar" : "Ativar"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExcluirCupom(cupom)}
                        className="rounded-xl border border-[#E8DCCF] bg-[#F3E8DA] px-4 py-2 text-sm font-medium text-[#806D5B] transition hover:bg-[#EADBC8]"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Produto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Categoria
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Preço
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Variações
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {produtosFiltrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      {busca
                        ? "Nenhum produto encontrado para esta busca"
                        : "Nenhum produto cadastrado"}
                    </td>
                  </tr>
                ) : (
                  produtosFiltrados.map((produto) => (
                    <tr
                      key={produto.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              produto.imagem_url ||
                              "https://via.placeholder.com/40"
                            }
                            alt={produto.nome}
                            className="w-10 h-10 rounded-lg object-cover"
                            onError={(e) =>
                              (e.target.src = "https://via.placeholder.com/40")
                            }
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {produto.nome}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {produto.categoria || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        R${" "}
                        {parseFloat(produto.preco).toFixed(2).replace(".", ",")}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {produto.variacoes?.length || 0}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`${ADMIN_BASE}/produtos/editar/${produto.id}`}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(produto)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir "${produtoParaExcluir?.nome}"? Esta ação não pode ser desfeita.`}
        confirmText="Sim, excluir"
        cancelText="Cancelar"
        type="danger"
      />

      {/* Toast de Notificação */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
