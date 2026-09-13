import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Filter, ArrowUpDown, Check } from 'lucide-react';
import { Book } from '../types';

interface FeaturedBooksProps {
  books: Book[];
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onResetSearch: () => void;
  wishlistIds: string[];
  onToggleWishlist: (book: Book) => void;
  onAddToCart: (book: Book) => void;
  onViewDetails: (book: Book) => void;
}

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({
  books,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onResetSearch,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Filter books by category and search
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      book.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort filtered books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.year - a.year;
    return 0; // default order
  });

  const handleAddToCart = (book: Book) => {
    onAddToCart(book);
    setAddedAnimationId(book.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="featured-books-section" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A26D3F] block mb-2">
              Curated Catalog
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615]">
              Featured Books
            </h2>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#E8E2D9] text-xs text-[#554A42] shadow-sm">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#A26D3F]" />
              <span className="font-semibold">Sort by:</span>
              <select
                id="books-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium text-[#1A1615] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {['All', ...categories].map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                id={`filter-pill-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#231F20] text-[#FAF8F5] shadow-sm'
                    : 'bg-white text-[#5E544B] border border-[#E8E2D9] hover:bg-[#F3EFE9]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search status notice if searching */}
        {searchQuery.trim() !== '' && (
          <div className="mb-6 flex items-center justify-between bg-[#F5EFE6] border border-[#E6DBCB] px-4 py-3 rounded-xl text-xs text-[#635446]">
            <span>
              Showing results for: <strong className="text-[#1A1615]">"{searchQuery}"</strong> ({sortedBooks.length} books found)
            </span>
            <button
              onClick={onResetSearch}
              className="text-[#A26D3F] hover:underline font-bold"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Empty State */}
        {sortedBooks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E2D9] p-8">
            <Filter className="w-10 h-10 mx-auto text-[#B3A697] mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#1A1615]">No books match your current criteria</h3>
            <p className="text-sm text-[#7D7065] mt-1 max-w-sm mx-auto">
              Try adjusting your category filter or search keywords to discover more literature.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All');
                onResetSearch();
              }}
              className="mt-5 px-5 py-2.5 bg-[#231F20] text-[#FAF8F5] text-xs font-semibold rounded-full hover:bg-[#3D3536] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {sortedBooks.map((book) => {
            const isWishlisted = wishlistIds.includes(book.id);
            const isJustAdded = addedAnimationId === book.id;

            return (
              <div
                key={book.id}
                id={`featured-book-card-${book.id}`}
                className="group flex flex-col justify-between bg-white rounded-2xl p-5 border border-[#EAE3D8] hover:border-[#D5C7B5] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Book 3D Cover Display Area */}
                  <div className="relative w-full h-[270px] bg-[#F7F4EE] rounded-xl flex items-center justify-center p-4 overflow-hidden mb-5">
                    
                    {/* Badge */}
                    {book.badge && (
                      <span className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#231F20] text-white shadow">
                        {book.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      id={`wishlist-btn-${book.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(book);
                      }}
                      aria-label="Toggle Wishlist"
                      className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isWishlisted
                          ? 'bg-[#8B4254] text-white'
                          : 'bg-white/80 text-[#5C5046] hover:bg-white hover:text-[#8B4254]'
                      } shadow`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                    </button>

                    {/* 3D Book Graphic */}
                    <div 
                      onClick={() => onViewDetails(book)}
                      className="relative cursor-pointer w-[145px] h-[215px] rounded-r-md overflow-hidden bg-[#2D2A26] book-shadow book-spine-effect book-page-edges transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-1.5deg]"
                    >
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-2.5 flex flex-col justify-between">
                        <span className="text-[9px] uppercase tracking-wider text-[#D4A373] font-semibold">
                          ZIA
                        </span>
                        <div className="text-left">
                          <p className="text-[10px] text-white/70 uppercase tracking-widest">{book.category}</p>
                          <h4 className="text-xs font-bold text-white leading-tight font-serif line-clamp-2">{book.title}</h4>
                        </div>
                      </div>
                    </div>

                    {/* Quick View Button Hover Overlay */}
                    <button
                      id={`quick-view-btn-${book.id}`}
                      onClick={() => onViewDetails(book)}
                      className="absolute bottom-3 inset-x-8 py-2 bg-white/95 backdrop-blur-md text-[#231F20] text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 hover:bg-white"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C58940]" />
                      <span>View Details</span>
                    </button>
                  </div>

                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A26D3F]">
                      {book.category}
                    </span>
                    <div className="flex items-center gap-1 text-[#C58940]">
                      <Star className="w-3.5 h-3.5 fill-[#C58940]" />
                      <span className="font-bold text-[#1A1615] text-xs">{book.rating}</span>
                      <span className="text-[#8C7D70] text-[11px]">({book.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onViewDetails(book)}
                    className="font-serif text-lg font-bold text-[#1A1615] leading-snug hover:text-[#A26D3F] transition-colors cursor-pointer line-clamp-1"
                    title={book.title}
                  >
                    {book.title}
                  </h3>

                  {/* Author */}
                  <p className="text-xs text-[#6F6458] mt-0.5 italic">
                    by {book.author}
                  </p>
                </div>

                {/* Price & Actions Bottom Area */}
                <div className="mt-5 pt-3 border-t border-[#F0EBE3]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#1A1615]">
                        ${book.price.toFixed(2)}
                      </span>
                      {book.originalPrice && (
                        <span className="text-xs text-[#9B8F82] line-through">
                          ${book.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#2C6E49] font-semibold bg-[#EBF5EE] px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`view-details-action-${book.id}`}
                      onClick={() => onViewDetails(book)}
                      className="py-2.5 px-3 rounded-xl border border-[#D5CABB] text-xs font-semibold text-[#3D352F] hover:bg-[#F7F4EE] transition-colors text-center"
                    >
                      Details
                    </button>
                    <button
                      id={`add-to-cart-action-${book.id}`}
                      onClick={() => handleAddToCart(book)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                        isJustAdded
                          ? 'bg-[#2C6E49]'
                          : 'bg-[#231F20] hover:bg-[#3D3536]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-[#D4A373]" />
                          <span>Add to Cart</span>
                        </>
                      )}
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
