import React, { useState, useEffect, useRef } from 'react';
import { Factory, Sparkles, ShieldCheck, Flame, Cpu, Eye, CheckCircle2 } from 'lucide-react';

export const BrandStoryScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);

  const storySegments = [
    {
      stage: 'STAGE 01',
      title: 'Precision Spinning & Fiber Mastery',
      subtitle: 'Combed Compact 100% Cotton & Specialty Yarns',
      description: 'The foundation of global luxury fashion begins at yarn selection. We engineer zero-twist combed cotton yarns with double-clearing technology to eliminate micro-imperfections before circular knitting begins.',
      metrics: [
        { label: 'Yarn Purity', value: '99.9%' },
        { label: 'Fiber Staple', value: '38mm Long Staple' },
        { label: 'Slant Factor', value: '0% Guaranteed' }
      ],
      mediaUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
      tag: 'Textile Science'
    },
    {
      stage: 'STAGE 02',
      title: 'High-Gauge Circular Knitting',
      subtitle: 'Mayer & Cie German High-Precision Looms',
      description: 'Our Ludhiana knitting mill houses high-speed multi-feed circular looms producing loopknit fleece, French Terry, single jersey, and 4-way stretch interlock with absolute structural symmetry.',
      metrics: [
        { label: 'Daily Knitted Output', value: '12,000 KG' },
        { label: 'Loom Precision', value: '32 Gauge' },
        { label: 'Fabric Consistency', value: '100% Uniform' }
      ],
      mediaUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
      tag: 'Ludhiana Hosiery Hub'
    },
    {
      stage: 'STAGE 03',
      title: 'Zero-Bleed Soft-Flow Eco Dyeing',
      subtitle: 'Pantone-Calibrated Dyeing & Bio-Enzyme Softening',
      description: 'Computerized dye vats ensure exact Pantone color matching across 10,000+ piece batches. Bio-washing with organic enzymes breaks down surface fuzz to create a buttery smooth printing surface.',
      metrics: [
        { label: 'Color Fastness', value: 'Grade 4-5 ISO' },
        { label: 'Water Recycling', value: '90% ZLD System' },
        { label: 'Shrinkage Rate', value: '<1.2% Controlled' }
      ],
      mediaUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
      tag: 'Sustainable Finishing'
    },
    {
      stage: 'STAGE 04',
      title: 'Automated Laser CAD Cutting & Stitching',
      subtitle: 'Yamato Twin-Needle & Modular Assembly Lines',
      description: 'Automatic fabric spreaders prevent stretch distortion during cutting. Modular sewing lines utilize Juki & Yamato machines for twin-needle coverstitching, reinforced necklines, and clean hem seals.',
      metrics: [
        { label: 'Stitch Density', value: '12-14 SPI' },
        { label: 'Daily Garments', value: '25,000 Pcs' },
        { label: 'Seam Strength', value: 'Tested >350N' }
      ],
      mediaUrl: 'https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&w=1200&q=80',
      tag: 'Assembly Excellence'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);

      const index = Math.min(
        storySegments.length - 1,
        Math.floor(progress * storySegments.length)
      );
      setActiveSegmentIndex(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [storySegments.length]);

  const activeSegment = storySegments[activeSegmentIndex];

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#050A1A] text-white py-24 px-4 lg:px-8 border-t border-b border-white/10 overflow-hidden"
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0A152E] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Interactive Brand Storytelling
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            The Craft Behind International Fashion Manufacturing
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Scroll to reveal how raw yarn transforms into world-class apparel inside Fortune Clothing Company’s high-tech Ludhiana facility.
          </p>
        </div>

        {/* Interactive Scroll Storyboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Frame with Progress Overlay */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A152E]">
              
              {/* Image Frame with Transition */}
              <img 
                src={activeSegment.mediaUrl} 
                alt={activeSegment.title}
                className="w-full h-full object-cover transition-all duration-700 transform scale-105 group-hover:scale-100 filter brightness-90"
              />

              {/* Overlay Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A1A] via-transparent to-transparent opacity-80" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 bg-[#050A1A]/90 backdrop-blur-md border border-white/10 text-[#C5A059] text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-[#C5A059]" /> {activeSegment.tag}
              </div>

              {/* Progress Bar along bottom of frame */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
                <div 
                  className="h-full bg-[#C5A059] transition-all duration-300"
                  style={{ width: `${((activeSegmentIndex + 1) / storySegments.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Navigation Indicators */}
            <div className="flex items-center justify-between mt-4 px-2 text-xs text-slate-400">
              <span className="font-mono text-[#C5A059] font-bold">
                0{activeSegmentIndex + 1} / 0{storySegments.length}
              </span>
              <div className="flex gap-2">
                {storySegments.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeSegmentIndex ? 'w-8 bg-[#C5A059]' : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-500 uppercase tracking-[0.2em] text-[10px] font-mono">Scroll to Navigate</span>
            </div>
          </div>

          {/* Right Column: Stage Details & Live Metrics */}
          <div className="lg:col-span-5 space-y-6 bg-[#0A152E] border border-white/10 p-8 rounded-2xl shadow-xl">
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/30">
                {activeSegment.stage}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Factory Verified
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
                {activeSegment.title}
              </h3>
              <p className="text-xs font-semibold text-[#C5A059] mt-1">
                {activeSegment.subtitle}
              </p>
            </div>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed border-l-2 border-[#C5A059] pl-4 py-1">
              {activeSegment.description}
            </p>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {activeSegment.metrics.map((m, idx) => (
                <div key={idx} className="bg-[#121c33] border border-white/10 p-3 rounded-xl text-center">
                  <div className="text-sm font-bold text-white font-mono">{m.value}</div>
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5 font-mono">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ISO Certified Ludhiana Mill
              </span>
              <a 
                href="https://wa.me/917528802003?text=I%20would%20like%20to%20learn%20more%20about%20Fortune%20Clothing%20manufacturing%20capabilities."
                target="_blank"
                rel="noreferrer"
                className="text-[#C5A059] font-bold hover:underline uppercase text-[10px] tracking-wider"
              >
                Inquire Fabric Tech →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
