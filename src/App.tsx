import React, { useState } from 'react';
import { BOOKS, CATEGORIES } from './data/books';
import { Book, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FeaturedBooks } from './components/FeaturedBooks';
import { BestSellers } from './components/BestSellers';
import { NewArrivals } from './components/NewArrivals';
import { SpecialOffer } from './components/SpecialOffer';
import { WhyChooseZia } from './components/WhyChooseZia';
import { AboutZia } from './components/AboutZia';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // State management
  const [books] = useState<Book[]>(BOOKS);
  const [categories] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      book: BOOKS[0], // Pre-populate with 1 book so the cart is lively
      quantity: 1,
      format: 'Hardcover',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([BOOKS[1].id]);

  // Discount & Promo state
  const [discountCode, setDiscountCode] = useState<string>('ZIA30');
  const [discountPercent, setDiscountPercent] = useState<number>(30); // 30% off with ZIA30!

  // Active Modals & Drawers
  const [selectedBookForDetails, setSelectedBookForDetails] = useState<Book | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Authenticated user state
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Eleanor',
    email: 'eleanor.vance@readers.com',
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'cart' | 'wishlist' | 'info', title: string, subtitle?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (book: Book, quantity = 1, format = 'Hardcover') => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.book.id === book.id && item.format === format
      );
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id && item.format === format
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity, format }];
    });

    addToast('cart', 'Added to Bag', `${book.title} (${format})`);
  };

  const handleUpdateQuantity = (bookId: string, format: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(bookId, format);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.book.id === bookId && item.format === format
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (bookId: string, format: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.book.id === bookId && item.format === format))
    );
  };

  // Wishlist operations
  const handleToggleWishlist = (book: Book) => {
    if (wishlistIds.includes(book.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== book.id));
      addToast('wishlist', 'Removed from Wishlist', book.title);
    } else {
      setWishlistIds((prev) => [...prev, book.id]);
      addToast('wishlist', 'Saved to Wishlist', book.title);
    }
  };

  const handleMoveWishlistToCart = (book: Book) => {
    handleAddToCart(book, 1, book.format || 'Hardcover');
    setWishlistIds((prev) => prev.filter((id) => id !== book.id));
  };

  // Promo code validation
  const handleApplyDiscount = (code: string): boolean => {
    if (code.toUpperCase() === 'ZIA30') {
      setDiscountCode('ZIA30');
      setDiscountPercent(30);
      return true;
    }
    if (code.toUpperCase() === 'READMORE' || code.toUpperCase() === 'WELCOME10') {
      setDiscountCode(code.toUpperCase());
      setDiscountPercent(15);
      return true;
    }
    return false;
  };

  // Calculations for checkout
  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const discountedSubtotal = rawSubtotal - discountAmount;
  const shipping = rawSubtotal > 45 || cartItems.length === 0 ? 0 : 4.95;
  const totalDue = discountedSubtotal + shipping;

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  const handleSelectCategoryFromNav = (cat: string) => {
    setSelectedCategory(cat);
    const element = document.getElementById('featured-books-section');
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const wishlistBooks = books.filter((b) => wishlistIds.includes(b.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#231F20] selection:bg-[#E8D8C8]">
      
      {/* Navigation Bar */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSearchFocus={() => setIsSearchModalOpen(true)}
        user={user}
        onLogout={() => {
          setUser(null);
          addToast('info', 'Signed Out', 'You have been signed out of your account.');
        }}
        onSelectCategory={handleSelectCategoryFromNav}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* 1. HERO SECTION */}
        <Hero
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          onSearchSubmit={(q) => {
            setSearchQuery(q);
            handleScrollToSection('featured-books-section');
          }}
          onExploreClick={() => handleScrollToSection('featured-books-section')}
          onShopNowClick={() => handleScrollToSection('categories-section')}
          featuredBook={books[0]}
          onViewDetails={(b) => setSelectedBookForDetails(b)}
        />

        {/* 3. CATEGORIES */}
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(catName) => {
            setSelectedCategory(catName);
          }}
        />

        {/* 4. FEATURED BOOKS */}
        <FeaturedBooks
          books={books}
          categories={categories.map((c) => c.name)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onResetSearch={() => setSearchQuery('')}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(b) => handleAddToCart(b, 1, b.format || 'Hardcover')}
          onViewDetails={(b) => setSelectedBookForDetails(b)}
        />

        {/* 5. BEST SELLERS */}
        <BestSellers
          books={books}
          onAddToCart={(b) => handleAddToCart(b, 1, b.format || 'Hardcover')}
          onViewDetails={(b) => setSelectedBookForDetails(b)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 6. NEW ARRIVALS */}
        <NewArrivals
          books={books}
          onAddToCart={(b) => handleAddToCart(b, 1, b.format || 'Hardcover')}
          onViewDetails={(b) => setSelectedBookForDetails(b)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 7. SPECIAL OFFER SECTION */}
        <SpecialOffer
          onShopOffers={() => {
            setSelectedCategory('All');
            handleScrollToSection('featured-books-section');
          }}
          discountedBooks={books.filter((b) => b.originalPrice)}
          onViewDetails={(b) => setSelectedBookForDetails(b)}
          onAddToCart={(b) => handleAddToCart(b, 1, b.format || 'Hardcover')}
        />

        {/* 8. WHY CHOOSE ZIA */}
        <WhyChooseZia />

        {/* 9. ABOUT ZIA */}
        <AboutZia />

        {/* 10. NEWSLETTER */}
        <Newsletter />

      </main>

      {/* 11. FOOTER */}
      <Footer
        onSelectCategory={handleSelectCategoryFromNav}
        onNavigateSection={handleScrollToSection}
      />

      {/* MODALS & DRAWERS */}

      {/* Book Details Modal */}
      <BookDetailModal
        book={selectedBookForDetails}
        onClose={() => setSelectedBookForDetails(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={
          selectedBookForDetails
            ? wishlistIds.includes(selectedBookForDetails.id)
            : false
        }
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
        discountPercent={discountPercent}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistBooks={wishlistBooks}
        onRemoveWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onViewDetails={(b) => setSelectedBookForDetails(b)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          addToast('info', 'Welcome Back', `Signed in as ${userData.name}`);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={rawSubtotal}
        discount={discountAmount}
        shipping={shipping}
        total={totalDue}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        books={books}
        onSelectBook={(b) => setSelectedBookForDetails(b)}
        initialQuery={searchQuery}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}
