import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { apiRequest, formatDate, formatCurrency, getImageUrl } from '../utils/api';
import { Link } from 'react-router-dom';
import {
    Plus, Trash2, Edit3, Upload, X, Loader2, Package, AlertCircle,
    ImageIcon, ShoppingBag, ClipboardList, TrendingUp, ChevronDown
} from 'lucide-react';

const CATEGORIES = [
    { id: 4, name: 'Textiles & Fabrics' },
    { id: 5, name: 'Art' },
    { id: 6, name: 'Bamboo Craft' },
    { id: 7, name: 'Folk Jewelry' },
    { id: 8, name: 'Folk Musical Stuff' },
    { id: 9, name: 'Folk Textile' },
    { id: 10, name: 'Handicraft' },
    { id: 11, name: 'Home Decor' },
    { id: 12, name: 'Pottery And Clay' },
    { id: 13, name: 'Stone Craft' },
    { id: 14, name: 'Wooden Craft' },
];

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

interface ProductForm {
    name: string;
    description: string;
    base_price: string;
    category_id: number;
    imageFile: File | null;
    imagePreview: string;
}

const EMPTY_FORM: ProductForm = {
    name: '', description: '', base_price: '', category_id: 4,
    imageFile: null, imagePreview: '',
};

export const SellerDashboardPage: React.FC = () => {
    const { user, isSeller } = useAuth();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
    const [products, setProducts] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadProducts = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        const { success, data, error } = await apiRequest<any[]>('/seller/products');
        if (success && data) setProducts(data);
        if (error) showToast(error, 'error');
        setIsLoading(false);
    }, [user, showToast]);

    const loadOrders = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        const { success, data, error } = await apiRequest<any[]>('/seller/orders');
        if (success && data) setOrders(data);
        if (error) showToast(error, 'error');
        setIsLoading(false);
    }, [user, showToast]);

    useEffect(() => {
        if (activeTab === 'products') loadProducts();
        else loadOrders();
    }, [activeTab, loadProducts, loadOrders]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setForm(prev => ({
            ...prev,
            imageFile: file,
            imagePreview: URL.createObjectURL(file),
        }));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (!file) return;
        setForm(prev => ({
            ...prev,
            imageFile: file,
            imagePreview: URL.createObjectURL(file),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmitting(true);

        let imageUrl = form.imagePreview;

        if (form.imageFile) {
            const formData = new FormData();
            formData.append('file', form.imageFile);
            const { success, data, error } = await apiRequest<{ url: string }>('/upload/image', { 
                method: 'POST', 
                body: formData 
            });
            if (success && data?.url) {
                imageUrl = data.url;
            } else {
                showToast(error || 'Image upload failed', 'error');
                setIsSubmitting(false);
                return;
            }
        }

        const payload = {
            name: form.name,
            description: form.description,
            base_price: parseFloat(form.base_price),
            category_id: Number(form.category_id),
        };

        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/seller/products/${editingId}` : `/seller/products?image_url=${encodeURIComponent(imageUrl)}`;
        
        const { success, error } = await apiRequest<any>(url, {
            method,
            body: JSON.stringify(payload),
        });

        if (success) {
            showToast(editingId ? 'Product updated!' : 'Product added!', 'success');
            loadProducts();
            setShowForm(false);
            setForm(EMPTY_FORM);
        } else {
            showToast(error || 'Failed to save product', 'error');
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (productId: number) => {
        const { success, error } = await apiRequest(`/seller/products/${productId}`, { method: 'DELETE' });
        if (success) {
            setProducts(prev => prev.filter(p => p.product_id !== productId));
            setDeleteConfirm(null);
            showToast('Product deleted', 'info');
        } else {
            showToast(error || 'Failed to delete product', 'error');
        }
    };

    const updateOrderStatus = async (itemId: number, newStatus: string) => {
        const { success, error } = await apiRequest(`/order-item/${itemId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status: newStatus })
        });
        if (success) {
            showToast('Status updated successfully', 'success');
            loadOrders();
        } else {
            showToast(error || 'Failed to update status', 'error');
        }
    };

    if (!isSeller) {
        return (
            <Layout>
                <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-dark-950 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full"></div>
                    <div className="w-32 h-32 bg-gold-500/10 border border-gold-500/20 rounded-full flex items-center justify-center mb-10 shadow-2xl scale-110">
                        <AlertCircle className="text-gold-500 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" size={60} />
                    </div>
                    <h2 className="text-5xl font-serif font-bold text-white mb-6 tracking-tight italic">Artisan <span className="text-gold-500">Sanctuary</span></h2>
                    <p className="text-slate-500 max-w-sm text-lg italic leading-relaxed border-l-2 border-gold-500/20 pl-6 mb-12">
                        This exclusive chamber is reserved for the master craftsmen of FolkMint.
                    </p>
                    <Link to="/seller/signup" className="gold-button px-16 py-5 text-sm uppercase tracking-widest font-bold">Inaugurate Your Shop</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-dark-950 min-h-screen">
                {/* Header with Tabs */}
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 mb-20 border-b border-white/5 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Proprietor Command</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight italic">{user?.shop_name || 'Artisan Forge'}</h1>
                        <p className="text-slate-400 font-serif italic text-xl opacity-70">{user?.bio || 'Curating your legacy of craft.'}</p>
                    </div>
                    
                    <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5 shadow-inner backdrop-blur-xl">
                        <button 
                            onClick={() => setActiveTab('products')}
                            className={`flex items-center gap-3 px-10 py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'products' ? 'bg-gold-500 text-dark-950 shadow-[0_10px_30px_rgba(251,191,36,0.2)]' : 'text-slate-500 hover:text-white'}`}
                        >
                            <ShoppingBag size={18} /> Artifacts
                        </button>
                        <button 
                            onClick={() => setActiveTab('orders')}
                            className={`flex items-center gap-3 px-10 py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'orders' ? 'bg-gold-500 text-dark-950 shadow-[0_10px_30px_rgba(251,191,36,0.2)]' : 'text-slate-500 hover:text-white'}`}
                        >
                            <ClipboardList size={18} /> Chronicles
                        </button>
                    </div>
                </div>

                {activeTab === 'products' ? (
                    <div className="animate-fade-in space-y-16">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                            {[
                                { label: 'Collection Size', value: products.length, icon: Package, color: 'text-gold-500 bg-gold-500/10 border-gold-500/20' },
                                { label: 'Total Valuation', value: formatCurrency(products.reduce((sum, p) => sum + Number(p.base_price || 0), 0)), icon: TrendingUp, color: 'text-teal-400 bg-teal-400/10 border-teal-400/20' },
                                { label: 'Legacy Impact', value: products.reduce((sum, p) => sum + Number(p.sold_count || 0), 0) + ' Units', icon: ShoppingBag, color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-dark-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl group relative overflow-hidden flex flex-col items-center text-center hover:border-white/10 transition-all">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 border ${stat.color} shadow-lg transition-transform group-hover:scale-110`}>
                                        <stat.icon size={28} />
                                    </div>
                                    <p className="text-3xl font-bold text-white tracking-tight italic mb-2">{stat.value}</p>
                                    <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-end border-b border-white/5 pb-10">
                            <h2 className="text-3xl font-serif font-bold text-white flex items-center gap-4 italic tracking-tight">Active <span className="text-gold-500">Inventory</span></h2>
                            <button onClick={() => { setEditingId(null); setForm(EMPTY_FORM); setShowForm(true); }}
                                className="gold-button px-10 py-4 text-[10px]">
                                <Plus size={18} /> Unveil New Artifact
                            </button>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-8">
                                <div className="relative">
                                    <div className="w-24 h-24 border-2 border-gold-500/10 rounded-full"></div>
                                    <div className="absolute inset-0 w-24 h-24 border-t-2 border-gold-500 rounded-full animate-spin"></div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em] animate-pulse">Consulting the Scribes...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-40 bg-dark-900/40 rounded-[3rem] border border-dashed border-white/5 group">
                                <Package className="text-slate-800 mx-auto mb-8 group-hover:text-gold-500/20 transition-colors" size={80} />
                                <h3 className="text-3xl font-serif font-bold text-slate-600 mb-4 tracking-tight italic">Void Detected</h3>
                                <p className="text-slate-700 italic text-lg mb-10 max-w-xs mx-auto">Your sanctuary awaits its first treasure...</p>
                                <button onClick={() => setShowForm(true)} className="glass-button px-12 text-[10px]">Begin the Forging</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                                {products.map((product: any) => (
                                    <div key={product.product_id} className="bg-dark-900 border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden group/item flex flex-col hover:border-white/10 transition-all">
                                        <div className="relative h-64 overflow-hidden">
                                            {product.main_image ? (
                                                <img src={getImageUrl(product.main_image)} alt={product.name}
                                                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-1000" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-white/5">
                                                    <ImageIcon className="text-slate-800" size={60} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm opacity-0 group-hover/item:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                                                <button onClick={() => {
                                                    setEditingId(product.product_id);
                                                    setForm({
                                                        name: product.name,
                                                        description: product.description,
                                                        base_price: String(product.base_price),
                                                        category_id: product.category_id,
                                                        imageFile: null,
                                                        imagePreview: product.main_image
                                                    });
                                                    setShowForm(true);
                                                }}
                                                    className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-2xl text-dark-950">
                                                    <Edit3 size={24} />
                                                </button>
                                                <button onClick={() => setDeleteConfirm(product.product_id)}
                                                    className="w-16 h-16 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-rose-500 transition-all hover:scale-110 shadow-2xl text-slate-400 hover:text-white">
                                                    <Trash2 size={24} />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-6 left-6 z-20">
                                                <span className="bg-dark-950/80 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-bold text-gold-500 uppercase tracking-widest border border-gold-500/20 italic">
                                                    ৳{Number(product.base_price).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-10 flex-1 flex flex-col">
                                            <div className="mb-6">
                                                <h3 className="font-serif font-bold text-white text-2xl group-hover/item:text-gold-500 transition-colors line-clamp-1 italic tracking-tight">{product.name}</h3>
                                                <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.3em] mt-2 italic">
                                                    Category: {CATEGORIES.find(c => c.id === product.category_id)?.name || 'Artifact'}
                                                </p>
                                            </div>
                                            <p className="text-slate-500 text-sm italic leading-relaxed line-clamp-3 mb-8 flex-1 opacity-80">{product.description}</p>
                                            <div className="flex justify-between items-center pt-8 border-t border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${product.sold_count > 0 ? 'bg-teal-500' : 'bg-slate-800'}`}></div>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                        {product.sold_count} Dispatched
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {deleteConfirm === product.product_id && (
                                            <div className="p-8 bg-rose-500/10 border-t border-rose-500/20 flex flex-col gap-6 animate-slide-up">
                                                <p className="text-sm text-rose-400 font-bold uppercase tracking-widest text-center italic">Consign to Oblivion?</p>
                                                <div className="flex gap-4">
                                                    <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 bg-white/5 text-slate-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-white border border-white/5 transition-all active:scale-95">Preserve</button>
                                                    <button onClick={() => handleDelete(product.product_id)} className="flex-1 py-4 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-600 transition-all shadow-xl active:scale-95">Dissolve</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Orders Management Tab */
                    <div className="animate-fade-in space-y-16">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-8">
                                <div className="relative">
                                    <div className="w-24 h-24 border-2 border-gold-500/10 rounded-full"></div>
                                    <div className="absolute inset-0 w-24 h-24 border-t-2 border-gold-500 rounded-full animate-spin"></div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em] animate-pulse">Reading the Trade Winds...</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-40 bg-dark-900/40 rounded-[3rem] border border-dashed border-white/5 group">
                                <ClipboardList className="text-slate-800 mx-auto mb-8 group-hover:text-gold-500/20 transition-colors" size={80} />
                                <h3 className="text-3xl font-serif font-bold text-slate-600 mb-4 tracking-tight italic">Silent Chronicles</h3>
                                <p className="text-slate-700 italic text-lg max-w-xs mx-auto">The paths to your forge remain untrodden...</p>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                <h2 className="text-3xl font-serif font-bold text-white flex items-center gap-4 italic tracking-tight mb-10 border-b border-white/5 pb-10">Historical <span className="text-gold-500">Exchanges</span></h2>
                                {orders.map((order: any) => (
                                    <div key={order.order_id} className="bg-dark-900 border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden group">
                                        <div className="bg-white/[0.02] px-10 py-8 border-b border-white/5 flex flex-wrap justify-between items-center gap-10">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-dark-950 border border-white/10 rounded-2xl flex items-center justify-center text-gold-500 shadow-xl">
                                                    <Package size={24} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.3em]">Selection #{order.order_id}</p>
                                                    <p className="text-xl text-white font-serif italic">{formatDate(order.order_date)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-12">
                                                <div className="text-right space-y-1">
                                                    <p className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.3em]">Acquirer</p>
                                                    <p className="text-xl text-white font-serif italic">{order.first_name} {order.last_name}</p>
                                                </div>
                                                <div className={`px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest italic border border-white/5 bg-white/5 ${
                                                    order.status === 'Delivered' ? 'text-teal-400 bg-teal-400/10 border-teal-400/20' :
                                                    order.status === 'Cancelled' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' :
                                                    'text-amber-400 bg-amber-400/10 border-amber-400/20'
                                                }`}>
                                                    {order.status}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-10 overflow-x-auto custom-scrollbar">
                                            <table className="w-full text-left min-w-[600px]">
                                                <thead>
                                                    <tr className="text-[9px] text-slate-600 uppercase tracking-[0.4em] border-b border-white/5 italic">
                                                        <th className="pb-6 font-bold">Artifact</th>
                                                        <th className="pb-6 font-bold text-center">Essence</th>
                                                        <th className="pb-6 font-bold text-center">Mass</th>
                                                        <th className="pb-6 font-bold text-right">Acquisition Val</th>
                                                        <th className="pb-6 font-bold text-right">Recalibrate Manifest</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/[0.02]">
                                                    {order.items.map((item: any) => (
                                                        <tr key={item.order_item_id} className="text-sm group/row">
                                                            <td className="py-8">
                                                                <p className="font-serif font-bold text-white text-lg italic group-hover/row:text-gold-500 transition-colors leading-tight">{item.name}</p>
                                                            </td>
                                                            <td className="py-8 text-center text-slate-500 italic uppercase text-[10px] tracking-widest">
                                                                {item.size} / {item.color}
                                                            </td>
                                                            <td className="py-8 text-center font-bold text-slate-400 text-lg">
                                                                {item.quantity}
                                                            </td>
                                                            <td className="py-8 text-right font-bold text-white text-lg tracking-tight">
                                                                {formatCurrency(Number(item.price_at_purchase))}
                                                            </td>
                                                            <td className="py-8 text-right">
                                                                <div className="relative inline-block group/select">
                                                                    <select 
                                                                        disabled={order.status === 'Delivered' || order.status === 'Cancelled'}
                                                                        className="appearance-none bg-dark-950 border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-xl pl-5 pr-10 py-3 outline-none focus:ring-1 focus:ring-gold-500/50 hover:border-gold-500/30 transition-all cursor-pointer shadow-xl disabled:opacity-30 disabled:cursor-default"
                                                                        value={order.status}
                                                                        onChange={(e) => updateOrderStatus(item.order_item_id, e.target.value)}
                                                                    >
                                                                        {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                                                    </select>
                                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-700 group-hover/select:text-gold-500 transition-colors" size={14} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Add/Edit Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-dark-950/80 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl animate-fade-in">
                        <div className="bg-dark-900 border border-white/10 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            
                            <div className="flex items-center justify-between p-12 border-b border-white/5 relative z-10">
                                <div className="space-y-1">
                                    <h2 className="text-4xl font-serif font-bold text-white italic tracking-tight">
                                        {editingId ? 'Refine Artifact' : 'Forge New Discovery'}
                                    </h2>
                                    <p className="text-[11px] font-bold text-slate-600 uppercase tracking-[0.4em]">Submitting to the Heritage Archive</p>
                                </div>
                                <button onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
                                    className="w-14 h-14 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl flex items-center justify-center transition-all group active:scale-95">
                                    <X size={24} className="text-slate-500 group-hover:text-white" />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="p-12 space-y-10 overflow-y-auto custom-scrollbar flex-1 relative z-10">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4 pl-1 italic">Visual Depiction</label>
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={e => e.preventDefault()}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-white/5 bg-white/[0.02] rounded-[2.5rem] p-12 text-center cursor-pointer hover:border-gold-500/30 transition-all relative overflow-hidden group/upload shadow-inner">
                                        {form.imagePreview ? (
                                            <div className="relative group/preview">
                                                <img src={form.imagePreview} alt="Preview" className="w-full h-56 object-cover rounded-3xl shadow-2xl transition-transform duration-700 group-hover/preview:scale-[1.02]" />
                                                <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                                                    <Upload className="text-white" size={40} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="py-8 space-y-6">
                                                <div className="w-20 h-20 bg-dark-950 border border-white/5 rounded-2xl flex items-center justify-center mx-auto text-slate-800 group-hover/upload:text-gold-500 transition-all shadow-xl">
                                                    <Upload size={32} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-white font-serif italic text-lg opacity-80">Cast your imagery here</p>
                                                    <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest italic">Supports Essence JPG, PNG, WEBP</p>
                                                </div>
                                            </div>
                                        )}
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] pl-1 italic">Nominal Reference</label>
                                        <input type="text" name="name" required value={form.name} onChange={handleChange}
                                            className="w-full px-8 py-5 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-lg font-serif italic tracking-tight transition-all shadow-inner placeholder:italic placeholder:opacity-20" placeholder="E.g., Moonlight Weaver Silk" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] pl-1 italic">Heritage Narrative</label>
                                        <textarea name="description" required value={form.description} onChange={handleChange} rows={4}
                                            className="w-full px-8 py-5 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm italic leading-relaxed transition-all shadow-inner resize-none placeholder:opacity-10" placeholder="Chronicle the story of this artifact..." />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] pl-1 italic">Valuation (৳)</label>
                                            <input type="number" name="base_price" required min="1" step="0.01" value={form.base_price} onChange={handleChange}
                                                className="w-full px-8 py-5 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-lg font-bold tracking-widest shadow-inner placeholder:opacity-10" placeholder="100.00" />
                                            <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest pl-1">Investment required for acquisition</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] pl-1 italic">Guild Categorization</label>
                                            <div className="relative group/select">
                                                <select name="category_id" value={form.category_id} onChange={handleChange}
                                                    className="appearance-none w-full px-8 py-5 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-bold tracking-[0.1em] uppercase shadow-inner cursor-pointer hover:border-white/10 transition-all">
                                                    {CATEGORIES.map(c => <option key={c.id} value={c.id} className="bg-dark-900 text-white">{c.name}</option>)}
                                                </select>
                                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 transition-colors group-hover/select:text-gold-500" size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 pt-6">
                                    <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
                                        className="flex-1 py-5 bg-white/5 text-slate-400 rounded-3xl text-[10px] font-bold uppercase tracking-widest border border-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]">
                                        Retreat from Forge
                                    </button>
                                    <button type="submit" disabled={isSubmitting}
                                        className="flex-1 py-5 bg-gold-500 text-dark-950 rounded-3xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold-400 transition-all shadow-[0_20px_40px_rgba(251,191,36,0.1)] active:scale-[0.98] flex items-center justify-center gap-4 group">
                                        {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> COMMITTING ARCHIVE...</> : (
                                            <>
                                                {editingId ? 'IMPRINT REFINEMENT' : 'CRYSTALLIZE ARTIFACT'}
                                                <div className="w-0 group-hover:w-6 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 italic font-serif text-xl border-l border-dark-950/20 pl-2">→</div>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};
