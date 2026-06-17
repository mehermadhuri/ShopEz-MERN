const Product = require('../models/Product');
const mongoose = require('mongoose');

const getProducts = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      const products = await Product.find({});
      return res.json(products);
    }
    res.json([]); // returns empty, frontend will load fallback list
  } catch (error) {
    res.json([]);
  }
};

const getProductById = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      const product = await Product.findById(req.params.id);
      if (product) return res.json(product);
    }
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching product' });
  }
};

module.exports = { getProducts, getProductById };