import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, BookOpen, Star, Award, Compass } from 'lucide-react';
import { Book } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  onExploreClick: () => void;
  onShopNowClick: () => void;
  featuredBook: Book;
  onViewDetails: (book: Book) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onExploreClick,
  onShopNowClick,
  featuredBook,
  onViewDetails,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(localSearch);
  };

  const handlePopularSearchClick = (term: string) => {
    setLocalSearch(term);
    onSearchChange(term);
    onSearchSubmit(term);
  };

  return (
    <section id="hero-section" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F5] to-[#FAF8F5]">
      {/* Decorative ambient background accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#EBDBC9]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-[#E8DECE]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Description, Search, CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline / Curated pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE9DF] border border-[#E3D9CC] text-[#63554A] text-xs font-semibold tracking-wide uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#C58940]" />
              <span>Discover Stories. Explore Worlds.</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-[#1A1615] leading-[1.08] tracking-tight">
              Find Your Next <br />
              <span className="italic font-normal text-[#8A5B38] relative inline-block">
                Great Read
                <svg className="absolute left-0 -bottom-2 w-full h-3 text-[#D4A373]/40" viewBox="0 0 250 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9C50 3 150 1 248 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Short Description */}
            <p className="mt-6 text-base sm:text-lg text-[#5A5149] max-w-xl leading-relaxed">
              Step inside ZIA, a curated literary haven where timeless masterpieces, 
              groundbreaking ideas, and evocative contemporary voices wait to transport your imagination.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 w-full max-w-xl relative flex items-center shadow-md shadow-[#231F20]/5 rounded-2xl bg-white border border-[#E8E2D9] p-1.5 focus-within:ring-2 focus-within:ring-[#C58940]/50 transition-all"
            >
              <div className="pl-3.5 pr-2 text-[#8C7A6B]">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="hero-book-search-input"
                type="text"
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  onSearchChange(e.target.value);
                }}
                placeholder="Search books, authors, genres..."
                className="w-full py-3 bg-transparent text-sm sm:text-base text-[#1A1615] placeholder-[#9D8D7F] focus:outline-none"
              />
              <button
                id="hero-search-submit-button"
                type="submit"
                className="px-5 sm:px-6 py-3 bg-[#231F20] text-[#FAF8F5] text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#3D3536] transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline-block" />
              </button>
            </form>

            {/* Popular quick tags */}
            <div className="mt-3 flex items-center gap-2 text-xs text-[#7D7065] flex-wrap">
              <span className="font-semibold text-[#544A41]">Popular:</span>
              {['Fiction', 'Self Development', 'Mystery', 'Sci-Fi'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handlePopularSearchClick(term)}
                  className="hover:text-[#1A1615] hover:underline underline-offset-2 cursor-pointer transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                id="hero-explore-books-btn"
                onClick={onExploreClick}
                className="px-7 py-3.5 rounded-full bg-[#231F20] text-[#FAF8F5] text-sm font-semibold hover:bg-[#3D3536] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#D4A373]" />
                <span>Explore Books</span>
              </button>
              <button
                id="hero-shop-now-btn"
                onClick={onShopNowClick}
                className="px-7 py-3.5 rounded-full bg-white text-[#231F20] border border-[#D8CEBF] text-sm font-semibold hover:bg-[#F3EEE6] transition-all flex items-center gap-2 shadow-sm"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust badges row */}
            <div className="mt-10 pt-6 border-t border-[#E8E2D9] w-full max-w-xl flex items-center justify-between text-xs text-[#6E6257]">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D4A373] fill-[#D4A373]" />
                <span><strong>4.9 / 5</strong> Reader Rating</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#D5CBBD]" />
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C58940]" />
                <span>Hand-Bound Quality</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#D5CBBD]" />
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#7A6453]" />
                <span>Worldwide Dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Stack of Books & Open-Book Visual */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-6">
            
            {/* Visual Container with 3D Perspective */}
            <div className="relative w-full max-w-md perspective-1000">
              
              {/* Floating review badge */}
              <div className="absolute -top-4 -left-4 z-30 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-[#EBE4D9] flex items-center gap-3 animate-bounce duration-1000">
                <div className="w-9 h-9 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#C58940]">
                  <Star className="w-5 h-5 fill-[#C58940]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#1A1615]">New York Times</span>
                  </div>
                  <span className="text-[11px] text-[#786C60]">#1 Literary Bestseller</span>
                </div>
              </div>

              {/* 3D Stack Base Layer (Book 3 - Bottom Stack) */}
              <div 
                className="absolute w-[240px] h-[330px] rounded-r-lg bg-[#2E3C48] -bottom-6 right-6 rotate-6 shadow-2xl opacity-60 pointer-events-none"
                style={{
                  boxShadow: '-10px 18px 30px rgba(0,0,0,0.25)',
                }}
              >
                <div className="absolute top-0 bottom-0 right-0 w-3 bg-[#E8DFD3] rounded-r-sm" />
              </div>

              {/* 3D Stack Middle Layer (Book 2) */}
              <div 
                className="absolute w-[250px] h-[340px] rounded-r-lg bg-[#8B4254] -bottom-2 right-10 rotate-[-4deg] shadow-xl opacity-80 pointer-events-none"
                style={{
                  boxShadow: '-12px 18px 32px rgba(0,0,0,0.22)',
                }}
              >
                <div className="absolute top-0 bottom-0 right-0 w-3 bg-[#EDE6DC] rounded-r-sm" />
              </div>

              {/* Main Interactive 3D Hardcover Book (Book 1) */}
              <div
                onClick={() => onViewDetails(featuredBook)}
                className="group relative cursor-pointer mx-auto w-[270px] sm:w-[290px] h-[390px] sm:h-[410px] rounded-r-xl overflow-hidden bg-[#1E1B18] transform transition-all duration-500 hover:-translate-y-3 hover:rotate-[-2deg] book-shadow book-spine-effect book-page-edges"
              >
                {/* Book Cover Image */}
                <img
                  src={featuredBook.coverUrl}
                  alt={featuredBook.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Overlay for Luxury Editorial Cover styling */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 flex flex-col justify-between p-6 text-white">
                  
                  {/* Top Header of the Book */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4A373] bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      ZIA Edition
                    </span>
                    <span className="text-xs bg-[#C58940] text-white px-2.5 py-1 rounded-full font-bold shadow">
                      {featuredBook.badge || 'Featured'}
                    </span>
                  </div>

                  {/* Spine Ribbons / Book Title & Author */}
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-[#E6B87D] font-medium mb-1">
                      {featuredBook.category}
                    </p>
                    <h3 className="font-serif text-2xl font-bold leading-tight drop-shadow-md text-[#FFFBF5]">
                      {featuredBook.title}
                    </h3>
                    <p className="text-xs text-[#E0D7CD] mt-1 italic">
                      by {featuredBook.author}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-white">${featuredBook.price.toFixed(2)}</span>
                        {featuredBook.originalPrice && (
                          <span className="ml-2 text-xs text-white/60 line-through">
                            ${featuredBook.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold bg-white/20 group-hover:bg-[#C58940] text-white px-3 py-1 rounded-full transition-colors">
                        Inspect Book →
                      </span>
                    </div>
                  </div>

                </div>

                {/* Realistic embossed spine border on left */}
                <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-white/30 via-transparent to-black/40 pointer-events-none" />
              </div>

              {/* Floating Bottom Card: Reading Quote */}
              <div className="absolute -bottom-6 -right-2 z-30 bg-[#231F20] text-[#FAF8F5] p-3.5 rounded-2xl shadow-xl max-w-[210px] border border-[#3D3536] hidden sm:block">
                <p className="text-[11px] italic font-serif leading-snug text-[#E0D7CD]">
                  “A book is a dream that you hold in your hand.”
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-[#D4A373]">Neil Gaiman</span>
                  <div className="flex text-[#D4A373]">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
