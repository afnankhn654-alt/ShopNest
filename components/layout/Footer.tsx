
import React from 'react';
import { LogoIcon } from '../icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary text-dark-text-secondary">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center mb-4">
                            <LogoIcon className="w-8 h-8 text-primary" />
                            <span className="text-2xl font-bold ml-2 text-white">ShopNest</span>
                        </div>
                        <p className="text-sm">Your one-stop shop for everything you need. Quality products, unbeatable prices.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">My Account</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Return Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Subscribe to our Newsletter</h3>
                        <p className="text-sm mb-4">Get the latest updates on new products and upcoming sales.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-l-md text-light-text focus:outline-none" />
                            <button className="bg-primary text-white px-4 rounded-r-md font-semibold hover:bg-primary-dark transition-colors">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark-bg py-4">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>&copy; {new Date().getFullYear()} ShopNest. All Rights Reserved.</p>
                    <div className="mt-4 md:mt-0">
                        <p>We accept: Visa, Mastercard, Cash on Delivery</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
