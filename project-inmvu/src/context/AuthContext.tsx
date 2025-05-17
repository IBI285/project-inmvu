import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

interface RegisterData {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
  acceptPolicy: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        try {
          // In a real app, verify token with backend
          // For this demo, we'll just decode the token
          const decoded = jwtDecode<User & { exp: number }>(storedToken);
          
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          } else {
            setToken(storedToken);
            setUser({
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
              username: decoded.username,
              phone: decoded.phone,
              role: decoded.role
            });
          }
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, make actual API call
      // For demo purposes, simulating successful login with mock token
      const mockResponse = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJwaG9uZSI6IisxMjM0NTY3ODkwIiwicm9sZSI6ImFzZXNvciIsImV4cCI6MTkzODQ3ODE3NH0.gyjz3MQoXqBoXEyXgR9GhvPJ2LQ1cDX9FrSZFaE4N8c',
        user: {
          id: '1234',
          name: 'John Doe',
          email: 'john@example.com',
          username: 'johndoe',
          phone: '+1234567890',
          role: 'asesor'
        }
      };
      
      localStorage.setItem('token', mockResponse.token);
      setToken(mockResponse.token);
      setUser(mockResponse.user);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      // In a real app, make actual API call
      // For demo purposes, simulating successful registration
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.fullName,
        email: userData.email,
        username: userData.username,
        phone: userData.phone,
        role: userData.role
      };
      
      // Mock successful login after registration
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJwaG9uZSI6IisxMjM0NTY3ODkwIiwicm9sZSI6ImFzZXNvciIsImV4cCI6MTkzODQ3ODE3NH0.gyjz3MQoXqBoXEyXgR9GhvPJ2LQ1cDX9FrSZFaE4N8c';
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      // In a real app, make actual API call to trigger password reset
      // For demo, just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      throw new Error('Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    forgotPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};