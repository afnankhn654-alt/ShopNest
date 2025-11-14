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
    },
     {
        id: 'order-3',
        userId: DUMMY_USER_ID,
        date: '2023-09-05',
        status: 'Delivered',
        total: 120.00,
        items: [
            { productId: 'p2', quantity: 1, hasBeenReviewed: false },
        ]
    }
];


const existingProducts: Product[] = [
  {
    id: 'p1',
    name: 'AURA-X Pro Wireless Earbuds',
    description: 'Experience immersive sound with the new AURA-X Pro. Featuring active noise cancellation, a 30-hour battery life, and crystal-clear call quality. Perfect for music lovers and professionals on the go.',
    images: [
      'https://images.unsplash.com/photo-1606741965326-cb990ae107b3?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887924-367292a47f4b?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1613134128275-53f764a5c05c?w=800&h=800&fit=crop&q=80'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 1250,
    stock: 15,
    category: 'electronics',
    brand: 'Johnny Sins',
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
            author: 'Talha Reviews',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop',
            rating: 5,
            title: 'Absolutely fantastic!',
            content: 'This product exceeded all my expectations. The build quality is top-notch and it performs flawlessly. Highly recommended!',
            date: '2023-10-26',
            isVerified: true,
            images: [
              'https://images.unsplash.com/photo-1591342371134-3a5665313936?w=200&h=200&fit=crop&q=80',
              'https://images.unsplash.com/photo-1589502543313-069f52d0b57c?w=200&h=200&fit=crop&q=80'
            ],
        },
    ],
    faqs: [{ question: 'Are they compatible with iPhone?', answer: 'Yes, they are fully compatible with all iOS and Android devices.' }],
    seller: { id: 's1', name: 'AuraSound Official', logo: 'https://images.unsplash.com/photo-1611108010197-991d9ec831d5?w=40&h=40&fit=crop&q=60', rating: 4.9, followers: 50000 }
  },
  {
    id: 'p2',
    name: 'Le Parfum Mystique',
    description: 'An enchanting fragrance that captures the essence of a midnight garden. A blend of rare florals and exotic spices, perfect for unforgettable evenings.',
    images: [
      'https://images.unsplash.com/photo-1617121221473-8c4598b0b1f2?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588224973053-d1f0b09335a7?w=800&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622631976033-11b33b7a5843?w=800&h=800&fit=crop&q=80'
    ],
    price: 120.00,
    rating: 4.9,
    reviewCount: 340,
    stock: 50,
    category: 'perfumes',
    brand: 'Maison de Senteurs',
    tags: ['Mall'],
    variants: [
        { type: 'size', value: '50ml', label: '50ml', stock: 50 },
        { type: 'size', value: '100ml', label: '100ml', stock: 25 },
    ],
    specifications: [
        { key: 'Type', value: 'Eau de Parfum' },
        { key: 'For', value: 'Women' },
    ],
    perfumeNotes: {
        top: ['Jasmine', 'Saffron'],
        middle: ['Amberwood', 'Ambergris'],
        base: ['Fir Resin', 'Cedar']
    },
    reviews: [
      {
          id: 'r1-p2',
          userId: 'user-jane-doe',
          author: 'Jane Doe',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop',
          rating: 4,
          title: 'Enchanting and long-lasting',
          content: 'A truly mystical scent. It lasts the entire day and I get so many compliments. The bottle is also a piece of art.',
          date: '2023-09-20',
          isVerified: true,
          images: [],
      }
    ],
    faqs: [{ question: 'How long does the scent last?', answer: 'It typically lasts for 8-10 hours, depending on skin type and environment.' }],
    seller: { id: 's2', name: 'ScentsnStories PK', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=40&h=40&fit=crop&q=60', rating: 4.8, followers: 120000 }
  },
  {
    id: 'p3',
    name: 'Urban Explorer Tech Jacket',
    description: 'A stylish and functional jacket designed for the modern adventurer. Made with water-resistant fabric, multiple pockets, and a sleek urban design.',
    images: [
        'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1591953902346-0d190b39dd75?w=800&h=800&fit=crop&q=80'
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
          author: 'Talha Reviews',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop',
          rating: 4,
          title: 'Stylish and very practical',
          content: "Great jacket for the price. It's lightweight but keeps you warm. The water-resistance works well in light rain. Lots of useful pockets.",
          date: '2023-10-18',
          isVerified: true,
          images: [],
      }
    ],
    faqs: [{ question: 'Is it machine washable?', answer: 'Yes, it is machine washable on a gentle cycle.' }],
    seller: { id: 's3', name: 'Nomi.pk Official', logo: 'https://images.unsplash.com/photo-1549924231-f929de01e5f4?w=40&h=40&fit=crop&q=60', rating: 4.9, followers: 85000 }
  },
  {
    id: 'p4',
    name: 'SmartBrew Coffee Maker',
    description: 'The SmartBrew Coffee Maker connects to your WiFi, allowing you to schedule your brew from anywhere using our app. Wake up to the perfect cup of coffee every morning.',
    images: [
        'https://images.unsplash.com/photo-1603568843232-2428d575402c?w=800&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1554162445-b461aa7b3633?w=800&h=800&fit=crop&q=80'
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
    seller: { id: 's4', name: 'Daraz Mall', logo: 'https://images.unsplash.com/photo-1580974853248-732398508b98?w=40&h=40&fit=crop&q=60', rating: 4.7, followers: 1200000 }
  }
];

