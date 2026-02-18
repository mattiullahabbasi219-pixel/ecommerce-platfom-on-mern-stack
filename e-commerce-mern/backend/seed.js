const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const sampleProducts = [
    {
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features active noise cancellation, comfortable ear cushions, and crystal-clear audio quality.',
        price: 199.99,
        category: 'Electronics',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        brand: 'AudioTech',
        rating: 4.5,
        numReviews: 128,
        featured: true
    },
    {
        name: 'Smart Watch Pro',
        description: 'Advanced smartwatch with heart rate monitoring, GPS tracking, sleep analysis, and 100+ sport modes. Water-resistant up to 50 meters.',
        price: 299.99,
        category: 'Electronics',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        brand: 'TechGear',
        rating: 4.7,
        numReviews: 256,
        featured: true
    },
    {
        name: 'Men\'s Classic Leather Jacket',
        description: 'Premium genuine leather jacket with quilted lining. Perfect for casual and semi-formal occasions. Available in multiple sizes.',
        price: 249.99,
        category: 'Clothing',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
        brand: 'UrbanStyle',
        rating: 4.3,
        numReviews: 89,
        featured: true
    },
    {
        name: 'Women\'s Running Shoes',
        description: 'Lightweight and breathable running shoes with advanced cushioning technology. Perfect for marathon training and daily runs.',
        price: 129.99,
        category: 'Sports',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        brand: 'SprintMax',
        rating: 4.6,
        numReviews: 312,
        featured: true
    },
    {
        name: 'Modern Coffee Table',
        description: 'Sleek and modern coffee table with tempered glass top and solid wood legs. Perfect for contemporary living rooms.',
        price: 179.99,
        category: 'Home & Garden',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500',
        brand: 'HomeDecor',
        rating: 4.4,
        numReviews: 67,
        featured: false
    },
    {
        name: 'Professional DSLR Camera',
        description: '24.2MP full-frame DSLR camera with 4K video recording, advanced autofocus system, and weather-sealed body.',
        price: 1499.99,
        category: 'Electronics',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
        brand: 'PhotoPro',
        rating: 4.8,
        numReviews: 156,
        featured: true
    },
    {
        name: 'Yoga Mat Premium',
        description: 'Extra thick eco-friendly yoga mat with non-slip surface. Perfect for yoga, pilates, and floor exercises.',
        price: 49.99,
        category: 'Sports',
        stock: 100,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        brand: 'ZenFit',
        rating: 4.5,
        numReviews: 234,
        featured: false
    },
    {
        name: 'Bestseller Novel Collection',
        description: 'Collection of 5 bestselling novels from award-winning authors. Perfect gift for book lovers.',
        price: 59.99,
        category: 'Books',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
        brand: 'BookWorld',
        rating: 4.9,
        numReviews: 178,
        featured: false
    },
    {
        name: 'Organic Skincare Set',
        description: 'Complete organic skincare set including cleanser, toner, moisturizer, and serum. Made with natural ingredients.',
        price: 89.99,
        category: 'Beauty',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
        brand: 'NaturalGlow',
        rating: 4.6,
        numReviews: 145,
        featured: true
    },
    {
        name: 'Kids Building Blocks Set',
        description: '500-piece colorful building blocks set for kids. Educational toy that promotes creativity and problem-solving skills.',
        price: 39.99,
        category: 'Toys',
        stock: 80,
        image: 'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?w=500',
        brand: 'PlayTime',
        rating: 4.7,
        numReviews: 289,
        featured: false
    },
    {
        name: 'Car Dash Camera',
        description: 'Full HD 1080p dash camera with night vision, G-sensor, and loop recording. Essential for every driver.',
        price: 79.99,
        category: 'Automotive',
        stock: 55,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
        brand: 'DriveSafe',
        rating: 4.4,
        numReviews: 198,
        featured: false
    },
    {
        name: 'Wireless Gaming Mouse',
        description: 'High-precision wireless gaming mouse with 16000 DPI, RGB lighting, and programmable buttons.',
        price: 69.99,
        category: 'Electronics',
        stock: 70,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        brand: 'GameGear',
        rating: 4.5,
        numReviews: 412,
        featured: true
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin'
        });
        console.log('Created admin user: admin@example.com / admin123');

        // Create test user
        const testUser = await User.create({
            name: 'Test User',
            email: 'user@example.com',
            password: 'user123',
            role: 'user'
        });
        console.log('Created test user: user@example.com / user123');

        // Insert products
        await Product.insertMany(sampleProducts);
        console.log(`Inserted ${sampleProducts.length} sample products`);

        console.log('\n✅ Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDatabase();
