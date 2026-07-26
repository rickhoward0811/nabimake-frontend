import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' },
    error: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' },
    warning: { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' }
  };

  const { icon: Icon, color, bg, border } = icons[type] || icons.info;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className={`transition-all duration-300 transform ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${bg} ${border} max-w-md`}>
          <Icon className={`flex-shrink-0 ${color}`} size={20} />
          <span className="text-sm font-medium text-gray-800 flex-1">{message}</span>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="p-1 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}