import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../utils/api';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        const { success, message: resMsg } = await apiRequest('/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });

        if (success) {
            setStatus('success');
            setMessage(resMsg || 'Successfully joined!');
            setEmail('');
        } else {
            setStatus('error');
            setMessage(resMsg || 'Failed to join. Please try again.');
        }

        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <footer className="bg-dark-950 text-slate-200 pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full -translate-y-1/2"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-4xl font-serif font-bold text-white mb-8 tracking-tighter">FOLK<span className="text-gold-500">MINT</span></h3>
                        <p className="text-slate-400 mb-10 font-sans italic leading-relaxed text-lg">
                            Preserving the heritage of Bangladesh. Every piece is a story of tradition, directly from the artisan's hands to yours.
                        </p>
                        <div className="flex space-x-6">
                            {[
                                { Icon: Facebook, href: "https://www.facebook.com/muhammad.jobayer.528729" },
                                { Icon: Twitter, href: "https://twitter.com/folkmint" },
                                { Icon: Instagram, href: "https://www.instagram.com/jobayer0606/" },
                                { Icon: Youtube, href: "https://youtube.com/@muhammadjobayer5206?si=vV6oGT15ql1Vs-kk" }
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer" 
                                   className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all duration-300">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.3em]">Curated Shop</h4>
                        <ul className="space-y-5">
                            <li><Link to="/shop?category=textiles" className="text-slate-400 hover:text-gold-400 transition-all flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-all"></div> Textiles & Fabrics</Link></li>
                            <li><Link to="/shop?category=pottery" className="text-slate-400 hover:text-gold-400 transition-all flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-all"></div> Terracotta Pottery</Link></li>
                            <li><Link to="/shop?category=bamboo" className="text-slate-400 hover:text-gold-400 transition-all flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-all"></div> Bamboo Craft</Link></li>
                            <li><Link to="/shop" className="text-slate-400 hover:text-gold-400 transition-all flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-all"></div> New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.3em]">Our Community</h4>
                        <ul className="space-y-5">
                            <li><Link to="/about" className="text-slate-400 hover:text-gold-400 transition-all flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-all"></div> Meet the Artisans</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-gold-400 transition-all flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-all"></div> Heritage Stories</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-gold-400 transition-all flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-all"></div> Sustainability</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-gold-400 transition-all flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-gold-500/0 group-hover:bg-gold-500 transition-all"></div> Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-white mb-8 uppercase text-xs tracking-[0.3em]">Join the Heritage</h4>
                        <p className="text-slate-400 mb-8 text-sm leading-relaxed italic">Sign up for exclusive access to rare craft drops and artisan stories.</p>
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    disabled={status === 'loading'}
                                    className="bg-white/5 border border-white/10 px-5 py-3.5 w-full rounded-xl focus:outline-none focus:border-gold-500/50 text-white placeholder:text-slate-600 transition-all disabled:opacity-50"
                                />
                                <button 
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-gold-500 text-dark-950 px-6 py-3.5 rounded-xl font-bold hover:bg-gold-400 transition-all flex items-center gap-2 justify-center active:scale-95 shadow-lg shadow-gold-500/10"
                                >
                                    {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : 'SUBSCRIBE'}
                                </button>
                            </div>
                            {status !== 'idle' && (
                                <p className={`text-xs font-bold uppercase tracking-widest text-center mt-2 ${status === 'success' ? 'text-teal-400' : 'text-red-400'}`}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-[10px] tracking-[0.2em] uppercase font-bold">
                    <p>&copy; {new Date().getFullYear()} FOLKMINT. CRAFTED WITH SOUL IN BANGLADESH.</p>
                    <div className="flex gap-10">
                        <Link to="/about" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
                        <Link to="/about" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
                        <Link to="/about" className="hover:text-gold-500 transition-colors">Shipping Info</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
