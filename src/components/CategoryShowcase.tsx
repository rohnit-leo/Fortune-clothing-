import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useCart();

  const categories = [
    {
      name: 'T-Shirts',
      subtitle: '180 GSM to 280 GSM Heavyweight Compact Cotton',
      moq: 'MOQ 100 Pcs',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      tag: 'Oversized & Streetwear',
      description: 'Super combed bio-washed tees, drop shoulder cuts, and customizable necklines.'
    },
    {
      name: 'Sweatshirts',
      subtitle: '300 GSM to 360 GSM Loopknit & Fleece',
      moq: 'MOQ 100 Pcs',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
      tag: 'Executive Winter Line',
      description: 'Soft brushed fleece lining engineered for precision high-density embroidery.'
    },
    {
      name: 'Hoodies',
      subtitle: '330 GSM to 400 GSM French Terry',
      moq: 'MOQ 100 Pcs',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      tag: 'Heavyweight Pullovers',
      description: 'Double-walled hood shells, thick cotton drawstrings, and kangaroo pouch.'
    },
    {
      name: 'Jackets',
      subtitle: 'Water-Repellent Puffer & Windbreakers',
      moq: 'MOQ 150 Pcs',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      tag: 'All-Weather Outerwear',
      description: 'Insulated down alternatives, SBS heavy zippers, and storm flap security.'
    },
    {
      name: 'Lowers',
      subtitle: '220 GSM to 260 GSM Daily Wear Cotton',
      moq: 'MOQ 150 Pcs',
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80',
      tag: 'Breathable Casuals',
      description: 'Soft cotton jersey lowers designed for daily lounge and nightwear sales.'
    },
    {
      name: 'Joggers',
      subtitle: '280 GSM to 320 GSM Tech Stretch Fleece',
      moq: 'MOQ 100 Pcs',
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
      tag: 'Athleisure & Gymwear',
      description: 'Ergonomic tapered leg cuts, concealed zip security pockets, and Lycra ribs.'
    },
    {
      name: 'Tracksuits',
      subtitle: 'Matching 2-Piece Active Sets',
      moq: 'MOQ 100 Pcs',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      tag: 'Performance Sportswear',
      description: 'Moisture wicking poly-spandex blends built for sports academies and teams.'
    },
    {
      name: 'Winter Wear',
      subtitle: '400+ GSM Ludhiana Heritage Fleece',
      moq: 'MOQ 100 Pcs',
      image: 'https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&w=800&q=80',
      tag: 'Thermal Protection',
      description: 'Heavy thermal retention sets crafted directly in India’s hosiery capital.'
    }
  ];

  const handleSelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#070E22] text-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
              <Layers className="w-3.5 h-3.5" /> B2B Wholesale Catalogue
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
              Core Manufacturing Lines
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
              Factory-direct wholesale apparel engineered to international quality standards. Select any category to view full GSM & size matrices.
            </p>
          </div>

          <button
            onClick={() => { setSelectedCategory(null); setActiveTab('catalogue'); }}
            className="text-xs font-bold text-[#D4AF37] hover:text-amber-300 transition flex items-center gap-1 uppercase tracking-wider underline cursor-pointer"
          >
            View All Products & GSM Specifications →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(cat.name)}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-[#D4AF37] transition-all duration-300 bg-[#0B142B] cursor-pointer shadow-xl flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B142B] via-transparent to-black/30" />
                
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {cat.moq}
                </span>

                <span className="absolute top-3 right-3 bg-amber-500/90 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md">
                  {cat.tag}
                </span>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-white group-hover:text-amber-200 transition">
                      {cat.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-[#D4AF37] group-hover:text-slate-950 text-slate-300 flex items-center justify-center transition">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-[#D4AF37] mt-1">{cat.subtitle}</p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{cat.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Customization Supported</span>
                  <span className="text-emerald-400 font-semibold">In-Stock Raw Fabric</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
