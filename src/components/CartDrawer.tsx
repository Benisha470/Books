import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (bookId: string, format: string, newQty: number) => void;
  onRemoveItem: (bookId: string, format: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => boolean;
  discountPercent: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  onApplyDiscount,
  discountPercent,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const discountedSubtotal = rawSubtotal - discountAmount;
  const shipping = rawSubtotal > 45 || cartItems.length === 0 ? 0 : 4.95;
  const total = discountedSubtotal + shipping;

  const freeShippingThreshold = 45;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - rawSubtotal);
  const freeShippingProgress = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyDiscount(promoInput.trim());
    if (success) {
      setPromoMessage({ text: 'Promo code applied successfully!', isError: false });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "ZIA30" for 30% off.', isError: true });
    }
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E8E2D9]">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EFEBE4] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#231F20]" />
              <h2 className="font-serif text-2xl font-bold text-[#1A1615]">Your Bag</h2>
              <span className="text-xs bg-[#231F20] text-white px-2 py-0.5 rounded-full font-semibold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 rounded-full hover:bg-[#EFEBE4] text-[#4A423B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#F5EFE6] border-b border-[#E6DCCF] text-xs text-[#5D5044]">
            {freeShippingRemaining === 0 ? (
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You unlocked free worldwide book dispatch!</span>
              </div>
            ) : (
              <div>
                <span>
                  Add <strong className="text-[#1A1615]">${freeShippingRemaining.toFixed(2)}</strong> more to unlock <strong>Free Shipping</strong>
                </span>
                <div className="w-full bg-[#E0D5C5] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#C58940] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center mx-auto text-[#9B8E80] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1615]">Your book bag is empty</h3>
                <p className="text-xs text-[#7B6F64] mt-1 max-w-xs mx-auto">
                  Explore our curated bookshelves and find your next unforgettable story.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#231F20] text-white text-xs font-semibold rounded-full hover:bg-[#3D3536] transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.book.id}-${item.format}`}
                  className="flex gap-4 p-3 bg-[#FAF8F5] rounded-2xl border border-[#ECE5DC]"
                >
                  {/* Miniature 3D book cover */}
                  <div className="w-16 h-22 rounded bg-[#2A2624] overflow-hidden shrink-0 book-shadow">
                    <img
                      src={item.book.coverUrl}
                      alt={item.book.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-bold text-[#1A1615] line-clamp-1">
                          {item.book.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.book.id, item.format)}
                          aria-label="Remove item"
                          className="text-[#998B7E] hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#7D7065]">{item.book.author}</p>
                      <span className="text-[10px] text-[#A26D3F] font-semibold uppercase tracking-wider block mt-0.5">
                        {item.format}
                      </span>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFE8DF]">
                      <div className="flex items-center border border-[#D5CABB] rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.book.id, item.format, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#3D352F] hover:bg-[#FAF8F5]"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#1A1615]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.book.id, item.format, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#3D352F] hover:bg-[#FAF8F5]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-sm text-[#1A1615]">
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Calculations */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#EFEBE4] bg-[#FAF8F5]">
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-[#8C7B6D] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Coupon (e.g. ZIA30)"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#D5CABB] rounded-xl text-xs uppercase text-[#1A1615] focus:outline-none focus:ring-1 focus:ring-[#C58940]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#231F20] text-white text-xs font-semibold rounded-xl hover:bg-[#3B3435] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] mt-1.5 ${promoMessage.isError ? 'text-red-600' : 'text-emerald-700 font-semibold'}`}>
                    {promoMessage.text}
                  </p>
                )}
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    ✓ Code {discountCode || 'ZIA30'} applied ({discountPercent}% off books)
                  </p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs text-[#6F6255] pb-4 border-b border-[#EFE8DF]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1615]">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1A1615] pt-2 border-t border-[#EFE8DF]">
                  <span>Total Due</span>
                  <span className="font-serif text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                id="cart-checkout-button"
                onClick={onProceedToCheckout}
                className="w-full mt-4 py-3.5 bg-[#231F20] hover:bg-[#3D3536] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D4A373]" />
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#8C7D70]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E49]" />
                <span>256-bit encrypted checkout • 30-day returns</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
