import React from 'react';
import { useNavigate } from 'react-router-dom';

const SecurePayment = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      color: '#2c3e50'
    }}>
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{
          background: '#e0f2fe',
          color: '#0369a1',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Payment Safety
        </span>
        <h1 style={{ fontSize: '36px', marginTop: '10px', color: '#1a252f' }}>🔒 100% Secure Payments</h1>
        <p style={{ color: '#7f8c8d', fontSize: '18px', maxWidth: '600px', margin: '10px auto' }}>
          Your security is our top priority. We use industry-standard encryption protocols to protect your financial details.
        </p>
      </div>

      {/* Grid of Security features */}
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
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>🛡️</div>
          <h3 style={{ fontSize: '20px', margin: '0 0 10px 0', color: '#1a252f' }}>PCI-DSS Compliant</h3>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
            Our gateway complies with Payment Card Industry Data Security Standards (PCI-DSS), protecting cardholder data against leaks and theft.
          </p>
        </div>

        {/* Card 2 */}
        <div style={{
          background: '#ffffff',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>🔑</div>
          <h3 style={{ fontSize: '20px', margin: '0 0 10px 0', color: '#1a252f' }}>256-Bit SSL Encryption</h3>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
            All transactions are routed through a 256-bit Secure Sockets Layer (SSL) connection, ensuring that data is encrypted before transmission.
          </p>
        </div>

        {/* Card 3 */}
        <div style={{
          background: '#ffffff',
          padding: '30px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '15px' }}>💳</div>
          <h3 style={{ fontSize: '20px', margin: '0 0 10px 0', color: '#1a252f' }}>Zero Storage Policy</h3>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6' }}>
            We do not store your CVVs or bank PINs on our servers. Your credentials are authenticated directly by your bank.
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div style={{
        background: '#f8fafc',
        padding: '30px',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        marginBottom: '40px'
      }}>
        <h3 style={{ fontSize: '22px', marginTop: '0', marginBottom: '10px', color: '#1a252f', textAlign: 'center' }}>
          Supported Payment Methods
        </h3>
        <p style={{ color: '#7f8c8d', fontSize: '15px', textAlign: 'center', marginBottom: '25px' }}>
          Choose from multiple secure billing options:
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px'
        }}>
          <span style={{ padding: '8px 18px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: '500', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            📱 UPI (PhonePe, GPay, Paytm)
          </span>
          <span style={{ padding: '8px 18px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: '500', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            💳 Credit & Debit Cards (Visa, Mastercard, RuPay)
          </span>
          <span style={{ padding: '8px 18px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: '500', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            🏦 Net Banking (SBI, HDFC, ICICI, etc.)
          </span>
          <span style={{ padding: '8px 18px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: '500', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            💵 Cash on Delivery (COD)
          </span>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
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

export default SecurePayment;