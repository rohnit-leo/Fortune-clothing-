import React, { useState } from 'react';
import { FABRICS } from '../data/fabrics';
import { Sparkles, Layers, ShieldCheck, CheckCircle2, Cpu, Wind } from 'lucide-react';

export const FabricExplorer: React.FC = () => {
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#050B19] text-white border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            <Cpu className="w-3.5 h-3.5" /> Textile Science & Quality Lab
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
            Interactive Fabric Explorer
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Discover the exact knitted fabric compositions, GSM density, and handfeel specifications crafted inside Fortune Clothing’s Ludhiana mill.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FABRICS.map(fab => (
            <button
              key={fab.id}
              onClick={() => setSelectedFabric(fab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                selectedFabric.id === fab.id
                  ? 'bg-gradient-to-r from-amber-500 to-[#D4AF37] text-slate-950 shadow-lg'
                  : 'bg-[#0E1830] text-slate-300 hover:bg-[#18264A] border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> {fab.name}
            </button>
          ))}
        </div>

        {/* Active Fabric Focus Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#0B142B] to-[#060C1E] border border-slate-800 p-8 rounded-3xl shadow-2xl">
          
          {/* Left: High-Res Tactile Image Frame */}
          <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[4/3]">
            <img
              src={selectedFabric.image}
              alt={selectedFabric.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-700 p-3 rounded-xl text-xs">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Texture Profile</span>
              <p className="text-slate-200 font-semibold">{selectedFabric.texture}</p>
            </div>
          </div>

          {/* Right: Technical Specs & Ratings */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-md border border-[#D4AF37]/30">
                {selectedFabric.gsmRange}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mt-3">
                {selectedFabric.name}
              </h3>
              <p className="text-xs font-semibold text-amber-300 mt-1">
                Composition: {selectedFabric.composition}
              </p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {selectedFabric.description}
              </p>
            </div>

            {/* Rating Bars */}
            <div className="space-y-3 bg-[#0E1830] border border-slate-800/80 p-4 rounded-2xl">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Breathability Rating</span>
                  <span className="text-[#D4AF37]">{selectedFabric.breathability}/10</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-[#D4AF37]" style={{ width: `${selectedFabric.breathability * 10}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Durability & Tensile Strength</span>
                  <span className="text-[#D4AF37]">{selectedFabric.durability}/10</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${selectedFabric.durability * 10}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Surface Softness & Handfeel</span>
                  <span className="text-[#D4AF37]">{selectedFabric.softness}/10</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500" style={{ width: `${selectedFabric.softness * 10}%` }} />
                </div>
              </div>
            </div>

            {/* Best For Tags */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                Recommended Wholesale Garments:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedFabric.bestFor.map((item, idx) => (
                  <span key={idx} className="bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
