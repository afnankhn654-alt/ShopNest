import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { View } from '../types';
import { GoogleIcon, GithubIcon, MicrosoftIcon } from '../components/icons';

interface LoginPageProps {
    navigate: (view: View) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only for signup
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const { 
        signInWithGoogle, 
        signInWithGitHub, 
        signInWithMicrosoft,
        loginWithEmail,
        registerWithEmail
    } = useAuth();
    
    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setNotification(null);
        setLoading(true);
        try {
            if (isLoginView) {
                await loginWithEmail(email, password);
                navigate({ name: 'home' });
            } else {
                await registerWithEmail(name, email, password);
                setNotification('Registration successful! Please check your inbox (and spam folder) to verify your email before logging in.');
                setIsLoginView(true); // Switch to login view
                setEmail('');
                setPassword('');
                setName('');
            }
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', '') || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleProviderSignIn = async (provider: () => Promise<void>) => {
        try {
            setError(null);
            setNotification(null);
            await provider();
            navigate({name: 'home'});
        } catch(err: any) {
            console.error(err);
            setError(err.message || "Failed to sign in with provider.");
        }
    }

    return (
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-250px)] animate-fade-in">
            <div className="w-full max-w-md bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold text-center mb-2">{isLoginView ? 'Welcome Back!' : 'Create an Account'}</h1>
                <p className="text-center text-light-text-secondary dark:text-dark-text-secondary mb-8">{isLoginView ? 'Sign in to continue to ShopNest' : 'Get started with your free account'}</p>
                
                <div className="flex justify-center items-center space-x-4 mb-6">
                    <button onClick={() => handleProviderSignIn(signInWithGoogle)} aria-label="Continue with Google" className="p-3 border rounded-full hover:bg-gray-100 dark:hover:bg-secondary transition-colors"><GoogleIcon className="w-6 h-6" /></button>
                    <button onClick={() => handleProviderSignIn(signInWithGitHub)} aria-label="Continue with GitHub" className="p-3 border rounded-full hover:bg-gray-100 dark:hover:bg-secondary transition-colors"><GithubIcon className="w-6 h-6" /></button>
                    <button onClick={() => handleProviderSignIn(signInWithMicrosoft)} aria-label="Continue with Microsoft" className="p-3 border rounded-full hover:bg-gray-100 dark:hover:bg-secondary transition-colors"><MicrosoftIcon className="w-6 h-6" /></button>
                </div>
                
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300 dark:border-gray-600"/>
                    <span className="mx-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">OR</span>
                    <hr className="flex-grow border-gray-300 dark:border-gray-600"/>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-4">
                    {!isLoginView && (
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input 
                                id="name"
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                                required 
                            />
                        </div>
                    )}
                     <div>
                        <label htmlFor="email" className="sr-only">Email Address</label>
                        <input 
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                            required 
                        />
                    </div>
                     <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input 
                            id="password"
                            type="password"
                            placeholder="Password"
                            autoComplete={isLoginView ? 'current-password' : 'new-password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                            required 
                        />
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:bg-primary-light">
                        {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                {notification && <p className="text-green-500 text-sm text-center mt-4">{notification}</p>}

                <p className="text-center text-sm mt-6">
                    {isLoginView ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => { setIsLoginView(!isLoginView); setError(null); setNotification(null); }} className="font-semibold text-primary hover:underline ml-1">
                        {isLoginView ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;