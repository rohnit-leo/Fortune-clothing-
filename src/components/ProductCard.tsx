import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { 
  Heart, 
  Eye, 
  Scale, 
  ShoppingBag, 
  MessageCircle, 
  Check 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    setQuickViewProduct, 
    setActiveTab,
    toggleWishlist, 
    isInWishlist,
    toggleCompare,
    isInCompare
  } = useCart();

  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const mainImage = selectedColor.image || product.images[currentImageIndex] || product.images[0];
  const secondImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Default quick size run totaling 24 Pcs (S:4, M:8, L:8, XL:4)
    const defaultSizes: Record<string, number> = {
      'S': 4,
      'M': 8,
      'L': 8,
      'XL': 4
    };

    addToCart(product, selectedColor, defaultSizes);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
    setActiveTab('product-detail');
  };

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  return (
    <div 
      onClick={handleQuickView}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border border-gray-200 hover:border-[#0F172A] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
    >
      
      {/* Top Media Thumbnail Container */}
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
        
        {/* Main Product Image with Second Image Hover Swap */}
        <img 
          src={isHovered && secondImage ? secondImage : mainImage} 
          alt={product.name} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10">
          <span className="bg-[#0F172A] text-white text-[8px] sm:text-[9px] font-syne font-normal uppercase px-1.5 sm:px-2 py-0.5 rounded shadow-xs tracking-wider">
            {product.gsm} GSM
          </span>
          <span className="bg-[#C5A059] text-[#0F172A] text-[8px] sm:text-[9px] font-syne font-normal uppercase px-1.5 sm:px-2 py-0.5 rounded shadow-xs tracking-wider">
            MOQ {product.moq} Pcs
          </span>
        </div>

        {/* Top Right Quick Action Buttons */}
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 flex flex-col gap-1.5 z-10">
          
          {/* Wishlist Heart */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors shadow-md cursor-pointer ${
              inWishlist ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white hover:text-rose-500'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors shadow-md cursor-pointer ${
              inCompare ? 'bg-[#0F172A] text-white' : 'bg-white/90 text-gray-700 hover:bg-white hover:text-[#0F172A]'
            }`}
            title="Compare Garment Specs"
          >
            <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <div className="hidden sm:block absolute bottom-3 left-3 right-3 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
          <button
            onClick={handleQuickView}
            className="w-full bg-white/95 hover:bg-white text-gray-900 text-[10px] font-syne font-normal uppercase tracking-wider py-2 px-3 rounded-xl shadow-lg border border-gray-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#0F172A]" />
            Quick Inspect Specs
          </button>
        </div>

      </div>

      {/* Product Information Body */}
      <div className="p-3 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-white">
        
        <div>
          {/* Code & Category Tag */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-500 mb-1 font-mono">
            <span className="font-normal text-[#C5A059] uppercase">{product.code}</span>
            <span className="bg-gray-100 px-1.5 py-0.5 rounded font-sans text-gray-600 font-normal">{product.category}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif font-normal text-xs sm:text-sm text-gray-900 line-clamp-1 group-hover:text-[#0F172A] transition">
            {product.name}
          </h3>

          {/* Fabric Description */}
          <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-normal">
            {product.fabric}
          </p>

          {/* Color Swatches */}
          <div className="flex items-center gap-1 mt-2.5 pt-1.5 border-t border-gray-100 overflow-x-auto no-scrollbar">
            <span className="text-[9px] text-gray-400 font-normal shrink-0 mr-0.5">Colors:</span>
            {product.availableColors.map((color, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border transition-all shrink-0 cursor-pointer ${
                  selectedColor.name === color.name 
                    ? 'ring-2 ring-[#0F172A] ring-offset-1 scale-110 border-white' 
                    : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          {/* Available Sizes preview chips */}
          <div className="flex flex-wrap gap-1 mt-2">
            {product.availableSizes.map((sz) => (
              <span key={sz} className="text-[8px] sm:text-[9px] font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-normal">
                {sz}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 border-t border-gray-100 space-y-2">
          
          <div className="flex items-center justify-between text-[9px] sm:text-xs">
            <span className="text-[9px] font-syne font-normal uppercase text-gray-500">
              {product.dispatchDays}
            </span>
            <span className="text-[9px] font-normal text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              Mill Stock
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            
            {/* Quick Add To Cart */}
            <button
              onClick={handleQuickAdd}
              className={`py-1.5 sm:py-2 px-1.5 rounded-xl text-[9px] sm:text-[10px] font-syne font-normal uppercase tracking-wider flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs active:scale-95 ${
                addedAnimation 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#0F172A] hover:bg-[#1E293B] text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A059]" />
                  <span>Add</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Enquiry */}
            <a
              href={`https://wa.me/917528802003?text=Hi%20Fortune%20Clothing,%20I%20am%20interested%20in%20ordering%20wholesale%20for:${encodeURIComponent(product.name)}%20(Code:%20${product.code}).`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-1.5 sm:py-2 px-1.5 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-[9px] sm:text-[10px] font-syne font-normal uppercase tracking-wider flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs active:scale-95"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span>Quote</span>
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};
