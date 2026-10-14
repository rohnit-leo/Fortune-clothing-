import React from 'react';
import { useCart } from '../context/CartContext';
import { Phone } from 'lucide-react';

export const FloatingCtaMenu: React.FC = () => {
  const { siteConfig } = useCart();

  const rawPhone = siteConfig.phone || '+91 75288 02003';
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
  const whatsappNumber = siteConfig.whatsappNumber?.replace(/[^0-9]/g, '') || '917528802003';

  return (
    <aside aria-label="Quick Contact Actions" className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 sm:px-6 py-2.5 sm:py-3 shadow-lg select-none">
      <div className="max-w-md sm:max-w-xl mx-auto flex items-center justify-between gap-3">
        
        {/* 1. CALL NOW BUTTON (Dark Navy / Black as shown in Reference Image) */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 bg-[#111827] hover:bg-black text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
        >
          <Phone className="w-4 h-4 text-white" />
          <span>CALL NOW</span>
        </a>

        {/* 2. WHATSAPP US BUTTON (Vibrant Green as shown in Reference Image) */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Fortune Clothing Company, I want to discuss wholesale orders & pricing from your Ludhiana factory.")}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-[#22C55E] hover:bg-[#16a34a] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
        >
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.54 1.769.88 2.8.88 3.179 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.771-5.766zm3.393 8.307c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.072-.493-1.638-.675-2.678-2.339-2.758-2.447-.079-.108-.66-88-.66-1.678 0-.797.412-1.192.56-1.353.148-.161.323-.202.43-.202.107 0 .215.002.309.007.098.005.231-.038.36.273.133.322.457 1.114.497 1.196.041.082.068.178.014.286-.054.108-.082.176-.162.27-.081.096-.17.214-.243.287-.081.082-.166.171-.071.334.095.163.423.698.908 1.129.624.555 1.149.728 1.312.809.163.081.258.072.355-.039.096-.111.412-.48.522-.645.11-.164.22-.138.371-.082.152.055.962.454 1.127.536.165.082.275.123.315.191.041.069.041.401-.103.806z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.445 5.174L2 22l4.981-1.306C8.423 21.524 10.151 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.673 0-3.238-.475-4.571-1.298l-.328-.2-2.969.778.792-2.894-.214-.341C3.844 14.887 3.8 13.486 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.522 0 8.2 3.679 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z"/>
          </svg>
          <span>WHATSAPP US</span>
        </a>

      </div>
    </aside>
  );
};
