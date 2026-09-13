import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Flame, TrendingUp, Award, Eye } from 'lucide-react';
import { Book } from '../types';

interface BestSellersProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
  onViewDetails: (book: Book) => void;
  onToggleWishlist: (book: Book) => void;
  wishlistIds: string[];
}

export const BestSellers: React.FC<BestSellersProps> = ({
  books,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  wishlistIds,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter books with high rating or Best Seller / Trending / Popular badges
  const bestSellerBooks = books.filter(
    (b) => b.badge === 'Best Seller' || b.badge === 'Trending' || b.badge === 'Popular' || b.rating >= 4.8
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getBadgeIcon = (badge?: string) => {
    switch (badge) {
      case 'Best Seller':
        return <Award className="w-3 h-3 text-[#D4A373]" />;
      case 'Trending':
        return <TrendingUp className="w-3 h-3 text-[#50C878]" />;
      case 'Popular':
        return <Flame className="w-3 h-3 text-[#FF7A59]" />;
      default:
        return <Star className="w-3 h-3 text-[#D4A373]" />;
    }
  };

  return (
    <section id="bestsellers-section" className="py-20 bg-[#F4EFE6] border-y border-[#E6DCCF] relative overflow-hidden">
      {/* Subtle paper grain / line accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8C5E35] mb-2">
              <Flame className="w-4 h-4 text-[#C58940]" />
              <span>Reader Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615]">
              ZIA Best Sellers
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6F6255] hidden md:inline">
              Swipe or use controls to browse
            </span>
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full bg-white border border-[#D8CEBF] flex items-center justify-center text-[#231F20] hover:bg-[#FAF8F5] transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full bg-white border border-[#D8CEBF] flex items-center justify-center text-[#231F20] hover:bg-[#FAF8F5] transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth"
        >
          {bestSellerBooks.map((book, idx) => {
            const isWishlisted = wishlistIds.includes(book.id);

            return (
              <div
                key={book.id}
                id={`bestseller-item-${book.id}`}
                className="flex-none w-[280px] sm:w-[320px] bg-white rounded-2xl p-5 border border-[#E4DBD0] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top header with rank number & badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#D0C2B0]">
                      #{idx + 1}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#231F20] text-white">
                      {getBadgeIcon(book.badge)}
                      <span>{book.badge || 'Best Seller'}</span>
                    </span>
                  </div>

                  {/* 3D Book Display */}
                  <div
                    onClick={() => onViewDetails(book)}
                    className="relative cursor-pointer w-[160px] h-[230px] mx-auto mb-5 rounded-r-lg overflow-hidden bg-[#221F1E] book-shadow book-spine-effect book-page-edges transform transition-transform duration-500 hover:scale-105"
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent p-3 flex flex-col justify-end">
                      <p className="text-[10px] text-[#D4A373] uppercase tracking-wider font-semibold">
                        {book.category}
                      </p>
                      <p className="text-xs font-serif font-bold text-white line-clamp-2">
                        {book.title}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 justify-center mb-2 text-[#C58940]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C58940]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#1A1615]">{book.rating}</span>
                    <span className="text-[11px] text-[#807266]">({book.reviewsCount})</span>
                  </div>

                  {/* Title & Author */}
                  <div className="text-center">
                    <h3
                      onClick={() => onViewDetails(book)}
                      className="font-serif text-lg font-bold text-[#1A1615] line-clamp-1 hover:text-[#C58940] transition-colors cursor-pointer"
                      title={book.title}
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#73685D] mt-0.5 italic">
                      by {book.author}
                    </p>
                  </div>
                </div>

                {/* Bottom Price and Actions */}
                <div className="mt-5 pt-3 border-t border-[#F2EDE5]">
                  <div className="flex items-baseline justify-center gap-2 mb-3">
                    <span className="text-lg font-bold text-[#1A1615]">
                      ${book.price.toFixed(2)}
                    </span>
                    {book.originalPrice && (
                      <span className="text-xs text-[#9B8F82] line-through">
                        ${book.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onViewDetails(book)}
                      className="py-2 px-3 rounded-xl border border-[#D5CABB] text-xs font-semibold text-[#3D352F] hover:bg-[#FAF8F5] transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#A26D3F]" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onAddToCart(book)}
                      className="py-2 px-3 rounded-xl bg-[#231F20] text-white hover:bg-[#3D3536] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
