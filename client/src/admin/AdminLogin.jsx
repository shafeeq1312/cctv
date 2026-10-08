import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5Dh3X6wA63V0Bwc99yOUT_iB9wNTgGz1rph8VM1EJneCUgE42cQ3Wmop&s=10";

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    if (res && res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res?.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full filter blur-2xl pointer-events-none"></div>

        {/* Header with Shop Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700/80 flex items-center justify-center mx-auto shadow-xl shadow-blue-600/30 p-1.5 overflow-hidden">
            <img src={logoUrl} alt="Lucky Communication Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              Lucky Communication
            </h1>
            <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mt-1">
              Admin Management Portal
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 text-white text-sm px-4 py-3 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                placeholder="Enter admin email"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 text-white text-sm px-4 py-3 pl-10 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400"
                placeholder="••••••••"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50 text-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Authenticating...
              </>
            ) : (
              <>
                Login to Dashboard <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>

    </div>
  );
};

export default AdminLogin;
