import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles } from 'lucide-react';

export const PrivateLabelRoadmap: React.FC = () => {
  const { setActiveModal } = useCart();

  const STEPS = [
    { num: '01', title: 'Tech Pack & Sample Prototype', desc: 'Send your fit sheet or choose from our tested streetwear patterns. Sample shipped in 3-5 days.' },
    { num: '02', title: 'Custom Fabric Dyeing & GSM', desc: 'Select Pantone mill shades or custom lab dips in 240, 330, or 380 GSM knits.' },
    { num: '03', title: 'Neck Labeling & Printing', desc: 'Woven damask neck tags, wash care labels, 3D puff prints, and custom hangtags.' },
    { num: '04', title: 'Bulk Batch Dispatch', desc: 'Steam pressed, polybagged, boxed, and dispatched across India with GST invoice.' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-200 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> OEM / ODM Custom Branding
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
            Private Label Manufacturing Roadmap
          </h2>
          <p className="text-xs text-gray-600 font-normal">
            Launch your apparel line with custom tags, custom dyeing, and custom streetwear fits.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STEPS.map((s, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl space-y-2.5 shadow-2xs">
              <span className="text-xl sm:text-2xl font-serif font-normal text-[#C5A059]">{s.num}</span>
              <h3 className="font-serif font-normal text-sm sm:text-base text-gray-900">{s.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans font-normal">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveModal('enquiry')}
            className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-syne font-normal text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md transition cursor-pointer"
          >
            Start Your Private Label Project
          </button>
        </div>

      </div>
    </section>
  );
};
