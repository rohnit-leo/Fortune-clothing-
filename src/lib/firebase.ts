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
  heroHeadline: 'DIRECT FROM LUDHIANA',
  heroSubheadline: "Manufacturer of Premium Men's Garments",
  heroBadge: "LATEST MEN'S COLLECTION",
  heroImage: '/images/hero_flatlay.jpg',
  heroFeaturedProductId: 'prod-oversized-tshirt',
  announcementBanner: 'DIRECT FACTORY WHOLESALE • 100% GST INVOICE • PAN INDIA DISPATCH',
  announcementEnabled: true,
  whatsappNumber: '+917528802003',
  phone: '+91 75288 02003',
  minOrderNotice: 'Minimum wholesale order starts from 24 pcs per style (Mix sizes allowed)',
  updatedAt: new Date().toISOString()
};

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-tshirts',
    name: 'T-SHIRTS',
    slug: 't-shirts',
    description: '180 to 240 GSM combed compact cotton regular & fitted tees',
    icon: 'Shirt',
    image: '/images/cat_tshirts.jpg',
    count: 24,
    featured: true,
    displayOrder: 1
  },
  {
    id: 'cat-oversized',
    name: 'OVERSIZED',
    slug: 'oversized',
    description: '240+ GSM drop-shoulder streetwear oversized tees',
    icon: 'Layers',
    image: '/images/cat_oversized.jpg',
    count: 18,
    featured: true,
    displayOrder: 2
  },
  {
    id: 'cat-polos',
    name: 'POLOS',
    slug: 'polos',
    description: '220 GSM premium knit collar polo t-shirts',
    icon: 'Sparkles',
    image: '/images/cat_polos.jpg',
    count: 15,
    featured: true,
    displayOrder: 3
  },
  {
    id: 'cat-sweatshirts',
    name: 'SWEATSHIRTS',
    slug: 'sweatshirts',
    description: '300 to 360 GSM classic crewneck fleece sweatshirts',
    icon: 'Wind',
    image: '/images/cat_sweatshirts.jpg',
    count: 12,
    featured: true,
    displayOrder: 4
  },
  {
    id: 'cat-hoodies',
    name: 'HOODIES',
    slug: 'hoodies',
    description: '330 to 400 GSM brushed fleece kangaroo pocket hoodies',
    icon: 'Layers',
    image: '/images/cat_hoodies.jpg',
    count: 16,
    featured: true,
    displayOrder: 5
  },
  {
    id: 'cat-tracksuits',
    name: 'TRACKSUITS',
    slug: 'tracksuits',
    description: 'Coordinated jacket and jogger sets for sports & casual',
    icon: 'Flame',
    image: '/images/cat_tracksuits.jpg',
    count: 10,
    featured: true,
    displayOrder: 6
  },
  {
    id: 'cat-trackpants',
    name: 'TRACK PANTS',
    slug: 'track-pants',
    description: '280 GSM heavy loopknit joggers & track pants',
    icon: 'SlidersHorizontal',
    image: '/images/cat_trackpants.jpg',
    count: 14,
    featured: true,
    displayOrder: 7
  },
  {
    id: 'cat-jackets',
    name: 'JACKETS',
    slug: 'jackets',
    description: 'Quilted puffer down jackets, bombers & winter coats',
    icon: 'PackageCheck',
    image: '/images/cat_jackets.jpg',
    count: 8,
    featured: true,
    displayOrder: 8
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
