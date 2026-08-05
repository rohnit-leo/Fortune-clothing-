import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, ProductColor, CartItem, EnquiryFormData, CategoryItem, SiteConfig } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { 
  subscribeToProducts, 
  subscribeToCategories, 
  subscribeToSiteConfig, 
  saveProductToFirestore, 
  deleteProductFromFirestore,
  saveCategoryToFirestore,
  deleteCategoryFromFirestore,
  saveSiteConfigToFirestore,
  seedCatalogToFirestore,
  DEFAULT_CATEGORIES,
  DEFAULT_SITE_CONFIG
} from '../lib/firebase';

interface CartContextType {
  // Real-time Firestore Data
  products: Product[];
  categories: CategoryItem[];
  siteConfig: SiteConfig;
  isLoadingData: boolean;
  isFirebaseLive: boolean;
  
  // Admin Operations
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  saveCategory: (category: CategoryItem) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  saveSiteConfig: (config: Partial<SiteConfig>) => Promise<void>;
  resetToDefaultCatalog: () => Promise<void>;

  // Cart & Commerce
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, sizeQuantities: Record<string, number>, notes?: string) => void;
  updateCartQuantity: (index: number, sizeQuantities: Record<string, number>) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartTotalQuantity: number;
  
  wishlist: string[];
  toggleWishlist: (productOrId: string | Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  compareList: Product[];
  toggleCompare: (productOrId: string | Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;

  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isEnquiryModalOpen: boolean;
  setIsEnquiryModalOpen: (open: boolean) => void;

  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;

  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;

  sendWhatsAppEnquiry: (formData: EnquiryFormData) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Real-time data states initialized with comprehensive defaults
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isFirebaseLive, setIsFirebaseLive] = useState<boolean>(false);

  // Check URL hash for `#admin`
  const checkIsAdminHash = () => {
    if (typeof window === 'undefined') return false;
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return hash === '#admin' || hash.startsWith('#admin') || search.includes('admin=true');
  };

  const [isAdminOpen, setIsAdminOpenState] = useState<boolean>(checkIsAdminHash);

  const setIsAdminOpen = (open: boolean) => {
    setIsAdminOpenState(open);
    if (open) {
      if (window.location.hash !== '#admin') {
        window.location.hash = '#admin';
      }
    } else {
      if (window.location.hash === '#admin') {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }
  };

  // Listen to hash changes (e.g. typing `/#admin` in the URL bar)
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminOpenState(checkIsAdminHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Subscribe to real-time Firestore collections
  useEffect(() => {
    let isSubscribed = true;

    // 1. Subscribe to Products
    const unsubProducts = subscribeToProducts(
      (firestoreProducts) => {
        if (!isSubscribed) return;
        if (firestoreProducts && firestoreProducts.length > 0) {
          setProducts(firestoreProducts);
        } else {
          // If Firestore is empty, auto-seed default products once
          seedCatalogToFirestore(DEFAULT_PRODUCTS, false).catch((e) => console.warn('Auto-seed check:', e));
          setProducts(DEFAULT_PRODUCTS);
        }
        setIsFirebaseLive(true);
        setIsLoadingData(false);
      },
      (err) => {
        console.warn('Fallback to local products while offline:', err);
        setIsLoadingData(false);
      }
    );

    // 2. Subscribe to Categories
    const unsubCategories = subscribeToCategories(
      (firestoreCategories) => {
        if (!isSubscribed) return;
        if (firestoreCategories && firestoreCategories.length > 0) {
          setCategories(firestoreCategories);
        } else {
          setCategories(DEFAULT_CATEGORIES);
        }
      },
      (err) => console.warn('Categories subscription notice:', err)
    );

    // 3. Subscribe to Site Config
    const unsubConfig = subscribeToSiteConfig(
      (firestoreConfig) => {
        if (!isSubscribed) return;
        if (firestoreConfig) {
          setSiteConfig(firestoreConfig);
        }
      },
      (err) => console.warn('Site config subscription notice:', err)
    );

    return () => {
      isSubscribed = false;
      unsubProducts();
      unsubCategories();
      unsubConfig();
    };
  }, []);

  // Admin Mutation Handlers
  const saveProduct = useCallback(async (product: Product) => {
    await saveProductToFirestore(product);
    // Optimistic UI update
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = product;
        return copy;
      }
      return [product, ...prev];
    });
  }, []);

  const deleteProduct = useCallback(async (productId: string) => {
    await deleteProductFromFirestore(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const saveCategory = useCallback(async (category: CategoryItem) => {
    await saveCategoryToFirestore(category);
    setCategories((prev) => {
      const idx = prev.findIndex((c) => c.id === category.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = category;
        return copy;
      }
      return [...prev, category];
    });
  }, []);

  const deleteCategory = useCallback(async (categoryId: string) => {
    await deleteCategoryFromFirestore(categoryId);
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  }, []);

  const saveSiteConfig = useCallback(async (config: Partial<SiteConfig>) => {
    await saveSiteConfigToFirestore(config);
    setSiteConfig((prev) => ({ ...prev, ...config }));
  }, []);

  const resetToDefaultCatalog = useCallback(async () => {
    await seedCatalogToFirestore(DEFAULT_PRODUCTS, true);
    setProducts(DEFAULT_PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
    setSiteConfig(DEFAULT_SITE_CONFIG);
  }, []);

  // Cart & Local Storage State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fcc_cart');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(item => item.totalQuantity !== 100);
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fcc_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('fcc_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('fcc_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const addToCart = (product: Product, selectedColor: ProductColor, sizeQuantities: Record<string, number>, notes?: string) => {
    const totalQty = (Object.values(sizeQuantities) as number[]).reduce((a: number, b: number) => a + (b || 0), 0);
    if (totalQty <= 0) return;

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.selectedColor.name === selectedColor.name);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newSizes = { ...updated[existingIdx].sizeQuantities };
        Object.entries(sizeQuantities).forEach(([sz, qty]) => {
          newSizes[sz] = (newSizes[sz] || 0) + qty;
        });
        const newTotal = (Object.values(newSizes) as number[]).reduce((a: number, b: number) => a + (b || 0), 0);
        updated[existingIdx] = {
          ...updated[existingIdx],
          sizeQuantities: newSizes,
          totalQuantity: newTotal,
          customizationNotes: notes || updated[existingIdx].customizationNotes
        };
        return updated;
      }
      return [...prev, {
        product,
        selectedColor,
        sizeQuantities,
        totalQuantity: totalQty,
        customizationNotes: notes
      }];
    });
  };

  const updateCartQuantity = (index: number, sizeQuantities: Record<string, number>) => {
    setCart(prev => {
      const updated = [...prev];
      const newTotal = (Object.values(sizeQuantities) as number[]).reduce((a: number, b: number) => a + (b || 0), 0);
      if (newTotal <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index] = {
        ...updated[index],
        sizeQuantities,
        totalQuantity: newTotal
      };
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const cartTotalQuantity = cart.reduce((sum, item) => sum + item.totalQuantity, 0);

  const toggleWishlist = (productOrId: string | Product) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const toggleCompare = (productOrId: string | Product) => {
    const id = typeof productOrId === 'string' ? productOrId : productOrId.id;
    setCompareList(prev => {
      const exists = prev.some(p => p.id === id);
      if (exists) {
        return prev.filter(p => p.id !== id);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 products at a time.');
        return prev;
      }
      const prod = typeof productOrId === 'string' ? products.find(p => p.id === id) : productOrId;
      if (!prod) return prev;
      return [...prev, prod];
    });
  };

  const isInCompare = (productId: string) => {
    return compareList.some(p => p.id === productId);
  };

  const clearCompare = () => setCompareList([]);

  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  };

  const sendWhatsAppEnquiry = (formData: EnquiryFormData) => {
    const whatsappNum = siteConfig.whatsappNumber.replace(/[^0-9]/g, '') || '917528802003';
    let message = `*B2B WHOLESALE ENQUIRY - FORTUNE CLOTHING CO.*\n`;
    message += `───────────────────────\n`;
    message += `*CLIENT DETAILS*\n`;
    message += `• Name: ${formData.fullName}\n`;
    message += `• Company: ${formData.companyName}\n`;
    message += `• Business Type: ${formData.businessType}\n`;
    if (formData.gstNumber) message += `• GSTIN: ${formData.gstNumber}\n`;
    message += `• Phone/WhatsApp: ${formData.phone} / ${formData.whatsapp}\n`;
    message += `• Email: ${formData.email}\n`;
    message += `• Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}, ${formData.country}\n\n`;

    message += `*ORDER REQUIREMENTS*\n`;
    message += `• Est. Total Quantity: ${formData.expectedQuantity || cartTotalQuantity + ' pcs'}\n`;
    message += `• Expected Value: ${formData.expectedOrderValue || 'To Be Quoted'}\n`;
    message += `• Required Delivery Date: ${formData.requiredDeliveryDate || 'Flexible'}\n`;
    if (formData.brandName) message += `• Private Label Brand: ${formData.brandName}\n`;
    if (formData.preferredFabric) message += `• Preferred Fabric: ${formData.preferredFabric}\n\n`;

    if (cart.length > 0) {
      message += `*CART PRODUCTS (${cartTotalQuantity} Pcs Total)*\n`;
      cart.forEach((item, idx) => {
        message += `\n*${idx + 1}. ${item.product.name}* (Code: ${item.product.code})\n`;
        message += `  - Color: ${item.selectedColor.name}\n`;
        message += `  - Fabric: ${item.product.fabric} (${item.product.gsm} GSM)\n`;
        message += `  - Size Breakdown: ${Object.entries(item.sizeQuantities).map(([sz, q]) => `${sz}: ${q}pcs`).join(', ')}\n`;
        message += `  - Subtotal: ${item.totalQuantity} pcs\n`;
        if (item.customizationNotes) message += `  - Custom Notes: ${item.customizationNotes}\n`;
      });
    }

    if (formData.customizationRequirements || formData.additionalRequirements) {
      message += `\n*ADDITIONAL INSTRUCTIONS*\n`;
      message += `${formData.customizationRequirements || ''} ${formData.additionalRequirements || ''}\n`;
    }

    message += `\n───────────────────────\n`;
    message += `Sent from Fortune Clothing Co. Web Portal`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${whatsappNum}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        products,
        categories,
        siteConfig,
        isLoadingData,
        isFirebaseLive,
        isAdminOpen,
        setIsAdminOpen,
        saveProduct,
        deleteProduct,
        saveCategory,
        deleteCategory,
        saveSiteConfig,
        resetToDefaultCatalog,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalQuantity,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        recentlyViewed,
        addRecentlyViewed,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isEnquiryModalOpen,
        setIsEnquiryModalOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        activeModal,
        setActiveModal,
        sendWhatsAppEnquiry
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
