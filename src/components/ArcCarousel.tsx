import React, { useState, useEffect, useRef } from 'react';
import { ProductItem } from '../types';
import { Sparkles, MapPin, MessageCircle, Eye, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { getProductEnquiryUrl } from '../utils/whatsapp';

interface ArcCarouselProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onVisitShop: () => void;
}

export const ArcCarousel: React.FC<ArcCarouselProps> = ({
  products,
  onSelectProduct,
  onVisitShop,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const autoPlayRef = useRef<number | null>(null);

  const itemCount = products.length;

  // Auto advance every 4.5 seconds if not hovered or dragging
  useEffect(() => {
    if (!isHovered && !isDragging) {
      autoPlayRef.current = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % itemCount);
      }, 4500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, isDragging, itemCount]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % itemCount);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 60) {
      if (dx > 0) {
        handlePrev();
      } else {
        handleNext();
      }
      setStartX(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  if (itemCount === 0) {
    return (
      <div className="text-center py-16 bg-[#0a0f0d] rounded-3xl border border-gray-800 p-8 text-white">
        <p className="text-gray-400 text-sm">No designs available in this category.</p>
      </div>
    );
  }

  const activeProduct = products[activeIndex] || products[0];

  return (
    <div className="relative w-full py-12 px-4 overflow-hidden select-none bg-[#0a0f0d] rounded-3xl border border-[#D4AF37]/30 shadow-2xl text-white">
      {/* Top Header Badge */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>Arc Carousel • Smooth Semicircular Arch Animation</span>
        </div>
      </div>

      {/* Arc Stage Container */}
      <div
        className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Arc Wheel Track */}
        <div className="absolute w-[900px] sm:w-[1100px] h-[900px] sm:h-[1100px] rounded-full top-[140px] sm:top-[180px] pointer-events-none">
          {products.map((product, index) => {
            let offset = index - activeIndex;
            if (offset > itemCount / 2) offset -= itemCount;
            if (offset < -itemCount / 2) offset += itemCount;

            if (Math.abs(offset) > 4) return null;

            const angleDeg = offset * 20; // spread angle
            const angleRad = (angleDeg * Math.PI) / 180;
            const radiusX = window.innerWidth < 640 ? 200 : 360;
            const radiusY = window.innerWidth < 640 ? 120 : 200;

            const x = Math.sin(angleRad) * radiusX;
            const y = -Math.cos(angleRad) * radiusY + radiusY;

            const scale = offset === 0 ? 1.2 : Math.max(0.7, 1 - Math.abs(offset) * 0.12);
            const opacity = Math.abs(offset) > 3 ? 0 : Math.max(0.2, 1 - Math.abs(offset) * 0.25);
            const zIndex = 50 - Math.abs(offset);
            const isActive = offset === 0;

            return (
              <div
                key={product.id}
                onClick={() => setActiveIndex(index)}
                className={`absolute left-1/2 top-1/2 w-[170px] sm:w-[210px] bg-[#141c18] rounded-2xl overflow-hidden border shadow-2xl transition-all duration-700 ease-out cursor-pointer ${
                  isActive
                    ? 'border-[#E91E63] ring-4 ring-[#E91E63]/30 shadow-[#E91E63]/30'
                    : 'border-gray-700 hover:border-[#D4AF37]'
                }`}
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angleDeg}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                {/* Image */}
                <div className="relative aspect-4/5 overflow-hidden bg-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-2 left-2 bg-[#0F4C3F] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                    {product.categoryLabel}
                  </span>
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p className="font-serif font-bold text-xs line-clamp-1">{product.name}</p>
                    <p className="text-[10px] text-[#D4AF37] font-bold">Rs. {product.stitchingPrice || product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Active Title & Details below Apex */}
        <div className="absolute bottom-6 flex flex-col items-center z-50 pointer-events-auto">
          <div className="flex items-center gap-6 bg-[#141c18]/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#D4AF37]/30 shadow-2xl">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-[#0F4C3F] text-white hover:bg-[#0d3f34] transition cursor-pointer"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                {activeProduct.categoryLabel} • {activeProduct.audience}
              </span>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white max-w-[240px] sm:max-w-md truncate">
                {activeProduct.name}
              </h3>
              <p className="text-[11px] text-gray-300 max-w-[240px] sm:max-w-md truncate mt-0.5">
                {activeProduct.description}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-[#0F4C3F] text-white hover:bg-[#0d3f34] transition cursor-pointer"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => onSelectProduct(activeProduct)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 border border-white/20 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>विवरण (Details)</span>
            </button>

            <a
              href={getProductEnquiryUrl(
                activeProduct.name,
                activeProduct.categoryLabel,
                activeProduct.stitchingPrice || activeProduct.price
              )}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp पूछें</span>
            </a>

            <button
              onClick={onVisitShop}
              className="px-4 py-2 rounded-xl bg-[#0F4C3F] hover:bg-[#0d3f34] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Visit Shop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
