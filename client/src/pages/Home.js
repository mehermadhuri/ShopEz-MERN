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

      <div
        style={{
          textAlign: 'center',
          marginTop: '50px',
          padding: '20px'
        }}
      >
        <h2>Why Choose ShopEz?</h2>

        <p>✅ High Quality Products</p>
        <p>✅ Fast Delivery Across India</p>
        <p>✅ Safe & Secure Payments</p>
        <p>✅ Easy Return Policy</p>
        <p>✅ Best Customer Support</p>
      </div>
    </div>
  );
};

export default Home;