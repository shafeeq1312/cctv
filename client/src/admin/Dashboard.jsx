import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  FolderTree, 
  MessageSquareText, 
  CheckCircle, 
  Plus, 
  ArrowRight, 
  Clock, 
  Phone, 
  User,
  ShieldCheck
} from 'lucide-react';
import API from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalCategories: 0,
    totalEnquiries: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [prodRes, catRes, enqRes] = await Promise.all([
        API.get('/products?status=all'),
        API.get('/categories'),
        API.get('/enquiries')
      ]);

      if (prodRes.data.success) {
        const prods = prodRes.data.products;
        setStats(prev => ({
          ...prev,
          totalProducts: prods.length,
          activeProducts: prods.filter(p => p.status === 'active').length
        }));
      }

      if (catRes.data.success) {
        setStats(prev => ({ ...prev, totalCategories: catRes.data.categories.length }));
      }

      if (enqRes.data.success) {
        const enqs = enqRes.data.enquiries;
        setStats(prev => ({ ...prev, totalEnquiries: enqs.length }));
        setRecentEnquiries(enqs.slice(0, 5));
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/enquiries/${id}`, { status });
      if (res.data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to update enquiry status:', err);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Admin Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Glow Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-1/3 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Admin Session
              </span>
              <span className="text-slate-600 text-xs hidden sm:inline">•</span>
              <span className="text-cyan-400 text-xs font-bold">
                Lucky Communication • Dindigul Store
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Welcome Back, Administrator! 👋
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
              Welcome to the Lucky Communication Administration Portal. You have full access to manage your CCTV products, services, customer enquiries, and monitor store catalog activity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/admin/products/add"
              className="btn-primary-glow text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 transition active:scale-95"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </Link>
            <Link
              to="/admin/enquiries"
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-400 font-extrabold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-md flex items-center gap-2 transition"
            >
              <MessageSquareText className="w-4 h-4" /> View Enquiries
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Products */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Products</span>
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{stats.totalProducts}</p>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Items registered in MongoDB</span>
          </div>
        </div>

        {/* Total Categories */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Categories</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{stats.totalCategories}</p>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Active product categories</span>
          </div>
        </div>

        {/* Total Enquiries */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enquiries</span>
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
              <MessageSquareText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{stats.totalEnquiries}</p>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Customer quote requests</span>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Products</span>
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{stats.activeProducts}</p>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Visible on customer site</span>
          </div>
        </div>

      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-white text-base group-hover:text-blue-400 transition">Manage Products</h4>
            <p className="text-xs text-slate-400 mt-1">Add, update prices, stock & status</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition transform group-hover:translate-x-1" />
        </Link>

        <Link
          to="/admin/categories"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-white text-base group-hover:text-emerald-400 transition">Manage Categories</h4>
            <p className="text-xs text-slate-400 mt-1">Organize security hardware types</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition transform group-hover:translate-x-1" />
        </Link>

        <Link
          to="/admin/enquiries"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition flex items-center justify-between group"
        >
          <div>
            <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition">View Customer Enquiries</h4>
            <p className="text-xs text-slate-400 mt-1">Track & resolve incoming leads</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-lg">Recent Customer Enquiries</h3>
            <p className="text-xs text-slate-400">Latest quote and installation requests from website visitors.</p>
          </div>
          <Link to="/admin/enquiries" className="text-xs font-semibold text-blue-400 hover:underline">
            View All Enquiries
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <p className="text-slate-500 text-sm py-4">No enquiries recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Product / Service</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3">
                      <div className="font-semibold text-white">{enq.name}</div>
                      <div className="text-xs text-slate-400">{enq.email}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-200">
                      {enq.product}
                    </td>
                    <td className="p-3 text-slate-300 font-mono text-xs">
                      {enq.phone}
                    </td>
                    <td className="p-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase border ${
                        enq.status === 'new'
                          ? 'bg-amber-950 text-amber-400 border-amber-800'
                          : enq.status === 'contacted'
                          ? 'bg-blue-950 text-blue-400 border-blue-800'
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <select
                        value={enq.status}
                        onChange={(e) => updateStatus(enq._id, e.target.value)}
                        className="bg-slate-800 text-xs text-white px-2 py-1 rounded border border-slate-700 focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
