import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Store, User, Mail, Lock, MapPin, Sparkles, ChevronRight, Loader2 } from 'lucide-react';

const CATEGORIES = [
    'Textiles & Fabrics', 'Bamboo Craft', 'Pottery & Clay', 'Home Decor',
    'Folk Jewelry', 'Wooden Craft', 'Stone Craft', 'Folk Musical Instruments', 'Handicraft', 'Art'
];

export const SellerSignupPage: React.FC = () => {
    const { sellerSignup } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
        address: '', shopName: '', bio: '', category: CATEGORIES[0], passkey: '',
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / 50;
        const moveY = (clientY - window.innerHeight / 2) / 50;
        setMousePos({ x: moveX, y: moveY });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setError('');
    };

    const handleStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
        if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const result = await sellerSignup({
            firstName: form.firstName, lastName: form.lastName, email: form.email,
            password: form.password, address: form.address,
            shopName: form.shopName, bio: form.bio, category: form.category,
            passkey: form.passkey,
        });
        setIsLoading(false);
        if (result.success) {
            navigate('/login?msg=seller-registered');
        } else {
            setError(result.message || 'Registration failed');
        }
    };

    return (
        <Layout>
            <div className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden bg-dark-950" onMouseMove={handleMouseMove}>
                {/* Immersive Background */}
                <div 
                    className="absolute inset-0 bg-[url('/images/Screenshot-2025-09-06-184742.png')] bg-cover bg-center transition-transform duration-500 ease-out scale-110 opacity-30 pointer-events-none"
                    style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-950 via-dark-950/80 to-dark-950/20 pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="w-full max-w-xl relative z-10 animate-fade-in">
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4">
                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/5 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] mb-4 text-slate-400 backdrop-blur-xl">
                            <Store size={14} className="text-gold-500" /> Become a <span className="text-white italic">Proprietor</span>
                        </div>
                        <h1 className="text-5xl font-serif font-bold text-white tracking-tight italic">Forge Your <span className="text-gold-500">Legacy</span></h1>
                        <p className="text-slate-400 font-serif italic text-lg opacity-70">Enshrine your craft in the annals of FolkMint.</p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex items-center justify-center gap-6 mb-12 px-12">
                        {[1, 2].map(s => (
                            <React.Fragment key={s}>
                                <div className="flex flex-col items-center gap-2 group flex-1">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-700 ${step >= s ? 'bg-gold-500 text-dark-950 shadow-[0_10px_30px_rgba(251,191,36,0.3)]' : 'bg-white/5 text-slate-600 border border-white/5'}`}>
                                        {s}
                                    </div>
                                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] italic transition-colors ${step >= s ? 'text-gold-500' : 'text-slate-700'}`}>
                                        {s === 1 ? 'Archetype' : 'Sanctuary'}
                                    </span>
                                </div>
                                {s < 2 && <div className={`w-20 h-[1px] transition-all duration-700 mb-6 ${step > s ? 'bg-gold-500/50' : 'bg-white/10'}`} />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="bg-dark-900/40 backdrop-blur-3xl rounded-[4rem] border border-white/5 p-12 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/[0.02] blur-3xl rounded-full"></div>
                        
                        {error && (
                            <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-center animate-shake uppercase tracking-widest italic">{error}</div>
                        )}

                        {step === 1 ? (
                            <form onSubmit={handleStep1} className="space-y-8 animate-slide-up">
                                <h2 className="text-[10px] font-bold text-slate-500 flex items-center gap-3 mb-6 uppercase tracking-[0.4em] italic">
                                    <User size={16} className="text-gold-500" /> Account Manifest
                                </h2>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">Ancestral Name</label>
                                        <input type="text" name="firstName" required value={form.firstName} onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-serif italic transition-all shadow-inner" placeholder="First" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">Surname</label>
                                        <input type="text" name="lastName" required value={form.lastName} onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-serif italic transition-all shadow-inner" placeholder="Last" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">Electronic Mail</label>
                                    <div className="relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                        <input type="email" name="email" required value={form.email} onChange={handleChange}
                                            className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-serif italic transition-all shadow-inner" placeholder="artisan@folkmint.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">Geographic Coordinates</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                        <input type="text" name="address" required value={form.address} onChange={handleChange}
                                            className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-serif italic transition-all shadow-inner" placeholder="Your Forge's Location" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">Cipher</label>
                                        <div className="relative">
                                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                            <input type="password" name="password" required value={form.password} onChange={handleChange}
                                                className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm transition-all shadow-inner" placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">Verify</label>
                                        <input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange}
                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm transition-all shadow-inner" placeholder="••••••••" />
                                    </div>
                                </div>
                                <button type="submit" className="gold-button w-full py-5 text-[11px] group">
                                    Advance to Sanctuary <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
                                <h2 className="text-[10px] font-bold text-slate-500 flex items-center gap-3 mb-6 uppercase tracking-[0.4em] italic">
                                    <Sparkles size={16} className="text-gold-500" /> Forge Registry
                                </h2>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">Designation of the Shop</label>
                                    <div className="relative">
                                        <Store className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                        <input type="text" name="shopName" required value={form.shopName} onChange={handleChange}
                                            placeholder="e.g. Moonlight Weaving Guild"
                                            className="w-full pl-14 pr-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-serif italic transition-all shadow-inner" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">Primary Discipline</label>
                                    <select name="category" value={form.category} onChange={handleChange}
                                        className="w-full px-8 py-4 bg-white/[0.03] border border-white/5 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-bold tracking-widest uppercase shadow-inner cursor-pointer appearance-none transition-all hover:bg-white/[0.05]">
                                        {CATEGORIES.map(c => <option key={c} value={c} className="bg-dark-900 text-white font-sans">{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest italic pl-1">The Artisan Narrative</label>
                                    <textarea name="bio" required value={form.bio} onChange={handleChange} rows={4}
                                        placeholder="Chronicle the essence of your craft, the lineage of your work, and the soul you imbue into every artifact..."
                                        className="w-full px-8 py-5 bg-white/[0.03] border border-white/5 rounded-3xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-serif italic leading-relaxed transition-all shadow-inner resize-none placeholder:opacity-20" />
                                </div>
                                <div className="bg-gold-500/[0.03] p-8 rounded-[2.5rem] border border-gold-500/10 space-y-4">
                                    <label className="block text-[10px] font-bold text-gold-500 uppercase tracking-[0.3em] italic flex items-center gap-3">
                                        <Lock size={14} /> Sacred Passkey
                                    </label>
                                    <input type="password" name="passkey" required value={form.passkey} onChange={handleChange}
                                        placeholder="The hidden key of the trade"
                                        className="w-full px-8 py-4 bg-dark-950 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 outline-none text-white text-sm font-serif italic shadow-2xl transition-all" />
                                    <p className="text-[9px] text-slate-600 uppercase tracking-widest italic font-bold">Imprinted by the Ministry of Folk Arts for verified craftsmen.</p>
                                </div>
                                <div className="flex flex-col gap-6 pt-4">
                                    <button type="submit" disabled={isLoading}
                                        className="gold-button w-full py-5 text-[11px] flex items-center justify-center gap-4 group">
                                        {isLoading ? <><Loader2 size={18} className="animate-spin text-dark-950" /> INAUGURATING SHOP...</> : <><Store size={18} /> OPEN THE ARCHIVE GATE</>}
                                    </button>
                                    <button type="button" onClick={() => setStep(1)}
                                        className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white transition-all italic underline-offset-[10px] underline decoration-white/10">
                                        ← Recalibrate Manifesto
                                    </button>
                                </div>
                            </form>
                        )}

                        <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest mt-12 font-bold italic">
                            Already part of the Guild?{' '}
                            <Link to="/login" className="text-gold-500 hover:text-white hover:underline transition-all underline-offset-4 font-black">Re-access Vault</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
