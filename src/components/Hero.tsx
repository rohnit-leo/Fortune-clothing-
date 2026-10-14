import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Truck
} from 'lucide-react';
import { resolveImageUrl, handleImageError, DEFAULT_HERO_IMAGE } from '../utils/imageUrl';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedCategory, siteConfig } = useCart();

  const HERO_IMAGE = resolveImageUrl(siteConfig.heroImage, DEFAULT_HERO_IMAGE);
  const whatsappNumber = siteConfig.whatsappNumber?.replace(/[^0-9]/g, '') || '917528802003';

  return (
    <section className="relative bg-[#111317] text-white overflow-hidden font-sans select-none">
      
      {/* Background Graphic & Texture Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE} 
          alt="Fortune Clothing Company Ludhiana Factory Menswear Collection" 
          onError={(e) => handleImageError(e, DEFAULT_HERO_IMAGE)}
          className="w-full h-full object-cover object-center lg:object-right opacity-35 lg:opacity-75"
        />
        {/* Responsive gradient overlay ensuring high legibility on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111317] via-[#111317]/90 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent lg:hidden" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="max-w-2xl space-y-5 sm:space-y-6">
          
          {/* Badge: LATEST MEN'S COLLECTION */}
          <div>
            <span className="inline-block bg-[#C89B3C] text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-sm">
              {siteConfig.heroBadge || "LATEST MEN'S COLLECTION"}
            </span>
          </div>

          {/* Headline: DIRECT FROM LUDHIANA */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white">
              DIRECT FROM
              <span className="block text-[#C89B3C] tracking-tight">
                LUDHIANA
              </span>
            </h1>
            <p className="text-base sm:text-xl font-medium text-gray-200 pt-2 tracking-wide">
              {siteConfig.heroSubheadline || "Manufacturer of Premium Men's Garments"}
            </p>
          </div>

          {/* 3 Gold Feature Pillars from Reference Image */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
            
            {/* Feature 1: Low MOQ */}
            <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2 sm:p-2.5 rounded-xl backdrop-blur-xs">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#C89B3C] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white">
                  LOW MOQ
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-300 font-medium leading-tight">
                  24 PCS / STYLE
                </span>
              </div>
            </div>

            {/* Feature 2: GST Invoice */}
            <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2 sm:p-2.5 rounded-xl backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#C89B3C] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white">
                  GST INVOICE
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-300 font-medium leading-tight">
                  100% TAX CREDIT
                </span>
              </div>
            </div>

            {/* Feature 3: Pan India Delivery */}
            <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2 sm:p-2.5 rounded-xl backdrop-blur-xs">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#C89B3C] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white">
                  PAN INDIA
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-300 font-medium leading-tight">
                  DOORSTEP DELIVERY
                </span>
              </div>
            </div>

          </div>

          {/* 2 Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            
            {/* VIEW COLLECTION Button */}
            <button
              onClick={() => {
                setActiveTab('catalogue');
                setSelectedCategory(null);
              }}
              className="bg-[#C89B3C] hover:bg-[#b58930] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>VIEW COLLECTION</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* WHATSAPP NOW Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Fortune Clothing Company, I saw your DIRECT FROM LUDHIANA wholesale collection and want to see the latest catalog & pricing.")}`}
              target="_blank"
              rel="noreferrer"
              className="bg-black/50 hover:bg-black/80 text-white border border-white/60 font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-3.5 rounded-lg transition-all flex items-center gap-2 active:scale-95"
            >
              <svg className="w-4 h-4 fill-current text-[#25D366]" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.54 1.769.88 2.8.88 3.179 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.771-5.766zm3.393 8.307c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.072-.493-1.638-.675-2.678-2.339-2.758-2.447-.079-.108-.66-88-.66-1.678 0-.797.412-1.192.56-1.353.148-.161.323-.202.43-.202.107 0 .215.002.309.007.098.005.231-.038.36.273.133.322.457 1.114.497 1.196.041.082.068.178.014.286-.054.108-.082.176-.162.27-.081.096-.17.214-.243.287-.081.082-.166.171-.071.334.095.163.423.698.908 1.129.624.555 1.149.728 1.312.809.163.081.258.072.355-.039.096-.111.412-.48.522-.645.11-.164.22-.138.371-.082.152.055.962.454 1.127.536.165.082.275.123.315.191.041.069.041.401-.103.806z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.445 5.174L2 22l4.981-1.306C8.423 21.524 10.151 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.673 0-3.238-.475-4.571-1.298l-.328-.2-2.969.778.792-2.894-.214-.341C3.844 14.887 3.8 13.486 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.522 0 8.2 3.679 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z"/>
              </svg>
              <span>WHATSAPP NOW</span>
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};
