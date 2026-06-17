import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 🔥 FIX: total quantity instead of just length
  const cartCount = cart.reduce((total, item) => total + (item.qty || 1), 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand">🛒 ShopEz</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/stocks">Stock Center 📈</Link>

        <Link to="/cart">
          🛒 Cart ({cartCount})
        </Link>

        {user ? (
          <>
            <span style={{ color: '#f39c12', marginLeft: '10px' }}>
              👤 {user.name}
            </span>

            <button
              onClick={handleLogout}
              style={{
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;