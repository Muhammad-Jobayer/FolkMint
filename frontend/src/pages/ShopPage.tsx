import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { ProductCard } from '../components/ui/ProductCard';
import { products as staticProducts, categories as staticCategories } from '../data/mockData';
import { Filter, Loader2, Search, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const ShopPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [searchParams] = useSearchParams();
    const { showToast } = useToast();
    const [selectedCategory, setSelectedCategory] = useState<number | string | null>(
        searchParams.get('category') ? Number(searchParams.get('category')) : null
    );
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

    useEffect(() => {
        const cat = searchParams.get('category');
        if (cat) setSelectedCategory(Number(cat));
    }, [searchParams]);
    const [recommendedIds, setRecommendedIds] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState('Featured');
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const parentCategories = categories.filter(c => !c.parent_category);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            
            // Fetch Categories
            const { success: catSuccess, data: catData, error: catError } = await apiRequest<any[]>('/categories');
            if (catSuccess && catData) {
                setCategories(catData);
            } else {
                console.error('Categories fetch error:', catError);
                setCategories(staticCategories);
            }

            // Fetch Products
            const { success: prodSuccess, data: prodData, error: prodError } = await apiRequest<any[]>('/products');
            if (prodSuccess && prodData) {
                // Ensure prices are numbers (Postgres Decimal -> Number)
                const formattedProds = prodData.map((p: any) => ({
                    ...p,
                    base_price: Number(p.base_price)
                }));
                setAllProducts(formattedProds);
            } else {
                setError(prodError || 'Failed to load products');
                showToast(`Failed to load products: ${prodError}`, 'error');
                setAllProducts(staticProducts);
            }
            setIsLoading(false);
        };

        const fetchRecommended = async () => {
            if (!isAuthenticated) return;
            try {
                const { success, data } = await apiRequest<any[]>('/products/recommendations?limit=100', { cacheTimeMs: 5000 });
                if (success && data && data.length > 0) {
                    setRecommendedIds(data.map(p => p.product_id));
                }
            } catch (e) {}
        };

        fetchData();
        fetchRecommended();
    }, [showToast, isAuthenticated]);

    // Derived products state
    const filteredProducts = allProducts
        .filter(p => {
            if (!selectedCategory) return true;
            if (selectedCategory === 'top-rated') return p.average_rating > 0 && p.total_reviews >= 1;
            if (selectedCategory === 'you-may-love') return recommendedIds.includes(p.product_id);
            
            // Matches category directly or its parent
            if (p.category_id === selectedCategory) return true;
            const cat = categories.find(c => c.category_id === p.category_id);
            return cat && cat.parent_category === selectedCategory;
        })
        .filter(p => (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase())))
        .sort((a, b) => {
            if (selectedCategory === 'top-rated') {
                if (b.average_rating !== a.average_rating) return (b.average_rating || 0) - (a.average_rating || 0);
                return (b.total_reviews || 0) - (a.total_reviews || 0);
            }
            if (sortBy === 'Ascending Value') return a.base_price - b.base_price;
            if (sortBy === 'Descending Value') return b.base_price - a.base_price;
            if (sortBy === 'Recent Discovery') return (b.product_id || 0) - (a.product_id || 0);
            return 0; // Default: Curated Flow (natural order)
        });

    return (
        <Layout>
            <div className="relative py-40 mb-20 overflow-hidden bg-dark-950 border-white/5">
                <div className="absolute inset-0 bg-[url('/images/ritual_pattern.png')] opacity-[0.03] scale-150"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-dark-950/20 via-transparent to-dark-950"></div>
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-500/[0.03] blur-[150px] rounded-full"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8 animate-fade-in">
                    <div className="space-y-4">
                        <span className="text-gold-500 font-bold tracking-[0.8em] uppercase text-[10px] italic block">The FolkMint Registry</span>
                        <h1 className="text-7xl md:text-9xl font-serif font-bold text-white tracking-tighter leading-none italic">The Living <span className="text-gradient drop-shadow-2xl">Archives</span></h1>
                    </div>
                    <p className="text-slate-300 max-w-2xl mx-auto font-serif text-xl md:text-2xl leading-relaxed italic opacity-90 border-l-2 border-gold-500/20 pl-12 pr-12 text-center inline-block">
                        Explore a world of authentic Bangladeshi traditional crafts, sourced from the soul of the delta.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-48">
                <div className="flex flex-col lg:row gap-16 lg:flex-row">
                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-dark-900/40 backdrop-blur-3xl p-10 sticky top-32 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-12 max-h-[calc(100vh-9rem)] flex flex-col overflow-hidden">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-white font-serif font-bold text-2xl italic tracking-tight">
                                    <Filter size={24} className="text-gold-500" />
                                    <h2>Discernment</h2>
                                </div>
                                <div className="w-12 h-1 bg-gold-500/30 rounded-full"></div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-400 text-[9px] uppercase tracking-[0.4em] italic pl-2">Vibration Search</h3>
                                <div className="relative group">
                                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Find heritage..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-16 pr-6 py-5 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white focus:ring-1 focus:ring-gold-500/40 focus:border-gold-500/40 outline-none transition-all placeholder:text-slate-500 font-serif italic"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6 flex flex-col min-h-0 flex-1">
                                <h3 className="font-bold text-slate-400 text-[9px] uppercase tracking-[0.4em] italic pl-2 flex-shrink-0">Ritual Domains</h3>
                                <ul className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                    <li>
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className={`block w-full text-left px-6 py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all duration-500 font-bold ${selectedCategory === null ? 'bg-gold-500 text-dark-950 shadow-[0_10px_30px_rgba(251,191,36,0.3)]' : 'text-slate-400 border border-white/5 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            All Archives
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setSelectedCategory('top-rated')}
                                            className={`block w-full text-left px-6 py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all duration-500 font-bold ${selectedCategory === 'top-rated' ? 'bg-white text-dark-950 shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-gold-500/60 border border-gold-500/10 hover:bg-gold-500/10 hover:text-gold-500'}`}
                                        >
                                            ⭐ Top Rated
                                        </button>
                                    </li>
                                    {isAuthenticated && recommendedIds.length > 0 && (
                                    <li>
                                        <button
                                            onClick={() => setSelectedCategory('you-may-love')}
                                            className={`block w-full text-left px-6 py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all duration-500 font-bold ${selectedCategory === 'you-may-love' ? 'bg-teal-500 text-dark-950 shadow-[0_10px_30px_rgba(20,184,166,0.3)]' : 'text-teal-400/60 border border-teal-500/10 hover:bg-teal-500/10 hover:text-teal-400'}`}
                                        >
                                            ❤️ For Your Vibration
                                        </button>
                                    </li>
                                    )}
                                    {parentCategories.map(cat => (
                                        <li key={cat.category_id}>
                                            <button
                                                onClick={() => setSelectedCategory(cat.category_id)}
                                                className={`block w-full text-left px-6 py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all duration-500 font-bold ${selectedCategory === cat.category_id ? 'bg-dark-950 text-gold-500 border border-gold-500/40 shadow-inner' : 'text-slate-400 border border-white/5 hover:bg-white/5 hover:text-white'}`}
                                            >
                                                {cat.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 space-y-16">
                        {error && (
                            <div className="p-8 bg-rose-500/5 border border-rose-500/10 text-rose-400 rounded-3xl flex items-center justify-between shadow-2xl animate-shake">
                                <span className="font-serif italic text-lg">The heritage archives are momentarily veiled in fog.</span>
                                <button onClick={() => window.location.reload()} className="text-[10px] font-bold tracking-[0.3em] uppercase border-b border-rose-500/20 pb-1 hover:border-rose-400 transition-all">Seek Re-entry</button>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 bg-dark-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
                            <p className="text-slate-300 font-serif italic text-lg">Revealing <span className="text-gold-500 font-black not-italic mx-2">{filteredProducts.length}</span> sacred artifacts</p>
                            <div className="relative group min-w-[240px]">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full appearance-none bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 focus:ring-1 focus:ring-gold-500/40 focus:border-gold-500/40 px-8 py-5 pr-14 outline-none cursor-pointer hover:bg-white/5 transition-all text-center italic"
                                >
                    <option value="Curated Flow" className="bg-dark-950">Curated Flow</option>
                                    <option value="Ascending Value" className="bg-dark-950">Ascending Value</option>
                                    <option value="Descending Value" className="bg-dark-950">Descending Value</option>
                                    <option value="Recent Discovery" className="bg-dark-950">Recent Discovery</option>
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 transition-colors group-hover:text-gold-500">
                                    <ArrowRight size={16} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-48 bg-dark-900/20 rounded-[4rem] border border-dashed border-white/5 animate-pulse">
                                <Loader2 className="animate-spin text-gold-500/40 mb-10" size={64} />
                                <p className="text-slate-600 font-serif italic text-2xl tracking-widest uppercase">Unveiling the Repository...</p>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.product_id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-48 bg-dark-900/20 rounded-[4rem] border border-dashed border-white/5 space-y-12">
                                <div className="space-y-4">
                                    <p className="text-slate-500 font-serif italic text-3xl">The archives are silent for this search.</p>
                                    <p className="text-slate-700 text-sm font-bold uppercase tracking-widest italic">Try another frequency of discovery.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(null);
                                        setSearchTerm('');
                                    }}
                                    className="gold-button px-16 py-5 text-[10px]"
                                >
                                    Reset Discovery Path
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
