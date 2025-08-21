require('dotenv').config({ path: '.env.local' });

// Set DATABASE_URL if not already set
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
}

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { log } = require('console');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  });

  console.log('✅ Created user:', user.email);

  // Create some sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: '1' },
      update: {},
      create: {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        userId: user.id,
      },
    }),
    prisma.product.upsert({
      where: { id: '2' },
      update: {},
      create: {
        id: '2',
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone connectivity. Track your workouts and health metrics.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        userId: user.id,
      },
    }),
    prisma.product.upsert({
      where: { id: '3' },
      update: {},
      create: {
        id: '3',
        name: 'Portable Bluetooth Speaker',
        description: 'Compact and powerful Bluetooth speaker with 360-degree sound. Perfect for outdoor activities and home entertainment.',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        userId: user.id,
      },
    }),
  ]);

  console.log('✅ Created products:', products.length);

  console.log('🎉 Database seeding completed!');
  console.log('\n📋 Test Credentials:');
  console.log('Email: admin@example.com');
  console.log('Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
