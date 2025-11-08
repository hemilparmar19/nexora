// backend/src/scripts/seedProducts.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 79.99,
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    category: "Electronics",
    stock: 50,
  },
  {
    name: "Smart Watch",
    price: 199.99,
    description:
      "Feature-rich smartwatch with fitness tracking and notifications",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    category: "Electronics",
    stock: 30,
  },
  {
    name: "Laptop Backpack",
    price: 49.99,
    description:
      "Durable laptop backpack with multiple compartments and USB charging port",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    category: "Accessories",
    stock: 100,
  },
  {
    name: "USB-C Cable",
    price: 12.99,
    description: "Fast charging USB-C cable, 6ft braided design",
    image:
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=300&h=300&fit=crop",
    category: "Accessories",
    stock: 200,
  },
  {
    name: "Phone Case",
    price: 24.99,
    description: "Protective silicone phone case with raised edges",
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop",
    category: "Accessories",
    stock: 150,
  },
  {
    name: "Bluetooth Speaker",
    price: 59.99,
    description: "Portable waterproof Bluetooth speaker with 360° sound",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    category: "Electronics",
    stock: 75,
  },
  {
    name: "Wireless Mouse",
    price: 34.99,
    description: "Ergonomic wireless mouse with adjustable DPI",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    category: "Electronics",
    stock: 120,
  },
  {
    name: "Mechanical Keyboard",
    price: 89.99,
    description: "RGB mechanical gaming keyboard with tactile switches",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
    category: "Electronics",
    stock: 40,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");

    // Clear existing products
    await Product.deleteMany();
    console.log("Cleared existing products");

    // Insert new products
    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
