import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('lucky_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!token) {
        setAdmin(null);
        setLoading(false);
        return;
      }
      try {
        const res = await API.get('/admin/me');
        if (res.data.success) {
          setAdmin(res.data.admin);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Failed to authenticate admin session:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await API.post('/admin/login', { email, password });
      if (res.data.success) {
        const { token, admin } = res.data;
        localStorage.setItem('lucky_admin_token', token);
        setToken(token);
        setAdmin(admin);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please check credentials.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('lucky_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
