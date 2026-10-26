import React, { useState } from 'react';
import { CartItem } from '../types';
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.product.price + (item.customStitching && item.product.stitchingPrice ? item.product.stitchingPrice : 0);
    return sum + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 1500 ? 0 : (items.length > 0 ? 100 : 0);
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setOrderConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#0F4C3F] to-[#185e4e] text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif font-bold text-lg">Your Tailoring Bag</h2>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-semibold">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {orderConfirmed ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                Order Confirmed!
              </h3>
              <p className="text-xs text-gray-600">
                Order reference: <strong className="text-[#0F4C3F]">#RB-{Math.floor(10000 + Math.random() * 90000)}</strong>
              </p>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-left space-y-1">
                <p><strong>Recipient:</strong> {customerName}</p>
                <p><strong>Phone:</strong> {customerPhone}</p>
                <p><strong>Address:</strong> {deliveryAddress}</p>
                <p><strong>Total:</strong> ₹{total} (Cash on Delivery / UPI upon fitting)</p>
              </div>
              <button
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-[#0F4C3F] text-white text-xs font-bold shadow-md hover:bg-[#0d3f34] transition"
              >
                Back to Boutique
              </button>
            </div>
          ) : isCheckingOut ? (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h4 className="text-sm font-bold text-gray-800">Delivery & Customer Details</h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#E91E63] font-semibold"
                >
                  ← Back to Bag
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sen"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Delivery Address *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Street, Landmark, Apartment, City, Pincode"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Payment on Delivery / Fitting</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  You can inspect the outfit quality and trial fit before making payment via cash or UPI.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E91E63] hover:bg-[#c2185b] text-white text-xs font-bold shadow-md transition"
              >
                Place Tailoring Order (₹{total})
              </button>
            </form>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-gray-700">Your bag is empty</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our designer blouses, suits, lehengas, or girls' gowns to begin tailoring.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, idx) => {
                const itemStitchFee = item.customStitching && item.product.stitchingPrice ? item.product.stitchingPrice : 0;
                return (
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex gap-3 relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-20 rounded-xl object-cover shrink-0 bg-gray-200"
                    />
                    <div className="flex-1 min-w-0 pr-6">
                      <h4 className="font-serif font-bold text-xs text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Size: <span className="font-semibold text-gray-800">{item.selectedSize}</span>
                      </p>
                      {item.customStitching && (
                        <p className="text-[10px] text-emerald-700 font-medium">
                          ✓ Custom tailoring (+₹{itemStitchFee})
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-900">
                          ₹{(item.product.price + itemStitchFee) * item.quantity}
                        </span>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2 py-0.5 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="text-gray-500 hover:text-gray-900 font-bold"
                          >
                            -
                          </button>
                          <span className="font-semibold px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-900 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && !orderConfirmed && !isCheckingOut && (
          <div className="p-5 border-t border-gray-100 bg-[#FFF8F0]/40 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold text-gray-900">
                  {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-base text-[#0F4C3F]">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 rounded-xl bg-[#E91E63] hover:bg-[#c2185b] text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
