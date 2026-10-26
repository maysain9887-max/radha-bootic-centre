import React, { useState } from 'react';
import { OFFICIAL_RATE_LIST } from '../data/boutiqueData';
import { Scissors, Calculator, X, Clock, Sparkles, MessageCircle, Maximize2, ExternalLink } from 'lucide-react';
import { getRateEnquiryUrl } from '../utils/whatsapp';

interface RateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookItem: (serviceName: string) => void;
}

export const RateCardModal: React.FC<RateCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedRateId, setSelectedRateId] = useState<string>(OFFICIAL_RATE_LIST[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isPosterExpanded, setIsPosterExpanded] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeRate = OFFICIAL_RATE_LIST.find((r) => r.id === selectedRateId) || OFFICIAL_RATE_LIST[0];

  const handleToggleAddon = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName) ? prev.filter((a) => a !== addonName) : [...prev, addonName]
    );
  };

  const calculatedTotal =
    activeRate.price +
    (activeRate.popularAddons || [])
      .filter((a) => selectedAddons.includes(a.name))
      .reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0F4C3F] to-[#185e4e] p-4 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#0F4C3F] text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Official Verified Poster & Rate List
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">
              Radha Bootic Centre Rate Card
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#FFF8F0]/30">
          {/* Official Poster Display Banner */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#0F4C3F]/20 shadow-lg group bg-black">
            <img
              src="/assets/aistudio/Gemini_Generated_Image_wnmqrgwnmqrgwnmq_4afe3916.png"
              alt="Radha Bootic Centre Official Rate Card Poster"
              className="w-full max-h-[480px] object-contain sm:object-cover mx-auto cursor-pointer group-hover:scale-102 transition duration-500"
              onClick={() => setIsPosterExpanded(true)}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex items-center justify-between text-white">
              <span className="text-xs font-semibold">
                📜 Official Rate Card Poster • Radha Bootic Centre
              </span>
              <button
                onClick={() => setIsPosterExpanded(true)}
                className="px-3 py-1.5 rounded-xl bg-[#E91E63] hover:bg-[#c2185b] text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Screen Poster</span>
              </button>
            </div>
          </div>

          {/* Category Calculator Section */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#E91E63]" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Select Service to Calculate Custom Tailoring:
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OFFICIAL_RATE_LIST.map((rate) => (
                <div
                  key={rate.id}
                  onClick={() => {
                    setSelectedRateId(rate.id);
                    setSelectedAddons([]);
                  }}
                  className={`cursor-pointer p-3.5 rounded-2xl border transition flex items-start justify-between ${
                    selectedRateId === rate.id
                      ? 'border-[#0F4C3F] bg-[#0F4C3F]/5 ring-2 ring-[#0F4C3F]/20'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <h5 className="font-bold text-sm text-gray-900">
                      {rate.nameEnglish}
                    </h5>
                    <p className="text-[11px] text-gray-500">{rate.nameHindi}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-gray-600">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>{rate.turnaroundDays}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-[#0F4C3F]">Rs. {rate.price}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Calculation Bar */}
            <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Total Estimated Stitching</span>
                <span className="text-2xl font-bold text-gray-900">Rs. {calculatedTotal}</span>
              </div>
              <a
                href={getRateEnquiryUrl(activeRate.nameEnglish, calculatedTotal)}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Poster Lightbox Modal */}
      {isPosterExpanded && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[95vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setIsPosterExpanded(false)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/70 text-white hover:bg-black transition cursor-pointer border border-white/20"
              title="Close Fullscreen"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src="/assets/aistudio/Gemini_Generated_Image_wnmqrgwnmqrgwnmq_4afe3916.png"
              alt="Full Resolution Rate Card Poster"
              className="max-h-[88vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border-2 border-white/20"
            />
          </div>
        </div>
      )}
    </div>
  );
};
