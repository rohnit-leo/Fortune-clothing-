import React from 'react';
import { CheckCircle2, Award } from 'lucide-react';

export const QualityHotspots: React.FC = () => {
  const HOTSPOTS = [
    { title: 'Anti-Curl Ribbed Collar', desc: 'Lycra blended collar ribbing that holds shape after 50+ wash cycles.' },
    { title: 'Shoulder-to-Shoulder Taping', desc: 'Internal neck taping preventing seam chafing and shoulder sagging.' },
    { title: 'High-Density Puff & Screen Print', desc: 'Cured plastisol prints tested for crack resistance and wash fastness.' },
    { title: 'Twin-Needle Bottom Hem', desc: 'Reinforced coverstitch hemming ensuring clean drape and zero unraveling.' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-200 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
            <Award className="w-4 h-4 text-[#C5A059]" /> Precision Engineering
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
            Garment Quality Hotspots
          </h2>
          <p className="text-xs text-gray-600 font-normal">
            Every Fortune garment undergoes 6 stage quality audits before final carton sealing.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {HOTSPOTS.map((h, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 p-4 sm:p-5 rounded-2xl space-y-2 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif font-normal text-xs sm:text-sm text-gray-900">{h.title}</h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed font-normal">{h.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
