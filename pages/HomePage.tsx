
import React from 'react';
import type { View, Product } from '../types';
import HeroSlider from '../components/home/HeroSlider';
import FlashSaleSection from '../components/home/FlashSaleSection';
import ProductCarousel from '../components/home/ProductCarousel';
import CategoryIcons from '../components/home/CategoryIcons';
import { formatPrice } from '../utils/helpers';

interface HomePageProps {
  navigate: (view: View) => void;
  products: Product[];
}

const PerfumeSection: React.FC<{ navigate: (view: View) => void, products: Product[] }> = ({ navigate, products }) => {
    const perfume = products.find(p => p.category === 'perfumes');
    if (!perfume) return null;
    return (
        <div className="bg-pink-50 dark:bg-gray-800 p-8 rounded-lg flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
                <h3 className="text-sm font-semibold uppercase text-pink-500">Discover Your Scent</h3>
                <h2 className="text-3xl font-bold my-2">{perfume.name}</h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">{perfume.description.substring(0, 100)}...</p>
                 <div className="flex items-baseline mb-4">
                    <p className="text-2xl font-bold text-primary">{formatPrice(perfume.price)}</p>
                    {perfume.originalPrice && <p className="text-md text-light-text-secondary dark:text-dark-text-secondary line-through ml-2">{formatPrice(perfume.originalPrice)}</p>}
                </div>
                <button onClick={() => navigate({ name: 'product', id: perfume.id })} className="px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-transform transform hover:scale-105">
                    Explore
                </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
                <img src={perfume.images[0]} alt={perfume.name} className="max-w-xs transform hover:scale-110 transition-transform duration-500" />
            </div>
        </div>
    );
};


const HomePage: React.FC<HomePageProps> = ({ navigate, products }) => {
  return (
    <div className="animate-fade-in">
      <HeroSlider />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <CategoryIcons navigate={navigate} />
        <FlashSaleSection navigate={navigate} />
        <ProductCarousel title="Just For You" products={products.slice().reverse().slice(0, 10)} navigate={navigate} />
        <ProductCarousel title="Trending Products" products={products.slice(0, 5)} navigate={navigate} />
        <PerfumeSection navigate={navigate} products={products} />
        <ProductCarousel title="Best Selling" products={products.slice(5, 10)} navigate={navigate} />
      </div>
    </div>
  );
};

export default HomePage;
