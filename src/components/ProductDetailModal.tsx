import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Scale, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  PhoneCall, 
  Tag, 
  Info,
  Ruler,
  Layers,
  Award,
  Truck
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, wishlist, toggleWishlist, compareList, toggleCompare, setIsEnquiryModalOpen } = useCart();

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.availableColors[0]);

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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#091126] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 text-white max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0D1836] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
              {product.code}
            </span>
            <span className="text-xs text-slate-400">
              Category: <strong className="text-slate-200">{product.category}</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Gallery & Spec Badges (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[#D4AF37] text-xs font-extrabold px-3 py-1 rounded-md uppercase">
                    {product.gsm} GSM Fabric
                  </span>
                  <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-md uppercase">
                    MOQ {product.moq} Pcs
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      selectedImage === img ? 'border-[#D4AF37]' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Specs Grid */}
              <div className="bg-[#0D1836] border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Fabric Composition:</span>
                  <span className="font-semibold text-slate-200">{product.fabric}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Fit Type:</span>
                  <span className="font-semibold text-slate-200">{product.fitType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Shrinkage Rate:</span>
                  <span className="font-semibold text-emerald-400">{product.shrinkageRate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Washing Care:</span>
                  <span className="font-semibold text-slate-200">{product.washingCare}</span>
                </div>
              </div>
            </div>

            {/* Right: B2B Order Matrix (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
                  {product.name}
                </h2>
                <p className="text-sm font-semibold text-[#D4AF37] mt-1">{product.subtitle}</p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{product.description}</p>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1. Select Garment Color ({product.availableColors.length} Options)
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map((col, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(col)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                        selectedColor.name === col.name
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white shadow-lg'
                          : 'border-slate-800 bg-[#0D1836] text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-600" style={{ backgroundColor: col.hex }} />
                      <span>{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Quantity Matrix */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" /> 2. Enter Quantity Per Size (Pieces)
                  </label>
                  <span className="text-xs font-bold text-emerald-400">
                    Total: {totalQty} Pcs {totalQty < product.moq ? `(MOQ is ${product.moq})` : '✓ MOQ Met'}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.availableSizes.map(sz => (
                    <div key={sz} className="bg-[#0D1836] border border-slate-800 rounded-xl p-2 text-center">
                      <span className="text-xs font-bold text-slate-300 block mb-1">{sz}</span>
                      <input
                        type="number"
                        min="0"
                        value={sizeQuantities[sz] || 0}
                        onChange={(e) => handleSizeChange(sz, parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1 px-1 text-center text-xs text-white font-mono font-bold focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Customization Options */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. Select Customization & Private Labeling (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.customizationOptions.map((opt, idx) => {
                    const isSelected = selectedCustomizations.includes(opt);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleCustomization(opt)}
                        className={`text-left p-2.5 rounded-xl border text-xs font-medium transition flex items-center gap-2 ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                            : 'border-slate-800 bg-[#0D1836] text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#D4AF37] bg-[#D4AF37] text-slate-950' : 'border-slate-600'}`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="line-clamp-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tiered Wholesale Rates Table */}
              <div className="bg-[#0D1836] border border-slate-800 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold uppercase text-[#D4AF37] block">
                  Tiered Wholesale B2B Pricing Structure
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {product.wholesaleTiers.map((tier, idx) => (
                    <div key={idx} className="bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
                      <div className="font-mono font-bold text-amber-300">{tier.minQty} - {tier.maxQty} Pcs</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{tier.discountPct}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-amber-500 via-[#D4AF37] to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <ShoppingBag className="w-4 h-4" /> Add Total ({totalQty} Pcs) To Enquiry Cart
                </button>

                <button
                  onClick={() => {
                    handleAddToCart();
                    setIsEnquiryModalOpen(true);
                  }}
                  className="bg-[#25D366] hover:bg-emerald-500 text-slate-950 font-bold text-xs py-3.5 px-5 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <PhoneCall className="w-4 h-4" /> Direct WhatsApp Quote
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
