import React from 'react';
import { Star, User } from 'lucide-react';
import type { Review, User as UserType } from '../../types/schema';

interface ReviewCardProps {
    review: Review & { username?: string, first_name?: string, user?: { username: string } };
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? 'fill-yellow-500 text-yellow-500' : 'text-earth-300'}
            />
        ));
    };

    return (
        <div className="bg-dark-900/40 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-md relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/[0.01] blur-2xl rounded-full"></div>
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20 shadow-inner">
                        <User size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-1">
                            <span className="font-serif font-bold text-white text-xl italic tracking-tight">
                                {review.first_name || review.username || review.user?.username || 'Legacy Collector'}
                            </span>
                            <div className="flex gap-1">
                                {renderStars(review.rating || 0)}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-4 h-[1px] bg-gold-500/30"></div>
                             <p className="text-[10px] text-gold-500/60 font-bold uppercase tracking-[0.3em]">Verified Purchase</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg font-serif italic border-l border-white/5 pl-8 mt-6">
                "{review.comment}"
            </p>
        </div>
    );
};
