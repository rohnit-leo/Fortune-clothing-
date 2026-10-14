import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Heart, 
  Scale, 
  ChevronDown
} from 'lucide-react';
import { resolveImageUrl, handleImageError, DEFAULT_PRODUCT_IMAGE } from '../utils/imageUrl';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const { addToCart, setIsCartOpen, toggleWishlist, isInWishlist, toggleCompare, isInCompare, products } = useCart();

  const [selectedColor, setSelectedColor] = useState(
    product.availableColors?.[0] || { name: 'Default', hex: '#000000', image: product.images?.[0] || DEFAULT_PRODUCT_IMAGE }
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Size run quantities matrix state
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    (product.availableSizes || ['S', 'M', 'L', 'XL', '2XL']).forEach((sz, idx) => {
      // Default initial size breakdown totaling 24 pcs (12 M, 12 L)
      initial[sz] = idx === 1 ? 12 : idx === 2 ? 12 : 0;
    });
    return initial;
  });

  const [customizationOptions, setCustomizationOptions] = useState<{
    wovenLabel: boolean;
    hangtag: boolean;
    customPolybag: boolean;
    puffPrint: boolean;
  }>({
    wovenLabel: true,
    hangtag: true,
    customPolybag: false,
    puffPrint: false
  });

  const [customNotes, setCustomNotes] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const rawImage = selectedColor?.image || product.images?.[activeImageIndex] || product.images?.[0] || DEFAULT_PRODUCT_IMAGE;
  const currentImage = resolveImageUrl(rawImage, DEFAULT_PRODUCT_IMAGE);

  const totalQuantity = (Object.values(sizeQuantities) as number[]).reduce((acc: number, curr: number) => acc + (curr || 0), 0);
  const isUnderMoq = totalQuantity < (product.moq || 24);

  const handleSizeChange = (size: string, value: number) => {
    setSizeQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, value)
    }));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, sizeQuantities, customNotes);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setIsCartOpen(true);
    }, 1000);
  };

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  // Related products from same category
  const allProducts = products.length > 0 ? products : PRODUCTS;
  const relatedProducts = allProducts.filter(p => p.id !== product.id && p.category === product.category).concat(
    allProducts.filter(p => p.id !== product.id && p.category !== product.category)
  ).slice(0, 4);

  return (
    <div className="bg-white text-gray-900 font-sans min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-syne font-normal uppercase tracking-wider text-gray-700 hover:text-[#0F172A] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
            <span>Back to Catalogue</span>
          </button>

          <div className="flex items-center gap-3 text-xs text-gray-500 font-normal">
            <span>Code: <strong className="text-[#C5A059] font-mono font-normal">{product.code}</strong></span>
            <span>•</span>
            <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-[10px] font-normal">{product.category}</span>
          </div>
        </div>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Gallery (7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image Display */}
            <div className="relative aspect-[4/5] rounded-3xl bg-gray-100 overflow-hidden border border-gray-200 shadow-md group">
              <img 
                src={currentImage} 
                alt={product.name} 
                onError={(e) => handleImageError(e, DEFAULT_PRODUCT_IMAGE)}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#0F172A] text-white text-xs font-syne font-normal uppercase px-3 py-1 rounded-lg shadow-md tracking-wider">
                  {product.gsm} GSM Knitted
                </span>
                <span className="bg-[#C5A059] text-[#0F172A] text-xs font-syne font-normal uppercase px-3 py-1 rounded-lg shadow-md tracking-wider">
                  MOQ {product.moq} Pcs
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-full transition shadow-md cursor-pointer ${
                    inWishlist ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => toggleCompare(product)}
                  className={`p-3 rounded-full transition shadow-md cursor-pointer ${
                    inCompare ? 'bg-[#0F172A] text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
                  }`}
                  title="Compare"
                >
                  <Scale className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Carousel Slider */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {(product.images || []).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx ? 'border-[#0F172A] scale-105 shadow-md' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img 
                    src={resolveImageUrl(img, DEFAULT_PRODUCT_IMAGE)} 
                    alt="" 
                    onError={(e) => handleImageError(e, DEFAULT_PRODUCT_IMAGE)}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>

            {/* Wholesale Guarantees Row */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-center">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                <div className="text-[11px] font-normal text-gray-900 font-syne uppercase">AQL 2.5 Audit</div>
                <div className="text-[10px] text-gray-500">Zero Defect Guarantee</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <Truck className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                <div className="text-[11px] font-normal text-gray-900 font-syne uppercase">Dispatch {product.dispatchDays}</div>
                <div className="text-[10px] text-gray-500">Ludhiana Mill Gate</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <FileText className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                <div className="text-[11px] font-normal text-gray-900 font-syne uppercase">GST Compliant</div>
                <div className="text-[10px] text-gray-500">Full Input Credit</div>
              </div>
            </div>

          </div>

          {/* Right Product Purchase Matrix (5 columns) */}
          <div className="lg:col-span-5 space-y-6 bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
            
            {/* Title & Core Subtitle */}
            <div>
              <div className="text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059] mb-1">
                Ludhiana Direct Wholesale Garment
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
                {product.name}
              </h1>
              <p className="text-xs text-gray-600 mt-1 font-normal">
                {product.subtitle}
              </p>
            </div>

            {/* Wholesale Tier Pricing Preview Box */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2">
              <div className="text-[10px] font-syne font-normal uppercase tracking-widest text-gray-500">
                B2B Volume Tier Structure
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {product.wholesaleTiers.map((tier, idx) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <div className="font-normal text-[#0F172A] text-[11px] font-mono">{tier.minQty} - {tier.maxQty} Pcs</div>
                    <div className="text-[10px] font-syne text-[#C5A059] font-normal mt-0.5">{tier.discountPct}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Swatch Selection */}
            <div className="space-y-2">
              <label className="text-xs font-syne font-normal uppercase text-gray-800 flex items-center justify-between">
                <span>Select Colorway: <span className="text-[#C5A059] font-normal">{selectedColor.name}</span></span>
                <span className="text-[10px] text-gray-500 font-normal">{product.availableColors.length} Mill Colors Available</span>
              </label>

              <div className="flex flex-wrap gap-2">
                {product.availableColors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-normal transition cursor-pointer ${
                      selectedColor.name === color.name
                        ? 'border-[#0F172A] bg-white text-[#0F172A] shadow-sm font-normal ring-2 ring-[#0F172A]/20'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: color.hex }} />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Breakdown Run Input Matrix */}
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-syne font-normal uppercase text-gray-900">
                  Size Quantity Run Breakdown
                </span>
                <button
                  onClick={() => {
                    const reset: Record<string, number> = {};
                    product.availableSizes.forEach(s => reset[s] = 4);
                    setSizeQuantities(reset);
                  }}
                  className="text-[10px] text-[#C5A059] hover:underline font-normal uppercase"
                >
                  Set 4 Pcs / Size
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.availableSizes.map((sz) => (
                  <div key={sz} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-2 rounded-xl">
                    <span className="font-mono font-normal text-xs text-gray-800">{sz}:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSizeChange(sz, (sizeQuantities[sz] || 0) - 5)}
                        className="w-5 h-5 bg-white border border-gray-300 rounded hover:bg-gray-200 flex items-center justify-center text-xs font-normal"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        step="5"
                        value={sizeQuantities[sz] || 0}
                        onChange={(e) => handleSizeChange(sz, parseInt(e.target.value) || 0)}
                        className="w-12 text-center text-xs font-mono font-normal bg-white border border-gray-300 rounded py-0.5 focus:outline-none"
                      />
                      <button
                        onClick={() => handleSizeChange(sz, (sizeQuantities[sz] || 0) + 5)}
                        className="w-5 h-5 bg-white border border-gray-300 rounded hover:bg-gray-200 flex items-center justify-center text-xs font-normal"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Order Quantity Indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <span className="text-gray-600 font-normal">Selected Subtotal Quantity:</span>
                <span className={`font-mono font-normal text-sm ${isUnderMoq ? 'text-amber-600' : 'text-[#0F172A]'}`}>
                  {totalQuantity} Pcs
                </span>
              </div>

              {isUnderMoq && (
                <div className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 font-normal">
                  Note: Total size run ({totalQuantity} Pcs) is below the minimum order quantity ({product.moq} Pcs).
                </div>
              )}
            </div>

            {/* Custom Private Labeling Checkboxes */}
            <div className="space-y-2 bg-white p-4 rounded-2xl border border-gray-200">
              <span className="text-xs font-syne font-normal uppercase text-gray-900 block">
                Private Label Customizations
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={customizationOptions.wovenLabel}
                    onChange={(e) => setCustomizationOptions(p => ({ ...p, wovenLabel: e.target.checked }))}
                    className="accent-[#0F172A] rounded"
                  />
                  <span>Woven Neck Label</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={customizationOptions.hangtag}
                    onChange={(e) => setCustomizationOptions(p => ({ ...p, hangtag: e.target.checked }))}
                    className="accent-[#0F172A] rounded"
                  />
                  <span>Custom Hangtag</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={customizationOptions.customPolybag}
                    onChange={(e) => setCustomizationOptions(p => ({ ...p, customPolybag: e.target.checked }))}
                    className="accent-[#0F172A] rounded"
                  />
                  <span>Printed Polybag</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={customizationOptions.puffPrint}
                    onChange={(e) => setCustomizationOptions(p => ({ ...p, puffPrint: e.target.checked }))}
                    className="accent-[#0F172A] rounded"
                  />
                  <span>Puff / Screen Print</span>
                </label>
              </div>

              <input 
                type="text"
                placeholder="Specific branding or packaging notes..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0F172A] mt-2"
              />
            </div>

            {/* Primary B2B Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-xl font-syne font-normal text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition cursor-pointer shadow-lg active:scale-98 ${
                  addedSuccess 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-[#0F172A] hover:bg-[#1E293B] text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added To Wholesale Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                    <span>Add {totalQuantity} Pcs To B2B Quotation</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/917528802003?text=Hi%20Fortune%20Clothing,%20I%20want%20to%20order%20${totalQuantity}%20Pcs%20of%20${encodeURIComponent(product.name)}%20(Code:%20${product.code})%20in%20Color:%20${encodeURIComponent(selectedColor.name)}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-emerald-600 text-white py-3.5 px-6 rounded-xl font-syne font-normal text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition cursor-pointer shadow-md active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Enquiry</span>
              </a>
            </div>

          </div>

        </div>

        {/* Product Accordion & Specifications */}
        <div className="bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-4">
          <h3 className="font-serif font-normal text-xl text-gray-900 border-b border-gray-200 pb-3">
            Garment Specifications & Factory Details
          </h3>

          <div className="space-y-3">
            
            {/* Tab 1: Description */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                className="w-full text-left p-4 font-syne font-normal text-xs uppercase tracking-wider text-gray-900 flex items-center justify-between hover:bg-gray-50"
              >
                <span>Fabric Composition & Construction</span>
                <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'desc' && (
                <div className="p-4 text-xs text-gray-700 leading-relaxed border-t border-gray-100 space-y-2">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li><strong>Fabric Blend:</strong> {product.fabric}</li>
                    <li><strong>Weight:</strong> {product.gsm} GSM</li>
                    <li><strong>Fit Type:</strong> {product.fitType}</li>
                    <li><strong>Shrinkage Guarantee:</strong> {product.shrinkageRate}</li>
                    <li><strong>Washing Instructions:</strong> {product.washingCare}</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Tab 2: Features */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'feats' ? null : 'feats')}
                className="w-full text-left p-4 font-syne font-normal text-xs uppercase tracking-wider text-gray-900 flex items-center justify-between hover:bg-gray-50"
              >
                <span>Garment Engineering Highlights</span>
                <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform ${openAccordion === 'feats' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'feats' && (
                <div className="p-4 text-xs text-gray-700 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tab 3: Customization Options */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'custom' ? null : 'custom')}
                className="w-full text-left p-4 font-syne font-normal text-xs uppercase tracking-wider text-gray-900 flex items-center justify-between hover:bg-gray-50"
              >
                <span>Private Labeling & OEM Printing Options</span>
                <ChevronDown className={`w-4 h-4 text-[#C5A059] transition-transform ${openAccordion === 'custom' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'custom' && (
                <div className="p-4 text-xs text-gray-700 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.customizationOptions.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Related Wholesale Garments - 2 Columns on Mobile! */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-normal text-2xl text-gray-900">
              Related Garments You May Also Order
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-syne font-normal uppercase text-[#0F172A] hover:text-[#C5A059]"
            >
              View Full Matrix
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
