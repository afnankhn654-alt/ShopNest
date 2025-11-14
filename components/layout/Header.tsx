import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import type { View } from '../../types';
import { categories } from '../../data/mockData';
import { LogoIcon, SearchIcon, UserIcon, CartIcon, HeartIcon, SunIcon, MoonIcon, ChevronDownIcon, MenuIcon, CloseIcon } from '../icons';

interface HeaderProps {
  navigate: (view: View) => void;
  cartItemCount: number;
}

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-secondary hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ navigate, cartItemCount }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const { user } = useAuth();
    
    const handleCloseMenu = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsAnimatingOut(false);
        }, 500); // Duration of the animation
    };
    
    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    };

    return (
        <header className="bg-light-card dark:bg-dark-card shadow-md sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-gray-100 dark:bg-secondary text-xs text-light-text-secondary dark:text-dark-text-secondary">
                <div className="container mx-auto px-4 py-1 flex justify-between items-center">
                    <div>
                        <span>Become a Seller</span> | <span>Help & Support</span>
                    </div>
                    <ThemeToggle />
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button className="lg:hidden" onClick={handleOpenMenu}>
                        <MenuIcon className="w-6 h-6" />
                    </button>
                    <div className="flex items-center cursor-pointer" onClick={() => navigate({ name: 'home' })}>
                        <LogoIcon className="w-8 h-8 text-primary" />
                        <span className="text-2xl font-bold ml-2">ShopNest</span>
                    </div>
                </div>

                <div className="hidden lg:flex flex-grow max-w-2xl mx-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full pl-4 pr-12 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button className="absolute right-0 top-0 h-full px-4 text-white bg-primary rounded-r-full flex items-center justify-center">
                            <SearchIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate(user ? { name: 'profile' } : { name: 'login' })} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary transition-colors">
                        <UserIcon className="w-6 h-6" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary transition-colors">
                        <HeartIcon className="w-6 h-6" />
                    </button>
                    <button onClick={() => navigate({ name: 'cart' })} className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary transition-colors">
                        <CartIcon className="w-6 h-6" />
                        {cartItemCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItemCount}</span>}
                    </button>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="hidden lg:block border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <ul className="flex space-x-6">
                        <li className="group relative py-4">
                             <button className="flex items-center">
                                Categories <ChevronDownIcon className="w-4 h-4 ml-1" />
                            </button>
                            <div className="absolute hidden group-hover:block bg-light-card dark:bg-dark-card shadow-lg rounded-md mt-0 p-4 w-64">
                                <ul>
                                    {categories.map(cat => (
                                        <li key={cat.id} onClick={() => navigate({ name: 'category', id: cat.id })} className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-secondary rounded cursor-pointer">
                                            {cat.icon}
                                            <span>{cat.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li className="py-4"><button className="hover:text-primary transition-colors">Deals</button></li>
                        <li className="py-4"><button className="hover:text-primary transition-colors">What's New</button></li>
                        <li className="py-4"><button className="hover:text-primary transition-colors">Delivery</button></li>
                    </ul>
                </div>
            </nav>
            
            {/* Mobile Menu */}
             {isMenuOpen && (
                <div 
                    className={`fixed inset-0 bg-black/50 z-50 lg:hidden ${isAnimatingOut ? 'animate-fade-out' : 'animate-fade-in'}`} 
                    onClick={handleCloseMenu}
                >
                    <div 
                        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-light-bg dark:bg-dark-bg p-6 overflow-y-auto ${isAnimatingOut ? 'animate-slide-out-left' : 'animate-slide-in-left'}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold">Menu</span>
                            <button onClick={handleCloseMenu}>
                                <CloseIcon className="w-6 h-6"/>
                            </button>
                        </div>
                        {/* Mobile Search */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-secondary"
                            />
                            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        {/* Mobile Navigation */}
                        <ul className="space-y-4">
                            {categories.map(cat => (
                                <li key={cat.id} onClick={() => { navigate({ name: 'category', id: cat.id }); handleCloseMenu(); }} className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-secondary rounded cursor-pointer">
                                    {cat.icon}
                                    <span>{cat.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;