import React, { useState } from 'react';
import { PlusIcon, EditIcon, TrashIcon } from '../icons';

interface Address {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    isDefault: boolean;
}

const initialAddresses: Address[] = [
    { id: '1', name: 'John Doe', street: '123 Tech Lane', city: 'Silicon Valley', state: 'CA', zip: '94043', isDefault: true },
    { id: '2', name: 'John Doe', street: '456 Code Avenue', city: 'Austin', state: 'TX', zip: '78701', isDefault: false },
];

const AddressForm: React.FC<{
    address: Partial<Address> | null;
    onSave: (address: Omit<Address, 'id'>) => void;
    onCancel: () => void;
}> = ({ address, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: address?.name || '',
        street: address?.street || '',
        city: address?.city || '',
        state: address?.state || '',
        zip: address?.zip || '',
        isDefault: address?.isDefault || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg border-2 border-primary-light mt-6 animate-fade-in">
            <h3 className="text-xl font-bold mb-4">{address?.id ? 'Edit Address' : 'Add New Address'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                <input name="street" value={formData.street} onChange={handleChange} placeholder="Street Address" className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                    <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                    <input name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="isDefault" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <label htmlFor="isDefault">Set as default address</label>
                </div>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 dark:bg-secondary font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">Save Address</button>
                </div>
            </form>
        </div>
    );
};

const AddressManager: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleSetDefault = (id: string) => {
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            setAddresses(prev => prev.filter(addr => addr.id !== id));
        }
    };
    
    const handleSave = (addressData: Omit<Address, 'id' | 'isDefault'> & { isDefault: boolean }) => {
        if (editingAddress) { // Editing
            setAddresses(prev => {
                const updated = prev.map(addr => addr.id === editingAddress.id ? { ...editingAddress, ...addressData } : addr);
                if (addressData.isDefault) {
                    return updated.map(addr => ({...addr, isDefault: addr.id === editingAddress.id }));
                }
                return updated;
            });
        } else { // Adding
            const newAddress: Address = {
                id: Date.now().toString(),
                ...addressData,
            };
            setAddresses(prev => {
                const updated = [...prev, newAddress];
                if (newAddress.isDefault) {
                    return updated.map(addr => ({ ...addr, isDefault: addr.id === newAddress.id }));
                }
                return updated;
            });
        }
        setEditingAddress(null);
        setIsAdding(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Addresses</h2>
                <button 
                    onClick={() => { setIsAdding(true); setEditingAddress(null); }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add New Address</span>
                </button>
            </div>
            
            {(isAdding || editingAddress) && (
                <AddressForm 
                    address={editingAddress} 
                    onSave={handleSave} 
                    onCancel={() => { setIsAdding(false); setEditingAddress(null); }}
                />
            )}

            <div className="mt-6 space-y-4">
                {addresses.length > 0 ? (
                    addresses.map(address => (
                        <div key={address.id} className={`p-4 rounded-lg border ${address.isDefault ? 'border-primary' : 'border-gray-200 dark:border-gray-700'} bg-light-card dark:bg-dark-card group`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    {address.isDefault && <span className="text-xs font-bold bg-primary-light text-primary-dark px-2 py-1 rounded-full mb-2 inline-block">Default</span>}
                                    <p className="font-semibold">{address.name}</p>
                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{address.street}, {address.city}, {address.state} {address.zip}</p>
                                </div>
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                     <button onClick={() => { setEditingAddress(address); setIsAdding(false); window.scrollTo(0, 0); }} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary rounded-full"><EditIcon className="w-5 h-5"/></button>
                                     <button onClick={() => handleDelete(address.id)} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary rounded-full text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                </div>
                            </div>
                            {!address.isDefault && (
                                <button onClick={() => handleSetDefault(address.id)} className="text-sm text-primary font-semibold mt-2 hover:underline">
                                    Set as Default
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    !isAdding && <p className="text-center text-light-text-secondary dark:text-dark-text-secondary py-8">You haven't added any addresses yet.</p>
                )}
            </div>
        </div>
    );
};

export default AddressManager;
