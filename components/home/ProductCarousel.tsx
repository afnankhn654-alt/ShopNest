
import React from 'react';
import type { Product, View } from '../../types';
import ProductCard from '../shared/ProductCard';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  navigate: (view: View) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, navigate }) => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href="#" className="text-primary font-semibold hover:underline">View All</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} navigate={navigate} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
