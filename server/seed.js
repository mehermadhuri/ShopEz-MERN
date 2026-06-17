require('dotenv').config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shopez";

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB for seeding...'))
  .catch(err => {
    console.error('Connection error during seeding:', err);
    process.exit(1);
  });

const products = [
  { name: "Bluetooth Speaker", price: 999, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1", stock: 10 },
  { name: "Smart Watch", price: 1499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", stock: 10 },
  { name: "Headphones", price: 799, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", stock: 10 },
  { name: "Laptop Stand", price: 699, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3", stock: 10 },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("DB Seeded");
  process.exit();
};

seedDB();