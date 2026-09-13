import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (categoryName: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateSection,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-[#1A1615] text-[#D8CEBE] pt-16 pb-12 border-t border-[#2D2624]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#2C2422]">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] text-[#1A1615] flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-[#C58940]" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  ZIA BOOKS
                </span>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#C58940] uppercase block mt-1">
                  Discover Stories. Explore Worlds.
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A89C8F] leading-relaxed max-w-sm mt-3">
              An independent literary bookstore devoted to timeless literature, aesthetic editions, and intellectual curiosity. 
              Shipping books worldwide with sustainable archival materials.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Facebook, label: 'Facebook' },
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <button
                    key={idx}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-[#27211F] hover:bg-[#C58940] hover:text-[#1A1615] text-[#D8CEBE] flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('hero-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('featured-books-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Browse Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('bestsellers-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('new-arrivals-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('special-offer-section')}
                  className="text-[#E6B87D] hover:underline transition-colors cursor-pointer font-medium"
                >
                  Special Offers (30% Off)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About ZIA
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 tracking-wide">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                'Fiction',
                'Romance',
                'Mystery',
                'Science Fiction',
                'Fantasy',
                'Self Development',
                'Technology',
                'Academic',
              ].map((category) => (
                <li key={category}>
                  <button
                    onClick={() => onSelectCategory(category)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Customer Support */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 tracking-wide">
              Customer Support
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C58940] shrink-0 mt-0.5" />
                <span>42 Bloomsbury Way, Literary District, London WC1A 2SE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C58940] shrink-0" />
                <span>+44 (0) 20 7946 0912</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C58940] shrink-0" />
                <span>concierge@ziabooks.com</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#2C2422]">
              <span className="text-[11px] text-[#8E8074] block">Opening Hours:</span>
              <span className="text-xs text-white block mt-0.5">Mon - Sat: 9:00 AM - 8:00 PM</span>
              <span className="text-xs text-white block">Sunday: 11:00 AM - 6:00 PM</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8074]">
          <div className="flex flex-wrap items-center gap-6">
            <span>© {new Date().getFullYear()} ZIA BOOKS. All rights reserved.</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#27211F] hover:bg-[#382E2B] text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
