import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ProductCard } from '../components/ui/ProductCard';
import { products } from '../data/mockData';
import { ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

import { apiRequest, getImageUrl } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CategoryTile: React.FC<{ name: string; images: string[] }> = ({ name, images }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    React.useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="group relative h-[320px] overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl transition-all duration-700 hover:border-gold-500/30">
            {images.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt={name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[800ms] transform group-hover:scale-105 ${idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0'}`}
                />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent z-10 transition-all duration-700 group-hover:h-full group-hover:from-dark-950/60 group-hover:to-dark-950/10"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center z-20">
                <div className="mb-4 overflow-hidden">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight drop-shadow-2xl italic transform transition-transform duration-700 group-hover:-translate-y-2">{name}</h3>
                </div>
                <div className="w-12 h-1 bg-gold-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
                <p className="mt-6 text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 italic">Curated Collection</p>
            </div>
        </div>
    );
};

const HeroCarousel: React.FC = () => {
    const heroImages = [
        "/images/products/Screenshot-2025-09-06-184742.png",
        "/images/products/Gemini_Generated_Image_4pluo34pluo34plu.png",
        "/images/products/Gemini_Generated_Image_8zhtgl8zhtgl8zht.png",
        "/images/3_RumOBFr.webp"
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            {heroImages.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt="Bangladeshi Heritage"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ease-out transform scale-110 ${idx === currentIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-110'}`}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-transparent to-dark-950"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 via-transparent to-dark-950/60"></div>
            {/* Ambient Dust particles or glow could go here */}
        </div>
    );
};

export const HomePage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [topRated, setTopRated] = React.useState<any[]>([]);
    const [recommended, setRecommended] = React.useState<any[]>([]);
    const [isMapOpen, setIsMapOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchTopRated = async () => {
            const { success, data } = await apiRequest<any[]>('/products/top-rated?limit=4&min_reviews=1', { cacheTimeMs: 5000 });
            if (success && data) setTopRated(data);
        };
        const fetchRecommended = async () => {
            if (!isAuthenticated) return;
            try {
                const { success, data } = await apiRequest<any[]>('/products/recommendations?limit=4', { cacheTimeMs: 5000 });
                if (success && data && data.length > 0) setRecommended(data);
            } catch (e) {}
        };
        fetchTopRated();
        fetchRecommended();
    }, [isAuthenticated]);

    const categoryData = [
        {
            name: 'Home Sanctuary',
            images: [
                '/images/Gemini_Generated_Image_ty5znnty5znnty5z.png',
                '/images/Gemini_Generated_Image_6ztb2y6ztb2y6ztb.png',
                '/images/Gemini_Generated_Image_8zhtgl8zhtgl8zht.png'
            ]
        },
        {
            name: 'Earth & Clay',
            images: [
                '/images/Gemini_Generated_Image_3kkhxj3kkhxj3kkh.png',
                '/images/Gemini_Generated_Image_vda6tsvda6tsvda6.png',
                '/images/Gemini_Generated_Image_6b73oc6b73oc6b73.png'
            ]
        }
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden bg-dark-950">
                <HeroCarousel />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
                    <div className="max-w-4xl space-y-12">
                        <div className="space-y-4 animate-slide-up">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-gold-500/50"></div>
                                <span className="text-gold-500 font-bold tracking-[0.6em] uppercase text-[10px] italic">Ancestral Craftsmanship</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-[0.85]">
                                <span className="text-white block opacity-90 italic">The Living</span>
                                <span className="text-gradient drop-shadow-[0_20px_50px_rgba(251,191,36,0.15)]">Archives</span>
                            </h1>
                        </div>
                        
                        <p className="text-xl md:text-2xl text-slate-200 max-w-xl font-serif italic leading-relaxed animate-slide-up [animation-delay:200ms] opacity-90">
                            A curated sanctum of Bangladesh\'s finest Nakshi Kantha, Jamdani, and artisanal treasures, sourced from the soul of the delta.
                        </p>
                        
                        <div className="flex flex-wrap gap-8 items-center animate-slide-up [animation-delay:400ms]">
                            <Link to="/shop" className="gold-button px-10 py-4 text-sm">
                                Explore Registry <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link to="/about" className="text-white/40 hover:text-white font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center gap-4 group">
                                Our Ethos <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all group-hover:bg-gold-500/50"></div>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-pulse">
                    <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-gold-500 to-transparent"></div>
                    <span className="text-[9px] font-bold text-gold-500 uppercase tracking-widest italic">Descend</span>
                </div>
            </section>

            {/* Top Rated Crafts */}
            {topRated.length > 0 && (
            <section className="py-40 bg-dark-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/[0.02] blur-[150px] rounded-full"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                        <div className="space-y-4">
                            <span className="text-gold-500/70 text-[10px] font-bold uppercase tracking-[0.4em] italic mb-2 block">Top Rated</span>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white italic tracking-tight">Top Rated <span className="text-gold-500">Artifacts</span></h2>
                            <p className="text-slate-300 max-w-md font-serif italic text-lg opacity-90 leading-relaxed border-l-2 border-gold-500/20 pl-6">The most venerated masterworks, ranked by their celestial community rating.</p>
                        </div>
                        <Link to="/shop?category=top-rated" className="glass-button text-[10px]">View Top Rated</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {topRated.map(product => (
                            <ProductCard key={product.product_id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* Personalized Recommendations */}
            {isAuthenticated && recommended.length > 0 && (
            <section className="py-40 bg-dark-900/40 relative border-y border-white/5 overflow-hidden">
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-teal-500/[0.03] blur-[150px] rounded-full"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                        <div className="space-y-4">
                            <span className="text-teal-400/70 text-[10px] font-bold uppercase tracking-[0.4em] italic mb-2 block">Intuitive Discovery</span>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white italic tracking-tight">Spiritual <span className="text-teal-400">Resonance</span></h2>
                            <p className="text-slate-300 max-w-md font-serif italic text-lg opacity-90 leading-relaxed border-l-2 border-teal-500/20 pl-6">Curated specifically for your vibration.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {recommended.map(product => (
                            <ProductCard key={product.product_id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
            )}

            {/* Featured Categories */}
            <section className="py-40 bg-dark-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/ritual_pattern.png')] opacity-[0.02] mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                        <div className="space-y-4">
                            <span className="text-gold-500/70 text-[10px] font-bold uppercase tracking-[0.4em] italic mb-2 block">Curation Guild</span>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white italic tracking-tight">Ritual <span className="text-gold-500">Domains</span></h2>
                            <p className="text-slate-300 max-w-md font-serif italic text-lg opacity-90 leading-relaxed border-l-2 border-gold-500/20 pl-6">Handpicked collections from across the delta's veins.</p>
                        </div>
                        <Link to="/shop" className="text-gold-500 font-bold tracking-widest text-[10px] uppercase border-b border-gold-500/20 pb-2 hover:text-white hover:border-white transition-all italic">Explore Every Domain →</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {categoryData.map((cat, i) => (
                            <CategoryTile key={i} name={cat.name} images={cat.images} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-40 bg-dark-900/20 border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24 space-y-6">
                         <div className="flex items-center justify-center gap-6">
                            <div className="w-12 h-[1px] bg-white/10"></div>
                            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white italic tracking-tighter">Current <span className="text-gradient">Pulse</span></h2>
                            <div className="w-12 h-[1px] bg-white/10"></div>
                         </div>
                         <p className="text-slate-500 font-serif italic text-xl opacity-60">Artifacts currently influencing the flow.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {products.slice(0, 8).map(product => (
                            <ProductCard key={product.product_id} product={product} />
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <Link to="/shop" className="glass-button px-20 py-6 text-[11px] hover:bg-gold-500 hover:text-dark-950 hover:border-gold-500 group inline-flex items-center whitespace-nowrap">
                            Unveil the Full Registry <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sacred Destinations Section - Condensed */}
            <section className="py-24 bg-dark-950/20 relative border-t border-white/5 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
                     <div className="flex flex-col items-center gap-6">
                        <div className="w-12 h-[1px] bg-gold-500/20"></div>
                        <button 
                            onClick={() => setIsMapOpen(!isMapOpen)}
                            className="group flex flex-col items-center gap-4 transition-all"
                        >
                            <div className="w-20 h-20 rounded-full border border-gold-500/20 flex items-center justify-center bg-dark-900 shadow-2xl group-hover:bg-gold-500/10 group-hover:border-gold-500/50 transition-all duration-700">
                                <MapPin size={32} className={`text-gold-500 transition-transform duration-700 ${isMapOpen ? 'rotate-180 scale-110' : 'group-hover:scale-110'}`} />
                            </div>
                            <span className="text-gold-500 font-bold uppercase tracking-[0.5em] text-[10px] italic">Unveil Sacred Destinations</span>
                        </button>
                     </div>

                    {isMapOpen && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 animate-fade-in pt-12">
                        {[
                            { name: "Sajek Valley", image: "images/sajek.jpg", map: "https://maps.google.com/?q=Sajek+Valley" },
                            { name: "Rangamati", image: "images/rangamati.jpg", map: "https://maps.google.com/?q=Rangamati" },
                            { name: "Bandarban", image: "images/bandarban.jpg", map: "https://maps.google.com/?q=Bandarban" },
                            { name: "Cox's Bazar", image: "images/coxs_bazar.jpg", map: "https://maps.google.com/?q=Coxs+Bazar" },
                            { name: "Saint Martin's", image: "images/saint_martin.jpg", map: "https://maps.google.com/?q=Saint+Martin+Island" },
                            { name: "Sundarbans", image: "images/sundarbans.jpg", map: "https://maps.google.com/?q=Sundarbans" },
                            { name: "Srimangal", image: "images/srimangal.jpg", map: "https://maps.google.com/?q=Srimangal" },
                            { name: "Ratargul", image: "images/ratargul.jpg", map: "https://maps.google.com/?q=Ratargul+Swamp+Forest" },
                            { name: "Jaflong", image: "images/jaflong.jpg", map: "https://maps.google.com/?q=Jaflong" },
                            { name: "Paharpur", image: "images/paharpur.jpg", map: "https://maps.google.com/?q=Paharpur+Buddhist+Vihara" }
                        ].map((place, i) => (
                            <a 
                                key={i} 
                                href={place.map} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden h-[180px] rounded-[2rem] border border-white/5 transition-all hover:border-gold-500/30 hover:-translate-y-1 shadow-2xl flex flex-col justify-end p-6"
                            >
                                {/* Background Image with Fallback */}
                                <div className="absolute inset-0 z-0 bg-dark-900">
                                    <img 
                                        src={getImageUrl(`/${place.image}`)} 
                                        alt={place.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-70"
                                        onLoad={(e) => {
                                            (e.target as HTMLImageElement).classList.remove('opacity-0');
                                        }}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent"></div>
                                </div>

                                <div className="relative z-10 space-y-1">
                                    <h3 className="text-[10px] font-serif font-bold text-white italic tracking-tight group-hover:text-gold-500 transition-colors uppercase">{place.name}</h3>
                                    <p className="text-[8px] text-slate-400 font-serif italic truncate opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest">Explore Map →</p>
                                </div>
                            </a>
                        ))}
                    </div>
                    )}
                </div>
            </section>

            {/* Artisans Banner */}
            <section className="py-60 relative overflow-hidden bg-dark-950 border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-950 to-gold-500/[0.03]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold-500/[0.05] blur-[150px] rounded-full animate-pulse"></div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-12">
                    <div className="space-y-6">
                        <span className="text-gold-500/40 text-[10px] font-bold uppercase tracking-[0.8em] italic block">The Soul of the Forge</span>
                        <h2 className="text-6xl md:text-8xl font-serif font-bold text-white leading-[0.9] tracking-tighter italic">Empowering the <br/><span className="text-gradient">Rural Heartbeat.</span></h2>
                    </div>
                    
                    <p className="text-xl md:text-2xl text-slate-200 font-serif italic leading-relaxed max-w-3xl mx-auto opacity-95">
                        Every acquisition directly sustains the pulse of 500+ master craftsmen across the delta, preserving a thousand-year heritage within each weave and mold.
                    </p>
                    
                    <div className="pt-10">
                        <Link to="/about" className="group inline-flex flex-col items-center gap-6">
                            <span className="text-gold-500 font-bold uppercase tracking-[0.4em] text-[10px] hover:text-white transition-all duration-500">Our Sacred Chronicle</span>
                            <div className="w-16 h-16 rounded-full border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/50 transition-all duration-700">
                                <ArrowRight size={24} className="text-gold-500 transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    </div>
                </div>
                
                {/* Decorative Pattern Backdrop */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none overflow-hidden scale-150 rotate-12">
                    <div className="grid grid-cols-12 gap-8">
                        {Array.from({ length: 144 }).map((_, i) => (
                            <div key={i} className="w-full aspect-square border border-gold-500/20 rounded-full opacity-20"></div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};
