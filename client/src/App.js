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
import Stocks from './pages/Stocks';

import FreeDelivery from './pages/FreeDelivery';
import SecurePayment from './pages/SecurePayment';
import EasyReturns from './pages/EasyReturns';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/products" element={<Products />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/stocks" element={<Stocks />} />

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

        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;