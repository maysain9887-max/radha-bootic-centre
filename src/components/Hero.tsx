import React, { useState, useEffect } from 'react';
import { MapPin, Tag } from 'lucide-react';
import { PetalDissolveText } from './PetalDissolveText';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenRates: () => void;
  onPlayVideo?: () => void;
  onVisitShop?: () => void;
}

const TYPEWRITER_HIGHLIGHTS = [
  "✦ 15+ Years Tailoring Experience — 15 से भी अधिक वर्षों का विश्वसनीय बुटीक अनुभव",
  "✦ 4000+ Stitched Outfits — 4000 से अधिक परिधान सफलतापूर्वक सिले गए",
  "✦ 100% Women & Girls Specialist — केवल महिलाओं व बच्चियों के कपड़ों की 100% परफेक्ट फिटिंग सिलाई"
];

export const Hero: React.FC<HeroProps> = ({ onOpenRates, onVisitShop }) => {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = TYPEWRITER_HIGHLIGHTS[highlightIndex];
    const typingSpeed = isDeleting ? 20 : 45;

    if (!isDeleting && displayedText === fullText) {
      const timer = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(timer);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setHighlightIndex((prev) => (prev + 1) % TYPEWRITER_HIGHLIGHTS.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? fullText.substring(0, displayedText.length - 1)
          : fullText.substring(0, displayedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, highlightIndex]);

  const currentFullText = TYPEWRITER_HIGHLIGHTS[highlightIndex];
  const progressPercent = currentFullText.length > 0
    ? (displayedText.length / currentFullText.length) * 100
    : 0;

  const handleVisitShop = () => {
    if (onVisitShop) {
      onVisitShop();
    } else {
      const el = document.getElementById('visit');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F0] via-white to-[#FFF8F0] pt-8 pb-16 sm:py-20">
      {/* Decorative floral background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FADADD]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F4C3F]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20 animate-pulse-glow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            {/* Tag Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F4C3F]/5 border border-[#0F4C3F]/15 text-[#0F4C3F] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
              जयपुर का प्रसिद्ध लेडीज टेलरिंग सेंटर
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1
                data-text="Radha Bootic Centre"
                className="glitch-text text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0F4C3F] tracking-tight leading-tight"
              >
                Radha Bootic Centre
              </h1>
              <PetalDissolveText text="Ladies Tailoring & Stitching" align="responsive" className="max-w-md mx-auto lg:mx-0" />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg font-serif italic text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              All tailoring orders are taken strictly offline at our shop. Bring your own fabric, get physically measured for a 100% flawless fit, and pick up after trial.
              <span className="block mt-2 text-xs sm:text-sm font-sans not-italic font-semibold text-[#0F4C3F]">
                ✦ (हम होम डिलीवरी नहीं करते हैं — खुद कपड़ा लाएं और दुकान पर नाप दें!)
              </span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                type="button"
                onClick={handleVisitShop}
                className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#0F4C3F] hover:bg-[#0A382E] text-white text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-[#0F4C3F]/20 transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer ring-2 ring-[#0F4C3F]/20"
              >
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Visit Our Shop</span>
              </button>

              <button
                onClick={onOpenRates}
                className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E91E63] hover:bg-[#c2185b] text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-[#E91E63]/25 transition transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Tag className="w-4 h-4" />
                <span>Rate Card (Starts ₹100)</span>
              </button>
            </div>

            {/* Pure Typewriting Text Banner */}
            <div className="pt-6 border-t border-gray-200/80">
              <div className="bg-gradient-to-r from-[#0F4C3F]/10 via-[#E91E63]/10 to-[#D4AF37]/10 p-2.5 sm:p-3 rounded-2xl border border-[#0F4C3F]/20 shadow-xs backdrop-blur-xs text-left">
                <div className="min-h-[44px] sm:min-h-[38px] relative overflow-hidden flex items-center bg-white/95 px-4 py-2.5 rounded-xl border border-gray-200/80 shadow-inner">
                  {/* Progressive light color fill background */}
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0F4C3F]/15 via-[#E91E63]/15 to-[#D4AF37]/25 transition-all duration-75 ease-out rounded-l-xl"
                    style={{ width: `${progressPercent}%` }}
                  />

                  <p className="relative z-10 text-xs sm:text-sm font-semibold text-[#0F4C3F] leading-snug">
                    {displayedText}
                    <span className="inline-block w-2 h-4 ml-1 bg-[#E91E63] animate-pulse align-middle rounded-xs"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Reference Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white transition duration-500 transform group-hover:-translate-y-1 group-hover:shadow-[#0F4C3F]/15">
                <div className="aspect-4/5 sm:aspect-3/4 relative overflow-hidden bg-[#FAF3EC]">
                  <img
                    src="/assets/aistudio/blouse_aari_work1_497d2a0c.jpg"
                    alt="Radha Bootic Real Handcrafted Aari Work Blouse"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/60 flex items-center justify-between transition duration-300 group-hover:bg-white">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F4C3F] flex items-center gap-1">
                        <span>✦ असली बुटीक सिलाई नमूना</span>
                      </p>
                      <p className="text-sm font-serif font-bold text-gray-900">
                        Bridal Maggam Aari Blouse
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#FADADD] text-[#E91E63] text-xs font-bold shadow-xs">
                      Starts Rs. 100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


