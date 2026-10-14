import React from 'react';

export const DEFAULT_PRODUCT_IMAGE = '/images/cat_tshirts.jpg';
export const DEFAULT_HERO_IMAGE = '/images/hero_flatlay.jpg';

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'T-SHIRTS': '/images/cat_tshirts.jpg',
  'OVERSIZED': '/images/cat_oversized.jpg',
  'POLOS': '/images/cat_polos.jpg',
  'SWEATSHIRTS': '/images/cat_sweatshirts.jpg',
  'HOODIES': '/images/cat_hoodies.jpg',
  'TRACKSUITS': '/images/cat_tracksuits.jpg',
  'TRACK PANTS': '/images/cat_trackpants.jpg',
  'JACKETS': '/images/cat_jackets.jpg',
};

/**
 * Normalizes image URLs so that legacy `/src/assets/images/...` paths,
 * relative paths, or missing images all resolve cleanly to public production assets.
 */
export function resolveImageUrl(url?: string | null, fallback = DEFAULT_PRODUCT_IMAGE): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback;
  }

  const trimmed = url.trim();

  // Handle data URIs and full external URLs as-is
  if (trimmed.startsWith('data:') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  // Convert old Vite dev paths '/src/assets/images/' or 'src/assets/images/' to '/images/'
  if (trimmed.startsWith('/src/assets/images/')) {
    return trimmed.replace('/src/assets/images/', '/images/');
  }
  if (trimmed.startsWith('src/assets/images/')) {
    return trimmed.replace('src/assets/images/', '/images/');
  }

  // Already starting with '/' (e.g. '/images/...')
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  return `/${trimmed}`;
}

/**
 * Robust image error handler to prevent broken image placeholders
 * when external links (such as Vercel blobs or unvetted URLs) fail.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback = DEFAULT_PRODUCT_IMAGE
) {
  const target = e.currentTarget;
  if (target.dataset.hasFallback) return; // Prevent infinite fallback loops
  target.dataset.hasFallback = 'true';
  target.src = fallback;
}
