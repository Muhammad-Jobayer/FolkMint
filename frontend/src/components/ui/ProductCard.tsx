import React from 'react';
import { Link } from 'react-router-dom';
import type { Product, ProductVariant, ProductImage } from '../../types/schema';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { getImageUrl } from '../../utils/api';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
    product: Product & { variants?: (ProductVariant & { images?: ProductImage[] })[] };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    // Logic to determine main image and price
    const firstVariant = product.variants?.[0];
    const culturalFallback = "/images/1_lRUm2IW.webp"; // Beautiful local loom/textile texture
    const mainImage = (product as any).main_image || firstVariant?.images?.[0]?.image_url || culturalFallback;
    const price = firstVariant?.price || (product as any).price || product.base_price;
    
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { isAuthenticated } = useAuth();
    
    const isWished = isInWishlist(product.product_id);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAuthenticated) {
            toggleWishlist(product.product_id);
        }
    };

    return (
        <div className="premium-card group relative">
            {/* Wishlist Heart Icon - Modernized for Dark Mode */}
            {isAuthenticated && (
                <button 
                    onClick={handleWishlist}
                    type="button"
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-xl transition-all duration-500 z-20 border ${
                        isWished 
                        ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20' 
                        : 'bg-white/10 border-white/20 text-slate-200 hover:border-gold-500/40 hover:text-gold-400'
                    }`}
                >
                    <Heart size={16} className={isWished ? 'fill-current' : ''} />
                </button>
            )}

            <Link to={`/product/${product.product_id}`} className="block relative aspect-[4/5] overflow-hidden bg-dark-950/20">
                <img
                    src={getImageUrl(mainImage)}
                    alt={product.name || 'Product'}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6 bg-gradient-to-t from-dark-950/80 to-transparent">
                    <span className="bg-gold-500 text-dark-950 px-6 py-2.5 rounded-xl text-sm font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 cursor-pointer active:scale-95">
                        <ShoppingCart size={16} /> View Details
                    </span>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500/80 font-bold">{product.category?.name || 'Handmade'}</p>
                    {product.averageRating !== undefined && product.totalReviews !== undefined && product.totalReviews > 0 && (
                        <div className="flex items-center gap-1 text-gold-400">
                            <Star size={12} className="fill-current" />
                            <span className="text-xs font-bold text-white">{product.averageRating}</span>
                            <span className="text-[10px] text-slate-400 font-medium">({product.totalReviews})</span>
                        </div>
                    )}
                </div>
                <Link to={`/product/${product.product_id}`} className="block">
                    <h3 className="text-lg font-serif font-bold text-white mb-2 truncate group-hover:text-gold-400 transition-colors duration-300">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white tracking-tight">৳{typeof price === 'number' ? price.toLocaleString() : price}</span>
                    <div className="flex gap-1.5">
                        {/* Color swatches preview if multiple variants exist */}
                        {product.variants?.slice(0, 3).map((v, idx) => (
                            v.color && (
                                <span
                                    key={idx}
                                    className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-lg"
                                    title={v.color}
                                    style={{ backgroundColor: v.color.toLowerCase().split('/')[0] }} // simple color parser
                                />
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
