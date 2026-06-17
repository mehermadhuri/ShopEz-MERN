import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';
import './Products.css';

const sampleProducts = [
  {
    _id: "sample_1",
    name: 'Wireless Headphones',
    price: 999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
  },
  {
    _id: "sample_2",
    name: 'Smart Watch',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'
  },
  {
    _id: "sample_3",
    name: 'Running Shoes',
    price: 799,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300'
  },
  {
    _id: "sample_4",
    name: 'Backpack',
    price: 599,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300'
  },
  {
    _id: "sample_5",
    name: 'Bluetooth Speaker',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300'
  },
  {
    _id: "sample_6",
    name: 'Laptop Stand',
    price: 899,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300'
  },
  {
    _id: "sample_7",
    name: 'Gaming Mouse',
    price: 699,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300'
  },
  {
    _id: "sample_8",
    name: 'Keyboard',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300'
  },
  {
    _id: "sample_9",
    name: 'Phone Charger',
    price: 299,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300'
  },
  {
    _id: "sample_10",
    name: 'Smart TV Remote',
    price: 199,
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=300'
  },
  {
    _id: "sample_11",
    name: 'Tablet Cover',
    price: 399,
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=300'
  },
  {
    _id: "sample_12",
    name: 'Earbuds',
    price: 599,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300'
  }
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(sampleProducts);
        }
      } catch (err) {
        console.error("Failed to load products from server, utilizing fallback list.", err);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }

    addToCart(product);
    alert(`${product.name} added to cart 🛒`);
  };

  if (loading) {
    return (
      <div className="products-container" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h2>Loading Products...</h2>
        <div className="spinner" style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '20px auto'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h2>Our Products 🛍️</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Currently logged in: {user ? <strong>{user.name}</strong> : 'Guest'} | Cart Items: {cart.length}
      </p>

      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300'}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;