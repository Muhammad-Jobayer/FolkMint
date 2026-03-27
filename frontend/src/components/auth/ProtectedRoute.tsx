import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireSeller?: boolean;
    requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    children, 
    requireSeller = false, 
    requireAdmin = false 
}) => {
    const { isLoading, isAuthenticated, isSeller, isAdmin } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-gold-500 animate-spin" />
                <p className="text-gold-500/60 font-serif italic tracking-widest text-xs uppercase pt-2">Authenticating Legacy...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireSeller && !isSeller) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
