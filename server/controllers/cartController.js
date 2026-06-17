const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// In-memory cart store if MongoDB is offline
const mockCarts = {}; // Format: { [userId]: { userId, items: [...] } }

// GET CART
const getCart = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.json(cart || { items: [] });
    } else {
      console.log("Database offline: Fetching cart from in-memory store");
      const cart = mockCarts[req.params.userId] || { items: [] };
      res.json(cart);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, product } = req.body;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const existingItem = cart.items.find(
        item => item.productId === product._id
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        });
      }

      await cart.save();
      res.json(cart);
    } else {
      console.log("Database offline: Adding item to in-memory cart");
      if (!mockCarts[userId]) {
        mockCarts[userId] = { userId, items: [] };
      }

      const cart = mockCarts[userId];
      const existingItem = cart.items.find(
        item => item.productId === product._id
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        });
      }
      res.json(cart);
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const cart = await Cart.findOne({ userId });

      if (cart) {
        cart.items = cart.items.filter(
          item => item.productId !== productId
        );

        await cart.save();
      }

      res.json(cart || { items: [] });
    } else {
      console.log("Database offline: Removing item from in-memory cart");
      if (mockCarts[userId]) {
        mockCarts[userId].items = mockCarts[userId].items.filter(
          item => item.productId !== productId
        );
      }
      res.json(mockCarts[userId] || { items: [] });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CLEAR CART
const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const cart = await Cart.findOne({ userId });
      if (cart) {
        cart.items = [];
        await cart.save();
      }
      res.json(cart || { items: [] });
    } else {
      console.log("Database offline: Clearing in-memory cart");
      if (mockCarts[userId]) {
        mockCarts[userId].items = [];
      }
      res.json(mockCarts[userId] || { items: [] });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
};