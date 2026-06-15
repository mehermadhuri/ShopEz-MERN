const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      qty: Number
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);