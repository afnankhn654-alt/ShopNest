import React, { useState } from 'react';
import type { Category, View, Product } from '../types';
import ProductCard from '../components/shared/ProductCard';
import { ChevronDownIcon } from '../components/icons';

interface CategoryPageProps {
  category: Category;
  navigate: (view: View) => void;
  allProducts: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, navigate, allProducts }) => {
  const categoryProducts = allProducts.filter(p => p.category === category.id);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(categoryProducts);
  const [sortOption, setSortOption] = useState('default');
  
  const handleSort = (option: string) => {
    setSortOption(option);
    let sorted = [...filteredProducts];
    switch (option) {
      case 'price_asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted = categoryProducts; // reset
    }
    setFilteredProducts(sorted);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg mb-8">
        <h1 className="text-4xl font-bold">{category.name}</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-2">
          Explore our wide range of products in the {category.name} category.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full md:w-1/4">
          <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Subcategories</h3>
                <ul className="space-y-1 text-sm">
                    {category.subcategories.map(sub => (
                         <li key={sub.id}><a href="#" className="hover:text-primary">{sub.name}</a></li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <input type="range" min="0" max="1000" className="w-full" />
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Brands</h3>
              {/* This would be dynamic in a real app */}
              <div className="space-y-1 text-sm">
                <div><input type="checkbox" id="brand1" className="mr-2" /> <label htmlFor="brand1">AuraSound</label></div>
                <div><input type="checkbox" id="brand2" className="mr-2" /> <label htmlFor="brand2">Nomi Apparel</label></div>
              </div>
            </div>
            
             <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
                Apply Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4 p-4 bg-light-card dark:bg-dark-card rounded-lg shadow-sm">
            <p>{filteredProducts.length} products found</p>
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">Default Sorting</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">By Rating</option>
              </select>
              <ChevronDownIcon className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;