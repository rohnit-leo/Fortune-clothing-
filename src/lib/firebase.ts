import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  deleteDoc, 
  updateDoc, 
  writeBatch,
  getDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Product, CategoryItem, SiteConfig } from '../types';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Target Firestore Database instance
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const COLLECTIONS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  SITE_CONFIG: 'site_config',
  ENQUIRIES: 'enquiries',
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  heroHeadline: 'Direct Ludhiana Factory Wholesale Garment Manufacturing',
  heroSubheadline: 'World-class 240+ GSM heavyweight loopknit t-shirts, 330+ GSM brushed fleece hoodies, winterwear & private label streetwear with low MOQs, transparent pricing tiers, and PAN India logistics.',
  heroBadge: 'Ludhiana Textile Cluster Direct · GST 100% Tax Invoiced',
  heroFeaturedProductId: 'prod-oversized-tee-240',
  announcementBanner: '⚡ Factory Direct Wholesale Dispatch: Get extra 5% cash discount on bulk volume above 500 pcs | WhatsApp: +91 75288 02003',
  announcementEnabled: true,
  whatsappNumber: '+917528802003',
  phone: '+91 75288 02003',
  minOrderNotice: 'Minimum wholesale order starts from 24 pcs per style (Mix sizes allowed)',
  updatedAt: new Date().toISOString()
};

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-tshirts',
    name: 'T-Shirts',
    slug: 't-shirts',
    description: '180 to 280 GSM combed cotton & French terry oversized dropshoulders & crewnecks',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    count: 14,
    featured: true,
    displayOrder: 1
  },
  {
    id: 'cat-hoodies',
    name: 'Hoodies',
    slug: 'hoodies',
    description: '330 to 420 GSM heavyweight brushed fleece & loopknit hoodies with double-lined hoods',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
    count: 12,
    featured: true,
    displayOrder: 2
  },
  {
    id: 'cat-sweatshirts',
    name: 'Sweatshirts',
    slug: 'sweatshirts',
    description: '300 to 360 GSM classic crewneck & fleece sweatshirts tailored for winter collections',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800',
    count: 8,
    featured: true,
    displayOrder: 3
  },
  {
    id: 'cat-winterwear',
    name: 'Winter Wear',
    slug: 'winter-wear',
    description: 'Thermal bonded sherpa jackets, quilted bombers, windcheaters & thermal tracksuits',
    icon: 'Wind',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
    count: 9,
    featured: true,
    displayOrder: 4
  },
  {
    id: 'cat-tracksuits',
    name: 'Tracksuits',
    slug: 'tracksuits',
    description: 'Premium matching upper & lower coordination sets in NS lycra, loopknit & micro poly',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    count: 6,
    featured: true,
    displayOrder: 5
  },
  {
    id: 'cat-joggers',
    name: 'Joggers & Lowers',
    slug: 'joggers',
    description: 'Heavy French terry cargo joggers, straight-cut track pants & heavyweight sweatpants',
    icon: 'SlidersHorizontal',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=800',
    count: 7,
    featured: true,
    displayOrder: 6
  }
];

// Real-time Firestore Subscriptions
export function subscribeToProducts(onData: (products: Product[]) => void, onError?: (err: Error) => void) {
  const colRef = collection(db, COLLECTIONS.PRODUCTS);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((docSnap) => {
        prods.push({ id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) });
      });
      onData(prods);
    },
    (error) => {
      console.warn('Firestore Products subscription note:', error);
      if (onError) onError(error);
    }
  );
}

export function subscribeToCategories(onData: (categories: CategoryItem[]) => void, onError?: (err: Error) => void) {
  const colRef = collection(db, COLLECTIONS.CATEGORIES);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const cats: CategoryItem[] = [];
      snapshot.forEach((docSnap) => {
        cats.push({ id: docSnap.id, ...(docSnap.data() as Omit<CategoryItem, 'id'>) });
      });
      // Sort by display order or name
      cats.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
      onData(cats);
    },
    (error) => {
      console.warn('Firestore Categories subscription note:', error);
      if (onError) onError(error);
    }
  );
}

export function subscribeToSiteConfig(onData: (config: SiteConfig) => void, onError?: (err: Error) => void) {
  const docRef = doc(db, COLLECTIONS.SITE_CONFIG, 'main_config');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as SiteConfig);
      } else {
        onData(DEFAULT_SITE_CONFIG);
      }
    },
    (error) => {
      console.warn('Firestore SiteConfig subscription note:', error);
      if (onError) onError(error);
    }
  );
}

// Write / Mutation Operations
export async function saveProductToFirestore(product: Product): Promise<void> {
  const cleanId = product.id.trim() || `prod-${Date.now()}`;
  const docRef = doc(db, COLLECTIONS.PRODUCTS, cleanId);
  const dataToSave: Product = {
    ...product,
    id: cleanId,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, dataToSave, { merge: true });
}

export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
  await deleteDoc(docRef);
}

export async function saveCategoryToFirestore(category: CategoryItem): Promise<void> {
  const cleanId = category.id.trim() || `cat-${Date.now()}`;
  const docRef = doc(db, COLLECTIONS.CATEGORIES, cleanId);
  await setDoc(docRef, { ...category, id: cleanId }, { merge: true });
}

export async function deleteCategoryFromFirestore(categoryId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.CATEGORIES, categoryId);
  await deleteDoc(docRef);
}

export async function saveSiteConfigToFirestore(config: Partial<SiteConfig>): Promise<void> {
  const docRef = doc(db, COLLECTIONS.SITE_CONFIG, 'main_config');
  await setDoc(docRef, { ...config, updatedAt: new Date().toISOString() }, { merge: true });
}

// Batch Seed Default Catalog into Firestore
export async function seedCatalogToFirestore(defaultProducts: Product[], forceReset = false): Promise<boolean> {
  try {
    const existingProductsSnap = await getDocs(collection(db, COLLECTIONS.PRODUCTS));
    if (!forceReset && !existingProductsSnap.empty) {
      return false; // Already populated
    }

    const batch = writeBatch(db);

    // Seed products
    for (const prod of defaultProducts) {
      const prodRef = doc(db, COLLECTIONS.PRODUCTS, prod.id);
      batch.set(prodRef, {
        ...prod,
        stockStatus: prod.stockStatus || 'in_stock',
        inHero: prod.inHero || prod.id === 'prod-oversized-tee-240' || prod.id === 'prod-hoodie-fleece-330',
        updatedAt: new Date().toISOString()
      });
    }

    // Seed categories
    for (const cat of DEFAULT_CATEGORIES) {
      const catRef = doc(db, COLLECTIONS.CATEGORIES, cat.id);
      batch.set(catRef, cat);
    }

    // Seed Site Config
    const configRef = doc(db, COLLECTIONS.SITE_CONFIG, 'main_config');
    batch.set(configRef, DEFAULT_SITE_CONFIG);

    await batch.commit();
    return true;
  } catch (err) {
    console.error('Failed to seed catalog to Firestore:', err);
    throw err;
  }
}

// Client-side image compressor & File reader for instant high-quality Base64 storage
export function compressImageFile(file: File, maxWidth = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}
