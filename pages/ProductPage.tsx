import React, { useState } from 'react';
import type { Product, Review, Variant, View } from '../types';
import { formatPrice } from '../utils/helpers';
import { StarIcon, HeartIcon, VerifiedIcon } from '../components/icons';
import ProductCarousel from '../components/home/ProductCarousel';
import { products } from '../data/mockData';


interface ProductPageProps {
  product: Product;
  navigate: (view: View) => void;
  onAddToCart: (product: Product, quantity: number, selectedVariants: Variant[]) => void;
}

const ProductImageGallery: React.FC<{ images: string[]; productName: string }> = ({ images, productName }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
                {images.map((img, idx) => (
                    <img 
                        key={idx}
                        src={img}
                        alt={`${productName} thumbnail ${idx+1}`}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                        onClick={() => setMainImage(img)}
                    />
                ))}
            </div>
            <div className="flex-grow">
                <img src={mainImage} alt={productName} className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-lg"/>
            </div>
        </div>
    );
};

const ProductReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold border-b pb-2">Customer Reviews</h3>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.id} className="flex space-x-4 border-b pb-4">
                        <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full"/>
                        <div>
                            <div className="flex items-center space-x-2">
                               <p className="font-semibold">{review.author}</p>
                               {review.isVerified && <span className="text-xs flex items-center text-green-600"><VerifiedIcon className="w-4 h-4 mr-1"/> Verified Purchase</span>}
                            </div>
                            <div className="flex items-center my-1">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                                <p className="font-bold ml-2">{review.title}</p>
                            </div>
                            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">{review.content}</p>
                            <div className="flex space-x-2">
                                {review.images.map((img, idx) => <img key={idx} src={img} className="w-24 h-24 object-cover rounded-md"/>)}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                 <div className="text-center py-8">
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">No reviews yet.</p>
                </div>
            )}
        </div>
    )
}

const VariantSelector: React.FC<{
    variants: Variant[];
    type: Variant['type'];
    selectedValue: string | undefined;
    onSelect: (variant: Variant) => void;
}> = ({ variants, type, selectedValue, onSelect }) => {
    const filteredVariants = variants.filter(v => v.type === type);
    if (filteredVariants.length === 0) return null;

    const selectedLabel = filteredVariants.find(v => v.value === selectedValue)?.label;

    return (
        <div className="my-4">
            <p className="font-semibold capitalize mb-2">{type}: <span className="font-normal text-light-text-secondary dark:text-dark-text-secondary">{selectedLabel}</span></p>
            <div className="flex flex-wrap gap-2">
                {filteredVariants.map(variant => {
                    const isSelected = selectedValue === variant.value;
                    return (
                        <button
                            key={variant.value}
                            disabled={variant.stock === 0}
                            onClick={() => onSelect(variant)}
                            className={`px-4 py-2 border rounded-md text-sm transition-colors duration-200
                                ${variant.stock === 0 ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 line-through cursor-not-allowed' : ''}
                                ${isSelected 
                                    ? 'border-primary bg-orange-100 dark:bg-primary/20 text-primary-dark ring-1 ring-primary' 
                                    : 'hover:border-primary dark:border-gray-600'}
                            `}
                        >
                            {variant.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const ProductPage: React.FC<ProductPageProps> = ({ product, navigate, onAddToCart }) => {
    const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, Variant | null>>({});
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);
    
    const variantTypes = [...new Set(product.variants.map(v => v.type))];

    const handleVariantSelect = (variant: Variant) => {
        setSelectedVariants(prev => ({
            ...prev,
            [variant.type]: variant
        }));
        setError(null);
    };

    const handleAddToCartClick = () => {
        if (variantTypes.length > 0) {
            const allTypesSelected = variantTypes.every(type => selectedVariants[type]);
            if (!allTypesSelected) {
                setError(`Please select an option for each variant: ${variantTypes.join(', ')}.`);
                return;
            }
        }
        
        const variantsToAdd = Object.values(selectedVariants).filter((v): v is Variant => v !== null);
        onAddToCart(product, quantity, variantsToAdd);
    };
    
    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <ProductImageGallery images={product.images} productName={product.name}/>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{product.rating} stars | {product.reviewCount} reviews</span>
                    </div>

                    <div className="flex items-baseline space-x-3 mb-4">
                        <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.originalPrice && <span className="text-xl line-through text-light-text-secondary dark:text-dark-text-secondary">{formatPrice(product.originalPrice)}</span>}
                    </div>

                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">{product.description}</p>
                    
                    {variantTypes.map(type => (
                        <VariantSelector
                            key={type}
                            variants={product.variants}
                            type={type}
                            selectedValue={selectedVariants[type]?.value}
                            onSelect={handleVariantSelect}
                        />
                    ))}

                    <div className="flex items-center space-x-4 my-6">
                        <div className="font-semibold">Quantity:</div>
                        <div className="flex items-center border rounded-md">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 dark:hover:bg-secondary rounded-l-md">-</button>
                            <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-lg font-bold hover:bg-gray-100 dark:hover:bg-secondary rounded-r-md">+</button>
                        </div>
                    </div>

                    {product.stock < 20 && <p className="text-red-500 font-semibold my-4">Only {product.stock} left in stock!</p>}
                    
                    {error && <p className="text-red-500 text-sm my-2">{error}</p>}

                    <div className="flex items-center space-x-4 my-6">
                        <button onClick={handleAddToCartClick} className="flex-grow bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors">Add to Cart</button>
                        <button className="p-3 border rounded-lg hover:border-primary"><HeartIcon className="w-6 h-6"/></button>
                    </div>

                    <div className="border-t border-b py-4 space-y-2">
                        <p><strong>Brand:</strong> <span className="text-primary">{product.brand}</span></p>
                        <p><strong>Category:</strong> <span className="text-primary cursor-pointer" onClick={() => navigate({name: 'category', id: product.category})}>{product.category}</span></p>
                        <p><strong>Delivery:</strong> Estimated by Tomorrow</p>
                    </div>
                </div>
            </div>

            <div className="my-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {product.perfumeNotes && (
                        <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-bold mb-4">Perfume Notes</h3>
                            <div className="space-y-2">
                                <p><strong>Top Notes:</strong> {product.perfumeNotes.top.join(', ')}</p>
                                <p><strong>Middle Notes:</strong> {product.perfumeNotes.middle.join(', ')}</p>
                                <p><strong>Base Notes:</strong> {product.perfumeNotes.base.join(', ')}</p>
                            </div>
                        </div>
                    )}
                    <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-bold mb-4">Specifications</h3>
                        <ul className="space-y-2">
                            {product.specifications.map(spec => (
                                <li key={spec.key} className="flex justify-between border-b pb-1">
                                    <span className="font-semibold">{spec.key}</span>
                                    <span>{spec.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="my-12">
                <ProductReviews reviews={product.reviews} />
            </div>

            <div className="my-12">
                <ProductCarousel title="Frequently Bought Together" products={similarProducts} navigate={navigate} />
            </div>
        </div>
    );
};

export default ProductPage;
