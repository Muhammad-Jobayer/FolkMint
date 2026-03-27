import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CartItem, ProductVariant, Product } from '../types/schema';
import { apiRequest } from '../utils/api';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

// Extended CartItem to include product details for display
export interface CartItemWithDetails extends CartItem {
    productName: string;
    price: number;
    image?: string;
    size?: string;
    color?: string;
    product_id: number;
}

interface CartContextType {
    items: CartItemWithDetails[];
    loading: boolean;
    addToCart: (variant: ProductVariant, product: Product, quantity: number, image?: string) => Promise<void>;
    removeFromCart: (variantId: number) => Promise<void>;
    updateQuantity: (variantId: number, quantity: number) => Promise<void>;
    cartTotal: number;
    itemCount: number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItemWithDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { showToast } = useToast();
    const { user, isAuthenticated } = useAuth();

    const fetchCart = useCallback(async () => {
        if (!isAuthenticated) {
            setItems([]);
            return;
        }
        
        setLoading(true);
        const { success, data, error } = await apiRequest<{ items: any[] }>('/cart');
        setLoading(false);
        
        if (success && data?.items) {
            setItems(prev => {
                // Build a map of currently-known images (from optimistic updates)
                const localImageMap = new Map(prev.map(i => [i.variant_id, i.image]));
                return data.items.map((item: any) => ({
                    cart_item_id: item.cart_item_id,
                    cart_id: item.cart_id,
                    variant_id: item.variant_id,
                    quantity: item.quantity,
                    productName: item.name,
                    price: Number(item.price),
                    // Prefer the server image if available, otherwise keep the locally cached image
                    image: item.image || localImageMap.get(item.variant_id) || '',
                    size: item.size || '',
                    color: item.color || '',
                    product_id: item.product_id
                }));
            });
        } else if (error) {
            console.error('Failed to fetch cart:', error);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setItems([]);
        }
    }, [isAuthenticated, fetchCart]);

    // Calculate totals
    const cartTotal = items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const itemCount = items.reduce((count, item) => count + (item.quantity || 1), 0);

    const addToCart = async (variant: ProductVariant, product: Product, quantity: number, image?: string) => {
        const newItem: CartItemWithDetails = {
            cart_item_id: Date.now(),
            cart_id: 0,
            variant_id: variant.variant_id,
            quantity: quantity,
            productName: product.name || 'Product',
            price: Number(variant.price || product.base_price || 0),
            image: image,
            size: variant.size || '',
            color: variant.color || '',
            product_id: product.product_id
        };

        // Optimistic UI update
        setItems(prev => {
            const existingItem = prev.find(item => item.variant_id === variant.variant_id);
            if (existingItem) {
                return prev.map(item =>
                    item.variant_id === variant.variant_id
                        ? { ...item, quantity: (item.quantity || 0) + quantity }
                        : item
                );
            }
            return [...prev, newItem];
        });

        showToast(`${product.name} added to cart!`, 'success');

        if (isAuthenticated) {
            const { success, error } = await apiRequest('/cart/add', {
                method: 'POST',
                body: JSON.stringify({ variant_id: variant.variant_id, quantity })
            });
            if (!success) {
                showToast(`Sync error: ${error}`, 'error');
                fetchCart();
            } else {
                fetchCart();
            }
        }
    };

    const removeFromCart = async (variantId: number) => {
        const itemToRemove = items.find(i => i.variant_id === variantId);
        if (!itemToRemove) return;

        setItems(prev => prev.filter(item => item.variant_id !== variantId));
        showToast('Item removed from cart', 'info');

        if (isAuthenticated && itemToRemove.cart_item_id) {
            const { success, error } = await apiRequest(`/cart/item/${itemToRemove.cart_item_id}`, { method: 'DELETE' });
            if (!success) {
                showToast('Failed to sync removal', 'error');
                fetchCart();
            }
        }
    };

    const updateQuantity = async (variantId: number, quantity: number) => {
        if (quantity < 1) return;
        
        setItems(prev => prev.map(item =>
            item.variant_id === variantId ? { ...item, quantity } : item
        ));

        if (isAuthenticated) {
            const itemToUpdate = items.find(i => i.variant_id === variantId);
            if (itemToUpdate?.cart_item_id) {
                const { success, error } = await apiRequest(`/cart/item/${itemToUpdate.cart_item_id}?quantity=${quantity}`, { method: 'PUT' });
                if (!success) {
                    showToast('Failed to update quantity', 'error');
                    fetchCart();
                }
            }
        }
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{ items, loading, addToCart, removeFromCart, updateQuantity, cartTotal, itemCount, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
