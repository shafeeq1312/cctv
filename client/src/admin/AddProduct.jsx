import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Image, Package, CheckCircle2, AlertCircle } from 'lucide-react';
import API from '../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '10',
    warranty: '1 Year',
    status: 'active',
    description: '',
    image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80'
  });

  // Dynamic specs key-value state
  const [specList, setSpecList] = useState([
    { key: 'resolution', value: '2MP (1080p)' },
    { key: 'nightVision', value: '20 Meters IR' }
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      if (res.data.success && res.data.categories.length > 0) {
        setCategories(res.data.categories);
        setFormData(prev => ({ ...prev, category: res.data.categories[0].name }));
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSpec = () => {
    setSpecList([...specList, { key: '', value: '' }]);
  };

  const handleSpecChange = (index, field, val) => {
    const updated = [...specList];
    updated[index][field] = val;
    setSpecList(updated);
  };

  const handleRemoveSpec = (index) => {
    setSpecList(specList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      setError('Please fill in all required fields (Name, Category, Price, Description)');
      return;
    }

    // Convert spec list array to object
    const specificationsObj = {};
    specList.forEach(spec => {
      if (spec.key.trim()) {
        specificationsObj[spec.key.trim()] = spec.value.trim();
      }
    });

    setLoading(true);
    try {
      const res = await API.post('/products', {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        specifications: specificationsObj
      });

      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <Link to="/admin/products" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            Add New Security Product
          </h1>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-xl">
        
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-blue-500 pl-3">
            Product Information
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Product Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. CP Plus 2MP Dome Camera"
              className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Category <span className="text-rose-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
              >
                {categories.map((c) => (
                  <option key={c._id || c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Price (INR ₹) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="1850"
                className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Warranty
              </label>
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleInputChange}
                placeholder="1 Year"
                className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Status Visibility
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="active">Active (Publicly Visible)</option>
                <option value="inactive">Inactive (Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-3">
            Product Image URL
          </h3>
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Image Address / URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="w-32 h-32 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-3">
            Description
          </h3>
          <div>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="High quality outdoor security camera suitable for homes, shops and offices..."
              className="w-full bg-slate-800 text-white text-sm p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Specifications Builder */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-purple-500 pl-3">
              Specifications List
            </h3>
            <button
              type="button"
              onClick={handleAddSpec}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-950/60 border border-blue-800/60 px-3 py-1.5 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" /> Add Spec Line
            </button>
          </div>

          <div className="space-y-3">
            {specList.map((spec, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Feature (e.g. resolution)"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(i, 'key', e.target.value)}
                  className="w-1/3 bg-slate-800 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. 5MP Ultra HD)"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                  className="w-2/3 bg-slate-800 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(i)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-4">
          <Link
            to="/admin/products"
            className="px-6 py-3 bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm rounded-xl"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition disabled:opacity-50"
          >
            {loading ? 'Saving Product...' : <><Save className="w-4 h-4" /> Save Product</>}
          </button>
        </div>

      </form>

    </div>
  );
};

export default AddProduct;
