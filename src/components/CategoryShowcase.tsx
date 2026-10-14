import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory, setActiveTab, categories } = useCart();

  // Reference order and fallback mapping
  const REFERENCE_CATEGORIES = [
    { name: 'T-SHIRTS', image: '/src/assets/images/cat_tshirts_1791987514882.jpg' },
    { name: 'OVERSIZED', image: '/src/assets/images/cat_oversized_1791987535237.jpg' },
    { name: 'POLOS', image: '/src/assets/images/cat_polos_1791987559351.jpg' },
    { name: 'SWEATSHIRTS', image: '/src/assets/images/cat_sweatshirts_1791987585313.jpg' },
    { name: 'HOODIES', image: '/src/assets/images/cat_hoodies_1791987612418.jpg' },
    { name: 'TRACKSUITS', image: '/src/assets/images/cat_tracksuits_1791987639180.jpg' },
    { name: 'TRACK PANTS', image: '/src/assets/images/cat_trackpants_1791987671341.jpg' },
    { name: 'JACKETS', image: '/src/assets/images/cat_jackets_1791987704485.jpg' },
  ];

  // Merge live categories from Firestore with fallback images
  const displayCategories = categories.length >= 8 
    ? categories 
    : REFERENCE_CATEGORIES.map((ref, idx) => {
        const found = categories.find(c => c.name.toUpperCase() === ref.name);
        return found || {
          id: `ref-cat-${idx}`,
          name: ref.name,
          slug: ref.name.toLowerCase().replace(/\s+/g, '-'),
          description: 'Factory direct wholesale',
          image: ref.image,
          displayOrder: idx + 1
        };
      });

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setActiveTab('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-12 bg-white font-sans border-b border-gray-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-bold uppercase tracking-wider text-gray-900">
            SHOP BY CATEGORY
          </h2>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setActiveTab('catalogue');
            }}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#C89B3C] transition cursor-pointer"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8 Categories Grid: 4 columns across on mobile, 4 or 8 on desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6 pt-1">
          {displayCategories.slice(0, 8).map((cat) => {
            const fallback = REFERENCE_CATEGORIES.find(r => r.name === cat.name.toUpperCase())?.image;
            const finalImage = cat.image || fallback || '/src/assets/images/cat_tshirts_1791987514882.jpg';

            return (
              <div
                key={cat.id || cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="flex flex-col items-center group cursor-pointer text-center"
              >
                {/* Circular Image Container */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#F3F4F6] p-1.5 sm:p-2.5 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-2xs group-hover:shadow-sm border border-gray-100">
                  <img
                    src={finalImage}
                    alt={cat.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Category Label */}
                <span className="text-[10px] sm:text-xs font-bold text-gray-800 uppercase tracking-wider mt-2 group-hover:text-[#C89B3C] transition-colors leading-tight">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
