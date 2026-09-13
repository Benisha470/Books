import React, { useState } from 'react';
import { 
  X, Star, Heart, ShoppingBag, BookOpen, Truck, ShieldCheck, Check, Share2, Award, Quote
} from 'lucide-react';
import { Book } from '../types';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book, quantity: number, format: string) => void;
  onToggleWishlist: (book: Book) => void;
  isWishlisted: boolean;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!book) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<string>(book.format || 'Hardcover');
  const [activeTab, setActiveTab] = useState<'synopsis' | 'excerpt' | 'specs'>('synopsis');
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleAdd = () => {
    onAddToCart(book, quantity, selectedFormat);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formats = [
    { name: 'Hardcover', priceDiff: 0, label: 'Foil-stamped Cloth' },
    { name: 'Paperback', priceDiff: -4.00, label: 'Acid-free Paper' },
    { name: 'Collector Edition', priceDiff: 12.00, label: 'Gilded Edges & Ribbon' },
  ];

  const currentFormatObj = formats.find((f) => f.name === selectedFormat) || formats[0];
  const calculatedPrice = Math.max(book.price + currentFormatObj.priceDiff, 5.00);

  return (
    <div
      id="book-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="book-detail-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E2D9] my-8 animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#FAF8F5] hover:bg-[#EFEBE4] text-[#4A423B] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: 3D Book Presentation */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[260px] h-[370px] bg-[#F7F4EE] rounded-2xl p-6 flex items-center justify-center border border-[#EAE3D8]">
                {/* 3D Book */}
                <div className="w-[180px] h-[260px] rounded-r-lg overflow-hidden bg-[#1E1A18] book-shadow book-spine-effect book-page-edges transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {book.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#231F20] text-[#FAF8F5]">
                    {book.badge}
                  </span>
                )}
              </div>

              {/* Quick specs pill */}
              <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center text-xs text-[#6F6458]">
                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EFEBE4]">
                  <span className="block font-bold text-[#1A1615]">{book.pages}</span>
                  <span className="text-[10px]">Pages</span>
                </div>
                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EFEBE4]">
                  <span className="block font-bold text-[#1A1615]">{book.year}</span>
                  <span className="text-[10px]">Release</span>
                </div>
                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EFEBE4]">
                  <span className="block font-bold text-[#1A1615]">English</span>
                  <span className="text-[10px]">Language</span>
                </div>
              </div>

              {/* Share & Wishlist buttons */}
              <div className="mt-4 flex items-center gap-3 w-full">
                <button
                  onClick={() => onToggleWishlist(book)}
                  className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isWishlisted
                      ? 'border-[#8B4254] bg-[#8B4254] text-white'
                      : 'border-[#D5CABB] text-[#3D352F] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl border border-[#D5CABB] text-[#3D352F] hover:bg-[#FAF8F5] transition-colors"
                  title="Share book"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Right Column: Title, Author, Price, Formats, Add to Cart */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A26D3F]">
                  {book.category}
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1615] mt-1 leading-tight">
                  {book.title}
                </h2>

                <p className="text-sm text-[#6F6458] mt-1.5 italic">
                  Written by <strong className="text-[#1A1615] not-italic font-semibold">{book.author}</strong>
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex text-[#C58940]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C58940]" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#1A1615]">{book.rating}</span>
                  <span className="text-xs text-[#8C7D70]">({book.reviewsCount} customer reviews)</span>
                  <span className="text-xs text-emerald-700 font-semibold ml-2 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified Edition
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-[#1A1615]">
                    ${calculatedPrice.toFixed(2)}
                  </span>
                  {book.originalPrice && (
                    <span className="text-sm text-[#9B8F82] line-through">
                      ${(book.originalPrice + currentFormatObj.priceDiff).toFixed(2)}
                    </span>
                  )}
                  {book.originalPrice && (
                    <span className="text-xs font-bold text-[#8B4254] bg-[#F9ECEF] px-2 py-0.5 rounded">
                      Save ${(book.originalPrice - book.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Format selection */}
                <div className="mt-6">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#544B42] block mb-2">
                    Select Binding / Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {formats.map((fmt) => (
                      <button
                        key={fmt.name}
                        onClick={() => setSelectedFormat(fmt.name)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          selectedFormat === fmt.name
                            ? 'border-[#231F20] bg-[#231F20] text-white shadow-sm'
                            : 'border-[#E2D9CD] bg-[#FAF8F5] text-[#3D352F] hover:bg-[#F3EFE8]'
                        }`}
                      >
                        <span className="block text-xs font-bold">{fmt.name}</span>
                        <span className={`block text-[10px] mt-0.5 ${selectedFormat === fmt.name ? 'text-white/70' : 'text-[#7D7065]'}`}>
                          {fmt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center border border-[#D5CABB] rounded-xl bg-[#FAF8F5] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#231F20] hover:bg-[#EFEBE4] transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-[#1A1615]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#231F20] hover:bg-[#EFEBE4] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md ${
                      isAdded ? 'bg-[#2C6E49]' : 'bg-[#231F20] hover:bg-[#3D3536]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
                        <span>Add to Cart • ${(calculatedPrice * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Delivery reassurance */}
                <div className="mt-6 pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs text-[#706459]">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#A26D3F]" />
                    <span>Free shipping on orders over $45</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E49]" />
                    <span>Archival book packaging guarantee</span>
                  </div>
                </div>
              </div>

              {/* Tab Navigation: Synopsis / Excerpt / Specs */}
              <div className="mt-8 pt-6 border-t border-[#EAE3D8]">
                <div className="flex border-b border-[#EAE3D8] text-xs font-semibold gap-6">
                  <button
                    onClick={() => setActiveTab('synopsis')}
                    className={`pb-2.5 transition-colors cursor-pointer ${
                      activeTab === 'synopsis'
                        ? 'text-[#1A1615] border-b-2 border-[#C58940]'
                        : 'text-[#85776B] hover:text-[#1A1615]'
                    }`}
                  >
                    Synopsis
                  </button>
                  <button
                    onClick={() => setActiveTab('excerpt')}
                    className={`pb-2.5 transition-colors cursor-pointer ${
                      activeTab === 'excerpt'
                        ? 'text-[#1A1615] border-b-2 border-[#C58940]'
                        : 'text-[#85776B] hover:text-[#1A1615]'
                    }`}
                  >
                    Look Inside (Excerpt)
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2.5 transition-colors cursor-pointer ${
                      activeTab === 'specs'
                        ? 'text-[#1A1615] border-b-2 border-[#C58940]'
                        : 'text-[#85776B] hover:text-[#1A1615]'
                    }`}
                  >
                    Specifications
                  </button>
                </div>

                <div className="py-4 text-xs sm:text-sm text-[#544A42] leading-relaxed">
                  {activeTab === 'synopsis' && (
                    <p>{book.description}</p>
                  )}

                  {activeTab === 'excerpt' && (
                    <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EBE4D9] font-serif italic text-[#3B342F] leading-relaxed">
                      <Quote className="w-4 h-4 text-[#C58940] mb-2 opacity-60" />
                      <p>“{book.excerpt}”</p>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-y-2 text-xs">
                      <div><strong className="text-[#1A1615]">Publisher:</strong> {book.publisher}</div>
                      <div><strong className="text-[#1A1615]">ISBN-13:</strong> {book.isbn}</div>
                      <div><strong className="text-[#1A1615]">Pages:</strong> {book.pages}</div>
                      <div><strong className="text-[#1A1615]">Format:</strong> {selectedFormat}</div>
                      <div><strong className="text-[#1A1615]">Dimensions:</strong> 6.2 x 1.4 x 9.3 inches</div>
                      <div><strong className="text-[#1A1615]">Weight:</strong> 1.3 lbs</div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
