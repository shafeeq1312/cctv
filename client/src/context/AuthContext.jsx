import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => {
    return (
      sessionStorage.getItem('lucky_admin_token') ||
      localStorage.getItem('lucky_admin_token') ||
      null
    );
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyAdminSession = async () => {
      const activeToken =
        sessionStorage.getItem('lucky_admin_token') ||
        localStorage.getItem('lucky_admin_token');

      if (!activeToken) {
        if (isMounted) {
          setAdmin(null);
          setToken(null);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await API.get('/admin/me', { skipCache: true });
        if (isMounted) {
          if (res.data && res.data.success && res.data.admin) {
            setAdmin(res.data.admin);
            setToken(activeToken);
          } else {
            logout();
          }
        }
      } catch (err) {
        console.error('Failed to authenticate admin session:', err);
        if (isMounted) {
          logout();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyAdminSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const res = await API.post('/admin/login', { email, password });
      if (res.data && res.data.success) {
        const { token: receivedToken, admin: receivedAdmin } = res.data;

        if (rememberMe) {
          localStorage.setItem('lucky_admin_token', receivedToken);
          sessionStorage.removeItem('lucky_admin_token');
        } else {
          sessionStorage.setItem('lucky_admin_token', receivedToken);
          localStorage.removeItem('lucky_admin_token');
        }

        setToken(receivedToken);
        setAdmin(receivedAdmin);
        return { success: true };
      }
      return {
        success: false,
        message: res.data?.message || 'Login failed. Please check credentials.'
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message || 'Login failed. Please check credentials.'
      };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('lucky_admin_token');
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
