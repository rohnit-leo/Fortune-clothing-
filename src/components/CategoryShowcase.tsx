import React from 'react';
import { useCart } from '../context/CartContext';
import { REAL_PRODUCT_IMAGES } from '../data/products';
import { ArrowRight, ChevronRight, Layers } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory, setActiveTab, categories, products } = useCart();

  // Combine dynamic categories with product count
  const dynamicCategories = categories.map((cat, idx) => {
    const productCount = products.filter(p => p.category === cat.name).length;
    const catImage = cat.image || products.find(p => p.category === cat.name)?.images[0] || REAL_PRODUCT_IMAGES[idx % REAL_PRODUCT_IMAGES.length];
    return {
      title: cat.name,
      subtitle: cat.description ? `${cat.description.slice(0, 32)}...` : 'Direct Factory Wholesale',
      count: `${productCount} Models`,
      image: catImage,
      categoryKey: cat.name
    };
  });

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
            <span>View All Products ({products.length})</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

        {/* 2 Columns on Mobile, 3 on SM, 4 on MD, 6 on LG */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 pt-1">
          {dynamicCategories.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedCategory(item.categoryKey as any);
                setActiveTab('catalogue');
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
