import React, { useState, useRef } from 'react';
import { ProductItem } from '../types';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

interface MediaGalleryCarouselProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onVisitShop: () => void;
}

export const MediaGalleryCarousel: React.FC<MediaGalleryCarouselProps> = ({
  products,
  onSelectProduct,
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startRotation, setStartRotation] = useState<number>(0);
  const velocityRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const itemCount = products.length;
  const angleStep = itemCount > 0 ? 360 / itemCount : 360 / 12;
  const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 240 : 460;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const dx = currentX - startX;
    setRotation(startRotation + dx * 0.4);

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const ddx = currentX - lastXRef.current;
      velocityRef.current = (ddx / dt) * 1.5;
    }
    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setStartRotation(rotation);
      lastXRef.current = e.touches[0].clientX;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const dx = currentX - startX;
    setRotation(startRotation + dx * 0.4);

    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      const ddx = currentX - lastXRef.current;
      velocityRef.current = (ddx / dt) * 1.5;
    }
    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleRotateLeft = () => {
    setRotation((prev) => prev + angleStep * 1.5);
  };

  const handleRotateRight = () => {
    setRotation((prev) => prev - angleStep * 1.5);
  };

  if (itemCount === 0) {
    return (
      <div className="text-center py-20 bg-[#0a0c10] rounded-3xl border border-gray-800 p-8 text-white">
        <p className="text-gray-400 text-sm">No designs available in this category.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full py-12 px-4 overflow-hidden select-none bg-[#0a0c10] rounded-3xl border border-gray-800 shadow-2xl text-white">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 px-4 sm:px-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-semibold mb-2 backdrop-blur-md">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Drag or Swipe to Rotate 3D Ring</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Media Gallery
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            Portrait media standing on a ring that curls around the viewer, smallest in the middle and leaning in at both edges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRotateLeft}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10 cursor-pointer"
            title="Rotate Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleRotateRight}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/10 cursor-pointer"
            title="Rotate Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D Curled Ring Stage (Purely mouse/touch controlled, NO auto-spin) */}
      <div
        className="relative w-full h-[480px] sm:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible touch-pan-y"
        style={{ perspective: '1600px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute left-1/2 top-1/2 w-0 h-0 transition-transform duration-100 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(0px) rotateY(${rotation}deg)`,
          }}
        >
          {products.map((product, index) => {
            const cardAngle = index * angleStep;

            return (
              <div
                key={product.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(product);
                }}
                className="absolute w-[180px] sm:w-[220px] bg-[#121820] rounded-2xl overflow-hidden border border-white/25 shadow-2xl group cursor-pointer transition-transform duration-300 hover:scale-105"
                style={{
                  transformStyle: 'preserve-3d',
                  left: '-100px',
                  top: '-180px',
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'visible',
                }}
              >
                {/* Pure Portrait Image Frame (No Text or Prices) */}
                <div className="relative aspect-3/4 overflow-hidden bg-black rounded-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Hint */}
      <div className="text-center mt-6 text-xs text-gray-500">
        Click any portrait card to view full details and stitching specifications.
      </div>
    </div>
  );
};
