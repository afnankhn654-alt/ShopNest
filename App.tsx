import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import Chatbot from './components/shared/Chatbot';
import type { Product, Category, View, Order, Review, CartItem, Variant } from './types';
import { products as initialProducts, categories, initialOrders } from './data/mockData';

const AppContent: React.FC = () => {
    const [view, setView] = useState<View>({ name: 'home' });
    const { theme } = useTheme();
    const { user, loading } = useAuth();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const navigate = useCallback((newView: View) => {
        window.scrollTo(0, 0);
        setView(newView);
    }, []);
    
    const handleAddReview = (productId: string, orderId: string, reviewData: Omit<Review, 'id' | 'isVerified' | 'date'>) => {
        const newReview: Review = {
            ...reviewData,
            id: `review-${Date.now()}`,
            isVerified: true,
            date: new Date().toISOString().split('T')[0],
        };

        setProducts(currentProducts => {
            return currentProducts.map(p => {
                if (p.id === productId) {
                    const newReviews = [...p.reviews, newReview];
                    const newTotalRating = newReviews.reduce((sum, r) => sum + r.rating, 0);
                    const newAverageRating = parseFloat((newTotalRating / newReviews.length).toFixed(1));
                    return { 
                        ...p, 
                        reviews: newReviews,
                        reviewCount: newReviews.length,
                        rating: newAverageRating
                    };
                }
                return p;
            });
        });

        setOrders(currentOrders => {
            return currentOrders.map(o => {
                if (o.id === orderId) {
                    const newItems = o.items.map(item => {
                        if (item.productId === productId) {
                            return { ...item, hasBeenReviewed: true };
                        }
                        return item;
                    });
                    return { ...o, items: newItems };
                }
                return o;
            });
        });
    };

    const handleAddToCart = (product: Product, quantity: number, selectedVariants: Variant[]) => {
        const cartItemId = `${product.id}_${selectedVariants.map(v => v.value).sort().join('_')}`;

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === cartItemId);
            if (existingItem) {
                // TODO: Check against stock
                return prevItems.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                const newItem: CartItem = {
                    id: cartItemId,
                    product,
                    quantity,
                    selectedVariants,
                };
                return [...prevItems, newItem];
            }
        });
        navigate({ name: 'cart' });
    };

    const handleRemoveFromCart = (cartItemId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    };

    const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(cartItemId);
        } else {
            // TODO: Check against stock
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    const renderView = () => {
        if (view.name === 'profile' && !user) {
            return <LoginPage navigate={navigate} />;
        }
        if (view.name === 'login' && user) {
            return <HomePage navigate={navigate} products={products} />;
        }
        
        switch (view.name) {
            case 'product':
                const product = products.find(p => p.id === view.id);
                return product ? <ProductPage product={product} navigate={navigate} onAddToCart={handleAddToCart} /> : <HomePage navigate={navigate} products={products} />;
            case 'category':
                const category = categories.find(c => c.id === view.id);
                return category ? <CategoryPage category={category} navigate={navigate} allProducts={products} /> : <HomePage navigate={navigate} products={products} />;
            case 'profile':
                return <ProfilePage navigate={navigate} orders={orders} products={products} onAddReview={handleAddReview} />;
            case 'login':
                return <LoginPage navigate={navigate} />;
             case 'cart':
                return <CartPage
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveFromCart}
                    onUpdateQuantity={handleUpdateCartQuantity}
                    navigate={navigate}
                    products={products}
                />;
            case 'home':
            default:
                return <HomePage navigate={navigate} products={products} />;
        }
    };
    
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-light-bg dark:bg-dark-bg">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen font-sans text-light-text dark:text-dark-text">
            <Header navigate={navigate} cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
            <main className="flex-grow">
                {renderView()}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;