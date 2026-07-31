export type ProductCategory = 
  | 'T-Shirts'
  | 'Sweatshirts'
  | 'Hoodies'
  | 'Jackets'
  | 'Lowers'
  | 'Joggers'
  | 'Tracksuits'
  | 'Winter Wear';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface WholesaleTier {
  minQty: number;
  maxQty: number | string;
  pricePerPieceEst: string;
  discountPct: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subtitle: string;
  code: string;
  images: string[];
  fabric: string;
  gsm: number;
  moq: number;
  blend: string;
  availableSizes: string[];
  availableColors: ProductColor[];
  description: string;
  features: string[];
  customizationOptions: string[];
  dispatchDays: string;
  wholesaleTiers: WholesaleTier[];
  isFeatured?: boolean;
  isNew?: boolean;
  bestFor: string[];
  fitType: string;
  shrinkageRate: string;
  washingCare: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  sizeQuantities: Record<string, number>; // e.g. { 'M': 50, 'L': 50 }
  totalQuantity: number;
  customizationNotes?: string;
  customFabric?: string;
}

export interface EnquiryFormData {
  fullName: string;
  companyName: string;
  businessType: 'Wholesaler' | 'Retail Chain' | 'Fashion Brand' | 'E-commerce Seller' | 'Corporate' | 'Exporter' | 'Other';
  gstNumber?: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  preferredContact: 'WhatsApp' | 'Phone Call' | 'Email';
  expectedQuantity: string;
  expectedOrderValue: string;
  requiredDeliveryDate: string;
  additionalRequirements: string;
  preferredFabric: string;
  brandName: string;
  customizationRequirements: string;
}

export interface FabricInfo {
  id: string;
  name: string;
  gsmRange: string;
  composition: string;
  bestFor: string[];
  texture: string;
  breathability: number; // 1-10
  durability: number; // 1-10
  softness: number; // 1-10
  image: string;
  description: string;
}

export interface FactoryStep {
  step: number;
  title: string;
  subtitle: string;
  capacity: string;
  description: string;
  icon: string;
  image: string;
  highlights: string[];
}
