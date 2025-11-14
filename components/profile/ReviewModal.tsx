import React, { useState } from 'react';
import type { Product, Review } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { StarIcon } from '../icons';

interface ReviewModalProps {
    product: Product;
    orderId: string;
    onClose: () => void;
    onSubmit: (productId: string, orderId: string, review: Omit<Review, 'id' | 'date' | 'isVerified'>) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ product, orderId, onClose, onSubmit }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || rating === 0) return;
        onSubmit(product.id, orderId, {
            userId: user.uid,
            author: user.displayName || 'Anonymous',
            avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'A'}&background=random`,
            rating,
            title,
            content,
            images: [],
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
                <div className="flex items-center space-x-4 mb-4">
                    <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{product.brand}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="font-semibold block mb-2">Your Rating *</label>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map(star => (
                                // FIX: Wrap StarIcon in a button to handle click and hover events.
                                // The StarIcon component does not accept event handlers directly.
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    <StarIcon
                                        className={`w-8 h-8 cursor-pointer ${ (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="review-title" className="font-semibold block mb-1">Review Title *</label>
                        <input id="review-title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Best purchase ever!" className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div>
                        <label htmlFor="review-content" className="font-semibold block mb-1">Review Content *</label>
                        <textarea id="review-content" value={content} onChange={e => setContent(e.target.value)} rows={4} placeholder="Tell us more about the product..." className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 dark:bg-secondary font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:bg-primary-light" disabled={!rating || !title || !content}>Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
