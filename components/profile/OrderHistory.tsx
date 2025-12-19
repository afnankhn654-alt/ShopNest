import React, { useState } from 'react';
import type { Order, Product, Review } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/helpers';
import ReviewModal from './ReviewModal';

interface OrderHistoryProps {
    orders: Order[];
    products: Product[];
    onAddReview: (productId: string, orderId: string, review: Omit<Review, 'id' | 'date' | 'isVerified'>) => void;
}

type ProductToReview = {
    product: Product;
    orderId: string;
};

const OrderTrackingTimeline: React.FC<{ status: Order['status'] }> = ({ status }) => {
    const statuses: Order['status'][] = ['Processing', 'Shipped', 'Delivered'];
    const currentStatusIndex = statuses.indexOf(status);

    const CheckIcon = () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );
    
    const DotIcon = () => (
        <div className="w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
    );

    const Step = ({ s, index }: { s: Order['status'], index: number }) => {
        const isActive = index <= currentStatusIndex;

        return (
            <div className="relative flex flex-col items-center justify-center w-full">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${isActive ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>
                    {isActive ? <CheckIcon /> : <DotIcon />}
                </div>
                <p className={`mt-2 text-xs text-center font-medium transition-colors duration-300 w-20 ${isActive ? 'text-light-text dark:text-dark-text' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>{s}</p>
            </div>
        );
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold mb-4">Order Tracking</h4>
            <div className="w-full px-4 sm:px-8">
                <div className="relative flex justify-between items-center">
                    <div className="absolute left-0 top-5 h-1 w-full bg-gray-200 dark:bg-gray-600">
                        <div 
                            className="absolute left-0 top-0 h-1 bg-primary transition-all duration-500 ease-out" 
                            style={{ width: `${currentStatusIndex > 0 ? (currentStatusIndex / (statuses.length - 1)) * 100 : 0}%` }}
                        ></div>
                    </div>
                    {statuses.map((s, index) => <Step key={s} s={s} index={index} />)}
                </div>
            </div>
        </div>
    );
};


const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, products, onAddReview }) => {
    const { user } = useAuth();
    const [productToReview, setProductToReview] = useState<ProductToReview | null>(null);

    // In a real app, we'd filter by user.uid. For this demo, we'll show all mock orders.
    const userOrders = orders; 

    const findProduct = (productId: string) => products.find(p => p.id === productId);

    const getStatusChipColor = (status: Order['status']) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            case 'Processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            {userOrders.length > 0 ? (
                <div className="space-y-6">
                    {userOrders.map(order => (
                        <div key={order.id} className="bg-light-bg dark:bg-secondary/50 p-4 rounded-lg shadow-sm">
                            <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-3 mb-3">
                                <div>
                                    <p className="font-bold">Order ID: <span className="font-normal">{order.id}</span></p>
                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Placed on: {new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className="mt-2 sm:mt-0 text-right">
                                     <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${getStatusChipColor(order.status)}`}>{order.status}</span>
                                     <p className="font-bold mt-1">{formatPrice(order.total)}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {order.items.map(item => {
                                    const product = findProduct(item.productId);
                                    if (!product) return null;
                                    return (
                                        <div key={item.productId} className="flex flex-col sm:flex-row justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover rounded-md" />
                                                <div>
                                                    <p className="font-semibold">{product.name}</p>
                                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="mt-3 sm:mt-0">
                                                {order.status === 'Delivered' && !item.hasBeenReviewed && (
                                                    <button onClick={() => setProductToReview({ product, orderId: order.id })} className="px-4 py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                                                        Write a Review
                                                    </button>
                                                )}
                                                {order.status === 'Delivered' && item.hasBeenReviewed && (
                                                    <p className="text-sm text-green-600 font-semibold">Review Submitted</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <OrderTrackingTimeline status={order.status} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-light-text-secondary dark:text-dark-text-secondary py-8">You have no past orders.</p>
            )}

            {productToReview && user && (
                <ReviewModal 
                    product={productToReview.product}
                    orderId={productToReview.orderId}
                    onClose={() => setProductToReview(null)}
                    onSubmit={onAddReview}
                />
            )}
        </div>
    );
};

export default OrderHistory;
