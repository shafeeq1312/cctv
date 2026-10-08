import React, { useState, useEffect } from 'react';
import { Wrench, Plus, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import API from '../services/api';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Camera');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await API.get('/services?status=all');
      if (res.data.success) {
        setServices(res.data.services);
      }
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description) {
      setError('Title and description are required');
      return;
    }

    try {
      if (editingId) {
        const res = await API.put(`/services/${editingId}`, { title, description, icon });
        if (res.data.success) {
          resetForm();
          fetchServices();
        }
      } else {
        const res = await API.post('/services', { title, description, icon });
        if (res.data.success) {
          resetForm();
          fetchServices();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (svc) => {
    setEditingId(svc._id);
    setTitle(svc.title);
    setDescription(svc.description);
    setIcon(svc.icon || 'Wrench');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service offering?')) return;
    try {
      const res = await API.delete(`/services/${id}`);
      if (res.data.success) {
        setServices(services.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setIcon('Wrench');
  };

  return (
    <div className="space-y-8">
      
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-white">
          Security Services Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage CCTV installation, maintenance, AMC, biometric & networking service offerings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-400" />
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h3>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                Service Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. CCTV Camera Installation"
                className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                Icon
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full bg-slate-800 text-white text-sm px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none"
              >
                <option value="Camera">Camera</option>
                <option value="Wrench">Wrench</option>
                <option value="Fingerprint">Fingerprint</option>
                <option value="KeyRound">KeyRound</option>
                <option value="Network">Network</option>
                <option value="ShieldCheck">ShieldCheck</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 uppercase block mb-1">
                Description
              </label>
              <textarea
                rows="4"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe service features and scope..."
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
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-sm shadow-md transition"
              >
                {editingId ? 'Update Service' : 'Save Service'}
              </button>
            </div>
          </form>
        </div>

        {/* Listing */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-white">Active Services ({services.length})</h3>

          <div className="space-y-4">
            {services.map((svc) => (
              <div key={svc._id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-base">{svc.title}</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(svc)}
                      className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(svc._id)}
                      className="p-2 bg-rose-600/20 text-rose-400 rounded-lg border border-rose-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ManageServices;
