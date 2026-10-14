import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Product, CategoryItem, ProductColor, WholesaleTier, SiteConfig } from '../types';
import { compressImageFile } from '../lib/firebase';
import { resolveImageUrl, handleImageError, DEFAULT_PRODUCT_IMAGE } from '../utils/imageUrl';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Layers, 
  Check, 
  X, 
  Search, 
  Eye, 
  Star, 
  Tag, 
  RefreshCw, 
  Save, 
  ArrowLeft, 
  Database, 
  Palette, 
  CheckCircle2,
  ChevronRight,
  Home,
  Sliders,
  FolderPlus,
  ExternalLink,
  MessageCircle,
  PackageCheck,
  AlertCircle
} from 'lucide-react';

const STANDARD_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', 'Free Size'];

const PRESET_FABRIC_IMAGES = [
  { name: 'Oversized Tee (Beige)', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Black Heavyweight Tee', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Brushed Fleece Hoodie', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Black Streetwear Hoodie', url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1200' },
  { name: 'French Terry Sweatshirt', url: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Sherpa Winter Jacket', url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Coordinated Tracksuit', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Heavy French Terry Jogger', url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=1200' }
];

const PRESET_COLORS = [
  { name: 'Jet Black', hex: '#111827' },
  { name: 'Off White', hex: '#F8FAFC' },
  { name: 'Beige Cream', hex: '#E6D7C3' },
  { name: 'Sage Green', hex: '#708238' },
  { name: 'Olive Army', hex: '#4B5320' },
  { name: 'Heather Grey', hex: '#9CA3AF' },
  { name: 'Charcoal Dark', hex: '#374151' },
  { name: 'Navy Blue', hex: '#1E3A8A' },
  { name: 'Maroon Wine', hex: '#800000' },
  { name: 'Chocolate Brown', hex: '#4A2C2A' },
  { name: 'Dusty Rose', hex: '#DCAE96' },
  { name: 'Lavender Mist', hex: '#E6E6FA' }
];

