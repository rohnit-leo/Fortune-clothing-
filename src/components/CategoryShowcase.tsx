import React from 'react';
import { useCart } from '../context/CartContext';
import { REAL_PRODUCT_IMAGES } from '../data/products';
import { ArrowRight, ChevronRight, Layers } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useCart();

  const CATEGORIES_DATA = [
    {
      title: 'T-Shirts',
      subtitle: '200 - 240 GSM',
      count: '150+ Designs',
      image: REAL_PRODUCT_IMAGES[0],
      categoryKey: 'T-Shirts'
    },
    {
      title: 'Oversized Tees',
      subtitle: '240 GSM Streetwear',
      count: '90+ Designs',
      image: REAL_PRODUCT_IMAGES[1],
      categoryKey: 'T-Shirts'
    },
    {
      title: 'Polo T-Shirts',
      subtitle: '230 GSM Matty Pique',
      count: '60+ Designs',
      image: REAL_PRODUCT_IMAGES[2],
      categoryKey: 'T-Shirts'
    },
    {
      title: 'Sweatshirts',
      subtitle: '330 GSM Loopknit',
      count: '80+ Designs',
      image: REAL_PRODUCT_IMAGES[3],
      categoryKey: 'Sweatshirts'
    },
    {
      title: 'Hoodies',
      subtitle: '380 GSM French Terry',
      count: '110+ Designs',
      image: REAL_PRODUCT_IMAGES[6],
      categoryKey: 'Hoodies'
    },
    {
      title: 'Tracksuits',
      subtitle: '280 GSM Poly Interlock',
      count: '45+ Sets',
      image: REAL_PRODUCT_IMAGES[2],
      categoryKey: 'Tracksuits'
    },
    {
      title: 'Lowers',
      subtitle: '240 GSM Jersey',
      count: '70+ Designs',
      image: REAL_PRODUCT_IMAGES[4],
      categoryKey: 'Lowers'
    },
    {
      title: 'Joggers',
      subtitle: '290 GSM Lycra Stretch',
      count: '85+ Designs',
      image: REAL_PRODUCT_IMAGES[1],
      categoryKey: 'Joggers'
    },
    {
      title: 'Jackets',
      subtitle: 'Puffer & Windcheaters',
      count: '55+ Designs',
      image: REAL_PRODUCT_IMAGES[7],
      categoryKey: 'Jackets'
    },
    {
      title: 'Winter Wear',
      subtitle: '420 GSM Thermal Wool',
      count: '95+ Designs',
      image: REAL_PRODUCT_IMAGES[8],
      categoryKey: 'Winter Wear'
    },
    {
      title: 'Manufacturing',
      subtitle: 'Bulk Dyeing & Cuts',
      count: 'Tech Pack OEM',
      image: REAL_PRODUCT_IMAGES[5],
      tabKey: 'factory'
    },
    {
      title: 'Private Label',
      subtitle: 'Tags & Packaging',
      count: 'Full Branding',
      image: REAL_PRODUCT_IMAGES[0],
      tabKey: 'privatelabel'
    }
  ];

  return (
    <section className="py-10 bg-white border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059] mb-1">
              <Layers className="w-3.5 h-3.5 text-[#C5A059]" /> B2B Category Navigation
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
              Browse Wholesale Garment Categories
            </h2>
          </div>

          <button
            onClick={() => { setActiveTab('catalogue'); setSelectedCategory(null); }}
            className="hidden sm:flex items-center gap-1.5 text-xs font-syne font-normal uppercase tracking-wider text-[#0F172A] hover:text-[#C5A059] transition cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

        {/* 2 Columns on Mobile, 3 on SM, 4 on MD, 6 on LG */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 pt-1">
          {CATEGORIES_DATA.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (item.tabKey) {
                  setActiveTab(item.tabKey as any);
                } else {
                  setSelectedCategory(item.categoryKey as any);
                  setActiveTab('catalogue');
                }
              }}
              className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#0F172A] p-2.5 sm:p-3 rounded-2xl shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer group text-center flex flex-col justify-between"
            >
              <div>
                <div className="relative h-28 sm:h-36 w-full rounded-xl overflow-hidden mb-2.5 bg-gray-200">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-2">
                    <span className="text-[10px] font-syne font-normal uppercase tracking-wider text-white bg-[#0F172A]/90 px-2.5 py-1 rounded-full flex items-center gap-1">
                      Explore <ChevronRight className="w-3 h-3 text-[#C5A059]" />
                    </span>
                  </div>
                </div>

                <h3 className="font-serif font-normal text-xs sm:text-sm text-gray-900 group-hover:text-[#0F172A] truncate">
                  {item.title}
                </h3>
                <p className="text-[10px] text-gray-500 font-normal truncate mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-2 inline-block bg-white group-hover:bg-[#0F172A] group-hover:text-white border border-gray-200 text-gray-700 text-[9px] font-mono font-normal px-2 py-0.5 rounded-full transition">
                {item.count}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
