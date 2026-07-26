import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Image, Tag, DollarSign, List, Plus } from 'lucide-react';
import api from '../../api/api';
import ConfirmModal from '../../components/ConfirmModal';
import Toast from '../../components/Toast';

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [variacoes, setVariacoes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    categoria_id: '',
    preco: '',
    descricao: '',
    imagem_url: '',
    ativo: true,
    ordem: 0
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [produtoRes, categoriasRes] = await Promise.all([
        api.get(`/produtos/${id}`),
        api.get('/categorias')
      ]);
      
      const produto = produtoRes.data;
      setFormData({
        nome: produto.nome || '',
        categoria_id: produto.categoria_id || '',
        preco: produto.preco || '',
        descricao: produto.descricao || '',
        imagem_url: produto.imagem_url || '',
        ativo: produto.ativo !== undefined ? produto.ativo : true,
        ordem: produto.ordem || 0
      });
      setVariacoes(produto.variacoes || [{ cor: '', imagem_url: '', ativo: true, ordem: 0 }]);
      setCategorias(categoriasRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showToast('Erro ao carregar produto', 'error');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVariacaoChange = (index, field, value) => {
    const newVariacoes = [...variacoes];
    newVariacoes[index][field] = value;
    setVariacoes(newVariacoes);
  };

  const addVariacao = () => {
    setVariacoes([...variacoes, { cor: '', imagem_url: '', ativo: true, ordem: variacoes.length }]);
  };

  const removeVariacao = (index) => {
    if (variacoes.length <= 1) {
      showToast('É necessário ter pelo menos uma variação', 'warning');
      return;
    }
    const newVariacoes = variacoes.filter((_, i) => i !== index);
    setVariacoes(newVariacoes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const variacoesInvalidas = variacoes.some(v => !v.cor.trim());
      if (variacoesInvalidas) {
        showToast('Preencha o nome de todas as variações', 'error');
        setSaving(false);
        return;
      }

      const dataToSend = {
        ...formData,
        preco: parseFloat(formData.preco.replace(',', '.')) || 0,
        variacoes: variacoes
      };
      
      await api.put(`/admin/produtos/${id}`, dataToSend);
      showToast('✅ Produto atualizado com sucesso!', 'success');
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      showToast('❌ Erro ao atualizar produto: ' + (error.response?.data?.erro || 'Tente novamente'), 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/admin/produtos/${id}`);
      showToast('✅ Produto excluído com sucesso!', 'success');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Erro ao excluir:', error);
      showToast('❌ Erro ao excluir produto', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando produto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2.5 bg-white rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 group"
            >
              <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-900" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Editar Produto</h1>
              <p className="text-sm text-gray-500">Atualize as informações do produto</p>
            </div>
          </div>
          <button
            onClick={handleDeleteClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-200"
          >
            <Trash2 size={18} />
            Excluir
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nome do Produto <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Digite o nome do produto"
              />
            </div>
          </div>

          {/* Categoria e Preço */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Categoria <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <List className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="categoria_id"
                  value={formData.categoria_id}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">Selecione</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Preço (R$) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
              placeholder="Descrição detalhada do produto..."
            />
          </div>

          {/* URL da Imagem Principal */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              URL da Imagem Principal
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="url"
                name="imagem_url"
                value={formData.imagem_url}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            {formData.imagem_url && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Pré-visualização:</p>
                <img 
                  src={formData.imagem_url} 
                  alt="Preview" 
                  className="h-24 w-24 object-cover rounded-xl border border-gray-200 shadow-sm"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100?text=Erro+na+imagem';
                  }}
                />
              </div>
            )}
          </div>

          {/* Variações */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Variações</h3>
                <p className="text-sm text-gray-500">Cores ou variações do produto</p>
              </div>
              <button
                type="button"
                onClick={addVariacao}
                className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all hover:scale-105 text-sm"
              >
                <Plus size={16} />
                Adicionar
              </button>
            </div>

            {variacoes.map((variacao, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 mb-4 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Cor <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={variacao.cor}
                      onChange={(e) => handleVariacaoChange(index, 'cor', e.target.value)}
                      placeholder="Ex: Vermelho, Azul, Cor 1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      URL da Imagem da Variação
                    </label>
                    <input
                      type="url"
                      value={variacao.imagem_url}
                      onChange={(e) => handleVariacaoChange(index, 'imagem_url', e.target.value)}
                      placeholder="https://exemplo.com/cor1.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={variacao.ativo !== false}
                      onChange={(e) => handleVariacaoChange(index, 'ativo', e.target.checked)}
                      className="w-4 h-4 text-pink-500 focus:ring-pink-500 rounded border-gray-300"
                    />
                    <label className="text-xs text-gray-600">Ativo</label>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mr-2">Ordem:</label>
                    <input
                      type="number"
                      value={variacao.ordem || index}
                      onChange={(e) => handleVariacaoChange(index, 'ordem', parseInt(e.target.value) || 0)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                      min="0"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeVariacao(index)}
                      className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                {variacao.imagem_url && (
                  <div className="mt-2">
                    <img 
                      src={variacao.imagem_url} 
                      alt={variacao.cor} 
                      className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50x50?text=Erro';
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Ativo e Ordem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <input
                type="checkbox"
                name="ativo"
                checked={formData.ativo}
                onChange={handleChange}
                className="w-5 h-5 text-pink-500 focus:ring-pink-500 rounded border-gray-300"
              />
              <label className="text-sm font-medium text-gray-700 cursor-pointer">
                Produto ativo
                <span className="block text-xs text-gray-400 font-normal">Visível no catálogo</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Ordem de exibição
              </label>
              <input
                type="number"
                name="ordem"
                value={formData.ordem}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:from-pink-600 hover:to-pink-700 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-pink-200"
            >
              <Save size={18} />
              {saving ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Modal de Confirmação - Excluir */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir "${formData.nome}"? Esta ação não pode ser desfeita e todos os dados serão perdidos.`}
        confirmText="Sim, excluir"
        cancelText="Cancelar"
        type="danger"
      />

      {/* Toast */}
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