import React, { useState } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const QualityHotspots: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState(0);

  const hotspots = [
    {
      title: 'Lycra-Reinforced 1x1 Rib Neckline',
      description: 'Engineered with 5% Spandex elasticity so the neck tape retains tight shape after 50+ wash cycles without sagging or stretching.',
      pos: { top: '18%', left: '48%' },
      code: 'ISO-NECK-01'
    },
    {
      title: '240 GSM Combed Compact Cotton',
      description: 'Zero short fibers. Smooth surface engineered specifically for crisp screen printing, puff prints, and direct-to-garment digital transfers.',
      pos: { top: '38%', left: '55%' },
      code: 'GSM-240-PURE'
    },
    {
      title: 'Twin-Needle Topstitched Shoulder Seams',
      description: 'Reinforced shoulder-to-shoulder taping prevents armhole seam tear under tension during active wear and bulk handling.',
      pos: { top: '22%', left: '30%' },
      code: 'SEAM-TWIN-02'
    },
    {
      title: 'Bio-Washed & Silicon Softened Finish',
      description: 'Enzyme bio-wash eliminates surface pilling while silicon finishing gives a luxury buttery touch that buyers associate with global designer brands.',
      pos: { top: '55%', left: '42%' },
      code: 'BIO-FINISH-03'
    },
    {
      title: 'Double-Folded Bottom Hem Seal',
      description: 'Lock-stitched hem with zero fraying. Pre-shrunk finish ensures vertical drop length remains unchanged post laundering.',
      pos: { top: '78%', left: '50%' },
      code: 'HEM-LOCK-04'
    }
  ];

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#060D1E] text-white border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AQL 2.5 Quality Benchmark
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Anatomy of a Fortune Garment
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Click on any quality hotspot on the garment to inspect the textile engineering standards built into every piece.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#0B142B] to-[#050A18] border border-slate-800 p-8 rounded-3xl shadow-2xl">
          
          {/* Left: Garment Image with Clickable Hotspots */}
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
              alt="Quality Hotspot Garment"
              className="w-full h-full object-cover filter brightness-95"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Hotspot Pulse Buttons */}
            {hotspots.map((hs, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHotspot(idx)}
                style={{ top: hs.pos.top, left: hs.pos.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer z-20 ${
                  activeHotspot === idx
                    ? 'bg-amber-400 text-slate-950 scale-125 shadow-[0_0_20px_rgba(212,175,55,0.8)] font-bold'
                    : 'bg-slate-950/80 border-2 border-[#D4AF37] text-[#D4AF37] hover:scale-110'
                }`}
              >
                <span className="text-xs font-bold">{idx + 1}</span>
                {activeHotspot === idx && (
                  <span className="absolute inset-0 rounded-full border-2 border-amber-300 animate-ping pointer-events-none" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Active Hotspot Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#D4AF37] text-slate-950 font-black text-xs px-2.5 py-1 rounded-md">
                HOTSPOT 0{activeHotspot + 1}
              </span>
              <span className="text-xs font-mono text-slate-400">{hotspots[activeHotspot].code}</span>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
              {hotspots[activeHotspot].title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-[#D4AF37] pl-4 py-1">
              {hotspots[activeHotspot].description}
            </p>

            <div className="bg-[#0E1830] border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span>Zero-Shrinkage Guarantee</span>
                <span className="text-emerald-400">PASSED</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span>Anti-Pilling Wash Test</span>
                <span className="text-emerald-400">GRADE 5.0</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-slate-200">
                <span>Color Fastness Grade</span>
                <span className="text-emerald-400">4.5/5 ISO</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              {hotspots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHotspot(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeHotspot === idx
                      ? 'bg-[#D4AF37] text-slate-950'
                      : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  Hotspot 0{idx + 1}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
