import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Truck, BookOpen, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  shipping,
  total,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor@example.com',
    address: '45 Kensington Gardens',
    city: 'London',
    postalCode: 'W8 4PX',
    cardNumber: '•••• •••• •••• 4242',
    deliveryNote: 'Please place in sheltered porch.',
  });
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `ZIA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    onOrderCompleted();
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="checkout-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-[#E8E2D9] my-8 animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFEBE4] text-[#4A423B] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A26D3F] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#2C6E49]" />
              <span>Secure Encrypted Checkout</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1A1615]">
              Finalize Your Literary Order
            </h2>
            <p className="text-xs text-[#786C60] mt-1">
              Your books are individually wrapped with archival tissue and complimentary bookmarks.
            </p>

            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-5">
              {/* Recipient & Address */}
              <div>
                <h3 className="text-xs font-bold uppercase text-[#473E36] tracking-wider mb-2.5">
                  Shipping Destination
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="p-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="p-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="col-span-2 p-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="col-span-2 p-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="p-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="p-2.5 bg-[#FAF8F5] border border-[#D5CABB] rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Payment preview */}
              <div>
                <h3 className="text-xs font-bold uppercase text-[#473E36] tracking-wider mb-2.5">
                  Payment Method
                </h3>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#D5CABB]">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-[#A26D3F]" />
                    <div>
                      <span className="text-xs font-bold text-[#1A1615] block">Credit / Debit Card</span>
                      <span className="text-[11px] text-[#7A6E63]">{formData.cardNumber}</span>
                    </div>
                  </div>
                  <span className="text-[11px] bg-[#EAE2D5] px-2 py-0.5 rounded font-semibold text-[#4A4036]">
                    Demo Simulated
                  </span>
                </div>
              </div>

              {/* Order summary table */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] space-y-1.5 text-xs text-[#6F6458]">
                <div className="flex justify-between">
                  <span>Items in order ({cartItems.length})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>ZIA Savings</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1A1615] pt-2 border-t border-[#EAE3D8]">
                  <span>Total</span>
                  <span className="font-serif text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#231F20] hover:bg-[#3D3536] text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm & Place Order (${total.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4 text-[#D4A373]" />
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmed View */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#2C6E49] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2C6E49]">
              Order Confirmed
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1A1615] mt-1">
              Thank You for Supporting Literature
            </h2>
            <p className="text-xs text-[#73685C] mt-2 max-w-md mx-auto">
              Your order confirmation has been sent to <strong className="text-[#1A1615]">{formData.email}</strong>. 
              Our curators are preparing your books with our signature bookmark and wax seal.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] inline-block text-left">
              <p className="text-xs text-[#8C7D70]">Order Reference Number</p>
              <p className="font-mono text-lg font-bold text-[#1A1615] tracking-widest">{orderId}</p>
            </div>

            <div>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-[#231F20] hover:bg-[#3D3536] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Return to Bookstore
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
