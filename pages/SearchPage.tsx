import React, { useState, useEffect } from 'react';
import type { View, Product } from '../types';
import ProductCard from '../components/shared/ProductCard';
import RequestProductModal from '../components/search/RequestProductModal';

interface SearchPageProps {
  query: string;
  navigate: (view: View) => void;
  allProducts: Product[];
}

const SearchPage: React.FC<SearchPageProps> = ({ query, navigate, allProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const results = allProducts.filter(p =>
        p.name.toLowerCase().includes(lowerCaseQuery) ||
        p.brand.toLowerCase().includes(lowerCaseQuery) ||
        p.category.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query, allProducts]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in min-h-[calc(100vh-250px)]">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for "<span className="text-primary">{query}</span>"
      </h1>
      
      {filteredProducts.length > 0 ? (
        <>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">{filteredProducts.length} product(s) found.</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-light-card dark:bg-dark-card rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
            We couldn't find any products matching your search. <br/>
            You can request for us to add this product to our store.
          </p>
          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            Request a Product
          </button>
        </div>
      )}

      <RequestProductModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        initialQuery={query}
      />
    </div>
  );
};

export default SearchPage;
