// High-performance client-side cache for instant 0ms transitions
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES, FALLBACK_SERVICES } from './fallbackData';

const MEMORY_CACHE = {
  products: null,
  categories: null,
  services: null,
  productMap: new Map()
};

const STORAGE_KEYS = {
  PRODUCTS: 'lucky_cache_products',
  CATEGORIES: 'lucky_cache_categories',
  SERVICES: 'lucky_cache_services'
};

const safeParse = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

export const getCachedProducts = () => {
  if (MEMORY_CACHE.products && MEMORY_CACHE.products.length > 0) {
    return MEMORY_CACHE.products;
  }
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
      const parsed = safeParse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        MEMORY_CACHE.products = parsed;
        parsed.forEach((p) => {
          if (p && p._id) MEMORY_CACHE.productMap.set(p._id, p);
        });
        return parsed;
      }
    }
  } catch (e) {
    // SessionStorage unavailable or restricted
  }
  // Return instant fallback catalog so UI is never blank
  return FALLBACK_PRODUCTS;
};

export const setCachedProducts = (products) => {
  if (!Array.isArray(products) || products.length === 0) return;
  MEMORY_CACHE.products = products;
  products.forEach((p) => {
    if (p && p._id) MEMORY_CACHE.productMap.set(p._id, p);
  });
  try {
    sessionStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {}
};

export const getCachedProductById = (id) => {
  if (!id) return null;
  if (MEMORY_CACHE.productMap.has(id)) {
    return MEMORY_CACHE.productMap.get(id);
  }
  const products = getCachedProducts();
  const found = products.find((p) => p && (p._id === id || p.id === id));
  if (found) {
    MEMORY_CACHE.productMap.set(id, found);
    return found;
  }
  return null;
};

export const setCachedProduct = (product) => {
  if (!product || !product._id) return;
  MEMORY_CACHE.productMap.set(product._id, product);
};

export const getCachedCategories = () => {
  if (MEMORY_CACHE.categories && MEMORY_CACHE.categories.length > 0) {
    return MEMORY_CACHE.categories;
  }
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (stored) {
      const parsed = safeParse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        MEMORY_CACHE.categories = parsed;
        return parsed;
      }
    }
  } catch (e) {}
  return FALLBACK_CATEGORIES;
};

export const setCachedCategories = (categories) => {
  if (!Array.isArray(categories) || categories.length === 0) return;
  MEMORY_CACHE.categories = categories;
  try {
    sessionStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (e) {}
};

export const getCachedServices = () => {
  if (MEMORY_CACHE.services && MEMORY_CACHE.services.length > 0) {
    return MEMORY_CACHE.services;
  }
  try {
    const stored = sessionStorage.getItem(STORAGE_KEYS.SERVICES);
    if (stored) {
      const parsed = safeParse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        MEMORY_CACHE.services = parsed;
        return parsed;
      }
    }
  } catch (e) {}
  return FALLBACK_SERVICES;
};

export const setCachedServices = (services) => {
  if (!Array.isArray(services) || services.length === 0) return;
  MEMORY_CACHE.services = services;
  try {
    sessionStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  } catch (e) {}
};

export const clearDataCache = () => {
  MEMORY_CACHE.products = null;
  MEMORY_CACHE.categories = null;
  MEMORY_CACHE.services = null;
  MEMORY_CACHE.productMap.clear();
  try {
    sessionStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    sessionStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    sessionStorage.removeItem(STORAGE_KEYS.SERVICES);
  } catch (e) {}
};
