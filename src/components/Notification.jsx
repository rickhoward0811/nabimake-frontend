import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function Notification({ message, type = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animação de entrada
    const timer1 = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Fechar automaticamente
    const timer2 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 400);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onClose]);

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 transition-all duration-500 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-10 opacity-0 scale-95'
      }`}
    >
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-2xl p-4 max-w-sm flex items-start gap-3 backdrop-blur-sm">
        <div className="flex-shrink-0 animate-bounce-in">
          <CheckCircle className="text-green-500 mt-0.5" size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 400);
          }}
          className="text-green-500 hover:text-green-700 transition-colors flex-shrink-0 hover:rotate-90 transition-transform duration-300"
          aria-label="Fechar notificação"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}