import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Book } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistBooks: Book[];
  onRemoveWishlist: (book: Book) => void;
  onMoveToCart: (book: Book) => void;
  onViewDetails: (book: Book) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistBooks,
  onRemoveWishlist,
  onMoveToCart,
  onViewDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        id="wishlist-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#E8E2D9]">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EFEBE4] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#8B4254] fill-[#8B4254]" />
              <h2 className="font-serif text-2xl font-bold text-[#1A1615]">Your Wishlist</h2>
              <span className="text-xs bg-[#8B4254] text-white px-2 py-0.5 rounded-full font-semibold">
                {wishlistBooks.length}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-2 rounded-full hover:bg-[#EFEBE4] text-[#4A423B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistBooks.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center mx-auto text-[#9B8E80] mb-4">
                  <Heart className="w-8 h-8 text-[#C5B4A3]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1615]">Your wishlist is empty</h3>
                <p className="text-xs text-[#7B6F64] mt-1 max-w-xs mx-auto">
                  Click the heart icon on any title to save stories for later reading.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#231F20] text-white text-xs font-semibold rounded-full hover:bg-[#3D3536] transition-colors"
                >
                  Explore Books
                </button>
              </div>
            ) : (
              wishlistBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex gap-4 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#ECE5DC] items-center"
                >
                  <div
                    onClick={() => {
                      onViewDetails(book);
                      onClose();
                    }}
                    className="w-16 h-22 rounded bg-[#2D2A26] overflow-hidden shrink-0 book-shadow cursor-pointer"
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-[#A26D3F]">
                      {book.category}
                    </span>
                    <h4
                      onClick={() => {
                        onViewDetails(book);
                        onClose();
                      }}
                      className="font-serif text-sm font-bold text-[#1A1615] hover:text-[#A26D3F] transition-colors cursor-pointer line-clamp-1"
                    >
                      {book.title}
                    </h4>
                    <p className="text-xs text-[#7B6F64] italic">by {book.author}</p>
                    <p className="text-sm font-bold text-[#1A1615] mt-1">${book.price.toFixed(2)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onMoveToCart(book)}
                        className="px-3 py-1.5 rounded-lg bg-[#231F20] hover:bg-[#3D3536] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D4A373]" />
                        <span>Move to Bag</span>
                      </button>
                      <button
                        onClick={() => onRemoveWishlist(book)}
                        className="p-1.5 rounded-lg text-[#8C7D70] hover:text-red-600 hover:bg-white transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistBooks.length > 0 && (
            <div className="p-6 border-t border-[#EFEBE4] bg-[#FAF8F5]">
              <button
                onClick={() => {
                  wishlistBooks.forEach((b) => onMoveToCart(b));
                }}
                className="w-full py-3 bg-[#231F20] hover:bg-[#3D3536] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Move All to Cart</span>
                <ArrowRight className="w-4 h-4 text-[#D4A373]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
