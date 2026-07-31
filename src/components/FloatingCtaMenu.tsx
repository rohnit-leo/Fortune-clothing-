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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded Menu Actions */}
      {isOpen && (
        <div className="mb-3 space-y-2.5 animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Action 1: WhatsApp Quick Connect */}
          <a
            href="https://wa.me/917528802003?text=Hello%20Fortune%20Clothing%20Co.%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20manufacturing."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-[#0A152E] hover:bg-[#121c33] border border-[#25D366]/40 hover:border-[#25D366] text-white px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#25D366] text-[#050A1A] flex items-center justify-center font-bold shadow-md">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold font-syne text-[#25D366] group-hover:underline">
                WhatsApp Factory Line
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                +91 75288 02003 • Instant Quote
              </div>
            </div>
          </a>

          {/* Action 2: Request Instant Callback */}
          <button
            onClick={() => { setActiveModal('callback'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0A152E] hover:bg-[#121c33] border border-[#C5A059]/40 hover:border-[#C5A059] text-white px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#C5A059] text-[#050A1A] flex items-center justify-center font-bold shadow-md">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold font-syne text-[#C5A059]">
                Executive Callback
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Connect in 15 Minutes
              </div>
            </div>
          </button>

          {/* Action 3: B2B Profitability Engine */}
          <button
            onClick={() => { setActiveTab('calculator'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0A152E] hover:bg-[#121c33] border border-white/10 hover:border-[#C5A059] text-white px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#121c33] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold font-syne text-slate-200 group-hover:text-[#C5A059]">
                B2B Profit Calculator
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Estimate Landed Cost
              </div>
            </div>
          </button>

          {/* Action 4: Track Order Status */}
          <button
            onClick={() => { setActiveTab('tracker'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0A152E] hover:bg-[#121c33] border border-white/10 hover:border-[#C5A059] text-white px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#121c33] text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold font-syne text-slate-200 group-hover:text-emerald-400">
                Live Production Tracker
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Ludhiana Dispatch Desk
              </div>
            </div>
          </button>

          {/* Action 5: Request Custom Sample / Tech Pack */}
          <button
            onClick={() => { setActiveModal('sample'); setIsOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0A152E] hover:bg-[#121c33] border border-white/10 hover:border-[#C5A059] text-white px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md transition group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#121c33] text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold font-syne text-slate-200 group-hover:text-[#C5A059]">
                Order Garment Sample
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Fabric & Fit Verification
              </div>
            </div>
          </button>

        </div>
      )}

      {/* Main Trigger Hub Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center gap-3 px-4 py-3 rounded-full border-2 transition-all duration-300 shadow-2xl cursor-pointer ${
          isOpen 
            ? 'bg-[#050A1A] text-white border-[#C5A059]' 
            : 'bg-[#C5A059] hover:bg-white text-[#050A1A] border-[#C5A059] hover:border-white scale-105'
        }`}
        title="Smart B2B Action Menu"
      >
        <div className="w-7 h-7 flex items-center justify-center p-0.5 overflow-hidden shrink-0">
          <img 
            src={LOGO_SYMBOL_URL} 
            alt="Fortune Logo" 
            className="w-full h-full object-contain"
          />
        </div>

        <span className="text-[10px] font-syne font-extrabold uppercase tracking-[0.2em] whitespace-nowrap">
          {isOpen ? 'Close Menu' : 'Smart B2B Hub'}
        </span>

        <div className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white/10' : ''}`}>
          {isOpen ? <X className="w-4 h-4 text-[#C5A059]" /> : <ChevronUp className="w-4 h-4 text-[#050A1A] group-hover:text-[#050A1A]" />}
        </div>

        {/* Pulse Dot Indicator when closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border border-[#050A1A]"></span>
          </span>
        )}
      </button>

    </div>
  );
};
