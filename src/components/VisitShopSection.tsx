import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, Navigation } from 'lucide-react';

export const VisitShopSection: React.FC = () => {
  const mapSearchUrl = "https://www.google.com/maps/search/?api=1&query=7A+manohar+vihar+agra+road+jaipur(302031)";
  const mapDirectionUrl = "https://www.google.com/maps/dir/?api=1&destination=7A+manohar+vihar+agra+road+jaipur(302031)";

  return (
    <section id="visit" className="py-16 sm:py-20 bg-gradient-to-b from-white via-[#FFF8F0]/60 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F4C3F] mb-2">
            <span className="w-5 h-px bg-[#0F4C3F]"></span>
            दुकान का पता व नियम • In-Store Visit & Policy
            <span className="w-5 h-px bg-[#0F4C3F]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F4C3F]">
            Visit Our Shop • राधा बुटीक सेन्टर पर पधारें
          </h2>
          <p
            className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed"
            style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 'normal', fontSize: '10px' }}
          >
            हमारे यहाँ सभी सिलाई कार्य <strong>केवल दुकान पर ऑफलाइन</strong> किए जाते हैं। सही फिटिंग, पारदर्शी दरें और व्यक्तिगत ध्यान — यही हमारी पहचान है।
          </p>
        </div>

        {/* 3 Core Offline Tailoring Rules Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Rule 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#0F4C3F]/15 shadow-sm hover:shadow-md transition">
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
              खुद का कपड़ा लाएं (Bring Your Fabric)
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              आप अपना बिना सिला कपड़ा, साड़ी का ब्लाउज पीस या सूट मटीरियल लेकर दुकान पर आएं। हम केवल सिलाई (कस्टम टेलरिंग) करते हैं, तैयार कपड़ा नहीं बेचते।
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#0F4C3F]/15 shadow-sm hover:shadow-md transition">
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
              नाप दुकान पर ही लिया जाएगा (In-Shop Measurement)
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              100% परफेक्ट फिटिंग के लिए दुकान पर ही अनुभवी महिला टेलर द्वारा शारीरिक नाप लिया जाता है। ऑनलाइन नाप के अनुमान से बचने के लिए दुकान पर आना अनिवार्य है।
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#0F4C3F]/15 shadow-sm hover:shadow-md transition">
            <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
              ट्रायल करें व ले जाएं — नो डिलीवरी (Self Pick-Up)
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>हम होम डिलीवरी नहीं करते हैं।</strong> आपका परिधान तैयार होने पर बुटीक पर आएं, प्राइवेट ट्रायल रूम में पहनकर फिटिंग चेक करें और संतुष्ट होकर ले जाएं।
            </p>
          </div>
        </div>

        {/* Address, Timing, and Google Map Directions Card */}
        <div className="bg-[#0F4C3F] text-white rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#E91E63]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Address & Contact Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Boutique Location & Timings</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold">
                राधा बुटीक सेन्टर (Radha Bootic Centre)
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-gray-200">
                {/* Google Maps Location Block */}
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 group hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0 mt-0.5 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <img src="/assets/aistudio/image_61628a68.png" alt="Google Maps" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">दुकान का पूरा पता (Tap to Open Maps):</p>
                    <p className="font-semibold text-white text-base underline-offset-2 group-hover:underline">
                      P. No. 35 near 7A मनोहर बिहार, जगदम्बा कॉलोनी, आगरा रोड, जयपुर (302031)
                    </p>
                    <p className="text-gray-300 text-xs mt-0.5">
                      P. No. 35 Near 7A Manohar Vihar, Jagdamba Colony, Agra Road, Jaipur (302031)
                    </p>
                  </div>
                </a>

                {/* Opening Hours Block */}
                <div className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0 mt-0.5 transition duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Clock className="w-5 h-5 text-[#0F4C3F]" />
                  </div>
                  <div>
                    <p className="font-bold text-white">दुकान खुलने का समय:</p>
                    <p>सोमवार से शनिवार: सुबह 10:00 बजे से रात 8:30 बजे तक</p>
                    <p className="text-gray-300">रविवार: सुबह 11:00 बजे से शाम 6:00 बजे तक</p>
                  </div>
                </div>

                {/* Phone Call Block */}
                <a
                  href="tel:+919950055657"
                  className="flex items-start gap-3.5 group hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0 mt-0.5 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <img src="/assets/aistudio/image_a0ea2cb6.png" alt="Call Shop" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">फोन व संपर्क (Tap to Call):</p>
                    <p className="text-base font-bold text-[#D4AF37] group-hover:underline">+91 99500 55657</p>
                    <p className="text-gray-300 text-xs">Direct call or WhatsApp consultation</p>
                  </div>
                </a>
              </div>

              {/* Action Buttons: Google Maps spans 100% full width, Call & WhatsApp split the exact same width 50/50 below */}
              <div className="pt-2 flex flex-col gap-3 w-full max-w-xl">
                {/* Row 1: Google Maps Direct Directions (Full Width) */}
                <a
                  href={mapDirectionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shimmer group w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] text-[#0F4C3F] font-bold text-xs sm:text-sm shadow-md hover:shadow-2xl hover:shadow-[#D4AF37]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer border border-white/50 text-center"
                >
                  <div className="w-8 h-8 rounded-xl bg-white p-1 shadow-md flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shrink-0">
                    <img src="/assets/aistudio/image_61628a68.png" alt="Google Maps" className="w-full h-full object-contain" />
                  </div>
                  <span>Google Maps डायरेक्ट रास्ता देखें (P. No. 35 near 7A मनोहर बिहार, जयपुर)</span>
                </a>

                {/* Row 2: Call and WhatsApp buttons split 50/50 matching exact total width above */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  <a
                    href="tel:+919950055657"
                    className="group w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer backdrop-blur-xs text-center"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white p-1 shadow-md flex items-center justify-center group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300 shrink-0">
                      <img src="/assets/aistudio/image_a0ea2cb6.png" alt="Call" className="w-full h-full object-contain" />
                    </div>
                    <span>कॉल करें (+91 99500 55657)</span>
                  </a>

                  <a
                    href={`https://wa.me/919950055657?text=${encodeURIComponent('Namaste Radha Bootic Centre, I am coming to your shop at P. No. 35 Near 7A Manohar Vihar, Jagdamba Colony, Agra Road, Jaipur (302031). Please share exact Google Maps location link.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98 cursor-pointer border border-white/30 text-center"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white p-1 shadow-md flex items-center justify-center group-hover:scale-125 transition-all duration-300 shrink-0">
                      <img src="/assets/aistudio/image_009dfac3.png" alt="WhatsApp" className="w-full h-full object-contain" />
                    </div>
                    <span>लोकेशन WhatsApp पर मांगें</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Map Visual Box */}
            <div className="lg:col-span-5 bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md text-center space-y-4 hover:border-[#D4AF37]/60 transition duration-300 shadow-xl">
              <div className="w-18 h-18 mx-auto rounded-full bg-white p-2 shadow-lg flex items-center justify-center transform hover:scale-110 transition duration-300">
                <img
                  src="/assets/aistudio/logo_3fe417b7.png"
                  alt="Radha Bootic Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-serif font-bold text-xl text-white">
                Radha Bootic Centre
              </h4>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                📍 P. No. 35 near 7A मनोहर बिहार, जगदम्बा कॉलोनी, जयपुर (302031)
              </p>
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-shimmer group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-white hover:bg-[#FFF8F0] text-[#0F4C3F] font-bold text-xs shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-108 active:scale-95 cursor-pointer border border-[#D4AF37]/40"
              >
                <div className="w-6 h-6 rounded-lg bg-[#0F4C3F]/5 p-0.5 shadow-xs flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shrink-0">
                  <img src="/assets/aistudio/image_61628a68.png" alt="Google Maps" className="w-full h-full object-contain" />
                </div>
                <span>Google Maps पर direct location खोलें</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
