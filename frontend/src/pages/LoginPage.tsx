import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    
    // Mouse movement state for parallax effect
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            // Calculate mouse position relative to center of container
            const x = (e.clientX - left - width / 2) / (width / 2);
            const y = (e.clientY - top - height / 2) / (height / 2);
            
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message || 'Invalid email or password');
        }

        setIsLoading(false);
    };

    return (
        <Layout>
            <div 
                ref={containerRef}
                className="min-h-[90vh] flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-dark-950"
            >
                {/* Parallax Background Layer */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none transition-transform duration-[1000ms] ease-out opacity-60"
                    style={{
                        backgroundImage: `url('/images/login-bg.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: `scale(1.15) translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
                        filter: 'brightness(0.5) contrast(1.2)'
                    }}
                />
                
                {/* Modern Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-dark-950 via-dark-950/40 to-transparent z-0 pointer-events-none" />

                <div className="max-w-md w-full space-y-10 bg-dark-900/40 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 z-10 relative animate-fade-in transition-all duration-500 hover:border-gold-500/20">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-gold-500/10 p-5 rounded-2xl backdrop-blur-md border border-gold-500/20 shadow-inner">
                                <LogIn className="text-gold-500" size={40} />
                            </div>
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-white tracking-tight">
                            Welcome <span className="text-gold-500">Back</span>
                        </h2>
                        <p className="mt-4 text-sm text-slate-400 font-medium">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-white hover:text-gold-400 underline underline-offset-4 decoration-white/20 hover:decoration-gold-500 transition-all font-bold">
                                Join our community
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-400 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-center animate-shake">
                                {error}
                            </div>
                        )}
                        <div className="space-y-5">
                            <div className="group">
                                <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1 group-focus-within:text-gold-500 transition-colors">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-5 py-4 bg-white/5 border border-white/10 placeholder-slate-600 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500/40 focus:border-gold-500/40 transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-1 group-focus-within:text-gold-500 transition-colors">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-5 py-4 bg-white/5 border border-white/10 placeholder-slate-600 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500/40 focus:border-gold-500/40 transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold py-4 rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg shadow-gold-500/10 flex items-center justify-center gap-2 group truncate"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        VERIFYING...
                                    </>
                                ) : (
                                    <>
                                        SIGN IN
                                        <div className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 italic font-serif">→</div>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};
