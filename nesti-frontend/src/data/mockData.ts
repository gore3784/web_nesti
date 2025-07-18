import { Product, Category } from '@/types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronic devices and gadgets'
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories'
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden'
  },
  {
    id: '4',
    name: 'Sports',
    slug: 'sports',
    description: 'Sports equipment and fitness gear'
  },
  {
    id: '5',
    name: 'Books',
    slug: 'books',
    description: 'Books for all interests and ages'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
    category_id: '1',
    stock: 15,
    slug: 'wireless-bluetooth-headphones',
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Smartphone Galaxy Pro',
    description: 'Latest flagship smartphone with advanced camera system and 5G connectivity.',
    price: 12000000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop',
    category_id: '1',
    stock: 8,
    slug: 'smartphone-galaxy-pro',
    created_at: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    name: 'Laptop MacBook Air',
    description: 'Ultra-thin laptop with M2 chip, perfect for work and creativity.',
    price: 18000000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop',
    category_id: '1',
    stock: 5,
    slug: 'laptop-macbook-air',
    created_at: '2024-01-17T00:00:00Z'
  },
  {
    id: '4',
    name: 'Casual Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear.',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=300&fit=crop',
    category_id: '2',
    stock: 25,
    slug: 'casual-cotton-tshirt',
    created_at: '2024-01-18T00:00:00Z'
  },
  {
    id: '5',
    name: 'Designer Jeans',
    description: 'Premium denim jeans with modern fit and style.',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=300&fit=crop',
    category_id: '2',
    stock: 12,
    slug: 'designer-jeans',
    created_at: '2024-01-19T00:00:00Z'
  },
  {
    id: '6',
    name: 'Running Shoes',
    description: 'Professional running shoes with advanced cushioning technology.',
    price: 1200000,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop',
    category_id: '4',
    stock: 18,
    slug: 'running-shoes',
    created_at: '2024-01-20T00:00:00Z'
  },
  {
    id: '7',
    name: 'Coffee Table',
    description: 'Modern wooden coffee table perfect for your living room.',
    price: 2200000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop',
    category_id: '3',
    stock: 6,
    slug: 'coffee-table',
    created_at: '2024-01-21T00:00:00Z'
  },
  {
    id: '8',
    name: 'Programming Book Set',
    description: 'Complete set of programming books for beginners to advanced.',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop',
    category_id: '5',
    stock: 30,
    slug: 'programming-book-set',
    created_at: '2024-01-22T00:00:00Z'
  },
  {
    id: '9',
    name: 'Fitness Tracker Watch',
    description: 'Smart fitness tracker with heart rate monitor and GPS.',
    price: 1800000,
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=300&fit=crop',
    category_id: '4',
    stock: 20,
    slug: 'fitness-tracker-watch',
    created_at: '2024-01-23T00:00:00Z'
  },
  {
    id: '10',
    name: 'Leather Backpack',
    description: 'Premium leather backpack perfect for work and travel.',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop',
    category_id: '2',
    stock: 14,
    slug: 'leather-backpack',
    created_at: '2024-01-24T00:00:00Z'
  },
  {
    id: '11',
    name: 'Gaming Mouse',
    description: 'High-precision gaming mouse with RGB lighting.',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=300&fit=crop',
    category_id: '1',
    stock: 22,
    slug: 'gaming-mouse',
    created_at: '2024-01-25T00:00:00Z'
  },
  {
    id: '12',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat perfect for home workouts.',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=500&h=300&fit=crop',
    category_id: '4',
    stock: 35,
    slug: 'yoga-mat',
    created_at: '2024-01-26T00:00:00Z'
  }
];