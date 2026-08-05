import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const SeoStructuredData: React.FC = () => {
  const { activeTab, selectedCategory, quickViewProduct } = useCart();

  useEffect(() => {
    // Dynamic Document Title and Meta Description for Page Views
    let pageTitle = 'Fortune Clothing Company | Ludhiana Garment Manufacturer & Wholesale B2B Apparel India';
    let pageDesc = "Fortune Clothing Company: Ludhiana's premier B2B garment manufacturer & wholesale supplier. Factory-direct 240+ GSM oversized t-shirts, 330+ GSM heavyweight hoodies, tracksuits & winterwear. Low MOQ 24 Pcs, PAN India dispatch & 100% GST tax credit.";

    if (activeTab === 'product-detail' && quickViewProduct) {
      pageTitle = `${quickViewProduct.name} (${quickViewProduct.gsm} GSM) Wholesale | Fortune Clothing Company Ludhiana`;
      pageDesc = `Wholesale ${quickViewProduct.name} manufactured by Fortune Clothing Company Ludhiana. ${quickViewProduct.subtitle}. ${quickViewProduct.fabric}. MOQ ${quickViewProduct.moq} Pcs with custom branding options.`;
    } else if (activeTab === 'catalogue') {
      if (selectedCategory) {
        pageTitle = `Wholesale ${selectedCategory} Manufacturer in Ludhiana | Fortune Clothing Company B2B`;
        pageDesc = `Explore factory-direct wholesale ${selectedCategory.toLowerCase()} from Ludhiana hosiery mills. High-GSM fabrics, custom OEM printing, low MOQs, and PAN India delivery.`;
      } else {
        pageTitle = 'Full Garment Wholesale Matrix & B2B Catalogue | Fortune Clothing Company Ludhiana';
        pageDesc = 'Browse our complete B2B apparel catalogue: 240 GSM oversized tees, 330 GSM fleece crewnecks, 380 GSM thermal hoodies, and winterwear from Ludhiana.';
      }
    } else if (activeTab === 'privatelabel') {
      pageTitle = 'Private Label Garment Manufacturing & Custom Branding OEM | Fortune Clothing Ludhiana';
      pageDesc = 'Launch your streetwear or retail fashion brand with Fortune Clothing Company. Custom screen printing, puff prints, woven neck tags, hangtags, and custom tech-pack execution.';
    } else if (activeTab === 'factory') {
      pageTitle = 'Ludhiana Textile & Hosiery Manufacturing Infrastructure | Fortune Clothing Mills';
      pageDesc = 'Discover Fortune Clothing Company’s high-gauge circular knitting, reactive azo-free dyeing, AQL 2.5 quality inspection, and Ludhiana cluster supply chain.';
    } else if (activeTab === 'calculator') {
      pageTitle = 'Wholesale Profit Margin & Tiered Pricing Calculator | Fortune Clothing B2B';
      pageDesc = 'Calculate wholesale bulk discounts, retailer profit margins, and GST tax credit breakdown on bulk garment orders with Fortune Clothing Company.';
    } else if (activeTab === 'tracker') {
      pageTitle = 'Live Order & Dispatch Status Tracker | Fortune Clothing Ludhiana Logistics';
      pageDesc = 'Track real-time B2B garment dispatches, Ludhiana logistics transit schedules, and courier documentation across India.';
    }

    document.title = pageTitle;

    // Update meta description tag
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', pageDesc);
    }

    // Dynamic FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Minimum Order Quantity (MOQ) for wholesale orders from Fortune Clothing Company?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our standard MOQ is 24 pieces per style/colorway for stock fabrics (e.g., 240 GSM tees, 330 GSM fleece sweatshirts). For custom dyed colors or special tech pack designs, MOQ is 100 to 200 pieces."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide GST tax invoices for business accounting and input credit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Fortune Clothing Company provides 100% compliant GST invoices (GSTIN: 03AWNPV5250E3ZE) with full e-way bill transport documentation for input tax credit claiming across India."
          }
        },
        {
          "@type": "Question",
          "name": "Can we inspect samples before placing a bulk manufacturing order?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We dispatch physical sample fabric swatches or prototype garments within 3 to 5 business days so your team can verify handfeel, fit, stitching density, and print quality."
          }
        },
        {
          "@type": "Question",
          "name": "What customization options do you support for private labels and streetwear brands?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer complete OEM/ODM solutions including screen printing (plastisol/waterbase), high-density 3D puff print, custom woven neck labels, hangtags, wash care labels, custom polybag packaging, and barcode labeling."
          }
        },
        {
          "@type": "Question",
          "name": "What are your dispatch timelines across India from Ludhiana?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stock wholesale orders are dispatched from our Ludhiana facility within 3 to 5 business days. Custom private label production runs take 7 to 12 business days depending on volume."
          }
        }
      ]
    };

    // ItemList / Product Catalog Schema
    const productCatalogSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Fortune Clothing Company Wholesale Garment Matrix",
      "description": "Ludhiana factory-direct wholesale blank apparel and custom manufacturing models",
      "numberOfItems": PRODUCTS.length,
      "itemListElement": PRODUCTS.map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": p.name,
          "image": p.images[0],
          "description": `${p.subtitle}. ${p.description}`,
          "sku": p.code,
          "mpn": p.code,
          "brand": {
            "@type": "Brand",
            "name": "Fortune Clothing Company"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Fortune Clothing Company",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ludhiana",
              "addressRegion": "Punjab",
              "addressCountry": "IN"
            }
          },
          "material": p.fabric,
          "category": p.category,
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "280",
            "highPrice": "1450",
            "offerCount": p.wholesaleTiers.length,
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Fortune Clothing Company"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "148"
          }
        }
      }))
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://fortuneclothing.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": activeTab === 'catalogue' ? 'Catalogue' : activeTab === 'privatelabel' ? 'Private Label' : activeTab === 'factory' ? 'Factory' : activeTab === 'calculator' ? 'Calculators' : 'Wholesale Direct',
          "item": `https://fortuneclothing.in/?tab=${activeTab}`
        }
      ]
    };

    const scriptFaq = document.createElement('script');
    scriptFaq.type = 'application/ld+json';
    scriptFaq.id = 'dynamic-faq-schema';
    scriptFaq.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptFaq);

    const scriptProducts = document.createElement('script');
    scriptProducts.type = 'application/ld+json';
    scriptProducts.id = 'dynamic-products-schema';
    scriptProducts.text = JSON.stringify(productCatalogSchema);
    document.head.appendChild(scriptProducts);

    const scriptBreadcrumbs = document.createElement('script');
    scriptBreadcrumbs.type = 'application/ld+json';
    scriptBreadcrumbs.id = 'dynamic-breadcrumbs-schema';
    scriptBreadcrumbs.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptBreadcrumbs);

    return () => {
      const elFaq = document.getElementById('dynamic-faq-schema');
      if (elFaq) document.head.removeChild(elFaq);
      const elProd = document.getElementById('dynamic-products-schema');
      if (elProd) document.head.removeChild(elProd);
      const elBread = document.getElementById('dynamic-breadcrumbs-schema');
      if (elBread) document.head.removeChild(elBread);
    };
  }, [activeTab, selectedCategory, quickViewProduct]);

  return null;
};
