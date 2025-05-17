import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Consultation from './pages/Consultation';
import Appointments from './pages/Appointments';
import Payment from './pages/Payment';
import ForgotPassword from './pages/auth/ForgotPassword';
import PrivateRoute from './components/auth/PrivateRoute';
import ChatBot from './components/chatbot/ChatBot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/consultation" element={
                <PrivateRoute>
                  <Consultation />
                </PrivateRoute>
              } />
              <Route path="/appointments" element={
                <PrivateRoute>
                  <Appointments />
                </PrivateRoute>
              } />
              <Route path="/payment" element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;