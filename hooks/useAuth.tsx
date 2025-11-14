import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import {
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<User>;
  registerWithEmail: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Only set the user if they are verified
      if (currentUser?.emailVerified) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const actionCodeSettings = {
    url: `${window.location.origin}`, // Redirect to the app's home page after verification
    handleCodeInApp: true,
  };

  const signInWithProvider = async (provider: GoogleAuthProvider | GithubAuthProvider | OAuthProvider) => {
      try {
          await signInWithPopup(auth, provider);
      } catch (error: any) {
          console.error("Auth provider sign in error", error);
          if (error.code === 'auth/account-exists-with-different-credential') {
            alert('An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.');
          }
      }
  };

  const signInWithGoogle = () => signInWithProvider(new GoogleAuthProvider());
  const signInWithGitHub = () => signInWithProvider(new GithubAuthProvider());
  const signInWithMicrosoft = () => signInWithProvider(new OAuthProvider('microsoft.com'));
  
  const loginWithEmail = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      // Send verification email again
      await sendEmailVerification(userCredential.user, actionCodeSettings);
      // Sign out the user
      await signOut(auth);
      // Throw an error to be caught by the UI
      throw new Error('Please verify your email address. A new verification link has been sent to your inbox.');
    }
    return userCredential.user;
  };

  const registerWithEmail = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if(userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        // Send verification email
        await sendEmailVerification(userCredential.user, actionCodeSettings);
    }
    // Sign out the user so they are forced to verify before logging in
    await signOut(auth);
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };
  
  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGitHub,
    signInWithMicrosoft,
    loginWithEmail,
    registerWithEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};