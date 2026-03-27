import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Users, Heart, Leaf } from 'lucide-react';

export const AboutPage: React.FC = () => {
    return (
        <Layout>
            {/* Header Section */}
            <div className="bg-dark-950 py-32 relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/images/ritual_pattern.png')] opacity-[0.03] scale-150"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full"></div>
                
                <div className="relative z-10 space-y-6 animate-fade-in">
                    <span className="text-gold-500 font-bold tracking-[0.6em] uppercase text-[10px] italic">The FolkMint Chronicle</span>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-white tracking-tighter leading-none italic">Our <span className="text-gradient drop-shadow-2xl">Genesis</span></h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-serif italic leading-relaxed opacity-80 decoration-gold-500/20 underline-offset-8">
                        FolkMint is a sacred bridge between the master rural artisans of Bangladesh and the global pulse, preserving a thousand-year heritage through the forge of fair trade.
                    </p>
                </div>
            </div>

            {/* Heritage Section */}
            <section className="py-40 bg-dark-950 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gold-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative h-[650px] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5">
                                <img
                                    src="/images/artisian.jpg"
                                    alt="Bangladeshi Artisan"
                                    className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-dark-950/20 group-hover:bg-dark-950/10 transition-colors"></div>
                                <div className="absolute bottom-10 left-10 p-8 bg-dark-950/80 backdrop-blur-xl border border-white/5 rounded-3xl max-w-xs shadow-2xl transform transition-transform group-hover:translate-x-4">
                                    <p className="text-xs font-bold text-gold-500 uppercase tracking-widest italic mb-2">The Hands of Heritage</p>
                                    <p className="text-white text-sm font-serif italic opacity-80 leading-relaxed">Every weave tells a story that mass production will never understand.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-5xl font-serif font-bold text-white tracking-tight italic">Preserving the <span className="text-gold-500">Ancient Pulse</span></h2>
                                <p className="text-slate-400 text-lg font-serif italic leading-loose opacity-80 border-l-2 border-gold-500/20 pl-8">
                                    Bangladesh breathes through a rich tapestry of craftsmanship—from the celestial translucence of Jamdani to the deep, soul-infused needlework of Nakshi Kantha. In a world of fleeting disposability, these ancestral rhythms are at risk of falling silent.
                                </p>
                                <p className="text-slate-400 text-lg font-serif italic leading-loose opacity-80 border-l-2 border-gold-500/20 pl-8">
                                    We align specifically with over 500 master craftsmen across 12 sacred districts, ensuring they receive the veneration and fair wages their lineage deserves. Every acquisition is a vow to keep these traditions exhaling.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
                                    {[
                                        { value: '500+', label: 'Artisans', icon: Users, color: 'text-gold-500 bg-gold-500/10 border-gold-500/40 shadow-gold-500/5' },
                                        { value: '100%', label: 'Human Made', icon: Heart, color: 'text-teal-400 bg-teal-400/10 border-teal-400/40 shadow-teal-400/5' },
                                        { value: '12', label: 'Districts', icon: Leaf, color: 'text-rose-400 bg-rose-400/10 border-rose-400/40 shadow-rose-400/5' },
                                    ].map((stat, i) => (
                                        <div key={i} className="p-8 bg-dark-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center group hover:border-gold-500/30 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border-2 ${stat.color} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                                                <stat.icon size={24} />
                                            </div>
                                            <div className="text-4xl font-bold text-white mb-2 italic tracking-tighter drop-shadow-lg">{stat.value}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] italic">{stat.label}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-40 bg-dark-900/20 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-transparent opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-32 space-y-6">
                        <span className="text-gold-500/40 text-[10px] font-bold uppercase tracking-[0.8em] italic block">Our Pillars</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-bold text-white italic tracking-tighter leading-none">The FolkMint <span className="text-gradient">Ethos</span></h2>
                        <div className="w-24 h-1 bg-gold-500/30 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Users,
                                title: "Communal Sovereignty",
                                desc: "Empowering rural lineages, particularly our sisters in skill, by providing the financial independence necessary to weave their own destinies.",
                                iconColor: "text-gold-500",
                                shadowColor: "shadow-gold-500/10"
                            },
                            {
                                icon: Leaf,
                                title: "Sacred Stewardship",
                                desc: "Sourcing exclusively with eco-conscious materials—jute, bamboo, and unrefined cotton—ensuring our rhythm honors the earth that birthed it.",
                                iconColor: "text-teal-400",
                                shadowColor: "shadow-teal-400/10"
                            },
                            {
                                icon: Heart,
                                title: "Primal Authenticity",
                                desc: "A covenant of genuine human artistry. No algorithmic imitations, no soulless machinery—just the pure, raw vibration of the artisan.",
                                iconColor: "text-rose-400",
                                shadowColor: "shadow-rose-400/10"
                            }
                        ].map((value, i) => (
                            <div key={i} className="bg-dark-900/60 backdrop-blur-3xl border border-white/5 p-12 rounded-[4rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] text-center group flex flex-col items-center transition-all hover:border-gold-500/20 hover:-translate-y-2 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.02] blur-3xl rounded-full"></div>
                                <div className={`w-24 h-24 bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex items-center justify-center mb-10 transition-all duration-700 group-hover:scale-110 shadow-2xl ${value.shadowColor}`}>
                                    <value.icon size={40} className={`${value.iconColor} transition-all duration-700 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-white mb-6 italic tracking-tight group-hover:text-gold-400 transition-colors drop-shadow-md">{value.title}</h3>
                                <p className="text-slate-300 font-serif italic leading-relaxed text-base opacity-90 border-t border-white/5 pt-6 mt-2">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};
