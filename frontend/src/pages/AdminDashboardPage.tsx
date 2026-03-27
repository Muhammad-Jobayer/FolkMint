import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
    Package, Users, ShoppingBag, TrendingUp, Trash2, User,
    BarChart3, Check, AlertCircle, ChevronDown
} from 'lucide-react';
import { getImageUrl } from '../utils/api';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Cell, 
    PieChart, Pie, Legend
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
    const { user, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'orders' | 'products' | 'users'>('overview');

    const [stats, setStats] = useState({ total_users: 0, total_products: 0, total_orders: 0, total_revenue: 0 });
    const [analytics, setAnalytics] = useState({
        revenue: [] as any[],
        topProducts: [] as any[],
        bestArtisans: [] as any[]
    });
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState<number | null>(null);
    const [toast, setToast] = useState('');

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const [statsRes, ordersRes, prodsRes, usersRes, revRes, tpRes, baRes] = await Promise.all([
                    fetch('/api/admin/stats').then(r => r.json()),
                    fetch('/api/admin/orders').then(r => r.json()),
                    fetch('/api/products').then(r => r.json()),
                    fetch('/api/admin/users').then(r => r.json()),
                    fetch('/api/analytics/revenue').then(r => r.json()),
                    fetch('/api/analytics/top-products').then(r => r.json()),
                    fetch('/api/analytics/best-artisans').then(r => r.json()),
                ]);

                if (statsRes.success) setStats(statsRes.data);
                if (ordersRes.success) setOrders(ordersRes.data);
                if (prodsRes.success) setProducts(prodsRes.data);
                if (usersRes.success) setUsers(usersRes.data);
                
                setAnalytics({
                    revenue: revRes.success ? revRes.data.reverse() : [], // Reverse to show chronological order
                    topProducts: tpRes.success ? tpRes.data : [],
                    bestArtisans: baRes.success ? baRes.data : []
                });
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

    const updateOrderStatus = async (orderId: number, status: string) => {
        setStatusUpdating(orderId);
        try {
            await fetch(`/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status } : o));
            showToast('Order status updated');
        } catch (err) { console.error(err); }
        setStatusUpdating(null);
    };

    const deleteProduct = async (productId: number) => {
        if (!confirm('Delete this product? This cannot be undone.')) return;
        try {
            await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
            setProducts(prev => prev.filter(p => p.product_id !== productId));
            showToast('Product deleted');
        } catch (err) { console.error(err); }
    };

    if (!isAdmin) {
        return (
            <Layout>
                <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-dark-950 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full"></div>
                    <div className="w-32 h-32 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-8 shadow-2xl scale-110 animate-pulse">
                        <AlertCircle className="text-red-500 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" size={60} />
                    </div>
                    <h2 className="text-5xl font-serif font-bold text-white mb-6 tracking-tight">Archives Locked</h2>
                    <p className="text-slate-500 max-w-sm text-lg italic leading-relaxed border-l-2 border-red-500/20 pl-6">
                        You do not possess the ancestral keys required to access the high command archives.
                    </p>
                    <Link to="/" className="mt-12 glass-button px-12 text-xs uppercase tracking-widest font-bold">Return to Sanctuary</Link>
                </div>
            </Layout>
        );
    }

    const TABS = [
        { id: 'overview', label: 'Command', icon: BarChart3 },
        { id: 'analytics', label: 'Matrix', icon: TrendingUp },
        { id: 'orders', label: 'Chronicles', icon: ShoppingBag },
        { id: 'products', label: 'Inventory', icon: Package },
        { id: 'users', label: 'Keepers', icon: Users },
    ] as const;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-dark-950 min-h-screen">
                {/* Toast */}
                {toast && (
                    <div className="fixed top-24 right-8 z-[100] bg-dark-900 border border-gold-500/30 text-gold-500 px-8 py-5 rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-right backdrop-blur-3xl">
                        <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
                            <Check size={16} />
                        </div>
                        <span className="font-bold text-sm uppercase tracking-widest">{toast}</span>
                    </div>
                )}

                {/* Header */}
                <div className="mb-20 space-y-4">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Administration Matrix</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">Main <span className="text-gradient">Registry</span></h1>
                    <p className="text-slate-500 font-serif italic text-lg opacity-80 pt-2">Welcome, High Keeper {user?.first_name}. FolkMint's pulse awaits your command.</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-white/5 mb-16 overflow-x-auto custom-scrollbar-hide pb-2">
                    {TABS.map(tab => {
                        const Icon = tab.icon;
                        const active = activeTab === tab.id;
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap border-b-2 rounded-t-2xl group ${active ? 'border-gold-500 text-gold-500 bg-gold-500/5 shadow-[0_10px_30px_rgba(251,191,36,0.05)]' : 'border-transparent text-slate-600 hover:text-slate-300 hover:bg-white/5'}`}>
                                <Icon size={16} className={`transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-8">
                        <div className="relative">
                            <div className="w-24 h-24 border-2 border-gold-500/10 rounded-full"></div>
                            <div className="absolute inset-0 w-24 h-24 border-t-2 border-gold-500 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em] animate-pulse">Synchronizing Archives...</p>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        {/* Analytics Tab */}
                        {activeTab === 'analytics' && (
                            <div className="space-y-12 pb-20">
                                {/* Revenue Area Chart */}
                                <div className="bg-dark-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                    <h3 className="text-xl font-serif font-bold text-white mb-10 italic tracking-tight">Revenue <span className="text-gold-500">Chronology</span></h3>
                                    <div className="h-[400px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={analytics.revenue} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                                                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                                                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `৳${v}`} />
                                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(251,191,36,0.2)', borderRadius: '1rem' }}
                                                    itemStyle={{ color: '#fbbf24', fontSize: '12px', fontWeight: 'bold' }}
                                                />
                                                <Area type="monotone" dataKey="revenue" stroke="#fbbf24" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {/* Top Products Bar Chart */}
                                    <div className="bg-dark-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl relative group">
                                        <h3 className="text-xl font-serif font-bold text-white mb-10 italic tracking-tight">Artifact <span className="text-rose-400">Popularity</span></h3>
                                        <div className="h-[350px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={analytics.topProducts} layout="vertical">
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="product_name" type="category" stroke="#475569" fontSize={10} width={120} tickLine={false} axisLine={false} />
                                                    <Tooltip 
                                                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '1rem' }}
                                                    />
                                                    <Bar dataKey="total_sold" fill="#f43f5e" radius={[0, 10, 10, 0]} barSize={20}>
                                                        {analytics.topProducts.map((_, index) => (
                                                            <Cell key={`cell-${index}`} fill={`rgba(244,63,94, ${1 - index * 0.15})`} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* Artisan Share Pie Chart */}
                                    <div className="bg-dark-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl relative group">
                                        <h3 className="text-xl font-serif font-bold text-white mb-10 italic tracking-tight">Artisan <span className="text-indigo-400">Empire</span></h3>
                                        <div className="h-[350px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={analytics.bestArtisans}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={100}
                                                        paddingAngle={5}
                                                        dataKey="total_sales"
                                                        nameKey="artisan_name"
                                                    >
                                                        {analytics.bestArtisans.map((_, index) => (
                                                            <Cell key={`cell-${index}`} fill={['#818cf8', '#fbbf24', '#2dd4bf', '#f43f5e', '#a855f7'][index % 5]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip 
                                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(129,140,248,0.2)', borderRadius: '1rem' }}
                                                    />
                                                    <Legend wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '20px' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-16">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { label: 'Asset Value', value: `৳${stats.total_revenue.toLocaleString()}`, icon: TrendingUp, color: 'text-gold-500 bg-gold-500/10 border-gold-500/20' },
                                        { label: 'Selection Flow', value: stats.total_orders, icon: ShoppingBag, color: 'text-teal-400 bg-teal-400/10 border-teal-400/20' },
                                        { label: 'Artifact Count', value: stats.total_products, icon: Package, color: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
                                        { label: 'Citizen Base', value: stats.total_users, icon: Users, color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' },
                                    ].map(card => {
                                        const Icon = card.icon;
                                        return (
                                            <div key={card.label} className="bg-dark-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative group overflow-hidden hover:border-white/10 transition-all">
                                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-white/10 transition-all"></div>
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border ${card.color} shadow-lg transition-transform group-hover:scale-110`}>
                                                    <Icon size={24} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">{card.label}</p>
                                                    <p className="text-3xl font-bold text-white tracking-tight italic">{card.value}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Recent Orders */}
                                <div className="bg-dark-900 border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden relative group">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
                                    <div className="p-10 border-b border-white/5 flex justify-between items-end">
                                        <h2 className="text-2xl font-serif font-bold text-white italic tracking-tight">Live <span className="text-gold-500">Registry Feed</span></h2>
                                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest italic flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></div>
                                            Real-time Chronology
                                        </p>
                                    </div>
                                    <div className="overflow-x-auto custom-scrollbar">
                                        <table className="w-full text-sm text-center">
                                            <thead className="bg-white/5">
                                                <tr>
                                                    {['Archive ID', 'Selection Date', 'Registry Total', 'Manifest Status'].map(h => (
                                                        <th key={h} className="px-10 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {orders.slice(0, 8).map((order: any) => (
                                                    <tr key={order.order_id} className="hover:bg-white/[0.02] transition-colors group/row">
                                                        <td className="px-10 py-8 font-mono text-gold-500/80 group-hover/row:text-gold-500 transition-colors">#{order.order_id}</td>
                                                        <td className="px-10 py-8 text-slate-400 italic">{new Date(order.order_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                                                        <td className="px-10 py-8 font-bold text-white text-lg tracking-tight">৳{order.total_amount?.toLocaleString()}</td>
                                                        <td className="px-10 py-8">
                                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/5 bg-white/5 italic ${
                                                                order.status === 'Delivered' ? 'text-teal-400 bg-teal-400/10 border-teal-400/20' :
                                                                order.status === 'Processing' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
                                                                order.status === 'Cancelled' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' :
                                                                'text-slate-400'
                                                            }`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="bg-dark-900 border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden relative group">
                                <div className="p-12 border-b border-white/5 flex justify-between items-center bg-gradient-to-br from-white/[0.02] to-transparent">
                                    <div className="space-y-1">
                                        <h2 className="text-3xl font-serif font-bold text-white italic tracking-tight">Archive <span className="text-gold-500">Chronicles</span></h2>
                                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{orders.length} Selection Entries Deciphered</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 shadow-inner">
                                        <div className="px-6 py-2 bg-dark-950 rounded-xl text-[10px] font-bold text-gold-500 uppercase tracking-widest border border-gold-500/20">Master Access</div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-sm">
                                        <thead className="bg-white/5">
                                            <tr>
                                                {['Archive ID', 'Timestamp', 'Value', 'Registry State', 'Recalibrate'].map(h => (
                                                    <th key={h} className="text-left px-12 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 whitespace-nowrap">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {orders.map((order: any) => (
                                                <tr key={order.order_id} className="hover:bg-white/[0.02] transition-colors group/row">
                                                    <td className="px-12 py-8 font-mono text-gold-500/80 group-hover/row:text-gold-500 transition-colors">#{order.order_id}</td>
                                                    <td className="px-12 py-8 text-slate-400 italic whitespace-nowrap">{new Date(order.order_date).toLocaleDateString()}</td>
                                                    <td className="px-12 py-8 font-bold text-white text-lg tracking-tight whitespace-nowrap">৳{order.total_amount?.toLocaleString()}</td>
                                                    <td className="px-12 py-8">
                                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/5 bg-white/5 italic ${
                                                                order.status === 'Delivered' ? 'text-teal-400 bg-teal-400/10 border-teal-400/20' :
                                                                'text-amber-400'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-12 py-8">
                                                        <div className="relative inline-block group/select">
                                                            <select
                                                                value={order.status}
                                                                onChange={e => updateOrderStatus(order.order_id, e.target.value)}
                                                                disabled={statusUpdating === order.order_id}
                                                                className="appearance-none bg-dark-950 border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-xl pl-5 pr-12 py-3 cursor-pointer focus:ring-1 focus:ring-gold-500/50 outline-none hover:border-gold-500/30 transition-all shadow-xl">
                                                                {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                                                    <option key={s} value={s}>{s}</option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 group-hover/select:text-gold-500 transition-colors" size={12} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Products Tab */}
                        {activeTab === 'products' && (
                            <div className="space-y-12">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="space-y-1">
                                        <h2 className="text-4xl font-serif font-bold text-white italic tracking-tight">Heritage <span className="text-gold-500">Repository</span></h2>
                                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Curation of {products.length} Artisanal Wonders</p>
                                    </div>
                                    <button className="gold-button px-10 py-4 text-[10px]">Augment Collection</button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {products.map((product: any) => (
                                        <div key={product.product_id} className="bg-dark-900 border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden group/item hover:border-white/10 transition-all animate-slide-up">
                                            {product.main_image && (
                                                <div className="h-56 overflow-hidden relative">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60 z-10"></div>
                                                    <img src={product.main_image} alt={product.name}
                                                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" />
                                                    <div className="absolute top-4 right-4 z-20">
                                                        <span className="bg-dark-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold text-white uppercase tracking-widest border border-white/10 italic">
                                                            {product.category || 'Artifact'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="p-8 space-y-4">
                                                <h3 className="font-serif font-bold text-white text-xl group-hover/item:text-gold-500 transition-colors truncate italic tracking-tight">{product.name}</h3>
                                                <p className="text-slate-500 text-xs italic line-clamp-2 leading-relaxed opacity-60">{product.description}</p>
                                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                    <span className="font-bold text-white text-lg tracking-tight">৳{product.base_price?.toLocaleString()}</span>
                                                    <button onClick={() => deleteProduct(product.product_id)}
                                                        className="p-3 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-transparent hover:border-rose-500/20 active:scale-95">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div className="bg-dark-900 border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden relative group">
                                <div className="p-12 border-b border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                                    <h2 className="text-3xl font-serif font-bold text-white italic tracking-tight">Citizen <span className="text-gold-500">Registry</span></h2>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-2">{users.length} Active Keepers Documented</p>
                                </div>
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full text-sm">
                                        <thead className="bg-white/5">
                                            <tr>
                                                {['Citizen ID', 'Identity', 'Correspondence', 'Security Rank'].map(h => (
                                                    <th key={h} className="text-left px-12 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 whitespace-nowrap">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {users.map((u: any) => (
                                                <tr key={u.user_id} className="hover:bg-white/[0.02] transition-colors group/row">
                                                    <td className="px-12 py-8 font-mono text-slate-700 text-[10px] tracking-widest group-hover/row:text-slate-500">#{u.user_id}</td>
                                                    <td className="px-12 py-8 group-hover/row:translate-x-1 transition-transform">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                                                                {u.profile_picture_url ? (
                                                                    <img 
                                                                        src={getImageUrl(u.profile_picture_url)} 
                                                                        alt="Avatar" 
                                                                        className="w-full h-full object-cover" 
                                                                    />
                                                                ) : (
                                                                    <User size={16} className="text-slate-600" />
                                                                )}
                                                            </div>
                                                            <span className="font-serif font-bold text-white text-lg italic tracking-tight">{u.first_name} {u.last_name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-8 text-slate-400 group-hover/row:text-slate-300 transition-colors italic">{u.email}</td>
                                                    <td className="px-12 py-8">
                                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] italic border ${
                                                            u.role === 'admin' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' :
                                                            u.role === 'seller' ? 'text-gold-500 bg-gold-500/10 border-gold-500/20' :
                                                            'text-slate-500 bg-white/5 border-white/10'
                                                        }`}>
                                                            {u.role || 'customer'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};
