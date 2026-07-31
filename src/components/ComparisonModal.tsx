import React from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { X, Scale, Trash2, CheckCircle2, ShoppingBag } from 'lucide-react';

export const ComparisonModal: React.FC = () => {
  const { compareList, toggleCompare, clearCompare, isCompareModalOpen, setIsCompareModalOpen, setQuickViewProduct } = useCart();

  if (!isCompareModalOpen) return null;

  const comparedProducts = PRODUCTS.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-5xl bg-[#091126] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 text-white flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between px-6 py-4 bg-[#0D1836] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-lg text-white">Garment Comparison Matrix</h3>
            <span className="text-xs text-slate-400">({comparedProducts.length} Selected)</span>
          </div>

          <div className="flex items-center gap-2">
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-slate-400 hover:text-rose-400 font-semibold px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/50 transition"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Scale className="w-12 h-12 mx-auto text-slate-600" />
              <h4 className="font-serif font-bold text-slate-300 text-lg">No Garments Selected for Comparison</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Click the comparison icon on any product card in the wholesale catalogue to compare specs side by side.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {comparedProducts.map((p) => (
                <div key={p.id} className="bg-[#0E1830] border border-slate-800 p-4 rounded-2xl space-y-4 relative flex flex-col justify-between">
                  <button
                    onClick={() => toggleCompare(p.id)}
                    className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400 transition"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-2">
                    <img src={p.images[0]} alt={p.name} className="w-full h-36 object-cover rounded-xl border border-slate-700" />
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">{p.code}</span>
                    <h4 className="font-serif font-bold text-sm text-white line-clamp-1">{p.name}</h4>
                  </div>

                  <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Fabric GSM:</span>
                      <span className="font-bold text-amber-300">{p.gsm} GSM</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">MOQ:</span>
                      <span className="font-bold text-slate-200">{p.moq} Pcs</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Composition:</span>
                      <span className="font-semibold text-slate-300 text-[11px] line-clamp-1">{p.fabric}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/60">
                      <span className="text-slate-400">Dispatch:</span>
                      <span className="font-semibold text-emerald-400">{p.dispatchDays}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCompareModalOpen(false);
                      setQuickViewProduct(p);
                    }}
                    className="w-full bg-[#121E38] hover:bg-[#1C2C50] text-[#D4AF37] font-bold text-xs py-2 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition"
                  >
                    View Specs →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
