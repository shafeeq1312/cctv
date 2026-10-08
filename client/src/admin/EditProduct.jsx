import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import API from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    warranty: '',
    status: 'active',
    description: '',
    image: ''
  });

  const [specList, setSpecList] = useState([]);

  useEffect(() => {
    fetchProductAndCategories();
  }, [id]);

  const fetchProductAndCategories = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        API.get(`/products/${id}`),
        API.get('/categories')
      ]);

      if (catRes.data.success) {
        setCategories(catRes.data.categories);
      }

      if (prodRes.data.success) {
        const prod = prodRes.data.product;
        setFormData({
          name: prod.name,
          category: prod.category,
          price: prod.price,
          stock: prod.stock,
          warranty: prod.warranty || '1 Year',
          status: prod.status || 'active',
          description: prod.description,
          image: prod.image
        });

        if (prod.specifications) {
          const specsArray = Object.entries(prod.specifications).map(([key, value]) => ({
            key,
            value: String(value)
          }));
          setSpecList(specsArray);
        }
      }
    } catch (err) {
      setError('Failed to fetch product details');
    } finally {
      setLoading(false);
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
    setSuccessMsg('');

    const specificationsObj = {};
    specList.forEach(spec => {
      if (spec.key.trim()) {
        specificationsObj[spec.key.trim()] = spec.value.trim();
      }
    });

    setSubmitting(true);
    try {
      const res = await API.put(`/products/${id}`, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        specifications: specificationsObj
      });

      if (res.data.success) {
        setSuccessMsg('Product updated successfully!');
        setTimeout(() => {
          navigate('/admin/products');
        }, 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Loading product data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <Link to="/admin/products" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            Edit Product Details
          </h1>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" /> {error}
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0" /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-xl">
        
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
                <option value="active">Active (Visible)</option>
                <option value="inactive">Inactive (Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-3">
            Product Image URL
          </h3>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full bg-slate-800 text-white text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
          />
          {formData.image && (
            <div className="w-32 h-32 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-amber-500 pl-3">
            Description
          </h3>
          <textarea
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full bg-slate-800 text-white text-sm p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-purple-500 pl-3">
              Specifications List
            </h3>
            <button
              type="button"
              onClick={handleAddSpec}
              className="text-xs font-bold text-blue-400 flex items-center gap-1 bg-blue-950/60 border border-blue-800/60 px-3 py-1.5 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" /> Add Spec Line
            </button>
          </div>

          <div className="space-y-3">
            {specList.map((spec, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) => handleSpecChange(i, 'key', e.target.value)}
                  className="w-1/3 bg-slate-800 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Value"
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

        <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-4">
          <Link
            to="/admin/products"
            className="px-6 py-3 bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm rounded-xl"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition disabled:opacity-50"
          >
            {submitting ? 'Updating...' : <><Save className="w-4 h-4" /> Update Product</>}
          </button>
        </div>

      </form>

    </div>
  );
};

export default EditProduct;
