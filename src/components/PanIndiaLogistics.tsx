import React from 'react';
import { Truck, MapPin } from 'lucide-react';

export const PanIndiaLogistics: React.FC = () => {
  const ZONES = [
    { name: 'North India', time: '2-3 Days', cities: 'Delhi NCR, Punjab, Haryana, Rajasthan, UP' },
    { name: 'West India', time: '3-4 Days', cities: 'Mumbai, Pune, Ahmedabad, Surat, Goa' },
    { name: 'South India', time: '4-5 Days', cities: 'Bengaluru, Hyderabad, Chennai, Kochi' },
    { name: 'East & NE India', time: '4-6 Days', cities: 'Kolkata, Guwahati, Bhubaneswar, Patna' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-200 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
            <Truck className="w-4 h-4 text-[#C5A059]" /> Nationwide Doorstep Freight
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
            PAN India Express Logistics & Transit Timelines
          </h2>
          <p className="text-xs text-gray-600 font-normal">
            Shipped directly from Ludhiana Hosiery Mill gate with automated live tracking and e-way bill compliance.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {ZONES.map((z, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 p-4 sm:p-5 rounded-2xl space-y-2 shadow-2xs">
              <MapPin className="w-5 h-5 text-[#0F172A]" />
              <h3 className="font-serif font-normal text-xs sm:text-sm text-gray-900">{z.name}</h3>
              <div className="text-xs font-mono font-normal text-[#C5A059]">{z.time} Doorstep Transit</div>
              <p className="text-[11px] text-gray-500 font-normal">{z.cities}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
