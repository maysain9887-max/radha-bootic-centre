import React, { useState, useEffect, useRef } from 'react';
import { ProductItem, CategoryType, CartItem, CustomBookingData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BoutiqueVideoSection } from './components/BoutiqueVideoSection';
import { ProductCatalog } from './components/ProductCatalog';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { VisitShopSection } from './components/VisitShopSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { RateCardModal } from './components/RateCardModal';
import { CustomOrderModal } from './components/CustomOrderModal';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { OfflineBanner } from './components/OfflineBanner';
import { Sparkles, MessageSquare, Scissors, Wifi, WifiOff, RefreshCw, Move } from 'lucide-react';
import { useOnlineStatus } from './hooks/useOnlineStatus';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Radha Bootic ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center p-6 text-center">
          <img
            src="/assets/aistudio/logo_3fe417b7.png"
            alt="Radha Bootic Centre"
            className="w-24 h-24 object-contain mb-4"
          />
          <h2 className="text-2xl font-serif font-bold text-[#0F4C3F] mb-2">
            Radha Bootic Centre
          </h2>
          <p className="text-xs text-gray-600 max-w-sm mb-6">
            We are preparing the boutique atelier. Please reload to refresh the tailored experience.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F4C3F] text-white text-xs font-semibold shadow-md hover:bg-[#0d3f34] transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Boutique
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface DraggableFloatingWidgetProps {
  onOpenChat: () => void;
  isOnline: boolean;
}

const DraggableFloatingWidget: React.FC<DraggableFloatingWidgetProps> = ({
  onOpenChat,
  isOnline,
}) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (position && widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect();
        const maxX = Math.max(8, window.innerWidth - rect.width - 8);
        const maxY = Math.max(8, window.innerHeight - rect.height - 8);
        const clampedX = Math.min(Math.max(8, position.x), maxX);
        const clampedY = Math.min(Math.max(8, position.y), maxY);
        if (clampedX !== position.x || clampedY !== position.y) {
          setPosition({ x: clampedX, y: clampedY });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (!widgetRef.current) return;

    const rect = widgetRef.current.getBoundingClientRect();
    const currentX = position ? position.x : rect.left;
    const currentY = position ? position.y : rect.top;

    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: currentX,
      posY: currentY,
    };
    hasMovedRef.current = false;
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStartRef.current || !widgetRef.current) return;

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;

    if (Math.hypot(dx, dy) > 5) {
      hasMovedRef.current = true;
    }

    if (hasMovedRef.current) {
      const rect = widgetRef.current.getBoundingClientRect();
      const maxX = Math.max(8, window.innerWidth - rect.width - 8);
      const maxY = Math.max(8, window.innerHeight - rect.height - 8);

      const targetX = pointerStartRef.current.posX + dx;
      const targetY = pointerStartRef.current.posY + dy;

      const clampedX = Math.min(Math.max(8, targetX), maxX);
      const clampedY = Math.min(Math.max(8, targetY), maxY);

      setPosition({ x: clampedX, y: clampedY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStartRef.current) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (!hasMovedRef.current) {
      onOpenChat();
    }

    pointerStartRef.current = null;
    setIsDragging(false);
  };

  const style: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        bottom: 'auto',
        right: 'auto',
        zIndex: 50,
        touchAction: 'none',
        userSelect: 'none',
      }
    : {
        position: 'fixed',
        zIndex: 50,
        touchAction: 'none',
        userSelect: 'none',
      };

  return (
    <div
      ref={widgetRef}
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`select-none cursor-grab active:cursor-grabbing ${
        !position ? 'bottom-3 sm:bottom-6 right-2.5 sm:right-6' : ''
      }`}
      title="Drag to reposition Radha AI anywhere on screen"
    >
      <button
        type="button"
        aria-label="Open Radha AI Queries"
        className={`btn-shimmer group relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#0F4C3F] via-[#145a4a] to-[#0F4C3F] hover:from-[#0A382E] hover:to-[#0F4C3F] text-white shadow-2xl hover:shadow-[#0F4C3F]/40 border border-[#D4AF37]/60 cursor-grab active:cursor-grabbing transition-all ${
          isDragging ? 'scale-105 shadow-2xl ring-2 ring-[#D4AF37]' : ''
        }`}
      >
        <div className="relative shrink-0 pointer-events-none">
          <img
            src="/assets/aistudio/logo_3fe417b7.png"
            alt="Radha AI"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover bg-white p-0.5 shadow-xs"
          />
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border border-white ${
              isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
        </div>
        <div className="text-left pointer-events-none">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-serif font-bold text-white whitespace-nowrap">Radha AI</span>
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
          </div>
          <span className="text-[10px] sm:text-xs text-amber-200 block font-sans whitespace-nowrap font-medium">
            Ask queries
          </span>
        </div>
        <Move className="w-3.5 h-3.5 text-[#D4AF37]/80 ml-1 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </button>
    </div>
  );
};

