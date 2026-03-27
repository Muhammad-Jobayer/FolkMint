import React from 'react';
import { Star } from 'lucide-react';
import { ReviewCard } from './ReviewCard';
import type { Review } from '../../types/schema';

interface ReviewListProps {
    reviews: (Review & { user?: { username: string } })[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        : 0;

    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star).length,
        percentage: reviews.length > 0
            ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100
            : 0
    }));

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={20}
                className={i < Math.round(rating) ? 'fill-gold-500 text-gold-500' : 'text-white/5 fill-transparent'}
            />
        ));
    };

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12 bg-earth-50 rounded-lg">
                <p className="text-earth-500 text-lg">No reviews yet. Be the first to review this product!</p>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {/* Rating Summary */}
            <div className="bg-dark-900/60 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/[0.02] blur-[100px] rounded-full group-hover:bg-gold-500/[0.05] transition-all duration-1000"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                    {/* Average Rating */}
                    <div className="text-center md:text-left flex flex-col justify-center">
                        <div className="text-[10px] text-gold-500 font-bold uppercase tracking-[0.6em] italic mb-6">Collective Pulse</div>
                        <div className="text-8xl font-serif font-bold text-white mb-6 italic tracking-tighter">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex justify-center md:justify-start gap-1.5 mb-6">
                            {renderStars(averageRating)}
                        </div>
                        <p className="text-slate-400 font-serif italic text-lg opacity-80 pl-1">Based on {reviews.length} legacy testimonial{reviews.length !== 1 ? 's' : ''}</p>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="flex flex-col justify-center space-y-4">
                        {ratingCounts.map(({ star, count, percentage }) => (
                            <div key={star} className="flex items-center gap-6 group/item">
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest w-12">{star} Star</span>
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_10px_rgba(251,191,36,0.2)] transition-all duration-1000"
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <span className="text-[10px] text-gold-500/60 font-black w-8 text-right tabular-nums">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
                <div className="flex items-center gap-6 mb-12">
                     <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/5"></div>
                     <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] italic">Venerated Voices</h3>
                     <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/5"></div>
                </div>
                {reviews.map((review) => (
                    <ReviewCard key={review.review_id} review={review} />
                ))}
            </div>
        </div>
    );
};
