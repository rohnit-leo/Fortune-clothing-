import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, CartItem, EnquiryFormData } from '../types';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, sizeQuantities: Record<string, number>, notes?: string) => void;
  updateCartQuantity: (index: number, sizeQuantities: Record<string, number>) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  cartTotalQuantity: number;
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  compareList: string[];
  toggleCompare: (productId: string) => void;
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
  setActiveModal: (modal: string | null) => void; // 'dealer', 'catalogue', 'callback', 'sample', 'visit'

  sendWhatsAppEnquiry: (formData: EnquiryFormData) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fcc_cart');
      return saved ? JSON.parse(saved) : [];
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

  const [compareList, setCompareList] = useState<string[]>([]);
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
      // Check if item with same product ID & color exists
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

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 products at a time.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const clearCompare = () => setCompareList([]);

  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 6);
    });
  };

  const sendWhatsAppEnquiry = (formData: EnquiryFormData) => {
    const whatsappNum = '917528802003';
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
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalQuantity,
        wishlist,
        toggleWishlist,
        compareList,
        toggleCompare,
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