function MainApp() {
  const isOnline = useOnlineStatus();

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rb_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Navigation & Modals state
  const [activeCategory, setActiveCategory] = useState<CategoryType>('blouses');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRatesOpen, setIsRatesOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialBookingService, setInitialBookingService] = useState('Basic Sada Blouse (₹100)');
  const [initialBookingNotes, setInitialBookingNotes] = useState('');

  const handleVisitShop = () => {
    const el = document.getElementById('visit');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart actions
  const handleAddToCart = (product: ProductItem, size: string, customStitching: boolean) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.customStitching === customStitching
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1, selectedSize: size, customStitching }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // 3D Studio customizer order trigger
  const handleCustomizeOrder = (options: {
    colorName: string;
    hex: string;
    embroidery: string;
    neckline: string;
    notes: string;
  }) => {
    setInitialBookingService(`Custom Designer Blouse (${options.neckline}, ${options.embroidery})`);
    setInitialBookingNotes(`Custom 3D Studio Configuration:\n• Bodice Color: ${options.colorName} (${options.hex})\n• Neckline: ${options.neckline}\n• Embroidery Finish: ${options.embroidery}\n• Notes: ${options.notes}`);
    setIsBookingOpen(true);
  };

  // Direct tailor click on product
  const handleCustomStitchClick = (product: ProductItem) => {
    setInitialBookingService(`${product.categoryLabel}: ${product.name}`);
    setInitialBookingNotes(`Custom stitching requested for ${product.name} (Fabric: ${product.fabric}, Work: ${product.workType}). Base stitching rate approx ₹${product.stitchingPrice || 350}.`);
    setIsBookingOpen(true);
  };

  const handleBookFromRates = (serviceName: string) => {
    setInitialBookingService(serviceName);
    setInitialBookingNotes(`Selected from Official Rate Card: ${serviceName}`);
    setIsBookingOpen(true);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayVideo = () => {
    const el = document.getElementById('studio-3d');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn('Playback policy notice, retrying with muted audio:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#FFF8F0] selection:bg-[#E91E63] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => {
          setInitialBookingService('Designer Padded Blouse (₹350+)');
          setInitialBookingNotes('');
          setIsBookingOpen(true);
        }}
        onOpenRates={() => setIsRatesOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onPlayVideo={handlePlayVideo}
        onVisitShop={handleVisitShop}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => {
            setInitialBookingService('Designer Padded Blouse (₹350+)');
            setInitialBookingNotes('');
            setIsBookingOpen(true);
          }}
          onOpenRates={() => setIsRatesOpen(true)}
          onPlayVideo={handlePlayVideo}
          onVisitShop={handleVisitShop}
        />

        {/* Services Section ("What We Stitch") */}
        <ServicesSection
          onSelectCategory={(cat) => setActiveCategory((cat === 'all' ? 'blouses' : cat) as CategoryType)}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenRates={() => setIsRatesOpen(true)}
        />

        {/* Official Boutique Video Showcase (Replaces 3D Studio) */}
        <BoutiqueVideoSection
          onOpenBooking={() => setIsBookingOpen(true)}
          videoRefExternal={videoRef}
        />

        {/* Product Catalog (Women & Girls Reference Designs Showcase) */}
        <ProductCatalog
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddToCart={handleAddToCart}
          onCustomStitchClick={handleCustomStitchClick}
          onVisitShopClick={handleVisitShop}
        />

        {/* How It Works Workflow (Offline Tailoring Process) */}
        <HowItWorks
          onOpenBooking={() => setIsBookingOpen(true)}
          onVisitShop={handleVisitShop}
        />

        {/* Dedicated Visit Our Shop Section (Address, Timings & Directions) */}
        <VisitShopSection />

        {/* About Section */}
        <AboutSection />

        {/* Happy Customers Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenRates={() => setIsRatesOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Floating Quick Action Bar (Google Maps, Call & WhatsApp Image Icons with Hover Effects) */}
      <div className="fixed bottom-3 sm:bottom-6 left-2.5 sm:left-6 z-40 flex items-center gap-1 sm:gap-2 p-1 sm:p-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-[#0F4C3F]/20 transition duration-300 hover:border-[#D4AF37]/50 max-w-[calc(100vw-130px)] sm:max-w-none">
        {/* Google Maps Icon Button */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Radha+Bootic+Centre+7A+Manohar+Vihar+Agra+Road+Jaipur+302031"
          target="_blank"
          rel="noreferrer"
          title="Google Maps Location (7A Manohar Vihar, Jaipur)"
          className="group relative p-1.5 sm:p-2 rounded-xl bg-[#FFF8F0] hover:bg-[#0F4C3F] transition-all duration-300 transform hover:scale-115 active:scale-90 shadow-xs shrink-0"
        >
          <img
            src="/assets/aistudio/image_61628a68.png"
            alt="Google Maps"
            className="w-5 h-5 sm:w-7 sm:h-7 object-contain transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
            Direct Location 🗺️
          </span>
        </a>

        {/* Phone Call Icon Button */}
        <a
          href="tel:+919950055657"
          title="Call Shop (+91 99500 55657)"
          className="group relative p-1.5 sm:p-2 rounded-xl bg-[#FFF8F0] hover:bg-[#0F4C3F] transition-all duration-300 transform hover:scale-115 active:scale-90 shadow-xs shrink-0"
        >
          <img
            src="/assets/aistudio/image_a0ea2cb6.png"
            alt="Call Shop"
            className="w-5 h-5 sm:w-7 sm:h-7 object-contain transition-transform duration-300 group-hover:-rotate-12"
          />
          <span className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
            Call (+91 99500 55657) 📞
          </span>
        </a>

        {/* WhatsApp Icon Button */}
        <a
          href="https://wa.me/919950055657?text=Namaste%20Radha%20Bootic%20Centre,%20I%20want%20to%20enquire%20about%20stitching."
          target="_blank"
          rel="noreferrer"
          title="WhatsApp Consultation"
          className="group relative p-1.5 sm:p-2 rounded-xl bg-[#FFF8F0] hover:bg-[#25D366] transition-all duration-300 transform hover:scale-115 active:scale-90 shadow-xs shrink-0"
        >
          <img
            src="/assets/aistudio/image_009dfac3.png"
            alt="WhatsApp Chat"
            className="w-5 h-5 sm:w-7 sm:h-7 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-gray-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
            WhatsApp Chat 💬
          </span>
        </a>
      </div>

      {/* Draggable Floating Action Button for Radha AI */}
      <DraggableFloatingWidget onOpenChat={() => setIsChatOpen(true)} isOnline={isOnline} />

      {/* Offline Status Alert Banner */}
      <OfflineBanner />

      {/* Modals & Drawers */}
      <RateCardModal
        isOpen={isRatesOpen}
        onClose={() => setIsRatesOpen(false)}
        onBookItem={handleBookFromRates}
      />

      <CustomOrderModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={initialBookingService}
        initialNotes={initialBookingNotes}
        onOrderSuccess={(orderData: CustomBookingData) => {
          console.log('Custom tailoring enquiry:', orderData);
        }}
      />

      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenRates={() => {
          setIsChatOpen(false);
          setIsRatesOpen(true);
        }}
        onOpenBooking={() => {
          setIsChatOpen(false);
          setIsBookingOpen(true);
        }}
        onOpen3D={() => {
          setIsChatOpen(false);
          handlePlayVideo();
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
