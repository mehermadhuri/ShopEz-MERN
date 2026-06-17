import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';

import FreeDelivery from './pages/FreeDelivery';
import SecurePayment from './pages/SecurePayment';
import EasyReturns from './pages/EasyReturns';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <div style={{ flex: '1 0 auto' }}>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/products" element={<Products />} />

                <Route path="/cart" element={<Cart />} />

                <Route
                  path="/free-delivery"
                  element={<FreeDelivery />}
                />

                <Route
                  path="/secure-payment"
                  element={<SecurePayment />}
                />

                <Route
                  path="/easy-returns"
                  element={<EasyReturns />}
                />
              </Routes>
            </div>

            <footer style={{
              textAlign: 'center',
              padding: '30px 20px',
              background: '#1e293b',
              color: '#94a3b8',
              borderTop: '4px solid #f39c12',
              fontFamily: "'Outfit', 'Inter', sans-serif', sans-serif",
              flexShrink: 0
            }}>
              <h3 style={{ color: '#f1f5f9', fontSize: '16px', margin: '0 0 6px 0', fontWeight: 'bold' }}>SHOPEZ : E-commerce Application</h3>
              <p style={{ fontSize: '13px', margin: '0 0 10px 0', opacity: 0.8 }}>(SmartBridge Internship Project)</p>
              <p style={{ fontSize: '12px', margin: '4px 0 0 0', opacity: 0.7 }}>© {new Date().getFullYear()} ShopEz.</p>
              <p style={{ fontSize: '10px', margin: '6px 0 0 0', opacity: 0.5, letterSpacing: '0.5px' }}>k meher madhuri project</p>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;