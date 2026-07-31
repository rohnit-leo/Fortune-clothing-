import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Scale, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  PhoneCall, 
  Ruler, 
  Layers, 
  Truck, 
  Award, 
  Clock, 
  CheckCircle2, 
  Share2,
  FileText,
  Building2
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const { 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare, 
    setIsEnquiryModalOpen,
    setActiveModal
  } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.availableColors[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Size distribution breakdown
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    const perSize = Math.ceil(product.moq / product.availableSizes.length);
    product.availableSizes.forEach(sz => {
      initial[sz] = perSize;
    });
    return initial;
  });

  const [customNotes, setCustomNotes] = useState('');
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);

  const totalQty = (Object.values(sizeQuantities) as number[]).reduce((a: number, b: number) => a + (b || 0), 0);
  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const handleSizeChange = (sz: string, val: number) => {
    setSizeQuantities(prev => ({
      ...prev,
      [sz]: Math.max(0, val)
    }));
  };

  const toggleCustomization = (option: string) => {
    setSelectedCustomizations(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = () => {
    if (totalQty <= 0) {
      alert('Please enter a quantity greater than zero.');
      return;
    }
    const notes = [
      customNotes,
      selectedCustomizations.length > 0 ? `Customizations: ${selectedCustomizations.join(', ')}` : ''
    ].filter(Boolean).join(' | ');

    addToCart(product, selectedColor, sizeQuantities, notes);
    showToast(`✓ Added ${totalQty} Pcs of ${product.name} to B2B Cart!`);
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050A1A] text-white py-8 px-4 lg:px-8 space-y-12 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#C5A059] text-[#050A1A] px-5 py-3 rounded-xl font-syne font-bold text-xs shadow-2xl flex items-center gap-2 border border-white/20 animate-in slide-in-from-right duration-200">
          <CheckCircle2 className="w-4 h-4 fill-current text-[#050A1A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation & Breadcrumbs */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-[0.2em] text-[#C5A059] hover:text-white transition group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Wholesale Catalogue</span>
        </button>

        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          <span>Catalogue</span> /
          <span>{product.category}</span> /
          <span className="text-[#C5A059] font-bold">{product.code}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: High Res Image Gallery & Spec Highlights (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-[#0A152E] shadow-2xl group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A1A] via-transparent to-black/20 opacity-80" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 font-mono z-10">
              <span className="bg-[#050A1A]/90 backdrop-blur-md border border-white/10 text-[#C5A059] text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
                {product.gsm} GSM
              </span>
              <span className="bg-[#C5A059] text-[#050A1A] text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
                MOQ {product.moq} Pcs
              </span>
            </div>

            {/* Quick Action Overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-md border transition ${
                  isWishlisted 
                    ? 'bg-rose-500 text-white border-rose-400' 
                    : 'bg-[#050A1A]/80 text-slate-300 border-white/10 hover:text-rose-400'
                }`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => toggleCompare(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-md border transition ${
                  isCompared 
                    ? 'bg-[#C5A059] text-[#050A1A] border-[#C5A059]' 
                    : 'bg-[#050A1A]/80 text-slate-300 border-white/10 hover:text-[#C5A059]'
                }`}
                title="Compare Garments"
              >
                <Scale className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnails Gallery */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                  selectedImage === img 
                    ? 'border-[#C5A059] shadow-lg scale-105' 
                    : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Factory Verification Badges */}
          <div className="bg-[#0A152E] border border-white/10 rounded-2xl p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-white/10">
              <span className="text-slate-400">Mill Origin:</span>
              <span className="font-semibold text-white flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#C5A059]" /> Ludhiana Textile Hub
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-white/10">
              <span className="text-slate-400">Dispatch Window:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {product.dispatchDays}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-white/10">
              <span className="text-slate-400">Shrinkage Rate:</span>
              <span className="font-semibold text-slate-200">{product.shrinkageRate}</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-400">Quality Standard:</span>
              <span className="font-semibold text-[#C5A059]">ISO 9001:2015 Certified</span>
            </div>
          </div>

        </div>

        {/* Right Column: Garment Specs & Ordering Engine (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0A152E] border border-[#C5A059]/40 px-3 py-1 rounded-full text-[10px] font-syne font-bold uppercase tracking-[0.25em] text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Wholesale Garment Model • {product.code}
            </div>

            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-white tracking-wide">
              {product.name}
            </h1>

            <p className="text-sm font-semibold text-[#C5A059] font-syne tracking-wide">
              {product.subtitle}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
              {product.description}
            </p>
          </div>

          {/* Color Selector */}
          <div className="space-y-3">
            <label className="block text-[11px] font-syne font-bold uppercase tracking-[0.2em] text-slate-300">
              1. Available Fabric Colorways ({product.availableColors.length} Shade Options)
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.availableColors.map((col, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedColor(col);
                    if (col.image) setSelectedImage(col.image);
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                    selectedColor.name === col.name
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-white shadow-lg'
                      : 'border-white/10 bg-[#0A152E] text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: col.hex }} />
                  <span>{col.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Quantity Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-syne font-bold uppercase tracking-[0.2em] text-slate-300 flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-[#C5A059]" /> 2. B2B Size Breakdown (Quantities in Pieces)
              </label>
              <span className={`text-xs font-bold font-mono ${totalQty >= product.moq ? 'text-emerald-400' : 'text-amber-400'}`}>
                Total: {totalQty} Pcs {totalQty < product.moq ? `(MOQ: ${product.moq})` : '✓ MOQ Met'}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {product.availableSizes.map(sz => (
                <div key={sz} className="bg-[#0A152E] border border-white/10 rounded-2xl p-2.5 text-center">
                  <span className="text-xs font-bold text-slate-300 font-mono block mb-1">{sz}</span>
                  <input
                    type="number"
                    min="0"
                    value={sizeQuantities[sz] || 0}
                    onChange={(e) => handleSizeChange(sz, parseInt(e.target.value) || 0)}
                    className="w-full bg-[#050A1A] border border-white/20 rounded-xl py-1.5 px-1 text-center text-xs text-white font-mono font-bold focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Customization & Private Label Options */}
          <div className="space-y-3">
            <label className="block text-[11px] font-syne font-bold uppercase tracking-[0.2em] text-slate-300">
              3. Private Labeling & Branding Options
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.customizationOptions.map((opt, idx) => {
                const isSelected = selectedCustomizations.includes(opt);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCustomization(opt)}
                    className={`text-left p-3 rounded-xl border text-xs font-medium transition flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                        : 'border-white/10 bg-[#0A152E] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#C5A059] bg-[#C5A059] text-[#050A1A]' : 'border-white/20'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="line-clamp-1">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wholesale Pricing Tiers */}
          <div className="bg-[#0A152E] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-syne font-bold uppercase tracking-[0.2em] text-[#C5A059]">
                Factory Direct Pricing Tiers
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Ludhiana Mill Gate Rates</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              {product.wholesaleTiers.map((tier, idx) => (
                <div key={idx} className="bg-[#121c33] border border-white/10 p-3 rounded-xl">
                  <div className="font-bold text-[#C5A059] text-xs">{tier.minQty} - {tier.maxQty} Pcs</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">{tier.discountPct}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#C5A059] hover:bg-white text-[#050A1A] font-syne font-extrabold text-xs tracking-[0.2em] uppercase py-4 px-6 rounded-xl shadow-2xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" /> Add Total ({totalQty} Pcs) To Cart
            </button>

            <button
              onClick={() => {
                handleAddToCart();
                setIsEnquiryModalOpen(true);
              }}
              className="bg-[#25D366] hover:bg-emerald-500 text-[#050A1A] font-syne font-bold text-xs tracking-[0.15em] uppercase py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" /> Direct WhatsApp Inquiry
            </button>
          </div>

        </div>

      </div>

      {/* Product Features & Key Specifications Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
        
        <div className="bg-[#0A152E] border border-white/10 rounded-3xl p-6 space-y-4">
          <h3 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C5A059]" /> Premium Garment Construction
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
            {product.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0A152E] border border-white/10 rounded-3xl p-6 space-y-4">
          <h3 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C5A059]" /> Recommended Target Markets
          </h3>
          <div className="flex flex-wrap gap-2">
            {product.bestFor.map((bf, idx) => (
              <span key={idx} className="bg-[#121c33] border border-white/10 text-slate-200 text-xs px-3.5 py-1.5 rounded-xl font-mono">
                {bf}
              </span>
            ))}
          </div>

          <div className="pt-3 space-y-2 text-xs text-slate-300">
            <p><strong className="text-[#C5A059]">Fabric Blend:</strong> {product.blend}</p>
            <p><strong className="text-[#C5A059]">Fit Profile:</strong> {product.fitType}</p>
            <p><strong className="text-[#C5A059]">Washing Instruction:</strong> {product.washingCare}</p>
          </div>
        </div>

      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto space-y-6 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-syne font-bold uppercase tracking-[0.3em] text-[#C5A059]">
                Complete Your Catalogue
              </span>
              <h2 className="font-cinzel text-2xl font-bold text-white mt-1">
                Related Garment Models
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-syne font-bold uppercase tracking-wider text-[#C5A059] hover:underline"
            >
              View Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
