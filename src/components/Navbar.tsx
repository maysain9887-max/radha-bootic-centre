import React from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenBooking?: () => void;
  onOpenRates: () => void;
  onOpenChat: () => void;
  onPlayVideo?: () => void;
  onVisitShop?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRates,
  onVisitShop,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleVisitClick = () => {
    if (onVisitShop) {
      onVisitShop();
    } else {
      const el = document.getElementById('visit');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#0F4C3F]/10 shadow-sm transition duration-300">
      {/* Top Boutique Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0A382E] via-[#0F4C3F] to-[#0A382E] text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-[#D4AF37] text-[#0F4C3F] font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs tracking-wider uppercase">SHOP NOTICE</span>
          <span className="tracking-tight">कपड़ा खुद लाओ • नाप दुकान पर दो • ट्रायल करके ले जाओ (No Home Delivery)</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+919950055657"
            className="text-[#FADADD] hover:text-white font-mono text-xs flex items-center gap-2 group cursor-pointer transition-colors duration-200"
          >
            <div className="w-5 h-5 rounded-full bg-white p-0.5 shadow-xs flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              <img src="/assets/aistudio/image_a0ea2cb6.png" alt="Call Shop" className="w-full h-full object-contain" />
            </div>
            <span>दुकान फोन: +91 99500 55657</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group mr-3 lg:mr-6 xl:mr-10 shrink-0">
            <div className="relative p-1 rounded-2xl bg-gradient-to-b from-white to-[#FFF8F0] shadow-sm group-hover:shadow-md transition duration-300 border border-[#D4AF37]/20">
              <img
                src="/assets/aistudio/logo_3fe417b7.png"
                alt="Radha Bootic Centre Logo"
                className="h-12 sm:h-14 w-auto object-contain transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0F4C3F] leading-tight group-hover:text-[#E91E63] transition-colors duration-300">
                Radha Bootic<span className="hidden sm:inline"> Centre</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-sans text-gray-500 font-medium">
                Women's & Girls' Atelier
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with animated hover underlines */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-gray-700">
            <a
              href="#services"
              className="relative py-1 text-gray-700 hover:text-[#0F4C3F] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0F4C3F] hover:after:w-full after:transition-all after:duration-300"
            >
              Services
            </a>
            <a
              href="#catalog"
              className="relative py-1 text-gray-700 hover:text-[#0F4C3F] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0F4C3F] hover:after:w-full after:transition-all after:duration-300"
            >
              Designs & Samples
            </a>
            <button
              onClick={onOpenRates}
              className="relative py-1 text-gray-700 hover:text-[#0F4C3F] transition-colors duration-200 cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E91E63] hover:after:w-full after:transition-all after:duration-300 font-semibold"
            >
              Rate Card
            </button>
            <a
              href="#how-it-works"
              className="relative py-1 text-gray-700 hover:text-[#0F4C3F] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0F4C3F] hover:after:w-full after:transition-all after:duration-300"
            >
              How It Works
            </a>
            <button
              onClick={handleVisitClick}
              className="relative py-1 text-gray-700 hover:text-[#0F4C3F] transition-colors duration-200 cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300 font-semibold"
            >
              Visit Shop
            </button>
            <a
              href="#about"
              className="relative py-1 text-gray-700 hover:text-[#0F4C3F] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0F4C3F] hover:after:w-full after:transition-all after:duration-300"
            >
              About
            </a>
            <a
              href="#testimonials"
              className="relative py-1 text-gray-700 hover:text-[#0F4C3F] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0F4C3F] hover:after:w-full after:transition-all after:duration-300"
            >
              Testimonials
            </a>
          </nav>

          {/* Mobile Hamburger Menu Trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:bg-[#FFF8F0] hover:text-[#0F4C3F] transition active:scale-95 border border-gray-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E91E63]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 px-2 space-y-2 bg-white rounded-b-2xl shadow-xl">
            <a
              href="tel:+919950055657"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#0F4C3F] text-white font-bold text-xs shadow-md active:scale-95 transition"
            >
              <div className="w-5 h-5 rounded-full bg-white p-0.5 shadow-xs flex items-center justify-center">
                <img src="/assets/aistudio/image_a0ea2cb6.png" alt="Call Shop" className="w-full h-full object-contain" />
              </div>
              <span>दुकान फोन करें (+91 99500 55657)</span>
            </a>

            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Services
            </a>
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Designs & Reference Samples
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRates();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Official Rate Card
            </button>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              How It Works
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              About Radha Bootic
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Testimonials
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
