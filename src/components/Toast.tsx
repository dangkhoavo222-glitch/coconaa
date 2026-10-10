import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  toast: {
    show: boolean;
    title: string;
    desc: string;
  };
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 bg-[#003629] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#a5f4bb]/40 animate-in slide-in-from-bottom-5">
      <CheckCircle2 className="w-6 h-6 text-[#a5f4bb] shrink-0" />
      <div className="pr-2">
        <h5 className="font-bold text-xs sm:text-sm text-white">{toast.title}</h5>
        <p className="text-[11px] text-gray-300">{toast.desc}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
