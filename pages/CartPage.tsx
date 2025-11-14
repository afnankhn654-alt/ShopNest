import React from 'react';
import type { CartItem, Product, View } from '../../types';
import { TrashIcon } from '../components/icons';
import { formatPrice } from '../utils/helpers';
import ProductCarousel from '../components/home/ProductCarousel';
import CategoryIcons from '../components/home/CategoryIcons';

interface CartPageProps {
  cartItems: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  navigate: (view: View) => void;
  products: Product[];
}

const EmptyCartView: React.FC<{ navigate: (view: View) => void; products: Product[] }> = ({ navigate, products }) => (
    <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Your cart feels a little lonely</h2>
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8">explore our best picks to fill it up.</p>
        <button 
            onClick={() => navigate({ name: 'home' })} 
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-lg"
        >
            Find Products
        </button>

        <div className="mt-16 text-left space-y-8">
            <ProductCarousel title="Trending Products" products={products.slice(0, 5)} navigate={navigate} />
            <CategoryIcons navigate={navigate} title="Top Categories" />
            <ProductCarousel title="Best Selling" products={products.slice(5, 10)} navigate={navigate} />
            <ProductCarousel title="Recommended For You" products={products.slice().reverse().slice(0, 5)} navigate={navigate} />
        </div>
    </div>
);


const FilledCartView: React.FC<Omit<CartPageProps, 'products'>> = ({ cartItems, onRemoveItem, onUpdateQuantity, navigate }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-sm space-y-6">
                    {cartItems.map(item => (
                         <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-center border-b pb-6 last:border-b-0 last:pb-0">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-grow text-center sm:text-left">
                                <p className="font-bold cursor-pointer hover:text-primary" onClick={() => navigate({name: 'product', id: item.product.id})}>{item.product.name}</p>
                                {item.selectedVariants.length > 0 && (
                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                        {item.selectedVariants.map(v => v.label).join(', ')}
                                    </p>
                                )}
                                 <p className="sm:hidden font-semibold text-lg text-primary mt-2">{formatPrice(item.product.price)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-md">
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-semibold hover:bg-gray-100 dark:hover:bg-secondary rounded-l-md" aria-label={`Decrease quantity of ${item.product.name}`}>-</button>
                                    <span className="px-4 text-sm">{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-semibold hover:bg-gray-100 dark:hover:bg-secondary rounded-r-md" aria-label={`Increase quantity of ${item.product.name}`}>+</button>
                                </div>
                                <p className="hidden sm:block font-semibold w-24 text-center text-lg">{formatPrice(item.product.price * item.quantity)}</p>
                                <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary" aria-label={`Remove ${item.product.name} from cart`}>
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <aside className="lg:col-span-1 bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-sm sticky top-24">
                    <h2 className="text-2xl font-bold border-b pb-4 mb-4">Order Summary</h2>
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold">{formatPrice(subtotal)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="font-semibold">Free</span>
                        </div>
                         <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                    </div>
                    <button className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors">
                        Proceed to Checkout
                    </button>
                </aside>
            </div>
        </div>
    );
};

const CartPage: React.FC<CartPageProps> = (props) => {
    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in min-h-[calc(100vh-250px)]">
            {props.cartItems.length > 0 ? <FilledCartView {...props} /> : <EmptyCartView navigate={props.navigate} products={props.products} />}
        </div>
    );
};

export default CartPage;
