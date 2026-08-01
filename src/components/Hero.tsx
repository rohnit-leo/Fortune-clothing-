import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  ChevronRight,
  Factory,
  Sparkles,
  PackageCheck,
  ShieldCheck
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedCategory, setActiveModal } = useCart();

  const HERO_IMAGE_PRIMARY = "https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.02.39%20AM.jpeg";
  const HERO_IMAGE_SECONDARY = "https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.04.22%20AM.jpeg";

  return (
    <section className="relative bg-white pt-4 pb-10 sm:pb-14 font-sans overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Redesigned Modern B2B Hero Box */}
        <div className="bg-[#F8F9FA] border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Factory Overview & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-syne font-normal uppercase tracking-widest text-[#0F172A]">
                  Ludhiana Direct Hosiery Mill • 240-420 GSM
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-gray-900 leading-[1.12]">
                  Direct Factory Apparel Manufacturing & Bulk Wholesale
                </h1>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl font-normal leading-relaxed">
                  Precision knitwear sourcing for fashion labels, retail chains, and private brands. Manufactured in Ludhiana with bio-washed combed cotton, 330+ GSM heavy fleece, and AQL 2.5 export standard quality.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-normal text-gray-700">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>MOQ 24 Pcs / Style</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>100% GST Tax Credit</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                  <PackageCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Doorstep PAN India</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => { setActiveTab('catalogue'); setSelectedCategory(null); }}
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs sm:text-sm font-syne font-normal uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 group active:scale-95"
                >
                  <span>Explore B2B Catalogue</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="https://wa.me/917528802003"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-emerald-600 text-white text-xs sm:text-sm font-syne font-normal uppercase tracking-widest px-5 py-3.5 rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Quote</span>
                </a>

                <button
                  onClick={() => setActiveModal('sample')}
                  className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs sm:text-sm font-syne font-normal uppercase tracking-wider px-5 py-3.5 rounded-xl transition cursor-pointer"
                >
                  Request Swatches
                </button>
              </div>

              {/* Manufacturing Capacity Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-gray-200 text-left">
                <div>
                  <div className="font-serif font-normal text-xl sm:text-2xl text-[#0F172A]">15,000+</div>
                  <div className="text-[11px] text-gray-500 font-normal">Daily Garment Output</div>
                </div>
                <div>
                  <div className="font-serif font-normal text-xl sm:text-2xl text-[#0F172A]">240-420</div>
                  <div className="text-[11px] text-gray-500 font-normal">GSM Heavy Knits</div>
                </div>
                <div>
                  <div className="font-serif font-normal text-xl sm:text-2xl text-[#0F172A]">500+</div>
                  <div className="text-[11px] text-gray-500 font-normal">Active Brand Clients</div>
                </div>
              </div>

            </div>

            {/* Right Column: High-End Fashion & Garment Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                
                {/* Primary Card */}
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white group">
                  <img 
                    src={HERO_IMAGE_PRIMARY} 
                    alt="Imperial Heavyweight Oversized Tee" 
                    className="w-full h-[340px] sm:h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Garment Tag */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-gray-200 shadow-md flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#C5A059] font-normal block uppercase">
                        FCC-TS-240
                      </span>
                      <h3 className="font-serif font-normal text-sm text-gray-900">
                        Heavyweight Oversized Tee
                      </h3>
                      <p className="text-[11px] text-gray-500 font-normal">
                        240 GSM • 100% Combed Cotton
                      </p>
                    </div>

                    <button
                      onClick={() => { setActiveTab('catalogue'); setSelectedCategory('T-Shirts'); }}
                      className="bg-[#0F172A] text-white p-2 rounded-lg hover:bg-[#C5A059] hover:text-[#0F172A] transition cursor-pointer"
                      title="View Category"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Secondary Floating Stock Badge */}
                <div className="hidden sm:flex absolute -top-3 -left-5 bg-white p-2.5 rounded-2xl shadow-lg border border-gray-200 items-center gap-3 max-w-xs">
                  <img 
                    src={HERO_IMAGE_SECONDARY} 
                    alt="330 GSM Fleece Hoodie" 
                    className="w-12 h-12 object-cover rounded-xl border border-gray-200"
                  />
                  <div className="text-left">
                    <span className="text-[9px] font-syne font-normal uppercase text-[#C5A059]">WHOLESALE STOCK</span>
                    <div className="text-xs font-normal text-gray-900 font-serif">330 GSM Fleece</div>
                    <div className="text-[10px] text-emerald-600 font-normal">Mill Ready Stock</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
