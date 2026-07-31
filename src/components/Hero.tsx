import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Factory, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  PhoneCall, 
  Download, 
  CheckCircle2, 
  Layers, 
  Award, 
  Sparkles,
  Zap,
  Star
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setActiveModal } = useCart();

  return (
    <section className="relative bg-[#050A1A] text-white pt-12 pb-24 px-4 lg:px-8 border-b border-white/10 overflow-hidden">
      
      {/* Background Decorative Layered Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#C5A059]/10 via-[#C5A059]/20 to-indigo-900/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:36px_36px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Floating Trust Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 bg-[#0A152E] border border-[#C5A059]/40 px-4 py-2 rounded-full shadow-2xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.25em]">
              Wholesale Only • Ludhiana Direct • No Retail Sales
            </span>
          </div>
        </div>

        {/* Main Headline & Hero Story - Artistic Flair Editorial Typography */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Global Standard Garment Manufacturing{' '}
            <span className="bg-gradient-to-r from-amber-100 via-[#C5A059] to-amber-500 bg-clip-text text-transparent italic">
              Forged in Ludhiana.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Empowering international apparel labels, wholesale distributors, retail chains, and e-commerce brands with high-capacity textile manufacturing, custom private labeling, and factory-direct dispatch.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('catalogue')}
              className="bg-[#C5A059] hover:bg-white text-[#050A1A] font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-lg shadow-2xl flex items-center gap-2 transition cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#050A1A]" /> Explore Wholesale Matrix
            </button>

            <button
              onClick={() => setActiveModal('dealer')}
              className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-[0.2em] uppercase px-7 py-4 rounded-lg border border-white/20 hover:border-[#C5A059] shadow-lg flex items-center gap-2 transition cursor-pointer"
            >
              Become B2B Partner <ArrowRight className="w-4 h-4 text-[#C5A059]" />
            </button>

            <a
              href="https://wa.me/917528802003?text=Hello%20Fortune%20Clothing%2C%20I%20want%20to%20request%20a%20bulk%20wholesale%20quotation."
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-xs tracking-wider uppercase px-6 py-4 rounded-lg flex items-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" /> WhatsApp Quote
            </a>
          </div>

          {/* Quick Value Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-[11px] text-slate-300 uppercase tracking-widest font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> GSTIN Invoice Provided
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pan India Freight
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom OEM Packaging
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Strict Quality ISO Protocol
            </span>
          </div>

        </div>

        {/* Feature Grid Banner Overlay */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <div className="bg-[#0A152E] border border-white/10 p-5 rounded-2xl shadow-xl text-center group hover:border-[#C5A059]/60 transition">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-2 group-hover:scale-110 transition">
              <Factory className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl text-white">25,000+</div>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">Garments Daily Output</p>
          </div>

          <div className="bg-[#0A152E] border border-white/10 p-5 rounded-2xl shadow-xl text-center group hover:border-[#C5A059]/60 transition">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-110 transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl text-white">100%</div>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">Factory Direct Rates</p>
          </div>

          <div className="bg-[#0A152E] border border-white/10 p-5 rounded-2xl shadow-xl text-center group hover:border-[#C5A059]/60 transition">
            <div className="w-10 h-10 mx-auto rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-2 group-hover:scale-110 transition">
              <Truck className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl text-white">3 - 5 Days</div>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">Pan India Dispatch</p>
          </div>

          <div className="bg-[#0A152E] border border-white/10 p-5 rounded-2xl shadow-xl text-center group hover:border-[#C5A059]/60 transition">
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2 group-hover:scale-110 transition">
              <Award className="w-5 h-5" />
            </div>
            <div className="font-serif font-bold text-2xl text-white">8 Lines</div>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">Product Categories</p>
          </div>

        </div>

      </div>
    </section>
  );
};
