import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, FileText, PhoneCall, Check } from 'lucide-react';

export const QuickForms: React.FC = () => {
  const { activeModal, setActiveModal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    city: ''
  });

  if (!activeModal || (activeModal !== 'sample' && activeModal !== 'callback')) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveModal(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
      <div onClick={() => setActiveModal(null)} className="absolute inset-0 cursor-pointer" />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 z-10 space-y-5 animate-in zoom-in-95 duration-200 text-gray-900">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            {activeModal === 'sample' ? <FileText className="w-5 h-5 text-[#C5A059]" /> : <PhoneCall className="w-5 h-5 text-[#0F172A]" />}
            <h3 className="font-serif font-normal text-lg text-gray-900">
              {activeModal === 'sample' ? 'Request Swatch Fabric Deck' : 'Request Executive Callback'}
            </h3>
          </div>
          <button onClick={() => setActiveModal(null)} className="p-1.5 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-normal text-base text-gray-900">Request Received!</h4>
            <p className="text-xs text-gray-600 font-sans font-normal">Our B2B representative will contact you within 2 business hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-700 font-normal mb-1">Full Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Vikram Sharma"
                value={form.name} 
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] font-normal"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-normal mb-1">Phone / WhatsApp *</label>
              <input 
                type="tel" 
                required 
                placeholder="e.g. +91 98140 12345"
                value={form.phone} 
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] font-normal"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-normal mb-1">Company / Brand Name</label>
              <input 
                type="text" 
                placeholder="e.g. Urban Threads"
                value={form.company} 
                onChange={e => setForm({ ...form, company: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] font-normal"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-normal mb-1">City / Location *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. Bengaluru"
                value={form.city} 
                onChange={e => setForm({ ...form, city: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] font-normal"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-syne font-normal text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md transition cursor-pointer mt-2"
            >
              Submit Request
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
