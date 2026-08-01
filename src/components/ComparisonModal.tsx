import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Scale, Trash2 } from 'lucide-react';

export const ComparisonModal: React.FC = () => {
  const { compareList, isCompareModalOpen, setIsCompareModalOpen, toggleCompare } = useCart();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans overflow-y-auto">
      <div onClick={() => setIsCompareModalOpen(false)} className="absolute inset-0 cursor-pointer" />

      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 z-10 my-8 animate-in zoom-in-95 duration-200 p-6 space-y-6">
        
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif font-normal text-xl text-gray-900">Garment Specification Comparison Matrix</h3>
          </div>
          <button onClick={() => setIsCompareModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {compareList.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-xs font-normal">
            No garments selected for comparison. Click the scale icon on product cards to compare GSM, MOQs, and fabric blends.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-3 font-syne uppercase text-gray-500 font-normal text-[10px]">Specification</th>
                  {compareList.map(p => (
                    <th key={p.id} className="p-3 min-w-[200px]">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-[#C5A059] font-normal block">{p.code}</span>
                          <span className="font-serif font-normal text-gray-900 text-sm block">{p.name}</span>
                        </div>
                        <button onClick={() => toggleCompare(p)} className="text-gray-400 hover:text-rose-600 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                <tr>
                  <td className="p-3 font-normal text-gray-500">Fabric Composition</td>
                  {compareList.map(p => <td key={p.id} className="p-3 font-normal">{p.fabric}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-normal text-gray-500">GSM Weight</td>
                  {compareList.map(p => <td key={p.id} className="p-3 font-mono font-normal text-[#0F172A]">{p.gsm} GSM</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-normal text-gray-500">Minimum Order Qty</td>
                  {compareList.map(p => <td key={p.id} className="p-3 font-mono font-normal text-[#C5A059]">{p.moq} Pcs</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-normal text-gray-500">Fit Silhouette</td>
                  {compareList.map(p => <td key={p.id} className="p-3 font-normal">{p.fitType}</td>)}
                </tr>
                <tr>
                  <td className="p-3 font-normal text-gray-500">Dispatch Time</td>
                  {compareList.map(p => <td key={p.id} className="p-3 font-normal">{p.dispatchDays}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
