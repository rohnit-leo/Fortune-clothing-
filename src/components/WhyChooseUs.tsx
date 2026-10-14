import React from 'react';
import { 
  Building2, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Factory, 
  Package
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A059] stroke-[1.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/>
        </svg>
      ),
      title: 'DIRECT',
      subtitle: 'MANUFACTURER'
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A059] stroke-[1.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="4" rx="1"/>
          <path d="M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8M10 12h4"/>
        </svg>
      ),
      title: 'LOW MOQ',
      subtitle: '24 PCS / STYLE'
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A059] stroke-[1.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: '100% GST',
      subtitle: 'TAX CREDIT'
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A059] stroke-[1.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 3a2 2 0 0 0-2 2c0 .8.5 1.5 1.2 1.8L2 14v2h20v-2L12.8 6.8c.7-.3 1.2-1 1.2-1.8a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="19" r="1"/>
        </svg>
      ),
      title: 'LATEST',
      subtitle: 'DESIGNS'
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A059] stroke-[1.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M2 20h20M4 20V8l5 4V8l5 4V4l6 4v12"/>
          <circle cx="17" cy="12" r="1"/>
        </svg>
      ),
      title: 'BULK',
      subtitle: 'PRODUCTION'
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C5A059] stroke-[1.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      ),
      title: 'PAN INDIA',
      subtitle: 'DISPATCH'
    }
  ];

  return (
    <section className="py-6 sm:py-10 bg-white font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contained Rounded Card as shown in Reference Image */}
        <div className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs">
          
          {/* Centered Heading */}
          <h2 className="text-center font-bold text-sm sm:text-base md:text-lg uppercase tracking-wider text-gray-900 mb-8 sm:mb-10">
            WHY WHOLESALE BUYERS CHOOSE US
          </h2>

          {/* 6 Icons Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
            {pillars.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                
                {/* Gold Outline Icon Container */}
                <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                {/* 2-line Label */}
                <div className="flex flex-col text-center">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-900">
                    {item.title}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-700 leading-tight">
                    {item.subtitle}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
