import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Package, 
  Tag, 
  Calendar,
  Layers
} from 'lucide-react';
import API from '../services/api';
import EnquiryModal from '../components/EnquiryModal';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);

        // Fetch related products in same category
        const relRes = await API.get(`/products?category=${encodeURIComponent(res.data.product.category)}&status=active`);
        if (relRes.data.success) {
          setRelatedProducts(relRes.data.products.filter(p => p._id !== id).slice(0, 4));
        }
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-slate-400">The requested product could not be loaded or may have been removed.</p>
        <Link to="/products" className="inline-block bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Lucky Communication, I am interested in purchasing/enquiring about "${product.name}" (Price: ${formatPrice(product.price)}). Please provide more details.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
      
      {/* Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition font-bold"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
        
        {/* Left Column: Product Image Showcase */}
        <div className="lg:col-span-6 w-full max-w-lg mx-auto lg:max-w-none bg-white dark:bg-slate-950 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl relative">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800">
            <img
              src={product.image}
              alt={product.name}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-cover object-center select-none"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80';
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between px-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Genuine Product Guarantee
            </span>
            <span>Warranty: <strong className="text-slate-900 dark:text-white font-bold">{product.warranty}</strong></span>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Category & Title */}
          <div>
            <div className="inline-block bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-500/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-extrabold mb-3">
              {product.category}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Price & Stock Badge */}
          <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider block">Price</span>
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {formatPrice(product.price)}
              </span>
            </div>

            <div>
              {product.stock > 0 ? (
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400 border border-rose-300 dark:border-rose-500/40 text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Product Description
            </h3>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700/40 font-medium">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Technical Specifications
              </h3>
              <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 divide-y divide-slate-200 dark:divide-slate-700/50 overflow-hidden shadow-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="px-4 py-3 flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400 font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-slate-900 dark:text-white font-bold">{String(value)}</span>
                  </div>
                ))}
                <div className="px-4 py-3 flex justify-between items-center text-sm">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">Warranty</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{product.warranty}</span>
                </div>
              </div>
            </div>
          )}

          {/* Call-to-Action Action Buttons */}
          <div className="pt-4 space-y-3">
            <button
              onClick={() => setEnquiryModalOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base py-3.5 rounded-xl shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition transform active:scale-95"
            >
              <Send className="w-5 h-5" /> Send Enquiry
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+919876543210"
                className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Call Now
              </a>

              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Similar Security Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div key={rel._id} className="bg-white dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-36 object-cover rounded-xl"
                />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{rel.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">₹{rel.price}</span>
                  <Link to={`/products/${rel._id}`} className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        productName={product.name}
      />

    </div>
  );
};

export default ProductDetails;
