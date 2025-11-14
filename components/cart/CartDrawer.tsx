import React from 'react';
import type { CartItem } from '../../types';
import { CloseIcon, TrashIcon } from '../icons';
import { formatPrice } from '../../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    // Using a keydown event listener to close the drawer on 'Escape' key press
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div 
            className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={onClose}
            aria-modal="true"
            role="dialog"
            aria-labelledby="cart-heading"
        >
            <div 
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-light-bg dark:bg-dark-bg shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 id="cart-heading" className="text-xl font-bold">Shopping Cart</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary" aria-label="Close cart">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                {cartItems.length > 0 ? (
                    <div className="flex-grow p-4 overflow-y-auto">
                        <ul className="space-y-4">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex space-x-4">
                                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex-grow flex flex-col">
                                        <div>
                                            <p className="font-semibold">{item.product.name}</p>
                                            {item.selectedVariants.length > 0 && (
                                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                                    {item.selectedVariants.map(v => v.label).join(', ')}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center border rounded-md">
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-secondary rounded-l-md" aria-label={`Decrease quantity of ${item.product.name}`}>-</button>
                                                <span className="px-3 text-sm">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-secondary rounded-r-md" aria-label={`Increase quantity of ${item.product.name}`}>+</button>
                                            </div>
                                            <p className="font-bold text-light-text dark:text-dark-text">{formatPrice(item.product.price * item.quantity)}</p>
                                            <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700" aria-label={`Remove ${item.product.name} from cart`}>
                                                <TrashIcon className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">Your cart is empty.</p>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">Looks like you haven't added anything to your cart yet.</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                            Continue Shopping
                        </button>
                    </div>
                )}
                
                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Subtotal</span>
                            <span className="text-xl font-bold">{formatPrice(subtotal)}</span>
                        </div>
                        <button className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
