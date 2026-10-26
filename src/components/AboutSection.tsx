import React from 'react';
import { CheckCircle2, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FFF8F0]/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Craftsmanship Photo Card */}
          <div className="lg:col-span-6 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white transition duration-500 transform group-hover:-translate-y-1">
              <img
                src="/assets/aistudio/blouse_aari_work2_bb364545.jpg"
                alt="Radha Bootic Tailor Stitching with Love"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Made with Love overlay badge */}
              <div className="absolute bottom-6 left-6 text-white">
                <span className="font-serif italic text-2xl sm:text-3xl font-bold flex items-center gap-2">
                  Made with Love <Heart className="w-6 h-6 text-[#E91E63] fill-[#E91E63] animate-pulse" />
                </span>
                <p className="text-xs text-pink-100 mt-1 font-medium">
                  Artisanal seams, hand-tacked lining, and delicate latkans.
                </p>
              </div>
            </div>

            {/* Accent gold badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#0F4C3F] text-white px-5 py-3.5 rounded-2xl shadow-2xl hidden sm:flex items-center gap-3 border border-[#D4AF37]/30 transform group-hover:scale-105 transition duration-300">
              <span className="font-serif text-3xl font-bold text-gold-gradient">15+</span>
              <div className="text-xs">
                <p className="font-bold">Years of Heritage</p>
                <p className="text-gray-300">In Ladies Ethnic Wear</p>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E91E63]">
              <span className="w-5 h-px bg-[#E91E63]"></span>
              About Us
              <span className="w-5 h-px bg-[#E91E63]"></span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F4C3F] leading-tight">
              Radha Bootic Centre
            </h2>

            <p className="text-base text-gray-700 leading-relaxed">
              We are a dedicated ladies & girls tailoring boutique providing high-quality stitching services with uncompromising attention to detail. Our mission is to make every woman and young girl feel confident, comfortable, and beautiful in custom clothing stitched to her exact measurements.
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              From our famous <strong>₹100 Sada Blouse</strong> and <strong>₹250 Astar Blouse</strong> to opulent bridal velvet lehengas and tiered girls' party gowns, our master cut and drape every piece with passion.
            </p>

            {/* 3 Pillars matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-3.5 rounded-2xl bg-white border border-[#0F4C3F]/10 shadow-2xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#E91E63] shrink-0" />
                <span className="text-xs font-bold text-gray-900">Premium Quality</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#0F4C3F]/10 shadow-2xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0F4C3F] shrink-0" />
                <span className="text-xs font-bold text-gray-900">Affordable Prices</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#0F4C3F]/10 shadow-2xs flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold text-gray-900">On-Time Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
