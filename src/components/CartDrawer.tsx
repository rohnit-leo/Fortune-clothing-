import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  ArrowRight, 
  AlertTriangle
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    clearCart, 
    cartTotalQuantity,
    setActiveModal
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-xs font-sans">
      
      {/* Backdrop overlay */}
      <div 
        onClick={() => setIsCartOpen(false)} 
        className="absolute inset-0 cursor-pointer"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full flex flex-col text-gray-900 shadow-2xl animate-in slide-in-from-right duration-300 border-l border-gray-200">
        
        {/* Drawer Header */}
        <div className="p-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif font-normal text-lg text-gray-900">B2B Wholesale Cart</h3>
            <span className="bg-[#0F172A] text-white text-[10px] font-syne font-normal uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs">
              {cartTotalQuantity} Pcs
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Items List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                <ShoppingBag className="w-8 h-8 text-[#C5A059]" />
              </div>
              <h4 className="font-serif font-normal text-gray-800 text-lg">Your Wholesale Cart is Empty</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto font-sans leading-relaxed font-normal">
                Explore our wholesale garment categories to add products, colors, and size runs to your quotation.
              </p>
            </div>
          ) : (
            cart.map((item, index) => {
              const itemTotal = item.totalQuantity;
              const isUnderMoq = itemTotal < item.product.moq;

              return (
                <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-2xl space-y-3 relative group shadow-2xs">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-rose-600 transition p-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex gap-3">
                    <img
                      src={item.selectedColor.image || item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-xl border border-gray-200 bg-white"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#C5A059] font-normal block">{item.product.code}</span>
                      <h4 className="font-serif font-normal text-xs text-gray-900 line-clamp-1">{item.product.name}</h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-normal">
                        <span>Color:</span>
                        <span className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: item.selectedColor.hex }} />
                        <span className="font-normal text-gray-800 font-syne">{item.selectedColor.name}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono font-normal">{item.product.fabric} ({item.product.gsm} GSM)</p>
                    </div>
                  </div>

                  {/* Size Breakdown */}
                  <div className="bg-white border border-gray-200 p-2.5 rounded-xl text-xs space-y-1">
                    <span className="text-[10px] font-syne text-gray-500 font-normal uppercase tracking-wider block">Size Run Breakdown:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.entries(item.sizeQuantities) as [string, number][]).map(([sz, qty]) => qty > 0 && (
                        <span key={sz} className="bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-mono font-normal text-gray-800">
                          {sz}: {qty}pcs
                        </span>
                      ))}
                    </div>
                  </div>

                  {item.customizationNotes && (
                    <p className="text-[10px] text-gray-700 italic bg-amber-50 p-2 rounded-lg border border-amber-200 font-sans font-normal">
                      Note: {item.customizationNotes}
                    </p>
                  )}

                  {isUnderMoq && (
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-800 font-normal bg-amber-50 p-2 rounded-lg border border-amber-200 font-syne">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>Item quantity ({itemTotal} Pcs) is below MOQ ({item.product.moq} Pcs).</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200">
                    <span className="text-gray-500 font-syne text-[10px] uppercase tracking-wider font-normal">Subtotal Volume:</span>
                    <span className="font-mono font-normal text-[#0F172A] text-sm">{itemTotal} Pcs</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cart.length > 0 && (
          <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-3">
            <div className="flex justify-between items-center text-sm font-normal">
              <span className="text-gray-700 font-syne text-xs uppercase tracking-widest font-normal">Total Wholesale Volume:</span>
              <span className="text-[#0F172A] font-mono text-xl font-normal">{cartTotalQuantity} Pcs</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setActiveModal('enquiry');
              }}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-syne font-normal text-xs tracking-[0.2em] uppercase py-4 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition active:scale-98"
            >
              <span>Proceed To B2B Enquiry Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-gray-500 hover:text-rose-600 transition text-center py-1 font-syne uppercase tracking-wider text-[10px] cursor-pointer font-normal"
            >
              Clear Cart
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