// --- Product Generation Logic ---

// A pool of reliable, high-quality images for generated tech products
const techImagePool = [
    'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=800&h=800&fit=crop&q=80', // Drone
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop&q=80', // Smartphone
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=800&fit=crop&q=80', // Gaming Laptop
    'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&h=800&fit=crop&q=80', // Smartwatch
    'https://images.unsplash.com/photo-1516941151323-864a3951f43a?w=800&h=800&fit=crop&q=80', // VR Headset
    'https://images.unsplash.com/photo-1563297055-17912d0e8235?w=800&h=800&fit=crop&q=80', // Camera
    'https://images.unsplash.com/photo-1593152147344-e386e8493325?w=800&h=800&fit=crop&q=80', // Tablet
    'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&h=800&fit=crop&q=80', // Desk Setup
    'https://images.unsplash.com/photo-1627843563095-f6e94676cfe0?w=800&h=800&fit=crop&q=80', // Smart Speaker
    'https://images.unsplash.com/photo-1617006132788-b785e519c5a1?w=800&h=800&fit=crop&q=80', // Mechanical Keyboard
    'https://images.unsplash.com/photo-1546435770-a3e426bf4022?w=800&h=800&fit=crop&q=80', // Graphics Card
    'https://images.unsplash.com/photo-1579586337278-35d18b3d8096?w=800&h=800&fit=crop&q=80', // Wireless Mouse
    'https://images.unsplash.com/photo-1519968948342-a2fa382a048e?w=800&h=800&fit=crop&q=80', // Projector
    'https://images.unsplash.com/photo-1629895694776-85141451f288?w=800&h=800&fit=crop&q=80', // SSD Drive
    'https://images.unsplash.com/photo-1624424361226-f3318a48bfee?w=800&h=800&fit=crop&q=80', // Router
    'https://images.unsplash.com/photo-1587098422176-157470a6a3b8?w=800&h=800&fit=crop&q=80', // Action Camera
];

const generatedProducts: Product[] = [];
const prefixes = ['Quantum', 'Aero', 'Cyber', 'Nano', 'Fusion', 'Stellar', 'Hyper', 'Giga', 'Omni', 'Vortex'];
const nouns = ['Core', 'Pulse', 'Byte', 'Sync', 'Wave', 'Drive', 'Matrix', 'Shift', 'Bot', 'Grid'];
const suffixes = ['X', 'Pro', 'Max', 'Ultra', 'Plus', '9000', 'Z', 'Alpha', 'Omega', 'Prime'];
const brands = ['InnovateX', 'TechSphere', 'Apex', 'StarkTech', 'FutureGadget', 'DigitalDreams', 'NextGen', 'Visionary'];
const techSeller = { id: 's-tech', name: 'Global Electronics', logo: 'https://images.unsplash.com/photo-1633355521193-8a032f89a8e2?w=40&h=40&fit=crop&q=60', rating: 4.8, followers: 250000 };

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
            techImagePool[(i + 15) % techImagePool.length],
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
  { id: 1, image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1600&h=600&fit=crop&q=80', title: 'Mega Electronics Sale', subtitle: 'Up to 50% off on all gadgets' },
  { id: 2, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=600&fit=crop&q=80', title: 'New Fashion Arrivals', subtitle: 'Discover the latest trends' },
  { id: 3, image: 'https://images.unsplash.com/photo-1557173489-3c3a54a9a2df?w=1600&h=600&fit=crop&q=80', title: 'Fragrance Fest', subtitle: 'Exquisite scents for every occasion' },
];

export const flashSaleProducts = products.slice(0, 4);

export const customerVideoReviews = [
    { id: 1, videoThumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop', product: 'AURA-X Pro', author: 'TalhaReviews' },
    { id: 2, videoThumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop', product: 'SmartBrew Coffee', author: 'TechGuru' },
    { id: 3, videoThumbnail: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=600&fit=crop', product: 'Urban Explorer Jacket', author: 'FashionForward' },
];