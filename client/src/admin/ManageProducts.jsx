import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Eye,
  RefreshCw
} from 'lucide-react';
import API from '../services/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        API.get('/products?status=all'),
        API.get('/categories')
      ]);

      if (prodRes.data.success) {
        setProducts(prodRes.data.products);
      }
      if (catRes.data.success) {
        setCategories(catRes.data.categories);
      }
    } catch (err) {
      console.error('Failed to load products/categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await API.put(`/products/${product._id}`, { status: newStatus });
      if (res.data.success) {
        setProducts(products.map(p => p._id === product._id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const res = await API.delete(`/products/${productToDelete._id}`);
      if (res.data.success) {
        setProducts(products.filter(p => p._id !== productToDelete._id));
        setDeleteModalOpen(false);
        setProductToDelete(null);
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Manage Products & Hardware
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Add, update prices, manage stock inventory, or toggle product visibility.
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto bg-slate-800 text-white text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c._id || c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          <button
            onClick={fetchProductsAndCategories}
            className="p-2.5 bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700"
            title="Refresh List"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading product list...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <p>No products found matching filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-4">Product Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price (₹)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-slate-700 shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div>
                        <div className="font-bold text-white line-clamp-1">{product.name}</div>
                        <div className="text-xs text-slate-400">Warranty: {product.warranty}</div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-700">
                        {product.category}
                      </span>
                    </td>

                    <td className="p-4 font-bold text-emerald-400">
                      ₹{product.price.toLocaleString('en-IN')}
                    </td>

                    <td className="p-4 font-medium text-slate-200">
                      {product.stock} units
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(product)}
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition flex items-center gap-1.5 border ${
                          product.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                        title="Click to toggle active/inactive"
                      >
                        {product.status === 'active' ? (
                          <><CheckCircle2 className="w-3.5 h-3.5" /> Active</>
                        ) : (
                          <><XCircle className="w-3.5 h-3.5" /> Inactive</>
                        )}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/products/${product._id}`}
                          target="_blank"
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
                          title="Preview Product"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/40"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openDeleteModal(product)}
                          className="p-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 rounded-lg border border-rose-500/40"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal (Prompt Section 23 Requirement) */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Product</h3>
                <p className="text-xs text-slate-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm">
              Are you sure you want to delete <strong className="text-white">"{productToDelete?.name}"</strong> from MongoDB?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-600/30"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageProducts;
