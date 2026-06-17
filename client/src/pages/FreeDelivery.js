import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FreeDelivery = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      color: '#2c3e50'
    }}>
      {/* Banner Notice */}
      {total >= 1000 ? (
        <div style={{
          background: 'linear-gradient(135deg, #11998e, #38ef7d)',
          color: '#ffffff',
          padding: '20px',
          borderRadius: '16px',
          marginBottom: '30px',
          boxShadow: '0 8px 20px rgba(17, 153, 142, 0.2)',
          textAlign: 'center',
          fontWeight: '500',
          fontSize: '18px'
        }}>
          🎉 Congratulations! Your current cart value is <strong>₹{total}</strong>, which qualifies for <strong>FREE DELIVERY</strong>!
        </div>
      ) : (
        <div style={{
          background: 'linear-gradient(135deg, #f7b733, #fc4a1a)',
          color: '#ffffff',
          padding: '20px',
          borderRadius: '16px',
          marginBottom: '30px',
          boxShadow: '0 8px 20px rgba(252, 74, 26, 0.2)',
          textAlign: 'center',
          fontWeight: '500',
          fontSize: '16px'
        }}>
          💡 Add items worth <strong>₹{1000 - total}</strong> more to unlock <strong>Free Delivery</strong>! (Current: ₹{total})
        </div>
      )}

      {/* Main Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{
          background: '#e8f5e9',
          color: '#2e7d32',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Shipping Policy
        </span>
        <h1 style={{ fontSize: '36px', marginTop: '10px', color: '#1a252f' }}>🚚 Fast & Free Delivery</h1>
        <p style={{ color: '#7f8c8d', fontSize: '18px', maxWidth: '600px', margin: '10px auto' }}>
          We ensure your orders reach you safely, quickly, and at absolutely zero cost for eligible carts.
        </p>
      </div>

      {/* Details Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {/* Card 1 */}
        <div style={{
          background: '#ffffff',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>⚡</div>
          <h3 style={{ fontSize: '20px', margin: '0 0 10px 0', color: '#1a252f' }}>Delivery Timelines</h3>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
            • <strong>Metro Cities:</strong> 2 to 3 business days.<br />
            • <strong>Tier 2 & 3 Cities:</strong> 3 to 5 business days.<br />
            • <strong>Rest of India:</strong> 5 to 7 business days.
          </p>
        </div>

        {/* Card 2 */}
        <div style={{
          background: '#ffffff',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>📦</div>
          <h3 style={{ fontSize: '20px', margin: '0 0 10px 0', color: '#1a252f' }}>Shipping Partners</h3>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
            We partner with India's leading logistics providers to guarantee safe handling:<br />
            • <strong>BlueDart Express</strong><br />
            • <strong>Delhivery Logistics</strong><br />
            • <strong>Xpressbees & DTDC</strong>
          </p>
        </div>

        {/* Card 3 */}
        <div style={{
          background: '#ffffff',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>📍</div>
          <h3 style={{ fontSize: '20px', margin: '0 0 10px 0', color: '#1a252f' }}>Real-time Tracking</h3>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
            Once shipped, you will receive a SMS and email containing a live tracking link. You can trace your parcel right to your doorstep.
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div style={{
        background: '#f8fafc',
        padding: '30px',
        borderRadius: '20px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ fontSize: '22px', marginTop: '0', marginBottom: '20px', color: '#1a252f' }}>Frequently Asked Questions</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontSize: '16px' }}>Is Cash on Delivery (COD) eligible for free shipping?</h4>
          <p style={{ margin: '0', color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
            Yes, free delivery applies to both prepaid and Cash on Delivery orders, provided the cart value is above ₹1000.
          </p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50', fontSize: '16px' }}>Can I choose an express delivery option?</h4>
          <p style={{ margin: '0', color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
            Yes, during checkout you can upgrade to Next-Day Express Delivery for an additional charge of ₹99.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/products')}
          style={{
            background: '#3498db',
            color: '#fff',
            border: 'none',
            padding: '12px 30px',
            fontSize: '16px',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)',
            fontWeight: 'bold',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#2980b9'}
          onMouseOut={(e) => e.target.style.background = '#3498db'}
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
};

export default FreeDelivery;