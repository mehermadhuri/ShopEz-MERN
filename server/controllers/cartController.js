const Cart = require('../models/Cart');

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, product } = req.body;

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

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter(
        item => item.productId !== productId
      );

      await cart.save();
    }

    res.json(cart || { items: [] });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart
};