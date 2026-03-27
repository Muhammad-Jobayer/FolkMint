import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { User, Shield, Mail, Calendar, Loader2, ArrowLeft, Star, ShoppingBag, Award, Zap, CheckCircle } from 'lucide-react';
import { apiRequest, getImageUrl } from '../utils/api';

export const PublicProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            const { success, data } = await apiRequest<any>(`/user/p/${id}`);
            if (success) setProfile(data);
            setIsLoading(false);
        };
        fetchProfile();
    }, [id]);

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-[70vh] flex items-center justify-center">
                    <Loader2 className="animate-spin text-gold-500" size={48} />
                </div>
            </Layout>
        );
    }

    if (!profile) {
        return (
            <Layout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">Identity Not Found</h2>
                    <p className="text-slate-500 mb-8">This chronicle does not exist in our archives.</p>
                    <Link to="/" className="gold-button px-8 py-3">Return to Sanctuary</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-dark-950 py-20 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    {/* Back Button */}
                    <Link to="/shop" className="inline-flex items-center gap-2 text-slate-500 hover:text-gold-500 transition-colors mb-12 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to Bazaar</span>
                    </Link>

                    {/* Broad Profile Card */}
                    <div className="bg-dark-900/50 backdrop-blur-3xl border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl">
                        {/* Banner Area */}
                        <div className="h-48 bg-gradient-to-r from-dark-950 to-gold-950/20 relative">
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                             <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="px-12 pb-20 -mt-20">
                            <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
                                {/* Avatar */}
                                <div className="w-40 h-40 rounded-[3rem] bg-dark-950 border-4 border-dark-900 shadow-2xl overflow-hidden flex items-center justify-center relative group">
                                    {profile.profile_picture_url ? (
                                        <img 
                                            src={getImageUrl(profile.profile_picture_url)} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={64} className="text-slate-800" />
                                    )}
                                </div>

                                <div className="flex-1 text-center md:text-left pb-4">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight italic">
                                            {profile.first_name} <span className="text-gold-500">{profile.last_name}</span>
                                        </h1>
                                        <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 ${
                                            profile.role === 'seller' ? 'text-gold-500' : 'text-slate-400'
                                        }`}>
                                            {profile.role || 'customer'}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 font-serif italic text-lg opacity-80">
                                        Keeper of the FolkMint Legacy
                                    </p>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-8">
                                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2 italic">
                                            <Shield size={14} className="text-gold-500" /> Identity Credentials
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-center text-slate-600 group-hover:text-gold-500 transition-colors">
                                                    <Mail size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Correspondence</p>
                                                    <p className="text-white font-medium">{profile.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-dark-950 border border-white/5 flex items-center justify-center text-slate-600 group-hover:text-gold-500 transition-colors">
                                                    <Calendar size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Registry Date</p>
                                                    <p className="text-white font-medium">Ancient Member</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2 italic">
                                            <Award size={14} className="text-gold-500" /> Heritage Achievements
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            <div className="group relative">
                                                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-dark-950 transition-all duration-500 cursor-help">
                                                    <Shield size={20} />
                                                </div>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-32 p-3 bg-dark-950 border border-gold-500/20 rounded-xl text-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-20">
                                                    <p className="font-bold text-gold-500 mb-1">Legacy Guardian</p>
                                                    <p className="text-slate-500">A devoted keeper of ancient crafts.</p>
                                                </div>
                                            </div>

                                            {profile.role === 'seller' && (
                                                <div className="group relative">
                                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 cursor-help">
                                                       <Zap size={20} />
                                                    </div>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-32 p-3 bg-dark-950 border border-purple-500/20 rounded-xl text-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-20">
                                                        <p className="font-bold text-purple-400 mb-1">Masterisan</p>
                                                        <p className="text-slate-500">Exquisite creator of artifacts.</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="group relative">
                                                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-500 cursor-help">
                                                   <CheckCircle size={20} />
                                                </div>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-32 p-3 bg-dark-950 border border-teal-500/20 rounded-xl text-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-20">
                                                    <p className="font-bold text-teal-400 mb-1">Verified Identity</p>
                                                    <p className="text-slate-500">Credibility confirmed by the Registry.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2 italic">
                                            <Star size={14} className="text-gold-500" /> Reputation Registry
                                        </h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-gold-500 text-gold-500" />)}
                                        </div>
                                        <p className="text-slate-500 text-xs italic">Veracious Keeper of Authentic Artifacts</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl h-full flex flex-col justify-center text-center py-12">
                                        <div className="w-20 h-20 bg-gold-500/5 border border-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Shield size={32} className="text-gold-500 opacity-50" />
                                        </div>
                                        <h2 className="text-2xl font-serif font-bold text-white italic mb-4">Official <span className="text-gold-500">Seal</span></h2>
                                        <p className="text-slate-500 text-sm italic leading-relaxed px-6">
                                            This profile is verified by the FolkMint Central Registry as an authentic identity within the heritage marketplace.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {profile.role === 'seller' && (
                                <div className="mt-12 text-center">
                                    <Link 
                                        to={`/shop?seller=${profile.user_id}`} 
                                        className="gold-button w-full py-5 rounded-[2rem] text-sm flex items-center justify-center gap-3 group"
                                    >
                                        <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                                        Explore Artisan's Archive
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
