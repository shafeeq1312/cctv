import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  MessageSquareText, 
  Wrench, 
  LogOut, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { admin, logout } = useContext(AuthContext);
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5Dh3X6wA63V0Bwc99yOUT_iB9wNTgGz1rph8VM1EJneCUgE42cQ3Wmop&s=10";

  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Customer Enquiries', path: '/admin/enquiries', icon: MessageSquareText },
    { name: 'Services Management', path: '/admin/services', icon: Wrench },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center p-0.5">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-white text-base">LUCKY ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 md:static
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="space-y-8">
          
          {/* Admin Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center p-1 shadow-md">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-base leading-tight">
                Lucky Admin
              </h2>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                Management Panel
              </span>
            </div>
          </div>

          {/* Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-6 border-t border-slate-800">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 transition"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>

      </aside>

      {/* Main Admin Body */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
