import { Product } from '../types';

export const REAL_PRODUCT_IMAGES = [
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.02.39%20AM.jpeg',
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.02.40%20AM%20%281%29.jpeg',
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.02.40%20AM.jpeg',
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.04.22%20AM%20%281%29.jpeg',
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.04.22%20AM.jpeg',
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.04.23%20AM%20%281%29.jpeg',
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.04.23%20AM.jpeg',
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.05.52%20AM.jpeg',
  'https://kwrv4maomvrojc0c.public.blob.vercel-storage.com/product/WhatsApp%20Image%202026-07-31%20at%2010.05.55%20AM.jpeg'
];

export const PRODUCTS: Product[] = [
  {
    id: 'fcc-ts-01',
    name: 'Imperial Heavyweight Oversized Tee',
    category: 'T-Shirts',
    subtitle: '240 GSM 100% Combed Compact Cotton',
    code: 'FCC-TS-240',
    images: [
      REAL_PRODUCT_IMAGES[0],
      REAL_PRODUCT_IMAGES[1],
      REAL_PRODUCT_IMAGES[2]
    ],
    fabric: '100% Super Combed Compact Cotton',
    gsm: 240,
    moq: 24,
    blend: '100% Cotton Bio-Washed',
    availableSizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    availableColors: [
      { name: 'Pitch Black', hex: '#121212', image: REAL_PRODUCT_IMAGES[0] },
      { name: 'Classic Off-White', hex: '#F5F5F0', image: REAL_PRODUCT_IMAGES[1] },
      { name: 'Navy Blue', hex: '#0B1D3A', image: REAL_PRODUCT_IMAGES[2] },
      { name: 'Forest Olive', hex: '#2C3B2D', image: REAL_PRODUCT_IMAGES[3] }
    ],
    description: 'Designed for high-end streetwear brands and premium wholesale retail. Features drop-shoulder construction, double-needle cover stitching, and zero-shrinkage bio-wash finishing.',
    features: [
      'Drop Shoulder Oversized Fit',
      'Lycra Ribbed 1x1 Neck Line',
      'Bio-Washed & Silicon Softened',
      'Pre-Shrunk Fabric (<1.5% shrinkage)',
      'Double-Stitched Reinforced Hem'
    ],
    customizationOptions: [
      'Screen Printing (Plastisol/Waterbase)',
      'High-Density Puff Print',
      'Custom Woven Neck Label & Wash Care Tag',
      'Custom Polybag Packaging & Barcode Sticker',
      'Direct-to-Garment (DTG) Printing'
    ],
    dispatchDays: '3 - 5 Days',
    wholesaleTiers: [
      { minQty: 24, maxQty: 99, pricePerPieceEst: 'Tier 1 Wholesale', discountPct: 'Standard Wholesale' },
      { minQty: 100, maxQty: 499, pricePerPieceEst: 'Tier 2 Bulk', discountPct: '12% Extra Margin' },
      { minQty: 500, maxQty: 'Bulk Custom', pricePerPieceEst: 'Direct Factory Rate', discountPct: 'Maximum B2B Rebate' }
    ],
    isFeatured: true,
    isNew: true,
    bestFor: ['Streetwear Apparel Brands', 'Boutique Wholesale Retailers', 'Private Labeling'],
    fitType: 'Oversized Streetwear Fit',
    shrinkageRate: '<1.2% ISO Certified',
    washingCare: 'Machine Wash Cold inside-out, Tumble dry low'
  },
  {
    id: 'fcc-sw-02',
    name: 'Executive Fleece Crewneck Sweatshirt',
    category: 'Sweatshirts',
    subtitle: '330 GSM Heavy Cotton Loopknit Fleece',
    code: 'FCC-SW-330',
    images: [
      REAL_PRODUCT_IMAGES[3],
      REAL_PRODUCT_IMAGES[4],
      REAL_PRODUCT_IMAGES[5]
    ],
    fabric: '80% Premium Cotton, 20% Anti-Pilling Poly Fleece',
    gsm: 330,
    moq: 24,
    blend: 'Cotton-Rich Heavyweight Fleece',
    availableSizes: ['M', 'L', 'XL', '2XL', '3XL', '4XL'],
    availableColors: [
      { name: 'Royal Navy', hex: '#0B1D3A', image: REAL_PRODUCT_IMAGES[3] },
      { name: 'Heather Grey', hex: '#A8A9AD', image: REAL_PRODUCT_IMAGES[4] },
      { name: 'Jet Black', hex: '#0F0F0F', image: REAL_PRODUCT_IMAGES[5] }
    ],
    description: 'Ultrasoft fleece interior with structured exterior face ideal for precision embroidery and dense screen printing. Engineered for winter bulk sales and fashion label distribution.',
    features: [
      'Heavyweight 330 GSM Thermal Construction',
      'Spandex Infused Heavy Rib Cuffs',
      'Anti-Pilling Brushed Fleece Interior',
      'Reinforced Half-Moon Back Yoke',
      'Twin-Needle Topstitched Seams'
    ],
    customizationOptions: [
      'Direct 3D Chest Embroidery',
      'Custom Rubber Badge / Patch Attachment',
      'Custom Poly-packaging & Hangtag',
      'Sleeve Logo Printing'
    ],
    dispatchDays: '4 - 7 Days',
    wholesaleTiers: [
      { minQty: 24, maxQty: 99, pricePerPieceEst: 'Tier 1 Rate', discountPct: 'Wholesale Base' },
      { minQty: 100, maxQty: 499, pricePerPieceEst: 'Tier 2 Bulk', discountPct: '15% Margin Boost' },
      { minQty: 500, maxQty: 'Factory Contract', pricePerPieceEst: 'Direct Mill Contract', discountPct: 'Top Volume Discount' }
    ],
    isFeatured: true,
    bestFor: ['Winter Collections', 'Corporate Gifting', 'Export Wholesale'],
    fitType: 'Classic European Fit',
    shrinkageRate: '<1.5% Guaranteed',
    washingCare: 'Gentle Machine Wash, Flat Dry in Shade'
  },
  {
    id: 'fcc-hd-03',
    name: 'Monarch Heavy Thermal Pullover Hoodie',
    category: 'Hoodies',
    subtitle: '380 GSM Ultra-Dense French Terry / Fleece',
    code: 'FCC-HD-380',
    images: [
      REAL_PRODUCT_IMAGES[6],
      REAL_PRODUCT_IMAGES[7],
      REAL_PRODUCT_IMAGES[8]
    ],
    fabric: '100% Premium Cotton French Terry or Brushed Fleece',
    gsm: 380,
    moq: 24,
    blend: 'Ultra Heavy Cotton',
    availableSizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
    availableColors: [
      { name: 'Obsidian Black', hex: '#0A0A0A', image: REAL_PRODUCT_IMAGES[6] },
      { name: 'Oatmeal Beige', hex: '#D2C3B2', image: REAL_PRODUCT_IMAGES[7] },
      { name: 'Midnight Navy', hex: '#091A36', image: REAL_PRODUCT_IMAGES[8] }
    ],
    description: 'The definitive luxury hoodie chassis. Double-walled 2-panel hood with custom drawstring options. Engineered for high-end private labels and streetwear drops.',
    features: [
      'Double Layered Heavy Hood Shell',
      'Deep Kangaroo Front Pocket',
      'Drop Shoulder Relaxed Silhouette',
      '2x2 Heavy Spandex Ribbing',
      'Zero Fabric Distortion Post Wash'
    ],
    customizationOptions: [
      'Heavy Density Rubberized Prints',
      'Chain-stitch Vintage Embroidery',
      'Metal Aglet Custom Drawstrings',
      'Custom Neck Taping'
    ],
    dispatchDays: '5 - 7 Days',
    wholesaleTiers: [
      { minQty: 24, maxQty: 99, pricePerPieceEst: 'Wholesale Tier 1', discountPct: 'B2B Standard' },
      { minQty: 100, maxQty: 499, pricePerPieceEst: 'Wholesale Tier 2', discountPct: '18% Bulk Rebate' },
      { minQty: 500, maxQty: 'Factory Contract', pricePerPieceEst: 'Master Dealer Rate', discountPct: 'Max B2B Margin' }
    ],
    isFeatured: true,
    isNew: true,
    bestFor: ['Streetwear Heavyweights', 'Private Label Launch', 'Pan India Wholesalers'],
    fitType: 'Boxy Oversized Fit',
    shrinkageRate: '<1.0%',
    washingCare: 'Hand or Machine Wash Cold'
  },
  {
    id: 'fcc-jk-04',
    name: 'Vanguard All-Weather Puffer Jacket',
    category: 'Jackets',
    subtitle: 'Windproof Micro-Polyester with Thermolite Padding',
    code: 'FCC-JK-500',
    images: [
      REAL_PRODUCT_IMAGES[7],
      REAL_PRODUCT_IMAGES[8],
      REAL_PRODUCT_IMAGES[0]
    ],
    fabric: 'High-Density Matt Water-Repellent Shell + Synthetic Insulation',
    gsm: 210,
    moq: 24,
    blend: '100% Nylon/Poly Weather Shield',
    availableSizes: ['M', 'L', 'XL', '2XL', '3XL'],
    availableColors: [
      { name: 'Midnight Blue', hex: '#0A1830', image: REAL_PRODUCT_IMAGES[7] },
      { name: 'Matte Onyx', hex: '#1C1C1C', image: REAL_PRODUCT_IMAGES[8] },
      { name: 'Military Olive', hex: '#3B4731', image: REAL_PRODUCT_IMAGES[0] }
    ],
    description: 'Precision quilted winter insulation jacket built for North Indian and export wholesale markets. Smooth SBS zippers with storm flap protection.',
    features: [
      'Water-Repellent DWR Coated Outer Membrane',
      '200 GSM Synthetic Thermal Down Alternative',
      'Concealed Zipper Pockets with Fleece Lining',
      'Adjustable Hem Elastic Drawcords',
      'High Stand Collar Wind Guard'
    ],
    customizationOptions: [
      'Laser Engraved Zipper Pullers',
      'Chest TPU/Reflective Logo Badge',
      'Custom Lining Fabric Print',
      'Custom Outer Packaging Boxes'
    ],
    dispatchDays: '7 - 10 Days',
    wholesaleTiers: [
      { minQty: 24, maxQty: 99, pricePerPieceEst: 'Standard B2B', discountPct: 'Base Rate' },
      { minQty: 100, maxQty: 499, pricePerPieceEst: 'Volume Dealer', discountPct: '15% Volume Rebate' },
      { minQty: 500, maxQty: 'Direct Mill Contract', pricePerPieceEst: 'Factory Door Rate', discountPct: 'Max Factory Savings' }
    ],
    isFeatured: true,
    bestFor: ['Winter Wholesale Markets', 'Corporate Outwear', 'Retail Store Networks'],
    fitType: 'Regular Ergonomic Outerwear Fit',
    shrinkageRate: '0% Non-Shrinkable',
    washingCare: 'Dry Clean Recommended'
  },
  {
    id: 'fcc-jg-05',
    name: 'Stealth Pro Tech Fleece Jogger',
    category: 'Joggers',
    subtitle: '290 GSM Cotton-Poly Interlock Spandex Stretch',
    code: 'FCC-JG-290',
    images: [
      REAL_PRODUCT_IMAGES[1],
      REAL_PRODUCT_IMAGES[2],
      REAL_PRODUCT_IMAGES[5]
    ],
    fabric: '75% Combed Cotton, 20% Poly, 5% Lycra',
    gsm: 290,
    moq: 24,
    blend: '4-Way Stretch Performance Knit',
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    availableColors: [
      { name: 'Anthracite Dark Grey', hex: '#2B2D2F', image: REAL_PRODUCT_IMAGES[1] },
      { name: 'Core Black', hex: '#111111', image: REAL_PRODUCT_IMAGES[2] },
      { name: 'Deep Navy', hex: '#0C1C36', image: REAL_PRODUCT_IMAGES[5] }
    ],
    description: 'Designed for activewear brands and urban streetwear lines. Tapered ergonomic leg tailoring with concealed zip side security pockets.',
    features: [
      '4-Way Lycra Elasticity for Max Mobility',
      'Concealed YKK Waterproof Side Zippers',
      'Elastic Waistband with Metal Tipped Drawstring',
      'Ribbed Ankle Cuffs with Anti-Sag Hold',
      'Squat-Proof Interlock Stitching'
    ],
    customizationOptions: [
      'Reflective Heat Transfer Logo',
      'Side Panel Jacquard Tape',
      'Custom Zipper Tapes & Pullers'
    ],
    dispatchDays: '4 - 6 Days',
    wholesaleTiers: [
      { minQty: 24, maxQty: 99, pricePerPieceEst: 'B2B Base', discountPct: 'Standard' },
      { minQty: 100, maxQty: 499, pricePerPieceEst: 'B2B Wholesale', discountPct: '14% Rebate' },
      { minQty: 500, maxQty: 'Bulk Tier', pricePerPieceEst: 'Direct Factory Rate', discountPct: 'Top Margin' }
    ],
    isFeatured: true,
    bestFor: ['Athleisure Brands', 'Gym Chains', 'Retail Outlets'],
    fitType: 'Tapered Modern Fit',
    shrinkageRate: '<1.0%',
    washingCare: 'Machine Wash Cold'
  },
  {
    id: 'fcc-lw-06',
    name: 'Essential Daily Cotton Lower',
    category: 'Lowers',
    subtitle: '240 GSM Super Combed Single Jersey Lower',
    code: 'FCC-LW-240',
    images: [
      REAL_PRODUCT_IMAGES[4],
      REAL_PRODUCT_IMAGES[6],
      REAL_PRODUCT_IMAGES[8]
    ],
    fabric: '100% Combed Bio-washed Cotton',
    gsm: 240,
    moq: 24,
    blend: 'Pure Breathable Cotton',
    availableSizes: ['M', 'L', 'XL', '2XL', '3XL'],
    availableColors: [
      { name: 'Slate Grey', hex: '#4A5568', image: REAL_PRODUCT_IMAGES[4] },
      { name: 'Jet Black', hex: '#0F0F0F', image: REAL_PRODUCT_IMAGES[6] },
      { name: 'Navy Blue', hex: '#0F2042', image: REAL_PRODUCT_IMAGES[8] }
    ],
    description: 'Lightweight comfortable daily lower suitable for lounge, casual wear, and nightwear wholesale distribution.',
    features: [
      'Breathable Soft Cotton Feel',
      'Dual Deep Side Pockets + Back Pocket',
      'Flat Lock Durable Stitching',
      'Flexible Elastic Waistband'
    ],
    customizationOptions: [
      'Custom Brand Labeling',
      'Thigh Embroidery or Screen Print'
    ],
    dispatchDays: '3 - 5 Days',
    wholesaleTiers: [
      { minQty: 24, maxQty: 99, pricePerPieceEst: 'Tier 1 Rate', discountPct: 'Standard' },
      { minQty: 100, maxQty: 499, pricePerPieceEst: 'Tier 2 Bulk', discountPct: '10% Rebate' },
      { minQty: 500, maxQty: 'Custom Order', pricePerPieceEst: 'Factory Rate', discountPct: 'Max Rebate' }
    ],
    isFeatured: false,
    bestFor: ['Mass Wholesale Distributors', 'Daily Wear Retailers'],
    fitType: 'Straight Relaxed Fit',
    shrinkageRate: '<1.5%',
    washingCare: 'Normal Wash'
  },
  {
    id: 'fcc-ts-07',
    name: 'Apex Seamless Performance Tracksuit Set',
    category: 'Tracksuits',
    subtitle: 'Matching Top & Bottom 280 GSM Poly-Spandex Interlock',
    code: 'FCC-TR-280',
    images: [
      REAL_PRODUCT_IMAGES[2],
      REAL_PRODUCT_IMAGES[3],
      REAL_PRODUCT_IMAGES[7]
    ],
    fabric: 'Micro-Poly Interlock with Moisture Wicking Technology',
    gsm: 280,
    moq: 24,
    blend: '90% Poly, 10% Spandex Active Stretch',
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    availableColors: [
      { name: 'Onyx Black & Metallic Gold', hex: '#111111', image: REAL_PRODUCT_IMAGES[2] },
      { name: 'Navy & White Sport', hex: '#0B1E3D', image: REAL_PRODUCT_IMAGES[3] },
      { name: 'Steel Grey Monotone', hex: '#5A6065', image: REAL_PRODUCT_IMAGES[7] }
    ],
    description: 'Complete 2-piece high performance athletic tracksuit set. Full zip jacket with matching tapered bottoms designed for sports clubs, academies, and athletic apparel lines.',
    features: [
      'Moisture Wicking Quick Dry Technology',
      'Full Front Metal Lock Zipper',
      'Ankle Zip Opening for Easy Boot Removal',
      'Contrast Side Piping Detail'
    ],
    customizationOptions: [
      'Sublimation Side Panel Printing',
      'Club Crest / Brand Chest Badge',
      'Numbered Back Printing'
    ],
    dispatchDays: '5 - 7 Days',
    wholesaleTiers: [
      { minQty: 24, maxQty: 99, pricePerPieceEst: 'B2B Track Set Rate 1', discountPct: 'Base Rate' },
      { minQty: 100, maxQty: 499, pricePerPieceEst: 'B2B Track Set Rate 2', discountPct: '16% Rebate' },
      { minQty: 500, maxQty: 'Factory Contract', pricePerPieceEst: 'Direct Production Contract', discountPct: 'Top Value' }
    ],
    isFeatured: true,
    isNew: true,
    bestFor: ['Sports Academies', 'Athletic Brands', 'Uniform Wholesalers'],
    fitType: 'Athletic Fit',
    shrinkageRate: '0%',
    washingCare: 'Cool Machine Wash, No Bleach'
  },
  {
    id: 'fcc-ww-08',
    name: 'Ludhiana Heritage Quilted Thermal Winter Set',
    category: 'Winter Wear',
    subtitle: '420 GSM Double-Faced Thermal Fleece & Wool Blend',
    code: 'FCC-WW-420',
    images: [
      REAL_PRODUCT_IMAGES[8],
      REAL_PRODUCT_IMAGES[5],
      REAL_PRODUCT_IMAGES[1]
    ],
    fabric: 'Premium Ludhiana Knitting Mill Heavy Wool-Poly Fleece Blend',
    gsm: 420,
    moq: 24,
    blend: '420 GSM Ultra Insulation',
    availableSizes: ['M', 'L', 'XL', '2XL', '3XL', '4XL'],
    availableColors: [
      { name: 'Camel Tan', hex: '#C19A6B', image: REAL_PRODUCT_IMAGES[8] },
      { name: 'Charcoal Melange', hex: '#383838', image: REAL_PRODUCT_IMAGES[5] },
      { name: 'Deep Midnight', hex: '#0B172B', image: REAL_PRODUCT_IMAGES[1] }
    ],
    description: 'Forged in Ludhiana—India’s hosiery capital. Maximum thermal retention for severe sub-zero winter regions and export markets.',
    features: [
      '420 GSM Double Layered Heat-Lock Knit',
      'Soft Non-Itch Micro-Velvet Interior',
      'Heavy Duty Reinforced Seams',
      'Preserves Shape After Repeated Heavy Seasons'
    ],
    customizationOptions: [
      'Custom Leatherette Label Branding',
      'Custom Box Packaging for Winter Gifting',
      'Custom Color Dyeing (>500 pcs)'
    ],
    dispatchDays: '5 - 8 Days',
    wholesaleTiers: [
      { minQty: 24, maxQty: 99, pricePerPieceEst: 'Winter Tier 1', discountPct: 'Standard B2B' },
      { minQty: 100, maxQty: 499, pricePerPieceEst: 'Winter Tier 2', discountPct: '15% Volume Discount' },
      { minQty: 500, maxQty: 'Bulk Contract', pricePerPieceEst: 'Direct Mill Contract Rate', discountPct: 'Max B2B Rebate' }
    ],
    isFeatured: true,
    bestFor: ['North India & Hill Station Retailers', 'Export Wholesalers', 'Corporate Winter Distribution'],
    fitType: 'Thermal Comfort Fit',
    shrinkageRate: '<1.0%',
    washingCare: 'Gentle Cycle Wool Wash'
  }
];
