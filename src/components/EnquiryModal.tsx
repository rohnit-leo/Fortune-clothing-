import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { EnquiryFormData } from '../types';
import { X, Send, PhoneCall, ShieldCheck, CheckCircle2, Building, User, Mail, MapPin, Calendar, FileText, Tag, Sparkles } from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, sendWhatsAppEnquiry, cart, cartTotalQuantity, clearCart } = useCart();

  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    companyName: '',
    businessType: 'Wholesaler',
    gstNumber: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    preferredContact: 'WhatsApp',
    expectedQuantity: cartTotalQuantity > 0 ? `${cartTotalQuantity} Pcs` : '500 Pcs',
    expectedOrderValue: 'To Be Quoted',
    requiredDeliveryDate: '',
    additionalRequirements: '',
    preferredFabric: '100% Combed Cotton / Fleece',
    brandName: '',
    customizationRequirements: 'Screen Printing & Custom Woven Labels'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendWhatsAppEnquiry(formData);
    setIsSubmitted(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#091126] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 text-white max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0D1836] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <h3 className="font-serif font-bold text-lg text-white">B2B Wholesale Quotation & Order Checkout</h3>
          </div>

          <button
            onClick={() => { setIsEnquiryModalOpen(false); setIsSubmitted(false); }}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-white">WhatsApp Enquiry Transmitted!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your prefilled wholesale enquiry and cart matrix has been automatically generated and sent to our Ludhiana headquarters at <strong>+91 75288 02003</strong>.
              </p>
              <button
                onClick={() => { setIsEnquiryModalOpen(false); setIsSubmitted(false); }}
                className="bg-[#D4AF37] text-slate-950 font-extrabold text-xs py-3 px-6 rounded-xl shadow-lg mt-4 cursor-pointer"
              >
                Return to Store
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Order Summary Strip */}
              {cart.length > 0 && (
                <div className="bg-[#0E1836] border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-amber-300 font-bold uppercase block">Cart Summary ({cart.length} Items)</span>
                    <span className="text-slate-300 font-mono">{cartTotalQuantity} Total Pieces Selected</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                    Direct WhatsApp Dispatch
                  </span>
                </div>
              )}

              {/* Section 1: Customer & Business Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Building className="w-4 h-4" /> 1. Customer & Business Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Company / Firm Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Apparel Wholesale Pvt Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Business Type *</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="Wholesaler">Wholesaler</option>
                      <option value="Retail Chain">Retail Chain Store</option>
                      <option value="Fashion Brand">Fashion Apparel Brand</option>
                      <option value="E-commerce Seller">E-commerce Seller / Amazon</option>
                      <option value="Corporate">Corporate Gifting Buyer</option>
                      <option value="Exporter">Exporter</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">GST Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 03AWNPV5250E3ZE"
                      value={formData.gstNumber}
                      onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] border-b border-slate-800 pb-2 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" /> 2. Contact & Communication
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Delivery Address */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] border-b border-slate-800 pb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 3. Delivery Address & Shipping Location
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">Complete Warehouse Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Street, Industrial Area, Landmark"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Specifications & Customization */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> 4. Custom Branding & Manufacturing Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Private Label Brand Name (If Any)</label>
                    <input
                      type="text"
                      placeholder="e.g. Urban Thread Co."
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Required Delivery Date</label>
                    <input
                      type="date"
                      value={formData.requiredDeliveryDate}
                      onChange={(e) => setFormData({ ...formData, requiredDeliveryDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-semibold mb-1">Custom Printing, Embroidery & Packaging Requirements</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. High density puff print on chest, custom woven neck label, polybag barcode sticker..."
                      value={formData.customizationRequirements}
                      onChange={(e) => setFormData({ ...formData, customizationRequirements: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-emerald-500 text-slate-950 font-black text-sm py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-5 h-5" /> SEND ENQUIRY TO WHATSAPP (+91 75288 02003)
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Clicking "Send Enquiry" automatically populates all cart items and buyer details into WhatsApp.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
