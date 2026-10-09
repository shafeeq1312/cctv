import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import API from './services/api';
import { setCachedProducts, setCachedCategories } from './services/dataCache';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);
  return null;
};

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import ManageProducts from './admin/ManageProducts';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import Categories from './admin/Categories';
import Enquiries from './admin/Enquiries';
import ManageServices from './admin/ManageServices';

// Public Layout Wrapper with Navbar & Footer
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  useEffect(() => {
    // Eager background warmup for instant navigation
    API.get('/products?status=active')
      .then((res) => {
        if (res.data?.success) setCachedProducts(res.data.products);
      })
      .catch(() => {});

    API.get('/categories')
      .then((res) => {
        if (res.data?.success) setCachedCategories(res.data.categories);
      })
      .catch(() => {});
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          
          {/* Public Customer Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="categories" element={<Categories />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="services" element={<ManageServices />} />
            </Route>
          </Route>

          {/* Fallback Catch-all */}
          <Route path="*" element={<Home />} />

        </Routes>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
