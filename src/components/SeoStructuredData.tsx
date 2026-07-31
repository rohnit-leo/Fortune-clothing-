import React, { useEffect } from 'react';

export const SeoStructuredData: React.FC = () => {
  useEffect(() => {
    // Inject JSON-LD Schema on mount
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Fortune Clothing Company",
      "url": "https://fortuneclothing.in",
      "logo": "https://fortuneclothing.in/logo.png",
      "description": "Premium B2B Garment Manufacturer & Wholesale Supplier in Ludhiana, Punjab, India.",
      "telephone": "+917528802003",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No. 83, Gobindpuri, Bahadur Ke Road",
        "addressLocality": "Ludhiana",
        "addressRegion": "Punjab",
        "postalCode": "141008",
        "addressCountry": "IN"
      },
      "vatID": "03AWNPV5250E3ZE",
      "knowsAbout": [
        "Garment Manufacturing",
        "Wholesale T-Shirts",
        "Heavyweight Hoodies",
        "Private Label Apparel",
        "Ludhiana Hosiery Industry"
      ]
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Fortune Clothing Company",
      "image": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80",
      "telephone": "+917528802003",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No. 83, Gobindpuri, Bahadur Ke Road",
        "addressLocality": "Ludhiana",
        "addressRegion": "Punjab",
        "postalCode": "141008",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    };

    const scriptOrg = document.createElement('script');
    scriptOrg.type = 'application/ld+json';
    scriptOrg.text = JSON.stringify(organizationSchema);
    document.head.appendChild(scriptOrg);

    const scriptLocal = document.createElement('script');
    scriptLocal.type = 'application/ld+json';
    scriptLocal.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(scriptLocal);

    return () => {
      document.head.removeChild(scriptOrg);
      document.head.removeChild(scriptLocal);
    };
  }, []);

  return null;
};
