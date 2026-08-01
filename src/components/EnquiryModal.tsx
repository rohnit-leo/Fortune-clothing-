import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  MessageCircle, 
  Building2, 
  MapPin, 
  Clock, 
  Sparkles
} from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const { activeModal, setActiveModal, cart, cartTotalQuantity, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    gstNumber: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    expectedQuantity: `${cartTotalQuantity || 24} Pcs`,
    deliveryTimeline: 'Within 7-10 Days',
    message: '',
    referenceUrl: ''
  });

  if (activeModal !== 'enquiry') return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct beautifully formatted WhatsApp Message
    let cartSummaryText = "";
    if (cart.length > 0) {
      cartSummaryText = cart.map((item, idx) => {
        const sizesText = Object.entries(item.sizeQuantities)
          .filter(([_, q]) => (q as number) > 0)
          .map(([s, q]) => `${s}:${q}pcs`)
          .join(', ');

        return `${idx + 1}. *${item.product.name}* (${item.product.code})\n   - Color: ${item.selectedColor.name}\n   - GSM: ${item.product.gsm} GSM | Fabric: ${item.product.fabric}\n   - Sizes: ${sizesText}\n   - Subtotal: *${item.totalQuantity} Pcs*`;
      }).join('\n\n');
    } else {
      cartSummaryText = "General B2B Wholesale Enquiry";
    }

    const whatsappMessage = 
`*NEW B2B WHOLESALE ENQUIRY - FORTUNE CLOTHING*
----------------------------------------
*CUSTOMER DETAILS:*
• Name: ${formData.fullName}
• Company: ${formData.companyName || 'N/A'}
• GSTIN: ${formData.gstNumber || 'N/A'}
• Phone: ${formData.phone}
• WhatsApp: ${formData.whatsapp || formData.phone}
• Email: ${formData.email}

*DELIVERY LOCATION:*
• Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}, ${formData.country}

*ORDER REQUIREMENTS:*
• Expected Qty: ${formData.expectedQuantity}
• Target Timeline: ${formData.deliveryTimeline}
• Notes: ${formData.message || 'None'}
• Reference: ${formData.referenceUrl || 'None'}

----------------------------------------
*CART PRODUCTS SUMMARY (${cartTotalQuantity} Pcs Total):*

${cartSummaryText}

----------------------------------------
_Generated via Fortune Clothing Company B2B Portal_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/917528802003?text=${encodedMessage}`;

    // Clear cart & open WhatsApp
    clearCart();
    setActiveModal(null);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans overflow-y-auto">
      
      <div 
        onClick={() => setActiveModal(null)} 
        className="absolute inset-0 cursor-pointer" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 z-10 my-8 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#0F172A] text-white p-6 flex items-center justify-between border-b border-gray-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> B2B Factory Direct Checkout
            </div>
            <h3 className="font-serif font-normal text-xl text-white">
              Send Official Wholesale Quotation Enquiry
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 font-sans font-normal">
              Enter business details to generate an instant WhatsApp dispatch quote directly with Ludhiana Factory Desk.
            </p>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto bg-white text-gray-900">
          
          {/* Section 1: Business Details */}
          <div className="space-y-3">
            <div className="text-xs font-syne font-normal uppercase tracking-wider text-[#0F172A] border-b border-gray-100 pb-1.5 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C5A059]" /> 1. Contact & Business Identity
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-700 font-normal mb-1">Full Name *</label>
                <input 
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">Company / Brand Name</label>
                <input 
                  type="text"
                  name="companyName"
                  placeholder="e.g. Apex Apparel House"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">GST Number (Optional for Tax Credit)</label>
                <input 
                  type="text"
                  name="gstNumber"
                  placeholder="e.g. 03AWNPV5250E3ZE"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-mono font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">Phone Number *</label>
                <input 
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +91 98140 12345"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">WhatsApp Number *</label>
                <input 
                  type="tel"
                  name="whatsapp"
                  required
                  placeholder="e.g. +91 98140 12345"
                  value={formData.whatsapp || formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">Email Address *</label>
                <input 
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. rajesh@apexapparel.in"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Address */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-syne font-normal uppercase tracking-wider text-[#0F172A] border-b border-gray-100 pb-1.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059]" /> 2. Dispatch Address & Shipping Destination
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-normal mb-1">Street Address / Warehouse Location *</label>
                <input 
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. Plot 45, Industrial Focal Point"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">City *</label>
                <input 
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. New Delhi"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">State *</label>
                <input 
                  type="text"
                  name="state"
                  required
                  placeholder="e.g. Delhi NCR"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">Pincode *</label>
                <input 
                  type="text"
                  name="pincode"
                  required
                  placeholder="e.g. 110020"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-mono font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">Country *</label>
                <input 
                  type="text"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Quantity & Timeline */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-syne font-normal uppercase tracking-wider text-[#0F172A] border-b border-gray-100 pb-1.5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A059]" /> 3. Target Timeline & Order Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-700 font-normal mb-1">Expected Total Quantity</label>
                <input 
                  type="text"
                  name="expectedQuantity"
                  value={formData.expectedQuantity}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-normal mb-1">Delivery Timeline Needed</label>
                <select
                  name="deliveryTimeline"
                  value={formData.deliveryTimeline}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                >
                  <option value="Immediate Ready Stock (3-5 Days)">Immediate Ready Stock (3-5 Days)</option>
                  <option value="Standard Batch (7-10 Days)">Standard Batch (7-10 Days)</option>
                  <option value="Custom Private Labeling (12-15 Days)">Custom Private Labeling (12-15 Days)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-normal mb-1">Customization Requirements / Notes</label>
                <textarea 
                  name="message"
                  rows={2}
                  placeholder="Specify neck label preference, puff printing, or special fabric requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#0F172A] focus:bg-white font-normal"
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-emerald-600 text-white font-syne font-normal text-xs uppercase tracking-[0.2em] py-4 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>SEND ENQUIRY VIA WHATSAPP (+91 75288 02003)</span>
            </button>

            <p className="text-[11px] text-gray-500 text-center font-normal">
              Clicking Send Enquiry opens WhatsApp with your pre-filled B2B quote breakdown for instant Ludhiana factory processing.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
