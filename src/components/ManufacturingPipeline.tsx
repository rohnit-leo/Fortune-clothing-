import React, { useState } from 'react';
import { FACTORY_STEPS, FACTORY_HIGHLIGHTS } from '../data/factory';
import { Factory, Activity, CheckCircle2, Cpu, Scissors, Droplets, Layers, Printer, ShieldCheck } from 'lucide-react';

export const ManufacturingPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(FACTORY_STEPS[0]);

  return (
    <section className="py-20 px-4 lg:px-8 bg-[#040816] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
              <Factory className="w-3.5 h-3.5" /> Ludhiana Manufacturing Hub
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
              End-to-End Production Infrastructure
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-xl">
              From yarn procurement to final dispatch—explore the 6 synchronized stages driving 25,000+ garments daily with 99.6% quality accuracy.
            </p>
          </div>

          <div className="bg-[#0E1830] border border-[#D4AF37]/30 p-3 rounded-2xl flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Live Mill Capacity</span>
              <span className="font-serif font-bold text-amber-300 text-sm">{FACTORY_HIGHLIGHTS.dailyCapacity}</span>
            </div>
          </div>
        </div>

        {/* Pipeline Steps Tracker */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {FACTORY_STEPS.map((step) => (
            <button
              key={step.step}
              onClick={() => setActiveStep(step)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-32 ${
                activeStep.step === step.step
                  ? 'bg-gradient-to-br from-[#132247] to-[#0A1128] border-[#D4AF37] shadow-xl text-white'
                  : 'bg-[#0A1128] border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                  activeStep.step === step.step ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  STEP 0{step.step}
                </span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-xs line-clamp-2 text-slate-200">
                  {step.title}
                </h4>
                <p className="text-[10px] text-[#D4AF37] mt-1 font-mono">{step.capacity}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#0B142B] to-[#050A18] border border-slate-800 p-8 rounded-3xl shadow-2xl">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-md text-xs font-bold text-[#D4AF37]">
              Stage 0{activeStep.step} • {activeStep.capacity}
            </div>

            <h3 className="font-serif text-2xl md:text-4xl font-bold text-white">
              {activeStep.title}
            </h3>
            <p className="text-xs font-semibold text-amber-300">{activeStep.subtitle}</p>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed border-l-2 border-[#D4AF37] pl-4">
              {activeStep.description}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Technical Highlights:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeStep.highlights.map((h, idx) => (
                  <div key={idx} className="bg-[#0E1830] border border-slate-800/80 p-2.5 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
            <img
              src={activeStep.image}
              alt={activeStep.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A18] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold">Ludhiana Mill Machinery Standard</span>
              <span className="text-[#D4AF37] font-bold">100% Quality Verified</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
