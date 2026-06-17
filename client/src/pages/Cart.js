import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Wizard States: 'cart' | 'shipping' | 'payment' | 'success'
  const [step, setStep] = useState('cart');
  
  // Modal overlay state: null | 'delivery' | 'payment_safety' | 'returns'
  const [modalType, setModalType] = useState(null);

  // Form inputs
  const [shipping, setShipping] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const [payment, setPayment] = useState({
    method: 'online_card', // 'online_card' | 'online_upi' | 'cod'
    cardNo: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: ''
  });

  const [placedOrder, setPlacedOrder] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Formatting date for delivery estimate (e.g. 4 days from now)
  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    return today.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Validate Shipping form
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!shipping.name.trim()) errors.name = "Name is required";
    if (!/^\d{10}$/.test(shipping.phone)) errors.phone = "Enter a valid 10-digit phone number";
    if (!shipping.address.trim()) errors.address = "Address is required";
    if (!shipping.city.trim()) errors.city = "City is required";
    if (!/^\d{6}$/.test(shipping.pincode)) errors.pincode = "Enter a valid 6-digit pincode";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setStep('payment');
  };

  // Validate and complete Order
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (payment.method === 'online_card') {
      if (!/^\d{16}$/.test(payment.cardNo.replace(/\s+/g, ''))) {
        errors.cardNo = "Enter a valid 16-digit card number";
      }
      if (!/^\d{2}\/\d{2}$/.test(payment.cardExpiry)) {
        errors.cardExpiry = "Expiry must be MM/YY";
      }
      if (!/^\d{3}$/.test(payment.cardCvv)) {
        errors.cardCvv = "Enter 3-digit CVV";
      }
    } else if (payment.method === 'online_upi') {
      if (!payment.upiId.includes('@')) {
        errors.upiId = "Enter a valid UPI ID (e.g., user@okhdfcbank)";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success simulation
    const orderId = `SE-${Math.floor(100000 + Math.random() * 900000)}-${shipping.pincode}`;
    const orderDetails = {
      orderId,
      total,
      deliveryDate: getEstimatedDeliveryDate(),
      paymentMethod: payment.method === 'cod' ? 'Cash on Delivery (COD)' : payment.method === 'online_upi' ? 'UPI Payment' : 'Credit/Debit Card',
      items: [...cart],
      shipping
    };

    setPlacedOrder(orderDetails);
    setFormErrors({});
    
    // Clear cart both in context/backend
    clearCart();

    setStep('success');
  };

  // Render Modals Inline
  const renderBenefitModal = () => {
    if (!modalType) return null;

    let title = "";
    let content = null;

    if (modalType === 'delivery') {
      title = "🚚 Free Delivery Benefits";
      content = (
        <div>
          <p><strong>Standard Timeline:</strong> Delivered within 3-5 business days across India.</p>
          <p><strong>Partners:</strong> Shipped securely via BlueDart, Delhivery, or DTDC.</p>
          <p><strong>Policy:</strong> Orders above ₹1000 receive 100% Free Shipping. A flat fee of ₹50 applies for orders below ₹1000.</p>
        </div>
      );
    } else if (modalType === 'payment_safety') {
      title = "🔒 Secure Payments Guarantee";
      content = (
        <div>
          <p><strong>SSL Encrypted:</strong> All bank & gateway details are encrypted using 256-bit Secure Sockets Layer protocol.</p>
          <p><strong>Compliance:</strong> Fully compliant with PCI-DSS guidelines for merchant transactions.</p>
          <p><strong>Privacy:</strong> We never save your raw credit card numbers, CVVs, or bank logins on our database servers.</p>
        </div>
      );
    } else if (modalType === 'returns') {
      title = "↩️ 7-Day Returns Process";
      content = (
        <div>
          <p><strong>Time Window:</strong> Eligible items can be returned within 7 days of delivery.</p>
          <p><strong>Process:</strong> Simply click "Request Return" in your order dashboard. A shipping partner will schedule a free home pick-up within 48 hours.</p>
          <p><strong>Refunds:</strong> Once the package is picked up and verified, your refund is credited within 24-48 hours.</p>
        </div>
      );
    }

    return (
      <div className="modal-overlay" onClick={() => setModalType(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={() => setModalType(null)}>×</button>
          <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginTop: '0', color: '#2c3e50' }}>{title}</h3>
          <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '15px' }}>{content}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="cart-container">
      {step !== 'success' && <h2>Your Cart 🛒</h2>}

      {/* Steps indicator */}
      {cart.length > 0 && step !== 'success' && (
        <div className="checkout-steps">
          <div className={`step-item ${step === 'cart' ? 'active' : ''} ${step !== 'cart' ? 'completed' : ''}`}>
            <span className="step-number">1</span>
            <span>Cart</span>
          </div>
          <div className={`step-item ${step === 'shipping' ? 'active' : ''} ${step === 'payment' ? 'completed' : ''}`}>
            <span className="step-number">2</span>
            <span>Shipping</span>
          </div>
          <div className={`step-item ${step === 'payment' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span>Payment</span>
          </div>
        </div>
      )}

      {/* STEP 1: CART LIST */}
      {step === 'cart' && (
        <>
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>Your shopping cart is empty 🛍️</p>
              <Link to="/products" className="cart-empty-btn">
                Explore Products
              </Link>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.productId} className="cart-item">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300'}
                    alt={item.name}
                  />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>✓ Eligible for Free Delivery & Easy Returns</p>
                  </div>

                  <div className="cart-item-price-qty">
                    <span className="cart-item-price">₹{item.price}</span>
                    <span className="cart-item-qty">Qty: {item.qty}</span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="cart-remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="cart-summary-card">
                <div className="cart-summary-details">
                  <h3>Total: ₹{total}</h3>
                  <p style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '14px', marginTop: '5px' }}>
                    🎉 You qualify for Free Standard Delivery!
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (!user) {
                      alert("Please log in to complete your checkout.");
                      navigate('/login');
                    } else {
                      setStep('shipping');
                    }
                  }}
                  className="cart-checkout-btn"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* STEP 2: SHIPPING ENTRY */}
      {step === 'shipping' && (
        <div className="checkout-form-container">
          <h3>Delivery Address 🚚</h3>
          <form onSubmit={handleShippingSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Receiver's name"
                className="form-input"
                value={shipping.name}
                onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
              />
              {formErrors.name && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="10-digit mobile number"
                className="form-input"
                value={shipping.phone}
                onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
              />
              {formErrors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                placeholder="Flat / House no / Street name"
                className="form-input"
                style={{ height: '80px', resize: 'none' }}
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
              />
              {formErrors.address && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
                  className="form-input"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                />
                {formErrors.city && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.city}</span>}
              </div>

              <div className="form-group">
                <label>Pincode (6 digits)</label>
                <input
                  type="text"
                  placeholder="e.g. 400001"
                  className="form-input"
                  value={shipping.pincode}
                  onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                />
                {formErrors.pincode && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.pincode}</span>}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '20px' }}>
              <span style={{ fontSize: '14px', color: '#475569' }}>
                Estimated Delivery: <strong>{getEstimatedDeliveryDate()}</strong>
              </span>
            </div>

            <div className="checkout-actions">
              <button type="button" className="btn-back" onClick={() => setStep('cart')}>
                Back
              </button>
              <button type="submit" className="btn-proceed">
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: PAYMENT TYPE & ENTRY */}
      {step === 'payment' && (
        <div className="checkout-form-container">
          <h3>Payment Gateway 💳</h3>
          <form onSubmit={handlePaymentSubmit}>
            <div className="payment-options-grid">
              
              {/* Card option */}
              <div 
                className={`payment-option-card ${payment.method === 'online_card' ? 'selected' : ''}`}
                onClick={() => setPayment({ ...payment, method: 'online_card' })}
              >
                <input
                  type="radio"
                  checked={payment.method === 'online_card'}
                  onChange={() => {}}
                />
                <div className="payment-option-info">
                  <h4>Credit / Debit Card</h4>
                  <p>Pay securely with your Visa, Mastercard, or RuPay card.</p>
                </div>
              </div>

              {/* UPI option */}
              <div 
                className={`payment-option-card ${payment.method === 'online_upi' ? 'selected' : ''}`}
                onClick={() => setPayment({ ...payment, method: 'online_upi' })}
              >
                <input
                  type="radio"
                  checked={payment.method === 'online_upi'}
                  onChange={() => {}}
                />
                <div className="payment-option-info">
                  <h4>UPI (Unified Payments Interface)</h4>
                  <p>Pay using GooglePay, PhonePe, or BHIM.</p>
                </div>
              </div>

              {/* COD option */}
              <div 
                className={`payment-option-card ${payment.method === 'cod' ? 'selected' : ''}`}
                onClick={() => setPayment({ ...payment, method: 'cod' })}
              >
                <input
                  type="radio"
                  checked={payment.method === 'cod'}
                  onChange={() => {}}
                />
                <div className="payment-option-info">
                  <h4>Cash on Delivery (COD)</h4>
                  <p>Pay with cash or digital scanner at the time of delivery.</p>
                </div>
              </div>

            </div>

            {/* Conditional Card inputs */}
            {payment.method === 'online_card' && (
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9876 5432"
                    className="form-input"
                    value={payment.cardNo}
                    onChange={(e) => setPayment({ ...payment, cardNo: e.target.value })}
                  />
                  {formErrors.cardNo && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.cardNo}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="form-input"
                      value={payment.cardExpiry}
                      onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                    />
                    {formErrors.cardExpiry && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.cardExpiry}</span>}
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      placeholder="123"
                      className="form-input"
                      maxLength="3"
                      value={payment.cardCvv}
                      onChange={(e) => setPayment({ ...payment, cardCvv: e.target.value })}
                    />
                    {formErrors.cardCvv && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.cardCvv}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Conditional UPI inputs */}
            {payment.method === 'online_upi' && (
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="username@bankname"
                    className="form-input"
                    value={payment.upiId}
                    onChange={(e) => setPayment({ ...payment, upiId: e.target.value })}
                  />
                  {formErrors.upiId && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.upiId}</span>}
                </div>
              </div>
            )}

            {/* Billing Total review */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px dashed #cbd5e1', borderBottom: '1px dashed #cbd5e1', marginBottom: '25px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Grand Total:</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e67e22' }}>₹{total}</span>
            </div>

            <div className="checkout-actions">
              <button type="button" className="btn-back" onClick={() => setStep('shipping')}>
                Back
              </button>
              <button type="submit" className="btn-success">
                Complete Order (₹{total})
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: SUCCESS SUMMARY */}
      {step === 'success' && placedOrder && (
        <div className="checkout-success">
          <div className="success-icon">🎉</div>
          <h2 style={{ color: '#2ecc71', margin: '0 0 10px 0', fontSize: '28px' }}>Order Placed Successfully!</h2>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Thank you for shopping with ShopEz. Your package is on its way!</p>

          <div className="order-details-box">
            <h4>Billing Summary</h4>
            <div className="order-detail-row">
              <span>Order Reference ID:</span>
              <span>{placedOrder.orderId}</span>
            </div>
            <div className="order-detail-row">
              <span>Payment Mode:</span>
              <span>{placedOrder.paymentMethod}</span>
            </div>
            <div className="order-detail-row">
              <span>Amount Paid:</span>
              <span>₹{placedOrder.total}</span>
            </div>
            <div className="order-detail-row">
              <span>Recipient:</span>
              <span>{placedOrder.shipping.name}</span>
            </div>
            <div className="order-detail-row">
              <span>Estimated Delivery:</span>
              <span style={{ color: '#2e7d32' }}>{placedOrder.deliveryDate}</span>
            </div>
            <div className="order-detail-row" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '13px' }}>Shipping Address:</span>
              <span style={{ fontSize: '13px', background: '#e2e8f0', padding: '8px 12px', borderRadius: '6px', color: '#334155', display: 'block', wordBreak: 'break-all' }}>
                {placedOrder.shipping.address}, {placedOrder.shipping.city} - {placedOrder.shipping.pincode}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="btn-proceed"
            style={{ padding: '12px 40px', fontSize: '16px' }}
          >
            Continue Shopping 🛍️
          </button>
        </div>
      )}

      {/* Interactive Benefit links inside cart */}
      {step !== 'success' && (
        <div className="cart-benefits-row">
          <button className="benefit-card-btn" onClick={() => setModalType('delivery')}>
            <span>🚚</span>
            <h5>Free Delivery</h5>
            <p>On orders above ₹1000. Click to view timelines.</p>
          </button>

          <button className="benefit-card-btn" onClick={() => setModalType('payment_safety')}>
            <span>🔒</span>
            <h5>Secure Payment</h5>
            <p>256-bit SSL encrypted. Click to view safety details.</p>
          </button>

          <button className="benefit-card-btn" onClick={() => setModalType('returns')}>
            <span>↩️</span>
            <h5>Easy Returns</h5>
            <p>7 days hassle-free. Click to check return rules.</p>
          </button>
        </div>
      )}

      {/* Render Modal if modalType is active */}
      {renderBenefitModal()}
    </div>
  );
};

export default Cart;