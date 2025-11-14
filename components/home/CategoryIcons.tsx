import React from 'react';
import type { View } from '../../types';
import { categories } from '../../data/mockData';

interface CategoryIconsProps {
    navigate: (view: View) => void;
    title?: string;
}

const CategoryIcons: React.FC<CategoryIconsProps> = ({ navigate, title }) => (
    <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-sm">
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-center">
            {categories.slice(0, 8).map(cat => (
                <div key={cat.id} onClick={() => navigate({ name: 'category', id: cat.id })} className="flex flex-col items-center space-y-2 cursor-pointer group">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-secondary rounded-full flex items-center justify-center group-hover:bg-primary transition-colors text-primary group-hover:text-white">
                       {cat.icon}
                    </div>
                    <span className="text-xs font-medium">{cat.name}</span>
                </div>
            ))}
        </div>
    </div>
);

export default CategoryIcons;
