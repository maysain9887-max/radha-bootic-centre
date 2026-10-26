import React from 'react';
import { Clock } from 'lucide-react';

interface FooterProps {
  onOpenRates: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRates }) => {
  return (
    <footer className="bg-[#0F4C3F] text-white pt-16 pb-8 border-t border-[#0F4C3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/logo_3fe417b7.png"
                alt="Radha Bootic Centre"
                className="h-16 w-auto object-contain bg-white/95 p-1 rounded-xl shadow-md"
              />
              <div>
                <h3 className="font-serif text-lg font-bold">Radha Bootic Centre</h3>
                <p className="text-xs text-[#FADADD]">Ladies Tailoring & Stitching</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Exclusively dedicated to women's and girls' ethnic couture, bespoke designer blouses, suits, bridal lehengas, and precision tailoring.
            </p>
            <div className="text-xs text-[#D4AF37] font-serif italic">
              <span>Har Outfit, Aapke Style Ke Saath</span>
            </div>
          </div>

          {/* Tailoring Services & Rates */}
          <div>
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-[#D4AF37] mb-4">
              Services & Starting Rates
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="pt-2">
                <button
                  onClick={onOpenRates}
                  className="text-[#FADADD] hover:underline font-semibold cursor-pointer"
                >
                  View Complete Rate List →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3 text-xs text-gray-300">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-[#D4AF37] mb-4">
              Visit or Call Us
            </h4>
            
            {/* Phone link with icon & text */}
            <a
              href="tel:+919950055657"
              className="flex items-start gap-3 group hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl bg-white p-1 shadow-md flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <img src="/assets/aistudio/image_a0ea2cb6.png" alt="Phone" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-bold text-white group-hover:text-[#D4AF37] transition-colors text-sm">+91 99500 55657</p>
                <p className="text-[11px] text-gray-300">Order Enquiry & Phone Consultation (Tap to Call)</p>
              </div>
            </a>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
              <div>
                <p className="text-white">Mon – Sat: 10:00 AM – 8:30 PM</p>
                <p className="text-gray-400">Sunday: 11:00 AM – 6:00 PM</p>
              </div>
            </div>

            {/* Google Maps link with icon & text */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=7A+manohar+vihar+agra+road+jaipur(302031)"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 group hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="w-7 h-7 rounded-xl bg-white p-1 shadow-md flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <img src="/assets/aistudio/image_61628a68.png" alt="Google Maps" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-semibold text-white group-hover:text-[#D4AF37] group-hover:underline transition-colors block">
                  📍 P. No. 35, Near 7A मनोहर बिहार, जगदम्बा कॉलोनी, आगरा रोड, जयपुर (302031)
                </p>
                <p className="text-[11px] text-gray-300">P. No. 35 Near 7A Manohar Vihar, Jagdamba Colony, Jaipur (Tap for Maps)</p>
              </div>
            </a>

            <a
              href="https://wa.me/919950055657?text=Namaste%20Radha%20Bootic%20Centre,%20I%20would%20like%20to%20enquire%20about%20stitching."
              target="_blank"
              rel="noreferrer"
              className="btn-shimmer group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all transform hover:scale-105 active:scale-95 shadow-md mt-2 border border-white/20"
            >
              <div className="w-6 h-6 rounded-lg bg-white p-0.5 shadow-xs flex items-center justify-center group-hover:scale-120 transition-transform duration-300 shrink-0">
                <img src="/assets/aistudio/image_009dfac3.png" alt="WhatsApp" className="w-full h-full object-contain" />
              </div>
              <span>Chat on WhatsApp (+91 99500 55657)</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & Developer Attribution */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-300 gap-3 border-t border-white/10">
          <p className="flex items-center gap-1.5 text-gray-300">
            <span className="text-sm font-semibold text-[#D4AF37]">©</span>
            <span>2026 Radha Bootic Centre. All Rights Reserved.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 text-xs text-gray-300">
            <span>Designed & Developed by <strong className="text-[#D4AF37] font-semibold">Mayank</strong></span>
            <span className="text-white/30">•</span>
            <a
              href="https://wa.me/919887789609?text=Hello%20Mayank,%20mujhe%20apni%20dukaan/business%20ke%20liye%20website%20banwani%20hai."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#FADADD] hover:text-white transition-colors hover:underline"
            >
              <span>Aisi Website Banwane Ke Liye Contact:</span>
              <strong className="text-[#25D366] font-bold ml-0.5">9887789609</strong>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
