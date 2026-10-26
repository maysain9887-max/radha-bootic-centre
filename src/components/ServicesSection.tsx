import React from 'react';
import { Sparkles, Scissors, Shirt, Ruler } from 'lucide-react';

interface ServicesSectionProps {
  onSelectCategory: (cat: string) => void;
  onOpenBooking: () => void;
  onOpenRates: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectCategory,
  onOpenBooking,
  onOpenRates,
}) => {
  const services = [
    {
      id: 'blouse',
      title: 'Blouse Stitching',
      category: 'blouses',
      priceText: 'Starts Rs. 100',
      description: 'Sada (Rs. 100), Astar cotton lined (Rs. 250), and designer padded blouses (Rs. 350+) with custom necklines and latkans.',
      icon: (
        <svg className="w-8 h-8 text-[#0F4C3F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6L8 3H16L20 6L18 10L16 9V20H8V9L6 10L4 6Z" />
          <path d="M10 3V8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8V3" />
        </svg>
      ),
    },
    {
      id: 'dress',
      title: 'Lehenga & Bridal Stitching',
      category: 'lehengas',
      priceText: 'Starts Rs. 700',
      description: 'Bridal lehengas (Rs. 700 - 1,000), double can-can flare, padded choli, and dupatta border pico setting.',
      icon: (
        <svg className="w-8 h-8 text-[#E91E63]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2L8 8H16L12 2Z" />
          <path d="M8 8L4 22H20L16 8" />
          <path d="M8 14H16" />
        </svg>
      ),
    },
    {
      id: 'suit',
      title: 'Suit & Kurti Stitching',
      category: 'suits',
      priceText: 'Starts Rs. 300',
      description: 'Straight kurti, Punjabi Patiala suit, flared Anarkali, angrakha, and trouser pant pairings with fine piping.',
      icon: (
        <svg className="w-8 h-8 text-[#E91E63]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 3H18L17 11H7L6 3Z" />
          <path d="M7 11L5 21H19L17 11" />
          <path d="M10 3V8H14V3" />
        </svg>
      ),
    },
    {
      id: 'girls',
      title: 'Girls Festive Wear & Gowns',
      category: 'girls',
      priceText: 'Starts Rs. 400',
      description: 'Four-tiered ruffle party gowns, soft-lined kids lehengas, and comfortable ethnic wear for girls.',
      icon: (
        <svg className="w-8 h-8 text-[#0F4C3F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 4H17L19 20H5L7 4Z" />
          <path d="M5 10H19" />
          <path d="M12 4V20" />
        </svg>
      ),
    },
    {
      id: 'classes',
      title: 'Silai Training Classes',
      category: 'all',
      priceText: 'Rs. 1,000 / mo',
      description: 'Professional 3-month comprehensive tailoring course taught directly by Radha Ji. Personal hands-on instruction.',
      icon: (
        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14.5 4L20 9.5L9.5 20L4 14.5L14.5 4Z" />
          <path d="M18 7.5L16.5 6" />
          <circle cx="6" cy="18" r="1" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E91E63] mb-2">
            <span className="w-5 h-px bg-[#E91E63]"></span>
            What Radha Bootic Makes
            <span className="w-5 h-px bg-[#E91E63]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F4C3F]">
            What We Make • Signature Tailoring & Creations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Dedicated 100% to ladies and girls tailoring with 15+ years experience. Perfect fit, honest rates, and boutique finishing.
          </p>
        </div>

        {/* 5-Column Service Cards matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => {
                onSelectCategory(srv.category);
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group cursor-pointer bg-gradient-to-b from-[#FFF8F0] via-white to-[#FAF3EC] hover:from-white hover:to-[#FFF8F0] p-5 sm:p-6 rounded-2xl border border-[#0F4C3F]/10 hover:border-[#D4AF37]/50 shadow-xs hover:shadow-2xl hover:shadow-[#0F4C3F]/10 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Subtle gold top border highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-pink-100 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:border-[#D4AF37]/30">
                {srv.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#0F4C3F] transition-colors duration-200 min-h-[44px] flex items-center justify-center">
                {srv.title}
              </h3>

              {/* Price Pill */}
              <span className="mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#0F4C3F]/10 text-[#0F4C3F] group-hover:bg-[#E91E63] group-hover:text-white transition-colors duration-300 shadow-xs">
                {srv.priceText}
              </span>

              {/* Short snippet */}
              <p className="mt-3 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                {srv.description}
              </p>

              {/* Hover Prompt */}
              <span className="mt-4 text-[11px] font-bold text-[#E91E63] group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                Explore designs →
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Quick Rate Card Callout */}
        <div className="mt-12 bg-gradient-to-r from-[#0F4C3F] via-[#145a4a] to-[#0F4C3F] rounded-2xl p-6 sm:p-8 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#D4AF37]/30 relative overflow-hidden">
          <div className="space-y-1 text-center sm:text-left relative z-10">
            <span className="text-[#D4AF37] font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 justify-center sm:justify-start">
              <span>✦ 100% Transparent Boutique Pricing</span>
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold">
              Looking for exact stitching rates?
            </h4>
            <p className="text-xs sm:text-sm text-gray-200">
              Basic Blouse Rs. 100 • Astar Blouse Rs. 250 • Designer Blouse Rs. 350 • Sada Suit Rs. 300 • Lehenga Rs. 700
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={onOpenRates}
              className="btn-shimmer px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0F4C3F] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Open Full Rate List
            </button>
            <a
              href="https://wa.me/919950055657?text=Namaste%20Radha%20Bootic%20Centre,%20I%20want%20to%20enquire%20about%20your%20stitching%20services%20and%20designs."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
