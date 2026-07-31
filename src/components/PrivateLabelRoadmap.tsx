import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, Layers, CheckCircle2, ArrowRight, ShieldCheck, Tag, FileText, PhoneCall } from 'lucide-react';

export const PrivateLabelRoadmap: React.FC = () => {
  const { setActiveModal } = useCart();

  const steps = [
    {
      num: '01',
      title: 'Tech Pack & Spec Review',
      description: 'Submit your tech packs, measurements, reference images, or choose from our 500+ master patterns.'
    },
    {
      num: '02',
      title: 'Custom Fabric & Dyeing',
      description: 'Select exact GSM (180 to 450 GSM), fabric blends, and custom Pantone color matching.'
    },
    {
      num: '03',
      title: 'Rapid Prototype Sample',
      description: 'We craft a physical prototype sample within 3 to 5 days for fit, print, and handfeel approval.'
    },
    {
      num: '04',
      title: 'Bulk Production & Custom Tagging',
      description: 'Mass assembly on Juki lines with custom woven neck labels, care tags, puff prints, and custom polybags.'
    },
    {
      num: '05',
      title: 'AQL 2.5 QC & Dispatch',
      description: 'Final 4-point quality inspection, barcode labeling, and express shipment directly to your warehouse.'
    }
  ];

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#050A18] text-white border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            <Tag className="w-3.5 h-3.5" /> OEM / ODM Private Labeling
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Your Brand, Manufactured By Fortune
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Launch or expand your fashion brand with end-to-end custom garment manufacturing, neck labeling, custom packaging, and strict confidentiality.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((st, idx) => (
            <div key={idx} className="bg-[#0B142B] border border-slate-800 hover:border-[#D4AF37] p-5 rounded-2xl space-y-3 relative transition group">
              <span className="font-serif text-2xl font-extrabold text-[#D4AF37] opacity-80 group-hover:opacity-100">
                {st.num}
              </span>
              <h3 className="font-serif font-bold text-sm text-white group-hover:text-amber-200">
                {st.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {st.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-gradient-to-r from-[#121E3B] via-[#0E1830] to-[#121E3B] border border-[#D4AF37]/40 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
              Confidential Private Label Contract
            </span>
            <h3 className="font-serif font-bold text-xl md:text-2xl text-white">
              Ready to Manufacture Your Next Seasonal Collection?
            </h3>
            <p className="text-xs text-slate-300">
              Submit your custom requirements or talk with our Ludhiana senior textile engineers today.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveModal('dealer')}
              className="bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-lg cursor-pointer hover:from-amber-400 hover:to-amber-500 transition"
            >
              Submit Private Label Inquiry
            </button>

            <a
              href="https://wa.me/917528802003?text=Hello%20Fortune%20Clothing%2C%20I%20want%20to%20discuss%20custom%20private%20label%20manufacturing%20for%20my%20brand."
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-slate-950 font-extrabold text-xs py-3.5 px-5 rounded-xl flex items-center gap-1.5 transition"
            >
              <PhoneCall className="w-4 h-4" /> WhatsApp Direct
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
