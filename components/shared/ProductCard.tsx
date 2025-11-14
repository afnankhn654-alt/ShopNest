
import React from 'react';
import type { Product, View } from '../../types';
import { formatPrice } from '../../utils/helpers';
import { StarIcon, HeartIcon } from '../icons';

interface ProductCardProps {
  product: Product;
  navigate: (view: View) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigate }) => {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  
  const getBadgeColor = (tag: string) => {
    switch(tag) {
      case 'Sale': return 'bg-red-500';
      case 'New Arrival': return 'bg-blue-500';
      case 'Official Store': return 'bg-green-500';
      case 'Mall': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="bg-light-card dark:bg-dark-card rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full"
      onClick={() => navigate({ name: 'product', id: product.id })}
    >
      <div className="relative">
        <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
        {product.tags.length > 0 && (
          <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white rounded ${getBadgeColor(product.tags[0])}`}>
            {product.tags[0]}
          </div>
        )}
         {discount > 0 && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        <button className="absolute top-10 right-2 bg-white/80 dark:bg-dark-bg/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <HeartIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">{product.brand}</p>
        <h3 className="text-base font-semibold text-light-text dark:text-dark-text mb-2 flex-grow">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
            ))}
          </div>
          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary ml-2">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline">
          <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
          {product.originalPrice && <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-through ml-2">{formatPrice(product.originalPrice)}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
