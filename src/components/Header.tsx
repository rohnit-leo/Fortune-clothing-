import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Scale, 
  Menu, 
  X, 
  MessageCircle,
  User,
  ChevronDown
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
    activeTab,
    wishlist,
    compareList,
    setIsCompareModalOpen,
    setActiveModal
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const LOGO_URL = "https://dmqvyrsbaszmina8.public.blob.vercel-storage.com/IMG_3190.PNG";

  const categories = [
    'T-Shirts',
    'Oversized T-Shirts',
    'Polo T-Shirts',
    'Sweatshirts',
    'Hoodies',
    'Tracksuits',
    'Lowers',
    'Joggers',
    'Jackets',
    'Winter Wear'
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm font-sans transition-all">
      
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Pure Light Shopify Style */}
        <div 
          onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <img 
            src={LOGO_URL} 
            alt="Fortune Clothing Company Logo" 
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-normal tracking-wide text-gray-800">
          <button 
            onClick={() => { setActiveTab('home'); setSelectedCategory(null); }}
            className={`hover:text-[#C5A059] transition py-1 cursor-pointer uppercase font-syne text-[11px] tracking-widest ${activeTab === 'home' && !selectedCategory ? 'text-[#0F172A] border-b-2 border-[#C5A059]' : ''}`}
          >
            Home
          </button>

          {/* Categories Mega Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => { setActiveTab('catalogue'); setIsCategoryDropdownOpen(!isCategoryDropdownOpen); }}
              className={`flex items-center gap-1 hover:text-[#C5A059] transition py-1 cursor-pointer uppercase font-syne text-[11px] tracking-widest ${activeTab === 'catalogue' ? 'text-[#0F172A] border-b-2 border-[#C5A059]' : ''}`}
            >
              <span>Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
            </button>

            <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059] px-3 py-1.5 border-b border-gray-100">
                Wholesale Garment Categories
              </div>
              <div className="py-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveTab('catalogue');
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-normal text-gray-700 hover:text-[#0F172A] hover:bg-gray-50 rounded-lg transition flex items-center justify-between"
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] font-mono text-gray-400">24+ MOQ</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => { setActiveTab('catalogue'); setSelectedCategory(null); }}
            className={`hover:text-[#C5A059] transition py-1 cursor-pointer uppercase font-syne text-[11px] tracking-widest ${activeTab === 'catalogue' && !selectedCategory ? 'text-[#0F172A] border-b-2 border-[#C5A059]' : ''}`}
          >
            Catalogue
          </button>

          <button 
            onClick={() => setActiveTab('privatelabel')}
            className={`hover:text-[#C5A059] transition py-1 cursor-pointer uppercase font-syne text-[11px] tracking-widest ${activeTab === 'privatelabel' ? 'text-[#0F172A] border-b-2 border-[#C5A059]' : ''}`}
          >
            Private Label
          </button>

          <button 
            onClick={() => setActiveTab('factory')}
            className={`hover:text-[#C5A059] transition py-1 cursor-pointer uppercase font-syne text-[11px] tracking-widest ${activeTab === 'factory' ? 'text-[#0F172A] border-b-2 border-[#C5A059]' : ''}`}
          >
            Factory
          </button>

          <button 
            onClick={() => setActiveTab('calculator')}
            className={`hover:text-[#C5A059] transition py-1 cursor-pointer uppercase font-syne text-[11px] tracking-widest ${activeTab === 'calculator' ? 'text-[#0F172A] border-b-2 border-[#C5A059]' : ''}`}
          >
            Margin Calculator
          </button>

          <button 
            onClick={() => setActiveTab('tracker')}
            className={`hover:text-[#C5A059] transition py-1 cursor-pointer uppercase font-syne text-[11px] tracking-widest ${activeTab === 'tracker' ? 'text-[#0F172A] border-b-2 border-[#C5A059]' : ''}`}
          >
            Order Tracker
          </button>
        </nav>

        {/* Right Search & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Live Search Input */}
          <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-3.5 py-1.5 w-44 lg:w-56 focus-within:border-[#0F172A] focus-within:bg-white transition shadow-inner">
            <Search className="w-3.5 h-3.5 text-gray-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search GSM, Tees, Hoodies..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalogue') setActiveTab('catalogue');
              }}
              className="bg-transparent text-xs text-gray-900 placeholder-gray-400 focus:outline-none w-full font-normal"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600 text-xs">
                ✕
              </button>
            )}
          </div>

          {/* Compare Button */}
          <button 
            onClick={() => setIsCompareModalOpen(true)}
            className="hidden sm:flex relative p-2.5 text-gray-600 hover:text-[#0F172A] hover:bg-gray-100 transition rounded-full cursor-pointer shrink-0"
            title="Compare Garments"
          >
            <Scale className="w-4 h-4" />
            {compareList.length > 0 && (
              <span className="absolute top-1 right-1 bg-[#0F172A] text-white text-[9px] font-mono font-normal w-4 h-4 rounded-full flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button 
            onClick={() => { setActiveTab('catalogue'); }}
            className="hidden sm:flex relative p-2.5 text-gray-600 hover:text-[#0F172A] hover:bg-gray-100 transition rounded-full cursor-pointer shrink-0"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-mono font-normal w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account Icon */}
          <button 
            onClick={() => setActiveModal('callback')}
            className="hidden sm:flex relative p-2.5 text-gray-600 hover:text-[#0F172A] hover:bg-gray-100 transition rounded-full cursor-pointer shrink-0"
            title="B2B Customer Desk"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Shopify Style B2B Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white py-2.5 px-4 shadow-md hover:shadow-lg transition-all cursor-pointer rounded-full shrink-0 active:scale-95 border border-[#0F172A]"
            title="View B2B Wholesale Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            <span className="font-syne font-normal text-[11px] tracking-wider uppercase hidden sm:inline">
              B2B CART
            </span>
            <span className="bg-[#C5A059] text-[#0F172A] px-2 py-0.5 rounded-full text-[10px] font-mono font-normal shrink-0">
              {cartTotalQuantity}
            </span>
          </button>

          {/* Mobile Navigation Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#0F172A] rounded-lg cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Search */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search garments, GSM, fabric..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalogue') setActiveTab('catalogue');
              }}
              className="bg-transparent text-xs text-gray-900 placeholder-gray-400 focus:outline-none w-full"
            />
          </div>

          {/* Mobile Navigation Links */}
          <div className="grid grid-cols-2 gap-2 text-xs font-normal">
            <button 
              onClick={() => { setActiveTab('home'); setSelectedCategory(null); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 font-syne uppercase tracking-wider"
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveTab('catalogue'); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 font-syne uppercase tracking-wider"
            >
              Full Catalogue
            </button>
            <button 
              onClick={() => { setActiveTab('privatelabel'); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 font-syne uppercase tracking-wider"
            >
              Private Label
            </button>
            <button 
              onClick={() => { setActiveTab('factory'); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 font-syne uppercase tracking-wider"
            >
              Factory Infrastructure
            </button>
            <button 
              onClick={() => { setActiveTab('calculator'); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 font-syne uppercase tracking-wider"
            >
              Margin Calculator
            </button>
            <button 
              onClick={() => { setActiveTab('tracker'); setIsMobileMenuOpen(false); }}
              className="p-3 text-left rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 font-syne uppercase tracking-wider"
            >
              Live Order Tracker
            </button>
          </div>

          {/* Category Chips in Mobile Menu */}
          <div className="pt-2 border-t border-gray-100">
            <div className="text-[10px] font-syne font-normal text-gray-400 uppercase tracking-widest mb-2">
              Browse Categories
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveTab('catalogue');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[11px] bg-gray-100 hover:bg-[#0F172A] hover:text-white px-3 py-1.5 rounded-lg text-gray-700 transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp Direct Action */}
          <a
            href="https://wa.me/917528802003"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-syne font-normal text-xs uppercase tracking-wider shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            Connect via WhatsApp Factory Desk
          </a>

        </div>
      )}

    </header>
  );
};
