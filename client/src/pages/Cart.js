import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    alert("🎉 Order placed successfully! (Simulation)");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your shopping cart is empty</p>
          <Link to="/products" className="cart-empty-btn">
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.productId} className="cart-item">
              {/* IMAGE */}
              <img
                src={item.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300'}
                alt={item.name}
              />

              {/* DETAILS */}
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Eligible for Free Delivery & Easy Returns</p>
              </div>

              {/* PRICE & QTY */}
              <div className="cart-item-price-qty">
                <span className="cart-item-price">₹{item.price}</span>
                <span className="cart-item-qty">Qty: {item.qty}</span>
              </div>

              {/* REMOVE BUTTON */}
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
                🎉 You save additional delivery fees!
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="cart-checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;