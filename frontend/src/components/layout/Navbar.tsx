import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, Menu, User, LogIn, X, Store, Shield, ChevronDown, Heart, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useHistory } from '../../context/HistoryContext';
import { getImageUrl, apiRequest } from '../../utils/api';

export const Navbar: React.FC = () => {
    const { itemCount } = useCart();
    const { isAuthenticated, isSeller, isAdmin, logout, user } = useAuth();
    const { wishlistItems } = useWishlist();
    const { history } = useHistory();
    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    
    const searchInputRef = useRef<HTMLInputElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const wishlistRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        apiRequest<any[]>('/categories').then(({ success, data }) => {
            if (success && data) setCategories(data);
        });
    }, []);

    const parentCategories = categories.filter(c => !c.parent_category);
    const getSubcategories = (parentId: number) => categories.filter(c => c.parent_category === parentId);

    // Focus search input when opened
    useEffect(() => {
        if (searchOpen) searchInputRef.current?.focus();
    }, [searchOpen]);

    // Close user menu on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
            if (wishlistRef.current && !wishlistRef.current.contains(e.target as Node)) {
                setWishlistOpen(false);
            }
            if (historyRef.current && !historyRef.current.contains(e.target as Node)) {
                setHistoryOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <nav className="sticky top-0 z-50 transition-all duration-500 border-b border-white/5 bg-dark-950/40 backdrop-blur-xl text-slate-100">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-24 items-center gap-0 max-w-full">
 
                     {/* Logo */}
                     <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group mr-8">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center transform group-hover:rotate-45 transition-all duration-500 border border-gold-500/20 bg-dark-900 shadow-lg shadow-gold-500/5">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-gold-400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                             </svg>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-2xl font-serif font-bold tracking-widest leading-none uppercase drop-shadow-sm text-white">Folk</span>
                            <span className="text-[10px] font-sans font-bold tracking-[0.4em] uppercase leading-none mt-1 text-gold-500/80">Mint</span>
                         </div>
                     </Link>
                     {/* Desktop Nav - 10 Categories spread to fill space */}
                     <div className="hidden lg:flex items-center flex-1 min-w-0 h-full">
                         <div className="flex items-center justify-between w-full h-full">

                             {/* Home link */}
                             <Link to="/" className="font-bold transition-all text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-white whitespace-nowrap flex-shrink-0 px-1">
                                 Home
                             </Link>

                             <div className="h-4 w-px bg-white/10 flex-shrink-0"></div>

                             {/* 10 Parent Categories - evenly spread */}
                             {parentCategories.slice(0, 10).map(parent => (
                                 <div key={parent.category_id} className="relative group h-full flex items-center flex-1 justify-center">
                                     <Link
                                         to={`/shop?category=${parent.category_id}`}
                                         className="font-bold transition-all text-[10px] uppercase tracking-tight hover:text-gold-400 whitespace-nowrap py-8 flex items-center opacity-80 group-hover:opacity-100 h-full text-center leading-tight px-1"
                                     >
                                         {parent.name.length > 10 ? parent.name.replace(' & ', '/').split(' ').slice(0, 2).join(' ') : parent.name}
                                     </Link>

                                     {/* Subcategory Dropdown */}
                                     <div className="absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] pt-2">
                                         <div className="bg-dark-950 border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] min-w-[200px] flex flex-col p-2 space-y-0.5">
                                             <div className="px-4 py-2 text-[8px] font-black uppercase tracking-[0.4em] text-gold-500/50 border-b border-white/5 mb-1">
                                                 {parent.name}
                                             </div>
                                             {getSubcategories(parent.category_id).length === 0 ? (
                                                 <div className="px-4 py-3 text-[9px] text-slate-500 italic text-center">No Subcategories</div>
                                             ) : (
                                                 getSubcategories(parent.category_id).map(sub => (
                                                     <Link
                                                         key={sub.category_id}
                                                         to={`/shop?category=${sub.category_id}`}
                                                         onClick={() => setMobileOpen(false)}
                                                         className="block px-4 py-2.5 text-[9px] font-bold text-slate-300 uppercase tracking-widest hover:bg-gold-500/5 hover:text-gold-400 rounded-xl transition-all whitespace-nowrap"
                                                     >
                                                         {sub.name}
                                                     </Link>
                                                 ))
                                             )}
                                         </div>
                                     </div>
                                 </div>
                             ))}

                             <div className="h-4 w-px bg-white/10 flex-shrink-0"></div>

                             {isSeller && (
                                 <Link to="/seller/dashboard" className="font-bold transition-all text-[9px] uppercase tracking-tight flex items-center gap-1 text-gold-500 hover:text-gold-300 whitespace-nowrap flex-shrink-0 px-1">
                                     <Store size={12} /> Shop
                                 </Link>
                             )}
                             {isAdmin && (
                                 <Link to="/admin" className="font-bold transition-all text-[9px] uppercase tracking-tight flex items-center gap-1 text-red-500 hover:text-red-400 whitespace-nowrap flex-shrink-0 px-1">
                                     <Shield size={12} /> Admin
                                 </Link>
                             )}
                         </div>
                     </div>

                     <div className="flex-shrink-0 w-2"></div>

 
                     {/* Right Icons */}
                     <div className="flex items-center gap-3 flex-shrink-0">
                         {/* Search */}
                         <div className="relative">
                             {searchOpen ? (
                                <form onSubmit={handleSearch} className="flex items-center gap-2 border border-white/10 rounded-xl px-3 py-2 backdrop-blur-md bg-dark-900/60">
                                     <Search className="flex-shrink-0 text-slate-400" size={16} />
                                     <input ref={searchInputRef} type="text" value={searchQuery}
                                         onChange={e => setSearchQuery(e.target.value)}
                                         placeholder="Search items..."
                                         className="bg-transparent outline-none text-sm w-40 text-white placeholder-slate-400" />
                                     <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                         className="transition-colors flex-shrink-0 text-slate-400 hover:text-white">
                                         <X size={16} />
                                     </button>
                                </form>
                             ) : (
                                 <button onClick={() => setSearchOpen(true)}
                                    className="hover:scale-110 transition-all p-1 text-slate-300 hover:text-gold-400">
                                     <Search className="h-5 w-5" />
                                 </button>
                             )}
                         </div>
 
                         {/* User Menu */}
                         {isAuthenticated ? (
                             <div ref={userMenuRef} className="relative">
                                 <button onClick={() => setUserMenuOpen(v => !v)}
                                 className="flex items-center gap-1.5 transition-all group text-slate-300 hover:text-white">
                                 <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 group-hover:border-gold-500/40 transition-all bg-white/5 flex items-center justify-center">
                                     {user?.profile_picture_url ? (
                                         <img
                                             src={getImageUrl(user.profile_picture_url)}
                                             alt="avatar"
                                             className="w-full h-full object-cover"
                                         />
                                     ) : (
                                         <User className="h-4 w-4" />
                                     )}
                                 </div>
                                 <ChevronDown size={12} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                             </button>
                                 {userMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/5 py-2 z-[200] bg-dark-900">
                                         <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-slate-200 hover:bg-white/5 hover:text-white">
                                             <User size={15} /> My Profile
                                         </Link>
                                         {isSeller && (
                                             <Link to="/seller/dashboard" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-gold-500 hover:bg-white/5">
                                                  <Store size={15} /> Seller Dashboard
                                             </Link>
                                         )}
                                         {!isSeller && (
                                             <Link to="/seller/signup" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-slate-200 hover:bg-white/5">
                                                  <Store size={15} /> Become a Seller
                                             </Link>
                                         )}
                                         {isAdmin && (
                                             <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-red-400 hover:bg-white/5">
                                                 <Shield size={15} /> Admin Panel
                                             </Link>
                                         )}
                                         <div className="border-t mt-2 pt-2 border-white/5">
                                             <button onClick={() => { logout(); setUserMenuOpen(false); }}
                                                className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-red-500 hover:bg-red-500/10">
                                                 Sign Out
                                             </button>
                                         </div>
                                     </div>
                                 )}
                             </div>
                         ) : (
                            <Link to="/login" className="hover:scale-105 transition-all flex items-center gap-2 group text-slate-300 hover:text-white">
                                 <LogIn className="h-5 w-5" />
                                <span className="hidden lg:inline text-sm font-bold uppercase tracking-wider">Login</span>
                            </Link>
                         )}
 
                         {/* Wishlist */}
                         {isAuthenticated && (
                             <div className="relative" ref={wishlistRef}>
                                 <button 
                                     onClick={() => { setWishlistOpen(!wishlistOpen); setHistoryOpen(false); setUserMenuOpen(false); }}
                                    className="hover:scale-110 transition-all relative p-1 text-slate-400 hover:text-white"
                                 >
                                     <Heart className={`h-5 w-5 ${wishlistItems.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                                     {wishlistItems.length > 0 && (
                                         <span className="absolute -top-1 -right-1 bg-gold-500 text-dark-950 text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center shadow-sm">
                                             {wishlistItems.length}
                                         </span>
                                     )}
                                 </button>
                                 
                                 {wishlistOpen && (
                                    <div className="absolute right-0 top-full mt-3 w-72 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/5 z-[200] bg-dark-900">
                                        <div className="p-4 border-b border-white/5 bg-white/5 text-white">
                                             <h3 className="text-xs font-bold uppercase tracking-widest text-gold-500">Loved Crafts</h3>
                                            <Link to="/profile?tab=wishlist" onClick={() => setWishlistOpen(false)} className="text-[10px] underline text-slate-500 hover:text-white">View All</Link>
                                         </div>
                                         <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                             {wishlistItems.length === 0 ? (
                                                 <div className="p-8 text-center">
                                                     <Heart className="mx-auto mb-2 text-white/10" size={32} />
                                                     <p className="text-xs text-slate-500">Your wishlist is empty</p>
                                                 </div>
                                             ) : (
                                                 <div className="divide-y divide-white/5">
                                                     {wishlistItems.slice(0, 5).map(item => (
                                                         <Link key={item.product_id} to={`/product/${item.product_id}`} onClick={() => setWishlistOpen(false)}
                                                            className="flex items-center gap-3 p-3 transition-colors hover:bg-white/5">
                                                             <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-dark-800">
                                                                 <img src={getImageUrl(item.main_image || "/images/1_lRUm2IW.webp")} alt="" className="w-full h-full object-cover" />
                                                             </div>
                                                             <div className="flex-1 min-w-0">
                                                                 <p className="text-xs font-bold truncate text-white">{item.name}</p>
                                                                 <p className="text-[10px] mt-0.5 text-gold-500/80">৳{item.base_price.toLocaleString()}</p>
                                                             </div>
                                                         </Link>
                                                     ))}
                                                 </div>
                                             )}
                                         </div>
                                     </div>
                                 )}
                             </div>
                         )}
 
                         {/* Browsing History - only for logged-in users */}
                         {isAuthenticated && (
                         <div className="relative" ref={historyRef}>
                             <button 
                                 onClick={() => { setHistoryOpen(!historyOpen); setWishlistOpen(false); setUserMenuOpen(false); }}
                                className="hover:scale-110 transition-all p-1 text-slate-400 hover:text-white"
                             >
                                 <Clock className="h-5 w-5" />
                             </button>
                             
                             {historyOpen && (
                                <div className="absolute right-0 top-full mt-3 w-72 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/5 z-[200] bg-dark-900">
                                    <div className="p-4 border-b border-white/5 bg-white/5 text-white">
                                         <h3 className="text-xs font-bold uppercase tracking-widest text-gold-500">Recent History</h3>
                                     </div>
                                     <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                         {history.length === 0 ? (
                                             <div className="p-8 text-center">
                                                 <Clock className="mx-auto mb-2 text-white/10" size={32} />
                                                 <p className="text-xs text-slate-500">No browsing history yet</p>
                                             </div>
                                         ) : (
                                             <div className="divide-y divide-white/5">
                                                 {history.map(item => (
                                                     <Link key={item.id} to={`/product/${item.id}`} onClick={() => setHistoryOpen(false)}
                                                        className="flex items-center gap-3 p-3 transition-colors hover:bg-white/5">
                                                         <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-dark-800">
                                                             <img src={getImageUrl(item.image)} alt="" className="w-full h-full object-cover" />
                                                         </div>
                                                         <div className="flex-1 min-w-0">
                                                             <p className="text-xs font-bold truncate text-white">{item.name}</p>
                                                             <p className="text-[10px] mt-0.5 text-gold-500/80">৳{item.price.toLocaleString()}</p>
                                                         </div>
                                                     </Link>
                                                 ))}
                                             </div>
                                         )}
                                     </div>
                                 </div>
                             )}
                         </div>
                         )}
 
                         {/* Cart */}
                         <Link to="/cart" className="hover:scale-110 transition-all relative text-slate-400 hover:text-white">
                             <ShoppingBag className="h-5 w-5" />
                             {itemCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 text-dark-950 text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-lg bg-gold-500">
                                     {itemCount}
                                 </span>
                             )}
                         </Link>
 
                         {/* Mobile Menu */}
                         <button className="transition-all md:hidden text-slate-400 hover:text-white"
                             onClick={() => setMobileOpen(v => !v)}>
                            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                         </button>
                     </div>
                 </div>
 
                 {/* Mobile Menu */}
                 {mobileOpen && (
                    <div className="md:hidden border-t py-4 space-y-1 backdrop-blur-2xl bg-dark-950/90 border-white/5">
                          {[
                             { to: '/', label: 'Home' },
                             { to: '/shop', label: 'Shop' },
                             { to: '/about', label: 'About' },
                          ].map(l => (
                              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                                 className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-slate-300 hover:bg-white/5 hover:text-white">
                                  {l.label}
                              </Link>
                          ))}

                          {/* Mobile Categories */}
                          <div className="px-4 py-4 space-y-2 border-t border-white/5 mt-4">
                              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-500/60 pb-2">The Registry</p>
                              <div className="grid grid-cols-2 gap-2">
                                  {parentCategories.map(cat => (
                                      <Link key={cat.category_id} to={`/shop?category=${cat.category_id}`} onClick={() => setMobileOpen(false)}
                                          className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-gold-400">
                                          {cat.name}
                                      </Link>
                                  ))}
                              </div>
                          </div>
                         {isSeller && (
                             <Link to="/seller/dashboard" onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-gold-500 hover:bg-white/5">
                                 My Shop
                             </Link>
                         )}
                         {isAdmin && (
                             <Link to="/admin" onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-red-400 hover:bg-white/5">
                                 Admin Panel
                             </Link>
                         )}
                         {!isAuthenticated && (
                             <Link to="/seller/signup" onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-slate-500 hover:bg-white/5">
                                 Become a Seller
                             </Link>
                         )}
                     </div>
                 )}
             </div>
         </nav>
    );
};
