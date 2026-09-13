import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, BookOpen } from 'lucide-react';
import { Book } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: Book[];
  onSelectBook: (book: Book) => void;
  initialQuery?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  books,
  onSelectBook,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? books.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.category.toLowerCase().includes(query.toLowerCase()) ||
          b.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-20 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-[#E8E2D9] animate-in zoom-in-95 duration-200"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#EFEBE4]">
          <Search className="w-5 h-5 text-[#A26D3F] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors, categories (e.g. Eleanor Vance, Mystery, Sci-Fi)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1A1615] placeholder-[#9D8D7F] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#8C7D70] hover:text-[#1A1615] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFEBE4] text-[#4A423B] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#8C7D70]">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-[#C5B4A3]" />
              <p>Type keywords to search across all titles, authors, and genres.</p>
              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                <span className="font-semibold text-[#544A41]">Suggestions:</span>
                {['Fiction', 'Self Development', 'Mystery', 'Cartographer', 'Autonomous'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-2.5 py-1 bg-[#FAF8F5] border border-[#EAE3D8] rounded-full hover:bg-[#F3EEE6] text-[#473F38]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#8C7D70]">
              <p>No books found matching “{query}”.</p>
              <p className="mt-1">Try checking for typos or searching by author name.</p>
            </div>
          ) : (
            results.map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  onSelectBook(book);
                  onClose();
                }}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#FAF8F5] cursor-pointer transition-colors border border-transparent hover:border-[#E8E2D9]"
              >
                <div className="w-12 h-16 rounded bg-[#2B2725] overflow-hidden shrink-0 book-shadow">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#A26D3F]">
                    {book.category}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#1A1615] truncate">
                    {book.title}
                  </h4>
                  <p className="text-xs text-[#6F6458] truncate italic">by {book.author}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-[#C58940]">
                      <Star className="w-3 h-3 fill-[#C58940]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#1A1615]">{book.rating}</span>
                    <span className="text-[11px] text-[#8C7D70]">· ${book.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="shrink-0 text-[#C58940]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
