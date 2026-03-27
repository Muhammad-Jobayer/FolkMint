import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/layout/Layout';
import { User, Package, MapPin, LogOut, Star, Loader2, Heart, Camera, ExternalLink, X, Award, Shield, Zap, CheckCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { apiRequest, formatDate, formatCurrency, getImageUrl } from '../utils/api';
import { useWishlist } from '../context/WishlistContext';

export const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist'>('orders');
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ name: string, id: number } | null>(null);
    const [rating, setRating] = useState(5);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    const { logout, user: authUser, isLoading: authLoading, updateProfilePicture } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const { wishlistItems, toggleWishlist } = useWishlist();
    const [profileData, setProfileData] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploadingPicture, setIsUploadingPicture] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [tempAddress, setTempAddress] = useState('');
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);

    const fetchProfileData = React.useCallback(async () => {
        if (!authUser) return;

        setIsLoading(true);

        const { success, data, error: fetchError } = await apiRequest<any>('/user/profile');
        
        if (success && data) {
            setProfileData(data.profile);
            setOrders(data.orders || []);
            setTempAddress(data.profile?.address || '');
        } else {
            showToast(fetchError || 'Error loading profile', 'error');
        }
        setIsLoading(false);
    }, [authUser, showToast]);

    useEffect(() => {
        if (!authLoading) {
            if (authUser) {
                fetchProfileData();
            } else {
                navigate('/login', { state: { from: '/profile' } });
                setIsLoading(false);
            }
        }
    }, [authUser, authLoading, fetchProfileData, navigate]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab === 'wishlist') setActiveTab('wishlist');
        else if (tab === 'profile') setActiveTab('profile');
        else if (tab === 'orders') setActiveTab('orders');
    }, [location.search]);

    const openReviewModal = (productName: string, productId: number) => {
        setSelectedProduct({ name: productName, id: productId });
        setRating(5);
        setComment('');
        setReviewModalOpen(true);
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct || !authUser) return;

        setIsSubmittingReview(true);
        const { success, error } = await apiRequest('/reviews', {
            method: 'POST',
            body: JSON.stringify({
                rating,
                comment,
                product_id: selectedProduct.id
            })
        });

        if (success) {
            showToast('Review submitted! Thank you.', 'success');
            setReviewModalOpen(false);
        } else {
            showToast(error || 'Failed to submit review', 'error');
        }
        setIsSubmittingReview(false);
    };

    const handleUpdateAddress = async () => {
        if (!authUser) return;
        setIsUpdatingAddress(true);
        
        const { success, error } = await apiRequest('/user/profile/address', {
            method: 'PUT',
            body: JSON.stringify({ address: tempAddress })
        });

        if (success) {
            setProfileData({ ...profileData, address: tempAddress });
            setIsEditingAddress(false);
            showToast('Address updated successfully', 'success');
        } else {
            showToast(error || 'Failed to update address', 'error');
        }
        setIsUpdatingAddress(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleAvatarClick = () => {
        if (!isUploadingPicture) fileInputRef.current?.click();
    };

    const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingPicture(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const { success, data, error } = await apiRequest<{ url: string }>('/upload/image', {
                method: 'POST',
                body: formData,
            });

            if (!success || !data?.url) {
                throw new Error(error || 'Upload failed');
            }

            const result = await updateProfilePicture(data.url);
            if (result.success) {
                showToast('Profile picture updated!', 'success');
            } else {
                showToast(result.message || 'Failed to save picture', 'error');
            }
        } catch (err: any) {
            console.error('Photo upload error:', err);
            showToast(err.message || 'Upload error. Please try again.', 'error');
        } finally {
            setIsUploadingPicture(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (isLoading || authLoading) {
        return (
            <Layout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center bg-dark-950">
                    <Loader2 className="animate-spin text-gold-500 mb-6" size={64} />
                    <p className="text-slate-400 font-serif italic text-xl text-center px-4 animate-pulse uppercase tracking-widest">Loading your craft journey...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-dark-900/40 border-b border-white/5 py-24 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div
                            className="relative w-32 h-32 rounded-[2.5rem] cursor-pointer group flex-shrink-0"
                            onClick={handleAvatarClick}
                            title="Change profile picture"
                        >
                            {authUser?.profile_picture_url ? (
                                <img
                                    src={getImageUrl(authUser.profile_picture_url)}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-[2.5rem] border border-white/10 shadow-2xl"
                                />
                            ) : (
                                <div className="w-full h-full bg-dark-950 rounded-[2.5rem] flex items-center justify-center text-slate-700 border border-white/10 shadow-2xl">
                                    <div className="absolute inset-0 bg-gold-500/5 blur-2xl rounded-full group-hover:bg-gold-500/10 transition-all"></div>
                                    <User size={64} className="relative z-10" />
                                </div>
                            )}
                            <div className="absolute inset-0 rounded-[2.5rem] flex items-center justify-center bg-dark-950/70 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                {isUploadingPicture ? (
                                    <Loader2 size={32} className="animate-spin text-gold-500" />
                                ) : (
                                    <Camera size={32} className="text-gold-400" />
                                )}
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureChange}
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight mb-4">
                                {profileData?.first_name} <span className="text-gold-500">{profileData?.last_name}</span>
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                                <p className="text-slate-400 font-medium italic text-lg">{profileData?.email}</p>
                                <span className="px-4 py-1.5 bg-gold-500/10 text-gold-500 text-[10px] font-bold rounded-xl uppercase tracking-[0.2em] border border-gold-500/20 shadow-sm">
                                    {authUser?.role || 'Collector'}
                                </span>
                            </div>
                            <p className="text-slate-400 font-serif italic text-xl opacity-70">
                                Keeper of the FolkMint Legacy
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                                <Link 
                                    to={`/p/${authUser?.user_id}`} 
                                    className="glass-button px-8 py-3 text-[10px] flex items-center gap-3 group"
                                >
                                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    Broaden Your Identity
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-dark-950">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="w-full lg:w-80 space-y-4">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center justify-between gap-4 px-6 py-5 rounded-2xl font-bold transition-all duration-300 group ${activeTab === 'orders' ? 'bg-gold-500 text-dark-950 shadow-xl shadow-gold-500/10' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'}`}
                        >
                            <span className="flex items-center gap-4 uppercase tracking-widest text-xs">
                                <Package size={20} className={activeTab === 'orders' ? '' : 'text-slate-500 group-hover:text-white transition-colors'} /> 
                                Order Archives
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${activeTab === 'orders' ? 'bg-dark-950/20' : 'bg-white/5 text-slate-500'}`}>{orders.length}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all duration-300 group ${activeTab === 'profile' ? 'bg-gold-500 text-dark-950 shadow-xl shadow-gold-500/10' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'}`}
                        >
                            <User size={20} className={activeTab === 'profile' ? '' : 'text-slate-500 group-hover:text-white transition-colors'} /> 
                            <span className="uppercase tracking-widest text-xs">Identity Profile</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`w-full flex items-center justify-between gap-4 px-6 py-5 rounded-2xl font-bold transition-all duration-300 group ${activeTab === 'wishlist' ? 'bg-gold-500 text-dark-950 shadow-xl shadow-gold-500/10' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'}`}
                        >
                            <span className="flex items-center gap-4 uppercase tracking-widest text-xs">
                                <Heart size={20} className={activeTab === 'wishlist' ? 'fill-current' : 'text-slate-500 group-hover:text-red-400 transition-colors'} />
                                Loved Crafts
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${activeTab === 'wishlist' ? 'bg-dark-950/20' : 'bg-white/5 text-slate-500'}`}>{wishlistItems.length}</span>
                        </button>
                        <div className="pt-8 mt-8 border-t border-white/5">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold bg-red-500/5 text-red-400 hover:bg-red-500/10 transition-all border border-red-500/10 group"
                            >
                                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                                <span className="uppercase tracking-widest text-xs">Depart Securely</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        {activeTab === 'orders' ? (
                            <div className="space-y-10">
                                <div className="flex justify-between items-end border-b border-white/5 pb-8">
                                    <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Acquisition <span className="text-gradient">History</span></h2>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 italic">Preserving your craft journey</p>
                                </div>
                                
                                {orders.length > 0 ? (
                                    <div className="space-y-8">
                                        {orders.map(order => (
                                            <div key={order.order_id} className="bg-dark-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl hover:border-gold-500/20 transition-all duration-500 group">
                                                <div className="bg-white/5 px-8 py-6 flex flex-wrap justify-between items-center gap-8 border-b border-white/5">
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Acquired On</p>
                                                        <p className="text-sm text-white font-bold italic">{formatDate(order.order_date)}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Total Investment</p>
                                                        <p className="text-sm text-gold-500 font-bold tracking-tight">{formatCurrency(order.total_amount)}</p>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Protocol ID</p>
                                                        <p className="text-sm text-slate-400 font-medium">#{order.order_id}</p>
                                                    </div>
                                                    <span className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-inner ${
                                                        order.status === 'Delivered' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/20' :
                                                        order.status === 'Cancelled' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                                                        'bg-gold-500/20 text-gold-400 border border-gold-500/20'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="p-8 divide-y divide-white/5">
                                                    {order.items && order.items.map((item: any, idx: number) => (
                                                        <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-6 first:pt-0 last:pb-0">
                                                            <div className="flex gap-6">
                                                                <div className="w-20 h-20 bg-dark-950 rounded-2xl flex-shrink-0 flex items-center justify-center border border-white/5 text-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                                    <Package size={32} />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Link to={`/product/${item.product_id}`} className="text-xl font-serif font-bold text-white hover:text-gold-500 transition-colors block leading-tight">
                                                                        {item.name}
                                                                    </Link>
                                                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                                        <span className="bg-white/5 px-2 py-1 rounded">{item.size}</span>
                                                                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                                                        <span className="bg-white/5 px-2 py-1 rounded">{item.color}</span>
                                                                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                                                        <span className="text-slate-400">{item.quantity} Unit{item.quantity !== 1 ? 's' : ''}</span>
                                                                    </div>
                                                                    <p className="text-lg font-bold text-white mt-2">{formatCurrency(item.price_at_purchase)}</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => openReviewModal(item.name, item.product_id)}
                                                                className="glass-button !py-2.5 !px-6 !text-[10px] shadow-lg hover:shadow-gold-500/5 active:scale-95"
                                                            >
                                                                Endorse Artisan Work
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-32 bg-dark-900 border border-dashed border-white/10 rounded-[3rem] shadow-2xl">
                                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
                                            <Package className="text-slate-700" size={48} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold text-white mb-4">The Archives are Empty</h3>
                                        <p className="text-slate-500 mb-10 text-lg italic max-w-sm mx-auto">Your journey of heritage discovery begins with the first selection.</p>
                                        <Link to="/shop" className="glass-button px-12">Start Discovery</Link>
                                    </div>
                                )}
                            </div>
                        ) : activeTab === 'wishlist' ? (
                            <div className="space-y-10">
                                <div className="flex justify-between items-end border-b border-white/5 pb-8">
                                    <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Loved <span className="text-gradient">Crafts</span></h2>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 italic">{wishlistItems.length} saved item{wishlistItems.length !== 1 ? 's' : ''}</p>
                                </div>
                                {wishlistItems.length === 0 ? (
                                    <div className="text-center py-32 bg-dark-900 border border-dashed border-white/10 rounded-[3rem]">
                                        <Heart className="mx-auto mb-6 text-white/10" size={64} />
                                        <h3 className="text-2xl font-serif font-bold text-white mb-4">No Loved Crafts Yet</h3>
                                        <p className="text-slate-500 mb-10 text-lg italic">Browse the shop and mark the pieces that speak to you.</p>
                                        <Link to="/shop" className="glass-button px-12">Explore the Registry</Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {wishlistItems.map(item => (
                                            <div key={item.product_id} className="bg-dark-900 border border-white/10 rounded-[2rem] overflow-hidden flex gap-5 p-5 items-center hover:border-gold-500/20 transition-all duration-300 group">
                                                <Link to={`/product/${item.product_id}`} className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-dark-800">
                                                    <img src={getImageUrl(item.main_image || '/images/1_lRUm2IW.webp')} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <Link to={`/product/${item.product_id}`}>
                                                        <p className="text-sm font-serif font-bold text-white truncate hover:text-gold-400 transition-colors">{item.name}</p>
                                                    </Link>
                                                    <p className="text-gold-500 font-bold text-sm mt-1">৳{item.base_price.toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleWishlist(item.product_id)}
                                                    className="p-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 flex-shrink-0"
                                                    title="Remove from wishlist"
                                                >
                                                    <Heart size={16} className="fill-current" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-dark-900 p-12 rounded-[3rem] border border-white/10 shadow-2xl animate-fade-in relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 blur-[120px] rounded-full"></div>
                                <h2 className="text-4xl font-serif font-bold text-white mb-12 tracking-tight">Identity <span className="text-gold-500">Archives</span></h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 relative z-10">
                                    <div className="space-y-3">
                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.3em] pl-1">Legal Designation</span>
                                        <div className="p-6 bg-white/5 rounded-2xl text-white font-bold border border-white/5 text-lg shadow-inner">
                                            {profileData?.first_name} {profileData?.last_name}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.3em] pl-1">Digital Coordinates</span>
                                        <div className="p-6 bg-white/5 rounded-2xl text-white font-bold border border-white/5 text-lg shadow-inner italic">
                                            {profileData?.email}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-4">
                                            <Award size={24} className="text-gold-500" /> 
                                            <span className="uppercase tracking-widest text-sm text-slate-400">Heritage Accomplishments</span>
                                        </h3>
                                    </div>
                                    <div className="p-8 border border-white/5 bg-white/5 rounded-[2rem] shadow-inner mb-12">
                                        <div className="flex flex-wrap gap-6">
                                            <div className="group relative">
                                                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 hover:scale-110 hover:bg-gold-500 hover:text-dark-950 transition-all duration-500 cursor-help">
                                                    <Shield size={28} />
                                                </div>
                                                <p className="text-[10px] text-center mt-3 text-slate-500 font-bold uppercase tracking-widest">Guardian</p>
                                            </div>

                                            {authUser?.role === 'seller' && (
                                                <div className="group relative">
                                                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 hover:scale-110 hover:bg-purple-500 hover:text-white transition-all duration-500 cursor-help">
                                                       <Zap size={28} />
                                                    </div>
                                                    <p className="text-[10px] text-center mt-3 text-slate-500 font-bold uppercase tracking-widest">Masterisan</p>
                                                </div>
                                            )}

                                            <div className="group relative">
                                                <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 hover:scale-110 hover:bg-teal-500 hover:text-white transition-all duration-500 cursor-help">
                                                   <CheckCircle size={28} />
                                                </div>
                                                <p className="text-[10px] text-center mt-3 text-slate-500 font-bold uppercase tracking-widest">Verified</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-4">
                                            <MapPin size={24} className="text-gold-500" /> 
                                            <span className="uppercase tracking-widest text-sm text-slate-400">Primary Delivery Point</span>
                                        </h3>
                                    </div>
                                    <div className={`p-8 border rounded-[2rem] transition-all duration-500 ${isEditingAddress ? 'border-gold-500/40 bg-dark-950 shadow-2xl ring-4 ring-gold-500/5' : 'border-white/5 bg-white/5 shadow-inner'}`}>
                                        {isEditingAddress ? (
                                            <div className="space-y-6">
                                                <textarea
                                                    className="w-full p-6 bg-dark-950 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/40 focus:border-gold-500/40 outline-none text-white text-lg italic resize-none transition-all"
                                                    rows={3}
                                                    value={tempAddress}
                                                    onChange={(e) => setTempAddress(e.target.value)}
                                                    placeholder="Coordinate designation..."
                                                />
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={handleUpdateAddress}
                                                        disabled={isUpdatingAddress}
                                                        className="bg-gold-500 text-dark-950 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold-400 transition-all disabled:opacity-50 flex items-center gap-3 shadow-lg shadow-gold-500/10 active:scale-95"
                                                    >
                                                        {isUpdatingAddress && <Loader2 size={16} className="animate-spin" />}
                                                        Update Archive
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsEditingAddress(false);
                                                            setTempAddress(profileData?.address || '');
                                                        }}
                                                        className="bg-white/5 text-slate-400 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all border border-white/5"
                                                    >
                                                        Abandon Changes
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center gap-8">
                                                <p className="text-white text-lg font-medium leading-relaxed italic">{profileData?.address || 'Deployment coordinates not established'}</p>
                                                <button
                                                    onClick={() => setIsEditingAddress(true)}
                                                    className="text-gold-500 font-bold hover:text-gold-400 transition-all text-xs uppercase tracking-widest border-b border-gold-500/30 hover:border-gold-500 pb-1 flex-shrink-0"
                                                >
                                                    Modify
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {reviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-dark-950/80 backdrop-blur-xl">
                    <div className="bg-dark-900 border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-xl w-full p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] rounded-full"></div>
                        
                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div>
                                <h3 className="text-4xl font-serif font-bold text-white tracking-tight mb-2">Endorse <span className="text-gold-500">Craft</span></h3>
                                <p className="text-slate-400 text-lg italic leading-tight">Reviewing: {selectedProduct?.name}</p>
                            </div>
                            <button
                                onClick={() => setReviewModalOpen(false)}
                                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 group"
                            >
                                <X size={24} className="text-slate-500 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitReview} className="space-y-10 relative z-10">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4 text-center">Your Merit Assessment</label>
                                <div className="flex justify-center gap-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transition-all active:scale-95 transform"
                                        >
                                            <Star
                                                size={40}
                                                className={`transition-all duration-300 ${star <= (hoveredRating || rating) ? 'fill-gold-500 text-gold-500 filter drop-shadow-[0_0_100px_rgba(251,191,36,0.3)] scale-110' : 'text-slate-700 fill-transparent'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-2 px-1">Your Perspective</label>
                                <textarea
                                    rows={5}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full p-8 bg-white/5 border border-white/10 rounded-[2rem] focus:ring-1 focus:ring-gold-500/40 focus:border-gold-500/40 outline-none text-white text-lg italic resize-none transition-all shadow-inner"
                                    placeholder="Speak of the artisan's touch and the piece's resonance..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmittingReview}
                                className="w-full h-auto py-5 bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold uppercase tracking-widest text-sm rounded-2xl transition-all duration-300 shadow-xl shadow-gold-500/10 flex items-center justify-center gap-4 disabled:opacity-50 active:scale-95 group"
                            >
                                {isSubmittingReview ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        ARCHIVING ENDORSEMENT...
                                    </>
                                ) : (
                                    <>
                                        SUBMIT ARCHIVE
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};
