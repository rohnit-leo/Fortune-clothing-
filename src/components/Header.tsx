import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  Scale, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Calculator, 
  Layers
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cartTotalQuantity, 
    wishlist, 
    compareList, 
    setIsCartOpen, 
    setIsCompareModalOpen, 
    activeTab, 
    setActiveTab, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const categories = [
    'T-Shirts', 'Sweatshirts', 'Hoodies', 'Jackets',
    'Lowers', 'Joggers', 'Tracksuits', 'Winter Wear'
  ];

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setActiveTab('catalogue');
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const LOGO_SYMBOL_URL = "https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/IMG_3157.PNG";

  return (
    <header className="sticky top-0 z-50 bg-[#050A1A]/95 backdrop-blur-md border-b border-white/10 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Name - Real Symbol & High Fashion Serif */}
        <div 
          onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300">
            <img 
              src={LOGO_SYMBOL_URL} 
              alt="Fortune Clothing Symbol" 
              className="h-full w-full object-contain filter drop-shadow"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-[16px] sm:text-[22px] font-bold tracking-[0.15em] sm:tracking-[0.2em] leading-none text-white group-hover:text-[#C5A059] transition">
              FORTUNE
            </span>
            <span className="text-[8px] sm:text-[9px] font-syne tracking-[0.25em] sm:tracking-[0.4em] text-[#C5A059] uppercase mt-0.5 sm:mt-1 font-semibold">
              Clothing Co.
            </span>
          </div>
        </div>

        {/* Nav Links Desktop - Tracked Editorial Style */}
        <nav className="hidden lg:flex items-center gap-7 text-[10px] font-syne tracking-[0.2em] font-semibold uppercase text-slate-300">
          <button 
            onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
            className={`hover:text-[#C5A059] transition cursor-pointer py-2 border-b border-transparent ${activeTab === 'home' ? 'text-[#C5A059] font-bold border-[#C5A059]' : ''}`}
          >
            Home
          </button>

          {/* Mega Menu Dropdown Trigger */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button 
              onClick={() => { setActiveTab('catalogue'); setSelectedCategory(null); }}
              className={`hover:text-[#C5A059] transition cursor-pointer flex items-center gap-1 ${activeTab === 'catalogue' ? 'text-[#C5A059] font-bold' : ''}`}
            >
              Wholesale Catalogue <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Mega Menu Overlay */}
            {isMegaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] bg-[#0A152E] border border-white/10 rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 z-50 text-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="col-span-2">
                  <p className="text-[10px] font-syne uppercase font-bold tracking-[0.3em] text-[#C5A059] mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C5A059]" /> Garment Categories
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className="text-left px-3 py-2 rounded-lg text-xs font-medium hover:bg-[#121c33] hover:text-[#C5A059] transition flex items-center justify-between group"
                      >
                        <span>{cat}</span>
                        <span className="text-[9px] text-slate-500 font-mono group-hover:text-[#C5A059]">MOQ 100 Pcs</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#121c33] to-[#050A1A] border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30">
                      Custom OEM / ODM
                    </span>
                    <h4 className="font-cinzel font-bold text-white text-sm mt-3">Private Label Manufacturing</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Tech packs, custom branding tags & Pantone-matched fabrics.
                    </p>
                  </div>
                  <button
                    onClick={() => { setActiveTab('privatelabel'); setIsMegaMenuOpen(false); }}
                    className="mt-4 text-xs font-semibold text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer tracking-wider uppercase text-[10px] font-syne"
                  >
                    Explore OEM Roadmap →
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => setActiveTab('privatelabel')}
            className={`hover:text-[#C5A059] transition cursor-pointer ${activeTab === 'privatelabel' ? 'text-[#C5A059] font-bold border-b border-[#C5A059]' : ''}`}
          >
            Private Label
          </button>

          <button 
            onClick={() => setActiveTab('factory')}
            className={`hover:text-[#C5A059] transition cursor-pointer ${activeTab === 'factory' ? 'text-[#C5A059] font-bold border-b border-[#C5A059]' : ''}`}
          >
            Manufacturing
          </button>

          <button 
            onClick={() => setActiveTab('calculator')}
            className={`hover:text-[#C5A059] transition cursor-pointer flex items-center gap-1 ${activeTab === 'calculator' ? 'text-[#C5A059] font-bold' : ''}`}
          >
            <Calculator className="w-3.5 h-3.5 text-[#C5A059]" /> B2B Engine
          </button>

          <button 
            onClick={() => setActiveTab('tracker')}
            className={`hover:text-[#C5A059] transition cursor-pointer ${activeTab === 'tracker' ? 'text-[#C5A059] font-bold' : ''}`}
          >
            Order Tracker
          </button>
        </nav>

        {/* Action Icons & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Live Search Input */}
          <div className="hidden md:flex items-center bg-[#0a152e] border border-white/10 rounded-full px-3.5 py-1.5 w-36 xl:w-52 focus-within:border-[#C5A059] transition">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search GSM, Tees..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 0 && activeTab !== 'catalogue') {
                  setActiveTab('catalogue');
                }
              }}
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full font-sans"
            />
          </div>

          {/* Compare Button - Hidden on tiny screens, shown on sm+ */}
          <button 
            onClick={() => setIsCompareModalOpen(true)}
            className="hidden xs:flex relative p-2 text-slate-300 hover:text-[#C5A059] transition rounded-lg hover:bg-white/5 cursor-pointer shrink-0"
            title="Compare Garments"
          >
            <Scale className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#050A1A] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Button - Hidden on tiny screens, shown on sm+ */}
          <button 
            onClick={() => { setActiveTab('catalogue'); }}
            className="hidden xs:flex relative p-2 text-slate-300 hover:text-[#C5A059] transition rounded-lg hover:bg-white/5 cursor-pointer shrink-0"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Premium B2B Cart Button - Guaranteed Un-cropped Layout */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 sm:gap-2 bg-[#C5A059] hover:bg-white text-[#050A1A] py-2 sm:py-2.5 px-2.5 sm:px-4 shadow-xl transition-all cursor-pointer rounded-xl shrink-0 whitespace-nowrap active:scale-95"
            title="View B2B Wholesale Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#050A1A]" />
            <span className="font-syne font-extrabold text-[10px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.2em]">
              <span className="hidden sm:inline">B2B </span>CART
            </span>
            <span className="bg-[#050A1A] text-[#C5A059] px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0">
              {cartTotalQuantity}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-slate-200 hover:text-[#C5A059] shrink-0 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#050A1A] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center bg-[#0a152e] border border-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search products, GSM..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalogue') setActiveTab('catalogue');
              }}
              className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
            />
          </div>

          <div className="flex flex-col space-y-3 font-medium text-slate-200 text-xs uppercase tracking-wider font-syne">
            <button onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#C5A059]">
              Home
            </button>
            <button onClick={() => { setActiveTab('catalogue'); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#C5A059]">
              Wholesale Catalogue
            </button>
            <div className="pl-4 grid grid-cols-2 gap-2 text-xs text-slate-400 border-l border-slate-800">
              {categories.map(cat => (
                <button key={cat} onClick={() => handleCategoryClick(cat)} className="text-left py-1 hover:text-[#C5A059]">
                  • {cat}
                </button>
              ))}
            </div>
            <button onClick={() => { setActiveTab('privatelabel'); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#C5A059]">
              Private Label Manufacturing
            </button>
            <button onClick={() => { setActiveTab('factory'); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#C5A059]">
              Manufacturing
            </button>
            <button onClick={() => { setActiveTab('calculator'); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#C5A059]">
              B2B Calculator
            </button>
            <button onClick={() => { setActiveTab('tracker'); setIsMobileMenuOpen(false); }} className="text-left py-1 hover:text-[#C5A059]">
              Order Tracker
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
