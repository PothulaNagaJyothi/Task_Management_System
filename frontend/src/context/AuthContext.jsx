import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginCall, signupCall } from '../services/authService';
import { setAuthToken as setApiAuthToken } from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check local storage for token on mount
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  const setAuthToken = (token) => {
    setApiAuthToken(token);
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const { token, user } = await loginCall(email, password);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthToken(token);
      setUser(user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const signup = async (username, email, password) => {
    try {
      setError(null);
      const { token, user } = await signupCall(username, email, password);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setAuthToken(token);
      setUser(user);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
