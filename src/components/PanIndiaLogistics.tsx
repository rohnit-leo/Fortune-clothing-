import React from 'react';
import { Truck, MapPin, ShieldCheck, Clock, CheckCircle2, Factory, PackageCheck } from 'lucide-react';

export const PanIndiaLogistics: React.FC = () => {
  const regions = [
    { name: 'North India Hub', cities: 'Ludhiana, Delhi NCR, Jaipur, Chandigarh, Jammu', time: '1 - 2 Days Express' },
    { name: 'West India Hub', cities: 'Mumbai, Pune, Ahmedabad, Surat, Indore', time: '2 - 3 Days' },
    { name: 'South India Hub', cities: 'Bengaluru, Chennai, Hyderabad, Kochi, Coimbatore', time: '3 - 4 Days' },
    { name: 'East & NE Hub', cities: 'Kolkata, Guwahati, Patna, Bhubaneswar, Ranchi', time: '3 - 5 Days' }
  ];

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#040816] text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            <Truck className="w-3.5 h-3.5 text-amber-400" /> Pan India Dispatch Network
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Logistics & Express Freight Integration
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Dispatched directly from Bahadur Ke Road, Ludhiana with full GST e-way bills and transit insurance coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#0B142B] to-[#050A18] border border-slate-800 p-8 rounded-3xl shadow-2xl">
          
          {/* Dispatch Hubs Grid */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif font-bold text-xl text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>National Transit Timelines</span>
              <span className="text-xs text-amber-400 font-mono">100% On-Time Delivery Track</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regions.map((r, idx) => (
                <div key={idx} className="bg-[#0E1830] border border-slate-800 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {r.name}
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">
                      {r.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{r.cities}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0E1830] border border-slate-800 p-4 rounded-2xl space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GSTIN Invoice: <strong>03AWNPV5250E3ZE</strong> provided for every wholesale consignment.</span>
              </div>
              <div className="flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Heavy duty water-proof poly-gunny bale packaging to prevent weather moisture damage.</span>
              </div>
            </div>
          </div>

          {/* Logistics Stats Banner */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#121C38] to-[#0A1128] border border-slate-700/80 p-6 rounded-2xl space-y-5 text-center">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Factory className="w-6 h-6" />
            </div>

            <h4 className="font-serif font-bold text-2xl text-white">Ludhiana Dispatch Center</h4>
            
            <p className="text-xs text-slate-300">
              Plot No. 83, Gobindpuri, Bahadur Ke Road, Ludhiana, Punjab - 141008
            </p>

            <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Express Transport</span>
                <span className="text-amber-300 font-bold">Safexpress, V-Trans, TCI</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Air Cargo Option</span>
                <span className="text-emerald-300 font-bold">24-48 Hr Metro Air</span>
              </div>
            </div>

            <a
              href="https://wa.me/917528802003?text=Hello%20Fortune%20Clothing%2C%20I%20want%20to%20check%20shipping%20rates%20and%20timelines%20to%20my%20pincode."
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              Verify Shipping To Your Pincode →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
