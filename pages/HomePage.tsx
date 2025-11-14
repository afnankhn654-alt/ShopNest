import React from 'react';
import type { View, Product } from '../types';
import HeroSlider from '../components/home/HeroSlider';
import FlashSaleSection from '../components/home/FlashSaleSection';
import ProductCarousel from '../components/home/ProductCarousel';
import { categories, customerVideoReviews } from '../data/mockData';
import { formatPrice } from '../utils/helpers';

interface HomePageProps {
  navigate: (view: View) => void;
  products: Product[];
}

const CategoryIcons: React.FC<{ navigate: (view: View) => void }> = ({ navigate }) => (
    <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-center">
            {categories.slice(0, 8).map(cat => (
                <div key={cat.id} onClick={() => navigate({ name: 'category', id: cat.id })} className="flex flex-col items-center space-y-2 cursor-pointer group">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary transition-colors text-primary group-hover:text-white">
                       {/* FIX: Replaced redundant React.cloneElement with direct rendering of cat.icon. */}
                       {cat.icon}
                    </div>
                    <span className="text-xs font-medium">{cat.name}</span>
                </div>
            ))}
        </div>
    </div>
);

const VideoReviewsSection: React.FC = () => (
    <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">Customer Video Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerVideoReviews.map(review => (
                <div key={review.id} className="relative rounded-lg overflow-hidden group cursor-pointer">
                    <img src={review.videoThumbnail} alt={review.product} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="relative z-10">
                            <p className="text-white font-semibold">{review.product}</p>
                            <p className="text-sm text-gray-300">by {review.author}</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/30 rounded-full p-4 backdrop-blur-sm">
                           <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

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
        <VideoReviewsSection />
        <PerfumeSection navigate={navigate} products={products} />
        <ProductCarousel title="Best Sellers" products={products.slice(5, 10)} navigate={navigate} />
      </div>
    </div>
  );
};

export default HomePage;