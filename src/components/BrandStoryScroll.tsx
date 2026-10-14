import React from 'react';
import { REAL_PRODUCT_IMAGES } from '../data/products';
import { Award } from 'lucide-react';
import { handleImageError } from '../utils/imageUrl';

export const BrandStoryScroll: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-200 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-syne font-normal uppercase tracking-widest text-[#C5A059]">
            <Award className="w-4 h-4 text-[#C5A059]" /> Ludhiana Textile Legacy
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-gray-900">
            Crafting India’s Finest High-Density Heavyweight Garments
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans font-normal">
            From raw bio-washed combed yarn to high-volume automated cut-and-sew lines, Fortune Clothing Company manufactures 15,000+ export-grade knitwear pieces daily.
          </p>
        </div>

        {/* 3 Grid Story Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <img 
              src={REAL_PRODUCT_IMAGES[0]} 
              alt="Cotton Yarn" 
              onError={(e) => handleImageError(e, '/images/cat_tshirts.jpg')}
              className="w-full h-40 sm:h-44 object-cover rounded-xl border border-gray-100" 
            />
            <span className="text-[10px] font-syne font-normal text-[#C5A059] uppercase tracking-wider block">01. MILL KNITTING & DYEING</span>
            <h3 className="font-serif font-normal text-base sm:text-lg text-gray-900">100% Super Combed Compact Cotton</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Zero-pilling bio-silicon enzyme washed fabric. Ultra-durable 240 to 420 GSM knits engineered for structured streetwear fits.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <img 
              src={REAL_PRODUCT_IMAGES[3]} 
              alt="Cutting & Sewing" 
              onError={(e) => handleImageError(e, '/images/cat_polos.jpg')}
              className="w-full h-40 sm:h-44 object-cover rounded-xl border border-gray-100" 
            />
            <span className="text-[10px] font-syne font-normal text-[#C5A059] uppercase tracking-wider block">02. AUTOMATED CUT & SEW</span>
            <h3 className="font-serif font-normal text-base sm:text-lg text-gray-900">High-Density Twin Needle Stitching</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Reinforced 1x1 ribbed collar neckbands, shoulder-to-shoulder taping, and German needle machinery for zero seam distortion.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <img 
              src={REAL_PRODUCT_IMAGES[6]} 
              alt="AQL Inspection" 
              onError={(e) => handleImageError(e, '/images/hero_flatlay.jpg')}
              className="w-full h-40 sm:h-44 object-cover rounded-xl border border-gray-100" 
            />
            <span className="text-[10px] font-syne font-normal text-[#C5A059] uppercase tracking-wider block">03. EXPORT GRADE AUDIT</span>
            <h3 className="font-serif font-normal text-base sm:text-lg text-gray-900">AQL 2.5 Quality Assurance</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Multi-point inspection covering dimensional stability, colorfastness to washing, seam strength, and barcode compliance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
