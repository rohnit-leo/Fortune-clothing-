import React from 'react';

export const ManufacturingPipeline: React.FC = () => {
  const steps = [
    {
      label: 'FABRIC',
      icon: (
        <svg className="w-6 h-6 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <ellipse cx="12" cy="7" rx="8" ry="4"/>
          <path d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7"/>
          <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4"/>
        </svg>
      )
    },
    {
      label: 'CUTTING',
      icon: (
        <svg className="w-6 h-6 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="6" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <line x1="20" y1="4" x2="8.12" y2="15.88"/>
          <line x1="14.47" y1="14.48" x2="20" y2="20"/>
          <line x1="8.12" y1="8.12" x2="12" y2="12"/>
        </svg>
      )
    },
    {
      label: 'PRINTING',
      icon: (
        <svg className="w-6 h-6 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="6 9 6 2 18 2 18 9"/>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
      )
    },
    {
      label: 'STITCHING',
      icon: (
        <svg className="w-6 h-6 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 6h12a4 4 0 0 1 4 4v8H4V6z"/>
          <line x1="14" y1="10" x2="14" y2="14"/>
          <line x1="4" y1="18" x2="20" y2="18"/>
          <circle cx="9" cy="10" r="1"/>
        </svg>
      )
    },
    {
      label: 'FINISHING',
      icon: (
        <svg className="w-6 h-6 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="9 12 12 15 16 10"/>
        </svg>
      )
    },
    {
      label: 'PACKING',
      icon: (
        <svg className="w-6 h-6 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      )
    },
    {
      label: 'DISPATCH',
      icon: (
        <svg className="w-6 h-6 text-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#1C232E] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 font-sans select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Title with Gold Lines Flanking */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] bg-[#C5A059]/40 w-12 sm:w-28" />
          <h2 className="text-center font-bold text-xs sm:text-base md:text-lg uppercase tracking-[0.2em] text-[#E5C378]">
            FROM FABRIC TO DISPATCH
          </h2>
          <div className="h-[1px] bg-[#C5A059]/40 w-12 sm:w-28" />
        </div>

        {/* 7 Pipeline Process Steps with Connecting Arrows */}
        <div className="flex items-center justify-between overflow-x-auto pb-4 pt-2 no-scrollbar gap-2 sm:gap-4 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              
              {/* Step Icon Box & Label */}
              <div className="flex flex-col items-center shrink-0 min-w-[55px] sm:min-w-[80px] group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-gray-600/80 bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-[#C5A059] group-hover:bg-[#C5A059]/10 group-hover:scale-105 shadow-xs">
                  {step.icon}
                </div>
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-300 mt-2 text-center group-hover:text-white transition-colors">
                  {step.label}
                </span>
              </div>

              {/* Connecting Arrow (Except after last item) */}
              {idx < steps.length - 1 && (
                <div className="text-gray-500 shrink-0 font-bold text-xs sm:text-base select-none px-0.5 sm:px-1">
                  →
                </div>
              )}

            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};
