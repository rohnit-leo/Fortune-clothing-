import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Eye, Heart, Scale, ShoppingBag, Check, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setQuickViewProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare,
    addRecentlyViewed,
    setActiveTab
  } = useCart();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default size distribution e.g. M: 25, L: 50, XL: 25 (total 100 pcs = MOQ)
    const defaultSizes: Record<string, number> = {
      'M': Math.ceil(product.moq * 0.3),
      'L': Math.ceil(product.moq * 0.4),
      'XL': Math.ceil(product.moq * 0.3)
    };
    addToCart(product, product.availableColors[0], defaultSizes, 'Quick MOQ Order');
  };

  const handleCardClick = () => {
    addRecentlyViewed(product.id);
    setQuickViewProduct(product);
    setActiveTab('product-detail');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-[#0A152E] border border-white/10 hover:border-[#C5A059] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer"
    >
      
      {/* Top Image & Badges Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#050A1A]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A152E] via-transparent to-black/30 opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 font-mono">
          <span className="bg-[#050A1A]/90 backdrop-blur-md border border-white/10 text-[#C5A059] text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {product.gsm} GSM
          </span>
          <span className="bg-[#C5A059] text-[#050A1A] text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
            MOQ {product.moq} Pcs
          </span>
        </div>

        {/* Top Right Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`p-2 rounded-full backdrop-blur-md border transition ${
              isWishlisted 
                ? 'bg-rose-500 text-white border-rose-400' 
                : 'bg-[#050A1A]/70 text-slate-300 border-white/10 hover:text-rose-400'
            }`}
            title="Wishlist"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); toggleCompare(product.id); }}
            className={`p-2 rounded-full backdrop-blur-md border transition ${
              isCompared 
                ? 'bg-[#C5A059] text-[#050A1A] border-[#C5A059] font-bold' 
                : 'bg-[#050A1A]/70 text-slate-300 border-white/10 hover:text-[#C5A059]'
            }`}
            title="Compare"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hover Quick View Trigger Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
            className="w-full bg-[#121c33]/95 hover:bg-white text-white hover:text-[#050A1A] font-bold text-[10px] tracking-[0.15em] uppercase py-2.5 rounded-xl border border-white/20 flex items-center justify-center gap-2 shadow-2xl backdrop-blur-md cursor-pointer transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" /> Inspect Specifications
          </button>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono uppercase tracking-wider">
            <span>{product.code}</span>
            <span className="text-emerald-400 font-semibold">{product.dispatchDays} Dispatch</span>
          </div>

          <h3 className="font-serif font-bold text-base text-white group-hover:text-[#C5A059] transition line-clamp-1 mt-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#C5A059] font-semibold mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>

          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Color Swatches */}
        <div className="pt-3 border-t border-white/10 space-y-2.5">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider font-mono">
            <span>Colors ({product.availableColors.length}):</span>
            <div className="flex items-center gap-1">
              {product.availableColors.slice(0, 4).map((col, idx) => (
                <span
                  key={idx}
                  className="w-3 h-3 rounded-full border border-white/20 inline-block shadow-inner"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.availableColors.length > 4 && (
                <span className="text-[9px] text-slate-500 font-bold">+{product.availableColors.length - 4}</span>
              )}
            </div>
          </div>

          {/* Quick Add B2B Cart Button */}
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#C5A059] hover:bg-white text-[#050A1A] font-bold text-[10px] tracking-[0.2em] uppercase py-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add MOQ ({product.moq} Pcs) To Cart
          </button>
        </div>

      </div>

    </div>
  );
};