export const AdminPanel: React.FC = () => {
  const { 
    products, 
    categories, 
    siteConfig, 
    saveProduct, 
    deleteProduct, 
    saveCategory, 
    deleteCategory, 
    saveSiteConfig,
    resetToDefaultCatalog,
    isFirebaseLive,
    setIsAdminOpen 
  } = useCart();

  // Navigation tab: 'products' | 'categories' | 'hero' | 'database'
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'hero' | 'database'>('products');
  
  // Selected category in product manager
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Product Edit/Create State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [productFormTab, setProductFormTab] = useState<'basics' | 'images' | 'colors_sizes' | 'pricing'>('basics');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Category Edit/Create State
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  // Site Config State
  const [tempConfig, setTempConfig] = useState<SiteConfig>(siteConfig);
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  useEffect(() => {
    setTempConfig(siteConfig);
  }, [siteConfig]);

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategoryTab === 'ALL' || p.category === selectedCategoryTab;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      p.name.toLowerCase().includes(q) || 
      p.code.toLowerCase().includes(q) || 
      p.fabric.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Current active category object if not 'ALL'
  const currentCategoryObj = categories.find(c => c.name === selectedCategoryTab);

  // ----------------------------------------------------
  // PRODUCT HANDLERS
  // ----------------------------------------------------
  const handleOpenNewProduct = (defaultCategory?: string) => {
    const targetCategory = defaultCategory || (selectedCategoryTab !== 'ALL' ? selectedCategoryTab : (categories[0]?.name || 'T-Shirts'));
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      code: `FCC-${Math.floor(100 + Math.random() * 900)}`,
      name: 'New Wholesale Garment',
      subtitle: '240 GSM 100% Super Combed Compact Cotton',
      category: targetCategory,
      gsm: 240,
      fabric: '100% Super Combed Compact Cotton',
      fitType: 'Oversized Streetwear Fit',
      moq: 24,
      blend: '100% Cotton Single Jersey',
      availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
      availableColors: [
        { name: 'Jet Black', hex: '#111827' },
        { name: 'Off White', hex: '#F8FAFC' },
        { name: 'Sage Green', hex: '#708238' }
      ],
      description: 'Factory-direct high-density knit fabric with reactive bio-wash treatment for supreme softness, zero pilling, and maximum color fastness.',
      features: [
        'High-gauge single jersey knit',
        'Bio-washed and silicone softened',
        'Reinforced shoulder-to-shoulder taping',
        'Azo-free reactive dyed (Zero color bleed)',
        'Pre-shrunk (Under 3% shrinkage)'
      ],
      customizationOptions: [
        'Custom High-Density 3D Puff Screen Print',
        'Woven Damask Neck Label Stitching',
        'Custom Heavyweight GSM Paper Hangtags',
        'Individual Barcoded Polybag Packaging'
      ],
      dispatchDays: '3-5 Days (Stock) / 7-10 Days (Custom)',
      wholesaleTiers: [
        { minQty: 24, maxQty: 99, pricePerPieceEst: '₹340', discountPct: 'Standard Tier' },
        { minQty: 100, maxQty: 499, pricePerPieceEst: '₹310', discountPct: '9% Vol Discount' },
        { minQty: 500, maxQty: 999, pricePerPieceEst: '₹285', discountPct: '16% Bulk Tier' },
        { minQty: 1000, maxQty: '5000+', pricePerPieceEst: '₹260', discountPct: '23% Mill Direct' }
      ],
      images: [PRESET_FABRIC_IMAGES[0].url],
      bestFor: ['Streetwear Brands', 'D2C Retailers', 'College Merchandising'],
      shrinkageRate: '< 3.0% (Steam Stabilized)',
      washingCare: 'Machine wash cold inside out, tumble dry low',
      badge: 'Factory Direct',
      stockStatus: 'in_stock',
      isFeatured: false,
      inHero: false
    };
    setEditingProduct(newProd);
    setProductFormTab('basics');
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    // Clone product to avoid modifying state directly
    setEditingProduct(JSON.parse(JSON.stringify(product)));
    setProductFormTab('basics');
    setIsProductModalOpen(true);
  };

  const handleDuplicateProduct = async (product: Product) => {
    const dup: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      code: `${product.code}-COPY`,
      name: `${product.name} (Copy)`,
      updatedAt: new Date().toISOString()
    };
    try {
      await saveProduct(dup);
      showToast(`Duplicated "${product.name}" successfully!`);
    } catch (e) {
      alert(`Error duplicating: ${e}`);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}" permanently from the website?`)) {
      try {
        await deleteProduct(product.id);
        showToast(`Deleted "${product.name}".`);
      } catch (e) {
        alert(`Error deleting product: ${e}`);
      }
    }
  };

  const handleToggleHeroProduct = async (product: Product) => {
    const updated = { ...product, inHero: !product.inHero };
    try {
      await saveProduct(updated);
      if (updated.inHero) {
        // Also update siteConfig heroFeaturedProductId
        await saveSiteConfig({ heroFeaturedProductId: product.id });
      }
      showToast(updated.inHero ? `"${product.name}" is now featured on Homepage Hero!` : `Removed "${product.name}" from Hero spotlight.`);
    } catch (e) {
      alert(`Error updating hero status: ${e}`);
    }
  };

  const handleSaveProductForm = async () => {
    if (!editingProduct) return;
    if (!editingProduct.name.trim()) {
      alert('Please enter a product title/name.');
      return;
    }
    setIsSavingProduct(true);
    try {
      await saveProduct(editingProduct);
      setIsSavingProduct(false);
      setIsProductModalOpen(false);
      showToast(`Saved product "${editingProduct.name}" to live website!`);
    } catch (e) {
      setIsSavingProduct(false);
      alert(`Failed to save product: ${e}`);
    }
  };

  // Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProduct) return;
    setIsUploadingImage(true);
    try {
      const newImgs = [...(editingProduct.images || [])];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const base64 = await compressImageFile(file, 1200, 0.85);
          newImgs.push(base64);
        }
      }
      setEditingProduct({ ...editingProduct, images: newImgs });
      showToast(`Uploaded ${files.length} photo(s)!`);
    } catch (err) {
      alert(`Image processing failed: ${err}`);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const [inputImageUrl, setInputImageUrl] = useState('');
  const handleAddImageUrl = () => {
    if (!inputImageUrl.trim() || !editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      images: [...(editingProduct.images || []), inputImageUrl.trim()]
    });
    setInputImageUrl('');
  };

  // ----------------------------------------------------
  // CATEGORY HANDLERS
  // ----------------------------------------------------
  const handleOpenNewCategory = () => {
    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: '',
      slug: '',
      description: 'Factory-direct wholesale apparel collection',
      image: PRESET_FABRIC_IMAGES[0].url,
      displayOrder: categories.length + 1
    };
    setEditingCategory(newCat);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category: CategoryItem) => {
    setEditingCategory(JSON.parse(JSON.stringify(category)));
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategoryForm = async () => {
    if (!editingCategory || !editingCategory.name.trim()) {
      alert('Please enter a category name.');
      return;
    }
    setIsSavingCategory(true);
    try {
      const slug = editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const catToSave = { ...editingCategory, slug: editingCategory.slug || slug };
      await saveCategory(catToSave);
      setIsSavingCategory(false);
      setIsCategoryModalOpen(false);
      showToast(`Category "${catToSave.name}" saved to website!`);
    } catch (e) {
      setIsSavingCategory(false);
      alert(`Failed to save category: ${e}`);
    }
  };

  const handleDeleteCategory = async (category: CategoryItem) => {
    const prodsCount = products.filter(p => p.category === category.name).length;
    if (window.confirm(`Delete category "${category.name}"? (${prodsCount} products currently assigned)`)) {
      try {
        await deleteCategory(category.id);
        if (selectedCategoryTab === category.name) {
          setSelectedCategoryTab('ALL');
        }
        showToast(`Category "${category.name}" deleted.`);
      } catch (e) {
        alert(`Error deleting category: ${e}`);
      }
    }
  };

  // ----------------------------------------------------
  // HOMEPAGE / SITE CONFIG HANDLERS
  // ----------------------------------------------------
  const handleSaveSiteConfigForm = async () => {
    setIsSavingConfig(true);
    try {
      await saveSiteConfig(tempConfig);
      setIsSavingConfig(false);
      showToast('Homepage settings permanently updated!');
    } catch (e) {
      setIsSavingConfig(false);
      alert(`Failed to save homepage settings: ${e}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans pb-24">
      
      {/* Top Fixed Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/30 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER NAVIGATION (LIGHT THEME) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-[#C5A059] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              FCC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-semibold text-slate-900 text-base sm:text-lg">
                  Fortune Clothing
                </h1>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-semibold border border-amber-300/60">
                  Admin Panel
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal">
                Direct Mill Content & Catalog Management
              </p>
            </div>
          </div>

          {/* Quick Actions & Live Badge */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Real-time Cloud Status */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs text-emerald-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isFirebaseLive ? 'Cloud DB Synced' : 'Database Ready'}</span>
            </div>

            {/* Quick Add Product Button */}
            <button
              onClick={() => handleOpenNewProduct()}
              className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C5A059]" />
              <span>Add Product</span>
            </button>

            {/* Exit to Public Website */}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              title="Return to Public Website View"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">View Website</span>
            </button>

          </div>

        </div>

        {/* Primary Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-slate-100 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#0F172A] text-[#0F172A] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-[#C5A059]" />
            <span>Products & Categories ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'categories'
                ? 'border-[#0F172A] text-[#0F172A] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4 text-[#C5A059]" />
            <span>Manage Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'hero'
                ? 'border-[#0F172A] text-[#0F172A] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4 text-[#C5A059]" />
            <span>Homepage & Hero Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'database'
                ? 'border-[#0F172A] text-[#0F172A] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Database className="w-4 h-4 text-[#C5A059]" />
            <span>Database Tools</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* ==================================================== */}
        {/* TAB 1: PRODUCTS & CATEGORIES MANAGER                 */}
        {/* ==================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Top Categories Filter & Category Action Pill Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-lg font-semibold text-slate-900">
                    Category Filter & Organization
                  </h2>
                  <p className="text-xs text-slate-500">
                    Select a category to view and manage products inside it
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenNewCategory}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 border border-slate-300 cursor-pointer"
                  >
                    <FolderPlus className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>+ New Category</span>
                  </button>

                  <button
                    onClick={() => handleOpenNewProduct(selectedCategoryTab !== 'ALL' ? selectedCategoryTab : undefined)}
                    className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-medium px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>+ Add Product</span>
                  </button>
                </div>
              </div>

              {/* Category Pills Slider */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                
                {/* All Products Tab */}
                <button
                  onClick={() => setSelectedCategoryTab('ALL')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                    selectedCategoryTab === 'ALL'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>All Categories</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    selectedCategoryTab === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {products.length}
                  </span>
                </button>

                {/* Individual Categories */}
                {categories.map((cat) => {
                  const catCount = products.filter(p => p.category === cat.name).length;
                  const isSelected = selectedCategoryTab === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryTab(cat.name)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {catCount}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* If Specific Category is Selected, show Category Header with Edit/Delete options */}
            {currentCategoryObj && selectedCategoryTab !== 'ALL' && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {currentCategoryObj.image ? (
                    <img 
                      src={resolveImageUrl(currentCategoryObj.image, '/images/cat_tshirts.jpg')} 
                      alt={currentCategoryObj.name} 
                      onError={(e) => handleImageError(e, '/images/cat_tshirts.jpg')}
                      className="w-12 h-12 object-cover rounded-xl border border-slate-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-serif font-bold">
                      {currentCategoryObj.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-base font-semibold text-slate-900">
                      {currentCategoryObj.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {currentCategoryObj.description || 'Direct factory manufacturing collection'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditCategory(currentCategoryObj)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                    <span>Edit Category Info</span>
                  </button>

                  <button
                    onClick={() => handleDeleteCategory(currentCategoryObj)}
                    className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Delete Category</span>
                  </button>

                  <button
                    onClick={() => handleOpenNewProduct(currentCategoryObj.name)}
                    className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#0F172A] hover:bg-slate-800 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Add to {currentCategoryObj.name}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Search and Product Count Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by title, SKU, fabric..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9.5 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F172A] shadow-2xs"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-500 w-full sm:w-auto text-right font-mono">
                Showing {filteredProducts.length} of {products.length} Garment Models
              </div>

            </div>

            {/* PRODUCT LIST (CLEAN LIGHT CARDS) */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-medium text-slate-800 text-base">
                    No products found in {selectedCategoryTab}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    {searchQuery ? 'Try adjusting your search query' : 'Click the button below to add your first garment to this category'}
                  </p>
                </div>
                <button
                  onClick={() => handleOpenNewProduct(selectedCategoryTab !== 'ALL' ? selectedCategoryTab : undefined)}
                  className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-medium px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#C5A059]" />
                  <span>Add New Product Now</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((prod) => {
                  const primaryImg = resolveImageUrl(prod.images?.[0] || PRESET_FABRIC_IMAGES[0].url, DEFAULT_PRODUCT_IMAGE);
                  const lowestPrice = prod.wholesaleTiers?.[prod.wholesaleTiers.length - 1]?.pricePerPieceEst || '₹280';
                  const basePrice = prod.wholesaleTiers?.[0]?.pricePerPieceEst || '₹340';

                  return (
                    <div 
                      key={prod.id}
                      className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                    >
                      
                      {/* Top Header: Image & Garment Info */}
                      <div className="flex items-start gap-3.5">
                        
                        {/* Thumbnail */}
                        <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img 
                            src={primaryImg} 
                            alt={prod.name} 
                            onError={(e) => handleImageError(e, DEFAULT_PRODUCT_IMAGE)}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          {prod.images?.length > 1 && (
                            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-mono px-1 rounded">
                              +{prod.images.length - 1}
                            </span>
                          )}
                        </div>

                        {/* Title, Category & Specs */}
                        <div className="flex-1 min-w-0 space-y-1">
                          
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-mono text-[#C5A059] uppercase font-semibold">
                              {prod.code}
                            </span>
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium truncate max-w-[110px]">
                              {prod.category}
                            </span>
                          </div>

                          <h3 className="font-serif font-semibold text-sm text-slate-900 line-clamp-1">
                            {prod.name}
                          </h3>

                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {prod.gsm} GSM • {prod.fabric}
                          </p>

                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-xs font-semibold text-slate-900">
                              {lowestPrice} - {basePrice}/pc
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              (MOQ {prod.moq || 24})
                            </span>
                          </div>

                        </div>

                      </div>

                      {/* Middle: Color swatches & sizes preview */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">Colors:</span>
                          <div className="flex items-center gap-1">
                            {(prod.availableColors || []).slice(0, 5).map((c, i) => (
                              <span 
                                key={i} 
                                className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                              />
                            ))}
                            {(prod.availableColors || []).length > 5 && (
                              <span className="text-[9px] text-slate-400">
                                +{(prod.availableColors || []).length - 5}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Star Hero Button */}
                        <button
                          onClick={() => handleToggleHeroProduct(prod)}
                          className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md transition cursor-pointer ${
                            prod.inHero || siteConfig.heroFeaturedProductId === prod.id
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'text-slate-400 hover:text-slate-700 bg-slate-50'
                          }`}
                          title="Feature in Homepage Hero Spotlight"
                        >
                          <Star className={`w-3 h-3 ${prod.inHero || siteConfig.heroFeaturedProductId === prod.id ? 'fill-amber-500 text-amber-500' : ''}`} />
                          <span>{prod.inHero || siteConfig.heroFeaturedProductId === prod.id ? 'Hero Star' : 'Feature'}</span>
                        </button>
                      </div>

                      {/* Bottom Action Buttons */}
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 justify-end">
                        
                        <button
                          onClick={() => handleDuplicateProduct(prod)}
                          className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition flex items-center gap-1 cursor-pointer"
                          title="Duplicate Product"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Copy</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(prod)}
                          className="px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition flex items-center gap-1 cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>

                        <button
                          onClick={() => handleEditProduct(prod)}
                          className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#0F172A] hover:bg-slate-800 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Edit Product</span>
                        </button>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: CATEGORIES DIRECTORY (MANAGE ALL CATEGORIES) */}
        {/* ==================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-lg font-semibold text-slate-900">
                  Wholesale Categories Management
                </h2>
                <p className="text-xs text-slate-500">
                  Add, edit, or reorganize garment categories shown across header menus, showcase grids, and catalogue filters
                </p>
              </div>

              <button
                onClick={handleOpenNewCategory}
                className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4 text-[#C5A059]" />
                <span>Create New Category</span>
              </button>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, idx) => {
                const count = products.filter(p => p.category === cat.name).length;
                return (
                  <div 
                    key={cat.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                        {cat.image ? (
                          <img 
                            src={resolveImageUrl(cat.image, '/images/cat_tshirts.jpg')} 
                            alt={cat.name} 
                            onError={(e) => handleImageError(e, '/images/cat_tshirts.jpg')}
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-serif text-xl font-bold text-slate-400">
                            {cat.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            Order #{cat.displayOrder || idx + 1}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-medium">
                            {count} Products
                          </span>
                        </div>

                        <h3 className="font-serif font-semibold text-base text-slate-900">
                          {cat.name}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-2">
                          {cat.description || 'Direct factory manufacturing and wholesale collection'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedCategoryTab(cat.name);
                          setActiveTab('products');
                        }}
                        className="text-xs text-[#0F172A] hover:text-[#C5A059] font-medium transition cursor-pointer flex items-center gap-1"
                      >
                        <span>View {count} Products</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEditCategory(cat)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                          title="Edit Category"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          className="p-1.5 text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: HOMEPAGE & HERO CONTENT EDITOR               */}
        {/* ==================================================== */}
        {activeTab === 'hero' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-4xl">
            
            <div className="border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                Homepage Hero & Site Settings
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Customize the main banner text, hero headline, featured highlight garment, and announcement bar.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Top Announcement Bar Message */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Announcement Bar Text (Top of website)
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={tempConfig.announcementEnabled}
                      onChange={(e) => setTempConfig({ ...tempConfig, announcementEnabled: e.target.checked })}
                      className="rounded text-[#0F172A] focus:ring-0"
                    />
                    <span>Show Announcement</span>
                  </label>
                </div>
                <input 
                  type="text"
                  value={tempConfig.announcementBanner}
                  onChange={(e) => setTempConfig({ ...tempConfig, announcementBanner: e.target.value })}
                  placeholder="e.g. Factory Direct Wholesale Dispatch: Get extra 5% cash discount..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              {/* Hero Badge */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Hero Mini Badge
                </label>
                <input 
                  type="text"
                  value={tempConfig.heroBadge}
                  onChange={(e) => setTempConfig({ ...tempConfig, heroBadge: e.target.value })}
                  placeholder="e.g. Ludhiana Direct Hosiery Mill • 240-420 GSM"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              {/* Hero Main Headline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Hero Main Headline
                </label>
                <input 
                  type="text"
                  value={tempConfig.heroHeadline}
                  onChange={(e) => setTempConfig({ ...tempConfig, heroHeadline: e.target.value })}
                  placeholder="e.g. Direct Factory Apparel Manufacturing & Bulk Wholesale"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              {/* Hero Subheadline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Hero Subheadline / Description
                </label>
                <textarea 
                  rows={3}
                  value={tempConfig.heroSubheadline}
                  onChange={(e) => setTempConfig({ ...tempConfig, heroSubheadline: e.target.value })}
                  placeholder="Detailed paragraph explaining factory capabilities..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              {/* Hero Star Featured Garment */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Featured Product in Hero Spotlight Card
                </label>
                <select
                  value={tempConfig.heroFeaturedProductId}
                  onChange={(e) => setTempConfig({ ...tempConfig, heroFeaturedProductId: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code} - {p.gsm} GSM {p.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* WhatsApp Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    WhatsApp Enquiry Number
                  </label>
                  <input 
                    type="text"
                    value={tempConfig.whatsappNumber}
                    onChange={(e) => setTempConfig({ ...tempConfig, whatsappNumber: e.target.value })}
                    placeholder="+917528802003"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Support Calling Phone
                  </label>
                  <input 
                    type="text"
                    value={tempConfig.phone}
                    onChange={(e) => setTempConfig({ ...tempConfig, phone: e.target.value })}
                    placeholder="+91 75288 02003"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                  />
                </div>
              </div>

            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={handleSaveSiteConfigForm}
                disabled={isSavingConfig}
                className="bg-[#0F172A] hover:bg-slate-800 text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSavingConfig ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-[#C5A059]" />}
                <span>Save & Publish Changes</span>
              </button>
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: DATABASE & RE-SEED TOOLS                     */}
        {/* ==================================================== */}
        {activeTab === 'database' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-4xl">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                Cloud Firestore Database Status & Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Persistent storage across all sessions, devices, and browser windows.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 uppercase font-mono">Total Products in DB</span>
                <div className="text-2xl font-serif font-bold text-slate-900 mt-1">{products.length}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 uppercase font-mono">Total Categories</span>
                <div className="text-2xl font-serif font-bold text-slate-900 mt-1">{categories.length}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 uppercase font-mono">Sync Status</span>
                <div className="text-base font-semibold text-emerald-600 mt-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-time Active</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Restore Default Factory Catalog Data</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                If you ever want to re-seed or restore the original high-density Ludhiana hosiery demo models, click below.
              </p>
              <button
                onClick={async () => {
                  if (window.confirm('Reset catalog to standard default demo products and categories?')) {
                    try {
                      await resetToDefaultCatalog();
                      showToast('Default catalog successfully re-seeded!');
                    } catch (e) {
                      alert(`Reset failed: ${e}`);
                    }
                  }
                }}
                className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Restore Factory Presets
              </button>
            </div>

          </div>
        )}

      </main>

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT PRODUCT (CLEAN LIGHT THEME)        */}
      {/* ==================================================== */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-serif font-semibold text-slate-900 text-lg">
                  {editingProduct.id.includes(Date.now().toString().slice(0, 5)) ? 'Add New Wholesale Garment' : 'Edit Garment Details'}
                </h3>
                <p className="text-xs text-slate-500">
                  Changes will immediately update across the live website catalog
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-tabs */}
            <div className="flex border-b border-slate-200 bg-white px-6 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setProductFormTab('basics')}
                className={`py-3 px-3.5 text-xs font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
                  productFormTab === 'basics'
                    ? 'border-[#0F172A] text-[#0F172A] font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                1. Basics & Specs
              </button>
              <button
                onClick={() => setProductFormTab('images')}
                className={`py-3 px-3.5 text-xs font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
                  productFormTab === 'images'
                    ? 'border-[#0F172A] text-[#0F172A] font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                2. Photos ({editingProduct.images?.length || 0})
              </button>
              <button
                onClick={() => setProductFormTab('colors_sizes')}
                className={`py-3 px-3.5 text-xs font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
                  productFormTab === 'colors_sizes'
                    ? 'border-[#0F172A] text-[#0F172A] font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                3. Colors & Sizes
              </button>
              <button
                onClick={() => setProductFormTab('pricing')}
                className={`py-3 px-3.5 text-xs font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
                  productFormTab === 'pricing'
                    ? 'border-[#0F172A] text-[#0F172A] font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                4. Wholesale Pricing
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              
              {/* TAB 1: BASICS & SPECS */}
              {productFormTab === 'basics' && (
                <div className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Product Title / Name *</label>
                      <input 
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        placeholder="e.g. 240 GSM Oversized Streetwear Tee"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Category *</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">SKU / Style Code</label>
                      <input 
                        type="text"
                        value={editingProduct.code}
                        onChange={(e) => setEditingProduct({ ...editingProduct, code: e.target.value })}
                        placeholder="FCC-TS-240"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">GSM (Grams/sq.m)</label>
                      <input 
                        type="number"
                        value={editingProduct.gsm}
                        onChange={(e) => setEditingProduct({ ...editingProduct, gsm: Number(e.target.value) || 240 })}
                        placeholder="240"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Minimum Order Qty (MOQ)</label>
                      <input 
                        type="number"
                        value={editingProduct.moq}
                        onChange={(e) => setEditingProduct({ ...editingProduct, moq: Number(e.target.value) || 24 })}
                        placeholder="24"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Fabric Composition</label>
                      <input 
                        type="text"
                        value={editingProduct.fabric}
                        onChange={(e) => setEditingProduct({ ...editingProduct, fabric: e.target.value })}
                        placeholder="100% Super Combed Compact Cotton"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Fit Silhouette</label>
                      <input 
                        type="text"
                        value={editingProduct.fitType}
                        onChange={(e) => setEditingProduct({ ...editingProduct, fitType: e.target.value })}
                        placeholder="Oversized Dropshoulder / Boxy Streetwear"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Garment Description</label>
                    <textarea 
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      placeholder="Factory-direct knit fabric specs, softness, wash care..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                    />
                  </div>

                </div>
              )}

              {/* TAB 2: PHOTOS & GALLERY */}
              {productFormTab === 'images' && (
                <div className="space-y-5">
                  
                  {/* Upload from Computer/Phone */}
                  <div className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-2xl p-6 text-center space-y-3 bg-slate-50/70 transition">
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto text-slate-700">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingImage}
                        className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-xl transition cursor-pointer"
                      >
                        {isUploadingImage ? 'Processing & Compressing...' : 'Upload Photos from Device'}
                      </button>
                      <p className="text-[11px] text-slate-500 mt-1">
                        PNG, JPG, WEBP • Automatically optimized for instant loading
                      </p>
                    </div>
                  </div>

                  {/* Add URL */}
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Or paste direct image URL (https://...)"
                      value={inputImageUrl}
                      onChange={(e) => setInputImageUrl(e.target.value)}
                      className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-300 transition cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Current Images Thumbnails */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Current Photos ({editingProduct.images?.length || 0})
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {(editingProduct.images || []).map((img, idx) => (
                        <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                          <img 
                            src={resolveImageUrl(img, DEFAULT_PRODUCT_IMAGE)} 
                            alt="Product" 
                            onError={(e) => handleImageError(e, DEFAULT_PRODUCT_IMAGE)}
                            className="w-full h-full object-cover object-top" 
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingProduct.images.filter((_, i) => i !== idx);
                              setEditingProduct({ ...editingProduct, images: updated });
                            }}
                            className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-md shadow-xs opacity-90 hover:opacity-100 transition cursor-pointer"
                            title="Remove Photo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1.5 left-1.5 bg-[#0F172A] text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                              Main Photo
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: COLORS & SIZES */}
              {productFormTab === 'colors_sizes' && (
                <div className="space-y-6">
                  
                  {/* Sizes Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Available Wholesale Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {STANDARD_SIZES.map((sz) => {
                        const isSelected = (editingProduct.availableSizes || []).includes(sz);
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => {
                              const exists = (editingProduct.availableSizes || []).includes(sz);
                              const updated = exists 
                                ? (editingProduct.availableSizes || []).filter(s => s !== sz)
                                : [...(editingProduct.availableSizes || []), sz];
                              setEditingProduct({ ...editingProduct, availableSizes: updated });
                            }}
                            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer border ${
                              isSelected
                                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Colors List */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Available Color Swatches
                    </label>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(editingProduct.availableColors || []).map((col, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-5 h-5 rounded-full border border-slate-300 shadow-2xs" 
                              style={{ backgroundColor: col.hex }} 
                            />
                            <span className="text-xs font-medium text-slate-800 truncate max-w-[90px]">{col.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingProduct.availableColors.filter((_, i) => i !== idx);
                              setEditingProduct({ ...editingProduct, availableColors: updated });
                            }}
                            className="text-slate-400 hover:text-rose-600 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Quick Add Preset Palette */}
                    <div className="pt-2">
                      <span className="text-[11px] text-slate-500 block mb-1.5">Quick Add Factory Colors:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_COLORS.map((pCol) => (
                          <button
                            key={pCol.name}
                            type="button"
                            onClick={() => {
                              const exists = (editingProduct.availableColors || []).some(c => c.name === pCol.name);
                              if (!exists) {
                                setEditingProduct({
                                  ...editingProduct,
                                  availableColors: [...(editingProduct.availableColors || []), pCol]
                                });
                              }
                            }}
                            className="px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-400 rounded-lg text-[11px] text-slate-700 flex items-center gap-1.5 cursor-pointer"
                          >
                            <span className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: pCol.hex }} />
                            <span>{pCol.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 4: WHOLESALE PRICING */}
              {productFormTab === 'pricing' && (
                <div className="space-y-4">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Wholesale Volume Pricing Tiers
                  </label>
                  
                  <div className="space-y-2">
                    {(editingProduct.wholesaleTiers || []).map((tier, idx) => (
                      <div key={idx} className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">Min Qty</span>
                          <input 
                            type="number"
                            value={tier.minQty}
                            onChange={(e) => {
                              const updated = [...editingProduct.wholesaleTiers];
                              updated[idx].minQty = Number(e.target.value);
                              setEditingProduct({ ...editingProduct, wholesaleTiers: updated });
                            }}
                            className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">Max Qty</span>
                          <input 
                            type="text"
                            value={tier.maxQty}
                            onChange={(e) => {
                              const updated = [...editingProduct.wholesaleTiers];
                              updated[idx].maxQty = e.target.value;
                              setEditingProduct({ ...editingProduct, wholesaleTiers: updated });
                            }}
                            className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 block font-mono">Price / Pc</span>
                          <input 
                            type="text"
                            value={tier.pricePerPieceEst}
                            onChange={(e) => {
                              const updated = [...editingProduct.wholesaleTiers];
                              updated[idx].pricePerPieceEst = e.target.value;
                              setEditingProduct({ ...editingProduct, wholesaleTiers: updated });
                            }}
                            className="w-full p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                          />
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingProduct.wholesaleTiers.filter((_, i) => i !== idx);
                              setEditingProduct({ ...editingProduct, wholesaleTiers: updated });
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const last = editingProduct.wholesaleTiers[editingProduct.wholesaleTiers.length - 1];
                      const newMin = last ? (typeof last.maxQty === 'number' ? last.maxQty + 1 : 1000) : 24;
                      setEditingProduct({
                        ...editingProduct,
                        wholesaleTiers: [
                          ...(editingProduct.wholesaleTiers || []),
                          { minQty: newMin, maxQty: newMin + 500, pricePerPieceEst: '₹270', discountPct: 'Custom Volume Tier' }
                        ]
                      });
                    }}
                    className="text-xs text-[#0F172A] hover:text-[#C5A059] font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Custom Pricing Tier</span>
                  </button>

                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveProductForm}
                disabled={isSavingProduct}
                className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-medium px-6 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSavingProduct ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-[#C5A059]" />}
                <span>Save to Website</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT CATEGORY                           */}
      {/* ==================================================== */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-serif font-semibold text-slate-900 text-base">
                {editingCategory.name ? `Edit Category: ${editingCategory.name}` : 'Create New Garment Category'}
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Category Name *</label>
                <input 
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  placeholder="e.g. Oversized T-Shirts, Hoodies, Thermal Wear..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Description / Subtitle</label>
                <input 
                  type="text"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="e.g. 240-280 GSM combed cotton drop shoulder tees"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Category Banner Image URL</label>
                <input 
                  type="text"
                  value={editingCategory.image || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Display Order Index</label>
                <input 
                  type="number"
                  value={editingCategory.displayOrder || 1}
                  onChange={(e) => setEditingCategory({ ...editingCategory, displayOrder: Number(e.target.value) || 1 })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCategoryForm}
                disabled={isSavingCategory}
                className="bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSavingCategory ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 text-[#C5A059]" />}
                <span>Save Category</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
