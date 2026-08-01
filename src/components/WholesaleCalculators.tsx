import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const WholesaleCalculators: React.FC = () => {
  const { setActiveModal } = useCart();

  const [quantity, setQuantity] = useState(250);
  const [wholesalePrice, setWholesalePrice] = useState(220); // ₹220/pc cost
  const [targetRetailPrice, setTargetRetailPrice] = useState(799); // ₹799 retail MRP

  const totalCost = quantity * wholesalePrice;
  const totalRevenue = quantity * targetRetailPrice;
  const totalProfit = totalRevenue - totalCost;
  const profitMarginPct = ((totalProfit / totalRevenue) * 100).toFixed(1);

  return (
    <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-200 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
            <Calculator className="w-4 h-4 text-[#C5A059]" /> B2B Profitability Matrix
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
            Wholesale Profit Margin Estimator
          </h2>
          <p className="text-xs text-gray-600 max-w-xl mx-auto font-normal">
            Calculate your potential retail markup and net profit margins when sourcing direct from Fortune Clothing Company.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          
          {/* Controls */}
          <div className="space-y-5 text-xs">
            
            <div>
              <div className="flex justify-between font-normal text-gray-800 mb-1">
                <span>Order Quantity:</span>
                <span className="font-mono text-[#0F172A] text-sm font-normal">{quantity} Pcs</span>
              </div>
              <input 
                type="range"
                min="24"
                max="5000"
                step="24"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full accent-[#0F172A] bg-gray-200 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between font-normal text-gray-800 mb-1">
                <span>Estimated Wholesale Cost / Piece:</span>
                <span className="font-mono text-[#C5A059] text-sm font-normal">₹{wholesalePrice}</span>
              </div>
              <input 
                type="range"
                min="120"
                max="650"
                step="10"
                value={wholesalePrice}
                onChange={(e) => setWholesalePrice(parseInt(e.target.value))}
                className="w-full accent-[#C5A059] bg-gray-200 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between font-normal text-gray-800 mb-1">
                <span>Your Retail MRP Selling Price / Piece:</span>
                <span className="font-mono text-[#0F172A] text-sm font-normal">₹{targetRetailPrice}</span>
              </div>
              <input 
                type="range"
                min="399"
                max="2499"
                step="50"
                value={targetRetailPrice}
                onChange={(e) => setTargetRetailPrice(parseInt(e.target.value))}
                className="w-full accent-[#0F172A] bg-gray-200 rounded-lg"
              />
            </div>

          </div>

          {/* Results Card */}
          <div className="bg-[#0F172A] text-white p-6 rounded-2xl flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              <span className="text-[10px] font-syne font-normal text-[#C5A059] uppercase tracking-widest block">
                Projected Return On Investment
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-slate-400 font-normal">Total Sourcing Cost:</div>
                  <div className="font-mono font-normal text-lg text-white">₹{totalCost.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-normal">Gross Sales Value:</div>
                  <div className="font-mono font-normal text-lg text-white">₹{totalRevenue.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <div className="text-xs text-slate-300 font-normal">Estimated Net Profit Margin:</div>
                <div className="font-mono font-normal text-3xl text-[#C5A059]">₹{totalProfit.toLocaleString('en-IN')}</div>
                <div className="text-xs text-emerald-400 font-normal mt-1">
                  Profit Margin: {profitMarginPct}% ROI
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('enquiry')}
              className="w-full bg-[#C5A059] hover:bg-amber-500 text-[#0F172A] font-syne font-normal text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Official Bulk Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
