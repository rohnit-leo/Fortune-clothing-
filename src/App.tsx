import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { BrandStoryScroll } from './components/BrandStoryScroll';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { FabricExplorer } from './components/FabricExplorer';
import { ManufacturingPipeline } from './components/ManufacturingPipeline';
import { WhyChooseUs } from './components/WhyChooseUs';
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
import { AdminPanel } from './components/AdminPanel';
import { 
  ChevronDown, 
  Filter, 
  Layers, 
  HelpCircle,
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
    products,
    isAdminOpen
  } = useCart();

  const [gsmFilter, setGsmFilter] = useState<number>(180);
  const [selectedFit, setSelectedFit] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // If Admin URL #admin is accessed, show full Admin Panel view
  if (isAdminOpen) {
    return <AdminPanel />;
  }

  // Filter products from dynamic Firestore database
  const filteredProducts = products.filter(p => {
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
      a: 'Our standard MOQ is 24 pieces per style/colorway for stock fabrics (e.g., 240 GSM tees, 330 GSM fleece sweatshirts). For custom dyed colors or special tech pack designs, MOQ is 100 to 200 pieces.'
    },
    {
      q: 'Do you provide GST tax invoices for business accounting?',
      a: 'Yes, Fortune Clothing Company provides 100% compliant GST invoices (GSTIN: 03AWNPV5250E3ZE) with full e-way bill transport documentation for input tax credit claiming across India.'
    },
    {
      q: 'Can we inspect samples before placing a bulk manufacturing order?',
      a: 'Absolutely. We dispatch physical sample fabric swatches or prototype garments within 3 to 5 business days so your team can verify handfeel, fit, stitching density, and print quality.'
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
    <main className="min-h-screen bg-white text-gray-900 relative font-sans">

      {/* DEDICATED PRODUCT DETAILS PAGE VIEW */}
      {activeTab === 'product-detail' && (
        <ProductDetailPage 
          product={quickViewProduct || products[0]} 
          onBack={() => setActiveTab('catalogue')} 
        />
      )}

      {/* HOME PAGE VIEW */}
      {activeTab === 'home' && (
        <>
          <Hero />
          <CategoryShowcase />
          {/* NEW ARRIVALS 🔥 Section from Reference Image */}
          <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 select-none">
            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-xl font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                  <span>NEW ARRIVALS</span>
                  <span className="text-base">🔥</span>
                </h2>

                <button
                  onClick={() => {
                    setActiveTab('catalogue');
                    setSelectedCategory(null);
                  }}
                  className="flex items-center gap-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800 hover:text-[#C89B3C] transition cursor-pointer"
                >
                  <span>VIEW ALL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Cards Grid - 2 columns on mobile, 4 on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

            </div>
          </section>

          {/* WHY WHOLESALE BUYERS CHOOSE US */}
          <WhyChooseUs />

          {/* FROM FABRIC TO DISPATCH (Manufacturing Pipeline) */}
          <ManufacturingPipeline />
          <QualityHotspots />
          <WholesaleCalculators />
          <PanIndiaLogistics />
          <PrivateLabelRoadmap />

          {/* FAQ Section */}
          <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
                  <HelpCircle className="w-4 h-4 text-[#C5A059]" /> B2B Knowledge Hub
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-gray-600">
                  Clear answers regarding Fortune Clothing Company’s wholesale terms, MOQs, custom branding, and Ludhiana dispatch.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif font-normal text-sm sm:text-base text-gray-900 hover:text-[#0F172A] transition cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-[#C5A059] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 font-sans">
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
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-3xl">
              <div>
                <span className="text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
                  Factory Direct Catalogue
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl font-normal text-gray-900 mt-1">
                  {selectedCategory ? `${selectedCategory} Wholesale Collection` : 'Full Garment Matrix'}
                </h1>
                <p className="text-xs text-gray-600 mt-1">
                  Showing {filteredProducts.length} verified B2B garment models. Select sizes & colors to generate a WhatsApp quotation.
                </p>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-syne font-normal text-[#0F172A] hover:text-[#C5A059] uppercase tracking-wider text-[10px] cursor-pointer"
              >
                Reset All Category Filters
              </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-syne font-normal text-gray-800 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <Filter className="w-4 h-4 text-[#C5A059]" /> Min GSM Filter:
                </span>
                <input
                  type="range"
                  min="180"
                  max="420"
                  step="20"
                  value={gsmFilter}
                  onChange={(e) => setGsmFilter(parseInt(e.target.value))}
                  className="accent-[#0F172A] bg-gray-200"
                />
                <span className="font-mono text-[#0F172A] font-normal">{gsmFilter}+ GSM</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-500 uppercase text-[10px] font-syne font-normal tracking-wider">Fit Silhouette:</span>
                {['All', 'Oversized', 'Classic', 'Tapered'].map(fit => (
                  <button
                    key={fit}
                    onClick={() => setSelectedFit(fit)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-syne font-normal uppercase tracking-wider transition cursor-pointer ${
                      selectedFit === fit ? 'bg-[#0F172A] text-white' : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalogue Product Grid - 2 Columns on Mobile! */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* PRIVATE LABEL PAGE VIEW */}
      {activeTab === 'privatelabel' && (
        <section className="py-8 bg-white">
          <PrivateLabelRoadmap />
          <FabricExplorer />
        </section>
      )}

      {/* FACTORY INFRASTRUCTURE VIEW */}
      {activeTab === 'factory' && (
        <section className="py-8 bg-white">
          <ManufacturingPipeline />
          <QualityHotspots />
        </section>
      )}

      {/* B2B CALCULATOR VIEW */}
      {activeTab === 'calculator' && (
        <section className="py-8 bg-white">
          <WholesaleCalculators />
        </section>
      )}

      {/* ORDER TRACKER VIEW */}
      {activeTab === 'tracker' && (
        <section className="py-8 bg-white">
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
      <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between font-sans">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </CartProvider>
  );
}
