import React, { useState } from 'react';
import { CLIENT_TESTIMONIALS } from '../data/boutiqueData';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? CLIENT_TESTIMONIALS.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === CLIENT_TESTIMONIALS.length - 1 ? 0 : c + 1));
  };

  const current = CLIENT_TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#FFF8F0]/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E91E63] mb-2">
            <span className="w-5 h-px bg-[#E91E63]"></span>
            Happy Customers
            <span className="w-5 h-px bg-[#E91E63]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F4C3F]">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial Card Slider */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/30 flex flex-col items-center text-center transition duration-500 hover:shadow-[#0F4C3F]/10">
          <Quote className="w-10 h-10 text-[#FADADD] mb-4" />

          {/* 5 Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            ))}
          </div>

          <p className="font-serif italic text-lg sm:text-2xl text-gray-800 leading-relaxed max-w-2xl">
            "{current.quote}"
          </p>

          <div className="mt-8 flex items-center gap-3">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E91E63] shadow-sm transform hover:scale-110 transition duration-300"
            />
            <div className="text-left">
              <h4 className="font-serif font-bold text-base text-gray-900">
                {current.name}
              </h4>
              <p className="text-xs text-gray-500">
                {current.city} • <span className="text-[#0F4C3F] font-semibold">{current.outfit}</span>
              </p>
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2.5 rounded-full bg-gray-100 hover:bg-[#FADADD] hover:text-[#0F4C3F] text-gray-700 transition transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {CLIENT_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'bg-[#E91E63] w-6' : 'bg-gray-300 w-2.5 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2.5 rounded-full bg-gray-100 hover:bg-[#FADADD] hover:text-[#0F4C3F] text-gray-700 transition transform hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
