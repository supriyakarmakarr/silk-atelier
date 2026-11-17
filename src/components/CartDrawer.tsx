import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { smoothScrollTo } from '../utils/useSmoothScroll';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, discountTotal, clearCart } = useShop();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    soundManager.playBagSuccess();
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#c59b27', '#670d1e', '#e5c365', '#ffffff'],
      });
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#faf8f5] h-full shadow-2xl flex flex-col justify-between border-l border-[#c59b27]/30 animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-6 bg-white border-b border-[#e8dfd5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#891b2e]" />
            <span className="font-serif-luxury text-lg font-bold text-[#1a1617] tracking-wider uppercase">
              Shopping Bag
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f0e8de] text-[#891b2e]">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              setIsCartOpen(false);
            }}
            className="p-2 rounded-full hover:bg-black/5 text-[#5e5357] hover:text-[#1a1617] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderComplete ? (
            <div className="py-16 text-center flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-4 animate-bounce" />
              <h3 className="font-serif-luxury text-2xl font-bold text-[#29050d] mb-2">
                Divine Blessings!
              </h3>
              <p className="text-sm text-[#5a5255] max-w-xs mb-6">
                Your heirloom silk order #SUP-{Math.floor(100000 + Math.random() * 900000)} has been placed. Our master weavers are packaging your heritage saree in brass-accented teakwood presentation boxes.
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  setIsCartOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-[#670d1e] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Continue Browsing
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#f0e8de] flex items-center justify-center text-[#891b2e] mb-4">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <p className="font-serif-luxury text-lg font-bold text-[#29050d] mb-1">
                Your Bag is Empty
              </p>
              <p className="text-xs text-[#706467] max-w-xs mb-6">
                Explore our divine Kanchipuram silk collection and add your favorite heirlooms to begin.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  smoothScrollTo('the-rack');
                }}
                className="px-6 py-2.5 rounded-full bg-[#670d1e] text-white text-xs font-semibold uppercase tracking-wider shadow-lg"
              >
                Explore The Rack
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-3.5 bg-white rounded-2xl border border-[#e8dfd5] shadow-xs hover:border-[#c59b27]/40 transition-all"
              >
                <img loading="lazy" decoding="async"
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-20 rounded-xl object-cover border border-[#e8dfd5]"
                />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-semibold text-[#1a1617] line-clamp-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-[#998d91] hover:text-[#891b2e] p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.size && (
                      <div className="text-[10px] text-[#786c70] mt-0.5">
                        Size: <span className="font-semibold">{item.size}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 border border-[#d6cbc0] rounded-full px-2 py-0.5 bg-[#faf7f2]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                        className="text-[#554b4e] hover:text-[#1a1617] p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                        className="text-[#554b4e] hover:text-[#1a1617] p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Item Total Price */}
                    <div className="text-right">
                      {item.originalPrice && (
                        <div className="text-[10px] text-[#9c9194] line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </div>
                      )}
                      <div className="text-xs font-bold text-[#29050d]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {!orderComplete && cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#e8dfd5] shadow-lg">
            
            {/* Free Insured Silk Transit Banner */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#faf7f2] border border-[#e8dfd5] text-[11px] text-[#554b4e] mb-4">
              <ShieldCheck className="w-4 h-4 text-[#c59b27] flex-shrink-0" />
              <span>Complimentary insured temple box delivery across India.</span>
            </div>

            <div className="space-y-1.5 text-xs text-[#554b4e] mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{(cartTotal + discountTotal).toLocaleString('en-IN')}</span>
              </div>
              {discountTotal > 0 && (
                <div className="flex justify-between text-[#891b2e] font-semibold">
                  <span>Curated Look Discount (10%)</span>
                  <span>-₹{discountTotal.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-[#1a1617] pt-2 border-t border-[#f0e8de]">
                <span>Total Amount</span>
                <span className="text-[#891b2e] text-base">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Sacred Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 px-6 rounded-full bg-[#670d1e] hover:bg-[#831227] text-white font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02] border border-[#c59b27]/40"
            >
              {isCheckingOut ? (
                <>
                  <Sparkles className="w-4 h-4 text-[#e5c365] animate-spin" />
                  <span>Securing Handloom Order...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Sacred Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
