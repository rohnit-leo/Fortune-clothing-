import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Send, Download, Building, MapPin, PhoneCall, CheckCircle2 } from 'lucide-react';

export const QuickForms: React.FC = () => {
  const { activeModal, setActiveModal } = useCart();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!activeModal) return null;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNum = '917528802003';
    let message = `*B2B REQUEST: ${activeModal.toUpperCase()}*\n`;
    message += `• Name: ${name}\n`;
    message += `• Company: ${company}\n`;
    message += `• Phone/WhatsApp: ${phone}\n`;
    message += `• Email: ${email}\n`;
    if (city) message += `• City: ${city}\n`;
    if (notes) message += `• Message: ${notes}\n`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNum}?text=${encoded}`, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setActiveModal(null);
      setSubmitted(false);
    }, 1500);
  };

  const titles: Record<string, string> = {
    catalogue: 'Download B2B Wholesale Catalogue',
    dealer: 'Become Fortune Wholesale Distributor / Dealer',
    visit: 'Schedule Ludhiana Factory Visit',
    callback: 'Request Instant Executive Callback'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-lg bg-[#091126] border border-slate-700/80 rounded-3xl shadow-2xl p-6 md:p-8 text-white space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-serif font-bold text-lg text-white">
            {titles[activeModal] || 'B2B Wholesale Inquiry'}
          </h3>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
            <h4 className="font-serif font-bold text-lg text-white">Request Sent to WhatsApp!</h4>
            <p className="text-xs text-slate-300">
              Our Ludhiana team will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleQuickSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company / Store Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Fortune Retail Hub"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">City / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Ludhiana, Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                placeholder="buyer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Additional Details / Requirements</label>
              <textarea
                rows={2}
                placeholder="Expected volume, specific categories needed..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-emerald-500 text-slate-950 font-extrabold text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Send className="w-4 h-4" /> SUBMIT TO WHATSAPP (+91 75288 02003)
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
