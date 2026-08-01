import React from 'react';
import { Factory } from 'lucide-react';

export const ManufacturingPipeline: React.FC = () => {
  const STEPS = [
    {
      num: '01',
      title: 'Compact Yarn Spinning & Dyeing',
      desc: '100% combed cotton yarn dyed with zero-bleed Reactive azo-free dyes.'
    },
    {
      num: '02',
      title: 'Precision CNC Pattern Cutting',
      desc: 'Automated multi-layer lay cutters ensuring 0.5mm tolerance accuracy.'
    },
    {
      num: '03',
      title: 'Twin Needle Cut & Sew',
      desc: 'High-speed Brother & Juki sewing machines with reinforced collar ribbing.'
    },
    {
      num: '04',
      title: 'AQL 2.5 Audit & Packaging',
      desc: 'Steam iron pressing, polybag tagging, and barcode carton dispatch.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-200 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
            <Factory className="w-4 h-4 text-[#C5A059]" /> Ludhiana Infrastructure
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
            Factory Manufacturing Pipeline
          </h2>
          <p className="text-xs text-gray-600 font-normal">
            Integrated knitwear facility producing 15,000+ units daily under strict AQL 2.5 standards.
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

      </div>
    </section>
  );
};
