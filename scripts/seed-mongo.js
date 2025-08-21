const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Load environment variables manually
const fs = require('fs');
const path = require('path');

try {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      // Remove BOM and other special characters
      const cleanLine = line.replace(/^\uFEFF/, '').trim();
      const [key, ...valueParts] = cleanLine.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
        console.log(`Set ${key.trim()} from .env.local`);
      }
    }
  });
} catch (error) {
  console.error('Error reading .env.local:', error.message);
}

// Debug: Log environment variables
console.log('Environment check:');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

// Check if MONGODB_URI is set
if (!process.env.MONGODB_URI) {
  // Set MONGODB_URI manually
  process.env.MONGODB_URI = 'mongodb+srv://mahiudddenmd:4WW6ijL0w9By3SPr@cluster0.xqgu2zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  console.log('MONGODB_URI set manually');
}

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, index: true },
  image: { type: String },
  password: { type: String },
}, { timestamps: true });

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  userId: { type: String, required: true }, // String type to match existing data
}, { timestamps: true });

const User = mongoose.model('User', UserSchema, 'users_new');
const Product = mongoose.model('Product', ProductSchema, 'products_new');

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB || undefined,
    });
    console.log('Connected to MongoDB successfully');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 12);
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    });
    console.log('Created test user:', user.email);

    // Create sample products
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        userId: String(user._id),
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health monitoring',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        userId: String(user._id),
      },
      {
        name: 'Laptop Stand',
        description: 'Ergonomic laptop stand for better productivity',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        userId: String(user._id),
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`Created ${createdProducts.length} products`);

    console.log('Seeding completed successfully!');
    console.log('Test user credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

main();
