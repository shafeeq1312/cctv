import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Camera, 
  ArrowRight, 
  CheckCircle, 
  Phone, 
  Sparkles, 
  Search,
  Package,
  MapPin,
  ShieldCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Layers,
  Video,
  Flame
} from 'lucide-react';
import API from '../services/api';
import { getCachedProducts, setCachedProducts } from '../services/dataCache';
import { FALLBACK_PRODUCTS } from '../services/fallbackData';
import ProductCard from '../components/ProductCard';
import EnquiryModal from '../components/EnquiryModal';

// Multi-Image Hero Showcase Gallery with high-resolution CCTV hardware photography
const HERO_SHOWCASE_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80',
    title: 'Hikvision 4K Ultra HD Bullet Camera',
    tag: 'Outdoor Weatherproof • EXIR 2.0 Night Vision (30m)',
    chip: '4K Bullet',
    camCode: 'CAM-01',
    res: '4K UHD'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80',
    title: 'CP Plus 360° Smart PTZ Dome Camera',
    tag: 'Motorized Pan-Tilt-Zoom • Smart Motion Tracking',
    chip: '360° PTZ',
    camCode: 'CAM-02',
    res: '2K QHD'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=900&q=80',
    title: 'ColorVu 24/7 Full-Color Night Surveillance',
    tag: 'Vibrant Day-Quality Color in Pitch Darkness',
    chip: 'ColorVu',
    camCode: 'CAM-03',
    res: 'COLORVU'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
    title: 'Realtime AI Face Recognition & Biometric System',
    tag: 'Dual High-Speed Face, Fingerprint & RFID Access',
    chip: 'Biometrics',
    camCode: 'BIO-01',
    res: 'AI-FACE'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80',
    title: '16-Channel Surveillance DVR / NVR Control Station',
    tag: 'Multi-Screen Live Monitoring & High Capacity Storage',
    chip: 'DVR Hub',
    camCode: 'NVR-16',
    res: '16-CH HUB'
  },
  {
    id: 6,
    url: '/images/lucky_banner.png',
    title: 'Lucky Communication Official Showroom',
    tag: '17, Aarthi Theatre Road, Dindigul • Since 2013',
    chip: 'Store',
    camCode: 'STORE',
    res: 'DINDIGUL'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const cachedInitial = getCachedProducts();
  const [allProducts, setAllProducts] = useState(
    cachedInitial && cachedInitial.length > 0 ? cachedInitial : FALLBACK_PRODUCTS
  );
  const [loading, setLoading] = useState(false);
  
  // Hero Multi-Image Carousel State
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // Quick Search on Home Page
  const [homeSearch, setHomeSearch] = useState('');

  // Modal State
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Auto-slide hero images every 3 seconds using useEffect
  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_SHOWCASE_IMAGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHeroPaused]);

  useEffect(() => {
    fetchHomeProducts();
  }, []);

  const fetchHomeProducts = async () => {
    try {
      const res = await API.get('/products?status=active');
      const productsData = res.data?.products || (Array.isArray(res.data) ? res.data : []);
      if (Array.isArray(productsData) && productsData.length > 0) {
        setAllProducts(productsData);
        setCachedProducts(productsData);
      }
    } catch (error) {
      console.warn('Backend fetch delayed, using cached fallback products:', error.message);
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

  const handleNextHero = () => {
    setHeroIndex((prev) => (prev + 1) % HERO_SHOWCASE_IMAGES.length);
  };

  const handlePrevHero = () => {
    setHeroIndex((prev) => (prev - 1 + HERO_SHOWCASE_IMAGES.length) % HERO_SHOWCASE_IMAGES.length);
  };

  // Safely filter products by search term if typed
  const displayedProducts = (allProducts.length > 0 ? allProducts : FALLBACK_PRODUCTS).filter((p) => {
    if (!p) return false;
    const search = homeSearch.trim().toLowerCase();
    if (!search) return true;
    const name = String(p.name || '').toLowerCase();
    const category = String(p.category || '').toLowerCase();
    const description = String(p.description || '').toLowerCase();
    return name.includes(search) || category.includes(search) || description.includes(search);
  });

  const currentHero = HERO_SHOWCASE_IMAGES[heroIndex];

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* 1. STUNNING VIBRANT HERO SECTION WITH MULTI-IMAGE CAROUSEL */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-gray-950 dark:to-slate-950 pt-10 pb-16 border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-purple-600/10 dark:bg-purple-600/15 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content - Clean & Spacious */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left animate-fade-in">
              
              {/* Location & Brand Pill */}
              <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-cyan-500/30 text-cyan-400 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md tracking-wide backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>17, Aarthi Theatre Rd, Dindigul</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-300 hidden sm:inline">CCTV & Security Store</span>
              </div>

              {/* Main Headline with Shop Name */}
              <div className="space-y-1.5">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  LUCKY <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">COMMUNICATION</span>
                </h1>
                <p className="text-base sm:text-xl font-bold text-cyan-300/90 tracking-wide">
                  Smart CCTV & Security Solutions • Dindigul
                </p>
              </div>

              {/* Crisp Description Words */}
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Authorized sales & expert installation of 4K night-vision CCTV cameras, biometric systems, and smart surveillance for homes, shops, and businesses.
              </p>

              {/* Clean Action Buttons */}
              <div className="relative z-30 flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#home-all-products-grid"
                  className="w-full sm:w-auto btn-primary-glow text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 group hover:scale-105 active:scale-95 shadow-xl transition-all duration-300"
                >
                  Explore Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-white border border-slate-700 hover:border-cyan-400 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Contact Store
                </Link>
                <a
                  href="tel:9876543210"
                  className="w-full sm:w-auto bg-emerald-950/50 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> +91 98765 43210
                </a>
              </div>

              {/* Clean Trust Indicators */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-slate-400 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free Site Visit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Genuine Brands</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>1 Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Right Hero Multi-Image CCTV Surveillance HUD Showcase (Ultra-Attractive UI) */}
            <div 
              className="lg:col-span-5 flex flex-col items-center justify-center mx-auto w-full relative group"
              onMouseEnter={() => setIsHeroPaused(true)}
              onMouseLeave={() => setIsHeroPaused(false)}
            >
              {/* Ambient Cyber Neon Aura Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/25 via-blue-600/20 to-purple-600/25 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-all duration-700 pointer-events-none"></div>

              {/* Main Monitor Console Chassis */}
              <div className="w-full relative rounded-3xl p-3 sm:p-4 bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400 shadow-2xl shadow-cyan-500/20 overflow-hidden transition-all duration-500">
                
                {/* 1. Top Segmented Progress Bar (3s Auto-Slide Indicator) */}
                <div className="grid grid-cols-6 gap-1.5 mb-3 px-1">
                  {HERO_SHOWCASE_IMAGES.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setHeroIndex(idx)}
                      className="group/bar relative h-1.5 rounded-full overflow-hidden bg-slate-800 transition-all hover:h-2"
                      title={img.title}
                    >
                      <div
                        className={`h-full rounded-full transition-all ${
                          heroIndex === idx
                            ? 'w-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-sm shadow-cyan-400'
                            : idx < heroIndex
                            ? 'w-full bg-slate-600'
                            : 'w-0'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* 2. CCTV Camera Viewfinder Screen Container */}
                <div className="relative overflow-hidden rounded-2xl h-[330px] sm:h-[390px] bg-slate-950 flex items-center justify-center border border-slate-800">
                  
                  {/* Camera Viewfinder 4-Corner Reticle Brackets */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400/90 pointer-events-none z-20"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/90 pointer-events-none z-20"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/90 pointer-events-none z-20"></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-cyan-400/90 pointer-events-none z-20"></div>

                  {/* Viewfinder Center Crosshair */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-20">
                    <div className="w-10 h-10 border border-cyan-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Top HUD Overlay Bar */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none px-2">
                    {/* Camera Feed Code & Resolution */}
                    <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      <span>{currentHero.camCode} // {currentHero.res}</span>
                    </div>

                    {/* Live Surveillance Pulsing Indicator */}
                    <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-rose-500/40 flex items-center gap-2 shadow-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                      <span className="text-[10px] font-black text-rose-300 uppercase tracking-wider">
                        REC • LIVE
                      </span>
                    </div>
                  </div>

                  {/* Displayed CCTV Camera Photo with Smooth Scale & Transition */}
                  <img
                    key={currentHero.id}
                    src={currentHero.url}
                    alt={currentHero.title}
                    className="w-full h-full object-cover rounded-2xl select-none transition-all duration-700 ease-out group-hover:scale-105"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />

                  {/* Vignette & Gradient Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 pointer-events-none"></div>

                  {/* Subtle Laser Scanline Beam */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-scanline pointer-events-none"></div>

                  {/* Left Navigation Arrow */}
                  <button
                    onClick={handlePrevHero}
                    aria-label="Previous CCTV Image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/75 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700/80 hover:border-cyan-400 flex items-center justify-center transition-all duration-200 z-20 backdrop-blur-sm shadow-xl active:scale-90"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right Navigation Arrow */}
                  <button
                    onClick={handleNextHero}
                    aria-label="Next CCTV Image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/75 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700/80 hover:border-cyan-400 flex items-center justify-center transition-all duration-200 z-20 backdrop-blur-sm shadow-xl active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Floating Bottom Info Card */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 shadow-2xl z-20 flex items-center justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-xs sm:text-sm font-black text-white tracking-tight block truncate">
                        {currentHero.title}
                      </span>
                      <p className="text-[11px] text-cyan-300 font-semibold truncate">
                        {currentHero.tag}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenEnquiry(currentHero.title)}
                      className="shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-md transition transform active:scale-95 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Quote
                    </button>
                  </div>
                </div>

                {/* 3. Camera Feed Selector Chips Bar (Direct Camera Switching) */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none w-full">
                    {HERO_SHOWCASE_IMAGES.map((img, idx) => (
                      <button
                        key={img.id}
                        onClick={() => setHeroIndex(idx)}
                        className={`text-[11px] font-extrabold px-3 py-1.5 rounded-xl transition-all duration-300 shrink-0 flex items-center gap-1.5 ${
                          heroIndex === idx
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                            : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${heroIndex === idx ? 'bg-slate-950' : 'bg-slate-600'}`}></span>
                        <span>{img.chip}</span>
                      </button>
                    ))}
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
          <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-3xl p-12 text-center space-y-3 shadow-md max-w-lg mx-auto">
            <Package className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              No Products Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs max-w-sm mx-auto font-medium">
              No products found matching "{homeSearch}". Click below to clear search.
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
