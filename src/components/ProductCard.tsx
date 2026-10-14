import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    setQuickViewProduct, 
    setActiveTab,
    toggleWishlist, 
    isInWishlist
  } = useCart();

  const colors = product.availableColors && product.availableColors.length > 0
    ? product.availableColors
    : [
        { name: 'Dark Charcoal', hex: '#374151' },
        { name: 'Beige Tan', hex: '#D2C3B2' },
        { name: 'Pitch Black', hex: '#111827' },
        { name: 'Forest Olive', hex: '#2C3B2D' }
      ];

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['/src/assets/images/cat_tshirts_1791987514882.jpg'];

  const currentColor = colors[selectedColorIndex];
  const displayImage = currentColor?.image || images[0];

  const inWishlist = isInWishlist(product.id);

  const handleOpenDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  // Determine specs line
  const specsLine = product.subtitle || `${product.gsm} GSM • ${product.fabric || '100% Cotton'}`;

  // Sizes format
  const sizeRange = product.availableSizes && product.availableSizes.length > 0
    ? `${product.availableSizes[0]} - ${product.availableSizes[product.availableSizes.length - 1]}`
    : 'M - XXL';

  return (
    <div 
      onClick={handleOpenDetail}
      className="bg-white flex flex-col justify-between group cursor-pointer font-sans select-none"
    >
      {/* 1. PRODUCT PHOTO WITH FLOATING WISHLIST HEART */}
      <div className="relative aspect-square sm:aspect-[4/5] bg-[#F4F4F6] rounded-xl overflow-hidden p-3 flex items-center justify-center">
        
        <img 
          src={displayImage} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Floating Heart Wishlist Icon Top-Right */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Save to Wishlist"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 flex items-center justify-center shadow-xs transition backdrop-blur-xs cursor-pointer z-10"
        >
          <Heart 
            className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            strokeWidth={1.8}
          />
        </button>

      </div>

      {/* 2. COLOR SWATCHES ROW */}
      <div className="flex items-center gap-1.5 pt-3 pb-1">
        {colors.slice(0, 5).map((color, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedColorIndex(idx);
            }}
            title={color.name}
            className={`w-3.5 h-3.5 rounded-full border transition-all ${
              selectedColorIndex === idx 
                ? 'ring-2 ring-offset-1 ring-gray-900 border-white scale-110' 
                : 'border-gray-300 hover:scale-105'
            }`}
            style={{ backgroundColor: color.hex || '#111827' }}
          />
        ))}
      </div>

      {/* 3. PRODUCT INFO */}
      <div className="space-y-1 pt-0.5">
        
        {/* Title */}
        <h3 className="font-bold text-xs sm:text-sm text-gray-900 uppercase tracking-wide group-hover:text-[#C89B3C] transition-colors truncate">
          {product.name}
        </h3>

        {/* Specs: 240 GSM • 100% Cotton */}
        <p className="text-[11px] sm:text-xs text-gray-500 font-medium truncate">
          {specsLine}
        </p>

        {/* Size Range: M - XXL */}
        <p className="text-[10px] sm:text-[11px] text-gray-400 font-semibold uppercase">
          {sizeRange}
        </p>

        {/* MOQ Badge */}
        <div className="pt-0.5">
          <span className="inline-block bg-gray-100 border border-gray-200 text-gray-700 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
            MOQ {product.moq || 24} PCS
          </span>
        </div>

      </div>

      {/* 4. SOLID DARK CTA BUTTON */}
      <div className="pt-3">
        <button
          onClick={handleOpenDetail}
          className="w-full bg-[#111827] hover:bg-black text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider py-2.5 sm:py-3 rounded-lg shadow-2xs transition active:scale-95 cursor-pointer flex items-center justify-center"
        >
          VIEW WHOLESALE PRICE
        </button>
      </div>

    </div>
  );
};
