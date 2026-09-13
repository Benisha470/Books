import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onSearchFocus: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onSelectCategory: (categoryName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onSearchFocus,
  user,
  onLogout,
  onSelectCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
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

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D9]'
          : 'bg-[#FAF8F5] border-b border-transparent'
      }`}
    >
      {/* Top Banner */}
      <div id="top-announcement-bar" className="bg-[#231F20] text-[#EFEBE4] text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse"></span>
        <span>Free curated packaging & bookmark with every order • Use code <strong className="text-[#E6B87D]">ZIA30</strong> for 30% off selected books</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            id="nav-logo-button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-[#231F20] text-[#FAF8F5] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <BookOpen className="w-5 h-5 text-[#D4A373]" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1615] block leading-none">
                ZIA
              </span>
              <span className="text-[10px] tracking-[0.25em] font-semibold text-[#8C7A6B] uppercase block mt-1">
                Books
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav id="desktop-nav-links" className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A423B]">
            <button
              id="nav-link-home"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#1A1615] transition-colors py-1 cursor-pointer"
            >
              Home
            </button>
            <button
              id="nav-link-books"
              onClick={() => scrollToSection('featured-books-section')}
              className="hover:text-[#1A1615] transition-colors py-1 cursor-pointer"
            >
              Books
            </button>
            <button
              id="nav-link-categories"
              onClick={() => scrollToSection('categories-section')}
              className="hover:text-[#1A1615] transition-colors py-1 cursor-pointer"
            >
              Categories
            </button>
            <button
              id="nav-link-bestsellers"
              onClick={() => scrollToSection('bestsellers-section')}
              className="hover:text-[#1A1615] transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              Best Sellers
              <span className="w-1.5 h-1.5 rounded-full bg-[#C58940]"></span>
            </button>
            <button
              id="nav-link-newarrivals"
              onClick={() => scrollToSection('new-arrivals-section')}
              className="hover:text-[#1A1615] transition-colors py-1 cursor-pointer"
            >
              New Arrivals
            </button>
            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about-section')}
              className="hover:text-[#1A1615] transition-colors py-1 cursor-pointer"
            >
              About
            </button>
            <button
              id="nav-link-contact"
              onClick={() => scrollToSection('footer-section')}
              className="hover:text-[#1A1615] transition-colors py-1 cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Nav Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              id="nav-search-button"
              onClick={onSearchFocus}
              aria-label="Search bookstore"
              className="p-2.5 text-[#4A423B] hover:text-[#1A1615] hover:bg-[#EFEBE4] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              id="nav-wishlist-button"
              onClick={onOpenWishlist}
              aria-label="Wishlist"
              className="relative p-2.5 text-[#4A423B] hover:text-[#1A1615] hover:bg-[#EFEBE4] rounded-full transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 bg-[#8B4254] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-button"
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2.5 text-[#4A423B] hover:text-[#1A1615] hover:bg-[#EFEBE4] rounded-full transition-colors cursor-pointer flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#231F20] text-[#FAF8F5] text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#FAF8F5]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login / User button */}
            {user ? (
              <div className="relative">
                <button
                  id="nav-user-profile-button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#EFEBE4] hover:bg-[#E6DEC3] text-[#231F20] text-xs font-medium transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#231F20] text-white flex items-center justify-center text-xs font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block max-w-[80px] truncate">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8E2D9] py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-[#F0EAE1]">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-[#1A1615] truncate">{user.name}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenWishlist();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#4A423B] hover:bg-[#FAF8F5] flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5" /> My Wishlist ({wishlistCount})
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenCart();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#4A423B] hover:bg-[#FAF8F5] flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> My Bag ({cartCount})
                    </button>
                    <div className="border-t border-[#F0EAE1] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-login-button"
                onClick={onOpenAuth}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase rounded-full bg-[#231F20] text-[#FAF8F5] hover:bg-[#3B3435] transition-all duration-200 shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              id="nav-mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A423B] hover:text-[#1A1615] rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-6 py-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4 text-base font-medium text-[#3B3435]">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EFEBE4]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('featured-books-section')}
              className="text-left py-2 border-b border-[#EFEBE4]"
            >
              Books
            </button>
            <button
              onClick={() => scrollToSection('categories-section')}
              className="text-left py-2 border-b border-[#EFEBE4]"
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection('bestsellers-section')}
              className="text-left py-2 border-b border-[#EFEBE4] flex items-center justify-between"
            >
              <span>Best Sellers</span>
              <span className="text-xs bg-[#C58940]/15 text-[#C58940] px-2 py-0.5 rounded font-semibold">Hot</span>
            </button>
            <button
              onClick={() => scrollToSection('new-arrivals-section')}
              className="text-left py-2 border-b border-[#EFEBE4]"
            >
              New Arrivals
            </button>
            <button
              onClick={() => scrollToSection('special-offer-section')}
              className="text-left py-2 border-b border-[#EFEBE4] text-[#8B4254] font-semibold"
            >
              Special Offer (30% Off)
            </button>
            <button
              onClick={() => scrollToSection('about-section')}
              className="text-left py-2 border-b border-[#EFEBE4]"
            >
              About ZIA
            </button>
            <button
              onClick={() => scrollToSection('footer-section')}
              className="text-left py-2"
            >
              Contact Us
            </button>

            {!user && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="mt-2 w-full py-3 bg-[#231F20] text-[#FAF8F5] rounded-xl text-center font-medium text-sm flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> Sign In / Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
