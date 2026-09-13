import React from 'react';
import { CheckCircle2, Heart, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  title: string;
  subtitle?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-notifications-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-[#231F20] text-[#FAF8F5] px-4 py-3 rounded-2xl shadow-xl border border-[#3E3536] max-w-sm animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            {toast.type === 'cart' && <ShoppingBag className="w-4 h-4 text-[#D4A373]" />}
            {toast.type === 'wishlist' && <Heart className="w-4 h-4 text-[#FF859A] fill-[#FF859A]" />}
            {toast.type === 'info' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{toast.title}</p>
            {toast.subtitle && (
              <p className="text-[11px] text-[#D0C4B8] truncate">{toast.subtitle}</p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/60 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
