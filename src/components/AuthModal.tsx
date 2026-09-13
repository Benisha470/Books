import React, { useState } from 'react';
import { X, BookOpen, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = isRegister ? (name || 'Reader') : (email ? email.split('@')[0] : 'Reader');
    onLoginSuccess({
      name: finalName,
      email: email || 'reader@ziabooks.com',
    });
    onClose();
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="auth-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#E8E2D9] animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close auth dialog"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFEBE4] text-[#4A423B] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#231F20] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <BookOpen className="w-6 h-6 text-[#D4A373]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1A1615]">
            {isRegister ? 'Join ZIA Reader Circle' : 'Welcome to ZIA Books'}
          </h2>
          <p className="text-xs text-[#7D7065] mt-1">
            {isRegister
              ? 'Enjoy 10% off your inaugural order and early access to rare editions.'
              : 'Sign in to access your reading wishlists and past orders.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-[#544B42] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C7B6D] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:ring-1 focus:ring-[#C58940]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#544B42] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C7B6D] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@ziabooks.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:ring-1 focus:ring-[#C58940]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544B42] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C7B6D] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs text-[#1A1615] focus:outline-none focus:ring-1 focus:ring-[#C58940]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#231F20] hover:bg-[#3D3536] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4 text-[#D4A373]" />
          </button>
        </form>

        {/* Switch toggle */}
        <div className="mt-6 pt-4 border-t border-[#F0EBE3] text-center text-xs text-[#6F6458]">
          {isRegister ? (
            <span>
              Already a member?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="font-bold text-[#A26D3F] hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New to ZIA Books?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="font-bold text-[#A26D3F] hover:underline"
              >
                Join the Reader Circle
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
