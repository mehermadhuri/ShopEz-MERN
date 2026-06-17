import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to ShopEz 🛒</h1>

        <p>
          Your one-stop shop for everything you need!
        </p>

        <Link to="/products" className="hero-btn">
          Shop Now
        </Link>
      </div>

      <div className="features">

        <Link
          to="/free-delivery"
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            className="feature-card"
            style={{
              transition: '0.3s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            🚚 Free Delivery
            <p
              style={{
                fontSize: '14px',
                marginTop: '10px'
              }}
            >
              Click to view delivery benefits
            </p>
          </div>
        </Link>

        <Link
          to="/secure-payment"
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            className="feature-card"
            style={{
              transition: '0.3s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            🔒 Secure Payment
            <p
              style={{
                fontSize: '14px',
                marginTop: '10px'
              }}
            >
              Click to learn payment safety
            </p>
          </div>
        </Link>

        <Link
          to="/easy-returns"
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div
            className="feature-card"
            style={{
              transition: '0.3s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
          >
            ↩️ Easy Returns
            <p
              style={{
                fontSize: '14px',
                marginTop: '10px'
              }}
            >
              Click to see return process
            </p>
          </div>
        </Link>

      </div>

      <div className="why-choose-section">
        <h2>Why Choose ShopEz?</h2>

        <div className="ticker-container">
          <div className="ticker-track">
            {/* Set 1 */}
            <span className="ticker-item">✅ High Quality Products</span>
            <span className="ticker-item">✅ Fast Delivery Across India</span>
            <span className="ticker-item">✅ Safe & Secure Payments</span>
            <span className="ticker-item">✅ Easy Return Policy</span>
            <span className="ticker-item">✅ Best Customer Support</span>
            {/* Set 2 (Duplicated for infinite looping) */}
            <span className="ticker-item">✅ High Quality Products</span>
            <span className="ticker-item">✅ Fast Delivery Across India</span>
            <span className="ticker-item">✅ Safe & Secure Payments</span>
            <span className="ticker-item">✅ Easy Return Policy</span>
            <span className="ticker-item">✅ Best Customer Support</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;