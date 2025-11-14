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