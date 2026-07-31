import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, PhoneCall, AlertTriangle } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotalQuantity,
    setIsEnquiryModalOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceed = () => {
    setIsCartOpen(false);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="w-full max-w-md bg-[#0A1128] border-l border-slate-800 h-full flex flex-col text-white shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#0E1836] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-cinzel font-bold text-lg tracking-wider text-white">B2B Wholesale Cart</h3>
            <span className="bg-[#C5A059] text-[#050A1A] text-[10px] font-syne font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md">
              {cartTotalQuantity} Pcs
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-[#050A1A] border border-white/10 hover:border-[#C5A059] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0E1836] border border-white/10 flex items-center justify-center text-[#C5A059]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-cinzel font-bold text-slate-200 text-lg">Your Wholesale Cart is Empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto font-sans leading-relaxed">
                Explore our wholesale garment categories to add products, colors, and size runs to your quotation.
              </p>
            </div>
          ) : (
            cart.map((item, index) => {
              const itemTotal = item.totalQuantity;
              const isUnderMoq = itemTotal < item.product.moq;

              return (
                <div key={index} className="bg-[#0E1836] border border-white/10 p-4 rounded-2xl space-y-3 relative group">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-xl border border-white/10"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#C5A059] font-bold block">{item.product.code}</span>
                      <h4 className="font-cinzel font-bold text-xs text-white line-clamp-1">{item.product.name}</h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <span>Color:</span>
                        <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: item.selectedColor.hex }} />
                        <span className="font-semibold text-[#C5A059] font-syne">{item.selectedColor.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">{item.product.fabric} ({item.product.gsm} GSM)</p>
                    </div>
                  </div>

                  {/* Size Breakdown Pills */}
                  <div className="bg-[#050A1A] border border-white/10 p-2.5 rounded-xl text-xs space-y-1">
                    <span className="text-[10px] font-syne text-slate-400 font-bold uppercase tracking-wider block">Size Breakdown:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.entries(item.sizeQuantities) as [string, number][]).map(([sz, qty]) => qty > 0 && (
                        <span key={sz} className="bg-[#0E1836] border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-200">
                          {sz}: {qty}pcs
                        </span>
                      ))}
                    </div>
                  </div>

                  {item.customizationNotes && (
                    <p className="text-[10px] text-[#C5A059] italic bg-[#C5A059]/10 p-2 rounded-lg border border-[#C5A059]/20 font-sans">
                      Note: {item.customizationNotes}
                    </p>
                  )}

                  {isUnderMoq && (
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold bg-amber-500/10 p-2 rounded-lg border border-amber-500/30 font-syne">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Item total ({itemTotal} Pcs) is below MOQ ({item.product.moq} Pcs).</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                    <span className="text-slate-400 font-syne text-[10px] uppercase tracking-wider">Subtotal Quantity:</span>
                    <span className="font-mono font-bold text-[#C5A059]">{itemTotal} Pcs</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#0E1836] border-t border-white/10 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-300 font-syne text-xs uppercase tracking-widest">Total Wholesale Volume:</span>
              <span className="text-[#C5A059] font-mono text-lg">{cartTotalQuantity} Pcs</span>
            </div>

            <button
              onClick={handleProceed}
              className="w-full bg-[#C5A059] hover:bg-white text-[#050A1A] font-syne font-extrabold text-xs tracking-[0.2em] uppercase py-3.5 px-4 rounded-xl shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition"
            >
              Proceed To B2B Enquiry Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-slate-500 hover:text-rose-400 transition text-center py-1 font-syne uppercase tracking-wider text-[10px] cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
