import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { CloseIcon, UploadIcon } from '../icons';

interface RequestProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialQuery: string;
}

const RequestProductModal: React.FC<RequestProductModalProps> = ({ isOpen, onClose, initialQuery }) => {
    const { user } = useAuth();
    const [productName, setProductName] = useState(initialQuery);
    const [email, setEmail] = useState(user?.email || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!productName) {
            setError('Product name is required.');
            return;
        }
        if (!user && !email) {
            setError('Email is required as you are not logged in.');
            return;
        }
        setIsSubmitting(true);
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Product Request Submitted:', { productName, email, imageName: imageFile?.name });
        setIsSubmitting(false);
        setSuccessMessage('Your request has been submitted successfully! We will notify you when the product is available.');
        setTimeout(() => {
            onClose();
            // Reset state for next time
            setSuccessMessage('');
            setProductName(initialQuery);
            setImageFile(null);
            setImagePreview(null);
        }, 3000);
    };
    
    // Reset state when modal opens
    React.useEffect(() => {
        if(isOpen) {
            setProductName(initialQuery);
            setEmail(user?.email || '');
            setError('');
            setSuccessMessage('');
            setImageFile(null);
            setImagePreview(null);
        }
    }, [isOpen, initialQuery, user]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="request-product-heading">
            <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-xl w-full max-w-lg p-6 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-secondary" aria-label="Close modal">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h2 id="request-product-heading" className="text-2xl font-bold mb-4">Request a Product</h2>
                {successMessage ? (
                     <div className="text-center py-8">
                        <p className="text-lg text-green-600">{successMessage}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="productName" className="font-semibold block mb-1">Product Name *</label>
                            <input id="productName" type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="e.g., QuantumCore X Laptop" className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                        </div>
                        {!user && (
                             <div>
                                <label htmlFor="email" className="font-semibold block mb-1">Your Email *</label>
                                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="So we can notify you" className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                            </div>
                        )}
                        <div>
                            <label className="font-semibold block mb-1">Product Image (Optional)</label>
                            <label htmlFor="imageUpload" className="mt-2 flex justify-center items-center w-full h-32 px-4 py-2 transition bg-white dark:bg-secondary border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary-light dark:hover:border-primary">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Product preview" className="h-full object-contain" />
                                ) : (
                                    <span className="flex items-center space-x-2">
                                        <UploadIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                                        <span className="font-medium text-gray-600 dark:text-gray-400">
                                            Drop files to Attach, or <span className="text-primary">browse</span>
                                        </span>
                                    </span>
                                )}
                            </label>
                             <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:bg-primary-light" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RequestProductModal;
