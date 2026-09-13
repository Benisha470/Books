import React from 'react';
import { Sparkles, Calendar, Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Book } from '../types';

interface NewArrivalsProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
  onViewDetails: (book: Book) => void;
  onToggleWishlist: (book: Book) => void;
  wishlistIds: string[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  books,
  onAddToCart,
  onViewDetails,
  onToggleWishlist,
  wishlistIds,
}) => {
  // Filter new arrival books
  const newBooks = books.filter((b) => b.badge === 'New' || b.year === 2026);

  return (
    <section id="new-arrivals-section" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A26D3F] mb-2">
              <Sparkles className="w-4 h-4 text-[#C58940]" />
              <span>Fresh Off The Press</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615]">
              New Arrivals
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6E6358] max-w-md">
            Discover the most anticipated new releases of the season, freshly printed and delivered in collectible editions.
          </p>
        </div>

        {/* 4 Cards Grid / Modern editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newBooks.map((book) => {
            const isWishlisted = wishlistIds.includes(book.id);

            return (
              <div
                key={book.id}
                id={`new-arrival-${book.id}`}
                className="group relative bg-white rounded-2xl p-5 border border-[#EAE3D8] hover:border-[#D5C7B5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with 'NEW' Badge and Year */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#2C6E49] text-white">
                      New Release
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#7A6E63]">
                      <Calendar className="w-3.5 h-3.5 text-[#C58940]" />
                      <span>{book.year}</span>
                    </span>
                  </div>

                  {/* 3D Book Graphic */}
                  <div className="relative w-full h-[220px] bg-[#F7F4EE] rounded-xl flex items-center justify-center p-3 mb-4 overflow-hidden">
                    <div 
                      onClick={() => onViewDetails(book)}
                      className="cursor-pointer w-[125px] h-[180px] rounded-r-sm overflow-hidden bg-[#2D2A26] book-shadow book-spine-effect book-page-edges transform transition-transform duration-500 group-hover:scale-105"
                    >
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Wishlist quick toggle */}
                    <button
                      onClick={() => onToggleWishlist(book)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#5C5046] shadow-sm transition-colors"
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#8B4254] text-[#8B4254]' : ''}`} />
                    </button>
                  </div>

                  {/* Category */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A26D3F]">
                    {book.category}
                  </span>

                  {/* Title */}
                  <h3
                    onClick={() => onViewDetails(book)}
                    className="font-serif text-lg font-bold text-[#1A1615] hover:text-[#A26D3F] transition-colors cursor-pointer mt-1 line-clamp-1"
                    title={book.title}
                  >
                    {book.title}
                  </h3>

                  {/* Author */}
                  <p className="text-xs text-[#6F6458] mt-0.5 italic">
                    by {book.author}
                  </p>

                  {/* Rating snippet */}
                  <div className="mt-2 flex items-center gap-1 text-[#C58940] text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#C58940]" />
                    <span className="font-bold text-[#1A1615]">{book.rating}</span>
                    <span className="text-[#8B7C6E] text-[11px]">({book.reviewsCount})</span>
                  </div>
                </div>

                {/* Bottom Price & Add */}
                <div className="mt-5 pt-3 border-t border-[#F2EDE5] flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#1A1615]">
                      ${book.price.toFixed(2)}
                    </span>
                    {book.originalPrice && (
                      <span className="ml-1.5 text-xs text-[#9B8F82] line-through">
                        ${book.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onViewDetails(book)}
                      className="p-2 rounded-xl border border-[#D5CABB] text-[#3D352F] hover:bg-[#F7F4EE] transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(book)}
                      className="px-3 py-2 rounded-xl bg-[#231F20] hover:bg-[#3D3536] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
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
