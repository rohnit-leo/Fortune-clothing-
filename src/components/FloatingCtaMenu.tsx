import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  MessageCircle, 
  FileText, 
  Calculator, 
  X, 
  ShoppingBag
} from 'lucide-react';

export const FloatingCtaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveTab, setActiveModal, setIsCartOpen, cartTotalQuantity } = useCart();

  const LOGO_SYMBOL_URL = "https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/IMG_3157.PNG";

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3 font-sans">
      
      {/* Speed Dial Options Menu */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Option 1: WhatsApp Direct */}
          <a
            href="https://wa.me/917528802003"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 bg-[#25D366] text-white py-2.5 px-4 rounded-full shadow-xl hover:scale-105 transition cursor-pointer"
          >
            <span className="text-xs font-syne font-normal uppercase tracking-wider">WhatsApp Direct</span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 fill-current text-white" />
            </div>
          </a>

          {/* Option 2: B2B Cart */}
          <button
            onClick={() => {
              setIsCartOpen(true);
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 bg-[#0F172A] text-white py-2.5 px-4 rounded-full shadow-xl hover:scale-105 transition cursor-pointer"
          >
            <span className="text-xs font-syne font-normal uppercase tracking-wider">B2B Cart ({cartTotalQuantity})</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#C5A059]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </button>

          {/* Option 3: Request Swatches */}
          <button
            onClick={() => {
              setActiveModal('sample');
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 bg-white text-gray-900 border border-gray-200 py-2.5 px-4 rounded-full shadow-xl hover:scale-105 transition cursor-pointer"
          >
            <span className="text-xs font-syne font-normal uppercase tracking-wider">Order Swatches</span>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-[#0F172A]">
              <FileText className="w-4 h-4" />
            </div>
          </button>

          {/* Option 4: Margin Calculator */}
          <button
            onClick={() => {
              setActiveTab('calculator');
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 bg-white text-gray-900 border border-gray-200 py-2.5 px-4 rounded-full shadow-xl hover:scale-105 transition cursor-pointer"
          >
            <span className="text-xs font-syne font-normal uppercase tracking-wider">Margin Calculator</span>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-[#C5A059]">
              <Calculator className="w-4 h-4" />
            </div>
          </button>

        </div>
      )}

      {/* Main Trigger Circular Button (No text name, pure circular icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-2xl border-2 border-[#C5A059] flex items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer relative"
        title="Quick Factory Actions"
        aria-label="Toggle Quick Floating Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#C5A059]" />
        ) : (
          <img 
            src={LOGO_SYMBOL_URL} 
            alt="Menu Icon" 
            className="w-8 h-8 object-contain rounded-full"
          />
        )}

        {/* Pulse indicator badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#25D366] border-2 border-white animate-pulse" />
        )}
      </button>

    </div>
  );
};
