import React from 'react';
import { 
  BookOpen, Heart, Compass, Sparkles, Flame, Sunrise, Cpu, GraduationCap, ArrowUpRight 
} from 'lucide-react';
import { Category } from '../types';

interface CategorySectionProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Heart,
  Compass,
  Sparkles,
  Flame,
  Sunrise,
  Cpu,
  GraduationCap,
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories-section" className="py-20 bg-[#FAF8F5] border-t border-[#EFEBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#A26D3F] mb-2">
              Browse Our Library
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615]">
              Curated Categories
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6E6358] max-w-md">
            Delve into carefully gathered volumes selected by our master literary curators, 
            spanning beloved fiction to cutting-edge technological inquiry.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || BookOpen;
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase() || 
                               selectedCategory.toLowerCase() === cat.slug.toLowerCase();

            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => {
                  onSelectCategory(cat.name);
                  const el = document.getElementById('featured-books-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isSelected
                    ? 'ring-2 ring-[#C58940] shadow-lg'
                    : 'border border-[#EAE3D8] hover:border-[#D5C7B5] hover:shadow-md'
                }`}
                style={{ height: '230px' }}
              >
                {/* Background image with overlay */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1615]/95 via-[#1A1615]/60 to-[#1A1615]/20 group-hover:via-[#1A1615]/40 transition-colors" />

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                  
                  {/* Top: Icon + Count */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-[#C58940] transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium tracking-wider text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                      {cat.count} Titles
                    </span>
                  </div>

                  {/* Bottom: Name + Description + Arrow */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F3D7B5] transition-colors">
                        {cat.name}
                      </h3>
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-white/70 mt-1.5 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                </div>

                {/* Active indicator dot */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#C58940] ring-4 ring-white" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
