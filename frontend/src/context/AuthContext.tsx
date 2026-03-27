import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

interface User {
    user_id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'customer' | 'seller' | 'admin';
    shop_name?: string;
    bio?: string;
    category?: string;
    profile_picture_url?: string;
}

interface SellerSignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    shopName: string;
    bio: string;
    category: string;
    passkey: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    signup: (email: string, password: string, firstName: string, lastName: string, address: string) => Promise<{ success: boolean; message?: string }>;
    sellerSignup: (data: SellerSignupData) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isSeller: boolean;
    isAdmin: boolean;
    updateProfilePicture: (url: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        setIsLoading(true);
        const { success, data } = await apiRequest<User>('/auth/me');
        if (success && data) {
            setUser(data);
        } else {
            setUser(null);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
        const { success, data, message } = await apiRequest<User>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        
        if (success && data) {
            setUser(data);
            return { success: true, message };
        }
        return { success: false, message: message || 'Login failed' };
    };

    const signup = async (email: string, password: string, firstName: string, lastName: string, address: string): Promise<{ success: boolean; message?: string }> => {
        const { success, data, message } = await apiRequest<{ user_id: number; role: string }>('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, firstName, lastName, address }),
        });
        
        if (success && data) {
            // User is auto-logged in by backend setting the cookie
            await checkAuth(); 
            return { success: true, message: 'Signup successful' };
        }
        return { success: false, message: message || 'Signup failed' };
    };

    const sellerSignup = async (data: SellerSignupData): Promise<{ success: boolean; message?: string }> => {
        const { success, message } = await apiRequest<{ user_id: number; role: string }>('/auth/seller-signup', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        
        if (success) {
            await checkAuth();
            return { success: true, message: 'Seller registration successful' };
        }
        return { success: false, message: message || 'Seller registration failed' };
    };

    const logout = async () => {
        await apiRequest('/auth/logout', { method: 'POST' });
        setUser(null);
        navigate('/login');
    };

    const updateProfilePicture = async (url: string): Promise<{ success: boolean; message?: string }> => {
        const { success, message } = await apiRequest('/user/profile/picture', {
            method: 'PUT',
            body: JSON.stringify({ profile_picture_url: url }),
        });
        if (success) {
            setUser(prev => prev ? { ...prev, profile_picture_url: url } : prev);
            return { success: true };
        }
        return { success: false, message: message || 'Failed to update picture' };
    };

    const isSeller = user?.role === 'seller' || user?.role === 'admin';
    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ 
            user, 
            isLoading,
            login, 
            signup, 
            sellerSignup, 
            logout, 
            isAuthenticated: !!user, 
            isSeller, 
            isAdmin,
            updateProfilePicture
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
