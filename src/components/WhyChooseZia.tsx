import React from 'react';
import { Library, BadgePercent, Truck, ShieldCheck } from 'lucide-react';

export const WhyChooseZia: React.FC = () => {
  const features = [
    {
      id: 'wide-collection',
      title: 'Wide Collection',
      description: 'Over 50,000 carefully curated titles spanning classic literature, cutting-edge science, and indie press gems.',
      icon: Library,
      accent: 'bg-[#F4EFE6] text-[#A26D3F]',
    },
    {
      id: 'affordable-prices',
      title: 'Affordable Prices',
      description: 'Direct publisher partnerships allow us to offer competitive pricing, bundle discounts, and reader rewards.',
      icon: BadgePercent,
      accent: 'bg-[#F2ECE4] text-[#8B4254]',
    },
    {
      id: 'fast-delivery',
      title: 'Fast Delivery',
      description: 'Expedited climate-controlled dispatch ensures pristine book jackets, crisp corners, and prompt doorstep arrival.',
      icon: Truck,
      accent: 'bg-[#EBF5EE] text-[#2C6E49]',
    },
    {
      id: 'secure-shopping',
      title: 'Secure Shopping',
      description: 'Bank-grade 256-bit encryption, hassle-free 30-day returns, and dedicated literary customer support.',
      icon: ShieldCheck,
      accent: 'bg-[#EEF2F6] text-[#2A4365]',
    },
  ];

  return (
    <section id="why-choose-section" className="py-20 bg-[#FAF8F5] border-t border-[#EFEBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A26D3F] block mb-2">
            The ZIA Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1615]">
            Why Choose ZIA
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E6358] leading-relaxed">
            We are passionate book lovers dedicated to preserving the joy of tactile reading and seamless literary discovery.
          </p>
        </div>

        {/* 4 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                id={`feature-${item.id}`}
                className="bg-white rounded-2xl p-7 border border-[#EAE3D8] hover:border-[#D5C7B5] shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${item.accent} flex items-center justify-center mb-5`}>
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1615] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6358] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
