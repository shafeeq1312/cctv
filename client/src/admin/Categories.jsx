import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, FolderTree, AlertCircle, CheckCircle } from 'lucide-react';
import API from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Camera');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await API.get('/categories');
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name) {
      setError('Category name is required');
      return;
    }

    try {
      if (editingId) {
        const res = await API.put(`/categories/${editingId}`, { name, description, icon });
        if (res.data.success) {
          setSuccess('Category updated successfully');
          resetForm();
          fetchCategories();
        }
      } else {
        const res = await API.post('/categories', { name, description, icon });
        if (res.data.success) {
          setSuccess('Category created successfully');
          resetForm();
          fetchCategories();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setDescription(cat.description || '');
    setIcon(cat.icon || 'Camera');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await API.delete(`/categories/${id}`);
      if (res.data.success) {
        setCategories(categories.filter(c => c._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setIcon('Camera');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-white">
          Product Categories Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Organize CCTV, biometric, recorder and access-control categories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Add/Edit Category */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-blue-400" />
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h3>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Category Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. CCTV Cameras"
                className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Icon Symbol
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none"
              >
                <option value="Camera">Camera (CCTV Cameras)</option>
                <option value="Fingerprint">Fingerprint (Biometrics)</option>
                <option value="HardDrive">HardDrive (DVR/NVR)</option>
                <option value="KeyRound">KeyRound (Access Control)</option>
                <option value="Plug">Plug (CCTV Accessories)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Description
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of hardware in this category..."
                className="w-full bg-slate-800 text-white text-sm p-3 rounded-xl border border-slate-700 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-1/2 bg-slate-800 text-slate-300 font-semibold py-2.5 rounded-xl text-xs"
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm shadow-md transition"
              >
                {editingId ? 'Update Category' : 'Save Category'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Listing */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-white">Existing Categories ({categories.length})</h3>
          
          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between hover:border-slate-700 transition"
              >
                <div>
                  <h4 className="font-bold text-white text-base">{cat.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.description || 'No description provided'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-2 bg-rose-600/20 text-rose-400 rounded-lg border border-rose-500/30"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Categories;
