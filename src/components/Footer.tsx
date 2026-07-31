import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Factory, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  Download, 
  ExternalLink,
  ChevronRight,
  ArrowUp,
  FileCheck2,
  Clock,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory, setActiveModal } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    'T-Shirts', 'Sweatshirts', 'Hoodies', 'Jackets',
    'Lowers', 'Joggers', 'Tracksuits', 'Winter Wear'
  ];

  return (
    <footer className="bg-[#050A1A] text-slate-300 border-t border-white/10 relative overflow-hidden">
      
      {/* Decorative Gold Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-amber-700 via-[#C5A059] to-amber-700 w-full" />

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 flex items-center justify-center p-0.5">
                <img 
                  src="https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/IMG_3157.PNG" 
                  alt="Fortune Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-cinzel text-xl font-bold text-white tracking-[0.2em] leading-none">
                  FORTUNE
                </h3>
                <p className="text-[9px] font-syne uppercase tracking-[0.4em] text-[#C5A059] font-medium mt-1">
                  Clothing Company • Ludhiana
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              Fortune Clothing Company is a premier Ludhiana-based textile and garment manufacturing powerhouse serving fashion brands, wholesale distributors, retail chains, and corporate buyers across India and worldwide.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2 font-mono">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  Plot No. 83, Gobindpuri, Bahadur Ke Road, Ludhiana, Punjab, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/917528802003" target="_blank" rel="noreferrer" className="hover:text-white font-medium">
                  +91 75288 02003 (WhatsApp & Call)
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>wholesale@fortuneclothing.in</span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">GSTIN: 03AWNPV5250E3ZE</span>
              </div>
            </div>

            {/* GST & Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-[#0A152E] border border-white/10 text-emerald-400 px-2.5 py-1 rounded-md flex items-center gap-1">
                <FileCheck2 className="w-3 h-3" /> GST Invoice
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-[#0A152E] border border-white/10 text-[#C5A059] px-2.5 py-1 rounded-md flex items-center gap-1">
                <Factory className="w-3 h-3" /> Factory Direct
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-[#0A152E] border border-white/10 text-sky-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" /> 25k Pcs/Day
              </span>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Categories</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveTab('catalogue');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#C5A059] transition flex items-center gap-1.5 text-slate-400 hover:translate-x-1 duration-150 cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C5A059]" />
                    <span>{cat} Wholesale</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Portals</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => { setActiveTab('privatelabel'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C5A059] transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C5A059]" /> Custom Private Labeling
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('factory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C5A059] transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C5A059]" /> Manufacturing Tour
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C5A059] transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C5A059]" /> Profitability Engine
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('tracker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#C5A059] transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C5A059]" /> Live Dispatch Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('dealer')} className="hover:text-[#C5A059] transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C5A059]" /> Become a Partner
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('visit')} className="hover:text-[#C5A059] transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#C5A059]" /> Factory Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Catalogue Download & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-[0.25em] text-[#C5A059] border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Resources</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            </h4>
            <div className="bg-[#0A152E] border border-white/10 p-4 rounded-xl space-y-3">
              <span className="text-[9px] uppercase font-bold text-[#C5A059] tracking-[0.2em] block">
                Wholesale Product Matrix
              </span>
              <p className="text-xs text-slate-300">
                Get full GSM specifications, size charts & pricing tiers.
              </p>
              <button
                onClick={() => setActiveModal('catalogue')}
                className="w-full bg-[#C5A059] hover:bg-white text-[#050A1A] font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer tracking-wider uppercase text-[10px]"
              >
                <Download className="w-3.5 h-3.5" /> PDF Catalogue
              </button>
            </div>

            <div className="pt-2 text-xs text-slate-400">
              <p className="font-medium text-slate-200">Business Hours:</p>
              <p className="font-mono">Mon - Sat: 9:00 AM - 8:00 PM IST</p>
              <p className="font-mono">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          <div>
            <p>© {new Date().getFullYear()} Fortune Clothing Company. All Rights Reserved. Wholesale & Manufacturing Only.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Plot No. 83, Gobindpuri, Bahadur Ke Road, Ludhiana, Punjab, India | GSTIN: 03AWNPV5250E3ZE</p>
          </div>

          {/* PROMINENT DEVELOPER ATTRIBUTION REQUIRED BY USER PROMPT */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-[#0A152E] border border-[#C5A059]/30 px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="text-slate-400 font-medium text-[11px]">Designed & Engineered by</span>
              <a 
                href="https://nexturex.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-[#C5A059] hover:text-white transition flex items-center gap-1 group"
              >
                NextureX
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#0A152E] border border-white/10 hover:border-[#C5A059] text-slate-300 hover:text-[#C5A059] transition cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
