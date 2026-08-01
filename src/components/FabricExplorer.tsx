import React from 'react';
import { useCart } from '../context/CartContext';
import { REAL_PRODUCT_IMAGES } from '../data/products';
import { Layers } from 'lucide-react';

export const FabricExplorer: React.FC = () => {
  const { setActiveModal } = useCart();

  const FABRICS = [
    {
      name: '240 GSM Super Combed Cotton',
      type: '100% Cotton Single Jersey',
      texture: 'Silky smooth handfeel with structure',
      bestFor: 'Heavyweight Oversized T-Shirts & Streetwear',
      image: REAL_PRODUCT_IMAGES[0]
    },
    {
      name: '330 GSM Brushed Fleece',
      type: '80% Cotton / 20% Poly Soft Fleece',
      texture: 'Plush interior thermal insulation',
      bestFor: 'Premium Crewneck Sweatshirts & Hoodies',
      image: REAL_PRODUCT_IMAGES[3]
    },
    {
      name: '380 GSM Heavy French Terry',
      type: '100% Combed Loopback Terry',
      texture: 'Heavy structured loopback back',
      bestFor: 'Luxury Drop-Shoulder Hoodies & Joggers',
      image: REAL_PRODUCT_IMAGES[6]
    },
    {
      name: '230 GSM Matty Pique',
      type: '100% Cotton Honeycomb Knit',
      texture: 'Breathable geometric mesh feel',
      bestFor: 'Corporate & Executive Polo T-Shirts',
      image: REAL_PRODUCT_IMAGES[2]
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-200 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059] mb-1">
              <Layers className="w-4 h-4 text-[#C5A059]" /> Mill Direct Fabrics
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
              Ludhiana Textile Mill Swatches
            </h2>
          </div>

          <button
            onClick={() => setActiveModal('sample')}
            className="bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-syne font-normal uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition cursor-pointer self-start md:self-auto"
          >
            Order Physical Swatches
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {FABRICS.map((f, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 p-3.5 sm:p-4 rounded-2xl space-y-2.5 shadow-2xs hover:shadow-md transition">
              <img src={f.image} alt={f.name} className="w-full h-32 sm:h-36 object-cover rounded-xl border border-gray-200 bg-white" />
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-normal text-[#C5A059] uppercase">{f.type}</span>
                <h3 className="font-serif font-normal text-xs sm:text-sm text-gray-900">{f.name}</h3>
                <p className="text-[11px] text-gray-600 font-normal">{f.texture}</p>
                <p className="text-[10px] text-gray-500 pt-1 font-normal">Best for: {f.bestFor}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
