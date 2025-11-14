import React, { useState } from 'react';
import type { View, Order, Product, Review } from '../types';
import { useAuth } from '../hooks/useAuth';
import { UserIcon } from '../components/icons';
import AddressManager from '../components/profile/AddressManager';
import OrderHistory from '../components/profile/OrderHistory';

interface ProfilePageProps {
  navigate: (view: View) => void;
  orders: Order[];
  products: Product[];
  onAddReview: (productId: string, orderId: string, review: Omit<Review, 'id' | 'date' | 'isVerified'>) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigate, orders, products, onAddReview }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    navigate({ name: 'home' });
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <div><h2 className="text-2xl font-bold">My Profile</h2><p>Manage your personal information.</p></div>;
      case 'orders':
        return <OrderHistory orders={orders} products={products} onAddReview={onAddReview} />;
      case 'addresses':
        return <AddressManager />;
      case 'wishlist':
        return <div><h2 className="text-2xl font-bold">Wishlist</h2><p>Your saved items for later.</p></div>;
      case 'recommendations':
        return <div><h2 className="text-2xl font-bold">AI Recommendations</h2><p>Products picked just for you.</p></div>;
      default:
        return <div><h2 className="text-2xl font-bold">My Profile</h2></div>;
    }
  }

  const TabButton: React.FC<{ tabId: string, label: string }> = ({ tabId, label }) => (
    <button
        onClick={() => setActiveTab(tabId)}
        className={`w-full text-left p-3 rounded-md transition-colors ${
        activeTab === tabId ? 'bg-primary text-white font-semibold' : 'hover:bg-gray-100 dark:hover:bg-secondary'
        }`}
    >
        {label}
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="bg-light-card dark:bg-dark-card p-4 rounded-lg shadow-sm space-y-2">
              <div className="flex items-center space-x-3 p-3 border-b mb-2">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full" />
                  ) : (
                    <UserIcon className="w-10 h-10 p-2 bg-gray-200 dark:bg-secondary rounded-full" />
                  )}
                  <div>
                      <p className="font-semibold">{user?.displayName || 'ShopNest User'}</p>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{user?.email}</p>
                  </div>
              </div>
            <TabButton tabId="profile" label="Profile Information" />
            <TabButton tabId="orders" label="Order History" />
            <TabButton tabId="addresses" label="Manage Addresses" />
            <TabButton tabId="wishlist" label="My Wishlist" />
            <TabButton tabId="recommendations" label="AI Recommendations" />
            <button
                onClick={handleLogout}
                className="w-full text-left p-3 rounded-md transition-colors text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-500/10"
            >
                Logout
            </button>
          </div>
        </aside>
        
        {/* Content */}
        <main className="w-full md:w-3/4">
          <div className="bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-sm min-h-[400px]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;