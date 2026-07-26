import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Lock, Shield, AlertCircle, Loader } from 'lucide-react';

export default function AdminLogin() {
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError('⛔ Muitas tentativas. Aguarde 10 minutos.');
      return;
    }
    
    setLoading(true);
    setError('');

    const result = await login(senha);
    
    if (result.success) {
      setAttempts(0);
      navigate('/admin/dashboard');
    } else {
      const novasTentativas = attempts + 1;
      setAttempts(novasTentativas);
      
      if (novasTentativas >= 5) {
        setIsBlocked(true);
        setError('⛔ Muitas tentativas. Aguarde 10 minutos.');
        setTimeout(() => {
          setIsBlocked(false);
          setAttempts(0);
          setError('');
        }, 10 * 60 * 1000);
      } else {
        const tentativasRestantes = 5 - novasTentativas;
        setError(
          `❌ ${result.error || 'Senha incorreta.'} Tentativas restantes: ${tentativasRestantes}`
        );
      }
      setSenha('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin NabiMake</h1>
          <p className="text-gray-500 text-sm mt-1">Área restrita - Acesso autorizado apenas</p>
          
          {attempts > 0 && !isBlocked && (
            <div className="mt-2">
              <span className={`text-xs ${attempts >= 4 ? 'text-red-500 font-bold' : 'text-orange-500'}`}>
                Tentativas: {attempts}/5
              </span>
            </div>
          )}
          
          {isBlocked && (
            <div className="mt-2">
              <span className="text-xs text-red-500 font-bold animate-pulse">
                ⛔ BLOQUEADO - Aguarde 10 minutos
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha..."
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                  isBlocked ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'border-gray-200'
                }`}
                autoFocus
                disabled={loading || isBlocked}
              />
            </div>
          </div>

          {error && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm ${
              isBlocked || error.includes('incorreta') 
                ? 'bg-red-50 border border-red-200 text-red-600' 
                : 'bg-yellow-50 border border-yellow-200 text-yellow-600'
            }`}>
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || isBlocked || !senha}
            className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Verificando...
              </>
            ) : isBlocked ? (
              '⛔ Bloqueado - Aguarde'
            ) : (
              'Entrar no Painel'
            )}
          </button>
        </form>

      </div>
    </div>
  );
}