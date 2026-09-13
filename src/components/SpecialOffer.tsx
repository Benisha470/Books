import React, { useState } from 'react';
import { Tag, ArrowRight, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { Book } from '../types';

interface SpecialOfferProps {
  onShopOffers: () => void;
  discountedBooks: Book[];
  onViewDetails: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({
  onShopOffers,
  discountedBooks,
  onViewDetails,
  onAddToCart,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('ZIA30');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="special-offer-section" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Banner Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#211B18] via-[#2B231F] to-[#1E1715] text-[#FAF8F5] border border-[#3E342F] shadow-2xl p-8 sm:p-12 lg:p-16">
          
          {/* Decorative ambient lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C58940]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#8B4254]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#E6B87D] text-xs font-semibold uppercase tracking-wider mb-6">
                <Tag className="w-3.5 h-3.5" />
                <span>Limited Time Promotion</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#FFFBF5]">
                Up to 30% Off <br />
                <span className="italic font-normal text-[#E6B87D]">
                  Selected Books
                </span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-[#D4C8BC] max-w-lg leading-relaxed">
                Elevate your personal library with our curated autumn discounts. Enjoy up to 30% off 
                award-winning fiction, philosophical treatises, and collector hardcovers.
              </p>

              {/* Coupon Code Pill */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5">
                  <div className="text-left">
                    <span className="text-[10px] uppercase text-white/60 block font-medium">Coupon Code</span>
                    <span className="font-mono text-base font-bold tracking-widest text-[#E6B87D]">ZIA30</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="ml-2 p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Copy Code"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  id="shop-offers-button"
                  onClick={onShopOffers}
                  className="px-7 py-3.5 rounded-2xl bg-[#E6B87D] text-[#1E1715] hover:bg-[#D4A373] text-sm font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Shop Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Countdown / Offer note */}
              <div className="mt-6 flex items-center gap-2 text-xs text-white/70">
                <Clock className="w-4 h-4 text-[#E6B87D]" />
                <span>Special discounts automatically apply at checkout with qualifying carts.</span>
              </div>
            </div>

            {/* Right Mini-Showcase of 2 Discounted Books */}
            <div className="lg:col-span-5 flex justify-center items-center gap-4 sm:gap-6 perspective-1000">
              {discountedBooks.slice(0, 2).map((book, idx) => (
                <div
                  key={book.id}
                  onClick={() => onViewDetails(book)}
                  className={`group relative cursor-pointer w-[150px] sm:w-[175px] h-[225px] sm:h-[260px] rounded-r-lg overflow-hidden bg-[#1A1615] book-shadow book-spine-effect book-page-edges transform transition-all duration-500 hover:-translate-y-2 ${
                    idx === 0 ? '-rotate-3' : 'rotate-3 translate-y-4'
                  }`}
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-[#8B4254] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    -30%
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent p-3 flex flex-col justify-end">
                    <p className="text-xs font-serif font-bold text-white line-clamp-1">{book.title}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs font-bold text-[#E6B87D]">${book.price.toFixed(2)}</span>
                      {book.originalPrice && (
                        <span className="text-[10px] text-white/50 line-through">${book.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
