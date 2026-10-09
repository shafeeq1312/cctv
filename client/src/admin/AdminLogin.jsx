import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5Dh3X6wA63V0Bwc99yOUT_iB9wNTgGz1rph8VM1EJneCUgE42cQ3Wmop&s=10";

  const { login, admin, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // If already authenticated, redirect straight to dashboard
  useEffect(() => {
    if (!authLoading && admin) {
      const destination = location.state?.from?.pathname || '/admin/dashboard';
      navigate(destination, { replace: true });
    }
  }, [admin, authLoading, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password, rememberMe);
    if (res && res.success) {
      const destination = location.state?.from?.pathname || '/admin/dashboard';
      navigate(destination, { replace: true });
    } else {
      setError(res?.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-600/20 rounded-full filter blur-2xl pointer-events-none"></div>

        {/* Header with Shop Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700/80 flex items-center justify-center mx-auto shadow-xl shadow-blue-600/30 p-1.5 overflow-hidden">
            <img src={logoUrl} alt="Lucky Communication Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">
              Lucky Communication
            </h1>
            <p className="text-[11px] text-cyan-400 font-extrabold uppercase tracking-widest mt-1">
              Admin Security Portal
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs flex items-center gap-2 animate-fade-in font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Remember Me Option */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-semibold">Stay logged in on this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold py-3.5 rounded-xl shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50 text-sm active:scale-95"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Authenticating...
              </>
            ) : (
              <>
                Unlock Admin Dashboard <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>

    </div>
  );
};

export default AdminLogin;
