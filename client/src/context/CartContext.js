import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCartApi, removeFromCartApi, clearCartApi } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('profile'))
  );

  // 🔄 Keep checking login changes (important fix)
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = JSON.parse(localStorage.getItem('profile'));
      setUser(storedUser);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 📦 FETCH CART
  const fetchCart = async (currentUser) => {
    if (!currentUser?._id) return;

    try {
      const res = await getCart(currentUser._id);
      setCart(res.data?.items || []);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  // 🔁 Load cart whenever user changes
  useEffect(() => {
    if (user?._id) {
      fetchCart(user);
    } else {
      setCart([]);
    }
  }, [user]);

  // ➕ ADD TO CART
  const addToCart = async (product) => {
    if (!user?._id) return;

    try {
      const res = await addToCartApi(user._id, product);
      setCart(res.data?.items || []);
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  // ❌ REMOVE FROM CART
  const removeFromCart = async (productId) => {
    if (!user?._id) return;

    try {
      const res = await removeFromCartApi(user._id, productId);
      setCart(res.data?.items || []);
    } catch (err) {
      console.log("Remove error:", err);
    }
  };

  // 🧹 CLEAR CART
  const clearCart = async () => {
    if (!user?._id) return;
    try {
      await clearCartApi(user._id);
      setCart([]);
    } catch (err) {
      console.log("Clear cart error:", err);
      // Fallback local clear
      setCart([]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);