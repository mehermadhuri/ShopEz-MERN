require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ROUTES
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes'); // ✅ ADD THIS

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION & SERVER START
mongoose.connect(process.env.MONGO_URI, {
  bufferCommands: false
})
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => {
    console.error('MongoDB Connection Failed:', err.message);
    console.log('Starting server in OFFLINE/MOCK fallback mode...');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000} (OFFLINE MODE)`);
    });
  });

// ROUTE MIDDLEWARE
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // ✅ ADD THIS HERE

// HOME ROUTE
app.get('/', (req, res) => {
  res.send('ShopEz API Running');
});