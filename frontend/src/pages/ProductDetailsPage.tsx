import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { products as staticProducts, reviews as mockReviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { apiRequest, getImageUrl } from '../utils/api';
import { useHistory } from '../context/HistoryContext';
import { Star, ShoppingBag, Truck, ShieldCheck, Heart, Package, Loader2 } from 'lucide-react';
import type { ProductVariant, Review, User } from '../types/schema';
import { ReviewList } from '../components/ui/ReviewList';

export const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const { addToHistory } = useHistory();

    const [product, setProduct] = useState<any>(null);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [productReviews, setProductReviews] = useState<(Review & { user?: User })[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            
            // Fetch product
            const { success: prodSuccess, data: prodData, error: prodError } = await apiRequest<any[]>(`/products?product_id=${id}`);
            if (!prodSuccess || !prodData || prodData.length === 0) {
                const fallback = staticProducts.find(p => p.product_id === Number(id));
                if (fallback) {
                    setProduct(fallback);
                    addToHistory({
                        id: fallback.product_id,
                        name: fallback.name || 'Heritage Piece',
                        price: Number(fallback.base_price),
                        image: fallback.variants?.[0]?.images?.[0]?.image_url || ''
                    });
                } else {
                    setError(prodError || 'Product not found');
                }
            } else {
                const foundProduct = prodData[0];
                // Format decimals
                foundProduct.base_price = Number(foundProduct.base_price);
                if (foundProduct.variants) {
                    foundProduct.variants = foundProduct.variants.map((v: any) => ({
                        ...v,
                        price: Number(v.price)
                    }));
                }
                setProduct(foundProduct);
                
                const mainImg = foundProduct.main_image || (foundProduct.variants?.[0]?.images?.[0]?.image_url) || '';
                addToHistory({
                    id: foundProduct.product_id,
                    name: foundProduct.name,
                    price: Number(foundProduct.base_price),
                    image: mainImg
                });

                if (foundProduct.variants && foundProduct.variants.length > 0) {
                    setSelectedVariant(foundProduct.variants[0]);
                    const initialImg = foundProduct.main_image || (foundProduct.variants[0].images?.[0]?.image_url) || '';
                    setActiveImage(initialImg);
                }
            }

            // Fetch reviews
            const { success: revSuccess, data: reviewsData } = await apiRequest<any[]>(`/products/${id}/reviews`);
            if (revSuccess && reviewsData) {
                setProductReviews(reviewsData);
            } else {
                setProductReviews(mockReviews.filter(r => r.product_id === Number(id)));
            }

            setIsLoading(false);
        };

        fetchData();
    }, [id, showToast]);

    useEffect(() => {
        if (selectedVariant && selectedVariant.images && selectedVariant.images.length > 0 && selectedVariant.images[0].image_url) {
            setActiveImage(selectedVariant.images[0].image_url);
        }
    }, [selectedVariant]);

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center bg-dark-950">
                    <Loader2 className="animate-spin text-gold-500 mb-6" size={64} />
                    <p className="text-slate-300 font-serif italic text-xl animate-pulse">Unveiling heritage details...</p>
                </div>
            </Layout>
        );
    }

    if (error || !product) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center bg-dark-950">
                    <div className="bg-red-500/10 p-12 rounded-3xl border border-red-500/20 text-center max-w-md">
                        <h2 className="text-3xl font-serif font-bold text-white mb-6 underline decoration-red-500/30 underline-offset-8">{error || 'Product Not Found'}</h2>
                        <button onClick={() => navigate('/shop')} className="glass-button w-full">
                            Back to Collection
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    const currentPrice = selectedVariant?.price || product.base_price;
    const isOutOfStock = selectedVariant?.stock_quantity === 0;

    return (
        <Layout>
            <div className="bg-dark-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/[0.02] blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/[0.02] blur-[150px] rounded-full pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        {/* Image Gallery */}
                        <div className="space-y-8 animate-fade-in">
                            <div className="aspect-square bg-dark-900 rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl group relative overflow-hidden">
                                <img
                                    src={getImageUrl(activeImage) || '/images/1_lRUm2IW.webp'}
                                    alt={product.name || 'Product Image'}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent pointer-events-none"></div>
                                <div className="absolute top-8 right-8 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <button className="w-12 h-12 rounded-2xl bg-dark-950/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-slate-300 hover:text-gold-500 transition-all active:scale-90">
                                        <Heart size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-6 px-4">
                                {product.variants?.flatMap((v: any) => v.images || []).slice(0, 4).map((img: any, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img.image_url || '')}
                                        className={`aspect-square rounded-[1.5rem] overflow-hidden border-2 transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center justify-center p-1 bg-white/5 ${activeImage === img.image_url ? 'border-gold-500 shadow-[0_10px_30px_rgba(251,191,36,0.2)]' : 'border-transparent grayscale-[80%] hover:grayscale-0 hover:border-white/10'}`}
                                    >
                                        <img src={getImageUrl(img.image_url) || ''} alt="" className="w-full h-full object-cover rounded-[1rem]" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col space-y-10 animate-slide-up">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-gold-500/60 text-[10px] font-bold uppercase tracking-[0.6em] italic mb-2">
                                    <div className="w-12 h-[1px] bg-gold-500/20"></div>
                                    <span>{product.category?.name || 'Handicraft Archive'}</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-[0.9] italic">
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-10">
                                    <div className="flex text-gold-500 text-sm gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`fill-current w-4 h-4 shadow-sm ${i >= Math.floor(product.average_rating || 5) ? 'opacity-20' : ''}`} />
                                        ))}
                                    </div>
                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] italic border-l border-white/10 pl-10 h-4 flex items-center">{productReviews.length} Testimonials</span>
                                </div>
                            </div>

                            <div className="text-6xl font-bold bg-gradient-to-r from-white via-white to-gold-500/30 bg-clip-text text-transparent italic tracking-tighter">
                                ৳{typeof currentPrice === 'number' ? currentPrice.toLocaleString() : currentPrice}
                            </div>

                            <p className="text-slate-300 leading-relaxed text-xl font-serif italic opacity-95 border-l-2 border-gold-500/20 pl-10 max-w-2xl">
                                {product.description}
                            </p>

                            <div className="w-24 h-[1px] bg-white/5"></div>

                            {product.variants && product.variants.length > 0 && (
                                <div className="space-y-8">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] italic pl-2">Select Specification:</label>
                                    <div className="flex flex-wrap gap-4">
                                        {product.variants.map((variant: any) => (
                                            <button
                                                key={variant.variant_id}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-8 py-4 border rounded-2xl text-[10px] uppercase font-bold tracking-widest transition-all duration-500 ${selectedVariant?.variant_id === variant.variant_id
                                                    ? 'border-gold-500 bg-gold-500/10 text-gold-500 shadow-[0_10px_30px_rgba(251,191,36,0.15)] scale-105'
                                                    : 'border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/10 hover:text-white'
                                                    }`}
                                            >
                                                {variant.size} <span className="mx-2 opacity-20">|</span> {variant.color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-8 pt-6">
                                <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden group shadow-inner">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-8 py-5 text-slate-400 hover:text-white hover:bg-white/5 transition-all outline-none"
                                    >-</button>
                                    <span className="w-20 text-center font-bold text-white border-x border-white/5 text-lg font-serif italic">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-8 py-5 text-slate-400 hover:text-white hover:bg-white/5 transition-all outline-none"
                                    >+</button>
                                </div>

                                <button
                                    onClick={() => {
                                        if (product && selectedVariant) {
                                            addToCart(selectedVariant, product, quantity, activeImage);
                                        }
                                    }}
                                    disabled={isOutOfStock}
                                    className={`flex-1 py-5 px-10 rounded-3xl font-bold flex items-center justify-center gap-4 transition-all duration-700 ${isOutOfStock
                                        ? 'bg-dark-900 text-slate-700 cursor-not-allowed border border-white/5 italic'
                                        : 'gold-button shadow-[0_20px_60px_rgba(251,191,36,0.2)]'
                                        }`}
                                >
                                    <ShoppingBag size={22} />
                                    <span className="uppercase tracking-[0.3em] text-[11px] font-black">{isOutOfStock ? 'Archives Empty' : 'Acquire for Archive'}</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
                                <div className="flex items-center gap-6 bg-dark-900/40 p-8 rounded-[2.5rem] border border-white/5 group relative overflow-hidden transition-all hover:border-gold-500/20 shadow-2xl">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/[0.01] blur-2xl rounded-full"></div>
                                    <Truck className="text-gold-500 transition-transform duration-700 group-hover:scale-110" size={28} />
                                    <div className="space-y-2">
                                        <p className="font-bold text-white uppercase tracking-[0.2em] text-[10px] italic">Celestial Conduit</p>
                                        <p className="text-slate-400 text-xs italic opacity-95">Complimentary safe passage for orders over ৳10,000.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 bg-dark-900/40 p-8 rounded-[2.5rem] border border-white/5 group relative overflow-hidden transition-all hover:border-teal-500/20 shadow-2xl">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/[0.01] blur-2xl rounded-full"></div>
                                    <ShieldCheck className="text-teal-400 transition-transform duration-700 group-hover:scale-110" size={28} />
                                    <div className="space-y-2">
                                        <p className="font-bold text-white uppercase tracking-[0.2em] text-[10px] italic">Lineage Verified</p>
                                        <p className="text-slate-400 text-xs italic opacity-95">Eternal provenance guarantee on every masterwork.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-60 border-t border-white/5 pt-32 relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/[0.02] blur-[150px] rounded-full -translate-y-1/2"></div>
                        <div className="text-center mb-32 space-y-6">
                            <span className="text-gold-500/40 text-[10px] font-bold uppercase tracking-[0.8em] italic block">The Registry of Voices</span>
                            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white italic tracking-tighter leading-none">Customer <span className="text-gradient">Chronicle</span></h2>
                            <div className="w-24 h-1 bg-gold-500/20 mx-auto rounded-full"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-24">
                            <div className="xl:col-span-8 space-y-16">
                                <ReviewList reviews={productReviews} />
                            </div>
                            <div className="xl:col-span-4">
                                <div className="bg-dark-900/60 backdrop-blur-3xl border border-white/5 p-12 rounded-[3.5rem] sticky top-32 shadow-2xl overflow-hidden group">
                                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold-500/[0.02] blur-[80px] rounded-full group-hover:bg-gold-500/[0.05] transition-all duration-1000"></div>
                                    <div className="mb-10 relative">
                                        <div className="w-20 h-20 bg-gold-500/5 rounded-[2rem] flex items-center justify-center border border-gold-500/20 group-hover:scale-110 transition-transform duration-700">
                                            <Package className="text-gold-500" size={32} />
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-white mb-6 italic tracking-tight">Add Your Pulse?</h3>
                                    <p className="text-slate-400 mb-12 leading-relaxed border-l-2 border-gold-500/10 pl-8 italic text-lg opacity-95">
                                        Your veneration helps us safeguard these traditions. Share your experience with this lineage.
                                    </p>
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="glass-button w-full shadow-2xl hover:bg-gold-500 hover:text-dark-950 hover:border-gold-500 transition-all duration-700 py-5 text-[10px] uppercase font-black tracking-widest"
                                    >
                                        Imprint Review in Registry
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
