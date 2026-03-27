import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiRequest } from '../utils/api';
import { useAuth } from './AuthContext';

interface WishlistItem {
    product_id: number;
    name: string;
    base_price: number;
    main_image?: string;
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    toggleWishlist: (productId: number) => Promise<void>;
    isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

    const fetchWishlist = useCallback(async () => {
        if (!isAuthenticated) return;
        // No cacheTimeMs — always fetch fresh from server
        const { success, data } = await apiRequest<WishlistItem[]>('/wishlist/');
        if (success && data) {
            setWishlistItems(data);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) fetchWishlist();
        else setWishlistItems([]);
    }, [isAuthenticated, fetchWishlist]);

    const toggleWishlist = async (productId: number) => {
        if (!isAuthenticated) return;

        // Optimistic update — flip the state immediately so the heart responds instantly
        const alreadyIn = wishlistItems.some(i => i.product_id === productId);
        if (alreadyIn) {
            setWishlistItems(prev => prev.filter(i => i.product_id !== productId));
        } else {
            // Add a placeholder so isInWishlist returns true right away
            setWishlistItems(prev => [
                ...prev,
                { product_id: productId, name: '', base_price: 0 }
            ]);
        }

        const { success } = await apiRequest<{ status: string }>('/wishlist/toggle', {
            method: 'POST',
            body: JSON.stringify({ product_id: productId })
        });

        // Sync with real server state regardless of optimistic result
        if (success) {
            await fetchWishlist();
        } else {
            // Revert optimistic change on failure
            await fetchWishlist();
        }
    };

    const isInWishlist = (productId: number) => wishlistItems.some(i => i.product_id === productId);

    return (
        <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

