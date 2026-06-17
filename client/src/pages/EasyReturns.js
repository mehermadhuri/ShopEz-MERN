import React from 'react';
import { useNavigate } from 'react-router-dom';

const EasyReturns = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      color: '#2c3e50'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{
          background: '#fee2e2',
          color: '#b91c1c',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          Return Policy
        </span>
        <h1 style={{ fontSize: '36px', marginTop: '10px', color: '#1a252f' }}>↩️ Hassle-Free Returns</h1>
        <p style={{ color: '#7f8c8d', fontSize: '18px', maxWidth: '600px', margin: '10px auto' }}>
          Not satisfied with your purchase? No problem! Return it easily within 7 days of delivery.
        </p>
      </div>

      {/* Return Steps */}
      <h3 style={{ fontSize: '22px', color: '#1a252f', marginBottom: '20px', textAlign: 'center' }}>
        Return in 4 Simple Steps
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '45px'
      }}>
        {/* Step 1 */}
        <div style={{
          background: '#ffffff',
          padding: '25px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3498db', marginBottom: '10px' }}>01</div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#2c3e50' }}>Request Return</h4>
          <p style={{ margin: '0', color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
            Go to "My Orders" and click "Request Return" on the items you wish to return.
          </p>
        </div>

        {/* Step 2 */}
        <div style={{
          background: '#ffffff',
          padding: '25px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3498db', marginBottom: '10px' }}>02</div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#2c3e50' }}>Quality Check</h4>
          <p style={{ margin: '0', color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
            Confirm that the products are unused and retain their original tags and packaging.
          </p>
        </div>

        {/* Step 3 */}
        <div style={{
          background: '#ffffff',
          padding: '25px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3498db', marginBottom: '10px' }}>03</div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#2c3e50' }}>Free Pick-up</h4>
          <p style={{ margin: '0', color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
            Our courier partner will pick up the parcel from your address at no extra cost.
          </p>
        </div>

        {/* Step 4 */}
        <div style={{
          background: '#ffffff',
          padding: '25px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#3498db', marginBottom: '10px' }}>04</div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#2c3e50' }}>Instant Refund</h4>
          <p style={{ margin: '0', color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
            Upon successful pick-up verification, your refund is credited within 24 to 48 hours.
          </p>
        </div>
      </div>

      {/* Conditions */}
      <div style={{
        background: '#f8fafc',
        padding: '30px',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        marginBottom: '40px'
      }}>
        <h3 style={{ fontSize: '20px', marginTop: '0', marginBottom: '15px', color: '#1a252f' }}>Policy Details & Conditions</h3>
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', margin: '0 0 10px 0' }}>
          • <strong>7-Day Window:</strong> Items must be requested for return within 7 calendar days of delivery.
        </p>
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', margin: '0 0 10px 0' }}>
          • <strong>Condition:</strong> Products must be unworn, unwashed, and undamaged with all tags attached.
        </p>
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', margin: '0' }}>
          • <strong>Non-Returnable Items:</strong> Personal care items, innerwear, and customized gifts are not eligible for returns due to hygiene standards.
        </p>
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

export default EasyReturns;