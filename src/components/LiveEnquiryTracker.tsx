import React, { useState } from 'react';
import { Clock } from 'lucide-react';

export const LiveEnquiryTracker: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [searched, setSearched] = useState(false);

  const mockStatus = {
    code: trackingCode || 'FCC-8892',
    client: 'Apex Retail House',
    status: 'In Cutting & Printing Line',
    progress: 60,
    dispatchDate: 'Expected Aug 05, 2026',
    items: '350 Pcs (240 GSM Oversized Tees)'
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-200 text-gray-900 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
            <Clock className="w-4 h-4 text-[#C5A059]" /> B2B Real-time Production Status
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
            Live Order & Dispatch Tracker
          </h2>
          <p className="text-xs text-gray-600 font-normal">
            Enter your 7-digit FCC Order Reference Number to track cutting, sewing, and transport status.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="e.g. FCC-8892"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] font-mono font-normal"
            />
            <button
              onClick={() => setSearched(true)}
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-syne font-normal uppercase tracking-wider px-5 sm:px-6 py-3 rounded-xl transition cursor-pointer"
            >
              Track Order
            </button>
          </div>

          {searched && (
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 space-y-4 text-xs animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <div className="font-mono font-normal text-[#0F172A] text-sm">{mockStatus.code}</div>
                  <div className="text-gray-500 font-normal">{mockStatus.client}</div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-syne font-normal uppercase px-3 py-1 rounded-full">
                  {mockStatus.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-normal text-gray-700">
                  <span>Factory Production Line Progress:</span>
                  <span>{mockStatus.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#0F172A] h-full rounded-full" style={{ width: `${mockStatus.progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 pt-2 border-t border-gray-100 font-normal">
                <div>Order Quantity: <span className="font-normal text-gray-900">{mockStatus.items}</span></div>
                <div>Estimated Dispatch: <span className="font-normal text-gray-900">{mockStatus.dispatchDate}</span></div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
