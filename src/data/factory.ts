import { FactoryStep } from '../types';

export const FACTORY_HIGHLIGHTS = {
  dailyCapacity: '25,000+ Units Daily',
  factoryArea: '65,000+ Sq. Ft. Facility',
  stateOfArtMachines: 'Juki & Yamato Automated Lines',
  qualityPassRate: '99.6% First-Time QC Pass',
  exportCountries: 'Pan India & Global Export Ready',
  location: 'Plot No. 83, Gobindpuri, Bahadur Ke Road, Ludhiana, Punjab, India',
  gstin: '03AWNPV5250E3ZE',
  whatsapp: '+91 75288 02003'
};

export const FACTORY_STEPS: FactoryStep[] = [
  {
    step: 1,
    title: 'Precision Yarn Selection & Knitting',
    subtitle: '100% Combed Compact Yarns & High-Gauge Circular Knitting',
    capacity: '12,000 KG Fabric Daily',
    description: 'We source certified long-staple cotton yarn processed through Mayer & Cie circular knitting machines for consistent GSM, zero slant, and uniform loop structure.',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
    highlights: ['High-Gauge Circular Knitting', 'Zero-Slant Fabric Tech', 'ISO Yarn Strength Verification']
  },
  {
    step: 2,
    title: 'Eco-Friendly Dyeing & Bio-Wash Finishing',
    subtitle: 'Zero Liquid Discharge & Color Fastness ISO Standard',
    capacity: '15,000 KG Dyeing Capacity',
    description: 'Computerized soft-flow dyeing ensures vibrant, color-fast hues without bleeding. Bio-wash enzyme treatment eliminates surface fuzz for smooth printing.',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Azo-Free Reactive Dyes', 'Enzyme Bio-Washing', 'Pantone Color Matching <0.5 Delta']
  },
  {
    step: 3,
    title: 'Automated Computerized Pattern Cutting',
    subtitle: 'Gerber Automatic Spreading & Cutting System',
    capacity: '30,000 Cut Pieces / Day',
    description: 'Precision CAD pattern engineering cut by automated laser-guided cutters, guaranteeing zero dimensional tolerance variance across size runs from S to 5XL.',
    icon: 'Scissors',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
    highlights: ['0.1mm Cutting Precision', 'Zero-Waste Pattern Nesting', 'Laser Alignment Calibration']
  },
  {
    step: 4,
    title: 'High-Precision Unit Assembly & Stitching',
    subtitle: 'Yamato Twin-Needle & Juki Overlock Assembly Lines',
    capacity: '25,000 Finished Units Daily',
    description: 'Specialized modular sewing lines featuring automatic thread trimmers, tension meters, and differential feed mechanisms for clean necklines and durable seams.',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Twin-Needle Coverstitching', 'Reinforced Neck Taping', 'Spandex Stretch Threading']
  },
  {
    step: 5,
    title: 'Custom Screen, HD Puff & Embroidery Studio',
    subtitle: 'M&R Automatic Oval Screen Printing & Tajima Embroidery',
    capacity: '18,000 Prints / Day',
    description: 'In-house high-density plastisol, water-based, DTG, and 3D metallic embroidery units capable of intricate graphic detail and durable wash cycles.',
    icon: 'Printer',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80',
    highlights: ['12-Color Automatic Oval Presses', 'High-Density Puff & Discharge', 'Tajima 20-Head Embroidery']
  },
  {
    step: 6,
    title: '4-Point Quality Inspection & Fast Logistics',
    subtitle: 'AQL 2.5 Standard Inspection, Custom Packing & Dispatch',
    capacity: '25,000 Packed Units / Day',
    description: 'Every batch undergoes needle-detector testing, GSM verification, seam tension checks, and custom barcode packaging before dispatch across India.',
    icon: 'CheckCircle2',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    highlights: ['AQL 2.5 Quality Protocol', 'Metal Needle Detection', 'Custom Branding & Polybagging']
  }
];
