import { FabricInfo } from '../types';

export const FABRICS: FabricInfo[] = [
  {
    id: 'f-100-cotton',
    name: '100% Super Combed Compact Cotton',
    gsmRange: '180 GSM - 280 GSM',
    composition: '100% Long-Staple Combed Cotton',
    bestFor: ['Oversized T-Shirts', 'Premium Streetwear', 'Custom Brand Merch'],
    texture: 'Ultra Smooth, Silky Handfeel',
    breathability: 10,
    durability: 9,
    softness: 10,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    description: 'Combed to remove shorter fibers and impurities, resulting in a silk-smooth surface perfect for high-density screen printing and DTG.'
  },
  {
    id: 'f-loopknit-fleece',
    name: 'Cotton-Rich Heavyweight Loopknit & Fleece',
    gsmRange: '300 GSM - 380 GSM',
    composition: '80% Cotton, 20% Anti-Pill Polyester',
    bestFor: ['Heavyweight Hoodies', 'Winter Sweatshirts', 'Lounge Sets'],
    texture: 'Dense Outer Face, Brushed Plush Inner',
    breathability: 8,
    durability: 10,
    softness: 9,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    description: 'Provides maximum thermal retention while resisting surface pilling over time. Ideal for luxury winter apparel lines.'
  },
  {
    id: 'f-french-terry',
    name: 'Luxury French Terry (Loop Knit Back)',
    gsmRange: '260 GSM - 340 GSM',
    composition: '100% Cotton or 90/10 Blend',
    bestFor: ['All-Season Hoodies', 'Luxury Joggers', 'Oversized Sweaters'],
    texture: 'Smooth Exterior with Unbrushed Soft Loops Inside',
    breathability: 9,
    durability: 9,
    softness: 9,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
    description: 'Absorbent, structured, and breathable. High drape quality favored by contemporary streetwear brands.'
  },
  {
    id: 'f-lycra-interlock',
    name: '4-Way Stretch Lycra Interlock',
    gsmRange: '220 GSM - 300 GSM',
    composition: '88% Polyester / Nylon, 12% Spandex',
    bestFor: ['Tech Joggers', 'Athletic Tracksuits', 'Gymwear'],
    texture: 'Sleek, Cool-Touch Moisture Wicking Surface',
    breathability: 9,
    durability: 10,
    softness: 8,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    description: 'High recovery power retaining elasticity after hundreds of stretch cycles. Ideal for high performance activewear.'
  }
];
