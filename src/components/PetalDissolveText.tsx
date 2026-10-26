import React, { useEffect, useRef, useState } from 'react';

interface PetalDissolveTextProps {
  text?: string;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'responsive';
}

interface Petal {
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  rot0: number;
  rotSpeed: number;
  sizeW: number;
  sizeH: number;
  color: string;
  accentColor: string;
  flutterFreq: number;
  flutterAmp: number;
  delay: number;
}

export const PetalDissolveText: React.FC<PetalDissolveTextProps> = ({
  text = "Ladies Tailoring & Stitching",
  className = "",
  align = "responsive",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animPhase, setAnimPhase] = useState<'HOLD' | 'DISSOLVING' | 'FLOATING' | 'REWINDING'>('HOLD');

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Rich rose & crimson petal palette
    const COLORS = [
      { main: '#E91E63', accent: '#C2185B' }, // Rose Crimson
      { main: '#FF1744', accent: '#D50000' }, // Vivid Red
      { main: '#F48FB1', accent: '#F06292' }, // Soft Pink
      { main: '#FFFFFF', accent: '#FFCDD2' }, // White Rose
      { main: '#D4AF37', accent: '#AA820A' }, // Luxury Gold Accent
    ];

    const setupCanvasAndPetals = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 280);
      height = Math.max(rect.height, 44); // Tight natural height

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Determine alignment based on screen size if responsive
      const isDesktop = window.innerWidth >= 1024;
      const actualAlign = align === 'responsive' ? (isDesktop ? 'left' : 'center') : align;

      // Sample text pixels
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = width;
      sampleCanvas.height = height;
      const sCtx = sampleCanvas.getContext('2d');
      if (!sCtx) return;

      const fontSize = Math.min(Math.max(width / 20, 22), 30);
      sCtx.font = `italic 600 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
      sCtx.textBaseline = 'middle';

      let textX = width / 2;
      if (actualAlign === 'left') {
        sCtx.textAlign = 'left';
        textX = 0;
      } else if (actualAlign === 'right') {
        sCtx.textAlign = 'right';
        textX = width;
      } else {
        sCtx.textAlign = 'center';
        textX = width / 2;
      }

      sCtx.fillStyle = '#E91E63';
      sCtx.fillText(text, textX, height / 2);

      const imgData = sCtx.getImageData(0, 0, width, height);
      const pixels = imgData.data;
      const validPoints: { x: number; y: number }[] = [];

      const step = 3; // Finer sampling for accuracy
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = pixels[(y * width + x) * 4 + 3];
          if (alpha > 120) {
            validPoints.push({ x, y });
          }
        }
      }

      // Generate 100-140 petals
      petals = [];
      const numPetals = Math.min(validPoints.length, 140);
      const stride = Math.max(1, Math.floor(validPoints.length / numPetals));

      for (let i = 0; i < validPoints.length && petals.length < numPetals; i += stride) {
        const pt = validPoints[i];
        const colorObj = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        const angle = (Math.random() * 0.8 - 0.4) * Math.PI - Math.PI / 2;
        const speed = 40 + Math.random() * 80;

        petals.push({
          x0: pt.x,
          y0: pt.y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 30,
          vy: Math.sin(angle) * speed - 15,
          rot0: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 5,
          sizeW: 4 + Math.random() * 5,
          sizeH: 7 + Math.random() * 6,
          color: colorObj.main,
          accentColor: colorObj.accent,
          flutterFreq: 3 + Math.random() * 4,
          flutterAmp: 10 + Math.random() * 14,
          delay: (pt.x / width) * 0.3 + Math.random() * 0.1,
        });
      }
    };

    setupCanvasAndPetals();

    const handleResize = () => {
      dpr = window.devicePixelRatio || 1;
      setupCanvasAndPetals();
    };

    window.addEventListener('resize', handleResize);

    let startTime = performance.now();

    const drawPetal = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      rot: number,
      w: number,
      h: number,
      color: string,
      accentColor: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

      ctx.beginPath();
      ctx.moveTo(0, -h / 2);
      ctx.bezierCurveTo(w / 2, -h / 3, w / 1.2, h / 3, 0, h / 2);
      ctx.bezierCurveTo(-w / 1.2, h / 3, -w / 2, -h / 3, 0, -h / 2);
      ctx.closePath();

      const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      grad.addColorStop(0, color);
      grad.addColorStop(1, accentColor);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
    };

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const cycleDuration = 8.0;
      const cycleTime = elapsed % cycleDuration;

      let progress = 0;
      let currentPhase: 'HOLD' | 'DISSOLVING' | 'FLOATING' | 'REWINDING' = 'HOLD';

      if (cycleTime < 2.0) {
        progress = 0;
        currentPhase = 'HOLD';
      } else if (cycleTime < 4.2) {
        const t = (cycleTime - 2.0) / 2.2;
        progress = t * t * (3 - 2 * t);
        currentPhase = 'DISSOLVING';
      } else if (cycleTime < 5.0) {
        progress = 1.0;
        currentPhase = 'FLOATING';
      } else {
        const t = (cycleTime - 5.0) / 2.5;
        const smoothT = t * t * (3 - 2 * t);
        progress = 1 - smoothT;
        currentPhase = 'REWINDING';
      }

      setAnimPhase(currentPhase);

      ctx.clearRect(0, 0, width, height);

      const isDesktop = window.innerWidth >= 1024;
      const actualAlign = align === 'responsive' ? (isDesktop ? 'left' : 'center') : align;

      // 1. Draw crisp subtitle text
      const textAlpha = Math.max(0.12, 1 - progress * 0.88);
      const fontSize = Math.min(Math.max(width / 20, 22), 30);

      ctx.save();
      ctx.font = `italic 600 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
      ctx.textBaseline = 'middle';

      let textX = width / 2;
      if (actualAlign === 'left') {
        ctx.textAlign = 'left';
        textX = 0;
      } else if (actualAlign === 'right') {
        ctx.textAlign = 'right';
        textX = width;
      } else {
        ctx.textAlign = 'center';
        textX = width / 2;
      }

      ctx.fillStyle = `rgba(233, 30, 99, ${textAlpha})`;
      ctx.fillText(text, textX, height / 2);
      ctx.restore();

      // 2. Draw Petals on exact deterministic rewind trajectory
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        let localP = 0;
        if (currentPhase === 'DISSOLVING') {
          localP = Math.max(0, (progress - p.delay) / (1 - p.delay));
        } else if (currentPhase === 'REWINDING') {
          localP = Math.max(0, (progress - p.delay) / (1 - p.delay));
        } else if (currentPhase === 'FLOATING') {
          localP = 1.0;
        } else {
          localP = 0;
        }

        if (localP > 0.001) {
          const flutter = Math.sin(localP * p.flutterFreq * Math.PI) * p.flutterAmp * localP;
          const px = p.x0 + p.vx * localP + flutter;
          const py = p.y0 + p.vy * localP + Math.cos(localP * 4) * 8 * localP;
          const rot = p.rot0 + p.rotSpeed * localP;
          const alpha = Math.sin(localP * Math.PI) * 0.85 + 0.15;

          drawPetal(ctx, px, py, rot, p.sizeW, p.sizeH, p.color, p.accentColor, alpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [text, align]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-9 sm:h-11 flex items-center select-none overflow-visible my-1 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none z-10 block"
      />
    </div>
  );
};
