import React, { useState } from 'react';
import { Search, Truck, CheckCircle2, Clock, Factory, ShieldCheck, MapPin } from 'lucide-react';

export const LiveEnquiryTracker: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [activeResult, setActiveResult] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    // Simulated status tracking lookup
    setActiveResult({
      code: trackingId.toUpperCase(),
      client: 'Apex Fashion Wholesale',
      item: '240 GSM Heavy Oversized Tees (1,000 Pcs)',
      status: 'In Dispatch Transit via Safexpress',
      progress: 85,
      gstin: '03AWNPV5250E3ZE',
      dispatchHub: 'Ludhiana Central Hub',
      destination: 'Mumbai Transport Nagar',
      estimatedArrival: 'In 24 Hours',
      timeline: [
        { stage: 'Order Confirmation & Fabric Knitting', status: 'Completed', date: '28 July' },
        { stage: 'Bio-Wash & Color Fastness Pass', status: 'Completed', date: '29 July' },
        { stage: 'Modular Assembly & Custom Tagging', status: 'Completed', date: '30 July' },
        { stage: '4-Point AQL 2.5 Quality Inspection', status: 'Completed', date: '30 July' },
        { stage: 'Gunny Bale Packaging & E-Way Bill', status: 'Completed', date: '31 July' },
        { stage: 'In Transit to Destination Hub', status: 'Active', date: 'Expected Tomorrow' }
      ]
    });
  };

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#040816] text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            <Clock className="w-3.5 h-3.5" /> B2B Order Dispatch Intelligence
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Live Order & Dispatch Tracker
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Enter your Fortune Order ID or GST Invoice Number to monitor real-time production, quality inspection, and transport transit status.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleTrack} className="bg-[#0B142B] border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 shadow-2xl">
          <div className="flex-1 flex items-center bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Enter Order Code (e.g. FCC-8941) or GST Invoice No..."
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full font-mono"
            />
          </div>
          <button
            type="submit"
            className="bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-3.5 px-6 rounded-xl transition cursor-pointer"
          >
            Track Dispatch
          </button>
        </form>

        {/* Result Card */}
        {activeResult && (
          <div className="bg-gradient-to-br from-[#0B142B] to-[#050A18] border border-[#D4AF37]/50 p-6 rounded-3xl space-y-6 shadow-2xl animate-in fade-in duration-300">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Order Verified</span>
                <h3 className="font-serif font-bold text-xl text-white">{activeResult.code}</h3>
                <p className="text-xs text-slate-400">{activeResult.item}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  {activeResult.status}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">Est. Arrival: {activeResult.estimatedArrival}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>Production & Transport Progress</span>
                <span className="text-[#D4AF37]">{activeResult.progress}% Completed</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37]" style={{ width: `${activeResult.progress}%` }} />
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {activeResult.timeline.map((step: any, idx: number) => (
                <div key={idx} className="bg-[#0E1830] border border-slate-800 p-3 rounded-xl text-xs space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold block">{step.status}</span>
                  <p className="font-bold text-slate-200">{step.stage}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{step.date}</p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
