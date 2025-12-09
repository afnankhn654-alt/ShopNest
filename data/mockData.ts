import React from 'react';
import type { Product, Category, Review, Order } from '../types';
import { ElectronicsIcon, FashionIcon, PerfumeIcon, HomeAppliancesIcon } from '../components/icons';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: React.createElement(ElectronicsIcon, { className: "w-6 h-6" }), subcategories: [{id: 'smartphones', name: 'Smartphones'}, {id: 'laptops', 'name': 'Laptops'}, {id: 'gadgets', name: 'Gadgets'}] },
  { id: 'fashion', name: 'Fashion', icon: React.createElement(FashionIcon, { className: "w-6 h-6" }), subcategories: [{id: 'mens-wear', name: 'Men\'s Wear'}, {id: 'womens-wear', name: 'Women\'s Wear'}] },
  { id: 'perfumes', name: 'Perfumes', icon: React.createElement(PerfumeIcon, { className: "w-6 h-6" }), subcategories: [{id: 'for-men', name: 'For Men'}, {id: 'for-women', name: 'For Women'}] },
  { id: 'home-appliances', name: 'Home Appliances', icon: React.createElement(HomeAppliancesIcon, { className: "w-6 h-6" }), subcategories: [{id: 'kitchen', name: 'Kitchen'}, {id: 'cleaning', name: 'Cleaning'}] },
];

// DUMMY USER ID for mock data. In a real app, this would be the actual user's UID from Firebase.
const DUMMY_USER_ID = 'dummy-user-01';

export const initialOrders: Order[] = [
    {
        id: 'order-1',
        userId: DUMMY_USER_ID,
        date: '2023-10-15',
        status: 'Delivered',
        total: 249.49,
        items: [
            { productId: 'p1', quantity: 1, hasBeenReviewed: true },
            { productId: 'p3', quantity: 1, hasBeenReviewed: false },
        ]
    },
    {
        id: 'order-2',
        userId: DUMMY_USER_ID,
        date: '2023-10-28',
        status: 'Shipped',
        total: 99.00,
        items: [
            { productId: 'p4', quantity: 1, hasBeenReviewed: false },
        ]
    }
];


