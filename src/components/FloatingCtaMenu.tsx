import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  MessageCircle, 
  PhoneCall, 
  Calculator, 
  Truck, 
  FileText, 
  X, 
  Sparkles,
  ChevronUp,
  Building2
} from 'lucide-react';

export const FloatingCtaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveModal, setActiveTab } = useCart();

  const LOGO_SYMBOL_URL = "https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/IMG_3157.PNG";

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[99] flex flex-col items-end">
      
      {/* Expanded Menu Actions */}
      {isOpen && (
        <div className="mb-3 space-y-2.5 max-w-[calc(100vw-2rem)] w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Action 1: WhatsApp Quick Connect */}
          <a
            href="https://wa.me/917528802003?text=Hello%20Fortune%20Clothing%20Co.%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20manufacturing."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-[#0A152E]/95 border border-[#25D366]/50 hover:border-[#25D366] text-white p-3 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#25D366] text-[#050A1A] flex items-center justify-center font-bold shadow-md shrink-0">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-bold font-syne text-[#25D366] group-hover:underline truncate">
                WhatsApp Factory Line
              </div>
              <div className="text-[10px] text-slate-300 font-mono truncate">
                +91 75288 02003 • Instant Quote
              </div>
            </div>
          </a>

          {/* Action 2: Request Instant Callback */}
          <button
            onClick={() => { setActiveModal('callback'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0A152E]/95 border border-[#C5A059]/50 hover:border-[#C5A059] text-white p-3 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#C5A059] text-[#050A1A] flex items-center justify-center font-bold shadow-md shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-bold font-syne text-[#C5A059] truncate">
                Executive Callback
              </div>
              <div className="text-[10px] text-slate-300 font-mono truncate">
                Connect in 15 Minutes
              </div>
            </div>
          </button>

          {/* Action 3: B2B Profitability Engine */}
          <button
            onClick={() => { setActiveTab('calculator'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0A152E]/95 border border-white/10 hover:border-[#C5A059] text-white p-3 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#121c33] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center font-bold shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-bold font-syne text-slate-200 group-hover:text-[#C5A059] truncate">
                B2B Profit Calculator
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                Estimate Landed Cost
              </div>
            </div>
          </button>

          {/* Action 4: Track Order Status */}
          <button
            onClick={() => { setActiveTab('tracker'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0A152E]/95 border border-white/10 hover:border-[#C5A059] text-white p-3 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#121c33] text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-bold font-syne text-slate-200 group-hover:text-emerald-400 truncate">
                Live Production Tracker
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                Ludhiana Dispatch Desk
              </div>
            </div>
          </button>

          {/* Action 5: Request Custom Sample / Tech Pack */}
          <button
            onClick={() => { setActiveModal('sample'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0A152E]/95 border border-white/10 hover:border-[#C5A059] text-white p-3 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#121c33] text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs font-bold font-syne text-slate-200 group-hover:text-[#C5A059] truncate">
                Order Garment Sample
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                Fabric & Fit Verification
              </div>
            </div>
          </button>

        </div>
      )}

      {/* Main Trigger Hub Circular Button - No Text Label */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-2xl cursor-pointer active:scale-95 shrink-0 ${
          isOpen 
            ? 'bg-[#0A152E] border-[#C5A059] text-[#C5A059]' 
            : 'bg-[#C5A059] hover:bg-white border-[#C5A059] hover:border-white scale-105 shadow-[0_0_25px_rgba(197,160,89,0.5)]'
        }`}
        aria-label="Speed Action Hub"
        title="B2B Speed Actions"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#C5A059]" />
        ) : (
          <img 
            src={LOGO_SYMBOL_URL} 
            alt="Fortune Logo" 
            className="w-8 h-8 object-contain filter drop-shadow group-hover:scale-110 transition-transform"
          />
        )}

        {/* Pulse Dot Indicator when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border-2 border-[#050A1A]"></span>
          </span>
        )}
      </button>

    </div>
  );
};
