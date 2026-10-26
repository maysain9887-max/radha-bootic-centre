import React, { useState, useEffect, useRef } from 'react';
import { ProductItem } from '../types';
import { Sparkles, MapPin, MessageCircle, Eye, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { getProductEnquiryUrl } from '../utils/whatsapp';

interface Circular3DCarouselProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onVisitShop: () => void;
}

export const Circular3DCarousel: React.FC<Circular3DCarouselProps> = ({
  products,
  onSelectProduct,
  onVisitShop,
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startRotation, setStartRotation] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const velocityRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);

  const itemCount = products.length;
  const angleStep = itemCount > 0 ? 360 / itemCount : 360 / 12;
  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 260 : 420;

  // Auto rotation & inertia loop
  useEffect(() => {
    let lastTimestamp = performance.now();

    const animate = (timestamp: number) => {
      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isDragging && !isHovered) {
        if (Math.abs(velocityRef.current) > 0.01) {
          setRotation((prev) => prev + velocityRef.current);
          velocityRef.current *= 0.95;
        } else {
          setRotation((prev) => prev + 0.15);
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDragging, isHovered]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const dx = currentX - startX;
    const newRotation = startRotation + dx * 0.4;
    setRotation(newRotation);

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const ddx = currentX - lastXRef.current;
      velocityRef.current = (ddx / dt) * 1.5;
    }
    lastXRef.current = currentX;
    lastTimeRef.current = now;
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

  const handleRotateLeft = () => {
    velocityRef.current = 0;
    setRotation((prev) => prev + angleStep);
  };

  const handleRotateRight = () => {
    velocityRef.current = 0;
    setRotation((prev) => prev - angleStep);
  };

  if (itemCount === 0) {
    return (
      <div className="text-center py-16 bg-white/60 backdrop-blur-md rounded-3xl border border-gray-200 p-8">
        <p className="text-gray-500 text-sm">No designs available in this category.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full py-8 overflow-hidden select-none">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F4C3F]/10 border border-[#0F4C3F]/20 text-[#0F4C3F] text-xs font-bold tracking-wide">
          <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Interactive 3D Cylindrical Ring Carousel • Drag to Spin & Explore</span>
        </div>
      </div>

      <div
        className="relative w-full h-[480px] sm:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1400px]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: '1400px' }}
      >
        <div
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
          }}
        >
          {products.map((product, index) => {
            const cardAngle = index * angleStep;

            return (
              <div
                key={product.id}
                className="absolute w-[220px] sm:w-[260px] bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl transition-all duration-300 group hover:border-[#E91E63]"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="relative aspect-4/5 overflow-hidden bg-gray-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-500"
                    loading="lazy"
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-[#0F4C3F]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {product.categoryLabel}
                    </span>
                  </div>

                  <span className="absolute top-3 right-3 bg-white/90 text-[#E91E63] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {product.audience}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif font-bold text-xs sm:text-sm line-clamp-1 drop-shadow-md">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-[#D4AF37]">
                        Rs. {product.stitchingPrice || product.price}
                      </span>
                      <span className="text-[10px] text-gray-200 bg-black/40 px-2 py-0.5 rounded">
                        कपड़ा ग्राहक का
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white flex flex-col gap-2">
                  <p className="text-[11px] text-gray-500 line-clamp-1">
                    {product.workType}
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="py-1.5 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-[#0F4C3F]" />
                      <span>विवरण</span>
                    </button>

                    <a
                      href={getProductEnquiryUrl(
                        product.name,
                        product.categoryLabel,
                        product.stitchingPrice || product.price
                      )}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="py-1.5 px-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold transition flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-3 h-3 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={handleRotateLeft}
            className="p-3 rounded-2xl bg-[#0F4C3F] text-white shadow-md hover:bg-[#0d3f34] transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Rotate Left"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Card</span>
          </button>

          <span className="text-xs font-serif font-bold text-gray-600">
            {itemCount} Designs in 3D Ring
          </span>

          <button
            onClick={handleRotateRight}
            className="p-3 rounded-2xl bg-[#0F4C3F] text-white shadow-md hover:bg-[#0d3f34] transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Rotate Right"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onVisitShop}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#E91E63] to-[#d81555] text-white text-xs font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-white" />
          <span>Visit Shop with Your Fabric</span>
        </button>
      </div>
    </div>
  );
};
