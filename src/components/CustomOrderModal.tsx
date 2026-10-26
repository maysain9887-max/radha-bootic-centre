import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Scissors, CheckCircle, X, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { CustomBookingData } from '../types';

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialNotes?: string;
  onOrderSuccess: (order: CustomBookingData) => void;
}

export const CustomOrderModal: React.FC<CustomOrderModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Designer Blouse Stitching',
  initialNotes = '',
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<CustomBookingData>({
    customerName: '',
    phone: '',
    city: 'Jaipur',
    serviceCategory: initialService,
    outfitDetails: initialNotes || 'Custom stitched as per style discussion',
    hasOwnFabric: 'yes',
    bust: '',
    waist: '',
    hip: '',
    length: '',
    shoulder: '',
    armhole: '',
    notes: initialNotes,
    urgentDelivery: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setIsSubmitted(true);
    onOrderSuccess(formData);
  };

  const handleWhatsAppRedirect = () => {
    const text = `Namaste Radha Bootic Centre!\n\nI want to book custom tailoring:\n• Name: ${formData.customerName}\n• Service: ${formData.serviceCategory}\n• Fabric: ${formData.hasOwnFabric === 'yes' ? 'Bringing own fabric' : 'Need fabric recommendation'}\n• Measurements: Bust: ${formData.bust || 'N/A'}, Waist: ${formData.waist || 'N/A'}, Length: ${formData.length || 'N/A'}\n• Notes: ${formData.notes || 'None'}\n• Urgent: ${formData.urgentDelivery ? 'Yes (24-48h)' : 'Standard'}`;
    const url = `https://wa.me/919950055657?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F4C3F] to-[#185e4e] p-6 text-white flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E91E63] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Tailoring & Design Consultation
            </div>
            <h2 className="text-2xl font-serif font-bold">
              नाप व सिलाई पूछताछ • Boutique Consultation
            </h2>
            <p className="text-xs text-gray-200 mt-1">
              Share your style preferences and measurements. We consult directly via WhatsApp or visit our boutique.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success View */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900">
                Order Inquiry Received!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you <strong className="text-[#0F4C3F]">{formData.customerName}</strong>! Your stitching request for <strong className="text-[#E91E63]">{formData.serviceCategory}</strong> has been registered successfully.
              </p>

              <div className="p-4 rounded-2xl bg-[#FFF8F0] border border-[#0F4C3F]/15 max-w-md mx-auto text-left text-xs space-y-1.5">
                <p><strong className="text-gray-700">Estimated Delivery:</strong> {formData.urgentDelivery ? '24 - 48 Hours (Urgent Express)' : '3 - 5 Business Days'}</p>
                <p><strong className="text-gray-700">Phone:</strong> {formData.phone}</p>
                <p><strong className="text-gray-700">Fabric Status:</strong> {formData.hasOwnFabric === 'yes' ? 'Bringing own fabric to boutique' : 'Consulting with boutique for fabric'}</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Continue on WhatsApp with Tailor
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Service & Outfit Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Service / Outfit Category *
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 bg-white focus:ring-2 focus:ring-[#0F4C3F]/20 focus:border-[#0F4C3F]"
                  >
                    <option value="Basic Sada Blouse (₹100)">Basic Sada Blouse (₹100)</option>
                    <option value="Astar Cotton Lined Blouse (₹250)">Astar Cotton Lined Blouse (₹250)</option>
                    <option value="Designer Padded Blouse (₹350+)">Designer Padded Blouse (₹350+)</option>
                    <option value="Simple Kurti Suit (₹300)">Simple Kurti Suit (₹300)</option>
                    <option value="Designer / Anarkali Suit (₹450+)">Designer / Anarkali Suit (₹450+)</option>
                    <option value="Bridal / Flared Lehenga (₹700+)">Bridal / Flared Lehenga (₹700+)</option>
                    <option value="Girls Festive Lehenga / Gown (₹400+)">Girls' Festive Lehenga / Gown (₹400+)</option>
                    <option value="Patiala Salwar & Alterations (₹150+)">Patiala Salwar & Alterations (₹150+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Fabric Availability
                  </label>
                  <select
                    value={formData.hasOwnFabric}
                    onChange={(e) => setFormData({ ...formData, hasOwnFabric: e.target.value as any })}
                    className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 bg-white focus:ring-2 focus:ring-[#0F4C3F]/20 focus:border-[#0F4C3F]"
                  >
                    <option value="yes">I have my own fabric / unstitched cloth</option>
                    <option value="no">I want Radha Bootic to supply fabric</option>
                    <option value="need_advice">Need advice on fabric type & lining</option>
                  </select>
                </div>
              </div>

              {/* Measurement Section (Optional / Helpful) */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#E91E63]" />
                    Body Measurements (in inches — optional, or provide in person)
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-semibold mb-0.5">Bust</label>
                    <input
                      type="text"
                      placeholder="e.g. 34"
                      value={formData.bust}
                      onChange={(e) => setFormData({ ...formData, bust: e.target.value })}
                      className="w-full text-xs rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-semibold mb-0.5">Waist</label>
                    <input
                      type="text"
                      placeholder="e.g. 28"
                      value={formData.waist}
                      onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                      className="w-full text-xs rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-semibold mb-0.5">Hip</label>
                    <input
                      type="text"
                      placeholder="e.g. 38"
                      value={formData.hip}
                      onChange={(e) => setFormData({ ...formData, hip: e.target.value })}
                      className="w-full text-xs rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-semibold mb-0.5">Length</label>
                    <input
                      type="text"
                      placeholder="e.g. 14"
                      value={formData.length}
                      onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                      className="w-full text-xs rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-semibold mb-0.5">Shoulder</label>
                    <input
                      type="text"
                      placeholder="e.g. 14"
                      value={formData.shoulder}
                      onChange={(e) => setFormData({ ...formData, shoulder: e.target.value })}
                      className="w-full text-xs rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-semibold mb-0.5">Armhole</label>
                    <input
                      type="text"
                      placeholder="e.g. 16"
                      value={formData.armhole}
                      onChange={(e) => setFormData({ ...formData, armhole: e.target.value })}
                      className="w-full text-xs rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center"
                    />
                  </div>
                </div>
              </div>

              {/* Design notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Design Notes & Custom Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Deep sweetheart neck, boat neck with dori latkans, padded cups, extra flare..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs rounded-xl border border-gray-300 py-2 px-3 bg-white focus:ring-2 focus:ring-[#0F4C3F]/20 focus:border-[#0F4C3F]"
                />
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunita Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 bg-white focus:ring-2 focus:ring-[#0F4C3F]/20 focus:border-[#0F4C3F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 bg-white focus:ring-2 focus:ring-[#0F4C3F]/20 focus:border-[#0F4C3F]"
                  />
                </div>
              </div>

              {/* Urgent Stitching checkbox */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.urgentDelivery}
                  onChange={(e) => setFormData({ ...formData, urgentDelivery: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <label htmlFor="urgent" className="text-xs text-amber-900 font-medium cursor-pointer">
                  ⚡ <strong>Need Urgent Delivery?</strong> Ready in 24 - 48 Hours (+₹100 express fee)
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="group px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md hover:shadow-xl transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-md bg-white p-0.5 shadow-xs flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shrink-0">
                    <img src="/assets/aistudio/image_009dfac3.png" alt="WhatsApp" className="w-full h-full object-contain" />
                  </div>
                  <span>Submit & Enquire on WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
