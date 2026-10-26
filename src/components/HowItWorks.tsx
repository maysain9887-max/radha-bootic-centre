import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/boutiqueData';
import { Sparkles, Ruler, Scissors, Store, MapPin, AlertCircle } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
  onVisitShop?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onVisitShop }) => {
  const getIcon = (idx: number) => {
    if (idx === 0) return <Sparkles className="w-6 h-6 text-[#E91E63]" />;
    if (idx === 1) return <Ruler className="w-6 h-6 text-[#0F4C3F]" />;
    if (idx === 2) return <Scissors className="w-6 h-6 text-[#D4AF37]" />;
    return <Store className="w-6 h-6 text-[#0F4C3F]" />;
  };

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
    <section id="how-it-works" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F4C3F] mb-2">
            <span className="w-5 h-px bg-[#0F4C3F]"></span>
            सिलाई प्रक्रिया • Tailoring Process
            <span className="w-5 h-px bg-[#0F4C3F]"></span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-serif font-bold text-[#0F4C3F]"
            style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', textAlign: 'center', fontSize: '28px' }}
          >
            कपड़ा लाओ, नाप दो, ट्रायल करके ले जाओ
          </h2>
          <p
            className="mt-2 text-sm text-gray-600"
            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '10px', lineHeight: '21px' }}
          >
            हम होम डिलीवरी नहीं करते हैं। 100% परफेक्ट फिटिंग व संतुष्टि के लिए सभी काम हमारी दुकान पर ऑफलाइन होते हैं।
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-[#FFF8F0] via-white to-[#FAF3EC] border border-[#0F4C3F]/10 hover:border-[#D4AF37]/50 shadow-xs hover:shadow-2xl hover:shadow-[#0F4C3F]/10 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                <span className="text-xs font-mono font-bold text-[#D4AF37] block mb-2 tracking-wider">
                  STEP {step.number}
                </span>
                <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:border-[#D4AF37]/30">
                  {getIcon(idx)}
                </div>
                <h3 className="font-serif font-bold text-base text-gray-900 mb-2 group-hover:text-[#0F4C3F] transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#D4AF37] font-bold text-lg">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Offline Tailoring Notice Box */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border border-amber-200 text-center max-w-3xl mx-auto shadow-sm">
          <div className="flex items-center justify-center gap-2 text-amber-900 font-bold text-sm mb-1">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span style={{ fontFamily: 'Cormorant Garamond' }}>विशेष ध्यान दें: नो होम डिलीवरी पॉलिसी</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            ऑनलाइन केवल आप हमारे सैम्पल डिज़ाइन देख सकते हैं। कपड़े की सिलाई के लिए आपको अपना कपड़ा लेकर <strong>राधा बुटीक की दुकान पर ही आना होगा</strong>, यहीं नाप लिया जाएगा और तैयार होने पर दुकान पर ही ट्रायल करके आपको दिया जाएगा।
          </p>
          <div className="mt-4">
            <button
              onClick={handleVisitShop}
              className="btn-shimmer inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#0F4C3F] hover:bg-[#0A382E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              Visit Our Shop (दुकान का पता व समय)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
