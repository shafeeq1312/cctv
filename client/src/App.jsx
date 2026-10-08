import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

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
  return (
    <ThemeProvider>
      <AuthProvider>
      <Router>
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
