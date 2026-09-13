import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Fiction', 'New Arrivals']);
  const [submitted, setSubmitted] = useState(false);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section id="newsletter-section" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#231F20] text-[#FAF8F5] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-xl border border-[#3A3332]">
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#C58940]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#8B4254]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#E6B87D] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Literary Dispatch</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FFFBF5]">
              Stay in the Story
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#D4C8BC] leading-relaxed">
              Get updates about new arrivals, best sellers and exclusive offers.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 bg-white/10 rounded-2xl border border-white/15 animate-in fade-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 text-[#50C878] mx-auto mb-2" />
                <h3 className="font-serif text-xl font-bold text-white">Welcome to the ZIA Circle</h3>
                <p className="text-xs text-[#E0D7CD] mt-1">
                  We have dispatched your complimentary reading guide and 30% discount voucher to <strong className="text-white">{email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="mt-4 text-xs text-[#E6B87D] hover:underline"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                {/* Email input bar */}
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 focus-within:border-[#E6B87D] transition-colors">
                  <div className="pl-3.5 text-[#B3A497] hidden sm:block">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full py-3 px-3 sm:px-0 bg-transparent text-sm text-white placeholder-white/50 focus:outline-none"
                  />
                  <button
                    id="newsletter-subscribe-button"
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#E6B87D] text-[#1E1715] hover:bg-[#D4A373] text-xs sm:text-sm font-bold rounded-xl transition-colors whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Genre chips */}
                <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-xs text-white/60">I'm interested in:</span>
                  {['Fiction', 'Self Development', 'Sci-Fi', 'Mystery', 'Special Offers'].map((g) => {
                    const isSelected = selectedGenres.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggleGenre(g)}
                        className={`text-[11px] px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#E6B87D]/20 text-[#E6B87D] border border-[#E6B87D]/50'
                            : 'bg-white/5 text-white/60 border border-white/10 hover:text-white'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-[11px] text-white/50">
                  By subscribing, you agree with our Privacy Policy. No spam, ever. Unsubscribe at any time.
                </p>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
