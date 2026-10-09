import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RefreshCw, Package, X, Check } from 'lucide-react';
import API from '../services/api';
import { 
  getCachedProducts, 
  setCachedProducts, 
  getCachedCategories, 
  setCachedCategories 
} from '../services/dataCache';
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from '../services/fallbackData';
import ProductCard from '../components/ProductCard';
import EnquiryModal from '../components/EnquiryModal';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cachedProds = getCachedProducts();
  const cachedCats = getCachedCategories();
  const [products, setProducts] = useState(
    Array.isArray(cachedProds) && cachedProds.length > 0 ? cachedProds : FALLBACK_PRODUCTS
  );
  const [categories, setCategories] = useState(
    Array.isArray(cachedCats) && cachedCats.length > 0 ? cachedCats : FALLBACK_CATEGORIES
  );
  const [loading, setLoading] = useState(false);

  // Filters state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [availability, setAvailability] = useState('all');
  const [priceSort, setPriceSort] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Modal state
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, availability, priceSort, searchParams]);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      if (res.data?.success && Array.isArray(res.data.categories) && res.data.categories.length > 0) {
        setCategories(res.data.categories);
        setCachedCategories(res.data.categories);
      }
    } catch (err) {
      console.warn('Categories API fetch delayed, using cached fallback:', err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const search = searchParams.get('search') || searchTerm;
      let url = `/products?status=active`;
      
      if (selectedCategory && selectedCategory !== 'All') {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      if (availability !== 'all') {
        url += `&availability=${availability}`;
      }
      if (priceSort === 'price-low') url += `&sort=price-low`;
      if (priceSort === 'price-high') url += `&sort=price-high`;

      const res = await API.get(url);
      if (res.data?.success && Array.isArray(res.data.products) && res.data.products.length > 0) {
        setProducts(res.data.products);
        if (!search && (!selectedCategory || selectedCategory === 'All') && availability === 'all') {
          setCachedProducts(res.data.products);
        }
      }
    } catch (err) {
      console.warn('Products API fetch delayed, retaining active products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ search: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setAvailability('all');
    setPriceSort('newest');
    setSearchParams({});
  };

  const handleOpenEnquiry = (productName = '') => {
    setSelectedProduct(productName);
    setEnquiryModalOpen(true);
  };

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) + 
                            (availability !== 'all' ? 1 : 0) + 
                            (priceSort !== 'newest' ? 1 : 0) + 
                            (searchTerm.trim() ? 1 : 0);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Search / Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Security Products & Hardware Catalog
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Browse CCTV cameras, biometric systems, DVR/NVR, access control and accessories.
          </p>
        </div>

        {/* Controls: Search + Filter Toggle */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search cameras, DVR, specs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs sm:text-sm px-4 py-3 pl-10 pr-8 rounded-xl border border-slate-300 dark:border-slate-700/80 focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            {searchTerm && (
              <button
                type="button"
                onClick={() => { setSearchTerm(''); setSearchParams({}); }}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Filter Icon Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2.5 text-xs font-extrabold px-4 py-3 rounded-xl border transition-all duration-200 shadow-md shrink-0 ${
              isFilterOpen || activeFilterCount > 0
                ? 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500 shadow-blue-600/30'
                : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-white'
            }`}
            title="Toggle Filter Options"
          >
            <SlidersHorizontal className="w-4 h-4 text-cyan-600 dark:text-cyan-300" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="bg-blue-600 dark:bg-white text-white dark:text-blue-700 font-black text-[11px] px-2 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Filter Drawer Panel */}
      {isFilterOpen && (
        <div className="bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xl space-y-6 transition-all duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Filter Products</h3>
            </div>
            
            <div className="flex items-center gap-4">
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
                </button>
              )}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Categories Pills & Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Category Pills */}
            <div className="md:col-span-7 space-y-2">
              <label className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                    selectedCategory === 'All'
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id || cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                      selectedCategory === cat.name
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Dropdown */}
            <div className="md:col-span-2.5 space-y-2">
              <label className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Stock Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Products</option>
                <option value="in-stock">In Stock Only</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            {/* Sorting Dropdown */}
            <div className="md:col-span-2.5 space-y-2">
              <label className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Sort By Price
              </label>
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>
      )}

      {/* Active Filter Badges Bar & Results Count */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900/60 px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800/80 text-xs shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            Showing <span className="text-slate-900 dark:text-white font-bold">{products.length}</span> security products
          </span>

          {selectedCategory !== 'All' && (
            <span className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')} className="hover:text-blue-900 dark:hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {availability !== 'all' && (
            <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
              {availability === 'in-stock' ? 'In Stock Only' : 'Out of Stock'}
              <button onClick={() => setAvailability('all')} className="hover:text-emerald-900 dark:hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {priceSort !== 'newest' && (
            <span className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
              {priceSort === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
              <button onClick={() => setPriceSort('newest')} className="hover:text-purple-900 dark:hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={handleResetFilters}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold underline underline-offset-4 transition"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Full-Width Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-slate-200 dark:bg-slate-900/50 rounded-2xl h-80 animate-pulse border border-slate-300 dark:border-slate-800"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Security Products Found</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto">
            No matching security products found for your selected filters or search query.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/30"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        /* Clean Responsive 4-Column Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEnquire={(name) => handleOpenEnquiry(name)}
            />
          ))}
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        productName={selectedProduct}
      />

    </div>
  );
};

export default Products;
