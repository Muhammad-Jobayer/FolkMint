import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, ClipboardList, Loader2, Shield, Lock, MapPin } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// Card type detection
const detectCardType = (num: string) => {
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'Amex';
    return null;
};

const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
};

const STEPS = [
    { label: 'Shipping', icon: Truck },
    { label: 'Payment', icon: CreditCard },
    { label: 'Review', icon: ClipboardList },
];

export const CheckoutPage: React.FC = () => {
    const { items, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [orderNum, setOrderNum] = useState('');

    const [shipping, setShipping] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', zip: '', lat: 23.8103, lng: 90.4125 }); // Default to Dhaka
    const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvv: '', cardName: '' });

    // Google Maps API Loader (Update with private key in .env later)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "" // Placeholder. User should provide their key.
    });

    const [mapMarker, setMapMarker] = useState({ lat: 23.8103, lng: 90.4125 });

    const onMapClick = async (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setMapMarker({ lat, lng });
            setShipping(p => ({ ...p, lat, lng }));
            
            // Reverse Geocoding would happen here with a valid API key
            // For now, we'll mark the coordinates in the address field as well
            setShipping(p => ({ ...p, address: `Selected via Map (${lat.toFixed(4)}, ${lng.toFixed(4)})` }));
            showToast("Coordinate selection preserved", "success");
        }
    };

    const cardType = detectCardType(payment.cardNumber.replace(/\s/g, ''));
    const total = cartTotal * 1.05;

    const handleShipping = (e: React.FormEvent) => { 
        e.preventDefault(); 
        if (!user) {
            showToast("Please login to continue checkout", "info");
            navigate('/login');
            return;
        }
        setStep(2); 
    };
    
    const handlePayment = (e: React.FormEvent) => { e.preventDefault(); setStep(3); };

    const handleConfirm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        setIsProcessing(true);
        
        let expMonth = '12';
        let expYear = '2030';
        if (payment.expiry.includes('/')) {
            const parts = payment.expiry.split('/');
            expMonth = parts[0] || '12';
            expYear = parts[1] ? `20${parts[1]}` : '2030';
        }

        const safeCardNumber = payment.cardNumber.replace(/\s/g, '');
        const last4 = safeCardNumber.length >= 4 ? safeCardNumber.slice(-4) : safeCardNumber.padStart(4, '0');

        const payload = {
            items: items.map(i => ({ 
                variant_id: i.variant_id, 
                quantity: i.quantity, 
                price: Number(i.price) 
            })),
            payment_method: { 
                card_last4: last4, 
                type: cardType || 'Card', 
                expiry_date: `${expYear}-${expMonth}-01` 
            }
        };

        const { success, data, error } = await apiRequest<any>('/checkout', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (success && data) {
            setOrderNum(`FM-${data.order_id || Math.floor(10000 + Math.random() * 90000)}`);
            clearCart();
            setIsSubmitted(true);
            showToast("Order placed successfully!", "success");
        } else {
            showToast(error || "Failed to process order", "error");
        }
        
        setIsProcessing(false);
    };

    if (items.length === 0 && !isSubmitted) {
        return (
            <Layout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center bg-dark-950 px-4 text-center">
                    <div className="w-24 h-24 bg-gold-500/10 rounded-full flex items-center justify-center mb-8 border border-gold-500/20 shadow-2xl scale-110">
                        <Lock className="text-gold-500/50" size={40} />
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-white mb-6 tracking-tight">Access Restricted</h2>
                    <p className="text-slate-500 mb-10 max-w-sm text-lg italic italic leading-relaxed">
                        The heritage archives are currently empty. Please select your treasures before checkout.
                    </p>
                    <Link to="/shop" className="glass-button px-12">
                        Collect Treasures
                    </Link>
                </div>
            </Layout>
        );
    }

    if (isSubmitted) {
        return (
            <Layout>
                <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in bg-dark-950 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10 space-y-12">
                        <div className="w-40 h-40 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(251,191,36,0.15)] group hover:scale-110 transition-transform duration-700">
                            <CheckCircle className="text-gold-500 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" size={80} />
                        </div>
                        
                        <div className="space-y-4">
                            <h2 className="text-6xl font-serif font-bold text-white tracking-tighter">Legacy <span className="text-gradient">Acquired</span></h2>
                            <p className="text-slate-400 text-xl italic font-serif opacity-80">A testament to your exquisite taste in heritage.</p>
                        </div>

                        <div className="bg-dark-900 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-md mx-auto relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">ARCHIVE REFERENCE</p>
                            <div className="text-4xl font-bold text-white tracking-widest font-mono">
                                {orderNum}
                            </div>
                        </div>

                        <p className="text-slate-500 text-sm max-w-sm mx-auto italic leading-relaxed border-l border-gold-500/20 pl-6">
                            Confirmation ritual dispatched to <strong className="text-slate-300">{shipping.email || user?.email}</strong>. Integration into your collection within 5–7 phases.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <Link to="/" className="w-full sm:w-auto bg-gold-500 text-dark-950 px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/10 active:scale-95">Return to Sanctuary</Link>
                            <Link to="/profile" className="w-full sm:w-auto bg-white/5 text-slate-400 px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 hover:text-white transition-all border border-white/5">Order Chronicles</Link>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-dark-950">
                <div className="text-center mb-20 space-y-4">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">Finalizing <span className="text-gold-500">Selection</span></h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Step through the ritual of acquisition</p>
                </div>

                <div className="flex items-center justify-center mb-20 gap-4 sm:gap-0">
                    {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        const stepNum = i + 1;
                        const active = step === stepNum;
                        const done = step > stepNum;
                        return (
                            <React.Fragment key={s.label}>
                                <div className="flex flex-col items-center gap-4 relative">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 relative z-10 border ${
                                        done ? 'bg-teal-500 border-teal-500 text-dark-950 shadow-[0_0_30px_rgba(20,184,166,0.3)]' : 
                                        active ? 'bg-gold-500 border-gold-500 text-dark-950 shadow-[0_0_30px_rgba(251,191,36,0.3)] scale-110' : 
                                        'bg-dark-900 border-white/5 text-slate-700'
                                    }`}>
                                        {done ? <CheckCircle size={24} /> : <Icon size={24} />}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${active ? 'text-gold-500 scale-105' : 'text-slate-600'}`}>{s.label}</span>
                                </div>
                                {i < 2 && (
                                    <div className="flex-1 max-w-[4rem] sm:max-w-[8rem] h-px mx-4 mt-[-28px] relative">
                                        <div className="absolute inset-0 bg-white/5"></div>
                                        <div className={`absolute inset-0 bg-gradient-to-r from-gold-500/50 to-teal-500/50 transition-all duration-1000 origin-left ${done ? 'scale-x-100' : 'scale-x-0'}`}></div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <div className="bg-dark-900/40 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-12 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/5 blur-[80px] rounded-full group-hover:bg-gold-500/10 transition-all"></div>
                            
                            {step === 1 && (
                                <form onSubmit={handleShipping} className="space-y-8 animate-fade-in relative z-10">
                                    <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-8">
                                        <h2 className="text-3xl font-serif font-bold text-white flex items-center gap-4 italic tracking-tight"><Truck size={28} className="text-gold-500" /> Delivery Coordinates</h2>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hidden sm:block">Establishing heritage path</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Given Name</label>
                                            <input required value={shipping.firstName} onChange={e => setShipping(p => ({...p, firstName: e.target.value}))}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm transition-all shadow-inner" placeholder="E.g. Arshad" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Ancestral Title</label>
                                            <input required value={shipping.lastName} onChange={e => setShipping(p => ({...p, lastName: e.target.value}))}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm transition-all shadow-inner" placeholder="E.g. Khan" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Digital Correspondence</label>
                                        <input type="email" required value={shipping.email} onChange={e => setShipping(p => ({...p, email: e.target.value}))}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm italic transition-all shadow-inner" placeholder="arshad@heritage.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Vocal Link</label>
                                        <input type="tel" required value={shipping.phone} onChange={e => setShipping(p => ({...p, phone: e.target.value}))}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm transition-all shadow-inner" placeholder="+880 1XXX-XXXXXX" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Arrival Point</label>
                                        
                                        {/* Google Map Implementation */}
                                        <div className="w-full h-72 rounded-[2rem] overflow-hidden border border-white/10 group/map relative mb-6 bg-dark-950">
                                            {isLoaded ? (
                                                <GoogleMap
                                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                                    center={mapMarker}
                                                    zoom={12}
                                                    onClick={onMapClick}
                                                    options={{
                                                        styles: [
                                                            { "elementType": "geometry", "stylers": [{ "color": "#1e293b" }] },
                                                            { "elementType": "labels.text.fill", "stylers": [{ "color": "#fbbf24" }] },
                                                            { "elementType": "labels.text.stroke", "stylers": [{ "color": "#0f172a" }] },
                                                            { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#334155" }] }
                                                        ],
                                                        disableDefaultUI: true,
                                                    }}
                                                >
                                                    <Marker position={mapMarker} icon="https://maps.google.com/mapfiles/ms/icons/gold-dot.png" />
                                                </GoogleMap>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center gap-4 animate-pulse">
                                                    <MapPin className="text-slate-700 animate-bounce" size={32} />
                                                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Awaiting Map Link...</p>
                                                </div>
                                            )}
                                            <div className="absolute bottom-6 left-6 z-10 bg-dark-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-gold-500/20 shadow-2xl">
                                                <p className="text-[8px] font-bold text-gold-500 uppercase tracking-widest">Select Heritage Drop Point</p>
                                            </div>
                                        </div>

                                        <input required value={shipping.address} onChange={e => setShipping(p => ({...p, address: e.target.value}))}
                                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm transition-all shadow-inner" placeholder="12 Heritage Blvd, Old Dhaka" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Settlement</label>
                                            <input required value={shipping.city} onChange={e => setShipping(p => ({...p, city: e.target.value}))}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm transition-all shadow-inner" placeholder="Dhaka" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Archive Code</label>
                                            <input required value={shipping.zip} onChange={e => setShipping(p => ({...p, zip: e.target.value}))}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm transition-all shadow-inner" placeholder="12XX" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full h-auto py-5 bg-gold-500 text-dark-950 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold-400 transition-all duration-300 shadow-xl shadow-gold-500/10 flex items-center justify-center gap-4 group active:scale-[0.98]">
                                        Proceed to Investment Validation
                                        <div className="w-0 group-hover:w-6 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 italic font-serif text-xl border-l border-dark-950/20 pl-2">→</div>
                                    </button>
                                </form>
                            )}

                            {step === 2 && (
                                <form onSubmit={handlePayment} className="space-y-8 animate-fade-in relative z-10">
                                    <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-8">
                                        <h2 className="text-3xl font-serif font-bold text-white flex items-center gap-4 italic tracking-tight"><CreditCard size={28} className="text-gold-500" /> Investment Portal</h2>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-1 italic opacity-60"><Shield size={14}/><span>Encrypted Selection</span></div>
                                    </div>

                                    <div className="bg-gradient-to-br from-dark-950 to-dark-900 border border-white/10 text-white rounded-[2.5rem] p-8 mb-4 relative overflow-hidden shadow-2xl group/card ring-1 ring-white/5">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover/card:bg-gold-500/20 transition-all duration-1000"></div>
                                        <div className="flex justify-between items-start mb-12">
                                            <div className="w-14 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg shadow-inner flex items-center justify-center">
                                                <div className="w-8 h-8 rounded-full bg-white/20 blur-[2px]"></div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] block mb-1">Network</span>
                                                <span className="text-sm font-bold text-gold-500 tracking-widest italic">{cardType || 'HERITAGE'}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            <p className="font-mono text-2xl tracking-[0.3em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                                                {payment.cardNumber || '•••• •••• •••• ••••'}
                                            </p>
                                            
                                            <div className="flex justify-between items-end pt-4 border-t border-white/5">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] opacity-40 uppercase tracking-[0.3em]">Guardian of Card</p>
                                                    <p className="font-bold text-xs tracking-widest uppercase">{payment.cardName || 'YOUR LEGACY'}</p>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <p className="text-[9px] opacity-40 uppercase tracking-[0.3em]">Temporal Expiry</p>
                                                    <p className="font-bold text-xs tracking-widest">{payment.expiry || 'MM/YY'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Digital Identifier</label>
                                            <input type="text" required inputMode="numeric" placeholder="1234 5678 9012 3456" maxLength={19}
                                                value={payment.cardNumber}
                                                onChange={e => setPayment(p => ({...p, cardNumber: formatCardNumber(e.target.value)}))}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm font-mono tracking-widest shadow-inner placeholder:opacity-20" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Nominal Titular</label>
                                            <input type="text" required placeholder="Name as inscribed on card"
                                                value={payment.cardName}
                                                onChange={e => setPayment(p => ({...p, cardName: e.target.value.toUpperCase()}))}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm tracking-widest shadow-inner placeholder:opacity-20 uppercase" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Temporal End</label>
                                                <input type="text" required placeholder="MM/YY" maxLength={5}
                                                    value={payment.expiry}
                                                    onChange={e => setPayment(p => ({...p, expiry: formatExpiry(e.target.value)}))}
                                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm font-mono tracking-widest shadow-inner placeholder:opacity-20" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Cryptic Key</label>
                                                <div className="relative">
                                                    <input type="password" required placeholder="•••" maxLength={4}
                                                        value={payment.cvv}
                                                        onChange={e => setPayment(p => ({...p, cvv: e.target.value.replace(/\D/g, '')}))}
                                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-1 focus:ring-gold-500/50 focus:border-gold-500/50 outline-none text-white text-sm font-mono tracking-widest shadow-inner placeholder:opacity-20 text-center" />
                                                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700" size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-6 pt-6">
                                        <button type="button" onClick={() => setStep(1)} className="flex-1 bg-white/5 text-slate-400 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 hover:text-white transition-all border border-white/5 active:scale-95">Abandon Path</button>
                                        <button type="submit" className="flex-1 bg-gold-500 text-dark-950 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/10 active:scale-95 group">
                                            Review Ritual Details
                                            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 3 && (
                                <form onSubmit={handleConfirm} className="space-y-10 animate-fade-in relative z-10">
                                    <div className="flex justify-between items-end mb-10 border-b border-white/5 pb-8">
                                        <h2 className="text-3xl font-serif font-bold text-white flex items-center gap-4 italic tracking-tight"><ClipboardList size={28} className="text-gold-500" /> Preservation Review</h2>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest hidden sm:block italic opacity-60">Final verification of heritage path</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-white/5 rounded-[2rem] p-8 border border-white/5 group/info hover:border-gold-500/20 transition-all shadow-inner">
                                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-6 border-b border-white/5 pb-4">Arrival Destination</h3>
                                            <div className="space-y-2">
                                                <p className="text-xl font-serif font-bold text-white italic">{shipping.firstName} {shipping.lastName}</p>
                                                <p className="text-slate-400 text-sm leading-relaxed italic">{shipping.address}<br />{shipping.city} {shipping.zip}</p>
                                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                                                    {shipping.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-[2rem] p-8 border border-white/5 group/info hover:border-teal-500/20 transition-all shadow-inner">
                                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-6 border-b border-white/5 pb-4">Financial Vessel</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-8 bg-dark-950 rounded border border-white/10 flex items-center justify-center text-[8px] font-bold text-gold-500 uppercase tracking-tighter">
                                                        {cardType || 'CORE'}
                                                    </div>
                                                    <p className="text-lg font-mono text-white tracking-widest whitespace-nowrap">•••• •••• {payment.cardNumber.replace(/\s/g, '').slice(-4)}</p>
                                                </div>
                                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                                                    Expires {payment.expiry}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-dark-950/40 rounded-[2.5rem] p-8 border border-white/5 space-y-6 shadow-inner">
                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] pl-1">Itemized Collection</h3>
                                        <div className="divide-y divide-white/5 max-h-[15rem] overflow-y-auto pr-4 custom-scrollbar">
                                            {items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between py-5 group/item">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-serif font-bold text-white text-lg group-hover/item:text-gold-500 transition-colors leading-tight">{item.productName}</span>
                                                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] italic flex items-center gap-2">
                                                            <span>{item.size}</span>
                                                            <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                                                            <span>{item.color}</span>
                                                            <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                                                            <span>{item.quantity} Unit{item.quantity !== 1 ? 's' : ''}</span>
                                                        </span>
                                                    </div>
                                                    <span className="font-bold text-white text-lg tracking-tight">৳{((Number(item.price) || 0) * (item.quantity || 1)).toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t-2 border-dashed border-white/10 pt-8 flex justify-between items-end">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] pb-1">Comprehensive Amount</span>
                                            <span className="text-4xl font-bold bg-gradient-to-r from-gold-500 to-white bg-clip-text text-transparent tracking-tighter italic">
                                                ৳{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <button type="button" onClick={() => setStep(2)} className="flex-1 bg-white/5 text-slate-400 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 hover:text-white transition-all border border-white/5 active:scale-95">Revisit Details</button>
                                        <button type="submit" disabled={isProcessing}
                                            className="flex-1 bg-gold-500 text-dark-950 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gold-400 transition-all shadow-[0_0_50px_rgba(251,191,36,0.1)] active:scale-95 flex items-center justify-center gap-4 group">
                                            {isProcessing ? (
                                                <><Loader2 size={18} className="animate-spin" /> COMMITTING ARCHIVE...</>
                                            ) : (
                                                <>
                                                    ✓ PLACE LEGACY ORDER
                                                    <div className="w-0 group-hover:w-6 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 italic font-serif text-xl border-l border-dark-950/20 pl-2">→</div>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-dark-900 border border-white/10 p-10 rounded-[2.5rem] sticky top-28 shadow-2xl overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/5 blur-[60px] rounded-full group-hover:bg-teal-500/10 transition-all"></div>
                            
                            <h3 className="text-xl font-serif font-bold text-white mb-8 pb-6 border-b border-white/5 tracking-tight italic">Collection <span className="text-gold-500">Digest</span></h3>
                            
                            <div className="space-y-6 mb-10 max-h-[12rem] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center group/mini">
                                        <div className="space-y-1">
                                            <span className="text-slate-400 font-serif text-sm leading-tight italic block line-clamp-1 group-hover/mini:text-white transition-colors">{item.productName}</span>
                                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Qty: {item.quantity}</span>
                                        </div>
                                        <span className="font-bold text-white text-xs tracking-widest">৳{((Number(item.price) || 0) * (item.quantity || 1)).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/5 pt-8 space-y-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                                <div className="flex justify-between items-center">
                                    <span className="opacity-60">Subtotal</span>
                                    <span className="text-white">৳{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="opacity-60">Tax (5%)</span>
                                    <span className="text-white">৳{(cartTotal * 0.05).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-teal-400">
                                    <span className="opacity-60">Shipping</span>
                                    <span className="italic">Heritage Free</span>
                                </div>
                            </div>

                            <div className="border-t-2 border-white/5 mt-8 pt-8 flex justify-between items-end">
                                <span className="text-[10px] font-bold text-gold-500 uppercase tracking-[0.4em] pb-1">Total</span>
                                <span className="text-3xl font-bold text-white tracking-tighter italic leading-none">
                                    ৳{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 mt-10 text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em] justify-center bg-white/5 py-4 rounded-2xl border border-white/5 shadow-inner">
                                <Shield size={14} className="text-teal-500/50" /> 
                                High Fidelity Security
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
