import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Sparkles, 
  Search,
  Package
} from 'lucide-react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import EnquiryModal from '../components/EnquiryModal';

const Home = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Quick Search on Home Page
  const [homeSearch, setHomeSearch] = useState('');

  // Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    fetchHomeProducts();
  }, []);

  const fetchHomeProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/products?status=active');
      if (res.data.success) {
        setAllProducts(res.data.products);
      }
    } catch (error) {
      console.error('Error fetching home products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEnquiry = (prodName = '') => {
    setSelectedProduct(prodName);
    setEnquiryModalOpen(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (homeSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(homeSearch.trim())}`);
    }
  };

  // Filter products by search term if typed
  const displayedProducts = allProducts.filter((p) => {
    return (
      homeSearch.trim() === '' ||
      p.name.toLowerCase().includes(homeSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(homeSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(homeSearch.toLowerCase())
    );
  });

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* 1. STUNNING VIBRANT HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-gray-950 dark:to-slate-950 pt-10 pb-16 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-purple-600/10 dark:bg-purple-600/15 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 px-4 py-1.5 rounded-full text-xs font-black shadow-md tracking-wide">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Authorized Security Hardware & Installation
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Protect What <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Matters Most</span>
              </h1>

              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Smart CCTV & Security Solutions for Homes, Shops, Offices and Businesses. High definition surveillance, biometric attendance, and access control devices.
              </p>

              {/* Action Buttons with z-50 positioning */}
              <div className="relative z-50 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#home-all-products-grid"
                  className="w-full sm:w-auto btn-primary-glow text-white font-black text-sm px-8 py-4 rounded-2xl flex items-center justify-center gap-2 group hover:scale-105 active:scale-95 shadow-xl transition-all duration-300"
                >
                  Explore Products <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-cyan-400 hover:text-white border border-cyan-500/40 hover:border-cyan-400 font-black text-sm px-8 py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-cyan-500/20"
                >
                  Contact Us
                </Link>
              </div>

              {/* Badges (Free Site Visit & Genuine Brands) */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 gap-4 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-black max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-2.5 justify-center lg:justify-start group cursor-default">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 group-hover:scale-125 transition-transform duration-200" />
                  <span>Free Dindigul Site Visit</span>
                </div>
                <div className="flex items-center gap-2.5 justify-center lg:justify-start group cursor-default">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0 group-hover:scale-125 transition-transform duration-200" />
                  <span>100% Genuine Brands</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card (Centered HD CCTV Camera) */}
            <div className="lg:col-span-5 animate-float flex items-center justify-center mx-auto w-full">
              <div className="w-full relative rounded-3xl p-2.5 bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 shadow-2xl shadow-cyan-500/15 overflow-hidden group transition-all duration-500 hover:shadow-cyan-500/30">
                
                {/* Live Surveillance Badge */}
                <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-rose-500/40 flex items-center gap-2 shadow-lg">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-rose-300 uppercase tracking-wider">LIVE SURVEILLANCE</span>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR62fpPlFyBxPOam7jZT15Wa8jrNJ9SSYLoVJlElLWaiSn3j1fOxFhIUUg&s=10"
                    alt="Modern HD CCTV Security Camera System"
                    className="w-full h-[340px] sm:h-[400px] object-cover rounded-2xl group-hover:scale-108 transition-transform duration-700 ease-out select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  {/* Subtle Gradient Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between shadow-2xl group-hover:border-cyan-500/50 transition-colors duration-300">
                  <div>
                    <span className="text-[10px] text-cyan-400 font-black uppercase tracking-wider block">4K Night Vision CCTV</span>
                    <span className="text-white font-extrabold text-xs">High Definition Security Systems</span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/40 group-hover:rotate-12 transition-transform duration-300">
                    <Camera className="w-4.5 h-4.5 text-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DIRECT PRODUCTS DISPLAY SECTION */}
      <section id="home-all-products-grid" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 scroll-mt-24 space-y-8">
        
        {/* Section Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/80 px-3.5 py-1 rounded-full border border-cyan-300 dark:border-cyan-800/60 shadow-md">
              Security Hardware Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">
              All CCTV & Security Products
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 font-medium">
              Browse all CCTV cameras, biometric systems, DVR/NVR recorders, and security accessories.
            </p>
          </div>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Search CCTV, cameras, specs..."
              value={homeSearch}
              onChange={(e) => setHomeSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs px-4 py-3 pl-10 rounded-xl border border-slate-300 dark:border-slate-800 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </form>
        </div>

        {/* PRODUCTS GRID DISPLAY */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-slate-200 dark:bg-slate-800/50 rounded-3xl h-80 animate-pulse border border-slate-300 dark:border-slate-700"></div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center space-y-3 shadow-md">
            <Package className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">No Products Found</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs max-w-sm mx-auto font-medium">
              No products found matching your search term.
            </p>
            <button
              onClick={() => setHomeSearch('')}
              className="btn-primary-glow text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEnquire={(name) => handleOpenEnquiry(name)}
              />
            ))}
          </div>
        )}

      </section>

      {/* 3. CALL TO ACTION BANNER */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-white dark:bg-gradient-to-r dark:from-blue-950 dark:via-indigo-950 dark:to-slate-950 border border-slate-200 dark:border-blue-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Need a Custom Security Setup for Your Business?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
              Get expert advice, free site survey, and customized CCTV price quotes for your home, shop, office or warehouse.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => handleOpenEnquiry()}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-7 py-3.5 rounded-xl shadow-lg text-xs transition transform active:scale-95"
            >
              Send Custom Enquiry
            </button>
            <a
              href="tel:+919876543210"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-7 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition"
            >
              <Phone className="w-4 h-4" /> Call +91 98765 43210
            </a>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        productName={selectedProduct}
      />

    </div>
  );
};

export default Home;
