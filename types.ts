// FIX: Import React to provide the React namespace for React.ReactNode.
import React from 'react';

export interface Review {
  id: string;
  userId: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  isVerified: boolean;
  images: string[];
}

export interface Specification {
  key: string;
  value: string;
}

export interface Variant {
  type: 'color' | 'size' | 'style';
  value: string;
  label: string;
  stock: number;
}

export interface Seller {
  id: string;
  name: string;
  logo: string;
  rating: number;
  followers: number;
}

export interface PerfumeNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  videoUrl?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  category: string;
  brand: string;
  tags: ('Official Store' | 'Mall' | 'Sale' | 'New Arrival')[];
  variants: Variant[];
  specifications: Specification[];
  reviews: Review[];
  faqs: { question: string; answer: string }[];
  seller: Seller;
  perfumeNotes?: PerfumeNotes;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: { id: string; name: string }[];
}

export type View =
  | { name: 'home' }
  | { name: 'product'; id: string }
  | { name: 'category'; id: string }
  | { name: 'profile' }
  | { name: 'cart' }
  | { name: 'wishlist' }
  | { name: 'login' };

export interface NavLink {
    name: string;
    view: View;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  hasBeenReviewed: boolean;
}

export interface Order {
  id:string;
  userId: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing';
  items: OrderProduct[];
  total: number;
}

export interface CartItem {
  id: string; // Composite key: productId_variantValue1_variantValue2...
  product: Product;
  quantity: number;
  selectedVariants: Variant[];
}