const existingProducts: Product[] = [
  {
    id: 'p1',
    name: 'AURA-X Pro Wireless Earbuds',
    description: 'Experience immersive sound with the new AURA-X Pro. Featuring active noise cancellation, a 30-hour battery life, and crystal-clear call quality. Perfect for music lovers and professionals on the go.',
    images: [
      'https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      'https://images.pexels.com/photos/19134441/pexels-photo-19134441.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
      'https://images.pexels.com/photos/16334251/pexels-photo-16334251.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 1250,
    stock: 15,
    category: 'electronics',
    brand: 'AuraSound',
    tags: ['Official Store', 'Sale', 'New Arrival'],
    variants: [
        { type: 'color', value: 'black', label: 'Midnight Black', stock: 15},
        { type: 'color', value: 'white', label: 'Glacier White', stock: 8},
        { type: 'color', value: 'blue', label: 'Ocean Blue', stock: 0},
    ],
    specifications: [
        { key: 'Connectivity', value: 'Bluetooth 5.2' },
        { key: 'Battery Life', value: 'Up to 30 hours with case' },
        { key: 'Noise Cancellation', value: 'Active Noise Cancellation (ANC)' },
        { key: 'Water Resistance', value: 'IPX4' }
    ],
    reviews: [
      {
            id: 'r1-p1',
            userId: DUMMY_USER_ID,
            author: 'Alex Reviews',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
            rating: 5,
            title: 'Absolutely fantastic!',
            content: 'This product exceeded all my expectations. The build quality is top-notch and it performs flawlessly. Highly recommended!',
            date: '2023-10-26',
            isVerified: true,
            images: [
              'https://images.pexels.com/photos/10017493/pexels-photo-10017493.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
              'https://images.pexels.com/photos/10017492/pexels-photo-10017492.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
            ],
        },
    ],
    faqs: [{ question: 'Are they compatible with iPhone?', answer: 'Yes, they are fully compatible with all iOS and Android devices.' }],
    seller: { id: 's1', name: 'AuraSound Official', logo: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', rating: 4.9, followers: 50000 }
  },
  {
    id: 'p3',
    name: 'Urban Explorer Tech Jacket',
    description: 'A stylish and functional jacket designed for the modern adventurer. Made with water-resistant fabric, multiple pockets, and a sleek urban design.',
    images: [
        'https://images.pexels.com/photos/8372733/pexels-photo-8372733.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/1684880/pexels-photo-1684880.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/7480337/pexels-photo-7480337.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ],
    price: 159.50,
    originalPrice: 199.00,
    rating: 4.7,
    reviewCount: 450,
    stock: 3,
    category: 'fashion',
    brand: 'Nomi Apparel',
    tags: ['Sale', 'New Arrival'],
    variants: [
        { type: 'size', value: 's', label: 'Small', stock: 10 },
        { type: 'size', value: 'm', label: 'Medium', stock: 3 },
        { type: 'size', value: 'l', label: 'Large', stock: 12 },
        { type: 'color', value: 'black', label: 'Black', stock: 15 },
        { type: 'color', value: 'gray', label: 'Gray', stock: 10 },
    ],
    specifications: [
        { key: 'Material', value: '100% Polyester' },
        { key: 'Fit', value: 'Regular Fit' },
    ],
    reviews: [
      {
          id: 'r1-p3',
          userId: DUMMY_USER_ID,
          author: 'Alex Reviews',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop',
          rating: 4,
          title: 'Stylish and very practical',
          content: "Great jacket for the price. It's lightweight but keeps you warm. The water-resistance works well in light rain. Lots of useful pockets.",
          date: '2023-10-18',
          isVerified: true,
          images: [],
      }
    ],
    faqs: [{ question: 'Is it machine washable?', answer: 'Yes, it is machine washable on a gentle cycle.' }],
    seller: { id: 's3', name: 'Nomi Official', logo: 'https://images.pexels.com/photos/221185/pexels-photo-221185.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', rating: 4.9, followers: 85000 }
  },
  {
    id: 'p4',
    name: 'SmartBrew Coffee Maker',
    description: 'The SmartBrew Coffee Maker connects to your WiFi, allowing you to schedule your brew from anywhere using our app. Wake up to the perfect cup of coffee every morning.',
    images: [
        'https://images.pexels.com/photos/6788323/pexels-photo-6788323.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/4309328/pexels-photo-4309328.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
        'https://images.pexels.com/photos/4109849/pexels-photo-4109849.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
    ],
    price: 99.00,
    rating: 4.6,
    reviewCount: 780,
    stock: 42,
    category: 'home-appliances',
    brand: 'HomeTech',
    tags: ['Official Store'],
    variants: [],
    specifications: [
        { key: 'Capacity', value: '12 Cups' },
        { key: 'Features', value: 'WiFi Connected, Programmable' },
    ],
    reviews: [],
    faqs: [],
    seller: { id: 's4', name: 'ShopNest Mall', logo: 'https://images.pexels.com/photos/4109744/pexels-photo-4109744.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', rating: 4.7, followers: 1200000 }
  }
];

// --- Product Generation Logic ---

// A pool of reliable, high-quality images for generated tech products
const techImagePool = [
    'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/459654/pexels-photo-459654.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/38568/apple-imac-ipad-workplace-38568.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/2148216/pexels-photo-2148216.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop',
];

const generatedProducts: Product[] = [];
const prefixes = ['Quantum', 'Aero', 'Cyber', 'Nano', 'Fusion', 'Stellar', 'Hyper', 'Giga', 'Omni', 'Vortex'];
const nouns = ['Core', 'Pulse', 'Byte', 'Sync', 'Wave', 'Drive', 'Matrix', 'Shift', 'Bot', 'Grid'];
const suffixes = ['X', 'Pro', 'Max', 'Ultra', 'Plus', '9000', 'Z', 'Alpha', 'Omega', 'Prime'];
const brands = ['InnovateX', 'TechSphere', 'Apex', 'StarkTech', 'FutureGadget', 'DigitalDreams', 'NextGen', 'Visionary'];
const techSeller = { id: 's-tech', name: 'Global Electronics', logo: 'https://images.pexels.com/photos/4109744/pexels-photo-4109744.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop', rating: 4.8, followers: 250000 };

for (let i = 0; i < 500; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const name = `${prefix}${noun} ${suffix}`;
    
    const price = parseFloat((Math.random() * (1500 - 49.99) + 49.99).toFixed(2));
    const hasDiscount = Math.random() > 0.6;
    const originalPrice = hasDiscount ? parseFloat((price * (1 + Math.random() * 0.5 + 0.1)).toFixed(2)) : undefined;
    const stock = Math.floor(Math.random() * 200);

    generatedProducts.push({
        id: `p-gen-${i + 1}`,
        name: name,
        description: `Introducing the new ${name}, a state-of-the-art device designed for the modern user. With its powerful features and sleek design, it's the perfect companion for both work and play.`,
        images: [
            techImagePool[i % techImagePool.length],
            techImagePool[(i + 5) % techImagePool.length],
            techImagePool[(i + 10) % techImagePool.length],
        ],
        price: price,
        originalPrice: originalPrice,
        rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
        reviewCount: Math.floor(Math.random() * 2000) + 50,
        stock: stock,
        category: 'electronics',
        brand: brands[Math.floor(Math.random() * brands.length)],
        tags: hasDiscount ? ['Sale', 'New Arrival'] : ['New Arrival'],
        variants: [
            { type: 'color', value: 'black', label: 'Stealth Black', stock: Math.floor(stock / 2) },
            { type: 'color', value: 'silver', label: 'Lunar Silver', stock: Math.floor(stock / 2) },
        ],
        specifications: [
            { key: 'Processor', value: `Gen ${Math.floor(Math.random() * 5) + 8} CoreChip` },
            { key: 'RAM', value: `${[8, 16, 32][Math.floor(Math.random() * 3)]}GB DDR5` },
            { key: 'Storage', value: `${[256, 512, 1024][Math.floor(Math.random() * 3)]}GB NVMe SSD` },
            { key: 'Connectivity', value: 'Wi-Fi 6E, Bluetooth 5.3' },
        ],
        reviews: [],
        faqs: [],
        seller: techSeller
    });
}

export const products: Product[] = [...existingProducts, ...generatedProducts];


export const heroBanners = [
  { id: 1, image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', title: 'Mega Electronics Sale', subtitle: 'Up to 50% off on all gadgets' },
  { id: 2, image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1600&h=600&fit=crop', title: 'New Fashion Arrivals', subtitle: 'Discover the latest trends' },
];

export const flashSaleProducts = products.slice(0, 4);

export const teamMembers = [
  {
    name: 'Eleanor Vance',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    bio: 'Eleanor founded ShopNest with the vision of creating a seamless and delightful online shopping experience, blending technology with a human touch.',
  },
  {
    name: 'Marcus Holloway',
    role: 'Chief Technology Officer',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    bio: 'Marcus leads our engineering team, driving innovation and ensuring our platform is robust, secure, and always ahead of the curve.',
  },
  {
    name: 'Aisha Khan',
    role: 'Head of Product',
    image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    bio: 'Aisha is the voice of our customers, meticulously curating our product catalog and ensuring every item meets our high standards of quality.',
  },
  {
    name: 'David Chen',
    role: 'Lead UX Designer',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    bio: 'David crafts the beautiful and intuitive interface of ShopNest, obsessing over every detail to make your journey effortless and enjoyable.',
  },
];

export const aboutUsImages = {
  hero: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600&h=700&fit=crop',
  mission: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
};