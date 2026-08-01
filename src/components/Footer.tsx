import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Download,
  ShieldCheck,
  Globe,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setActiveTab, setActiveModal } = useCart();

  const LOGO_URL = "https://dmqvyrsbaszmina8.public.blob.vercel-storage.com/IMG_3190.PNG";

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-800 font-sans pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Feature Highlights Bar - Shopify Badge Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-200 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-syne font-normal text-xs uppercase text-gray-900 tracking-wider">100% Quality Inspected</div>
              <div className="text-[11px] text-gray-500 font-normal">AQL 2.5 Export Grade Audit</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="font-syne font-normal text-xs uppercase text-gray-900 tracking-wider">Pan India Express</div>
              <div className="text-[11px] text-gray-500 font-normal">Doorstep Freight & E-Way Bill</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-syne font-normal text-xs uppercase text-gray-900 tracking-wider">GST Tax Invoicing</div>
              <div className="text-[11px] text-gray-500 font-normal">100% Input Credit Compliant</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-[#C5A059] flex items-center justify-center shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <div className="font-syne font-normal text-xs uppercase text-gray-900 tracking-wider">Instant WhatsApp Desk</div>
              <div className="text-[11px] text-gray-500 font-normal">Direct Factory Representative</div>
            </div>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <img 
              src={LOGO_URL} 
              alt="Fortune Clothing Company Logo" 
              className="h-12 w-auto object-contain mb-2"
            />
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm font-normal">
              Fortune Clothing Company is a premier Ludhiana-based garment manufacturer and B2B wholesale supplier. We craft high-density 240+ GSM streetwear tees, 330+ GSM fleece hoodies, jackets, and custom private label lines for brands across India.
            </p>

            <div className="space-y-2 text-xs text-gray-700 font-normal pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F172A] shrink-0 mt-0.5" />
                <span>Ludhiana Hosiery & Textile Manufacturing Cluster, Punjab - 141008, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0F172A] shrink-0" />
                <span>+91 75288 02003 / +91 98140 12345</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0F172A] shrink-0" />
                <span>wholesale@fortuneclothing.in</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>GSTIN: <strong className="font-mono text-gray-900 font-normal">03AWNPV5250E3ZE</strong></span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Ludhiana+Textile+Hub"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-syne font-normal uppercase text-[#0F172A] hover:text-[#C5A059] transition"
              >
                <span>View Factory Location on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div className="space-y-3">
            <h4 className="font-syne font-normal text-xs text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">
              Wholesale Collections
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 font-normal">
              {[
                'T-Shirts',
                'Oversized T-Shirts',
                'Polo T-Shirts',
                'Sweatshirts',
                'Hoodies',
                'Tracksuits',
                'Lowers & Joggers',
                'Winter Wear'
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      setSelectedCategory(item.replace(' & Joggers', '') as any);
                      setActiveTab('catalogue');
                    }}
                    className="hover:text-[#0F172A] transition hover:translate-x-1 inline-block cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Services */}
          <div className="space-y-3">
            <h4 className="font-syne font-normal text-xs text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">
              B2B Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-600 font-normal">
              <li>
                <button onClick={() => setActiveTab('privatelabel')} className="hover:text-[#0F172A] transition cursor-pointer">
                  Private Label Manufacturing
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('factory')} className="hover:text-[#0F172A] transition cursor-pointer">
                  Factory Machinery & Capacity
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-[#0F172A] transition cursor-pointer">
                  Profit Margin Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-[#0F172A] transition cursor-pointer">
                  Track Live Order Status
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('sample')} className="hover:text-[#0F172A] transition cursor-pointer">
                  Request Sample Fabric Swatches
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('callback')} className="hover:text-[#0F172A] transition cursor-pointer">
                  Request Executive Callback
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Catalogue Download */}
          <div className="space-y-4">
            <h4 className="font-syne font-normal text-xs text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">
              Direct Wholesaler Updates
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Subscribe to get exclusive alerts on ready fabric lot clearance, new GSM introductions, and bulk seasonal rebates.
            </p>

            <button
              onClick={() => setActiveModal('sample')}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-syne font-normal uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#C5A059]" />
              Download B2B Lookbook
            </button>

            <a
              href="https://wa.me/917528802003"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-syne font-normal uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp Desk
            </a>
          </div>

        </div>

        {/* Bottom Copyright & NextureX Developer Credit */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-normal">
          <div>
            © {new Date().getFullYear()} Fortune Clothing Company. All Rights Reserved. Ludhiana, India.
          </div>

          {/* Prominent NextureX Developer Credit */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-xs text-gray-800">
            <span>Developed by</span>
            <a 
              href="https://nexturex.com" 
              target="_blank" 
              rel="noreferrer" 
              className="font-syne font-normal text-[#0F172A] hover:text-[#C5A059] transition flex items-center gap-1 underline underline-offset-2"
            >
              NextureX
              <ExternalLink className="w-3 h-3 text-[#C5A059]" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
