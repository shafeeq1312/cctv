import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Camera, Search, Menu, X, Phone, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5Dh3X6wA63V0Bwc99yOUT_iB9wNTgGz1rph8VM1EJneCUgE42cQ3Wmop&s=10";

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl transition-colors duration-300 w-full">
      
      {/* Main Full-Width Desktop Navbar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Custom Brand Logo */}
          <Link to="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/80 overflow-hidden flex items-center justify-center p-1 shadow-md group-hover:scale-105 group-hover:border-cyan-500 transition-all duration-300">
              <img 
                src={logoUrl} 
                alt="Lucky Communication Logo" 
                className="w-full h-full object-contain rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-tight">
                LUCKY <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">COMMUNICATION</span>
              </span>
              <span className="text-[10px] tracking-widest text-cyan-400 uppercase block font-black">
                CCTV & Security Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-full border border-slate-800 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Contact Button */}
          <div className="hidden lg:flex items-center gap-3.5 shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search CCTV, cameras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52 bg-slate-900 text-xs text-white placeholder-slate-400 px-4 py-2.5 pl-9 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            </form>

            <Link
              to="/contact"
              className="btn-accent-glow text-slate-950 font-black text-xs px-6 py-2.5 rounded-xl shadow-lg transition transform active:scale-95"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 pt-2 pb-6 space-y-4 animate-fade-in shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-xs text-white placeholder-slate-400 px-4 py-3 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </form>

          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-extrabold transition ${
                  isActive(link.path)
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-3 rounded-xl shadow-md text-xs block uppercase tracking-wider"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
