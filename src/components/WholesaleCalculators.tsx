import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Layers, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export const WholesaleCalculators: React.FC = () => {
  // Profitability State
  const [orderQty, setOrderQty] = useState<number>(500);
  const [estCostPerPiece, setEstCostPerPiece] = useState<number>(280); // ₹280 average
  const [targetRetailPrice, setTargetRetailPrice] = useState<number>(899); // ₹899 retail price

  // Fabric Weight Estimator State
  const [gsmInput, setGsmInput] = useState<number>(240);
  const [garmentType, setGarmentType] = useState<string>('T-Shirt');

  const totalWholesaleInvestment = orderQty * estCostPerPiece;
  const totalGrossRevenue = orderQty * targetRetailPrice;
  const netProfit = totalGrossRevenue - totalWholesaleInvestment;
  const roiPct = totalWholesaleInvestment > 0 ? ((netProfit / totalWholesaleInvestment) * 100).toFixed(1) : '0';

  // GSM weight calculation e.g. approx fabric surface area
  const fabricAreaMap: Record<string, number> = {
    'T-Shirt': 0.75, // approx 0.75 sq meters
    'Sweatshirt': 1.25,
    'Hoodie': 1.6,
    'Jogger': 1.1,
    'Jacket': 1.8
  };
  const area = fabricAreaMap[garmentType] || 0.75;
  const estWeightGrams = Math.round(gsmInput * area);

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#050A18] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            <Calculator className="w-3.5 h-3.5" /> B2B Profitability Engine
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Wholesale Profitability & ROI Estimator
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Calculate your estimated profit margins, gross revenue, and ROI when sourcing factory-direct garments from Fortune Clothing Company.
          </p>
        </div>

        {/* Profitability Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#0B142B] to-[#060C1E] border border-slate-800 p-8 rounded-3xl shadow-2xl">
          
          {/* Inputs Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif font-bold text-xl text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <TrendingUp className="w-5 h-5 text-[#D4AF37]" /> Input Order & Retail Parameters
            </h3>

            {/* Slider 1: Order Quantity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Wholesale Quantity:</span>
                <span className="text-[#D4AF37] font-mono font-extrabold text-sm">{orderQty} Pcs</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={orderQty}
                onChange={(e) => setOrderQty(parseInt(e.target.value))}
                className="w-full accent-[#D4AF37] bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>100 Pcs (MOQ)</span>
                <span>2,500 Pcs</span>
                <span>5,000+ Pcs</span>
              </div>
            </div>

            {/* Slider 2: Estimated Factory Cost */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Estimated Factory Price / Piece (₹):</span>
                <span className="text-amber-300 font-mono font-extrabold text-sm">₹{estCostPerPiece}</span>
              </div>
              <input
                type="range"
                min="120"
                max="1200"
                step="10"
                value={estCostPerPiece}
                onChange={(e) => setEstCostPerPiece(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₹120 (Basic Tee)</span>
                <span>₹500 (Heavy Hoodie)</span>
                <span>₹1,200 (Winter Jacket)</span>
              </div>
            </div>

            {/* Slider 3: Target Retail Selling Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Target Retail Selling Price / Piece (₹):</span>
                <span className="text-emerald-400 font-mono font-extrabold text-sm">₹{targetRetailPrice}</span>
              </div>
              <input
                type="range"
                min="300"
                max="3500"
                step="50"
                value={targetRetailPrice}
                onChange={(e) => setTargetRetailPrice(parseInt(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>₹300</span>
                <span>₹1,500</span>
                <span>₹3,500+</span>
              </div>
            </div>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-6 bg-[#0E1830] border border-slate-700/80 p-6 rounded-2xl space-y-5">
            <h4 className="font-serif font-bold text-lg text-[#D4AF37] uppercase tracking-wider">
              Projected B2B Financial Yield
            </h4>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Investment</span>
                <span className="font-mono text-lg font-bold text-white">₹{totalWholesaleInvestment.toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Gross Retail Sales</span>
                <span className="font-mono text-lg font-bold text-amber-300">₹{totalGrossRevenue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 p-5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 block">Net Estimated Profit</span>
                <span className="font-mono text-2xl font-extrabold text-emerald-300">
                  ₹{netProfit.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Calculated ROI</span>
                <span className="font-mono text-2xl font-extrabold text-[#D4AF37]">
                  +{roiPct}%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic leading-relaxed">
              *Estimates based on direct factory pricing and standard retail markup. Contact Fortune Clothing Company for customized bulk contract rate sheets.
            </p>

            <a
              href={`https://wa.me/917528802003?text=Hello%20Fortune%20Clothing%2C%20I%20calculated%20a%20wholesale%20order%20for%20${orderQty}%20pieces%20and%20would%20like%20a%20formal%20factory%20quotation.`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-emerald-500 text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              Lock In This Factory Wholesale Rate On WhatsApp →
            </a>
          </div>

        </div>

        {/* Second Tool: GSM & Weight Converter */}
        <div className="bg-[#0B142B] border border-slate-800 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <span className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider block">Textile Spec Tool</span>
            <h4 className="font-serif font-bold text-lg text-white mt-1">Garment Weight Estimator</h4>
            <p className="text-xs text-slate-400 mt-1">Estimate approximate single garment weight based on fabric GSM and pattern cut.</p>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={gsmInput}
                onChange={(e) => setGsmInput(parseInt(e.target.value) || 0)}
                placeholder="Enter GSM"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
              <select
                value={garmentType}
                onChange={(e) => setGarmentType(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="T-Shirt">T-Shirt</option>
                <option value="Sweatshirt">Sweatshirt</option>
                <option value="Hoodie">Hoodie</option>
                <option value="Jogger">Jogger</option>
                <option value="Jacket">Jacket</option>
              </select>
            </div>
          </div>

          <div className="bg-[#0E1830] border border-slate-700 p-4 rounded-xl text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Single Piece Weight</span>
            <span className="font-mono text-2xl font-bold text-[#D4AF37]">{estWeightGrams} Grams / Piece</span>
          </div>
        </div>

      </div>
    </section>
  );
};
