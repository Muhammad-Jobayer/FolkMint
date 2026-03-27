import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/api';

export const CartPage: React.FC = () => {
    const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (items.length === 0) {
        return (
            <Layout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-dark-950">
                    <div className="w-32 h-32 bg-gold-500/10 rounded-full flex items-center justify-center mb-8 border border-gold-500/20 shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                        <span className="text-6xl grayscale hover:grayscale-0 transition-all duration-500 cursor-default animate-bounce">🛒</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight">Your Collection is <span className="text-gold-500">Empty</span></h2>
                    <p className="text-slate-400 mb-10 max-w-md text-lg italic leading-relaxed">
                        The heritage archives await your discovery. Start exploring our authentic Bangladeshi crafts today.
                    </p>
                    <Link to="/shop" className="glass-button px-10">
                        Explore Collection
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-dark-950">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">Shopping <span className="text-gradient">Cart</span></h1>
                        <p className="text-slate-500 mt-4 font-medium uppercase tracking-[0.2em] text-xs">Review your selection of heritage crafts</p>
                    </div>
                    <Link to="/shop" className="text-gold-500 hover:text-gold-400 text-sm font-bold flex items-center gap-2 transition-all group">
                        <span className="border-b border-gold-500/30 group-hover:border-gold-500 transition-all pb-1">Continue Discovering</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-8">
                        {items.map((item) => (
                            <div key={item.cart_item_id} className="flex flex-col sm:flex-row gap-8 p-8 bg-dark-900/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all duration-500 group shadow-xl">
                                <div className="w-full sm:w-40 h-40 bg-dark-950/80 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 relative group-hover:scale-[1.02] transition-transform duration-500">
                                    <img
                                        src={getImageUrl(item.image || '/images/products/1_lRUm2IW.webp')}
                                        alt={item.productName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/products/1_lRUm2IW.webp'; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 to-transparent pointer-events-none"></div>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-gold-500 transition-colors">{item.productName}</h3>
                                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                                                {item.size && <span className="bg-white/5 px-2 py-1 rounded">Size: {item.size}</span>}
                                                {item.color && <span className="bg-white/5 px-2 py-1 rounded">Color: {item.color}</span>}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.variant_id ?? 0)}
                                            className="text-slate-600 hover:text-red-500 transition-all p-3 hover:bg-red-500/10 rounded-full"
                                            title="Remove item"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-end mt-auto gap-6 pt-6 border-t border-white/5">
                                        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-inner">
                                            <button
                                                onClick={() => updateQuantity(item.variant_id ?? 0, (item.quantity || 1) - 1)}
                                                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 transition-all transition-colors"
                                            >-</button>
                                            <span className="w-10 text-center font-bold text-white text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.variant_id ?? 0, (item.quantity || 1) + 1)}
                                                className="px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 transition-all transition-colors"
                                            >+</button>
                                        </div>

                                        <div className="text-2xl font-bold text-white tracking-tight">
                                            ৳{((item.price) * (item.quantity || 1)).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="w-full lg:w-96">
                        <div className="bg-dark-900 border border-white/10 p-10 rounded-[2.5rem] sticky top-28 shadow-2xl overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/5 blur-[50px] rounded-full group-hover:bg-teal-500/10 transition-all"></div>
                            
                            <h3 className="text-2xl font-serif font-bold text-white mb-10 pb-6 border-b border-white/5">Order <span className="text-gold-500">Summary</span></h3>

                            <div className="space-y-6 text-slate-400 mb-10 pb-8 border-b border-white/5 font-medium">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-widest opacity-60">Subtotal</span>
                                    <span className="text-white font-bold">৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-widest opacity-60">Shipping</span>
                                    <span className="text-teal-400 font-bold uppercase tracking-widest">Heritage Free</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="uppercase tracking-widest opacity-60">Tax (5%)</span>
                                    <span className="text-white font-bold">৳{(cartTotal * 0.05).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-12">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 pb-1">Total Amount</span>
                                <span className="text-4xl font-bold text-white tracking-tighter">
                                    ৳{(cartTotal * 1.05).toLocaleString()}
                                </span>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full h-auto py-5 relative rounded-2xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-gold-500/10 group active:scale-95"
                            >
                                Proceed to Checkout
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="mt-8 text-center flex flex-col items-center gap-2">
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Secure Checkout Powered by SSL</p>
                                <div className="flex gap-2 opacity-20 hover:opacity-100 transition-opacity">
                                    <div className="w-8 h-4 bg-white rounded-sm"></div>
                                    <div className="w-8 h-4 bg-white rounded-sm"></div>
                                    <div className="w-8 h-4 bg-white rounded-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
