import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { BrandStoryScroll } from './components/BrandStoryScroll';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { FabricExplorer } from './components/FabricExplorer';
import { ManufacturingPipeline } from './components/ManufacturingPipeline';
import { QualityHotspots } from './components/QualityHotspots';
import { PanIndiaLogistics } from './components/PanIndiaLogistics';
import { WholesaleCalculators } from './components/WholesaleCalculators';
import { PrivateLabelRoadmap } from './components/PrivateLabelRoadmap';
import { CartDrawer } from './components/CartDrawer';
import { EnquiryModal } from './components/EnquiryModal';
import { ComparisonModal } from './components/ComparisonModal';
import { QuickForms } from './components/QuickForms';
import { LiveEnquiryTracker } from './components/LiveEnquiryTracker';
import { FloatingCtaMenu } from './components/FloatingCtaMenu';
import { SeoStructuredData } from './components/SeoStructuredData';
import { PRODUCTS } from './data/products';
import { 
  PhoneCall, 
  MessageSquare, 
  ChevronDown, 
  Filter, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Factory, 
  HelpCircle,
  Download,
  ArrowRight
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab,
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    quickViewProduct, 
    setQuickViewProduct,
    setActiveModal
  } = useCart();

  const [gsmFilter, setGsmFilter] = useState<number>(150);
  const [selectedFit, setSelectedFit] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter products
  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchFabric = p.fabric.toLowerCase().includes(q);
      const matchCode = p.code.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchFabric && !matchCode && !matchCat) return false;
    }
    if (p.gsm < gsmFilter) return false;
    if (selectedFit !== 'All' && !p.fitType.toLowerCase().includes(selectedFit.toLowerCase())) return false;
    return true;
  });

  const faqs = [
    {
      q: 'What is the Minimum Order Quantity (MOQ) for wholesale orders?',
      a: 'Our standard MOQ is 100 pieces per style/color for stock fabrics (e.g., 240 GSM tees, 330 GSM fleece sweatshirts). For custom dyed colors or special fabrics, MOQ is 300 to 500 pieces per colorway.'
    },
    {
      q: 'Do you provide GST tax invoices for business accounting?',
      a: 'Yes, Fortune Clothing Company provides 100% compliant GST invoices (GSTIN: 03AWNPV5250E3ZE) with full e-way bill transport documentation for input tax credit claiming across India.'
    },
    {
      q: 'Can we inspect samples before placing a bulk manufacturing order?',
      a: 'Absolutely. We dispatch physical sample swatches or prototype sample garments within 3 to 5 business days so your team can verify handfeel, fit, stitching density, and print quality.'
    },
    {
      q: 'What customization options do you support for private labels?',
      a: 'We offer complete OEM/ODM solutions including screen printing (plastisol/waterbase), high-density 3D puff print, custom woven neck labels, hangtags, wash care labels, custom polybag packaging, and barcode labeling.'
    },
    {
      q: 'What are your dispatch timelines across India?',
      a: 'Stock wholesale orders are dispatched from our Ludhiana facility within 3 to 5 business days. Custom private label production runs take 7 to 12 business days depending on volume.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#050A1A] text-white relative">
      
      {/* Global Grain Texture Overlay for Artistic Flair Theme */}
      <div 
        className="fixed inset-0 opacity-[0.035] pointer-events-none z-50" 
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" 
        }} 
      />

      {/* DEDICATED PRODUCT DETAILS PAGE VIEW */}
      {activeTab === 'product-detail' && (
        <ProductDetailPage 
          product={quickViewProduct || PRODUCTS[0]} 
          onBack={() => setActiveTab('catalogue')} 
        />
      )}

      {/* HOME PAGE VIEW */}
      {activeTab === 'home' && (
        <>
          <Hero />
          
          {/* High-End Scroll Trigger Video Revealing Brand Story Details */}
          <BrandStoryScroll />

          <CategoryShowcase />

          {/* Featured Wholesale Catalogue Spotlight */}
          <section className="py-20 px-4 lg:px-8 bg-[#050A1A]">
            <div className="max-w-7xl mx-auto space-y-10">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059] mb-2">
                    <Layers className="w-3.5 h-3.5 text-[#C5A059]" /> High-Demand Wholesale Matrix
                  </div>
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">
                    Featured Garment Models
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  {['All', 'T-Shirts', 'Hoodies', 'Sweatshirts', 'Winter Wear'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                      className={`px-4 py-2 rounded-lg transition cursor-pointer text-[10px] uppercase tracking-[0.2em] font-bold ${
                        (cat === 'All' && !selectedCategory) || selectedCategory === cat
                          ? 'bg-[#C5A059] text-[#050A1A] font-extrabold shadow-lg'
                          : 'bg-[#0A152E] text-slate-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.slice(0, 8).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

            </div>
          </section>

          <FabricExplorer />
          <ManufacturingPipeline />
          <QualityHotspots />
          <WholesaleCalculators />
          <PanIndiaLogistics />
          <PrivateLabelRoadmap />

          {/* FAQ Section */}
          <section className="py-20 px-4 lg:px-8 bg-[#030712] border-t border-white/10">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">
                  <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" /> B2B Knowledge Hub
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs md:text-sm text-slate-400">
                  Clear answers regarding Fortune Clothing Company’s wholesale terms, MOQs, custom branding, and Ludhiana dispatch.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-[#0A152E] border border-white/10 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm md:text-base text-white hover:text-[#C5A059] transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-[#C5A059] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/10">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CATALOGUE PAGE VIEW */}
      {activeTab === 'catalogue' && (
        <section className="py-12 px-4 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A152E] border border-white/10 p-6 rounded-3xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">
                  Factory Direct Catalogue
                </span>
                <h1 className="font-serif text-2xl md:text-4xl font-bold text-white mt-1">
                  {selectedCategory ? `${selectedCategory} Wholesale` : 'Full Wholesale Garment Matrix'}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Showing {filteredProducts.length} verified B2B garment models. Select sizes & colors to generate a WhatsApp quotation.
                </p>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-bold text-[#C5A059] hover:underline uppercase tracking-wider text-[10px]"
              >
                Reset Category Filters
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-[#0A152E] border border-white/10 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <Filter className="w-4 h-4 text-[#C5A059]" /> Min GSM Filter:
                </span>
                <input
                  type="range"
                  min="180"
                  max="420"
                  step="20"
                  value={gsmFilter}
                  onChange={(e) => setGsmFilter(parseInt(e.target.value))}
                  className="accent-[#C5A059] bg-slate-800"
                />
                <span className="font-mono text-[#C5A059] font-bold">{gsmFilter}+ GSM</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 uppercase text-[10px] tracking-wider">Fit Silhouette:</span>
                {['All', 'Oversized', 'Classic', 'Tapered'].map(fit => (
                  <button
                    key={fit}
                    onClick={() => setSelectedFit(fit)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                      selectedFit === fit ? 'bg-[#C5A059] text-[#050A1A]' : 'bg-[#121c33] text-slate-400 hover:text-white'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalogue Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* PRIVATE LABEL PAGE VIEW */}
      {activeTab === 'privatelabel' && (
        <section className="py-12">
          <PrivateLabelRoadmap />
          <FabricExplorer />
        </section>
      )}

      {/* FACTORY INFRASTRUCTURE VIEW */}
      {activeTab === 'factory' && (
        <section className="py-12">
          <ManufacturingPipeline />
          <QualityHotspots />
        </section>
      )}

      {/* B2B CALCULATOR VIEW */}
      {activeTab === 'calculator' && (
        <section className="py-12">
          <WholesaleCalculators />
        </section>
      )}

      {/* ORDER TRACKER VIEW */}
      {activeTab === 'tracker' && (
        <section className="py-12">
          <LiveEnquiryTracker />
        </section>
      )}

      {/* Smart Expandable Floating Speed Dial Menu */}
      <FloatingCtaMenu />

      {/* Modals & Drawers */}
      <CartDrawer />
      <EnquiryModal />
      <ComparisonModal />
      <QuickForms />

      {/* Structured SEO */}
      <SeoStructuredData />

    </main>
  );
};

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#050A18] text-white flex flex-col justify-between">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </CartProvider>
  );
}
