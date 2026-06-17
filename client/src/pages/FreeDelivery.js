import React from 'react';
import { useCart } from '../context/CartContext';

const FreeDelivery = () => {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: '30px' }}>
      {total >= 2000 && (
        <div
          style={{
            background: '#d4edda',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}
        >
          🎉 Wow! Your cart value is above ₹2000.
          <br />
          Enjoy Free Delivery and Special Discounts.
          <br />
          Happy Shopping with ShopEz ❤️
        </div>
      )}

      <h1>🚚 Free Delivery Benefits</h1>

      <h2>Orders Above ₹1000</h2>
      <p>Free delivery across India.</p>

      <h2>Orders Above ₹1500</h2>
      <p>Get up to 30% discount on selected products.</p>

      <h2>Orders Above ₹2000</h2>
      <p>
        Premium customer benefits, priority support,
        free delivery and exclusive offers.
      </p>
    </div>
  );
};

export default FreeDelivery;