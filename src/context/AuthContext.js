import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  }, []);

  const initializeAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get('/auth/me');
        if (!response.data?.user?.role) {
          throw new Error('Invalid user data from server');
        }
        setCurrentUser(response.data.user);
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
      clearAuth();
    } finally {
      setLoading(false);
    }
  }, [clearAuth]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleAuthSuccess = useCallback((token, refreshToken, user, rememberMe = false) => {
    if (!user?.role) {
      throw new Error('User role is required');
    }
    
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', token);
    sessionStorage.setItem('refreshToken', refreshToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setCurrentUser(user);
    setError(null);
    return user;
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/auth/login', { email, password });
      
      if (!response.data?.user?.role) {
        throw new Error('Server response missing user role');
      }

      const { token, refreshToken, user } = response.data;
      const authenticatedUser = handleAuthSuccess(token, refreshToken, user, rememberMe);
      
      return { 
        success: true, 
        user: authenticatedUser,
        role: authenticatedUser.role 
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error details:', {
        error: err,
        response: err.response?.data,
        status: err.response?.status
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout: clearAuth,
    isAuthenticated: !!currentUser,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};