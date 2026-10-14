import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  ShieldCheck, 
  Phone, 
  Sliders, 
  ChevronRight,
  Flame,
  Layers,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cartTotalQuantity, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setActiveTab,
    categories,
    siteConfig,
    setIsAdminOpen
  } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const whatsappPhone = siteConfig.whatsappNumber?.replace(/[^0-9]/g, '') || '917528802003';
  const callingPhone = siteConfig.phone || '+91 75288 02003';

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0A0A0A] text-white text-[10px] sm:text-xs font-semibold py-2 px-3 text-center tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 border-b border-gray-900 select-none">
        <span className="text-[#FFC72C] text-xs shrink-0">⚡</span>
        <span className="truncate">
          {siteConfig.announcementBanner || 'DIRECT FACTORY WHOLESALE • 100% GST INVOICE • PAN INDIA DISPATCH'}
        </span>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-2xs font-sans transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Hamburger Menu Icon */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2 sm:p-2.5 rounded-lg text-gray-800 hover:text-black hover:bg-gray-100 transition cursor-pointer"
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
            </button>
          </div>

          {/* Center: Brand Identity Logo (As shown in reference image) */}
          <div 
            onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none text-center"
          >
            {/* Elegant Circular Monogram Crest */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#C5A059] flex items-center justify-center bg-gradient-to-br from-amber-50 to-white shadow-2xs group-hover:scale-105 transition-transform shrink-0">
              <span className="font-serif font-bold text-[#C5A059] text-base sm:text-lg tracking-tighter">
                FC
              </span>
            </div>

            {/* Typography */}
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.18em] text-gray-900 leading-none group-hover:text-[#C5A059] transition-colors">
                FORTUNE
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-sans font-semibold tracking-[0.24em] text-gray-600 uppercase mt-0.5 leading-none">
                CLOTHING COMPANY
              </span>
              <span className="text-[7px] sm:text-[8px] font-sans font-bold tracking-[0.18em] text-[#C5A059] uppercase mt-0.5 leading-none">
                LUDHIANA WHOLESALE FACTORY
              </span>
            </div>
          </div>

          {/* Right Action Icons: Search, WhatsApp Circular, Shopping Cart with Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search Garments"
              className="p-2 sm:p-2.5 rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition cursor-pointer"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            </button>

            {/* WhatsApp Green Circular Icon Button */}
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hello Fortune Clothing Company, I am looking for Ludhiana factory wholesale garments.")}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xs transition hover:scale-105 active:scale-95"
            >
              <svg 
                className="w-5 h-5 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.54 1.769.88 2.8.88 3.179 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.766-5.771-5.766zm3.393 8.307c-.144.405-.837.774-1.17.824-.312.045-.694.076-2.072-.493-1.638-.675-2.678-2.339-2.758-2.447-.079-.108-.66-88-.66-1.678 0-.797.412-1.192.56-1.353.148-.161.323-.202.43-.202.107 0 .215.002.309.007.098.005.231-.038.36.273.133.322.457 1.114.497 1.196.041.082.068.178.014.286-.054.108-.082.176-.162.27-.081.096-.17.214-.243.287-.081.082-.166.171-.071.334.095.163.423.698.908 1.129.624.555 1.149.728 1.312.809.163.081.258.072.355-.039.096-.111.412-.48.522-.645.11-.164.22-.138.371-.082.152.055.962.454 1.127.536.165.082.275.123.315.191.041.069.041.401-.103.806z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.659 1.445 5.174L2 22l4.981-1.306C8.423 21.524 10.151 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.673 0-3.238-.475-4.571-1.298l-.328-.2-2.969.778.792-2.894-.214-.341C3.844 14.887 3.8 13.486 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.522 0 8.2 3.679 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z"/>
              </svg>
            </a>

            {/* Shopping Cart Icon with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Wholesale Cart"
              className="relative p-2 sm:p-2.5 rounded-full text-gray-800 hover:text-black hover:bg-gray-100 transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#C89B3C] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartTotalQuantity}
              </span>
            </button>

          </div>

        </div>

        {/* Quick Search Slide-down */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 bg-gray-50 p-3 sm:p-4 animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search T-shirts, Hoodies, Polos, GSM, Fabric..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#C89B3C]"
                  autoFocus
                />
              </div>
              <button
                onClick={() => {
                  setActiveTab('catalogue');
                  setIsSearchOpen(false);
                }}
                className="bg-[#111827] text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. SLIDE-OUT MOBILE / DESKTOP DRAWER MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center bg-white">
                  <span className="font-serif font-bold text-[#C5A059] text-xs">FC</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xs tracking-wider text-gray-900">FORTUNE</span>
                  <span className="text-[7px] text-[#C5A059] font-bold uppercase tracking-wider">WHOLESALE FACTORY</span>
                </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Admin Access Highlight */}
            <div className="p-3 bg-amber-50/70 border-b border-amber-200/60">
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-[#111827] hover:bg-black text-white p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-xs transition"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#FFC72C]" />
                  <span>Admin Management Panel</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <p className="text-[10px] text-gray-600 mt-1 text-center font-medium">
                Live database editor: update products, categories, hero & banner
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Shop by Category
                </span>
                <div className="mt-2 space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setActiveTab('catalogue');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-100 text-left text-xs font-bold text-gray-800 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-6 h-6 rounded-full object-cover bg-gray-200" />
                        ) : (
                          <Layers className="w-4 h-4 text-[#C5A059]" />
                        )}
                        <span>{cat.name}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Wholesale Sourcing
                </span>
                <div className="mt-2 space-y-1 text-xs font-semibold text-gray-700">
                  <button
                    onClick={() => {
                      setActiveTab('catalogue');
                      setSelectedCategory(null);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-gray-100 flex items-center justify-between"
                  >
                    <span>Full Wholesale Catalogue</span>
                    <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full text-gray-800">MOQ 24</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('home');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-gray-100"
                  >
                    Home Overview
                  </button>
                </div>
              </div>

              {/* Ludhiana Factory Info */}
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-[11px] space-y-1.5 text-gray-600">
                <div className="font-bold text-gray-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Fortune Clothing Company</span>
                </div>
                <p>Bahadur Ke Road, Hosiery Complex, Ludhiana, Punjab 141008</p>
                <p className="font-mono text-[10px] text-gray-500">GSTIN: 03AWNPV5250E3ZE</p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 grid grid-cols-2 gap-2">
              <a
                href={`tel:${callingPhone.replace(/[^0-9+]/g, '')}`}
                className="bg-[#111827] text-white p-2.5 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/${whatsappPhone}`}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white p-2.5 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
