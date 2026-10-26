import React, { useState } from 'react';
import { ProductItem, CategoryType } from '../types';
import { BOUTIQUE_PRODUCTS } from '../data/boutiqueData';
import { Search, MapPin, MessageCircle } from 'lucide-react';
import { getProductEnquiryUrl } from '../utils/whatsapp';

interface ProductCatalogProps {
  activeCategory: CategoryType;
  onCategoryChange: (cat: CategoryType) => void;
  onAddToCart?: (product: ProductItem, size: string, customStitching: boolean) => void;
  onCustomStitchClick?: (product: ProductItem) => void;
  onVisitShopClick?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  activeCategory,
  onCategoryChange,
  onVisitShopClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [audienceFilter, setAudienceFilter] = useState<'All' | 'Women' | 'Girls'>('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Strictly specific categories only — "All" category has been removed as requested
  const categories: { id: CategoryType; label: string; count: number }[] = [
    {
      id: 'blouses',
      label: 'Designer Blouses (ब्लाउज)',
      count: BOUTIQUE_PRODUCTS.filter((p) => p.category === 'blouses').length,
    },
    {
      id: 'lehengas',
      label: "Ladies' Lehengas (लहंगा)",
      count: BOUTIQUE_PRODUCTS.filter((p) => p.category === 'lehengas').length,
    },
    {
      id: 'girls',
      label: "Girls' Lehengas (बच्चों के)",
      count: BOUTIQUE_PRODUCTS.filter((p) => p.category === 'girls').length,
    },
    {
      id: 'suits',
      label: "Suits & Kurtis (सूट)",
      count: BOUTIQUE_PRODUCTS.filter((p) => p.category === 'suits').length,
    },
  ];

  // If current activeCategory is 'all', auto fallback to 'blouses'
  const currentCategory = activeCategory === 'all' ? 'blouses' : activeCategory;

  // Filter products by active category, audience, and search query
  const filteredProducts = BOUTIQUE_PRODUCTS.filter((prod) => {
    const matchesCat = prod.category === currentCategory;
    const matchesAudience = audienceFilter === 'All' || prod.audience === audienceFilter;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesAudience && matchesSearch;
  });

  const handleOpenDetail = (prod: ProductItem) => {
    setSelectedProduct(prod);
  };

  const handleScrollToVisit = () => {
    if (onVisitShopClick) {
      onVisitShopClick();
    } else {
      const el = document.getElementById('visit');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="catalog" className="py-16 sm:py-20 bg-[#FFF8F0]/40 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F4C3F] mb-2">
              <span className="w-5 h-px bg-[#0F4C3F]"></span>
              सिलाई रेफरेंस गैलरी • Sample Work Portfolio
              <span className="w-5 h-px bg-[#0F4C3F]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F4C3F]">
              What We Make • हमारे द्वारा बनाए गए डिज़ाइन्स
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
              ये सभी सैम्पल्स हमारे बुटीक पर सिलाई किए गए <strong>असली डिज़ाइन्स</strong> हैं। यह कोई रेडीमेड सेल नहीं है — आप अपना कपड़ा लेकर दुकान पर आएं और इस तरह का कोई भी पैटर्न अपनी फिटिंग के अनुसार सिलवाएं।
            </p>
          </div>

          {/* Search bar & Audience toggle */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search blouse, lehenga, aari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4C3F]/20 focus:border-[#0F4C3F]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>

            {/* Audience Filter */}
            <div className="flex items-center rounded-xl bg-white p-1 border border-gray-200 text-xs font-semibold w-full sm:w-auto justify-center">
              {(['All', 'Women', 'Girls'] as const).map((aud) => (
                <button
                  key={aud}
                  onClick={() => setAudienceFilter(aud)}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                    audienceFilter === aud
                      ? 'bg-[#0F4C3F] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Buttons Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#E91E63] text-white shadow-md ring-2 ring-[#E91E63]/30'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products / Designs Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 p-8">
            <p className="text-gray-500 text-sm">
              इस श्रेणी में कोई डिज़ाइन मैच नहीं हुआ। कृपया सर्च रिसेट करें।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setAudienceFilter('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0F4C3F] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100/80 shadow-xs hover:shadow-2xl hover:shadow-[#0F4C3F]/10 hover:border-[#D4AF37]/40 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group relative"
              >
                {/* Image Wrap */}
                <div
                  className="relative aspect-4/5 overflow-hidden bg-gray-50 cursor-pointer"
                  onClick={() => handleOpenDetail(prod)}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Reference Design Badge */}
                  <span className="absolute top-3 left-3 bg-[#0F4C3F]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider shadow-sm">
                    ✦ Reference Design
                  </span>

                  {/* Audience Badge */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#E91E63] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {prod.audience}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => handleOpenDetail(prod)}
                      className="font-serif font-bold text-base text-gray-900 line-clamp-1 cursor-pointer group-hover:text-[#0F4C3F] transition-colors duration-200"
                    >
                      {prod.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                    <div className="mt-2.5 text-[11px] text-gray-600 flex items-center gap-1.5">
                      <span className="font-semibold text-[#0F4C3F]">कार्य / Work:</span>
                      <span className="truncate">{prod.workType}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-gray-400 block leading-tight font-medium">
                          सिलाई दर (Stitching Rate)
                        </span>
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          Rs. {prod.stitchingPrice || prod.price}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#0F4C3F] font-bold bg-[#FFF8F0] px-2.5 py-1 rounded-full border border-[#0F4C3F]/15">
                        कपड़ा ग्राहक का
                      </span>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleScrollToVisit}
                        className="btn-shimmer w-full py-2 px-2 rounded-xl bg-[#0F4C3F] hover:bg-[#0A382E] text-white text-[11px] font-semibold flex items-center justify-center gap-1 shadow-xs hover:shadow-md transition transform active:scale-95 cursor-pointer"
                        title="Visit shop with your fabric"
                      >
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        <span>Visit Shop</span>
                      </button>

                      <a
                        href={getProductEnquiryUrl(
                          prod.name,
                          prod.categoryLabel,
                          prod.stitchingPrice || prod.price
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-semibold flex items-center justify-center gap-1 shadow-xs hover:shadow-md transition transform active:scale-95 cursor-pointer"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3 fill-white" />
                        <span>पैटर्न पूछें</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 max-h-[85vh] overflow-y-auto">
              {/* Left Photo */}
              <div className="relative aspect-square sm:aspect-auto h-64 sm:h-full bg-gray-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#0F4C3F] text-white text-xs font-bold px-3 py-1 rounded-lg">
                  {selectedProduct.categoryLabel}
                </span>
                <span className="absolute bottom-4 left-4 bg-black/70 text-white text-[11px] px-2.5 py-1 rounded-md">
                  Radha Bootic Reference
                </span>
              </div>

              {/* Right Content */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E91E63]">
                      {selectedProduct.audience}'s Stitched Reference
                    </span>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-gray-900 mt-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-gray-500 font-medium">काम का प्रकार (Work Type):</p>
                      <p className="font-semibold text-gray-800">{selectedProduct.workType}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-gray-500 font-medium">कपड़े का सुझाव (Recommended Fabric):</p>
                      <p className="font-semibold text-gray-800">{selectedProduct.fabric}</p>
                    </div>
                  </div>

                  {/* Offline Boutique Policy Highlight */}
                  <div className="mt-4 p-3 rounded-xl bg-[#FFF8F0] border border-[#0F4C3F]/20 text-[11px] space-y-1 text-gray-700">
                    <p className="font-bold text-[#0F4C3F] flex items-center gap-1">
                      <span>✂️</span> सिलाई प्रक्रिया व शर्तें:
                    </p>
                    <p>• <strong>कपड़ा:</strong> ग्राहक को अपना कपड़ा स्वयं दुकान पर लाना होगा।</p>
                    <p>• <strong>नाप:</strong> 100% सही फिटिंग हेतु दुकान पर आकर नाप देना होगा।</p>
                    <p>• <strong>पिकअप:</strong> तैयार होने पर दुकान पर आएं, ट्रायल करें और ले जाएं (नो होम डिलीवरी)।</p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs text-gray-400 block">सिलाई दर (Stitching Rate)</span>
                      <span className="text-xl font-bold text-gray-900">
                        Rs. {selectedProduct.stitchingPrice || selectedProduct.price}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      पिकअप केवल दुकान से
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        handleScrollToVisit();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-[#0F4C3F] hover:bg-[#0d3f34] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Visit Our Shop</span>
                    </button>
                    <a
                      href={getProductEnquiryUrl(
                        selectedProduct.name,
                        selectedProduct.categoryLabel,
                        selectedProduct.stitchingPrice || selectedProduct.price
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>WhatsApp पूछें</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
