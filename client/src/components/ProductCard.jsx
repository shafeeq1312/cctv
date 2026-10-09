import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

const ProductCard = ({ product, onEnquire }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="group bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/80 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-md dark:shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 animate-fade-in">
      
      {/* Image Container */}
      <div className="relative aspect-video sm:aspect-[4/3] w-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out select-none"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-cyan-950/90 backdrop-blur-md text-cyan-300 border border-cyan-500/40 text-[11px] font-black px-3.5 py-1 rounded-full shadow-lg tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {product.stock > 0 ? (
            <span className="bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-500/50 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> In Stock
            </span>
          ) : (
            <span className="bg-rose-950/90 backdrop-blur-md text-rose-300 border border-rose-500/50 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
              <AlertCircle className="w-3 h-3 text-rose-400" /> Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-slate-900 dark:text-white font-black text-base sm:text-lg leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Key Specs Pill Box */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="bg-slate-100 dark:bg-slate-950/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
            {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-200 truncate max-w-[130px]">{String(value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-1.5">
          <div>
            <span className="text-[9px] uppercase font-black tracking-wider text-slate-500 dark:text-slate-400 block">Best Price</span>
            <span className="text-lg sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onEnquire && (
              <button
                type="button"
                onClick={() => onEnquire(product.name)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black px-3 py-2 rounded-xl hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-200 shrink-0"
              >
                Enquire
              </button>
            )}

            <Link
              to={`/products/${product._id}`}
              className="group/btn btn-primary-glow text-white text-[11px] sm:text-xs font-black px-3 py-2 sm:py-2 rounded-xl flex items-center gap-1 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
