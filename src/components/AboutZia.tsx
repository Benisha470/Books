import React from 'react';
import { BookOpen, Users, Globe2, Award, HeartHandshake } from 'lucide-react';

export const AboutZia: React.FC = () => {
  return (
    <section id="about-section" className="py-24 bg-[#F5EFE6] border-y border-[#E6DBCB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Collage / Bookstore Aesthetic */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-[#D8CEBE]">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
                alt="ZIA Bookstore Interior"
                className="w-full h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-xs uppercase tracking-widest text-[#E6B87D] font-bold">
                  Our Flagship Philosophy
                </span>
                <p className="font-serif text-2xl font-bold mt-1">
                  A sanctuary for inquisitive minds and tactile readers.
                </p>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 z-20 bg-white p-5 rounded-2xl shadow-xl border border-[#EAE3D8] max-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#A26D3F] border border-[#E8E2D9]">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-[#1A1615] block leading-tight">
                    120,000+
                  </span>
                  <span className="text-[11px] text-[#6E6358] font-medium">
                    Books shared worldwide
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A26D3F] block mb-3">
              About ZIA Books
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615] leading-tight">
              “ZIA is a modern bookstore created for readers who love discovering new stories, ideas and knowledge.”
            </h2>

            <p className="mt-6 text-sm sm:text-base text-[#5A5046] leading-relaxed">
              Founded on the conviction that a physical book is one of humanity’s most enduring technologies, 
              ZIA curates works that provoke curiosity, kindle empathy, and provide an antidote to digital noise. 
              From rare collector hardcovers to contemporary debuts, every edition is hand-inspected for exceptional typography, archival paper, and lasting beauty.
            </p>

            {/* Metrics */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-[#E4DBD0]">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1615] block">
                  50k+
                </span>
                <span className="text-xs text-[#7A6E63] mt-1 block">Curated Titles</span>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#A26D3F] block">
                  98%
                </span>
                <span className="text-xs text-[#7A6E63] mt-1 block">Satisfied Readers</span>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1615] block">
                  45+
                </span>
                <span className="text-xs text-[#7A6E63] mt-1 block">Countries Served</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
